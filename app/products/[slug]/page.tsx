import { notFound } from "next/navigation";

import { featuredProducts } from "@/constants/products";
import ProductDescHero from "@/components/products/ProductDescHero";
import ProductCTA from "@/components/products/ProductCTA";
import FeaturedProducts from "@/components/home/products/FeaturedProducts";
import ProductUsage from "@/components/products/ProductUsage";
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = featuredProducts.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDescHero product={product} />
      <ProductUsage />
      <ProductCTA />
      <FeaturedProducts />

    </>
  );
}