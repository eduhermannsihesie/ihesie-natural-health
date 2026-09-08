import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderEmailItem {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface SendOrderEmailsParams {
  orderId: string;

  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };

  items: OrderEmailItem[];

  total: number;
}

export async function sendOrderEmails({
  orderId,
  customer,
  items,
  total,
}: SendOrderEmailsParams) {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ${item.name}
          </td>

          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ${item.quantity}
          </td>

          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ₦${item.subtotal.toLocaleString()}
          </td>
        </tr>
      `
    )
    .join("");

  // Customer confirmation email
  await resend.emails.send({
    from: "Ihesie Natural Health <orders@ihesienaturalhealth.com>",
    to: customer.email,

    subject: `Order Confirmed - ${orderId}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">
        <h2>Thank you for your order, ${customer.fullName}</h2>

        <p>
          Your payment has been confirmed and we have received your order.
        </p>

        <p>
          <strong>Order Reference:</strong> ${orderId}
        </p>

        <h3>Order Summary</h3>

        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px;">
                Product
              </th>

              <th style="text-align: left; padding: 8px;">
                Quantity
              </th>

              <th style="text-align: left; padding: 8px;">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 20px;">
          <strong>Total Paid:</strong>
          ₦${total.toLocaleString()}
        </p>

        <h3>Delivery Information</h3>

        <p>
          ${customer.address}<br />
          ${customer.city}, ${customer.state}
        </p>

        <p>
          Phone: ${customer.phone}
        </p>

        <p>
          We will contact you if we need any additional delivery information.
        </p>

        <p>
          Thank you for choosing Ihesie Natural Health.
        </p>
      </div>
    `,
  });

  // Ihesie internal new order notification
  await resend.emails.send({
    from: "Ihesie Website <orders@ihesienaturalhealth.com>",

    to: process.env.ORDER_NOTIFICATION_EMAIL!,

    subject: `New Paid Order - ${orderId}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">
        <h2>New Paid Order Received</h2>

        <p>
          <strong>Order Reference:</strong> ${orderId}
        </p>

        <h3>Customer</h3>

        <p>
          <strong>Name:</strong> ${customer.fullName}<br />
          <strong>Email:</strong> ${customer.email}<br />
          <strong>Phone:</strong> ${customer.phone}
        </p>

        <h3>Delivery Address</h3>

        <p>
          ${customer.address}<br />
          ${customer.city}, ${customer.state}
        </p>

        <h3>Order Items</h3>

        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px;">
                Product
              </th>

              <th style="text-align: left; padding: 8px;">
                Quantity
              </th>

              <th style="text-align: left; padding: 8px;">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 20px;">
          <strong>Total:</strong>
          ₦${total.toLocaleString()}
        </p>
      </div>
    `,
  });
}