import Image from "next/image";
import Container from "@/components/layout/Container";

export default function ProductUsage() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative Leaf */}

      <Image
        src="/images/leaf1.png"
        alt=""
        width={160}
        height={220}
        className="absolute left-0 top-0 opacity-80 pointer-events-none"
      />

      <Container>

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="mt-16 font-heading text-4xl lg:text-5xl">
            How to Use
          </h2>
          <hr className="mt-4 w-120 mx-auto border-primary-200" />

          <p className="mt-8 text-base leading-8 ">
            Follow the recommended dosage instructions provided with this
            product or as advised during your consultation.
          </p>

          <p className="mt-2 text-base leading-8 ">
            For personalized guidance, we recommend speaking with one of our wellness specialists before use.
          </p>

        </div>

      </Container>
    </section>
  );
}