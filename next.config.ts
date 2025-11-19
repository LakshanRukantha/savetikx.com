import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
