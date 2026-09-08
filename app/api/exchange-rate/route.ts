import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const currency = searchParams.get("currency") || "NGN";

    // NGN is already our base currency
    if (currency === "NGN") {
      return NextResponse.json({
        currency: "NGN",
        rate: 1,
      });
    }

    const response = await fetch(
      `https://open.er-api.com/v6/latest/NGN`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    const rate = data.rates?.[currency];

    if (!rate) {
      return NextResponse.json(
        {
          message: `Exchange rate for ${currency} was not found.`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      currency,
      rate,
    });
  } catch (error) {
    console.error("Exchange rate error:", error);

    return NextResponse.json(
      {
        message: "Unable to fetch exchange rate.",
      },
      {
        status: 500,
      }
    );
  }
}