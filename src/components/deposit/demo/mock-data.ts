import {
  CHAIN_METADATA,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
  type UserAsset,
} from "@avail-project/nexus-core";
import type { DestinationConfig } from "../types";

// Randomize a number within a range
function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function generateMockTxHash(): string {
  const hex = Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
  return `0x${hex}`;
}

// --- Destination config (USDC on Base via Aave) ---

export const MOCK_DESTINATION: DestinationConfig = {
  chainId: SUPPORTED_CHAINS.BASE,
  tokenAddress: TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.BASE],
  tokenSymbol: "USDC",
  tokenDecimals: TOKEN_METADATA.USDC.decimals,
  tokenLogo: TOKEN_METADATA.USDC.icon,
  label: "Deposit USDC on Aave Base",
  gasTokenSymbol: CHAIN_METADATA[SUPPORTED_CHAINS.BASE].nativeCurrency.symbol,
  estimatedTime: "≈ 30s",
  explorerUrl: CHAIN_METADATA[SUPPORTED_CHAINS.BASE].blockExplorerUrls[0],
  depositTargetLogo: "/aave.svg",
};

// --- Mock swap balance (multi-chain portfolio) ---

interface MockChainBalance {
  chainId: number;
  balance: number;
  balanceInFiat: number;
  contractAddress: string;
}

interface MockAssetConfig {
  symbol: string;
  decimals: number;
  icon: string;
  chains: Array<{
    chainId: number;
    contractAddress: string;
    minBalance: number;
    maxBalance: number;
    priceUsd: number;
  }>;
}

const MOCK_ASSET_CONFIGS: MockAssetConfig[] = [
  {
    symbol: "USDC",
    decimals: 6,
    icon: TOKEN_METADATA.USDC.icon,
    chains: [
      {
        chainId: SUPPORTED_CHAINS.BASE,
        contractAddress: TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.BASE],
        minBalance: 80,
        maxBalance: 400,
        priceUsd: 1,
      },
      {
        chainId: SUPPORTED_CHAINS.ETHEREUM,
        contractAddress:
          TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.ETHEREUM],
        minBalance: 50,
        maxBalance: 300,
        priceUsd: 1,
      },
      {
        chainId: SUPPORTED_CHAINS.ARBITRUM,
        contractAddress:
          TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.ARBITRUM],
        minBalance: 30,
        maxBalance: 200,
        priceUsd: 1,
      },
    ],
  },
  {
    symbol: "ETH",
    decimals: 18,
    icon: TOKEN_METADATA.ETH.icon,
    chains: [
      {
        chainId: SUPPORTED_CHAINS.ETHEREUM,
        contractAddress: "0x0000000000000000000000000000000000000000",
        minBalance: 0.05,
        maxBalance: 0.25,
        priceUsd: 2400,
      },
      {
        chainId: SUPPORTED_CHAINS.ARBITRUM,
        contractAddress: "0x0000000000000000000000000000000000000000",
        minBalance: 0.02,
        maxBalance: 0.15,
        priceUsd: 2400,
      },
    ],
  },
  {
    symbol: "USDT",
    decimals: 6,
    icon: TOKEN_METADATA.USDT?.icon ?? TOKEN_METADATA.USDC.icon,
    chains: [
      {
        chainId: SUPPORTED_CHAINS.POLYGON,
        contractAddress:
          TOKEN_CONTRACT_ADDRESSES.USDT[SUPPORTED_CHAINS.POLYGON],
        minBalance: 100,
        maxBalance: 350,
        priceUsd: 1,
      },
    ],
  },
];

export function generateMockSwapBalance(): UserAsset[] {
  return MOCK_ASSET_CONFIGS.map((config) => {
    const breakdownItems: MockChainBalance[] = config.chains.map((chain) => {
      const balance = rand(chain.minBalance, chain.maxBalance);
      return {
        chainId: chain.chainId,
        balance,
        balanceInFiat: balance * chain.priceUsd,
        contractAddress: chain.contractAddress,
      };
    });

    const totalBalance = breakdownItems.reduce((s, b) => s + b.balance, 0);
    const totalFiat = breakdownItems.reduce((s, b) => s + b.balanceInFiat, 0);

    return {
      symbol: config.symbol,
      decimals: config.decimals,
      icon: config.icon,
      balance: totalBalance.toString(),
      balanceInFiat: totalFiat,
      breakdown: breakdownItems.map((b) => {
        const chainMeta =
          CHAIN_METADATA[b.chainId as keyof typeof CHAIN_METADATA];
        return {
          chain: {
            id: b.chainId,
            name: chainMeta?.name ?? `Chain ${b.chainId}`,
            logo: chainMeta?.logo ?? "",
          },
          balance: b.balance.toString(),
          balanceInFiat: b.balanceInFiat,
          contractAddress: b.contractAddress,
          decimals: config.decimals,
        };
      }),
    } as UserAsset;
  });
}

// --- Collect all chain IDs from swap balance for pre-selection ---

export function getAllChainIds(swapBalance: UserAsset[]): Set<string> {
  const ids = new Set<string>();
  for (const asset of swapBalance) {
    for (const b of asset.breakdown ?? []) {
      if (b.chain?.id && b.contractAddress) {
        ids.add(`${b.contractAddress}-${b.chain.id}`);
      }
    }
  }
  return ids;
}

// --- Confirmation details generator ---

export function generateMockConfirmation(amountUsd: number) {
  const feeUsd = parseFloat(rand(0.15, 0.45).toFixed(2));
  const receiveUsd = amountUsd - feeUsd;
  const receiveTokenAmount = receiveUsd; // USDC is ~$1

  const baseMeta = CHAIN_METADATA[SUPPORTED_CHAINS.BASE];
  const ethMeta = CHAIN_METADATA[SUPPORTED_CHAINS.ETHEREUM];
  const arbMeta = CHAIN_METADATA[SUPPORTED_CHAINS.ARBITRUM];

  // Split spend across 2 sources
  const source1Amount = amountUsd * rand(0.55, 0.7);
  const source2Amount = amountUsd - source1Amount;

  return {
    sourceLabel: "Deposit USDC on Aave Base",
    sources: [
      {
        chainId: SUPPORTED_CHAINS.ETHEREUM,
        tokenAddress: TOKEN_CONTRACT_ADDRESSES.USDC[
          SUPPORTED_CHAINS.ETHEREUM
        ] as `0x${string}`,
        decimals: 6,
        symbol: "USDC",
        balance: source1Amount.toFixed(2),
        balanceInFiat: source1Amount,
        tokenLogo: TOKEN_METADATA.USDC.icon,
        chainLogo: ethMeta?.logo,
        chainName: ethMeta?.name ?? "Ethereum",
        isDestinationBalance: false,
      },
      {
        chainId: SUPPORTED_CHAINS.ARBITRUM,
        tokenAddress: TOKEN_CONTRACT_ADDRESSES.USDC[
          SUPPORTED_CHAINS.ARBITRUM
        ] as `0x${string}`,
        decimals: 6,
        symbol: "USDC",
        balance: source2Amount.toFixed(2),
        balanceInFiat: source2Amount,
        tokenLogo: TOKEN_METADATA.USDC.icon,
        chainLogo: arbMeta?.logo,
        chainName: arbMeta?.name ?? "Arbitrum One",
        isDestinationBalance: false,
      },
    ],
    gasTokenSymbol: "ETH",
    estimatedTime: "≈ 30s",
    amountSpent: amountUsd,
    totalFeeUsd: feeUsd,
    receiveTokenSymbol: "USDC",
    receiveAmountAfterSwap: `${receiveTokenAmount.toFixed(2)} USDC`,
    receiveAmountAfterSwapUsd: receiveUsd,
    receiveTokenLogo: TOKEN_METADATA.USDC.icon,
    receiveTokenChain: SUPPORTED_CHAINS.BASE,
    destinationChainName: baseMeta?.name ?? "Base",
  };
}

// --- Fee breakdown ---

export function generateMockFeeBreakdown() {
  const gasUsd = parseFloat(rand(0.2, 0.5).toFixed(2));
  return {
    totalGasFee: gasUsd,
    gasUsd,
    gasFormatted: `$${gasUsd.toFixed(2)}`,
  };
}

// --- Mock source swaps for completion screen ---

export function generateMockSourceSwaps() {
  const ethMeta = CHAIN_METADATA[SUPPORTED_CHAINS.ETHEREUM];
  const arbMeta = CHAIN_METADATA[SUPPORTED_CHAINS.ARBITRUM];
  const txHash1 = generateMockTxHash();
  const txHash2 = generateMockTxHash();

  return [
    {
      chainId: SUPPORTED_CHAINS.ETHEREUM,
      chainName: ethMeta?.name ?? "Ethereum",
      explorerUrl: `${ethMeta?.blockExplorerUrls?.[0]}/tx/${txHash1}`,
    },
    {
      chainId: SUPPORTED_CHAINS.ARBITRUM,
      chainName: arbMeta?.name ?? "Arbitrum One",
      explorerUrl: `${arbMeta?.blockExplorerUrls?.[0]}/tx/${txHash2}`,
    },
  ];
}

// --- Mock active intent (minimal shape) ---

export function generateMockActiveIntent(amountUsd: number) {
  const baseMeta = CHAIN_METADATA[SUPPORTED_CHAINS.BASE];
  const ethMeta = CHAIN_METADATA[SUPPORTED_CHAINS.ETHEREUM];
  const arbMeta = CHAIN_METADATA[SUPPORTED_CHAINS.ARBITRUM];

  const source1 = amountUsd * 0.6;
  const source2 = amountUsd * 0.4;

  return {
    allow: () => {},
    deny: () => {},
    refresh: async () => null,
    intent: {
      sources: [
        {
          chain: { id: SUPPORTED_CHAINS.ETHEREUM, name: ethMeta?.name },
          token: { symbol: "USDC", decimals: 6 },
          amount: source1.toFixed(2),
        },
        {
          chain: { id: SUPPORTED_CHAINS.ARBITRUM, name: arbMeta?.name },
          token: { symbol: "USDC", decimals: 6 },
          amount: source2.toFixed(2),
        },
      ],
      destination: {
        amount: amountUsd.toFixed(2),
        chain: { id: SUPPORTED_CHAINS.BASE, name: baseMeta?.name },
        token: { symbol: "USDC", decimals: 6 },
        gas: { amount: "0.00015", token: { symbol: "ETH" } },
      },
    },
  };
}

// --- Transaction steps ---

export function createMockSteps(): Array<{
  id: number;
  completed: boolean;
  step: import("@avail-project/nexus-core").SwapStepType;
}> {
  return [
    {
      id: 1,
      completed: false,
      step: { type: "RFF_ID", typeID: "RFF_ID", completed: false, data: 0 },
    },
    {
      id: 2,
      completed: false,
      step: {
        type: "DESTINATION_SWAP_HASH",
        typeID: "DESTINATION_SWAP_HASH",
        completed: false,
        data: 0,
      },
    },
    {
      id: 3,
      completed: false,
      step: {
        type: "BRIDGE_DEPOSIT",
        typeID: "BRIDGE_DEPOSIT",
        completed: false,
        data: 0,
      },
    },
    // biome-ignore lint/suspicious/noExplicitAny: SDK's SwapStepType uses template literal typeIDs
  ] as any;
}
