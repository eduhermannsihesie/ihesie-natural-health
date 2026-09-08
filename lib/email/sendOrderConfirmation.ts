import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItemEmail {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface OrderConfirmationEmailData {
  email: string;
  fullName: string;
  orderId: string;

  address: string;
  city: string;
  state: string;

  currency: string;
  subtotal: number;
  deliveryFee: number;
  total: number;

  paymentReference: string | null;

  items: OrderItemEmail[];
}

export async function sendOrderConfirmation({
  email,
  fullName,
  orderId,
  address,
  city,
  state,
  currency,
  subtotal,
  deliveryFee,
  total,
  paymentReference,
  items,
}: OrderConfirmationEmailData) {
  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 0;">
            ${item.name}
          </td>

          <td
            style="
              padding: 10px 0;
              text-align: center;
            "
          >
            ${item.quantity}
          </td>

          <td
            style="
              padding: 10px 0;
              text-align: right;
            "
          >
            ₦${item.subtotal.toLocaleString()}
          </td>
        </tr>
      `
    )
    .join("");

  const { data, error } = await resend.emails.send({
    from:
      "Ihesie Natural Health <onboarding@resend.dev>",

    to: [email],

    subject: `Order Confirmed – ${orderId}`,

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
          Order Confirmed
        </h1>

        <p>Hello ${fullName},</p>

        <p>
          Thank you for your order from
          Ihesie Natural Health Services.
        </p>

        <p>
          Your payment has been received successfully
          and your order has been confirmed.
        </p>

        <div
          style="
            margin: 28px 0;
            padding: 20px;
            background: #f5f7f4;
            border-radius: 10px;
          "
        >
          <h2
            style="
              font-size: 18px;
              margin-top: 0;
            "
          >
            Order Details
          </h2>

          <p>
            <strong>Order ID:</strong>
            ${orderId}
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

        <table
          style="
            width: 100%;
            border-collapse: collapse;
            margin: 28px 0;
          "
        >
          <thead>
            <tr>
              <th
                style="
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 10px;
                "
              >
                Product
              </th>

              <th
                style="
                  text-align: center;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 10px;
                "
              >
                Qty
              </th>

              <th
                style="
                  text-align: right;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 10px;
                "
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <div
          style="
            margin: 28px 0;
            padding: 20px;
            border: 1px solid #e4e8e2;
            border-radius: 10px;
          "
        >
          <p>
            <strong>Subtotal:</strong>
            ₦${subtotal.toLocaleString()}
          </p>

          <p>
            <strong>Delivery Fee:</strong>
            ₦${deliveryFee.toLocaleString()}
          </p>

          <p
            style="
              font-size: 18px;
            "
          >
            <strong>Total Paid:</strong>
            ₦${total.toLocaleString()}
          </p>

          <p>
            <strong>Currency:</strong>
            ${currency}
          </p>
        </div>

        <div
          style="
            margin: 28px 0;
            padding: 20px;
            background: #f5f7f4;
            border-radius: 10px;
          "
        >
          <h2
            style="
              font-size: 18px;
              margin-top: 0;
            "
          >
            Delivery Address
          </h2>

          <p>
            ${address}<br />
            ${city}, ${state}
          </p>
        </div>

        <p>
          We will contact you if we need any additional
          information regarding your delivery.
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
        "Failed to send order confirmation email."
    );
  }

  return data;
}