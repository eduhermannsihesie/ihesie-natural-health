import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      items: true,
    },
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
              <ShoppingBag
                size={20}
                className="text-primary"
              />
            </div>

            <div>
              <h1 className="font-heading text-3xl font-bold text-primary-hover">
                Orders
              </h1>

              <p className="mt-1 text-sm text-muted">
                View customer product orders and payment
                information.
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <section className="mt-8">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary-100 bg-white p-12 text-center">
              <p className="text-sm text-muted">
                No orders have been placed yet.
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
                        Products
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Total
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Status
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-primary-100">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-primary-50/30"
                      >
                        <td className="px-5 py-4">

                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="font-medium text-primary-hover hover:text-primary hover:underline"
                            >
                            {order.fullName}
                            </Link>

                          <p className="mt-1 text-xs text-muted">
                            {order.email}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-primary-hover">
                            {order.items.length}{" "}
                            {order.items.length === 1
                              ? "item"
                              : "items"}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-muted">
                            {order.items
                              .map(
                                (item) =>
                                  `${item.name} × ${item.quantity}`
                              )
                              .join(", ")}
                          </p>
                        </td>

                        <td className="px-5 py-4 font-medium text-primary-hover">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: order.currency,
                            maximumFractionDigits: 0,
                          }).format(order.total)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
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
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-muted">
                          {order.createdAt.toLocaleDateString(
                            "en-NG",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
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