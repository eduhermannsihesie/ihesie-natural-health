"use client";

import { ArrowRight } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({
  onNext,
  onBack,
}: Props) {
  return (
    <>
      {/* Full Name */}

      <div className="mt-8">
        <label className="text-base font-medium text-primary">
          Full Name*
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="
            mt-2
            h-12
            w-full
            rounded-lg
            border-2
            border-primary-100
            px-4
            text-sm
            text-primary-200
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Age */}

      <div className="mt-8">
        <label className="text-base text-primary font-medium">
          Age*
        </label>

        <input
          type="number"
          placeholder="Enter your age"
          className="
            mt-2
            h-12
            w-full
            rounded-lg
            border-2
            border-primary-100
            px-4
            text-sm
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Email */}

      <div className="mt-8">
        <label className="text-base text-primary font-medium">
          Email*
        </label>

        <input
          type="email"
          placeholder="Enter email address"
          className="
            mt-2
            h-12
            w-full
            rounded-lg
            border-2
            border-primary-100
            px-4
            text-sm
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Phone */}

      <div className="mt-8">
        <label className="text-base text-primary font-medium">
          Phone Number*
        </label>

        <input
          type="tel"
          placeholder="Enter phone number"
          className="
            mt-2
            h-12
            w-full
            rounded-lg
            border-2
            border-primary-100
            px-4
            text-sm
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Health Concern */}

      <div className="mt-8">
        <label className="text-base text-primary font-medium">
          Health Concern
        </label>

        <textarea
          rows={5}
          placeholder="Briefly describe your symptoms or concern..."
          className="
            mt-2
            w-full
            rounded-lg
            border-2
            border-primary-100
            p-4
            text-sm
            outline-none
            resize-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Preferred Communication */}

      <div className="mt-8">
        <p className="text-base text-primary font-medium">
          Preferred Communication*
        </p>

        <div className="mt-3 space-y-2">

          <label className="flex items-center gap-2 text-sm text-primary-300">
            <input
              type="radio"
              name="communication"
              className="accent-green-700"
            />
            WhatsApp
          </label>

          <label className="flex items-center gap-2 text-sm text-primary-300">
            <input
              type="radio"
              name="communication"
              className="accent-green-700"
            />
            Phone Call
          </label>

          <label className="flex items-center gap-2 text-sm text-primary-300">
            <input
              type="radio"
              name="communication"
              className="accent-green-700"
            />
            Video Call
          </label>

        </div>
      </div>

      {/* Buttons */}
     
      <div className="mt-30 flex items-center justify-between">

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
          Continue 
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>

      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Your information is safe and secure. We respect your privacy.
      </p>
    </>
  );
}