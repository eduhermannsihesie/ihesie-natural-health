import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ConsultationEmailData {
  email: string;
  fullName: string;
  consultationNumber: string;
  treatment: string;
  appointmentDate: Date;
  appointmentTime: string;
  communication: string;
  amount: number;
  paymentReference: string | null;
}

export async function sendConsultationConfirmation({
  email,
  fullName,
  consultationNumber,
  treatment,
  appointmentDate,
  appointmentTime,
  communication,
  amount,
  paymentReference,
}: ConsultationEmailData) {
  const formattedDate = appointmentDate.toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  );

  const { data, error } = await resend.emails.send({
    // Testing sender for now
    from: "Ihesie Natural Health <onboarding@resend.dev>",

    to: [email],

    subject: `Consultation Confirmed – ${consultationNumber}`,

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          color: #102207;
          line-height: 1.6;
        "
      >
        <h1 style="font-size: 26px;">
          Consultation Confirmed
        </h1>

        <p>Hello ${fullName},</p>

        <p>
          Thank you for booking a consultation with
          Ihesie Natural Health Services.
        </p>

        <p>
          Your payment has been received and your
          consultation has been confirmed.
        </p>

        <div
          style="
            margin: 28px 0;
            padding: 20px;
            background: #f5f7f4;
            border-radius: 10px;
          "
        >
          <h2 style="font-size: 18px; margin-top: 0;">
            Booking Details
          </h2>

          <p>
            <strong>Consultation ID:</strong>
            ${consultationNumber}
          </p>

          <p>
            <strong>Treatment:</strong>
            ${treatment}
          </p>

          <p>
            <strong>Date:</strong>
            ${formattedDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${appointmentTime}
          </p>

          <p>
            <strong>Preferred communication:</strong>
            ${communication}
          </p>
        </div>

        <div
          style="
            margin: 28px 0;
            padding: 20px;
            border: 1px solid #e4e8e2;
            border-radius: 10px;
          "
        >
          <h2 style="font-size: 18px; margin-top: 0;">
            Payment
          </h2>

          <p>
            <strong>Amount Paid:</strong>
            ₦${amount.toLocaleString()}
          </p>

          ${
            paymentReference
              ? `
                <p>
                  <strong>Payment Reference:</strong>
                  ${paymentReference}
                </p>
              `
              : ""
          }
        </div>

        <p>
          Please keep your consultation ID for your records.
        </p>

        <p>
          We will contact you using your selected communication
          method regarding your consultation.
        </p>

        <p style="margin-top: 32px;">
          Warm regards,<br />
          <strong>Ihesie Natural Health Services</strong>
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(
      error.message ||
        "Failed to send consultation confirmation email."
    );
  }

  return data;
}