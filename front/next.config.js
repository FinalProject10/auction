/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "autobid.modeltheme.com",
      "carauctionnetwork.com",
      "images.unsplash.com",
      "static01.nyt.com",
      "dealerdotcom.webdamdb.com",
      "group.mercedes-benz.com",
      "images.pexels.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for Ant Design CSS-in-JS compatibility with Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  transpilePackages: ['antd', '@ant-design'],
};

module.exports = nextConfig;
