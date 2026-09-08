import Image from "next/image";

import Container from "@/components/layout/Container";

export default function ProductHero() {
  return (
    <section className="relative h-80 overflow-hidden">

      {/* Background */}

      <Image
        src="/images/producthero.svg"
        alt="Natural herbal products"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-surface-green-dark/80" />

      <Container>

        <div className="relative flex h-80 max-w-5xl flex-col justify-center">

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] text-white leading-tight font-medium">
            Products
          </h2>
          <h4 className="text-white font-medium mt-4 text-lg">Natural Wellness Products Inspired by Nature</h4>

          <p className="mt-4 text-white">
            At Ihesie Natural Health Services, we offer a carefully selected range of botanical wellness products developed through research and a holistic approach to health. Our products are designed to support the body's natural balance and promote everyday well-being.
          </p>
          <p className="mt-1 text-white">
           Whether you are looking to support digestion, heart health, joint mobility, or general vitality, we are committed to providing natural wellness solutions you can trust.
           </p>

        </div>

      </Container>

    </section>
  );
}