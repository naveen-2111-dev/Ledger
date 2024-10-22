import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
  const cookie = parse(req.headers.get("cookie") || "");

  if (cookie.connected && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/Home", req.url));
  }
  if (!cookie.connected && req.nextUrl.pathname === "/Home") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/","/Home"],
};
