import type { NextConfig } from "next";

// Fully static: every figure is precomputed into data/data.json, so no server is needed.
const nextConfig: NextConfig = { output: "export", trailingSlash: true };

export default nextConfig;
