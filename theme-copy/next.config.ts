import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "node:path";

// 할로윈 앱도 저장소 루트의 .env.local 설정을 사용합니다.
loadEnvConfig(path.resolve(process.cwd(), ".."), process.env.NODE_ENV !== "production", console, true);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.1.55"],
  turbopack: { root: process.cwd() },
};

export default nextConfig;
