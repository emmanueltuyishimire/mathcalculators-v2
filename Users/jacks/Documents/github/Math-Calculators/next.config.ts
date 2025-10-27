
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // ✅ Ignore TypeScript and ESLint build blocking (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
