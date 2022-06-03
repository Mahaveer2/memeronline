/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreDuringBuilds: true,
  cssLoaderOptions: {
    url: false
  },
  images: {
    domains: ['icon-library.com',"rb.gy"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  distDir: 'build',
};

module.exports = nextConfig