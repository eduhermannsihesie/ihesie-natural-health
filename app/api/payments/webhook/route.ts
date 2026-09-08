import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email/sendOrderConfirmation";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    const signature =
      request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        {
          message: "Missing Paystack signature.",
        },
        {
          status: 401,
        }
      );
    }

    const secretKey =
      process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "PAYSTACK_SECRET_KEY is missing."
      );

      return NextResponse.json(
        {
          message: "Server configuration error.",
        },
        {
          status: 500,
        }
      );
    }

    // Verify that the webhook really came from Paystack
    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json(
        {
          message: "Invalid Paystack signature.",
        },
        {
          status: 401,
        }
      );
    }

    const event = JSON.parse(rawBody);

    // We only care about successful payments
    if (event.event === "charge.success") {
      const transaction = event.data;

      const reference =
        transaction.reference;

      // Find the order and its products
      const order =
        await prisma.order.findUnique({
          where: {
            paymentReference: reference,
          },

          include: {
            items: true,
          },
        });

      if (!order) {
        console.error(
          "Webhook order not found:",
          reference
        );

        // Return 200 because the webhook itself
        // was received successfully.
        return NextResponse.json(
          {
            received: true,
          },
          {
            status: 200,
          }
        );
      }

      // Paystack uses kobo
      const expectedAmount =
        order.total * 100;

      const paymentIsValid =
        transaction.status === "success" &&
        Number(transaction.amount) ===
          expectedAmount &&
        transaction.currency ===
          order.currency;

      if (!paymentIsValid) {
        console.error(
          "Webhook payment validation failed:",
          {
            reference,
            expectedAmount,
            receivedAmount:
              transaction.amount,
            expectedCurrency:
              order.currency,
            receivedCurrency:
              transaction.currency,
          }
        );

        return NextResponse.json(
          {
            received: true,
          },
          {
            status: 200,
          }
        );
      }

      /*
       * STEP 1
       *
       * Mark the order as PAID if it
       * hasn't already been marked PAID.
       */

      if (order.status !== "PAID") {
        await prisma.order.update({
          where: {
            id: order.id,
          },

          data: {
            status: "PAID",
          },
        });

        console.log(
          "Order marked PAID by webhook:",
          order.id
        );
      }

      /*
       * STEP 2
       *
       * Email handling is separate from
       * payment status.
       *
       * This means a Paystack webhook retry
       * can retry the email even when the
       * order is already PAID.
       */

      if (!order.confirmationEmailSentAt) {
        try {
          await sendOrderConfirmation({
            email: order.email,
            fullName: order.fullName,
            orderId: order.id,

            address: order.address,
            city: order.city,
            state: order.state,

            currency: order.currency,
            subtotal: order.subtotal,
            deliveryFee:
              order.deliveryFee,
            total: order.total,

            paymentReference:
              order.paymentReference,

            items: order.items.map(
              (item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.subtotal,
              })
            ),
          });

          // Only record the email as sent
          // after Resend succeeds.
          await prisma.order.update({
            where: {
              id: order.id,
            },

            data: {
              confirmationEmailSentAt:
                new Date(),
            },
          });

          console.log(
            "Order confirmation email sent:",
            order.id
          );
        } catch (emailError) {
          console.error(
            "Order confirmation email error:",
            emailError
          );
        }
      } else {
        console.log(
          "Order confirmation email already sent:",
          order.id
        );
      }
    }

    return NextResponse.json(
      {
        received: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Paystack webhook error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Webhook processing failed.",
      },
      {
        status: 500,
      }
    );
  }
}