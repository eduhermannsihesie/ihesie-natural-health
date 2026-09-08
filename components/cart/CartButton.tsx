"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center p-2 text-primary hover:text-primary-hover"
      aria-label="Shopping cart"
    >
      <ShoppingCart size={23} />

      {cartCount > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-primary
            px-1
            text-[10px]
            font-semibold
            text-white
          "
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
}