/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'siphorahq.in',
      },
      {
        protocol: 'https',
        hostname: 'siporahq-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'siphorahq-backend-production.up.railway.app',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compress: true,
};

module.exports = nextConfig;
