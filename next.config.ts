/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: false,
      stream: false,
    };
    return config;
  },
};

module.exports = nextConfig;