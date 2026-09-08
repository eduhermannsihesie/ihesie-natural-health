import { NextResponse } from "next/server";

const countryCurrencyMap: Record<
  string,
  {
    currency: string;
    locale: string;
  }
> = {
  NG: {
    currency: "NGN",
    locale: "en-NG",
  },

  US: {
    currency: "USD",
    locale: "en-US",
  },

  GB: {
    currency: "GBP",
    locale: "en-GB",
  },

  CA: {
    currency: "CAD",
    locale: "en-CA",
  },

  AU: {
    currency: "AUD",
    locale: "en-AU",
  },

  DE: {
    currency: "EUR",
    locale: "de-DE",
  },

  FR: {
    currency: "EUR",
    locale: "fr-FR",
  },

  IT: {
    currency: "EUR",
    locale: "it-IT",
  },

  ES: {
    currency: "EUR",
    locale: "es-ES",
  },

  IE: {
    currency: "EUR",
    locale: "en-IE",
  },

  NL: {
    currency: "EUR",
    locale: "nl-NL",
  },
};

export async function GET(request: Request) {
  const headers = request.headers;

  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    "NG";

  const currencyData =
    countryCurrencyMap[country] ??
    countryCurrencyMap.NG;

  return NextResponse.json({
    country,
    currency: currencyData.currency,
    locale: currencyData.locale,
  });
}