import Container from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";

import {
  Phone,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 mt-30 lg:mt-40">

      {/* Main Footer */}

      <div>

        <Container>

          <div className="flex flex-col items-center">

            {/* Logo */}
            <div>

              <Link href="/" className="flex items-center gap-1 font-heading text-2xl font-bold text-primary">
                <Image
                  src="/branding/ihesie-logo.png"
                  alt="Ihesie Natural Health"
                  width={80}
                  height={80}
                  className="h-auto w-18"
                />

                
                  <span className="font-body text-lg font-bold text-primary">
                    Ihesie Natural Health </span>
              
              </Link>
            </div>


            {/* Contact */}

            <div className="mt-4 flex items-center flex-col lg:flex-row gap-8 lg:gap-10 ">

              <div className="flex items-center gap-6 lg:items-start">
                <div className="flex items-center gap-1 text-base text-muted font-medium">

                  <Phone className="h-4 w-4 text-primary" />

                  <span>+2347066085704</span>

                </div>

                <div className="flex items-center gap-1 text-base text-muted font-medium">
                  <Mail className="h-4 w-4 text-primary" />

                <a href="mailto:ihesievictor1991@gmail.com">
                  <span>ihesievictor1991@gmail.com</span>
                  </a>
                  

                </div>
              </div>

              {/* Social Icons */}

           <div className="flex gap-2">

              {[
                {
                  href: "https://instagram.com/ihesie_naturalhealth",
                  icon: <FaInstagram />,
                  label: "instagram",
                },
                {
                  href: "https://facebook.com/IhesieNaturalHealth",
                  icon: <FaFacebookF />,
                  label: "facebook",
                },
                {
                  href: "https://youtube.com/@IhesieNaturalHealth?si=ATeK5uOG8GDbtA-d",
                  icon: <FaYoutube />,
                  label: "youtube",
                },
                {
                  href: "https://wa.me/2347066085704",
                  icon: <FaWhatsapp />,
                  label: "WhatsApp",
                },
                {
                  href: "https://tiktok.com/@ihesienaturalhealth",
                  icon: <FaTiktok />,
                  label: "TikTok",
                },
              ].map(({ href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-white
                    transition
                    hover:bg-primary-hover
                  "
                >
                  {icon}
                </Link>
              ))}

          </div>

            </div>

            {/* Navigation */}

            <div className="mt-6 flex flex-wrap justify-center gap-4  text-sm font-semibold text-muted">

              <Link href="/about-us" className=" border-r-2 border-gray-300 pr-4 hover:text-primary-hover transition">
                About Us
              </Link>

              <Link href="/products" className="  border-r-2 border-gray-300 pr-4 hover:text-primary-hover transition">
                Products
              </Link>

              <Link href="/wellness" className="hover:text-primary-hover transition">
                Wellness Insights
              </Link>

            </div>

            

          </div>

        </Container>

      </div>

      {/* Copyright */}

      <div className="bg-surface-earth-dark py-5 mt-10">

        <Container>

          <p className="text-center text-xs lg:text-sm text-white">
            © 2026 Ihesie Natural Health Services. All Rights Reserved.
          </p>

        </Container>

      </div>

    </footer>
  );
}