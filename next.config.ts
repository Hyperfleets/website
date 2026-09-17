import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.HYPERFLEETS_DIST_DIR || '.next',
};

export default nextConfig;
