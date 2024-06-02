import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;


  if (!token && ["/requests", "/guests", "/announcements", "/members"].includes(pathname)) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/requests", "/guests", "/announcements", "/members"],
};