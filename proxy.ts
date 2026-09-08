import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "ihesie_admin_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the admin login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token =
    request.cookies.get(COOKIE_NAME)?.value;

  // No session → send user to login
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  const sessionSecret =
    process.env.ADMIN_SESSION_SECRET;

  if (!sessionSecret) {
    console.error(
      "ADMIN_SESSION_SECRET is missing."
    );

    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    const secret = new TextEncoder().encode(
      sessionSecret
    );

    const { payload } = await jwtVerify(
      token,
      secret
    );

    // Make sure this really is an admin session
    if (payload.role !== "admin") {
      throw new Error("Invalid admin role.");
    }

    return NextResponse.next();
  } catch {
    // Invalid, modified or expired session
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    response.cookies.delete(COOKIE_NAME);

    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};