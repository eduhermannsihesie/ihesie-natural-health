import Image from "next/image";
import Button from "@/components/ui/Button";
import Price from "@/components/common/Price";
import Link from "next/link";

interface ProductCardProps {
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  weight: string;
}

export default function ProductCard({
  slug,
  name,
  description,
  price,
  weight,
  image,
}: ProductCardProps) {
  return (
    <article
      className="bg-transparent flex flex-col h-full"
    >
      
      <div className=" transition duration-300 hover:shadow-lg flex items-center justify-center relative h-70 rounded-md bg-surface-earth-light">
        <Image
          src={image}
          alt={name}
          width={170}
          height={170}
          className="object-contain"
        />
      </div>

      {/* Content */}

      <div className="mt-6">

        <h3 className="font-medium text-xl truncate w-full leading-snug">
          {name}
        </h3>

        <p
          className="
            mt-2
            text-muted
            text-sm
            leading-7
            line-clamp-2
            min-h-14
          "
        >
            
          {description}
        </p>

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
          "
        >
             <p className="mt-2 text-xl font-heading font-bold">
              <Price amount={price} />
            </p>

          <span className="text-heading text-xl text-primary-hover font-semibold">
            {weight}
          </span>
        </div>

       
        <Button
          variant="secondary"
          className="mt-6 rounded-xl text-xl w-full "
        >
          Buy
        </Button>
       

      </div>

    </article>
  );
}