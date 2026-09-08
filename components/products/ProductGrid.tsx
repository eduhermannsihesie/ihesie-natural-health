import Container from "@/components/layout/Container";
import { featuredProducts } from "@/constants/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductGridProps {
  featuredProducts: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    weight: string;
    image: string;
    category: string;
  }[];
}

export default function ProductGrid({
  featuredProducts,
}: ProductGridProps) {
  return (
    <Container>
    <div className="mt-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {featuredProducts.map((product) => (
        <Link
        key={product.id}
        href={`/products/${product.slug}`}
        >
        
        <ProductCard
          {...product}
        />
        </Link>
      ))}
    </div>
    </Container>
  );
}