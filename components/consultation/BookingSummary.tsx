import { ShieldCheck } from "lucide-react";

interface Props {
  treatment: string;
  date: string;
  time: string;
  fullName: string;
  age: string;
  email: string;
  phone: string;
  communication: string;
  amount: string;
}

export default function BookingSummary({
  treatment,
  date,
  time,
  fullName,
  age,
  email,
  phone,
  communication,
  amount,
}: Props) {
  return (
    <div className="w-85 rounded-xl bg-white py-4 shadow-xl">

      <h3 className="text-lg border-b border-border pb-3 px-6 font-semibold text-primary">
        Booking Summary
      </h3>

      <div className="mt-4 px-6 space-y-3">

        <SummaryRow title="Treatment" value={treatment} />
        <SummaryRow title="Date" value={date} />
        <SummaryRow title="Time" value={time} />
        <SummaryRow title="Full Name" value={fullName} />
        <SummaryRow title="Age" value={age} />
        <SummaryRow title="Email" value={email} />
        <SummaryRow title="Phone Number" value={phone} />
        <SummaryRow title="Preferred Communication" value={communication} />
        <SummaryRow title="Amount" value={amount} />

      </div>

      <div className="mt-6 mx-3 rounded-lg bg-surface-burnt p-2">

        <div className="flex items-center gap-3">

          <div className="flex items-center justify-center rounded-full bg-primary-50">
            <ShieldCheck
              size={18}
              className="text-secondary-burnt-300"
            />
          </div>

          <p className="text-[10px] leading-5 text-gray-600">
              Once payment is successful, your consultation will be confirmed
              and you will receive confirmation by email and your preferred
              communication method.
            </p>

        </div>

      </div>

    </div>
  );
}

function SummaryRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6">

      <span className="text-sm font-medium text-primary">
        {title}
      </span>

      <span className="max-w-37.5 text-right text-sm text-muted">
        {value}
      </span>

    </div>
  );
}