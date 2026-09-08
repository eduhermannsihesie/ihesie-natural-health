export const BASE_CURRENCY = "NGN";

export const currencies = {
  NGN: {
    code: "NGN",
    locale: "en-NG",
    country: "NG",
  },

  USD: {
    code: "USD",
    locale: "en-US",
    country: "US",
  },

  GBP: {
    code: "GBP",
    locale: "en-GB",
    country: "GB",
  },

  CAD: {
    code: "CAD",
    locale: "en-CA",
    country: "CA",
  },

  AUD: {
    code: "AUD",
    locale: "en-AU",
    country: "AU",
  },

  EUR: {
    code: "EUR",
    locale: "en-IE",
    country: "EU",
  },
};

export function formatCurrency(
  amount: number,
  locale: string,
  currency: string
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2,
  }).format(amount);
}