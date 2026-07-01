import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  // Allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect admin pages
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};