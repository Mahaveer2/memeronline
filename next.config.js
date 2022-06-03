/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreDuringBuilds: true,
  images: {
    domains: ['icon-library.com',"rb.gy"],
  },
};

module.exports = nextConfig