import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'siphorahq.in' },
      { protocol: 'https', hostname: 'siporahq-backend.onrender.com' },
      { protocol: 'https', hostname: 'siphorahq-backend-production.up.railway.app' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.siphorahq.in' }],
        destination: 'https://siphorahq.in/:path*',
        permanent: true,
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live googletagmanager.com google-analytics.com clarity.ms checkout.razorpay.com static.zohocdn.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: vercel.live vercel-insights.com google-analytics.com gstatic.com clarity.ms razorpay.com images.unsplash.com lh3.googleusercontent.com; font-src 'self' fonts.gstatic.com; connect-src 'self' vercel.live vercel-insights.com google-analytics.com clarity.ms api.razorpay.com checkout.razorpay.com accounts.zoho.in accounts.zoho.com; frame-src 'self' checkout.razorpay.com;",
          },
        ],
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
