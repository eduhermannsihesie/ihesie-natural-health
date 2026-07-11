"use client";

import { useCurrency } from "@/hooks/useCurrency";
import { formatCurrency } from "@/lib/currency";

interface Props {
  amount: number;
}

export default function Price({ amount }: Props) {
  const { locale, currency } = useCurrency();

  return (
    <>
      {formatCurrency(amount, locale, currency)}
    </>
  );
}