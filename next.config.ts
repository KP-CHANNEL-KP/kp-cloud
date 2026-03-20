// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', <-- ဒီစာကြောင်းကို ဖျက်ပါ သို့မဟုတ် comment ပိတ်ပါ
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
