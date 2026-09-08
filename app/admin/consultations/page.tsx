import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminConsultationsPage() {
  const consultations =
    await prisma.consultation.findMany({
      orderBy: [
        {
          appointmentDate: "asc",
        },
        {
          appointmentTime: "asc",
        },
      ],
    });

  return (
    <main className="min-h-screen bg-primary-50/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
              <CalendarDays
                size={20}
                className="text-primary"
              />
            </div>

            <div>
              <h1 className="font-heading text-3xl font-bold text-primary-hover">
                Consultations
              </h1>

              <p className="mt-1 text-sm text-muted">
                View consultation bookings,
                appointments and payment status.
              </p>
            </div>
          </div>
        </div>

        {/* Consultations */}
        <section className="mt-8">
          {consultations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary-100 bg-white p-12 text-center">
              <p className="text-sm text-muted">
                No consultation bookings yet.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">

                  <thead className="border-b border-primary-100 bg-primary-50/50">
                    <tr>
                      <th className="px-5 py-4 font-medium">
                        Customer
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Treatment
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Appointment
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Payment
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Booking
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-primary-100">
                    {consultations.map(
                      (consultation) => (
                        <tr
                          key={consultation.id}
                          className="transition hover:bg-primary-50/30"
                        >
                          {/* Customer */}
                          <td className="px-5 py-4">

                            <Link
                                href={`/admin/consultations/${consultation.id}`}
                                className="font-medium text-primary-hover hover:text-primary hover:underline"
                                >
                                {consultation.fullName}
                                </Link>

                            <p className="mt-1 text-xs text-muted">
                              {
                                consultation.consultationNumber
                              }
                            </p>
                          </td>

                          {/* Treatment */}
                          <td className="px-5 py-4">
                            <p className="text-primary-hover">
                              {consultation.treatment}
                            </p>

                            <p className="mt-1 text-xs text-muted">
                              {
                                consultation.communication
                              }
                            </p>
                          </td>

                          {/* Appointment */}
                          <td className="whitespace-nowrap px-5 py-4">
                            <p className="text-primary-hover">
                              {consultation.appointmentDate.toLocaleDateString(
                                "en-NG",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>

                            <p className="mt-1 text-xs text-muted">
                              {
                                consultation.appointmentTime
                              }
                            </p>
                          </td>

                          {/* Payment */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                                consultation.paymentStatus ===
                                "PAID"
                                  ? "bg-green-50 text-green-700"
                                  : consultation.paymentStatus ===
                                      "FAILED"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {
                                consultation.paymentStatus
                              }
                            </span>
                          </td>

                          {/* Booking */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                                consultation.bookingStatus ===
                                "CONFIRMED"
                                  ? "bg-green-50 text-green-700"
                                  : consultation.bookingStatus ===
                                      "CANCELLED"
                                    ? "bg-neutral-100 text-neutral-600"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {
                                consultation.bookingStatus
                              }
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}