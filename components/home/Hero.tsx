import React from 'react'
import Button from '@/components/ui/Button'
import Link from 'next/link'


const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">

            
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source   
                    src="/branding/15653000_3840_2160_30fps.mp4"
                    type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-surface-green-dark/50" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="max-w-5xl px-6 text-center flex flex-col items-center justify-center gap-1">

                <h1 className="font-heading text-5xl md:text-[56px] font-bold leading-tight text-white">
                    Natural Solutions for Modern Health Challenges
                </h1>

                <p className="mt-6 font-semibold text-base text-white max-w-4xl mx-auto">
                    Discover powerful, research-driven herbal remedies and holistic
                    therapies inspired by nature's healing power. At Ihesie Natural
                    Health Services, we help restore balance, vitality, and long-term
                    wellness through trusted natural healthcare solutions.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">

                    <Link href="/book-consultation">
                            <Button
                                variant="primary"
                                size="lg"
                                className="border-2 border-white rounded-md text-lg"
                            >
                            Book a Consultation
                        </Button>
                    </Link>

                    <Link href="/products">
                             <Button 
                                variant="secondary" 
                                size="lg"
                                className='border-2 border-white rounded-md text-lg'
                                >
                        Explore Products
                    </Button>
                    </Link>

                </div>

                </div>
            </div>

            
            
        </section>
  );
}

export default Hero