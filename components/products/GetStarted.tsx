import Image from "next/image";

import Container from "@/components/layout/Container";

import StepCard from "./StepCard";
import { gettingStarted } from "@/constants/gettingStarted";

export default function GettingStarted() {
  return (
    <section className="relative pt-28 lg:pt-38 bg-white">

      {/* Decorative Leaf */}

      <Image
        src="/images/leaf2.png"
        alt=""
        width={90}
        height={90}
        className="
          absolute
          right-0
          top-80
          w-16
          md:w-20
          lg:w-24
          h-auto
        "
      />

      <Container>

        <div className="text-center">

          <h2 className="font-heading text-4xl md:text-[40px] font-medium">
            How to Get Started
          </h2>

           </div>

            <div
               className="
                      mt-16
                        grid
                        gap-5
                         md:grid-cols-3
                        ">

          {gettingStarted.map((step, index) => (
                <div
                  key={step.id}
                  className="relative px-6"
               >

            <StepCard {...step}/>

               {index < gettingStarted.length - 1 && (
                 <div
                   className="
                   hidden
                   md:block
                   absolute
                   right-0
                   top-1/2
                  -translate-y-1/2
                   h-12
                   w-px
                   bg-primary-200
                    "
                  />
                 )}
                  </div>
          ))}

        </div>

      </Container>

    </section>
  );
}