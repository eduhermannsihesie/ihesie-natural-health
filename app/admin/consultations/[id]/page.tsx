import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Phone,
  MessageCircle,
  CreditCard,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ConsultationDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const consultation =
    await prisma.consultation.findUnique({
      where: {
        id,
      },
    });

  if (!consultation) {
    notFound();
  }

  const formattedAmount =
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: consultation.currency,
      maximumFractionDigits: 0,
    }).format(consultation.amount);

  return (
    <main className="min-h-screen bg-primary-50/30">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        <Link
          href="/admin/consultations"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Consultations
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">
              Consultation
            </p>

            <h1 className="mt-1 font-heading text-3xl font-bold text-primary-hover">
              {consultation.fullName}
            </h1>

            <p className="mt-2 text-sm text-muted">
              {consultation.consultationNumber}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              consultation.bookingStatus ===
              "CONFIRMED"
                ? "bg-green-50 text-green-700"
                : consultation.bookingStatus ===
                    "CANCELLED"
                  ? "bg-neutral-100 text-neutral-600"
                  : "bg-amber-50 text-amber-700"
            }`}
          >
            {consultation.bookingStatus}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Main information */}
          <div className="space-y-6 lg:col-span-2">

            {/* Appointment */}
            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={20}
                  className="text-primary"
                />

                <h2 className="font-heading text-xl font-semibold text-primary-hover">
                  Appointment
                </h2>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted">
                    Treatment
                  </p>

                  <p className="mt-1 font-medium text-primary-hover">
                    {consultation.treatment}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Date
                  </p>

                  <p className="mt-1 font-medium text-primary-hover">
                    {consultation.appointmentDate.toLocaleDateString(
                      "en-NG",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Time
                  </p>

                  <p className="mt-1 font-medium text-primary-hover">
                    {consultation.appointmentTime}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Communication
                  </p>

                  <p className="mt-1 font-medium text-primary-hover">
                    {consultation.communication}
                  </p>
                </div>
              </div>
            </section>

            {/* Health concern */}
            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-semibold text-primary-hover">
                Health Concern
              </h2>

              <div className="mt-4 rounded-xl bg-primary-50/40 p-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-primary-hover">
                  {consultation.healthConcern ||
                    "No health concern was provided."}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Customer */}
            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-primary-hover">
                Customer
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs text-muted">
                    Age
                  </p>

                  <p className="mt-1 text-sm">
                    {consultation.age}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-muted">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm">
                      {consultation.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-xs text-muted">
                      Phone
                    </p>

                    <p className="mt-1 text-sm">
                      {consultation.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MessageCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-xs text-muted">
                      Preferred contact
                    </p>

                    <p className="mt-1 text-sm">
                      {consultation.communication}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <CreditCard
                  size={18}
                  className="text-primary"
                />

                <h2 className="font-heading text-lg font-semibold text-primary-hover">
                  Payment
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-xs text-muted">
                    Amount
                  </p>

                  <p className="mt-1 font-semibold">
                    {formattedAmount}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Payment status
                  </p>

                  <p className="mt-1 font-medium">
                    {consultation.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Payment reference
                  </p>

                  <p className="mt-1 break-all">
                    {consultation.paymentReference ||
                      "Not available"}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}