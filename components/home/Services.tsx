import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ServiceCard from "./ServiceCard";
import { services } from "@/constants/services";
import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <section className="pt-30 lg:pt-38">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium">
            Our Natural Wellness Services
          </h2>

          <p className="mt-4 text-xl font-medium text-primary-hover ">Supporting Your Journey to Better Health</p>

         

        </div>

  <div className="relative mt-8 overflow-hidden mx-auto max-w-5xl px-4 py-6 lg:py-10 lg:px-8">
  <Image 
    src="/images/plant-background.png" 
    fill
    alt="Botanical background" 
    className="object-cover"
  />  

   {/* Overlay */}
  
 <div className="absolute inset-0 bg-surface-earth-dark/62 z-10" />
 
 <div className="relative z-20 mx-auto max-w-6xl border border-border bg-white/5 p-4 md:p-6 lg:p-8">
  
  <div className="grid gap-3 md:grid-cols-[1.9fr_1.1fr_1.1fr] ">


   <ServiceCard
      {...services[0]}
      layout="horizontal"
      className="min-h-fit sm:min-h-56 md:min-h-60 lg:min-h-65"
    />

    <ServiceCard
      {...services[1]}
      className="min-h-fit sm:min-h-56 md:min-h-60 lg:min-h-65"
    />

    <ServiceCard
      {...services[2]}
      className="min-h-fit sm:min-h-56 md:min-h-60 lg:min-h-65"
    />
</div>


<div className="mt-3 grid gap-3 md:grid-cols-[1.1fr_1.9fr]">

    <ServiceCard
      {...services[3]}
      layout="horizontal"
      className="min-h-fit sm:min-h-52 md:min-h-56 lg:min-h-60"
    />

    <ServiceCard
      {...services[4]}
      layout="horizontal"
      className="min-h-fit sm:min-h-52 md:min-h-56 lg:min-h-60"
    />

</div>

<div className="mt-3 grid gap-3 md:grid-cols-[1.2fr_1.5fr_0.9fr]">

    <ServiceCard
      {...services[5]}
      className="min-h-fit sm:min-h-60 md:min-h-64 lg:min-h-75"
    />

    <ServiceCard
      {...services[6]}
      layout="horizontal"
      className="min-h-fit sm:min-h-60 md:min-h-64 lg:min-h-75"
    />

    <ServiceCard
      {...services[7]}
      className="min-h-fit sm:min-h-60 md:min-h-64 lg:min-h-75"
    />

</div>


</div>
</div>

        <div className=" mt-4 lg:mt-6 flex  flex-col gap-7 items-center">

           <p className="mt-4 text-center max-w-3xl">
            Every individual deserves a personalized approach to health. Our natural wellness programs are designed to support different aspects of physical and emotional well-being.
          </p>

          <Link href="/contactus">

            <Button 
              size="lg"
             
              className="text-lg py-6 px-14"
              >
              Book a Consultation
            </Button>

          </Link>

        </div>

      </Container>

    </section>
  );
}