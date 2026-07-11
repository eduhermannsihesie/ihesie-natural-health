"use client";

import { useMemo, useState } from "react";

import GettingStarted from '@/components/products/GetStarted'
import ProductGrid from '@/components/products/ProductGrid'
import ProductHero from '@/components/products/ProductHero'
import ProductToolbar from '@/components/products/ProductToolbar'
import WhyChooseOurProduct from '@/components/products/WhyChooseOurProduct'
import ProductCTA from '@/components/products/ProductCTA'
import ContactSection from '@/components/home/contact/ContactSection'
import React from 'react'
import { featuredProducts } from "@/constants/products";

export default function Products() {
  const [filter, setFilter] = useState("All");

  const filteredProducts = useMemo(() => {
  if (filter === "All") return featuredProducts;

  return featuredProducts.filter(
    (product) => product.category === filter
  );
}, [filter]);
  return (
    <>
    <ProductHero />
    <ProductToolbar 
       total={filteredProducts.length}
       selected={filter}
       onChange={setFilter}
    />
    <ProductGrid 
      featuredProducts={filteredProducts}
     />
    <WhyChooseOurProduct />
    <GettingStarted />
    <ProductCTA />
    <ContactSection />

    </>
  )
}
