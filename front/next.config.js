/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable for better performance and memory leak detection
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  images: {
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
    formats: ['image/avif', 'image/webp'], // Modern image formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache images for 60 seconds
  },
  webpack: (config, { isServer }) => {
    // Fix for Ant Design CSS-in-JS compatibility with Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    return config;
  },
  transpilePackages: ['antd', '@ant-design'],
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production to reduce bundle size
};

module.exports = nextConfig;
