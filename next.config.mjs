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
      // Legacy URL redirects (old site used /nexus and /da without /docs prefix)
      {
        source: "/nexus/:path*",
        destination: "/docs/nexus/:path*",
        permanent: true,
      },
      // Legacy DA path renames (before adding /docs prefix)
      {
        source: "/da/build-with-avail/:path*",
        destination: "/docs/da/build/:path*",
        permanent: true,
      },
      {
        source: "/da/operate-a-node/:path*",
        destination: "/docs/da/operate/:path*",
        permanent: true,
      },
      {
        source: "/da/api-reference/avail-nexus-sdk/:path*",
        destination: "/docs/nexus/nexus-sdk/:path*",
        permanent: true,
      },
      {
        source: "/da/clash-of-nodes/:path*",
        destination: "/docs/da/faqs",
        permanent: true,
      },
      {
        source: "/da/:path*",
        destination: "/docs/da/:path*",
        permanent: true,
      },
      // Legacy end-user-guide paths
      {
        source: "/docs/end-user-guide/vectorx",
        destination: "/docs/da/user-guides/bridge-avail/avail-ethereum",
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
