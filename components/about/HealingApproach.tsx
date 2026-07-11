import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

import HealingStep from "./HealingStep";
import { healingSteps } from "@/constants/healingSteps";
import Image from "next/image";

export default function HealingApproach() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          
           <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xltext-4xl lg:text-5xl leading-tight font-medium">
             Our Healing Approach
          </h2>

          <p className="mt-4 text-xl text-primary-hover font-medium">
            Your Journey to Better Wellness
          </p>

        </div>

        {/* Desktop */}

        <div className="hidden lg:block mt-20">

          <div className="grid grid-cols-12 gap-y-16">

            <div className="col-span-4">
              <HealingStep
                number={1}
                title={healingSteps[0].title}
                description={healingSteps[0].description}
              />
            </div>
            

            <div className=" relative col-span-4">
                 <Image
                 src="/images/Arrow-1.svg"
                 alt=""
                 width={80}
                 height={80}
                 className="absolute top-15 -left-10"
                   />
            </div>

            <div className="col-span-4"></div>

            <div className=" col-span-1"></div>

            <div className="relative col-span-5 mt-8">
              <HealingStep
                number={2}
                title={healingSteps[1].title}
                description={healingSteps[1].description}
              />
               <Image
                 src="/images/Arrow-2.svg"
                 alt=""
                 width={60}
                 height={120}
                 className="absolute -top-16 right-0"
               />
            </div>

            
            

            <div className="relative col-span-4 -mt-12">
              <HealingStep
                number={3}
                title={healingSteps[2].title}
                description={healingSteps[2].description}
              />
              <Image
                 src="/images/Arrow-3.svg"
                 alt=""
                 width={70}
                 height={120}
                  className="absolute top-22 left-54 "
                 />
            </div>

            <div className="col-span-2"></div>

            <div className="col-span-8"></div>

            <div className="col-span-4 -mt-6 ">
              <HealingStep
                number={4}
                title={healingSteps[3].title}
                description={healingSteps[3].description}
              />
            </div>

          </div>

        </div>

        {/* Mobile */}

        <div className="mt-16 flex flex-col gap-10 lg:hidden">

          {healingSteps.map((step) => (
            <div
              key={step.id}
              className="text-center"
            >
              <HealingStep
                number={step.id}
                title={step.title}
                description={step.description}
              />

              {step.id < healingSteps.length && (
                <div className="my-6 text-3xl text-primary">
                  ↓
                </div>
              )}
            </div>
          ))}

        </div>

        {/* Button */}

        <div className="mt-20 flex justify-center">

          <Link href="/book-consultation">

            <Button size="xl">
              Book a Consultation
            </Button>

          </Link>

        </div>

      </Container>
    </section>
  );
}