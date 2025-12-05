import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value; // <-- store role in login response

  const url = req.nextUrl;

  // Block seller from HOME PAGE "/"
  if (url.pathname === "/" && role === "seller") {
    const redirectUrl = new URL("/seller-block", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
