import {
  CalendarDays,
  ShoppingBag,
  CreditCard,
  Clock3,
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // -----------------------------
  // Dashboard statistics
  // -----------------------------
    const [
  totalOrders,
  paidOrders,
  totalConsultations,
  upcomingConsultations,
  recentOrders,
  upcomingBookings,
] = await Promise.all([
  prisma.order.count(),

  prisma.order.count({
    where: {
      status: "PAID",
    },
  }),

  prisma.consultation.count(),

  prisma.consultation.count({
    where: {
      bookingStatus: "CONFIRMED",
      appointmentDate: {
        gte: new Date(),
      },
    },
  }),

  prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      total: true,
      currency: true,
      status: true,
      createdAt: true,
    },
  }),

  prisma.consultation.findMany({
    take: 5,

    where: {
      bookingStatus: "CONFIRMED",
      appointmentDate: {
        gte: new Date(),
      },
    },

     orderBy: {
      appointmentDate: "asc",
    },

    select: {
      id: true,
      consultationNumber: true,
      fullName: true,
      treatment: true,
      appointmentDate: true,
      appointmentTime: true,
      communication: true,
    },
  }),


]);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
    },
    {
      label: "Paid Orders",
      value: paidOrders,
      icon: CreditCard,
    },
    {
      label: "Consultations",
      value: totalConsultations,
      icon: CalendarDays,
    },
    {
      label: "Upcoming Consultations",
      value: upcomingConsultations,
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-primary-50/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
                <p className="text-sm font-medium text-primary">
                Ihesie Natural Health
                </p>

                <h1 className="mt-1 font-heading text-3xl font-bold text-primary-hover">
                Admin Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-muted">
                Manage consultations, product orders,
                payments, and customer activity.
                </p>
            </div>

            <LogoutButton />
            </div>

        {/* Statistics */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-primary-hover">
                      {stat.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                    <Icon
                      size={20}
                      className="text-primary"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Dashboard content */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
  {/* Orders */}
  <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold text-primary-hover">
          Recent Orders
        </h2>

        <p className="mt-1 text-sm text-muted">
          Latest product purchases.
        </p>
      </div>

      <Link
        href="/admin/orders"
        className="text-sm font-medium text-primary hover:underline"
      >
        View all
      </Link>
    </div>

    <div className="mt-6 space-y-3">
      {recentOrders.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-primary-100 bg-primary-50/30">
          <p className="text-sm text-muted">
            No orders yet.
          </p>
        </div>
      ) : (
        recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-primary-100 p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-primary-hover">
                {order.fullName}
              </p>

              <p className="mt-1 truncate text-xs text-muted">
                {order.email}
              </p>

              <p className="mt-1 text-xs text-muted">
                {order.createdAt.toLocaleDateString(
                  "en-NG",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="font-semibold text-primary-hover">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: order.currency,
                  maximumFractionDigits: 0,
                }).format(order.total)}
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                  order.status === "PAID"
                    ? "bg-green-50 text-green-700"
                    : order.status === "FAILED"
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Consultations */}
  <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold text-primary-hover">
          Upcoming Consultations
        </h2>

        <p className="mt-1 text-sm text-muted">
          Confirmed upcoming appointments.
        </p>
      </div>

      <Link
        href="/admin/consultations"
        className="text-sm font-medium text-primary hover:underline"
      >
        View all
      </Link>
    </div>

    <div className="mt-6 space-y-3">
      {upcomingBookings.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-primary-100 bg-primary-50/30">
          <p className="text-sm text-muted">
            No upcoming consultations.
          </p>
        </div>
      ) : (
        upcomingBookings.map((consultation) => (
          <div
            key={consultation.id}
            className="rounded-xl border border-primary-100 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-primary-hover">
                  {consultation.fullName}
                </p>

                <p className="mt-1 text-sm text-muted">
                  {consultation.treatment}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Confirmed
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
              <span>
                {consultation.appointmentDate.toLocaleDateString(
                  "en-NG",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>

              <span>
                {consultation.appointmentTime}
              </span>

              <span>
                {consultation.communication}
              </span>
            </div>

            <p className="mt-3 text-xs text-muted">
              {consultation.consultationNumber}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
</section>
      </div>
    </main>
  );
}