import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // ဒါလေး ထည့်ပေးရပါမယ်
  images: {
    unoptimized: true, // Static site အတွက် ဒါက လိုအပ်ပါတယ်
  },
};

export default nextConfig;
