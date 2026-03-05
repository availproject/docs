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
  // Reverse proxy for PostHog to avoid ad blockers
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
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
      // Legacy Nexus redirects (v1.5.0 restructure)
      {
        source: "/docs/nexus/nexus-overview",
        destination: "/docs/nexus/get-started",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples",
        destination: "/docs/nexus/nexus-sdk/examples",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples/:slug*",
        destination: "/docs/nexus/nexus-sdk/examples/:slug*",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart",
        destination: "/docs/nexus/nexus-sdk/quickstart",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-core",
        destination: "/docs/nexus/nexus-sdk/quickstart",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements",
        destination: "/docs/nexus/nexus-sdk/nexus-elements",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/:slug*",
        destination: "/docs/nexus/nexus-ui-elements/components/:slug*",
        permanent: true,
      },
      // Skip-to-quickstart: SDK section lands directly on quickstart
      {
        source: "/docs/nexus/nexus-sdk",
        destination: "/docs/nexus/nexus-sdk/quickstart",
        permanent: false,
      },
      // Skip-to-first-child: reference sections land directly on first method
      {
        source: "/docs/nexus/nexus-sdk/reference/bridge-methods",
        destination:
          "/docs/nexus/nexus-sdk/reference/bridge-methods/fetch-bridge-balances",
        permanent: false,
      },
      {
        source: "/docs/nexus/nexus-sdk/reference/swap-methods",
        destination:
          "/docs/nexus/nexus-sdk/reference/swap-methods/fetch-swap-balances",
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
