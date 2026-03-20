/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.resolve.fallback = {
      crypto: false,
      stream: false,
    };
    return config;
  },
};

module.exports = nextConfig;