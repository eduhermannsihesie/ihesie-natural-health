import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="pt-20 lg:pt-28">


        <div
          className="
            mx-auto
            bg-surface-green-dark
            px-12
            py-14
            lg:px-16
            lg:py-18
            text-center
          "
        >

          <h2
            className="
              font-heading
              text-4xl
              lg:text-5xl
              font-medium
              text-white
              leading-tight
            "
          >
            Start Your Wellness Journey Today
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-lg
              lg:text-xl
              leading-7
              lg:leading-8
              text-white/90
            "
          >
            Book a consultation with our natural health specialists and
            receive personalized guidance tailored to your wellness needs.
          </p>

          <div
            className="
              mt-10
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:justify-center
            "
          >

            <Link
              href="/book-consultation"
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                className="
                  w-full
                  sm:w-auto
                  border-2
                  border-white
                  px-8
                  lg:px-10
                "
              >
                Book a Consultation
              </Button>
            </Link>

            <Link
              href="https://wa.me/2348012345678"
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                className="
                  w-full
                  sm:w-auto
                  border-2
                  border-white
                  px-8
                  lg:px-10
                "
              >
                Contact Us on WhatsApp
              </Button>
            </Link>

          </div>

        </div>


    </section>
  );
}