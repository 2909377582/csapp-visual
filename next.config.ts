import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel 自动处理构建，不需要强制 export */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
