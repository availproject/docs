import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";

export const dynamic = "force-dynamic";

const REFERENCE_DATA = {
  _meta: {
    lastUpdated: "2026-07-03",
    version: "2.0.0",
    description: "Structured reference data for Avail DA and Nexus",
  },
  da: {
    networks: {
      mainnet: {
        status: "active",
        rpc: [
          "https://mainnet-rpc.avail.so/rpc",
          "https://avail-mainnet.public.blastapi.io/",
          "https://mainnet.avail-rpc.com/",
          "https://avail.api.onfinality.io/public",
          "https://avail-mainnet.drpc.org",
          "https://avail.rpc.allnodes.me",
          "https://avail-rpc.vitwit.com",
          "https://avail-mainnet.globalstake.io",
          "https://avail-mainnet.radiumblock.co",
          "https://avail-mainnet.stakepool.dev",
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
        rpc: [
          "https://turing-rpc.avail.so/rpc",
          "https://avail-turing.api.onfinality.io/public",
          "https://rpc.ankr.com/avail_turing_testnet",
          "https://avail-turing.rpc.allnodes.me",
          "https://avail-turing.radiumblock.co",
        ],
        ws: ["wss://turing-rpc.avail.so/ws"],
        explorer: {
          subscan: "https://avail-turing.subscan.io",
          avail: "https://turing.explorer.availproject.org",
        },
        faucet: "https://faucet.avail.so",
        chainSpec:
          "https://raw.githubusercontent.com/availproject/avail/main/misc/genesis/testnet.turing.chain.spec.raw.json",
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
  },
  nexus: {
    vault_contracts: {
      mainnet: [
        {
          chain: "Ethereum",
          chainId: 1,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Optimism",
          chainId: 10,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "BNB Chain",
          chainId: 56,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Polygon",
          chainId: 137,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Monad",
          chainId: 143,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Hyperliquid (HyperEVM)",
          chainId: 999,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Citrea",
          chainId: 4114,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "MegaETH",
          chainId: 4326,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Base",
          chainId: 8453,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Arbitrum One",
          chainId: 42161,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Avalanche C-Chain",
          chainId: 43114,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
        {
          chain: "Scroll",
          chainId: 534352,
          address: "0xa009A9Fdc0eF474e7A3938a89f80329139291568",
        },
      ],
      testnet: [
        {
          chain: "Polygon Amoy",
          chainId: 80002,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
        {
          chain: "Monad Testnet",
          chainId: 10143,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
        {
          chain: "Base Sepolia",
          chainId: 84532,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
        {
          chain: "Ethereum Sepolia",
          chainId: 11155111,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
        {
          chain: "OP Sepolia",
          chainId: 11155420,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
        {
          chain: "Arbitrum Sepolia",
          chainId: 421614,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
        {
          chain: "Citrea Testnet",
          chainId: 5115,
          address: "0x86B60E813f9b739516dDbDc443526be5Ef8336aa",
        },
      ],
    },
    token_contracts: {
      usdc: {
        mainnet: [
          {
            chain: "Ethereum",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          },
          {
            chain: "Base",
            address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          },
          {
            chain: "Polygon",
            address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
          },
          {
            chain: "Arbitrum One",
            address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
          },
          {
            chain: "Optimism",
            address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
          },
          {
            chain: "Scroll",
            address: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
          },
          {
            chain: "Avalanche C-Chain",
            address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
          },
          {
            chain: "BNB Chain",
            address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          },
          {
            chain: "Hyperliquid (HyperEVM)",
            address: "0xb88339CB7199b77E23DB6E890353E22632Ba630f",
          },
          {
            chain: "Monad",
            address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
          },
          {
            chain: "Citrea",
            address: "0xE045e6c36cF77FAA2CfB54466D71A3aEF7bbE839",
          },
        ],
        testnet: [
          {
            chain: "Ethereum Sepolia",
            address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
          },
          {
            chain: "Base Sepolia",
            address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
          },
          {
            chain: "Arbitrum Sepolia",
            address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
          },
          {
            chain: "OP Sepolia",
            address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
          },
          {
            chain: "Polygon Amoy",
            address: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582",
          },
          {
            chain: "Monad Testnet",
            address: "0x534b2f3A21130d7a60830c2Df862319e593943A3",
          },
          {
            chain: "Citrea Testnet",
            address: "0xb669dC8cC6D044307Ba45366C0c836eC3c7e31AA",
          },
        ],
      },
      usdt: {
        mainnet: [
          {
            chain: "Ethereum",
            address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          },
          {
            chain: "Polygon",
            address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
          },
          {
            chain: "Arbitrum One",
            address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
          },
          {
            chain: "Optimism",
            address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
          },
          {
            chain: "Scroll",
            address: "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
          },
          {
            chain: "Avalanche C-Chain",
            address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
          },
          {
            chain: "BNB Chain",
            address: "0x55d398326f99059fF775485246999027B3197955",
          },
          {
            chain: "Hyperliquid (HyperEVM)",
            address: "0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb",
          },
          {
            chain: "Monad",
            address: "0xe7cd86e13AC4309349F30B3435a9d337750fC82D",
          },
          {
            chain: "MegaETH",
            address: "0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb",
          },
          {
            chain: "Citrea",
            address: "0x9f3096Bac87e7F03DC09b0B416eB0DF837304dc4",
          },
        ],
        testnet: [
          {
            chain: "Arbitrum Sepolia",
            address: "0xF954d4A5859b37De88a91bdbb8Ad309056FB04B1",
          },
          {
            chain: "OP Sepolia",
            address: "0x6462693c2F21AC0E517f12641D404895030F7426",
          },
        ],
      },
    },
    supported_chains: {
      mainnet: [
        {
          name: "Ethereum",
          chainId: 1,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Optimism",
          chainId: 10,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Polygon",
          chainId: 137,
          nativeToken: "POL",
          supportedTokens: ["POL", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Arbitrum",
          chainId: 42161,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Avalanche",
          chainId: 43114,
          nativeToken: "AVAX",
          supportedTokens: ["AVAX", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Scroll",
          chainId: 534352,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Base",
          chainId: 8453,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "BNB",
          chainId: 56,
          nativeToken: "BNB",
          supportedTokens: ["BNB", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "HyperEVM",
          chainId: 999,
          nativeToken: "HYPE",
          supportedTokens: ["HYPE", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Monad",
          chainId: 143,
          nativeToken: "MON",
          supportedTokens: ["MON", "USDC", "USDT"],
          swapsEnabled: true,
        },
        {
          name: "Citrea",
          chainId: 4114,
          nativeToken: "cBTC",
          supportedTokens: ["cBTC", "USDC.e", "USDT.e"],
          swapsEnabled: true,
        },
        {
          name: "MegaETH",
          chainId: 4326,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDM", "USDT"],
          swapsEnabled: true,
        },
      ],
      testnet: [
        {
          name: "Ethereum Sepolia",
          chainId: 11155111,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC"],
          swapsEnabled: false,
        },
        {
          name: "Optimism Sepolia",
          chainId: 11155420,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: false,
        },
        {
          name: "Polygon Amoy",
          chainId: 80002,
          nativeToken: "POL",
          supportedTokens: ["POL", "USDC"],
          swapsEnabled: false,
        },
        {
          name: "Arbitrum Sepolia",
          chainId: 421614,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC", "USDT"],
          swapsEnabled: false,
        },
        {
          name: "Base Sepolia",
          chainId: 84532,
          nativeToken: "ETH",
          supportedTokens: ["ETH", "USDC"],
          swapsEnabled: false,
        },
        {
          name: "Monad Testnet",
          chainId: 10143,
          nativeToken: "MON",
          supportedTokens: ["MON", "USDC"],
          swapsEnabled: false,
        },
        {
          name: "Citrea Testnet",
          chainId: 5115,
          nativeToken: "cBTC",
          supportedTokens: ["cBTC", "USDC"],
          swapsEnabled: false,
        },
      ],
    },
    tokens: [
      { symbol: "ETH", name: "Ethereum", decimals: 18 },
      { symbol: "USDC", name: "USD Coin", decimals: 6 },
      { symbol: "USDT", name: "Tether USD", decimals: 6 },
      { symbol: "USDC.e", name: "Bridged USDC (Citrea)", decimals: 6 },
      { symbol: "USDT.e", name: "Bridged USDT (Citrea)", decimals: 6 },
      { symbol: "USDM", name: "USDm", decimals: 18 },
      { symbol: "POL", name: "Polygon", decimals: 18 },
      { symbol: "AVAX", name: "Avalanche", decimals: 18 },
      { symbol: "BNB", name: "BNB", decimals: 18 },
      { symbol: "HYPE", name: "HyperEVM", decimals: 18 },
      { symbol: "MON", name: "Monad", decimals: 18 },
      { symbol: "cBTC", name: "Citrea BTC", decimals: 18 },
    ],
    sdks: {
      nexus_core: {
        package: "@avail-project/nexus-core",
        docs: "/docs/nexus/nexus-sdk",
      },
      nexus_widgets: {
        registry: "https://widgets.availproject.org/r",
        components: ["nexus"],
        docs: "/docs/nexus/widgets",
      },
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

export function GET(request?: NextRequest) {
  if (request)
    trackAgentRequest(request, {
      route: "/api/reference.json",
    });

  return NextResponse.json(REFERENCE_DATA, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      ...AGENT_HEADERS,
    },
  });
}
