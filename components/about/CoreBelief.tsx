import Image from "next/image";
import Container from "@/components/layout/Container";

export default function CoreBelief() {
  return (
    <section className="relative pt-28 lg:pt-38">

      {/* Decorative Leaf */}
       <Image
                    src="/images/leaf1.png"
                    width={400}
                    height={400}
                    alt="Medicinal Herb"
                    className="absolute -left-1 -bottom-60 w-30 lg:w-40"
                  />
      

      <Container>

        <div className="mx-auto lg:px-30 flex flex-col lg:flex-row items-center gap-15 lg:gap-20">

          {/* Left Content */}

          <div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] leading-tight font-medium">
              Our Core Belief
            </h2>

            <h4 className="mt-3 text-lg lg:text-xl font-medium text-primary-hover">
              Nature's Guarantee
            </h4>

            <p className="mt-6 text-base text-muted">
              We believe that the natural world contains remarkable
              resources that can support human health and well-being.
              Guided by research and professional practice, we are
              committed to exploring and applying these natural
              solutions responsibly.
            </p>

            <p className="mt-4 text-base text-muted">
              Our mission is to help individuals pursue lasting wellness
              through holistic care and nature-inspired therapies.
            </p>

          </div>

          {/* Right Images */}

            <div className="flex justify-end items-center">

              <Image
                src="/images/groupA.png"
                alt="Fresh medicinal herbs"
                 width={430}
                 height={430}
                className="
                        w-72
                        sm:w-75
                        md:w-80
                        max-w-md
                        object-cover
                        "
              />
              </div>


        </div>

      </Container>

    </section>
  );
}