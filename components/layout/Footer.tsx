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
    <footer id="contact" className="mt-30 lg:mt-38">

      {/* Main Footer */}

      <div className="">

        <Container>

          <div className="flex flex-col items-center">

            {/* Logo */}
            <div>

              <Link href="/" className="flex items-center gap-0 font-heading text-2xl font-bold text-primary">
                <Image
                  src="/branding/ihesie-logo.png"
                  alt="Ihesie Natural Health"
                  width={80}
                  height={80}
                  className="h-auto w-22"
                />

                
                  <span className="font-body text-lg font-bold text-primary">
                    Ihesie Natural Health </span>
              
              </Link>
            </div>


            {/* Contact */}

            <div className="mt-6 flex items-center flex-col lg:flex-row gap-8 lg:gap-10 ">

              <div className="flex items-center gap-10 lg:items-start">
                <div className="flex items-center gap-2 text-base lg:text-lg text-gray-600 font-medium">

                  <Phone className="h-5 w-5 text-primary" />

                  <span>+2347066085704</span>

                </div>

                <div className="flex items-center gap-2 text-base lg:text-lg text-gray-600 font-medium">
                  <Mail className="h-5 w-5 text-primary" />

                  <span>ihesievictor1991@gmail.com</span>

                </div>
              </div>

              {/* Social Icons */}

           <div className="flex gap-2 lg:gap-4">

              {[
                {
                  href: "https://instagram.com/yourpage",
                  icon: <FaInstagram />,
                },
                {
                  href: "https://facebook.com/yourpage",
                  icon: <FaFacebookF />,
                },
                {
                  href: "https://youtube.com/yourpage",
                  icon: <FaYoutube />,
                },
                {
                  href: "https://tiktok.com/@yourpage",
                  icon: <FaTiktok />,
                },
                {
                  href: "https://wa.me/2347046085704",
                  icon: <FaWhatsapp />,
                },
              ].map(({ href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="
                    flex
                    h-11
                    w-11
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

            <div className="mt-10 flex flex-wrap justify-center gap-4  text-sm font-semibold text-gray-600">

              <Link href="/about-us" className=" border-r-2 border-gray-300 pr-4 hover:text-primary transition">
                About Us
              </Link>

              <Link href="/products" className="  border-r-2 border-gray-300 pr-4 hover:text-primary transition">
                Products
              </Link>

              <Link href="/wellness" className="hover:text-primary transition">
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