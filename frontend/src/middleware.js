import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (!token && !isLoginPage && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};