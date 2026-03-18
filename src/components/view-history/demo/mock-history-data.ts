import {
  CHAIN_METADATA,
  SUPPORTED_CHAINS,
  TOKEN_METADATA,
} from "@avail-project/nexus-core";

interface MockRFF {
  id: number;
  sources: Array<{
    chain: { id: number; name: string; logo: string };
    token: { symbol: string };
    amount: string;
  }>;
  destinations: Array<{
    token: { symbol: string };
    amount: string;
  }>;
  destinationChain: { id: number; name: string; logo: string };
  expiry: number;
  explorerUrl: string;
  fulfilled: boolean;
  deposited: boolean;
  refunded: boolean;
}

const ethChain = CHAIN_METADATA[SUPPORTED_CHAINS.ETHEREUM];
const baseChain = CHAIN_METADATA[SUPPORTED_CHAINS.BASE];
const arbChain = CHAIN_METADATA[SUPPORTED_CHAINS.ARBITRUM];
const polChain = CHAIN_METADATA[SUPPORTED_CHAINS.POLYGON];

const MOCK_CHAINS = [
  {
    id: SUPPORTED_CHAINS.ETHEREUM,
    name: ethChain?.name ?? "Ethereum",
    logo: ethChain?.logo ?? "",
  },
  {
    id: SUPPORTED_CHAINS.BASE,
    name: baseChain?.name ?? "Base",
    logo: baseChain?.logo ?? "",
  },
  {
    id: SUPPORTED_CHAINS.ARBITRUM,
    name: arbChain?.name ?? "Arbitrum One",
    logo: arbChain?.logo ?? "",
  },
  {
    id: SUPPORTED_CHAINS.POLYGON,
    name: polChain?.name ?? "Polygon",
    logo: polChain?.logo ?? "",
  },
];

const MOCK_TOKENS = ["USDC", "ETH", "USDT"];

const STATUS_CONFIGS = [
  { fulfilled: true, deposited: true, refunded: false },
  { fulfilled: true, deposited: true, refunded: false },
  { fulfilled: false, deposited: true, refunded: false },
  { fulfilled: false, deposited: false, refunded: true },
  { fulfilled: true, deposited: true, refunded: false },
  { fulfilled: false, deposited: false, refunded: false },
] as const;

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockHistory(): MockRFF[] {
  const now = Math.floor(Date.now() / 1000);

  return STATUS_CONFIGS.map((statusConfig, i) => {
    const sourceChain = MOCK_CHAINS[i % MOCK_CHAINS.length];
    const destChain = MOCK_CHAINS[(i + 1) % MOCK_CHAINS.length];
    const token = MOCK_TOKENS[i % MOCK_TOKENS.length];
    const amount = (Math.random() * 500 + 10).toFixed(2);

    // Add a second source chain for some entries
    const sources = [{ chain: sourceChain, token: { symbol: token }, amount }];
    if (i % 3 === 0) {
      const secondSource = MOCK_CHAINS[(i + 2) % MOCK_CHAINS.length];
      sources.push({
        chain: secondSource,
        token: { symbol: randomFrom(MOCK_TOKENS) },
        amount: (Math.random() * 200 + 5).toFixed(2),
      });
    }

    return {
      id: 1000 + i,
      sources,
      destinations: [{ token: { symbol: token }, amount }],
      destinationChain: destChain,
      // Expiry dates spread over the past 30 days
      expiry: now - (i + 1) * 86400 * (Math.floor(Math.random() * 5) + 1),
      explorerUrl: `https://explorer.nexus.avail.so/intent/${1000 + i}`,
      ...statusConfig,
    };
  });
}

export function getStatus(item: MockRFF): string {
  if (item.fulfilled) return "Fulfilled";
  if (item.deposited) return "Deposited";
  if (item.refunded) return "Refunded";
  return "Failed";
}

export function formatExpiryDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const formatted = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatted.replace(" ", ", ");
}

// Re-export TOKEN_METADATA for demo component use
export { TOKEN_METADATA };
