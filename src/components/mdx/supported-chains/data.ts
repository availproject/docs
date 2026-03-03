export type Chain = {
  name: string;
  chainId: number;
  native: string;
  tokens: string[];
  swaps: boolean;
};

export type TokenInfo = {
  symbol: string;
  name: string;
  decimals: number;
};

export const mainnetChains: Chain[] = [
  {
    name: "Ethereum",
    chainId: 1,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: false,
  },
  {
    name: "Optimism",
    chainId: 10,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Polygon",
    chainId: 137,
    native: "POL",
    tokens: ["POL", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Arbitrum One",
    chainId: 42161,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Avalanche C-Chain",
    chainId: 43114,
    native: "AVAX",
    tokens: ["AVAX", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Scroll",
    chainId: 534352,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Base",
    chainId: 8453,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Kaia",
    chainId: 8217,
    native: "KAIA",
    tokens: ["KAIA", "USDT"],
    swaps: false,
  },
  {
    name: "BNB Chain",
    chainId: 56,
    native: "BNB",
    tokens: ["BNB", "ETH", "USDC", "USDT"],
    swaps: true,
  },
  {
    name: "Hyperliquid (HyperEVM)",
    chainId: 999,
    native: "HYPE",
    tokens: ["HYPE", "USDC", "USDT"],
    swaps: false,
  },
  {
    name: "Monad",
    chainId: 143,
    native: "MON",
    tokens: ["MON"],
    swaps: false,
  },
  {
    name: "Citrea",
    chainId: 4114,
    native: "cBTC",
    tokens: ["cBTC"],
    swaps: false,
  },
  {
    name: "MegaETH",
    chainId: 4326,
    native: "ETH",
    tokens: ["ETH", "USDm"],
    swaps: false,
  },
];

export const testnetChains: Chain[] = [
  {
    name: "Sepolia",
    chainId: 11155111,
    native: "ETH",
    tokens: ["ETH", "USDC"],
    swaps: false,
  },
  {
    name: "Optimism Sepolia",
    chainId: 11155420,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: false,
  },
  {
    name: "Polygon Amoy",
    chainId: 80002,
    native: "POL",
    tokens: ["POL", "USDC"],
    swaps: false,
  },
  {
    name: "Arbitrum Sepolia",
    chainId: 421614,
    native: "ETH",
    tokens: ["ETH", "USDC", "USDT"],
    swaps: false,
  },
  {
    name: "Base Sepolia",
    chainId: 84532,
    native: "ETH",
    tokens: ["ETH", "USDC"],
    swaps: false,
  },
  {
    name: "Monad Testnet",
    chainId: 10143,
    native: "MON",
    tokens: ["MON", "USDC", "USDT"],
    swaps: false,
  },
  {
    name: "Citrea Testnet",
    chainId: 5115,
    native: "cBTC",
    tokens: ["cBTC"],
    swaps: false,
  },
];

export const tokenReference: TokenInfo[] = [
  { symbol: "ETH", name: "Ethereum", decimals: 18 },
  { symbol: "USDC", name: "USD Coin", decimals: 6 },
  { symbol: "USDT", name: "Tether USD", decimals: 6 },
  { symbol: "USDm", name: "Mega USD", decimals: 18 },
  { symbol: "POL", name: "Polygon", decimals: 18 },
  { symbol: "AVAX", name: "Avalanche", decimals: 18 },
  { symbol: "BNB", name: "BNB", decimals: 18 },
  { symbol: "HYPE", name: "Hyperliquid", decimals: 18 },
  { symbol: "KAIA", name: "Kaia", decimals: 18 },
  { symbol: "MON", name: "Monad", decimals: 18 },
  { symbol: "cBTC", name: "Citrea BTC", decimals: 18 },
];
