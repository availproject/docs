import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const __dirname = dirname(fileURLToPath(import.meta.url));

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/da/get-started",
        permanent: false,
      },
      {
        source: "/docs/da/concepts/networks",
        destination: "/docs/da/build/networks",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
