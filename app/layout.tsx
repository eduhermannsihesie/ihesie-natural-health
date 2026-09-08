import type { Metadata } from "next";
import { Lora, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/components/cart/CartProvider";

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"], 
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Ihesie Natural Health",
    template: "%s | Ihesie Natural Health",
  },
  description:
    "Natural health consultations, wellness education, and premium herbal products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <CartProvider>
            <SmoothScroll />
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
        </CartProvider>
    </body>
      {/* <body className="min-h-full flex flex-col">{children}</body> */}
    </html>
  );
}
