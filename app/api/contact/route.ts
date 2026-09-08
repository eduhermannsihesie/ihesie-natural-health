import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      location,
      message,
    } = body;

    if (!name || !phone || !email || !location || !message) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Ihesie Website <onboarding@resend.dev>",
      to: ["eduhermannsihesie@gmail.com"],
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Website Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        {
          message: error.message || "Failed to send message.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully.",
        data,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}