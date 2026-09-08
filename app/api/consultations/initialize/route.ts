import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONSULTATION_FEE = 15000;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      treatment,
      date,
      time,
      fullName,
      age,
      email,
      phone,
      healthConcern,
      communication,
    } = body;

    // -----------------------------
    // Validate required information
    // -----------------------------

    if (
      !treatment ||
      !date ||
      !time ||
      !fullName ||
      !age ||
      !email ||
      !phone ||
      !communication
    ) {
      return NextResponse.json(
        {
          message: "Please complete all required booking information.",
        },
        {
          status: 400,
        }
      );
    }

    const numericAge = Number(age);

    if (
      Number.isNaN(numericAge) ||
      numericAge < 18 ||
      numericAge > 120
    ) {
      return NextResponse.json(
        {
          message: "Please provide a valid age.",
        },
        {
          status: 400,
        }
      );
    }

    const appointmentDate = new Date(date);

    if (Number.isNaN(appointmentDate.getTime())) {
      return NextResponse.json(
        {
          message: "Invalid consultation date.",
        },
        {
          status: 400,
        }
      );
    }

    // Check slot availability

    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBooking = await prisma.consultation.findFirst({
      where: {
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        appointmentTime: time,
        bookingStatus: "CONFIRMED",
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          message: "That consultation time has just been booked. Please select a different time.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Generate booking number
    // -----------------------------

    const consultationNumber =
      `IHN-${Date.now().toString().slice(-8)}`;

    // -----------------------------
    // Create pending consultation
    // -----------------------------

    const consultation = await prisma.consultation.create({
      data: {
        consultationNumber,

        treatment,
        appointmentDate,
        appointmentTime: time,

        fullName: fullName.trim(),
        age: numericAge,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),

        healthConcern: healthConcern?.trim() || null,
        communication,

        amount: CONSULTATION_FEE,
        currency: "NGN",

        paymentStatus: "PENDING",
        bookingStatus: "PENDING",
      },
    });

    // -----------------------------
    // Initialize Paystack
    // -----------------------------

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        {
          message: "Paystack configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: consultation.email,

          // Paystack expects kobo
          amount: CONSULTATION_FEE * 100,

          currency: "NGN",

          callback_url:
            `${baseUrl}/book-consultation/verify`,

          metadata: {
            consultationId: consultation.id,
            consultationNumber:
              consultation.consultationNumber,

            customerName: consultation.fullName,
            treatment: consultation.treatment,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (
      !paystackResponse.ok ||
      !paystackData.status ||
      !paystackData.data
    ) {
      console.error(
        "Paystack initialization error:",
        paystackData
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

    // -----------------------------
    // Save Paystack reference
    // -----------------------------

    await prisma.consultation.update({
      where: {
        id: consultation.id,
      },

      data: {
        paymentReference:
          paystackData.data.reference,
      },
    });

    // -----------------------------
    // Return payment URL
    // -----------------------------

    return NextResponse.json({
      success: true,

      authorizationUrl:
        paystackData.data.authorization_url,

      reference:
        paystackData.data.reference,

      consultationId:
        consultation.id,

      consultationNumber:
        consultation.consultationNumber,
    });
  } catch (error) {
    console.error(
      "Consultation initialization error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Something went wrong while creating your consultation.",
      },
      {
        status: 500,
      }
    );
  }
}