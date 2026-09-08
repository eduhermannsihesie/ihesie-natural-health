"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { ConsultationBooking } from "@/types/consultation";

// interface Props {
//   booking: ConsultationBooking;
//   onBack: () => void;
//   onPay: () => void;
// }

interface Props {
  booking: ConsultationBooking;
  formattedDate: string;
  onBack: () => void;
}

export default function PaymentStep({
  booking,
  formattedDate,
  onBack,
}: Props) {

   const handlePayment = async () => {
  try {
    const response = await fetch(
      "/api/consultations/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          treatment: booking.treatment,
          date: booking.date,
          time: booking.time,
          fullName: booking.fullName,
          age: booking.age,
          email: booking.email,
          phone: booking.phone,
          healthConcern: booking.healthConcern,
          communication: booking.communication,
        }),
      }
    );

    const data = await response.json();

    console.log("Consultation API response:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to initialize payment."
      );
    }

    if (!data.authorizationUrl) {
      throw new Error(
        "Paystack payment URL was not returned."
      );
    }

    window.location.href = data.authorizationUrl;
  } catch (error) {
    console.error(
      "Payment initialization error:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Unable to start payment."
    );
  }
};

  return (

    <>
      <div className="mt-8 rounded-2xl border border-border bg-white pt-4 pb-8">

        {/* Header */}

        <div className="flex items-start gap-3 px-6 pb-4 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck
              size={18}
              className="text-primary"
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm font-heading">
              Payment Details
            </h3>

            <p className="text-xs text-muted font-medium font-heading">
              All transactions are secure and encrypted.
            </p>
          </div>
        </div>

        {/* Paystack */}

        <div className="mt-8 px-6">
          <label className="font-semibold text-base">
            Payment Method
          </label>

          <div className="mt-3 rounded-xl border-2 border-primary-200 bg-primary-50 px-5 py-4">
            <img
              src="/images/paystack.png"
              className="w-24"
              alt="Paystack"
            />

            <p className="mt-1 text-[10px] text-muted font-heading">
              Pay securely with Paystack
            </p>
          </div>

          <div className="mt-2 flex items-center gap-1 text-[10px] text-muted">
            <ShieldCheck
              size={12}
              className="text-primary"
            />

            <span>
              Secure payment powered by Paystack
            </span>
          </div>
        </div>

        {/* Email */}

        <div className="mt-8 px-6">
          <p className="text-sm font-semibold">
            Payment receipt will be sent to
          </p>

          <div className="mt-2 rounded-lg border-2 border-primary-100 bg-primary-50 px-4 py-3">
            <p className="text-sm text-muted">
              {booking.email}
            </p>
          </div>
        </div>

        {/* Security */}

        <div className="mt-5 mx-6 rounded-md bg-primary-50 py-4 px-3">
          <div className="flex items-start gap-2">
            <ShieldCheck
              size={18}
              className="mt-0.5 text-primary"
            />

            <div>
              <p className="text-xs font-semibold text-primary">
                Secure Payment
              </p>

              <p className="text-[10px] leading-5 text-muted">
                Your payment information is handled securely by
                Paystack. Ihesie Natural Health Services does not
                store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-15">
        <div className="flex justify-between">

          <button
            type="button"
            onClick={onBack}
            className="
              rounded-md
              border-2
              border-secondary-hover
              px-10
              py-2
              font-medium
              cursor-pointer
            "
          >
            Back
          </button>

          <button
            type="button"
            onClick={handlePayment}
            className="
              rounded-md
              border-2
              border-primary
              bg-primary
              px-8
              py-2
              font-medium
              text-white
              flex
              items-center
              gap-1
              cursor-pointer
              transition
              duration-300
              hover:bg-primary-50
              hover:text-primary
            "
          >
            Pay ₦{booking.amount.toLocaleString()}

            <ArrowRight size={16} />
          </button>

        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Your payment is encrypted and secured by Paystack.
        </p>
      </div>
    </>
  );
}