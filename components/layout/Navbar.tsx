"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Menu, X, ShoppingCart} from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import CartButton from "@/components/cart/CartButton";

import Logo from "@/public/branding/ihesie-logo.png";

import Container from "./Container";
import Button from "../ui/Button";
import { navigation } from "@/constants/navigation";


export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { cartCount} = useCart()

  return (
    <header
        className="
            sticky
            top-0
            z-50
            border-b
            shadow-xl
            border-border
            bg-white/90
            backdrop-blur-lg
        "
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link
              href="/"
            //   onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 font-heading text-xl lg:text-2xl font-bold text-primary"
            >
              <Image 
                src={Logo} 
                alt="Ihesie Natural Health Services" 
                // className="w-auto h-14 lg:h-16" 
                className="h-12 lg:h-14 xl:h-16 w-auto"
                
                priority
              />
              <div className="flex flex-col leading-none">
                 <span className=" sm:block font-body text-lg xl:text-xl font-bold text-primary">
                  Ihesie Natural Health </span>
              </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
                <nav className="flex items-center gap-2 xl:gap-5">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      
                        className={`
                            relative
                            text-sm
                            lg:text-base
                            font-medium
                            transition-colors

                            ${
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-foreground hover:text-primary-hover"
                            }
                        `}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                  {/* Cart */}

                  <CartButton />

{/* Book Consultation */}
              

               <Link href="/book-consultation">

                  <Button
                      className="px-4 lg:px-6 xl:px-8"
                  >
                      Book Consultation
                  </Button>

              </Link>
          </div>

          
          <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="
                    lg:hidden
                    cursor-pointer
                    rounded-md
                    p-2
                    transition
                    text-primary-hover
                    hover:text-primary
                "
                aria-label="Toggle Menu"
            >

                {mobileOpen ? (
                    <X size={28}/>
                ) : (
                    <Menu size={30}/>
                )}

            </button>


        </div>



        {/* Mobile Menu Button */}
          <div
              className={`
                md:hidden
                overflow-hidden
                transition-all
                cursor-pointer
                duration-300
                ${
                  mobileOpen
                    ? "max-h-125 py-6"
                    : "max-h-0 py-0"
                }
              `}
            >

              <nav
                 className="flex flex-col gap-5 ">

                    {navigation.map((item)=>(

                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={()=>setMobileOpen(false)}
                            className={`
                               text-sm
                               lg:text-base
                               transition-colors
                               hover:text-primary-hover
                               font-medium

                                      ${
                                          pathname===item.href
                                          ? "text-primary"
                                          : "text-foreground"
                                      }
                                  `}
                              >
                                  {item.label}
                              </Link>

                          ))}

                          <Link
                              href="/book-consultation"
                              onClick={()=>setMobileOpen(false)}
                          >

                              <Button
                                  size="lg"
                                  className="w-full mt-2 "
                              >
                                  Book Consultation
                              </Button>

                          </Link>

                      </nav>

                  </div>

                  

      </Container>
    </header>
  );
}