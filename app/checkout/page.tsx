"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import Price from "@/components/common/Price";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const {
  cart,
  cartTotal,
  updateQuantity,
  removeFromCart,
} = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

      const handleChange = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              setFormData({
                ...formData,
                [event.target.name]: event.target.value,
              });
            };

      const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        // 1. Create the pending order
        const orderResponse = await fetch(
          "/api/orders/initialize",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              customer: formData,

              items: cart.map((item) => ({
                id: item.id,
                quantity: item.quantity,
              })),
            }),
          }
        );

        const orderData = await orderResponse.json();

        if (!orderResponse.ok) {
          throw new Error(
            orderData.message || "Unable to create order"
          );
        }

        const orderId = orderData.order.id;

        // 2. Initialize Paystack payment
        const paymentResponse = await fetch(
          "/api/payments/initialize",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              orderId,
            }),
          }
        );

        const paymentData = await paymentResponse.json();

        if (!paymentResponse.ok) {
          throw new Error(
            paymentData.message ||
              "Unable to initialize payment"
          );
        }

        // 3. Redirect customer to Paystack
        window.location.href =
          paymentData.authorizationUrl;

      } catch (error) {
        console.error("Checkout error:", error);
      }
    };

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">

        <h1 className="font-heading text-4xl font-semibold text-primary">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-muted">
          Please add a product before proceeding to checkout.
        </p>

        <Link href="/products">
          <Button className="mt-8">
            Browse Products
          </Button>
        </Link>

      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">

      {/* Heading */}

      <div>
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Checkout
        </h1>

        <p className="mt-2 text-muted">
          Enter your details to complete your order.
        </p>
      </div>


      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">


        {/* =================================
            CUSTOMER INFORMATION
        ================================= */}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-white p-6 lg:p-8"
        >

          <h2 className="font-heading text-2xl font-semibold text-primary">
            Customer Information
          </h2>


          <div className="mt-8 space-y-6">


            {/* Full Name */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="
                  w-full
                  rounded-md
                  border
                  border-border
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-primary
                "
              />

            </div>


            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-md
                  border
                  border-border
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-primary
                "
              />

            </div>


            {/* Phone */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+234..."
                className="
                  w-full
                  rounded-md
                  border
                  border-border
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-primary
                "
              />

            </div>


            {/* Address */}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Delivery Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your delivery address"
                className="
                  w-full
                  rounded-md
                  border
                  border-border
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-primary
                "
              />

            </div>


            {/* City + State */}

            <div className="grid gap-6 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                  className="
                    w-full
                    rounded-md
                    border
                    border-border
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                  className="
                    w-full
                    rounded-md
                    border
                    border-border
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

              </div>

            </div>

          </div>


          <Button
            type="submit"
            className="mt-8 w-full"
          >
            Continue to Payment
          </Button>

        </form>


        {/* =================================
            ORDER SUMMARY
        ================================= */}

        <div
          className="
            h-fit
            rounded-xl
            border
            border-border
            bg-white
            p-6
            shadow-sm
          "
        >

          <h2 className="font-heading text-xl font-semibold text-primary">
            Order Summary
          </h2>


          {/* Products */}

          <div className="mt-6 space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    border-b
                    border-border
                    pb-5
                    last:border-b-0
                  "
                >
                  {/* Product name + total price */}
                  <div className="flex justify-between gap-4">

                    <div>
                      <p className="text-sm font-medium">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        <Price amount={item.price} /> each
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      <Price
                        amount={item.price * item.quantity}
                      />
                    </p>

                  </div>

                  {/* Quantity controls */}
                  <div className="mt-3 flex items-center justify-between">

                    <div
                      className="
                        flex
                        items-center
                        rounded-md
                        border
                        border-border
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1
                          )
                        }
                        className="
                          p-2
                          transition
                          hover:bg-primary/10
                        "
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-9 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="
                          p-2
                          transition
                          hover:bg-primary/10
                        "
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-red-500
                        transition
                        hover:text-red-700
                      "
                    >
                      <Trash2 size={14} />

                      Remove
                    </button>

                  </div>
                </div>
              ))}
            </div>


          {/* Subtotal */}

          <div className="mt-6 border-t border-border pt-5">

            <div className="flex justify-between text-sm">

              <span>
                Subtotal
              </span>

              <span className="font-semibold">
                <Price amount={cartTotal} />
              </span>

            </div>


            <div className="mt-4 flex justify-between text-sm">

              <span>
                Delivery
              </span>

              <span className="text-muted">
                Calculated later
              </span>

            </div>

          </div>


          {/* Total */}

          <div
            className="
              mt-5
              flex
              justify-between
              border-t
              border-border
              pt-5
              text-lg
              font-semibold
            "
          >

            <span>
              Total
            </span>

            <span className="text-primary">
              <Price amount={cartTotal} />
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}