import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  // Ensure non-imported files read at runtime (e.g. with fs) are included in the output
  // so they are available on Vercel's serverless filesystem.
  outputFileTracingIncludes: {
    "/(app|pages|api)/**": ["./registry/**", "./hooks/**"],
  },
};

export default nextConfig;
