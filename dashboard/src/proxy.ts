// Mock mode is intentionally public so the dashboard can be previewed without GitHub credentials.
// Real-data mode keeps the Auth.js route protection.
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const proxy = process.env.NEXT_PUBLIC_USE_MOCKS === "1"
  ? (request: Request) => NextResponse.redirect(new URL("/app", request.url))
  : auth;

export const config = {
  matcher: ["/app/:path*", "/login", "/onboarding/:path*"],
};
