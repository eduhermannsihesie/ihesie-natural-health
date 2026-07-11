"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Container from "@/components/layout/Container";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/constants/testimonials";
import { useEffect } from "react";

export default function Testimonials() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const interval = setInterval(next, 5000);

  return () => clearInterval(interval);
}, []);

  function previous() {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }

  function next() {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-28">

      <Container>

        <div className="relative max-w-6xl mx-auto">

          {/* Left Arrow */}

          <button
            onClick={previous}
            className="
              absolute
              left-1
              sm:left-1
              lg:left-0
              top-1/2
              -translate-y-1/2
              flex
              h-8
              w-8
              sm:h-12
              sm:w-12
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-white
              text-primary-hover
              shadow
              hover:bg-primary-hover
              hover:text-white
              transition
            "
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Right Arrow */}

          <button
            onClick={next}
            className="
              absolute
              right-1
              sm:right-1
              lg:right-0
              top-1/2
              -translate-y-1/2
              flex
              h-8
              w-8
              sm:h-12
              sm:w-12
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-white
              text-primary-hover
              shadow
              hover:bg-primary-hover
              hover:text-white
              transition
            "
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Heading */}

          <div className="text-center mx-auto">

            <div className=" relative inline-flex items-center gap-4">

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium">
                What Our Clients Say
              </h2>

             <Image
                src="/images/bird.png"
                alt=""
                width={150}
                height={150}
                className="
                  absolute
                  -right-10
                  lg:-right-13
                  -top-20
                  lg:-top-25
                  w-20
                  md:w-28
                  lg:w-36
                  h-auto
                  hidden
                  md:block
                "
              />

            </div>

            <div className="mx-auto mt-5 h-px w-2/3 max-w-lg bg-primary-200" />
          </div>

          {/* Testimonial */}

          <div className="mt-10 lg:mt-14">

            <TestimonialCard
              quote={testimonials[current].quote}
              author={testimonials[current].author}
            />

          </div>

        </div>

      </Container>

    </section>
  );
}