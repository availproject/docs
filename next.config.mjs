import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const __dirname = dirname(fileURLToPath(import.meta.url));

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "lucide-react"],
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
        destination: "/",
        permanent: false,
      },
      {
        source: "/docs/da/concepts/networks",
        destination: "/docs/da/build/networks",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-ui-elements/mcp-documentation",
        destination: "/docs/nexus/nexus-ui-elements/mcp-and-agent-skills",
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
        source: "/docs/nexus/nexus-sdk/reference/balances-and-tokens",
        destination:
          "/docs/nexus/nexus-sdk/reference/balances-and-tokens/get-balances",
        permanent: false,
      },
      {
        source: "/docs/nexus/nexus-sdk/reference/swap-methods",
        destination:
          "/docs/nexus/nexus-sdk/reference/swap-methods/swap-exact-in",
        permanent: false,
      },
      {
        source: "/docs/nexus/nexus-sdk/reference/execute-methods",
        destination: "/docs/nexus/nexus-sdk/reference/execute-methods/execute",
        permanent: false,
      },
      // SDK v3: bridge methods and max/balance helpers were removed
      {
        source: "/docs/nexus/nexus-sdk/reference/bridge-methods",
        destination: "/docs/nexus/nexus-sdk/get-started/bridge-tokens",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-sdk/reference/bridge-methods/bridge",
        destination: "/docs/nexus/nexus-sdk/get-started/bridge-tokens",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-sdk/reference/bridge-methods/transfer",
        destination: "/docs/nexus/nexus-sdk/get-started/bridge-tokens",
        permanent: true,
      },
      {
        source:
          "/docs/nexus/nexus-sdk/reference/bridge-methods/bridge-and-execute",
        destination:
          "/docs/nexus/nexus-sdk/reference/swap-methods/swap-and-execute",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-sdk/reference/bridge-methods/bridge-events",
        destination: "/docs/nexus/nexus-sdk/reference/swap-methods/swap-events",
        permanent: true,
      },
      {
        source:
          "/docs/nexus/nexus-sdk/reference/bridge-methods/fetch-bridge-balances",
        destination:
          "/docs/nexus/nexus-sdk/reference/balances-and-tokens/get-balances",
        permanent: true,
      },
      {
        source:
          "/docs/nexus/nexus-sdk/reference/swap-methods/fetch-swap-balances",
        destination:
          "/docs/nexus/nexus-sdk/reference/balances-and-tokens/get-balances",
        permanent: true,
      },
      {
        source:
          "/docs/nexus/nexus-sdk/reference/bridge-methods/calculate-max-for-bridge",
        destination: "/docs/nexus/migration/sdk-v2-to-v3",
        permanent: true,
      },
      {
        source:
          "/docs/nexus/nexus-sdk/reference/swap-methods/calculate-max-for-swap",
        destination: "/docs/nexus/migration/sdk-v2-to-v3",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
