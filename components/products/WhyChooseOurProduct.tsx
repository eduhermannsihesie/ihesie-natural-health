import Image from "next/image";

import Container from "@/components/layout/Container";

import { whyChooseOurPeoduct } from "@/constants/WhyChooseOurProduct";
import FeatureProductItem from "./FeaturedProductItem";

export default function WhyChooseOurProduct() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-38">

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

          <h2 className="font-heading text-4xl lg:text-[40px] font-medium">
            Why Choose Our Products?
          </h2>

        </div>

        {/* Main Layout */}

        <div
          className="
            mt-10
            lg:mt-12
            lg:px-30
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            items-center
            max-w-6xl
            mx-auto
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
                w-65
                sm:w-75
                md:w-85
                lg:w-95
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
              gap-4
              lg:gap-6
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