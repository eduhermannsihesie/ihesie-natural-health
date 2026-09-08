import { sendConsultationConfirmation } from "@/lib/email/sendConsultationConfirmation";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONSULTATION_FEE = 15000;

export async function GET(request: NextRequest) {
  try {
    const reference =
      request.nextUrl.searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference is required.",
        },
        {
          status: 400,
        }
      );
    }

    const secretKey =
      process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Paystack configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const consultation =
      await prisma.consultation.findUnique({
        where: {
          paymentReference: reference,
        },
      });

    if (!consultation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Consultation could not be found.",
        },
        {
          status: 404,
        }
      );
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${secretKey}`,
        },

        cache: "no-store",
      }
    );

    const paystackData =
      await paystackResponse.json();

    if (
      !paystackResponse.ok ||
      !paystackData.status ||
      !paystackData.data
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Paystack could not verify this transaction.",
        },
        {
          status: 400,
        }
      );
    }

    const transaction =
      paystackData.data;

    if (transaction.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment was not successful.",
        },
        {
          status: 400,
        }
      );
    }

    // Paystack amount is returned in kobo
    const expectedAmount =
      CONSULTATION_FEE * 100;

    if (
      Number(transaction.amount) !==
      expectedAmount
    ) {
      console.error(
        "Consultation amount mismatch:",
        {
          expectedAmount,
          receivedAmount:
            transaction.amount,
          reference,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount could not be verified.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      transaction.currency !== "NGN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment currency could not be verified.",
        },
        {
          status: 400,
        }
      );
    }

    const confirmedConsultation =
      await prisma.consultation.update({
        where: {
          id: consultation.id,
        },

        data: {
          paymentStatus: "PAID",
          bookingStatus: "CONFIRMED",
        },

        select: {
          id: true,
          consultationNumber: true,
          treatment: true,
          appointmentDate: true,
          appointmentTime: true,

          fullName: true,
          age: true,
          email: true,
          phone: true,
          healthConcern: true,
          communication: true,

          amount: true,
          currency: true,

          paymentReference: true,
          paymentStatus: true,
          bookingStatus: true,

          confirmationEmailSentAt: true,

          createdAt: true,
        },
      });

      if (!confirmedConsultation.confirmationEmailSentAt) {
  try {
    await sendConsultationConfirmation({
      email: confirmedConsultation.email,
      fullName: confirmedConsultation.fullName,

      consultationNumber:
        confirmedConsultation.consultationNumber,

      treatment:
        confirmedConsultation.treatment,

      appointmentDate:
        confirmedConsultation.appointmentDate,

      appointmentTime:
        confirmedConsultation.appointmentTime,

      communication:
        confirmedConsultation.communication,

      amount:
        confirmedConsultation.amount,

      paymentReference:
        confirmedConsultation.paymentReference,
    });

    await prisma.consultation.update({
      where: {
        id: confirmedConsultation.id,
      },

      data: {
        confirmationEmailSentAt: new Date(),
      },
    });
  } catch (emailError) {
    console.error(
      "Consultation confirmation email error:",
      emailError
    );
  }
}

    return NextResponse.json({
      success: true,
      consultation:
        confirmedConsultation,
    });
  } catch (error) {
    console.error(
      "Consultation verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while verifying your payment.",
      },
      {
        status: 500,
      }
    );
  }
}