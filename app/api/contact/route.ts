import { NextResponse } from "next/server";

import { resend } from "@/lib/resend";

export async function POST(req: Request){

    const body = await req.json();

    try{

        await resend.emails.send({

            from:"Ihesie Website <onboarding@resend.dev>",

            to:process.env.CONTACT_EMAIL!,

            subject:"New Contact Form",

            html:`

                <h2>New Contact Form</h2>

                <p><strong>Name:</strong> ${body.name}</p>

                <p><strong>Email:</strong> ${body.email}</p>

                <p><strong>Phone:</strong> ${body.phone}</p>

                <p><strong>Location:</strong> ${body.location}</p>

                <p><strong>Message:</strong></p>

                <p>${body.message}</p>

            `,

        });

        return NextResponse.json({
            success:true,
        });

    }catch(error){

        return NextResponse.json(
            {
                success:false,
            },
            {
                status:500,
            }
        );

    }

}