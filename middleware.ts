import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Generate a random nonce for each request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // Build the strict CSP with nonce
  const cspHeader = [
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

  // Set nonce in request headers so Next.js can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set the CSP header on the response
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (they set their own headers)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml
     * - static assets
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif)).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
