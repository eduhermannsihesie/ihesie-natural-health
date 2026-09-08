import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface PaymentRequest {
  orderId: string;
}

export async function POST(request: Request) {
  try {
    const body: PaymentRequest = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID is required." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    if (order.status === "PAID") {
      return NextResponse.json(
        { message: "This order has already been paid." },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!secretKey || !appUrl) {
      console.error("Paystack or app URL configuration is missing.");

      return NextResponse.json(
        {
          message: "Payment configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }


    const amountInKobo = order.total * 100;

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: order.email,
          amount: amountInKobo,
          currency: "NGN",

          callback_url:
           `${appUrl}/payment/verify`,

          metadata: {
            orderId: order.id,
          },
        }),
      }
    );

    const paymentData = await response.json();

    if (!response.ok || !paymentData.status) {
      console.error(
        "Paystack initialization error:",
        paymentData
      );

      return NextResponse.json(
        {
          message: "Unable to initialize payment.",
        },
        {
          status: 500,
        }
      );
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paymentReference:
          paymentData.data.reference,
      },
    });

    return NextResponse.json({
      authorizationUrl:
        paymentData.data.authorization_url,

      reference:
        paymentData.data.reference,
    });
  } catch (error) {
    console.error(
      "Payment initialization error:",
      error
    );

    return NextResponse.json(
      {
        message: "Unable to initialize payment.",
      },
      {
        status: 500,
      }
    );
  }
}