import Image from "next/image";
import Button from "@/components/ui/Button";
import Price from "@/components/common/Price";
import Link from "next/link";

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
  return (
    <Link href={`/products/${slug}`} className="block group">
    <div className="bg-transparent ">

      <div className="transition duration-300 hover:shadow-lg flex items-center justify-center relative h-80 rounded-md bg-surface-earth-light overflow-hidden group">

        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />

      </div>

      <div className="mt-6">

        <h3 className="font-body font-medium text-xl truncate w-full leading-snug">
          {name}
        </h3>

        <p className="mt-2 text-xl font-heading font-bold text-primary-hover">
          <Price amount={price} />
        </p>

      </div>

      <Button
        variant="secondary"
        className="mt-6 w-full rounded-4xl"
      >
        Add to Cart
      </Button>

    </div>
    </Link>
  );
}