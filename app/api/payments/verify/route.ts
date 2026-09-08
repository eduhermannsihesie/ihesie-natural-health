import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { message: "Payment reference is required." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        paymentReference: reference,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = await response.json();

    if (!response.ok || !paymentData.status) {
      return NextResponse.json(
        { message: "Unable to verify payment." },
        { status: 500 }
      );
    }

    const transaction = paymentData.data;

    if (transaction.status !== "success") {
      return NextResponse.json(
        { message: "Payment was not successful." },
        { status: 400 }
      );
    }

    const expectedAmount = order.total * 100;

    if (transaction.amount !== expectedAmount) {
      return NextResponse.json(
        { message: "Payment amount does not match order total." },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "PAID",
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      message: "Payment verified successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { message: "Unable to verify payment." },
      { status: 500 }
    );
  }
}