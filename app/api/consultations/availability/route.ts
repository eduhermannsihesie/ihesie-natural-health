import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const dateParam =
      request.nextUrl.searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        {
          message: "Date is required.",
        },
        {
          status: 400,
        }
      );
    }

    const selectedDate =
      new Date(`${dateParam}T00:00:00`);

    if (Number.isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        {
          message: "Invalid date.",
        },
        {
          status: 400,
        }
      );
    }

    const startOfDay =
      new Date(selectedDate);

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay =
      new Date(selectedDate);

    endOfDay.setHours(23, 59, 59, 999);

    const consultations =
      await prisma.consultation.findMany({
        where: {
          appointmentDate: {
            gte: startOfDay,
            lte: endOfDay,
          },

          bookingStatus: "CONFIRMED",
        },

        select: {
          appointmentTime: true,
        },
      });

    const bookedTimes =
      consultations.map(
        (consultation) =>
          consultation.appointmentTime
      );

    return NextResponse.json({
      success: true,
      bookedTimes,
    });
  } catch (error) {
    console.error(
      "Consultation availability error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to check consultation availability.",
      },
      {
        status: 500,
      }
    );
  }
}