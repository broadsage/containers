import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['cdn.jsdelivr.net'],
  },
  // Remove rewrites for static export as they're not supported
  // API calls should be made to external services or handled client-side
};

export default nextConfig;
