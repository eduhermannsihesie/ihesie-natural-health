import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ServiceCard from "../home/ServiceCard";
import { services } from "@/constants/services";
import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <section className="pt-30 lg:pt-40">

      <Container>

        <div className="mx-auto max-w-2xl text-center">

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-medium">
                What We Do
            </h2>


            <p className="mt-3 text-body text-base lg:text-lg text-primary-hover mx-auto leading-8 ">
                    We provide natural wellness support across a wide range of health areas, including:          </p>

        </div>

        <div className="relative mt-8 overflow-hidden mx-auto max-w-235 px-4 py-5 lg:py-8 lg:px-6">
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

        <div className="mt-10 text-center">

            <p className="max-w-3xl mx-auto text-base text-muted">
                We also offer a range of carefully developed botanical wellness products designed to support everyday health.
            </p>
         
            <Link href="/products">

                <Button 
                size="lg"
                variant="secondary"
                
                className="mt-6 text-lg py-6 px-14"
                >
               View Our Products
                </Button>

            </Link>

        </div>

      </Container>

    </section>
  );
}