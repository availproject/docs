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
      {
        source: "/docs/nexus/nexus-overview",
        destination: "/docs/nexus",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples",
        destination: "/docs/nexus/nexus-sdk/examples",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples/bridge-and-transfer",
        destination: "/docs/nexus/nexus-sdk/examples",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples/bridge-execute",
        destination: "/docs/nexus/nexus-sdk/examples/bridge-execute",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples/nexus-bridge",
        destination: "/docs/nexus/nexus-sdk/examples/nexus-bridge",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples/nexus-initialization-basic",
        destination:
          "/docs/nexus/nexus-sdk/examples/nexus-initialization-basic",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-examples/nexus-initialization-rainbowkit",
        destination:
          "/docs/nexus/nexus-sdk/examples/nexus-initialization-rainbowkit",
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
        destination: "/docs/nexus/nexus-ui-elements",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/deposit",
        destination: "/docs/nexus/nexus-ui-elements/components/deposit",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/fast-bridge",
        destination: "/docs/nexus/nexus-ui-elements/components/fast-bridge",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/swaps",
        destination: "/docs/nexus/nexus-ui-elements/components/swaps",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/transfer",
        destination: "/docs/nexus/nexus-ui-elements/components/transfer",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/unified-balance",
        destination: "/docs/nexus/nexus-ui-elements/components/unified-balance",
        permanent: true,
      },
      {
        source: "/docs/nexus/nexus-quickstart/nexus-elements/view-history",
        destination: "/docs/nexus/nexus-ui-elements/components/view-history",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
