import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const COOKIE_NAME = "ihesie_admin_session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const passwordHash =
      process.env.ADMIN_PASSWORD_HASH;

    const sessionSecret =
      process.env.ADMIN_SESSION_SECRET;

    if (
      !adminEmail ||
      !passwordHash ||
      !sessionSecret
    ) {
      console.error(
        "Admin authentication environment variables are missing."
      );

      return NextResponse.json(
        {
          message:
            "Admin authentication is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const emailMatches =
      email === adminEmail;

    const passwordMatches =
      await bcrypt.compare(
        password,
        passwordHash
      );

    if (
      !emailMatches ||
      !passwordMatches
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const secret = new TextEncoder().encode(
      sessionSecret
    );

    const token = await new SignJWT({
      role: "admin",
      email: adminEmail,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set(
      COOKIE_NAME,
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Something went wrong while signing in.",
      },
      {
        status: 500,
      }
    );
  }
}