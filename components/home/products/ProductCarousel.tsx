"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import { featuredProducts } from "@/constants/products";
import CarouselButtons from "./CarouselButtons";
import Autoplay from "embla-carousel-autoplay";
import CarouselDots from "./CarouselDots";

export default function ProductCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);  

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  },
  [
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]

);

  const scrollPrev = () => emblaApi?.scrollPrev();

  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);


  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        ref={emblaRef}
      >

      <div className="flex">

        {featuredProducts.map((product) => (

          <div
            key={product.id}
            className="min-w-full md:min-w-[50%] lg:min-w-[25%] px-3"
          >

            <ProductCard {...product} />

          </div>

        ))}

      </div>

        </div>
        

    <div className="absolute -top-16 right-0 flex gap-3">
      <CarouselButtons 
        previous={scrollPrev}
        next={scrollNext}
      />
    </div>

    <CarouselDots
        count={featuredProducts.length}
        current={selectedIndex}
        onSelect={(index) => emblaApi?.scrollTo(index)}
    />

</div>
  );
}