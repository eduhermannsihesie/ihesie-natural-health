"use client";

import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";

import ConsultationStepper from "./ConsultationStepper";
import ServiceStep from "./ServiceStep";
import DateTimeStep from "./DateTimeStep";
import DetailsStep from "./DetailsStep";
import PaymentStep from "./PaymentStep";
import BookingSummary from "./BookingSummary";

import { ConsultationBooking } from "@/types/consultation";

export default function ConsultationWizard() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [booking, setBooking] = useState<ConsultationBooking>({
    treatment: "",
    date: null,
    time: "",

    fullName: "",
    age: "",
    email: "",
    phone: "",
    healthConcern: "",
    communication: "",

    amount: 15000,
  });

  const updateBooking = (
    field: keyof ConsultationBooking,
    value: string | number | Date | null
  ) => {
    setBooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const formattedDate = booking.date
    ? booking.date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className="relative mt-8 max-w-270 mx-auto">
      {/* Background */}

      <div className="absolute inset-0">
        <img
          src="/images/wellnesspath.svg"
          alt=""
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

      {/* Content */}

      <div className="relative z-10 grid px-8 py-10 lg:grid-cols-2">

        {/* LEFT */}

        <div
          className={`
            self-start
            max-w-2xl
            rounded-sm
            bg-white
            p-8
            shadow-2xl

            ${step === 3 ? "min-h-205" : "min-h-150"}
          `}
        >
          <h1 className="font-heading text-3xl font-medium leading-tight text-foreground lg:text-4xl">
            Book Your Consultation
          </h1>

          <p className="mt-3 text-muted">
            Receive personalized guidance from our certified natural health
            specialists.
          </p>

          <ConsultationStepper currentStep={step} />

          <div className="mt-10">

            {/* STEP 1 */}

            {step === 1 && (
              <ServiceStep
                treatment={booking.treatment}
                onTreatmentChange={(value) =>
                  updateBooking("treatment", value)
                }
                onNext={nextStep}
                onCancel={() => router.push("/")}
              />
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <DateTimeStep
                date={booking.date}
                time={booking.time}
                onDateChange={(date) =>
                  updateBooking("date", date)
                }
                onTimeChange={(value) =>
                  updateBooking("time", value)
                }
                onBack={prevStep}
                onNext={nextStep}
              />
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <DetailsStep
                booking={booking}
                updateBooking={updateBooking}
                onBack={prevStep}
                onNext={nextStep}
              />
            )}

            {/* STEP 4 */}

            {step === 4 && (
              <PaymentStep
                booking={booking}
                formattedDate={formattedDate}
                onBack={prevStep}
              />
            )}

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="relative hidden lg:block">

          {/* Fee card during steps 1 - 3 */}

          {step <= 3 && (
            <div className="absolute bottom-0 left-25 flex max-w-80 items-center gap-4 rounded-lg border-2 border-primary-200 bg-white px-6 py-5 shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <HeartHandshake className="text-primary" />
              </div>

              <div className="h-12 border-l border-border" />

              <div>
                <p className="text-md font-medium">
                  Consultation Fee
                </p>

                <div className="flex items-center gap-2">
                  <p className="font-heading text-xl font-semibold text-primary">
                    ₦{booking.amount.toLocaleString()}
                  </p>

                  <p className="text-sm text-primary-hover">
                    (30 mins)
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Summary during payment */}

          {step === 4 && (
            <div className="absolute right-15 top-30">
              <BookingSummary
                treatment={booking.treatment}
                date={formattedDate}
                time={booking.time}
                fullName={booking.fullName}
                age={booking.age}
                email={booking.email}
                phone={booking.phone}
                communication={booking.communication}
                amount={`₦${booking.amount.toLocaleString()}`}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}