import Container from "@/components/layout/Container";
import ProductCard from "./ProductCard";
import { featuredProducts } from "@/constants/products";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";

export default function FeaturedProducts() {
  return (
    <section className="pt-30 lg:pt-38">

      <Container>

        {/* Heading */}

        <div>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

              <div className="w-full lg:max-w-2xl">

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground">
                  Featured Natural Remedies
                </h2>

                <p className="mt-4 text-base lg:text-lg text-primary-hover">
                  We offer carefully developed herbal products focused on supporting different aspects of health and wellness.
                </p>

              </div>

              <Link
                href="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  self-start
                  lg:self-auto
                  rounded-md
                  border-2
                  border-primary
                  bg-surface-earth-light
                  px-5
                  sm:px-6
                  py-2
                  text-sm
                  lg:text-base
                  font-semibold
                  text-surface-green-dark
                  transition
                  hover:bg-primary
                  hover:text-white
                "
              >
                View all products
              </Link>

            </div>

                        {/* Products */}
                          

                        <div className="mt-8 sm:mt-10 lg:mt-14">
                        <ProductCarousel />
                      </div>

                      
                    </div>

      </Container>

    </section>
  );
}