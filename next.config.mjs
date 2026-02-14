import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

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
      { source: '/docs', destination: '/docs/da/welcome-to-avail-docs', permanent: false },
    ];
  },
};

export default withMDX(config);
