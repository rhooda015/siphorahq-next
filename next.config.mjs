/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  productionBrowserSourceMaps: true, // Enable for bundle analysis
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
};

export default nextConfig;
