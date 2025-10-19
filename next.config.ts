
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
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
