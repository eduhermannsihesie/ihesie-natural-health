"use client"

import Image from "next/image";
import Button from "@/components/ui/Button";
import Price from "@/components/common/Price";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({
  slug,
  name,
  price,
  image,
}: ProductCardProps) {

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: slug,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <div className="bg-transparent">

      <Link
        href={`/products/${slug}`}
        className="block group"
      >

        <div className="relative flex h-75 items-center justify-center overflow-hidden rounded-md bg-surface-earth-light transition duration-300 hover:shadow-lg">

          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />

        </div>

        <div className="mt-6">

          <h3 className="w-full truncate font-body text-xl font-medium leading-snug">
            {name}
          </h3>

          <p className="mt-2 font-heading text-xl font-bold text-primary-hover">
            <Price amount={price} />
          </p>

        </div>

      </Link>

      <Button
        variant="secondary"
        onClick={handleAddToCart}
        className="mt-6 w-full rounded-md"
      >
        Add to Cart
      </Button>

    </div>
  );
}