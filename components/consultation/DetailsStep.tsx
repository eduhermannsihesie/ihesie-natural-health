"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ConsultationBooking } from "@/types/consultation";

interface Props {
  booking: ConsultationBooking;

  updateBooking: (
    field: keyof ConsultationBooking,
    value: string | number | Date | null
  ) => void;

  onNext: () => void;
  onBack: () => void;
}

export default function DetailsStep({
  booking,
  updateBooking,
  onNext,
  onBack,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};

    // Full Name
    if (!booking.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (booking.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid full name.";
    }

    // Age
    if (!booking.age) {
      newErrors.age = "Please enter your age.";
    } else if (
      Number(booking.age) < 18 ||
      Number(booking.age) > 120
    ) {
      newErrors.age = "Please enter a valid age.";
    }

    // Email
    if (!booking.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!booking.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (
      !/^[+\d][\d\s-]{7,18}$/.test(booking.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Communication
    if (!booking.communication) {
      newErrors.communication =
        "Please select your preferred communication method.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    const isValid = validateDetails();

    if (!isValid) return;

    onNext();
  };

  return (
    <>
      {/* Full Name */}

      <div className="mt-8">
        <label className="text-base font-medium text-primary">
          Full Name*
        </label>

        <input
          type="text"
          value={booking.fullName}
          onChange={(e) => {
            updateBooking("fullName", e.target.value);

            setErrors((prev) => ({
              ...prev,
              fullName: "",
            }));
          }}
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
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />

        {errors.fullName && (
          <p className="mt-1 text-xs text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Age */}

      <div className="mt-8">
        <label className="text-base font-medium text-primary">
          Age*
        </label>

        <input
          type="number"
          min="18"
          max="120"
          value={booking.age}
          onChange={(e) => {
            updateBooking("age", e.target.value);

            setErrors((prev) => ({
              ...prev,
              age: "",
            }));
          }}
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

        {errors.age && (
          <p className="mt-1 text-xs text-red-600">
            {errors.age}
          </p>
        )}
      </div>

      {/* Email */}

      <div className="mt-8">
        <label className="text-base font-medium text-primary">
          Email*
        </label>

        <input
          type="email"
          value={booking.email}
          onChange={(e) => {
            updateBooking("email", e.target.value);

            setErrors((prev) => ({
              ...prev,
              email: "",
            }));
          }}
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

        {errors.email && (
          <p className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}

      <div className="mt-8">
        <label className="text-base font-medium text-primary">
          Phone Number*
        </label>

        <input
          type="tel"
          value={booking.phone}
          onChange={(e) => {
            updateBooking("phone", e.target.value);

            setErrors((prev) => ({
              ...prev,
              phone: "",
            }));
          }}
          placeholder="+234..."
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

        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Health Concern */}

      <div className="mt-8">
        <label className="text-base font-medium text-primary">
          Health Concern
        </label>

        <textarea
          rows={5}
          value={booking.healthConcern}
          onChange={(e) =>
            updateBooking("healthConcern", e.target.value)
          }
          placeholder="Briefly describe your symptoms or concern..."
          className="
            mt-2
            w-full
            resize-none
            rounded-lg
            border-2
            border-primary-100
            p-4
            text-sm
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Preferred Communication */}

      <div className="mt-8">
        <p className="text-base font-medium text-primary">
          Preferred Communication*
        </p>

        <div className="mt-3 space-y-3">
          {[
            "WhatsApp",
            "Phone Call",
            "Video Call",
          ].map((method) => (
            <label
              key={method}
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                text-sm
                text-primary-300
              "
            >
              <input
                type="radio"
                name="communication"
                value={method}
                checked={booking.communication === method}
                onChange={(e) => {
                  updateBooking(
                    "communication",
                    e.target.value
                  );

                  setErrors((prev) => ({
                    ...prev,
                    communication: "",
                  }));
                }}
                className="accent-green-700"
              />

              {method}
            </label>
          ))}
        </div>

        {errors.communication && (
          <p className="mt-2 text-xs text-red-600">
            {errors.communication}
          </p>
        )}
      </div>

      {/* Buttons */}

      <div className="mt-30 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="
            rounded-md
            border-2
            border-secondary-hover
            cursor-pointer
            hover:text-secondary
            hover:bg-secondary-burnt-100
            hover:border-secondary-burnt-200
            bg-secondary-burnt-hover
            font-medium
            text-surface-burnt-dark
            px-10
            py-2
          "
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="
            rounded-md
            border-2
            border-primary
            bg-primary
            px-8
            cursor-pointer
            py-2
            font-medium
            hover:bg-primary-50
            hover:text-primary
            hover:border-primary-200
            text-white
            flex
            items-center
            gap-1
            transition
            duration-300
          "
        >
          Continue

          <ArrowRight
            size={16}
            strokeWidth={2.5}
          />
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Your information is safe and secure. We respect your privacy.
      </p>
    </>
  );
}