import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Las fotos se sirven ya optimizadas desde /public/fotos (ver `npm run fotos`).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
