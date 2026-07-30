"use client";
import { useState } from "react";
import { ArrowRight, Mail, ShieldCheck} from "lucide-react";


interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({
  onNext,
  onBack,
}: Props) {
    const [paymentMethod, setPaymentMethod] = useState("paystack");
  return (
    <>
    <div className="mt-8 rounded-2xl border border-border bg-white pt-4 pb-8">
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


      {/* Payment Method */}

      <div className="mt-8 px-6">

        <label className="font-semibold text-base">
          Select Payment Method
        </label>

        <div className="mt-3 grid grid-cols-2 gap-2">

          {/* Paystack */}

          <label
            className={`
            relative
            flex
            cursor-pointer
            items-center
            gap-3
            rounded-xl
            border-2
            px-3
            py-4
            transition
            

            ${
                paymentMethod === "paystack"
                  ? "border-primary-200 bg-primary-50"
                  : "border-border bg-white"

            }
            `}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "paystack"}
              onChange={() => setPaymentMethod("paystack")}
              className="absolute left-3 top-3 h-3 w-3 accent-primary"
            />
            <div className="ml-6">
                <img
                src="/images/paystack.png"
                className="w-22"
                alt="Paystack"
                />

                <p className="mt-0.5 text-[10px] text-muted font-heading">
                    Pay securely with Paystack
                </p>
            </div>

          </label>

          {/* Flutterwave */}

          <label
            className={`
            relative
            flex
            cursor-pointer
            items-center
            gap-3
            rounded-lg
            border-2
            border-border
            px-3
            py-4
            transition
            

            ${
                paymentMethod === "flutterwave"
                    ? "border-primary-200 bg-primary-50"
                    : "border-border bg-white"
                }
            `}
          >
            <input
                type="radio"
                name="payment"
                checked={paymentMethod === "flutterwave"}
                onChange={() => setPaymentMethod("flutterwave")}
                className="absolute left-3 top-3 h-3 w-3 accent-primary"
            />
            
            <div className="ml-6">
                <img
                    src="/images/flutterwave.png"
                    className="w-26"
                />
               <p className="mt-0.5 text-[10px] text-muted font-heading">Pay securely with Flutterwave</p>
            </div>

          </label>

        </div>

        <div className="mt-2 flex items-center gap-1 text-[10px] text-muted">

            <ShieldCheck
                size={12}
                className="text-primary"
            />

            <span>
                Your Payment is secured by 256-bit SSL encryption
            </span>

</div>

      </div>

      {/* Email */}

      <div className="mt-8 px-6">

        <label className="font-semibold">
          Email Address
        </label>

        <div className="relative mt-w-2 flex items-center gap-3">

            <Mail
                size={14}
                className="
                    absolute
                    left-3
                    bottom-2
                    -translate-y-1/2
                    text-primary-100
                "
            />

        <input
          type="email"
          placeholder="example@email.com"
          className="
          mt-2
          h-12
          w-full
          rounded-lg
          text-sm
          text-muted
          border-2
          border-primary-100
          px-8
          outline-none
          focus:border-primary
          "
        />
        
        </div>

      </div>

      <div
        className="
            mt-5
            mx-6
            rounded-md
            bg-primary-50
            py-4
            px-3
        "
        >

  <div className="flex items-start gap-1">

    <div
      className="
        mt-0.5
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-primary-50
      "
    >
      <ShieldCheck
        size={16}
        className="text-primary"
      />
    </div>

    <div>

      <p className="text-xs font-semibold text-primary">
        Secure Payment
      </p>

      <p className="text-[10px] leading-5 text-muted">
        Your payment information is safe with us.
        We do not store your card details.
      </p>

    </div>

  </div>

</div>
      </div>


      {/* Buttons */}

      <div className=" mt-15 flex flex-col justify-between">

        <div className="flex justify-between">

            <button
                onClick={onBack}
                className="rounded-md border-2 border-secondary-hover cursor-pointer hover:text-secondary hover:bg-secondary-burnt-100 hover:border-secondary-burnt-200 bg-secondary-burnt-hover font-medium text-surface-burnt-dark  px-10 py-2"
                >
                Back
            </button>

            <button
                onClick={onNext}
                className="rounded-md border-2 border-primary  bg-primary px-8 cursor-pointer py-2 font-medium hover:bg-primary-50 hover:text-primary hover:border-primary-200 text-white flex items-center gap-1 transition duration-300"
                >
                Pay ₦15,000

                <ArrowRight size={16}/>
            </button>

            </div>


      <p className="mt-8 text-center text-xs text-muted">
        Your payment is encrypted and secured by Paystack.
      </p>
    </div>
    </>
  );
}