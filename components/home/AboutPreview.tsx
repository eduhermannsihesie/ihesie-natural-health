import Image from "next/image";
import Link from "next/link";


import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";


export default function AboutPreview() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>

        <div className="relative grid lg:grid-cols-2 items-center">

         <Image
              src="/images/leaf1.png"
              width={400}
              height={400}
              alt="Medicinal Herb"
              className="absolute -left-20 -bottom-60 w-50"
            />

          {/* Left */}

          <div>           

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium">
              Nature's Healing,
              <br />
              Backed by Research
            </h2>

          </div>

          {/* Right */}

          <div className="flex flex-col items-start justify-center">

            <p className="mt-6">
              At Ihesie Natural Health Services, we believe that nature holds the answer to lasting wellness. Our mission is to combine the healing power of Earth's vegetation with professional research and holistic healthcare practices to help individuals regain sound health naturally.
            </p>

            <p className="mt-6">
              For years, we have developed natural remedies, therapies, and wellness protocols focused on addressing the root causes of illness — not just temporary symptoms.
            </p>

            <div className="mt-10">
              <Link href="/aboutus">

                <Button 
                    variant="secondary"
                    className="border-secondary-earth-dark font-semibold bg-surface-earth-dark hover:bg-surface-earth-light hover:text-surface-earth-dark px-10 py-6 rounded-md transition-colors duration-200"
                    >
                  Learn More About Us
                </Button>

              </Link>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}