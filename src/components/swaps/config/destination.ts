import { SUPPORTED_CHAINS } from "@avail-project/nexus-core";

export const DESTINATION_SWAP_TOKENS = new Map<
  number,
  {
    decimals: number;
    logo: string;
    name: string;
    symbol: string;
    tokenAddress: `0x${string}`;
  }[]
>([
  [
    SUPPORTED_CHAINS.OPTIMISM,
    [
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        name: "Ether",
        symbol: "ETH",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        name: "USD Coin",
        symbol: "USDC",
        tokenAddress: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/35023/large/USDT.png",
        name: "USDT Coin",
        symbol: "USDT",
        tokenAddress: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385",
        name: "Optimism",
        symbol: "OP",
        tokenAddress: "0x4200000000000000000000000000000000000042",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/12645/large/AAVE.png?1696512452",
        name: "Aave Token",
        symbol: "AAVE",
        tokenAddress: "0x76fb31fb4af56892a25e32cfc43de717950c9278",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/12504/large/uni.jpg?1696512319",
        name: "Uniswap",
        symbol: "UNI",
        tokenAddress: "0x6fd9d7ad17242c41f7131d257212c54a0e816691",
      },
    ],
  ],
  [
    SUPPORTED_CHAINS.ARBITRUM,
    [
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        name: "Ether",
        symbol: "ETH",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        name: "USD Coin",
        symbol: "USDC",
        tokenAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/35023/large/USDT.png",
        name: "USDT Coin",
        symbol: "USDT",
        tokenAddress: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
        name: "Pepe",
        symbol: "PEPE",
        tokenAddress: "0x25d887ce7a35172c62febfd67a1856f20faebb00",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326",
        name: "Lido DAO Token",
        symbol: "LDO",
        tokenAddress: "0x13ad51ed4f1b7e9dc168d8a00cb3f4ddd85efa60",
      },
    ],
  ],
  [
    SUPPORTED_CHAINS.SCROLL,
    [
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        name: "Ether",
        symbol: "ETH",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        name: "USD Coin",
        symbol: "USDC",
        tokenAddress: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/35023/large/USDT.png",
        name: "USDT Coin",
        symbol: "USDT",
        tokenAddress: "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
      },
    ],
  ],
  [
    SUPPORTED_CHAINS.BASE,
    [
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        name: "Ether",
        symbol: "ETH",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        decimals: 6,
        logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        name: "USD Coin",
        symbol: "USDC",
        tokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996",
        name: "Dai Stablecoin",
        symbol: "DAI",
        tokenAddress: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      },
      {
        decimals: 18,
        logo: "https://coin-images.coingecko.com/coins/images/28206/large/ftxG9_TJ_400x400.jpeg?1696527208",
        name: "LayerZero",
        symbol: "ZRO",
        tokenAddress: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
      },
      {
        decimals: 18,
        logo: "https://assets.coingecko.com/coins/images/12151/standard/OM_Token.png?1696511991",
        name: "MANTRA",
        symbol: "OM",
        tokenAddress: "0x3992b27da26848c2b19cea6fd25ad5568b68ab98",
      },
      {
        decimals: 18,
        logo: "https://assets.coingecko.com/coins/images/54411/standard/Qm4DW488_400x400.jpg",
        name: "KAITO",
        symbol: "KAITO",
        tokenAddress: "0x98d0baa52b2d063e780de12f615f963fe8537553",
      },
    ],
  ],
  [
    SUPPORTED_CHAINS.BNB,
    [
      {
        decimals: 18,
        logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
        name: "BNB",
        symbol: "BNB",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
    ],
  ],
]);

export const TOKEN_IMAGES: Record<string, string> = {
  USDC: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png",
  USDT: "https://coin-images.coingecko.com/coins/images/35023/large/USDT.png",
  "USD₮0":
    "https://coin-images.coingecko.com/coins/images/35023/large/USDT.png",
  WETH: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  USDS: "https://assets.coingecko.com/coins/images/39926/standard/usds.webp?1726666683",
  SOPH: "https://assets.coingecko.com/coins/images/38680/large/sophon_logo_200.png",
  KAIA: "https://assets.coingecko.com/asset_platforms/images/9672/large/kaia.png",
  BNB: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
  // Add ETH as fallback for any ETH-related tokens
  ETH: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
  // Add common token fallbacks
  POL: "https://coin-images.coingecko.com/coins/images/32440/standard/polygon.png",
  AVAX: "https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png",
  FUEL: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
  HYPE: "https://assets.coingecko.com/asset_platforms/images/243/large/hyperliquid.png",
  // Popular swap tokens
  DAI: "https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996",
  UNI: "https://coin-images.coingecko.com/coins/images/12504/large/uni.jpg?1696512319",
  AAVE: "https://coin-images.coingecko.com/coins/images/12645/large/AAVE.png?1696512452",
  LDO: "https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326",
  PEPE: "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776",
  OP: "https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385",
  ZRO: "https://coin-images.coingecko.com/coins/images/28206/large/ftxG9_TJ_400x400.jpeg?1696527208",
  OM: "https://assets.coingecko.com/coins/images/12151/standard/OM_Token.png?1696511991",
  KAITO:
    "https://assets.coingecko.com/coins/images/54411/standard/Qm4DW488_400x400.jpg",
};
