"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  ChevronDown,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  date: Date | null;
  time: string;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const availableTimes = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export default function DateTimeStep({
  date,
  time,
  onDateChange,
  onTimeChange,
  onNext,
  onBack,
}: Props) {
  const [error, setError] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>(
    []
  );
  const [loadingAvailability, setLoadingAvailability] =
    useState(false);

  useEffect(() => {
    async function checkAvailability() {
      if (!date) {
        setBookedTimes([]);
        return;
      }

      try {
        setLoadingAvailability(true);

        const year = date.getFullYear();

        const month = String(
          date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
          date.getDate()
        ).padStart(2, "0");

        const formattedDate =
          `${year}-${month}-${day}`;

        const response = await fetch(
          `/api/consultations/availability?date=${formattedDate}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to check availability."
          );
        }

        setBookedTimes(data.bookedTimes || []);

        // If the previously selected time
        // has now become unavailable,
        // clear it automatically.
        if (
          time &&
          data.bookedTimes?.includes(time)
        ) {
          onTimeChange("");
        }
      } catch (availabilityError) {
        console.error(
          "Availability error:",
          availabilityError
        );

        setBookedTimes([]);

        setError(
          "Unable to check available times. Please try again."
        );
      } finally {
        setLoadingAvailability(false);
      }
    }

    checkAvailability();
  }, [date, time, onTimeChange]);

  const handleContinue = () => {
    if (!date) {
      setError(
        "Please select a consultation date."
      );
      return;
    }

    if (!time) {
      setError(
        "Please select a consultation time."
      );
      return;
    }

    if (bookedTimes.includes(time)) {
      setError(
        "That consultation time is no longer available."
      );
      return;
    }

    setError("");
    onNext();
  };

  return (
    <>
      {/* Date */}
      <div className="mt-8">
        <label className="font-medium text-lg">
          Pick a Date*
        </label>

        <div className="relative mt-2">
          <DatePicker
            selected={date}
            onChange={(selectedDate: Date | null) => {
              onDateChange(selectedDate);
              onTimeChange("");
              setError("");
            }}
            minDate={new Date()}
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
            wrapperClassName="w-full"
            className="
              w-full
              h-12
              rounded-lg
              border-2
              border-primary-100
              px-4
              pr-14
              text-sm
              placeholder:text-primary-100
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-primary-50
            "
          >
            <CalendarDays
              size={16}
              className="text-primary"
            />
          </div>
        </div>
      </div>

      {/* Time */}
      <div className="mt-8">
        <label className="text-xl font-medium">
          Select Time*
        </label>

        <div className="relative mt-2">
          <div
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-primary/10
            "
          >
            <Clock3
              size={16}
              className="text-primary"
            />
          </div>

          <select
            value={time}
            disabled={!date || loadingAvailability}
            onChange={(e) => {
              onTimeChange(e.target.value);
              setError("");
            }}
            className="
              h-12
              w-full
              appearance-none
              rounded-lg
              border-2
              border-primary-100
              bg-white
              pl-14
              pr-12
              text-sm
              font-medium
              text-primary-hover
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
              disabled:cursor-not-allowed
              disabled:bg-neutral-50
              disabled:text-neutral-400
            "
          >
            <option value="">
              {loadingAvailability
                ? "Checking availability..."
                : !date
                ? "Select a date first"
                : "Select a time"}
            </option>

            {availableTimes.map(
              (availableTime) => {
                const isBooked =
                  bookedTimes.includes(
                    availableTime
                  );

                return (
                  <option
                    key={availableTime}
                    value={availableTime}
                    disabled={isBooked}
                  >
                    {availableTime}
                    {isBooked
                      ? " — Booked"
                      : ""}
                  </option>
                );
              }
            )}
          </select>

          <ChevronDown
            size={20}
            className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-primary
            "
          />
        </div>

        {date &&
          !loadingAvailability &&
          bookedTimes.length > 0 && (
            <p className="mt-2 text-xs text-muted">
              Times marked as booked are no
              longer available.
            </p>
          )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-25 flex items-center justify-between">
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
        Your information is safe and secure. We
        respect your privacy.
      </p>
    </>
  );
}