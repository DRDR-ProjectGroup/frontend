import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/lib/constants/auth-cookies';
import {
  decodeJWT,
  getUserRoleFromToken,
  isTokenExpired,
} from '@/lib/utils/auth-token';

export const config = {
  matcher: ['/admin', '/admin/:path*', '/mypage', '/mypage/:path*'],
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = decodeJWT(accessToken);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isTokenExpired(accessToken)) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    const role = getUserRoleFromToken(accessToken);
    if (role !== null && role !== 'ROLE_ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
