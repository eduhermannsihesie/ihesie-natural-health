import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

import { whyChooseUs } from "@/constants/whyChooseUs";
import FeatureItem from "./FeatureItem";

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidde pt-30 lg:pt-38">

      {/* Decorative flower */}
     <Image
        src="/images/leaf3.png"
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

        <div className="text-center max-w-3xl mx-auto">

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium ">
            Why Choose Us
          </h2>

          <p className="mt-4 text-xl font-medium text-primary-hover ">
            Why Families Trust Ihesie Natural Health Services
          </p>

        </div>

        {/* Main Layout */}

        <div
          className="
            mt-10
            lg:mt-12
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-20
            xl:gap-24
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
              width={420}
              height={420}
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

            {whyChooseUs.map((item) => (

              <FeatureItem
                key={item.number}
                {...item}
              />

            ))}

          </div>

        </div>

        {/* Button */}

        <div className="mt-10 lg:mt-16 flex justify-center">

          <Link href="/contactus">

            <Button 
              className="w-full sm:w-auto text-base lg:text:lg px-10 py-5">
              Book a Consultation
            </Button>
            

          </Link>

        </div>

      </Container>

    </section>
  );
}