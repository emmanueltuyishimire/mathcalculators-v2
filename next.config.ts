import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mathcalculators',  // <--- Add this line
  images: {
    unoptimized: true,
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    allowedDevOrigins: [
      '*.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
