import Container from "@/components/layout/Container";
import Image from "next/image";
import ContactForm from "./Contactform";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden pt-30 px-0 lg:px-22 lg:pt-38 ">

      {/* Decorative flower */}
      <Image
        src="/images/leaf4.png"
        alt=""
        width={90}
        height={90}
        className="
          absolute
          right-0
          top-100
          hidden
          lg:block
          -translate-y-1/2
        "
      />

      <Container>

        {/* Heading */}
    <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium">
            Get in Touch
          </h2>
        </div>

        {/* Form */}

       <ContactForm />

        </div>

      </Container>

    </section>
  );
}