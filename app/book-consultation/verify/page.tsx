"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  MessageCircle,
  ShieldCheck,
  Printer,
  ArrowLeft,
} from "lucide-react";

interface ConfirmedConsultation {
  id: string;
  consultationNumber: string;

  treatment: string;
  appointmentDate: string;
  appointmentTime: string;

  fullName: string;
  age: number;
  email: string;
  phone: string;
  healthConcern: string | null;
  communication: string;

  amount: number;
  currency: string;

  paymentReference: string | null;
  paymentStatus: string;
  bookingStatus: string;
}

function VerifyConsultationContent() {
  const searchParams = useSearchParams();

  const reference =
    searchParams.get("reference") ||
    searchParams.get("trxref");

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [consultation, setConsultation] =
    useState<ConfirmedConsultation | null>(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus("error");
        setMessage("Payment reference was not found.");
        return;
      }

      try {
        const response = await fetch(
          `/api/consultations/verify?reference=${encodeURIComponent(
            reference
          )}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to verify payment."
          );
        }

        setConsultation(data.consultation);
        setStatus("success");
      } catch (error) {
        setStatus("error");

        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to verify payment."
        );
      }
    };

    verifyPayment();
  }, [reference]);

  // ---------------------------
  // Loading
  // ---------------------------

  if (status === "loading") {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center">
          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-primary-100
              border-t-primary
            "
          />

          <h1 className="mt-6 text-2xl font-heading font-semibold text-primary">
            Verifying your payment
          </h1>

          <p className="mt-2 text-sm text-muted">
            Please wait while we confirm your consultation.
          </p>
        </div>
      </main>
    );
  }

  // ---------------------------
  // Error
  // ---------------------------

  if (status === "error") {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-heading font-semibold text-red-600">
            Payment verification failed
          </h1>

          <p className="mt-3 text-sm text-muted">
            {message}
          </p>

          <p className="mt-3 text-xs text-muted">
            If you were charged, please do not make another
            payment immediately. Contact us with your payment
            reference so we can check the transaction.
          </p>

          <Link
            href="/contact"
            className="
              mt-7
              inline-flex
              rounded-md
              bg-primary
              px-6
              py-3
              text-sm
              font-medium
              text-white
            "
          >
            Contact Us
          </Link>
        </div>
      </main>
    );
  }

  if (!consultation) return null;

  const formattedDate = new Date(
    consultation.appointmentDate
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ---------------------------
  // Success
  // ---------------------------

  return (
    <main className="bg-primary-50/40 py-14 px-5 print:bg-white">
      <div className="mx-auto max-w-3xl">

        {/* Success */}

        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-primary
              text-white
            "
          >
            <Check size={30} strokeWidth={3} />
          </div>

          <h1 className="mt-5 font-heading text-3xl font-semibold text-primary">
            Booking Confirmed
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
            Your payment was successful and your consultation
            has been confirmed.
          </p>

          <div
            className="
              mt-5
              inline-flex
              rounded-full
              bg-primary-50
              px-4
              py-2
              text-xs
              font-semibold
              text-primary
            "
          >
            Consultation ID:&nbsp;
            {consultation.consultationNumber}
          </div>
        </div>

        {/* Booking details */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white">

          <div className="border-b border-border px-6 py-5">
            <h2 className="font-heading text-lg font-semibold text-primary">
              Consultation Details
            </h2>

            <p className="mt-1 text-xs text-muted">
              Keep these details for your records.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">

            <Detail
              icon={<ShieldCheck size={17} />}
              label="Treatment"
              value={consultation.treatment}
            />

            <Detail
              icon={<CalendarDays size={17} />}
              label="Date"
              value={formattedDate}
            />

            <Detail
              icon={<Clock size={17} />}
              label="Time"
              value={consultation.appointmentTime}
            />

            <Detail
              icon={<MessageCircle size={17} />}
              label="Preferred Communication"
              value={consultation.communication}
            />

          </div>
        </div>

        {/* Patient information */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">

          <div className="border-b border-border px-6 py-5">
            <h2 className="font-heading text-lg font-semibold text-primary">
              Your Information
            </h2>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">

            <Detail
              icon={<User size={17} />}
              label="Name"
              value={consultation.fullName}
            />

            <Detail
              icon={<User size={17} />}
              label="Age"
              value={String(consultation.age)}
            />

            <Detail
              icon={<Mail size={17} />}
              label="Email"
              value={consultation.email}
            />

            <Detail
              icon={<Phone size={17} />}
              label="Phone"
              value={consultation.phone}
            />

          </div>
        </div>

        {/* Payment */}

        <div className="mt-6 rounded-2xl border border-border bg-white p-6">

          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-xs text-muted">
                Amount Paid
              </p>

              <p className="mt-1 font-heading text-2xl font-semibold text-primary">
                ₦{consultation.amount.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <div
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-primary-50
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-primary
                "
              >
                <Check size={13} />
                Paid
              </div>

              {consultation.paymentReference && (
                <p className="mt-2 text-[10px] text-muted">
                  Ref: {consultation.paymentReference}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Actions */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center print:hidden">

          <button
            type="button"
            onClick={() => window.print()}
            className="
              inline-flex
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-md
              border-2
              border-primary
              px-6
              py-3
              text-sm
              font-medium
              text-primary
              transition
              hover:bg-primary-50
            "
          >
            <Printer size={16} />
            Print Receipt
          </button>

          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-md
              bg-primary
              px-6
              py-3
              text-sm
              font-medium
              text-white
            "
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>

        </div>

      </div>
    </main>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-[11px] text-muted">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function VerifyConsultationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] flex items-center justify-center px-5">
          <div className="text-center">
            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-primary-100
                border-t-primary
              "
            />

            <h1 className="mt-6 text-2xl font-heading font-semibold text-primary">
              Loading...
            </h1>
          </div>
        </main>
      }
    >
      <VerifyConsultationContent />
    </Suspense>
  );
}