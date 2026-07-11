"use client";

import { useEffect, useState } from "react";

export function useCurrency() {
  const [locale, setLocale] = useState("en-NG");
  const [currency, setCurrency] = useState("NGN");

  useEffect(() => {
    const browserLocale = navigator.language;

    setLocale(browserLocale);

    if (browserLocale.includes("US")) {
      setCurrency("USD");
    } else if (browserLocale.includes("GB")) {
      setCurrency("GBP");
    } else if (browserLocale.includes("CA")) {
      setCurrency("CAD");
    } else if (browserLocale.includes("AU")) {
      setCurrency("AUD");
    } else {
      setCurrency("NGN");
    }
  }, []);

  return {
    locale,
    currency,
  };
}