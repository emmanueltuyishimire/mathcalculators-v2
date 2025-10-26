import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
<<<<<<< HEAD
<<<<<<< HEAD
  output: 'export',
  basePath: '/mathcalculators',  // <--- Add this line
=======
>>>>>>> 8ee1d91 (optimize LCP, render blocking, and other things to optimize app performa)
=======
  output: 'export',
>>>>>>> b8cdf3e (make it ready for netlify hosting.)
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
