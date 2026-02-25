export type VaultEntry = {
  chain: string;
  chainId: number;
  address: string;
};

export type TokenEntry = {
  chain: string;
  address: string;
};

// --- Vault contracts ---

export const vaultMainnet: VaultEntry[] = [
  {
    chain: "Ethereum",
    chainId: 1,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Optimism",
    chainId: 10,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "BNB Chain",
    chainId: 56,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Polygon",
    chainId: 137,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Monad",
    chainId: 143,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Hyperliquid (HyperEVM)",
    chainId: 999,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Kaia",
    chainId: 8217,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Base",
    chainId: 8453,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Arbitrum One",
    chainId: 42161,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Avalanche C-Chain",
    chainId: 43114,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Scroll",
    chainId: 534352,
    address: "0xC0DED5d7F424276c821AF21F68E1e663bC671C3D",
  },
  {
    chain: "Citrea",
    chainId: 4114,
    address: "0xAc73E77b4FE9BBAAA35C7147DC3Fd5286929A746",
  },
];

export const vaultTestnet: VaultEntry[] = [
  {
    chain: "Polygon Amoy",
    chainId: 80002,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "Monad Testnet",
    chainId: 10143,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "Base Sepolia",
    chainId: 84532,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "Ethereum Sepolia",
    chainId: 11155111,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "OP Sepolia",
    chainId: 11155420,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "Arbitrum Sepolia",
    chainId: 421614,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "Flow Testnet",
    chainId: 567,
    address: "0xEFF0C81eC6D7c2a3B924e98B65303DDaa3030a81",
  },
  {
    chain: "Citrea Testnet",
    chainId: 5115,
    address: "0x10B69f0E3c21C1187526940A615959E9ee6012F9",
  },
];

// --- USDC ---

export const usdcMainnet: TokenEntry[] = [
  { chain: "Ethereum", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  { chain: "Base", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" },
  { chain: "Polygon", address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" },
  {
    chain: "Arbitrum One",
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  { chain: "Optimism", address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85" },
  { chain: "Scroll", address: "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4" },
  {
    chain: "Avalanche C-Chain",
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  },
  { chain: "BNB Chain", address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" },
  {
    chain: "Hyperliquid (HyperEVM)",
    address: "0xb88339CB7199b77E23DB6E890353E22632Ba630f",
  },
  { chain: "Monad", address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603" },
  { chain: "Citrea", address: "0xE045e6c36cF77FAA2CfB54466D71A3aEF7bBE839" },
];

export const usdcTestnet: TokenEntry[] = [
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
    address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea",
  },
  {
    chain: "Citrea Testnet",
    address: "0xb669dC8cC6D044307Ba45366C0c836eC3c7e31AA",
  },
];

// --- USDT ---

export const usdtMainnet: TokenEntry[] = [
  { chain: "Ethereum", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
  { chain: "Polygon", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" },
  {
    chain: "Arbitrum One",
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  },
  { chain: "Kaia", address: "0xd077A400968890Eacc75cdc901F0356c943e4fDb" },
  { chain: "Optimism", address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58" },
  { chain: "Scroll", address: "0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df" },
  {
    chain: "Avalanche C-Chain",
    address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
  },
  { chain: "BNB Chain", address: "0x55d398326f99059fF775485246999027B3197955" },
  {
    chain: "Hyperliquid (HyperEVM)",
    address: "0xB8CE59FC3717ada4C02eaDF9682A9e934F625ebb",
  },
  { chain: "Citrea", address: "0x9f3096Bac87e7F03DC09b0B416eB0DF837304dc4" },
];

export const usdtTestnet: TokenEntry[] = [
  {
    chain: "Arbitrum Sepolia",
    address: "0xF954d4A5859b37De88a91bdbb8Ad309056FB04B1",
  },
  {
    chain: "OP Sepolia",
    address: "0x6462693c2F21AC0E517f12641D404895030F7426",
  },
  {
    chain: "Monad Testnet",
    address: "0x1c56F176D6735888fbB6f8bD9ADAd8Ad7a023a0b",
  },
];
