import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 428, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
    optimizeCss: true,
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.siphorahq.in' }],
        destination: 'https://siphorahq.in/:path*',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/our-story',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/returns',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/shipping-policy',
        permanent: true,
      },
      {
        source: '/shipping-returns',
        destination: '/shipping-policy',
        permanent: true,
      },
      {
        source: '/products/emerald-regent-mug',
        destination: '/products/siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle',
        permanent: true,
      },
      {
        source: '/products/imperial-white-porcelain-mug',
        destination: '/products/siphorahq-imperial-diamond-fine-bone-china-mug-with-gold-rim',
        permanent: true,
      },
      {
        source: '/products/moroccan-azure-tea-mug',
        destination: '/products/siphorahq-moroccan-azure-royal-fine-porcelain-tea-mug',
        permanent: true,
      },
      {
        source: '/products/premium-gold-dinner-set',
        destination: '/products/premium-dinner-set-46',
        permanent: true,
      },
      {
        source: '/products/blue-rose-tea-set',
        destination: '/products/premium-tea-set-17',
        permanent: true,
      },
      {
        source: '/products/royal-ivory-cup-set',
        destination: '/products/coffee-mugs-gold',
        permanent: true,
      },
      {
        source: '/products/classic-white-dinner-plates',
        destination: '/products/porcelain-side-plates',
        permanent: true,
      },
      {
        source: '/products/golden-rim-serving-bowl',
        destination: '/products/luxury-bowl-set',
        permanent: true,
      },
      {
        source: '/products/luxe-wedding-gift-box',
        destination: '/products/designer-gift-box',
        permanent: true,
      },
      {
        source: '/products/corporate-gift-cup-set',
        destination: '/products/designer-gift-box',
        permanent: true,
      },
      {
        source: '/products/minimalist-porcelain-tea-cups',
        destination: '/products/coffee-mugs-gold',
        permanent: true,
      },
      {
        source: '/products/heritage-navy-mug-set',
        destination: '/products/coffee-mugs-gold',
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
        ],
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
