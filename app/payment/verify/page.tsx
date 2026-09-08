"use client";

import { CheckCircle2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import Button from "@/components/ui/Button";

function PaymentVerifyContent() {

  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const { clearCart } = useCart();

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [orderId, setOrderId] = useState("");

  const whatsappNumber = "2347066085704";

    const whatsappMessage = encodeURIComponent(
    `Hello , I just placed an order. My order reference is ${orderId}. I would like some assistance with my order.`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `/api/payments/verify?reference=${encodeURIComponent(reference)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to verify payment"
          );
        }

        setOrderId(data.order.id);

        clearCart();

        setStatus("success");
      } catch (error) {
        console.error("Payment verification error:", error);

        setStatus("error");
      }
    };

    verifyPayment();
  }, [reference, clearCart]);

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center pt-28">
        <p className="text-xl text-primary-hover">
          Verifying your payment...
        </p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex items-center justify-center pt-28">
        <div className="max-w-xl text-center">
          <h1 className="font-heading text-xl font-bold mb-4">
            Payment Verification Failed
          </h1>

          <p className="text-muted mb-8">
            We could not confirm your payment.
            Please contact us if money was deducted from
            your account.
          </p>

          <Link
            href="/contactus"
            className="inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white"
          >
            Contact Us
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl text-center">

        <CheckCircle2
          className="mx-auto mb-6 h-20 w-20 text-primary-hover"
        />

        <p className="mt-6 font-medium uppercase tracking-wider text-primary-hover">
          Order Confirmed
        </p>

        <h1 className="font-heading text-3xl md:text-4xl font-medium  mt-6">
          Thank You for Your Order
        </h1>

        <p className="text-base text-muted mt-6">
          Your payment has been confirmed and your order has been received successfully.
        </p>

        {orderId && (
          <div className="mt-6">
            <p className="text-sm text-primary-hover">
              Order Reference
            </p>

            <p className="font-semibold text-lg">
              {orderId}
            </p>
          </div>
        )}

        <p className="text-muted text-sm mt-6">
          A confirmation will be sent using the contact information provided during checkout.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-2">

                    <Link
                    href="/products"
                    className="w-full sm:w-auto"
                    >
                    <Button
                        variant="primary"
                        className="
                        w-full
                        sm:w-auto
                        border-2
                        border-primary
                        px-8
                        lg:px-10
                        "
                    >
                        Continue Shopping
                    </Button>
                    </Link>

                    <Link
                    href="/"
                    className="w-full sm:w-auto"
                    >
                    <Button
                        variant="outline"
                        className="
                        w-full
                        sm:w-auto
                        border-2
                        border-primary
                        hover:border-primary-hover
                        hover:bg-primary-hover
                        text-primary
                        hover:text-white
                        bg-primary-50
                        px-8
                        lg:px-10
                        "
                    >
                        Back to Home
                    </Button>
                    </Link>

                

                    <Link
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                            >
                            <Button
                                variant="secondary"
                                
                                className="
                                w-full
                                sm:w-auto
                                border-2
                                border-surface-burnt
                                px-8
                                lg:px-10
                                "
                            >
                                Contact Us on WhatsApp
                            </Button>
                            </Link>

                
        </div>
      </div>
    </main>
  );
}
export default function PaymentVerifyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] flex items-center justify-center px-5">
          <p className="text-sm text-muted">
            Verifying payment...
          </p>
        </main>
      }
    >
      <PaymentVerifyContent />
    </Suspense>
  );
}