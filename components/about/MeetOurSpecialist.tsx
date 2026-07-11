import Image from "next/image";
import Container from "@/components/layout/Container";

export default function CoreBelief() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">

      <Container>

        <div className="mx-auto flex flex-col items-center gap-15 lg:gap-20">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xltext-4xl lg:text-5xl leading-tight font-medium">
              Meet the Specialist
            </h2>

        <div className="flex flex-col lg:flex-row items-center gap-15 lg:gap-30 ">
          <div className="flex flex-col gap-6">
            
            <div>

            <h4 className="mt-3 text-lg lg:text-2xl font-medium text-primary-hover">
              Expert Guidance for Your Wellness Journey
            </h4>

            <p className="mt-6 text-base lg:text-lg leading-8">
              At Ihesie Natural Health Services, our specialist is passionate about helping people achieve better health through natural and holistic approaches. With years of experience and ongoing research into botanical remedies and wellness practices, the focus is on providing personalized guidance and natural solutions that support long-term well-being.
            </p>

            <p className="mt-4 text-base lg:text-lg leading-8 ">
              Every consultation is approached with care, professionalism, and a commitment to understanding each individual's unique wellness needs.
            </p>

            </div>

            <div className="flex flex-col gap-2">
                <h5 className="text-lg lg:text-xl font-semibold">Meet Our Founder & Natural Health Specialist</h5>
                <h4 className="text-xl lg:text-2xl font-medium text-primary-hover">Victor Ihesie</h4>
                <p className="text-base lg:text-lg">Natural Health Practitioner & Herbal Wellness Specialist</p>
            </div>

            <p className="text-base lg:text-lg leading-8">
              With years of experience in natural wellness and botanical research, Victor Ihesie is dedicated to helping individuals pursue healthier lives through holistic care and personalized wellness guidance.
            </p>

          </div>

          {/* Right Images */}

            <div className="flex justify-end items-center">

              <Image
                src="/images/victorihesie.png"
                alt="Specialist"
                 width={430}
                 height={430}
                className="
                        w-72
                        sm:w-80
                        md:w-96
                        lg:w-100
                        max-w-md
                        object-cover
                        "
              />
              </div>


        </div>


        </div>

      </Container>

    </section>
  );
}