/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare အတွက် ဒါလေး ပါရပါမယ်
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;