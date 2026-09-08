"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import Price from "@/components/common/Price";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  /*
   * EMPTY CART
   */

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">

        <h1 className="font-heading text-4xl font-semibold text-primary">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-muted">
          You haven't added any products to your cart yet.
        </p>

        <Link href="/products">
          <Button className="mt-8">
            Browse Products
          </Button>
        </Link>

      </section>
    );
  }

  /*
   * CART WITH PRODUCTS
   */

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">

      {/* Heading */}

      <div>
        <h1 className="font-heading text-4xl font-semibold text-primary">
          Your Cart
        </h1>

        <p className="mt-2 text-muted">
          Review your products before checkout.
        </p>
      </div>


      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">


        {/* =====================================
            CART PRODUCTS
        ===================================== */}

        <div className="space-y-5">

          {cart.map((item) => (

            <div
              key={item.id}
              className="
                flex
                gap-5
                rounded-xl
                border
                border-border
                bg-white
                p-5
              "
            >

              {/* Product Image */}

              <div
                className="
                  relative
                  h-28
                  w-28
                  shrink-0
                  overflow-hidden
                  rounded-lg
                  bg-surface-earth-light
                "
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-3"
                />

              </div>


              {/* Product Information */}

              <div className="flex flex-1 flex-col justify-between">

                <div>

                  <h2 className="font-heading text-lg font-semibold">
                    {item.name}
                  </h2>

                  <p className="mt-1 font-semibold text-primary">
                    <Price amount={item.price} />
                  </p>

                </div>


                <div className="mt-5 flex items-center justify-between">


                  {/* Quantity */}

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
                        hover:bg-primary-50
                      "
                    >
                      <Minus size={14} />
                    </button>


                    <span className="px-4 text-sm">
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
                        hover:bg-primary-50
                      "
                    >
                      <Plus size={14} />
                    </button>

                  </div>


                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-red-500
                      transition
                      hover:text-red-700
                    "
                  >

                    <Trash2 size={16} />

                    Remove

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* =====================================
            ORDER SUMMARY
        ===================================== */}

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


          {/* Subtotal */}

          <div
            className="
              mt-6
              flex
              justify-between
              border-b
              border-border
              pb-4
            "
          >

            <span className="text-sm">
              Subtotal
            </span>

            <span className="font-semibold">
              <Price amount={cartTotal} />
            </span>

          </div>


          {/* Delivery */}

          <div className="mt-4 flex justify-between text-sm">

            <span>
              Delivery
            </span>

            <span className="text-muted">
              Calculated at checkout
            </span>

          </div>


          {/* Total */}

          <div
            className="
              mt-5
              flex
              justify-between
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


          {/* Checkout */}

          <Link
            href="/checkout"
            className="block"
          >

            <Button className="mt-6 w-full">
              Proceed to Checkout
            </Button>

          </Link>


          {/* Continue Shopping */}

          <Link
            href="/products"
            className="
              mt-4
              block
              text-center
              text-sm
              text-primary
              hover:underline
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </section>
  );
}