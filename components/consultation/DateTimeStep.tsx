"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { ArrowRight, CalendarDays, Clock3, ChevronDown } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function DateTimeStep({
  onNext,
  onBack,
}: Props) {

     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      {/* Date */}

      <div className="mt-8">
  <label className="font-medium text-lg">
    Pick a Date*
  </label>

  <div className="relative mt-2">

    <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
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

  <button
    type="button"
    className="
      mt-2
      flex
      h-12
      w-full
      items-center
      justify-between
      rounded-lg
      border-2
      border-primary-100
      bg-white
      px-3
      transition
      hover:border-primary
    "
  >
    <div className="flex items-center gap-3">

      <div
        className="
          flex
          h-8
          w-8
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

      <span className="font-medium text-sm text-primary-hover">
        10AM
      </span>

    </div>

    <ChevronDown
      size={20}
      className="text-primary"
    />
  </button>
</div>

      {/* Buttons */}

      <div className="mt-25 flex items-center justify-between">

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