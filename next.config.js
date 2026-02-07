/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/honeydew-homes-v3-',
  assetPrefix: '/honeydew-homes-v3-',
};

module.exports = nextConfig;
