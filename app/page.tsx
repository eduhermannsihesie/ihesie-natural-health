import Image from "next/image";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Services from "@/components/home/Services";
import FeaturedProducts from "@/components/home/products/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CTA";
import ContactSection from "@/components/home/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Services />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <ContactSection />
    </>
  );
}
