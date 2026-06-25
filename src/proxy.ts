import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  const isLoginPage = pathname === '/admin/login';
  const isAdminUi = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAuthApi = pathname.startsWith('/api/admin/auth');

  if (isAdminApi && !isAuthApi) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      const SECRET = new TextEncoder().encode(
        process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
      );
      await jwtVerify(token, SECRET);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else if (isAdminUi) {
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (token && isLoginPage) {
      try {
        const SECRET = new TextEncoder().encode(
          process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
        );
        await jwtVerify(token, SECRET);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch {
        const response = NextResponse.next();
        response.cookies.delete('admin_token');
        return response;
      }
    } else if (token && !isLoginPage) {
      try {
        const SECRET = new TextEncoder().encode(
          process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
        );
        await jwtVerify(token, SECRET);
        return NextResponse.next();
      } catch {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
