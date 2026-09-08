"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { formatCurrency } from "@/lib/currency";

interface PriceProps {
  amount: number;
}

export default function Price({ amount }: PriceProps) {
  const {
    locale,
    currency,
    exchangeRate,
    loading,
  } = useCurrency();

  if (loading) {
    return (
      <>
        {formatCurrency(
          amount,
          "en-NG",
          "NGN"
        )}
      </>
    );
  }

  const convertedAmount = amount * exchangeRate;

  return (
    <>
      {formatCurrency(
        convertedAmount,
        locale,
        currency
      )}
    </>
  );
}