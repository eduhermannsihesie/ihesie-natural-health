import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminOrderDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  const formattedTotal = new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: order.currency,
      maximumFractionDigits: 0,
    }
  ).format(order.total);

  const formattedSubtotal = new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: order.currency,
      maximumFractionDigits: 0,
    }
  ).format(order.subtotal);

  const formattedDeliveryFee =
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: order.currency,
      maximumFractionDigits: 0,
    }).format(order.deliveryFee);

  return (
    <main className="min-h-screen bg-primary-50/30">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">
              Order
            </p>

            <h1 className="mt-1 font-heading text-2xl font-bold text-primary-hover">
              {order.id}
            </h1>

            <p className="mt-2 text-sm text-muted">
              Placed{" "}
              {order.createdAt.toLocaleDateString(
                "en-NG",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              order.status === "PAID"
                ? "bg-green-50 text-green-700"
                : order.status === "FAILED"
                  ? "bg-red-50 text-red-700"
                  : order.status === "CANCELLED"
                    ? "bg-neutral-100 text-neutral-600"
                    : "bg-amber-50 text-amber-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Main */}
          <div className="space-y-6 lg:col-span-2">

            {/* Products */}
            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <ShoppingBag
                  size={20}
                  className="text-primary"
                />

                <h2 className="font-heading text-xl font-semibold text-primary-hover">
                  Products
                </h2>
              </div>

              <div className="mt-5 divide-y divide-primary-100">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-primary-hover">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-muted">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium text-primary-hover">
                      {new Intl.NumberFormat(
                        "en-NG",
                        {
                          style: "currency",
                          currency:
                            order.currency,
                          maximumFractionDigits: 0,
                        }
                      ).format(item.subtotal)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-5 space-y-3 border-t border-primary-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">
                    Subtotal
                  </span>

                  <span>
                    {formattedSubtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">
                    Delivery
                  </span>

                  <span>
                    {formattedDeliveryFee}
                  </span>
                </div>

                <div className="flex justify-between border-t border-primary-100 pt-3 text-base font-bold text-primary-hover">
                  <span>Total</span>
                  <span>{formattedTotal}</span>
                </div>
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin
                  size={20}
                  className="text-primary"
                />

                <h2 className="font-heading text-xl font-semibold text-primary-hover">
                  Delivery Address
                </h2>
              </div>

              <div className="mt-5 text-sm leading-7 text-muted">
                <p>{order.fullName}</p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.state}
                </p>
              </div>
            </section>
          </div>

          {/* Customer/payment */}
          <div className="space-y-6">

            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-primary-hover">
                Customer
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <Mail
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-xs text-muted">
                      Email
                    </p>
                    <p className="mt-1 break-all">
                      {order.email}
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
                    <p className="mt-1">
                      {order.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-primary-hover">
                Payment
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-xs text-muted">
                    Amount
                  </p>
                  <p className="mt-1 font-semibold">
                    {formattedTotal}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Payment reference
                  </p>

                  <p className="mt-1 break-all">
                    {order.paymentReference ||
                      "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted">
                    Status
                  </p>

                  <p className="mt-1 font-medium">
                    {order.status}
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