import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Allow Cloud Workstations remote preview
  allowedDevOrigins: ['*.cloudworkstations.dev'],

  // ✅ Optimize image handling for Netlify (no next/image processing)
  images: {
    unoptimized: true,
  },

  // ✅ Ignore TypeScript and ESLint build blocking (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optional cosmetic indicators
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  // ✅ Keep static export URLs consistent
  trailingSlash: true,
};

export default nextConfig;
