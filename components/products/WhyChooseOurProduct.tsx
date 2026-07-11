import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

import { whyChooseOurPeoduct } from "@/constants/WhyChooseOurProduct";
import FeatureProductItem from "./FeaturedProductItem";

export default function WhyChooseOurProduct() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-50">

      {/* Decorative flower */}
     <Image
        src="/images/leaf1.png"
        alt=""
        width={90}
        height={90}
        className="
          absolute
          left-0
          bottom-0
          w-12
          sm:w-16
          lg:w-24
          h-auto
          opacity-80
        "
      />

      <Container>

        {/* Heading */}

        <div className="mt-20 text-center max-w-3xl mx-auto">

          <h2 className="font-heading text-4xl lg:text-5xl font-medium">
            Why Choose Our Products?
          </h2>

        </div>

        {/* Main Layout */}

        <div
          className="
            mt-10
            lg:mt-14
            py-6
            sm:py-8
            lg:py-10
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-20
            xl:gap-24
            items-center
          "
        >

          {/* Left Image */}

          <div className="flex justify-center">
           <Image
              src="/images/whychooseus.png"
              alt="Medicinal Herbs"
              width={450}
              height={450}
              className="
                w-72
                sm:w-80
                md:w-96
                lg:w-full
                max-w-md
                h-auto
                object-cover
              "
            />

          </div>

          {/* Right */}

          <div
            className="
              flex
              flex-col
              gap-6
              lg:gap-8
            "
          >

            {whyChooseOurPeoduct.map((item) => (

              <FeatureProductItem
                key={item.number}
                {...item}
              />

            ))}

          </div>

        </div>

     

      </Container>

    </section>
  );
}