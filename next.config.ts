import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three', '3d-tiles-renderer'],
  images: {
    // WebP only — AVIF encodes ~9x slower (measured 6.9s vs 0.75s for a
    // hero-size photo) and every cold-cache request pays that cost, which
    // reads as "images never load" right after a deploy. The AVIF size win
    // (~20% on these photos) isn't worth multi-second first paints.
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 75, 85, 90, 95],
    // Photos only ever change by getting a new filename via the media
    // manager, so optimized variants can be cached for a month.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
