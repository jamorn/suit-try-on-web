import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.1.50',
    'localhost',
    'pastime-cruelly-elderly.ngrok-free.dev',
  ],
};

export default nextConfig;
