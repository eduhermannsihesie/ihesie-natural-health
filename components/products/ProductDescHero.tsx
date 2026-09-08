"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import {useState} from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Price from "@/components/common/Price";

interface ProductHeroProps {
  product: {
    slug: string;
    name: string;
    title: string;
    image: string;
    description: string;
    price: number;
    weight: string;
    keyBenefits: string[];
  };
}


export default function ProductDescHero({
  product,
}: ProductHeroProps) {
        const [quantity, setQuantity] = useState(1);
        const { addToCart } = useCart();
        const router = useRouter();
      
        const handlePurchase = () => {
        addToCart({
          id: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        });

        router.push("/checkout");
      };

        return (
          <section className="pt-8 lg:pt-12">
            <Container>
            <div
              className="text-xs text-muted text-right mb-12">
                Home /
                Products /
                  <span className="text-primary-hover font-medium">
                  {product.name}
                  </span>
              </div>

              <div className="max-w-240 mx-auto grid gap-15 lg:grid-cols-2 items-center">

                {/* Product Image */}

                <div className="relative h-120 flex justify-center items-center rounded-xl bg-surface-earth-light p-8">

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />

                </div>

                {/* Product Details */}

                <div>

                  <h1 className="font-body text-3xl lg:text-4xl font-medium">
                    {product.name}
                  </h1>
                  
                  <h4 className="mt-4 text-xl text-primary-hover font-medium">{product.title}</h4>

                  <p className="mt-4 text-base text-muted leading-8">
                    {product.description}
                  </p>

                  <h3 className="mt-4  text-primary-hover text-xl">
                    Key Benefits
                    </h3>

                  <ul className="mt-2 space-y-1">
                      {product.keyBenefits.map((benefit)=>(
                          <li key={benefit}
                          className="text-muted flex gap-3">
                              •
                              <span>{benefit}</span>
                          </li>
                      ))}
                  </ul>



                  <div className="mt-6 flex items-center justify-between gap-8">

                    <div>

                      <p className="text-sm text-muted">
                        Price
                      </p>

                      <p className="text-2xl font-heading font-semibold text-primary-hover">
                        <Price amount={product.price}/>
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-muted">
                        Weight
                      </p>

                      <p className="text-xl font-heading font-semibold text-primary-hover">
                        {product.weight}
                      </p>

                    </div>

                  </div>

                  <div className=" mt-6 flex gap-6 items-center">

                  
                <div className="flex items-center border-2 rounded-full  w-fit">
              
                  <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      className="px-4 py-1.5"
                      >
                        -
                    </button>
                    <span className="min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => current + 1)
                        }
                        className="px-4 py-1.5"
                      >
                        +
                      </button>
                  </div>


                  <Button
                      type="button"
                      size="lg"
                      variant="secondary"
                      onClick={handlePurchase}
                      className="w-full text-xl"
                    >
                      Purchase
                    </Button>
                </div>

                </div>


              </div>

            </Container>
          </section>
        );
}