import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

import ProductCard from "./ProductCard";

import { featuredProducts } from "@/constants/products";

interface RelatedProductsProps {
  currentProduct: string;
}

export default function RelatedProducts({
  currentProduct,
}: RelatedProductsProps) {

  // Remove the current product
  const relatedProducts = featuredProducts
    .filter((product) => product.slug !== currentProduct)
    .slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-white">

      <Container>

        {/* Heading */}

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

          <div>

            <h2 className="font-heading text-3xl md:text-4xl">
              Related Products
            </h2>

            <p className="mt-2 text-muted">
              You may also be interested in these natural remedies.
            </p>

          </div>

          <Link href="/products">

            <Button variant="secondary">
              View All Products
            </Button>

          </Link>

        </div>

        {/* Products */}

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {relatedProducts.map((product) => (

  <ProductCard
    key={product.id}
    {...product}
  />

))}

        </div>

      </Container>

    </section>
  );
}