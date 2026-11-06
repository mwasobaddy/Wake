import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A package-lock.json exists above this directory, and Turbopack otherwise
  // infers /Users/app as the workspace root and warns on every build.
  turbopack: {
    root: path.resolve(),
  },
};

export default nextConfig;
