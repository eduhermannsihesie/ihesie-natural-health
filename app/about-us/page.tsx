import AboutHero from '@/components/about/AboutHero'
import CoreBelief from '@/components/about/CoreBelief'
import WhatWeDo from '@/components/about/WhatWeDo'
import MeetOurSpecialist from '@/components/about/MeetOurSpecialist'
import React from 'react'
import HealingApproach from '@/components/about/HealingApproach'
import Testimonials from "@/components/home/Testimonials";
import CallToAction from '@/components/home/CTA'
import ContactSection from '@/components/home/contact/ContactSection'

export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <CoreBelief />
      <WhatWeDo />
      <MeetOurSpecialist />
      <HealingApproach />
      <Testimonials />
      <CallToAction />
      <ContactSection />
    </>
  )
}
