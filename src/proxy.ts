import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * CSP Strategy:
 * - 'unsafe-inline' is required because Next.js 16 proxy.ts cannot inject
 *   nonces into server-rendered inline <script> tags (unlike middleware.ts).
 * - 'strict-dynamic' is added so modern browsers (CSP Level 3) ignore
 *   'unsafe-inline' and only trust scripts loaded by trusted initiators.
 * - script-src-elem is intentionally OMITTED so script elements fall back
 *   to script-src (avoids the override that was blocking inline scripts).
 * - script-src-attr 'none' blocks inline event handlers (onclick, etc.).
 * - All other directives remain strict.
 */
const CSP_HEADER = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' 'strict-dynamic'`,
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

function applyCSP(response: NextResponse): NextResponse {
  response.headers.set('Content-Security-Policy', CSP_HEADER);
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

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
        const response = NextResponse.next();
        response.cookies.delete('admin_token');
        return applyCSP(response);
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

  // --- Default: apply CSP to every response ---
  const response = NextResponse.next();
  return applyCSP(response);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif)).*)',
  ],
};
