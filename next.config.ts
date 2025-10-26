
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
};

export default nextConfig;
