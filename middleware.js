import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/requests", "/guests", "/announcements", "/members"];

  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/requests/:path*", "/guests/:path*", "/announcements/:path*", "/members/:path*"],
};