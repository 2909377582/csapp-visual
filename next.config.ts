import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Gitee Pages 部署时可能需要配置 basePath
  // basePath: '/csapp-visual',
};

export default nextConfig;
