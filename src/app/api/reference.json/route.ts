import { NextResponse } from "next/server";

export const revalidate = false;

const REFERENCE_DATA = {
  networks: {
    mainnet: {
      status: "active",
      rpc: [
        "https://mainnet-rpc.avail.so/rpc",
        "https://avail-mainnet.public.blastapi.io/",
        "https://mainnet.avail-rpc.com/",
      ],
      ws: [
        "wss://avail-mainnet.public.blastapi.io/",
        "wss://mainnet.avail-rpc.com/",
      ],
      explorer: {
        subscan: "https://avail.subscan.io",
        avail: "https://mainnet.explorer.availproject.org",
      },
      chainSpec:
        "https://raw.githubusercontent.com/availproject/avail/main/misc/genesis/mainnet.chain.spec.raw.json",
    },
    turing_testnet: {
      status: "active",
      rpc: ["https://turing-rpc.avail.so/rpc"],
      ws: ["wss://turing-rpc.avail.so/ws"],
      explorer: {
        subscan: "https://avail-turing.subscan.io",
        avail: "https://turing.explorer.availproject.org",
      },
      faucet: "https://faucet.avail.so",
      chainSpec:
        "https://github.com/availproject/avail/blob/main/misc/genesis/testnet.turing.chain.spec.raw.json",
    },
  },
  contracts: {
    ethereum_mainnet: {
      vectorx: "0x02993cdC11213985b9B13224f3aF289F03bf298d",
      bridge: "0x054fd961708d8e2b9c10a63f6157c74458889f0a",
      avail_token: "0xEeB4d8400AEefafC1B2953e0094134A887C76Bd8",
      timelock: "0x45828180bbE489350D621d002968A0585406d487",
      governance: "0x7f2f87b0efc66fea0b7c30c61654e53c37993666",
    },
    ethereum_sepolia: {
      vectorx: "0xe542db219a7e2b29c7aeaeace242c9a2cd528f96",
      bridge: "0x967F7DdC4ec508462231849AE81eeaa68Ad01389",
      avail_token: "0xb1c3cb9b5e598d4e95a85870e7812b99f350982d",
    },
    base_mainnet: {
      avail_token: "0xd89d90d26b48940fa8f58385fe84625d468e057a",
    },
    base_sepolia: {
      avail_token: "0xf50F2B4D58ce2A24b62e480d795A974eD0f77A58",
    },
  },
  sdks: {
    typescript: {
      package: "avail-js-sdk",
      version: "0.4.1",
      install: "pnpm add avail-js-sdk@0.4.1",
      docs: "/docs/da/api-reference/avail-node-api",
    },
    rust: {
      package: "avail-rust",
      version: "0.1.9",
      install:
        'avail-rust = { git = "https://github.com/availproject/avail-rust", tag = "v0.1.9" }',
      docs: "/docs/da/api-reference/avail-node-api",
    },
    go: {
      package: "avail-go-sdk",
      version: "0.2.7",
      install: "go get github.com/availproject/avail-go-sdk@v0.2.7",
      docs: "/docs/da/api-reference/avail-node-api",
    },
  },
  apis: {
    light_client: {
      local_url: "http://localhost:7007",
      mainnet: "https://api.lightclient.mainnet.avail.so",
      docs: "/docs/da/api-reference/avail-lc-api",
    },
    turbo_da: {
      mainnet: "https://turbo-api.availproject.org/",
      testnet: "https://staging.turbo-api.availproject.org/",
      frontend_mainnet: "https://turbo.availproject.org/",
      frontend_testnet: "https://staging.turbo.availproject.org/",
      docs: "/docs/da/api-reference/avail-turbo-da-api",
    },
    bridge: {
      mainnet: "https://bridge-api.avail.so/",
      testnet: "https://turing-bridge-api.avail.so/",
      ui: "https://bridge.availproject.org/",
      docs: "/docs/da/api-reference/avail-bridge-api",
    },
  },
  links: {
    github: "https://github.com/availproject",
    docs: "https://docs.availproject.org",
    llms_txt: "/llms.txt",
    llms_full_txt: "/llms-full.txt",
    markdown_api: "/api/markdown/{slug}",
  },
} as const;

export function GET() {
  return NextResponse.json(REFERENCE_DATA, {
    headers: {
      "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
