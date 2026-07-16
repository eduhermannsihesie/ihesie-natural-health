import Image from "next/image";

import Container from "@/components/layout/Container";

export default function ProductHero() {
  return (
    <section className="relative h-75 lg:70 overflow-hidden">

      {/* Background */}

      <Image
        src="/images/wellnesshero.svg"
        alt="Natural herbal products"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-surface-green-dark/80" />

      <Container>

        <div className="relative flex h-75 lg:70 max-w-5xl flex-col justify-center">

          <h2 className="font-heading text-4xl lg:text-5xl text-white leading-tight font-semibold">
            Health Tips & Wellness Resources
          </h2>
          <h4 className="text-white font-medium mt-2 text-lg lg:text-xl">
           Learn, Grow, and Take Charge of Your Wellness
           </h4>

          <p className="mt-2 leading-8 text-white text-base">
            Explore expert wellness advice, educational articles, practical health tips, and informative videos designed to help you make informed decisions about your health and lifestyle.          
            </p>

        </div>

      </Container>

    </section>
  );
}