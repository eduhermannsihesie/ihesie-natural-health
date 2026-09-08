import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="pt-28 lg:pt-38">


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
              lg:text-[40px]
              font-medium
              text-white
              leading-tight
            "
          >
            Need Help Choosing the Right Product?
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-base
              leading-7
              lg:leading-8
              text-white/90
            "
          >
            Our team is available to help you find natural wellness solutions that align with your health goals.
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