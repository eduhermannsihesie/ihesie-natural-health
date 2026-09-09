import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email/sendOrderConfirmation";
import { sendConsultationConfirmation } from "@/lib/email/sendConsultationConfirmation";

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
    if (event.event !== "charge.success") {
      return NextResponse.json(
        {
          received: true,
        },
        {
          status: 200,
        }
      );
    }

    const transaction = event.data;
    const reference = transaction.reference;

    /*
     * FIRST:
     * Check whether this payment belongs
     * to a product order.
     */

    const order =
      await prisma.order.findUnique({
        where: {
          paymentReference: reference,
        },

        include: {
          items: true,
        },
      });

    if (order) {
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
          "Order webhook payment validation failed:",
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
     * SECOND:
     * If no order exists, check whether
     * this payment belongs to a consultation.
     */

    const consultation =
      await prisma.consultation.findUnique({
        where: {
          paymentReference: reference,
        },
      });

    if (consultation) {
      const expectedAmount =
        consultation.amount * 100;

      const paymentIsValid =
        transaction.status === "success" &&
        Number(transaction.amount) ===
          expectedAmount &&
        transaction.currency ===
          consultation.currency;

      if (!paymentIsValid) {
        console.error(
          "Consultation webhook payment validation failed:",
          {
            reference,
            expectedAmount,
            receivedAmount:
              transaction.amount,
            expectedCurrency:
              consultation.currency,
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

      if (
        consultation.paymentStatus !==
          "PAID" ||
        consultation.bookingStatus !==
          "CONFIRMED"
      ) {
        await prisma.consultation.update({
          where: {
            id: consultation.id,
          },

          data: {
            paymentStatus: "PAID",
            bookingStatus: "CONFIRMED",
          },
        });

        console.log(
          "Consultation confirmed by webhook:",
          consultation.id
        );
      }

      if (
        !consultation.confirmationEmailSentAt
      ) {
        try {
          await sendConsultationConfirmation({
            email: consultation.email,
            fullName: consultation.fullName,
            consultationNumber:
              consultation.consultationNumber,
            treatment:
              consultation.treatment,
            appointmentDate:
              consultation.appointmentDate,
            appointmentTime:
              consultation.appointmentTime,
            communication:
              consultation.communication,
            amount: consultation.amount,
            paymentReference:
              consultation.paymentReference,
          });

          await prisma.consultation.update({
            where: {
              id: consultation.id,
            },

            data: {
              confirmationEmailSentAt:
                new Date(),
            },
          });

          console.log(
            "Consultation confirmation email sent:",
            consultation.id
          );
        } catch (emailError) {
          console.error(
            "Consultation confirmation email error:",
            emailError
          );
        }
      } else {
        console.log(
          "Consultation confirmation email already sent:",
          consultation.id
        );
      }

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
     * Neither an order nor consultation
     * was found for this reference.
     */

    console.error(
      "Webhook payment reference not found:",
      reference
    );

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