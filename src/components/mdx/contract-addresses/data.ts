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
  { chain: "Ethereum", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
  { chain: "Base", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" },
  { chain: "Polygon", address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359" },
  {
    chain: "Arbitrum One",
    address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
  },
  { chain: "Optimism", address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85" },
  { chain: "Scroll", address: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4" },
  {
    chain: "Avalanche C-Chain",
    address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
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
  { chain: "Ethereum", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
  { chain: "Polygon", address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f" },
  {
    chain: "Arbitrum One",
    address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
  },
  { chain: "Kaia", address: "0xd077a400968890eacc75cdc901f0356c943e4fdb" },
  { chain: "Optimism", address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58" },
  { chain: "Scroll", address: "0xf55bec9cafdbe8730f096aa55dad6d22d44099df" },
  {
    chain: "Avalanche C-Chain",
    address: "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
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
