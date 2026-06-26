import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function buildCspHeader(nonce: string): string {
  return [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `script-src-elem 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://checkout.razorpay.com https://va.vercel-scripts.com`,
    `script-src-attr 'none'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.gstatic.com https://*.clarity.ms https://c.bing.com https://checkout.razorpay.com https://*.razorpay.com https://images.unsplash.com https://lh3.googleusercontent.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.clarity.ms https://c.bing.com https://checkout.razorpay.com https://api.razorpay.com https://lumberjack.razorpay.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://accounts.zoho.in https://accounts.zoho.com`,
    `frame-src 'self' https://checkout.razorpay.com https://api.razorpay.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');
}

function applySecurityHeaders(response: NextResponse, nonce: string, request: NextRequest): NextResponse {
  // Set nonce in request headers so Next.js can read it for inline scripts
  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', buildCspHeader(nonce));
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  // Generate a per-request nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

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
        return applySecurityHeaders(response, nonce, request);
      }
    } else if (token && !isLoginPage) {
      try {
        const SECRET = new TextEncoder().encode(
          process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
        );
        await jwtVerify(token, SECRET);
        const response = NextResponse.next();
        return applySecurityHeaders(response, nonce, request);
      } catch {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
    }
  }

  const response = NextResponse.next();
  return applySecurityHeaders(response, nonce, request);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    /*
     * Match all page request paths for CSP.
     * Exclude static files / images / API routes that don't need CSP.
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif)).*)',
  ],
};
