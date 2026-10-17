import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.1.55"],
  turbopack: { root: process.cwd() },
};

export default nextConfig;
