import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * CSP Strategy for Next.js 16 (proxy.ts):
 *
 * Generate a cryptographically secure random nonce per-request and pass it via
 * request headers (`x-nonce`) so Next.js Server Components can read it during rendering.
 *
 * Dev mode conditionally allows 'unsafe-eval' for Next.js fast-refresh compatibility.
 */
function buildCspHeader(nonce: string): string {
  const scriptSrc = process.env.NODE_ENV === 'production'
    ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`;

  return [
    `default-src 'self'`,
    scriptSrc,
    `script-src-elem 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://checkout.razorpay.com https://va.vercel-scripts.com`,
    `script-src-attr 'none'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://clarity.ms https://scripts.clarity.ms https://va.vercel-scripts.com https://c.bing.com https://*.bing.com`,
    `connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://api.razorpay.com https://api.shiprocket.in https://va.vercel-analytics.com https://c.bing.com https://*.bing.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');
}

function applyCSP(response: NextResponse, nonce: string): NextResponse {
  response.headers.set('Content-Security-Policy', buildCspHeader(nonce));
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  // Generate a per-request nonce
  const nonce = typeof btoa === 'function'
    ? btoa(crypto.randomUUID())
    : Buffer.from(crypto.randomUUID()).toString('base64');

  // Set x-nonce in request headers so Next.js Server Components can access it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const isLoginPage = pathname === '/admin/login';
  const isAdminUi = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAuthApi = pathname.startsWith('/api/admin/auth');

  // --- Admin API auth guard ---
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
  }

  // --- Admin UI auth guard ---
  if (isAdminUi && !isAdminApi) {
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
        const response = NextResponse.next({
          request: { headers: requestHeaders },
        });
        response.cookies.delete('admin_token');
        return applyCSP(response, nonce);
      }
    }
    if (token && !isLoginPage) {
      try {
        const SECRET = new TextEncoder().encode(
          process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
        );
        await jwtVerify(token, SECRET);
      } catch {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
    }
  }

  // --- Default: apply CSP to every page response ---
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  return applyCSP(response, nonce);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif)).*)',
  ],
};
