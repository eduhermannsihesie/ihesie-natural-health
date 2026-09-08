  "use client";

import { CheckCircle2, Download, House } from "lucide-react";
import { ConsultationBooking } from "@/types/consultation"; 
interface Props {
  consultationId: string;
  treatment: string;
  date: string;
  time: string;
  onDownloadReceipt: () => void;
  onBackHome: () => void;
}

export default function SuccessStep({
  consultationId,
  treatment,
  date,
  time,
  onDownloadReceipt,
  onBackHome,
}: Props) {
  return (
    <>
      <div className="mt-12 flex flex-col items-center text-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-50">
          <CheckCircle2
            size={60}
            className="text-primary-hover"
          />
        </div>

        <h2 className="mt-4 font-heading text-3xl font-semibold">
          Booking Confirmed!
        </h2>

        <p className="mt-4 max-w-md text-sm text-muted">
          Thank you for choosing Ihesie Natural Health Services.
          Your consultation has been booked successfully.
        </p>

      </div>

      <div className="mt-8 rounded-xl border border-primary-100 p-6 ">

        <SummaryRow
          title="Consultation ID"
          value={consultationId}
        />

        <SummaryRow
          title="Date"
          value={date}
        />

        <SummaryRow
          title="Time"
          value={time}
        />

        <SummaryRow
          title="Treatment"
          value={treatment}
        />

      </div>

      <div className="mt-6 rounded-xl bg-secondary-burnt-100 p-5">

        <div className="space-y-3 text-xs">

          <p>✓ Confirmation email sent.</p>

          <p>✓ WhatsApp reminder scheduled.</p>

          <p>✓ Practitioner notified.</p>

        </div>

      </div>

      <div className="mt-12 flex justify-between">

        <button
          onClickCapture={() => window.print()}
          onClick={onDownloadReceipt}
          className="
          cursor-pointer
          flex items-center gap-2
          rounded-md
          border-2
          border-primary-100
           hover:text-secondary 
           hover:bg-secondary-burnt-100 
           hover:border-secondary-burnt-200
          px-6
          py-2
          "
        >
          <Download size={16}/>
          Receipt
        </button>

        <button
          onClick={onBackHome}
          className="
          cursor-pointer
          flex items-center gap-2
          rounded-md
          bg-primary
          border-2
          border-primary
          px-6
          py-2
          text-white
          hover:bg-primary-50 
          hover:text-primary 
          hover:border-primary-hover
          "
        >
          <House size={16}/>
          Back Home
        </button>

      </div>
    </>
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
    <div className="flex justify-between border-b border-border py-3">
      <span className="font-medium">{title}</span>
      <span className="text-muted">{value}</span>
    </div>
  );
}