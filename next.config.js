/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
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
  },
  compress: true,
};

module.exports = nextConfig;
