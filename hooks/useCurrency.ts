"use client";

import { useEffect, useState } from "react";

export function useCurrency() {
  const [locale, setLocale] = useState("en-NG");
  const [currency, setCurrency] = useState("NGN");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCurrency() {
      try {
        setLoading(true);

        // 1. Detect user's currency
        const currencyResponse = await fetch("/api/currency");

        if (!currencyResponse.ok) {
          throw new Error("Failed to detect currency");
        }

        const currencyData = await currencyResponse.json();

        setLocale(currencyData.locale);
        setCurrency(currencyData.currency);

        // 2. NGN does not need conversion
        if (currencyData.currency === "NGN") {
          setExchangeRate(1);
          return;
        }

        // 3. Get NGN → selected currency rate
        const rateResponse = await fetch(
          `/api/exchange-rate?currency=${currencyData.currency}`
        );

        if (!rateResponse.ok) {
          throw new Error("Failed to fetch exchange rate");
        }

        const rateData = await rateResponse.json();

        setExchangeRate(rateData.rate);
      } catch (error) {
        console.error("Currency error:", error);

        // Safe fallback
        setLocale("en-NG");
        setCurrency("NGN");
        setExchangeRate(1);
      } finally {
        setLoading(false);
      }
    }

    loadCurrency();
  }, []);

  return {
    locale,
    currency,
    exchangeRate,
    loading,
  };
}