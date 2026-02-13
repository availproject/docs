"use client";
import type { NexusNetwork } from "@avail-project/nexus-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Suspense, useEffect, useMemo, useState } from "react";
import { type Chain, defineChain } from "viem";
import { createConfig, WagmiProvider } from "wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  base,
  baseSepolia,
  bsc,
  kaia,
  mainnet,
  monadTestnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  scroll,
  sepolia,
} from "wagmi/chains";
import { PostHogIdentify } from "@/components/analytics/PostHogIdentify";
import NexusProvider from "@/components/nexus/NexusProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { getItem, setItem } from "@/lib/local-storage";

const hyperEVM = defineChain({
  id: 999,
  name: "HyperEVM",
  nativeCurrency: { name: "HYPE", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hyperliquid.xyz/evm"] },
  },
  blockExplorers: {
    default: { name: "HyperEVM Scan", url: "https://hyperevmscan.io" },
  },
});

const sophon = defineChain({
  id: 50104,
  name: "Sophon",
  nativeCurrency: {
    decimals: 18,
    name: "Sophon",
    symbol: "SOPH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sophon.xyz"],
      webSocket: ["wss://rpc.sophon.xyz/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sophon Block Explorer",
      url: "https://explorer.sophon.xyz",
    },
  },
});

// Add chain icons for RainbowKit
type ConnectKitChain = Chain & { iconUrl?: string; iconBackground?: string };

const monad = {
  id: 143,
  name: "Monad",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpcs.avail.so/monad"] },
  },
  blockExplorers: {
    default: { name: "MonVision", url: "https://monadvision.com/" },
  },
  testnet: false,
  iconUrl:
    "https://assets.coingecko.com/coins/images/38927/standard/monad.png?1764042736",
};

const hyperEVMWithIcon: ConnectKitChain = {
  ...hyperEVM,
  iconUrl:
    "https://assets.coingecko.com/coins/images/50882/standard/hyperliquid.jpg?1729431300",
  iconBackground: "#0a3cff",
};

const sophonWithIcon: ConnectKitChain = {
  ...sophon,
  iconUrl:
    "https://assets.coingecko.com/coins/images/38680/standard/sophon_logo_200.png?1747898236",
  iconBackground: "#6b5cff",
};

const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const defaultConfig = getDefaultConfig({
  appName: "Avail Docs",
  appDescription: "docs",
  appIcon: "https://elements.nexus.availproject.org/avail-fav.svg",
  walletConnectProjectId: WALLET_CONNECT_ID,
  chains: [
    mainnet,
    base,
    sophonWithIcon,
    hyperEVMWithIcon,
    bsc,
    kaia,
    arbitrum,
    avalanche,
    optimism,
    polygon,
    scroll,
    sepolia,
    baseSepolia,
    arbitrumSepolia,
    optimismSepolia,
    polygonAmoy,
    monadTestnet,
    monad,
  ],
  enableFamily: false,
});

const wagmiConfig = createConfig(defaultConfig);
export const NETWORK_KEY = "nexus-elements-network-key";

function NexusContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  const [network, setNetwork] = useState<NexusNetwork>("mainnet");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize network from localStorage on client side
    const storedNetwork = getItem(NETWORK_KEY) as NexusNetwork | null;

    if (
      storedNetwork &&
      (storedNetwork === "mainnet" || storedNetwork === "testnet")
    ) {
      setNetwork(storedNetwork);
    } else {
      // Set default to mainnet if not found or invalid
      setNetwork("mainnet");
      setItem(NETWORK_KEY, "mainnet");
    }

    setIsInitialized(true);
  }, []);

  const nexusConfig = useMemo(
    () => ({ network: network, debug: true }),
    [network],
  );

  // Don't render until we've initialized from localStorage
  if (!isInitialized) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <NexusProvider config={nexusConfig}>
      <PostHogIdentify />
      {children}
    </NexusProvider>
  );
}
const queryClient = new QueryClient();
const Web3Provider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider
            theme="minimal"
            options={{
              embedGoogleFonts: true,
            }}
            customTheme={{
              "--ck-body-color": "var(--foreground)",
              "--ck-border-radius": "var(--radius-lg)",
              "--ck-overlay-backdrop-filter": "blur(8px)",
              "--ck-primary-button-color": "var(--foreground)",
              "--ck-primary-button-background": "var(--background)",
              "--ck-primary-button-box-shadow":
                "inset 0px 0px 0px 1px var(--muted-foreground)",
              "--ck-primary-button-border-radius": "var(--radius-lg)",
              "--ck-primary-button-font-weight": "800",
              "--ck-primary-button-hover-color": "var(--primary)",
              "--ck-primary-button-hover-background": "var(--background)",
              "--ck-primary-button-hover-box-shadow":
                "inset 0px 0px 0px 2px var(--primary)",
              "--ck-primary-button-active-background": "var(--background)",
              "--ck-primary-button-active-box-shadow":
                "inset 0px 0px 0px 3px var(--primary)",
              "--ck-secondary-button-color": "var(--primary)",
              "--ck-secondary-button-background": "var(--background)",
              "--ck-secondary-button-box-shadow":
                "inset 0px 0px 0px 4px var(--primary)",
              "--ck-secondary-button-border-radius": "var(--radius-lg)",
              "--ck-secondary-button-font-weight": "500",
              "--ck-secondary-button-hover-color": "var(--primary)",
              "--ck-secondary-button-hover-background": "var(--background)",
              "--ck-secondary-button-hover-box-shadow":
                "inset 0px 0px 0px 1px var(--primary)",
              "--ck-secondary-button-active-background": "var(--background)",
              "--ck-secondary-button-active-box-shadow":
                "inset 0px 0px 0px 1px var(--primary)",
              "--ck-tertiary-button-color": "var(--primary)",
              "--ck-tertiary-button-background": "var(--background)",
              "--ck-tertiary-button-box-shadow":
                "inset 0px 0px 0px 2px var(--primary)",
              "--ck-tertiary-button-border-radius": "var(--radius-lg)",
              "--ck-tertiary-button-font-weight": "800",
              "--ck-tertiary-button-hover-color": "var(--primary)",
              "--ck-tertiary-button-hover-background": "var(--background)",
              "--ck-tertiary-button-hover-box-shadow":
                "inset 0px 0px 0px 2px var(--primary)",
              "--ck-modal-box-shadow": "0px 1px 0px 1px var(--background)",
              "--ck-body-background": "var(--background)",
              "--ck-body-background-secondary": "var(--background)",
              "--ck-body-background-tertiary": "var(--background)",
              "--ck-body-color-muted": "var(--muted-foreground)",
              "--ck-body-color-muted-hover": "var(--muted-foreground)",
              "--ck-body-color-danger": "var(--destructive)",
              "--ck-body-color-valid": "var(--foreground)",
              "--ck-modal-heading-font-weight": "500",
              "--ck-focus-color": "var(--primary-foreground)",
              "--ck-body-action-color": "var(--foreground)",
              "--ck-body-divider": "var(--border)",
              "--ck-qr-dot-color": "var(--primary-foreground)",
              "--ck-qr-background": "var(--primary)",
              "--ck-qr-border-color": "var(--primary-foreground)",
              "--ck-qr-border-radius": "var(--radius-lg)",
              "--ck-tooltip-color": "var(--primary-foreground)",
              "--ck-tooltip-background": "var(--primary)",
              "--ck-tooltip-background-secondary": "var(--primary)",
              "--ck-tooltip-shadow": "0px 2px 0px 0px var(--primary)",
              "--ck-spinner-color": "var(--primary-foreground)",
              "--ck-recent-badge-color": "var(--primary-foreground)",
              "--ck-recent-badge-background": "var(--primary)",
              "--ck-recent-badge-border-radius": "var(--radius-lg)",
              "--ck-body-disclaimer-color": "var(--foreground)",
              "--ck-body-disclaimer-link-color": "var(--foreground)",
              "--ck-body-disclaimer-link-hover-color": "var(--foreground)",
              "--ck-body-disclaimer-background": "var(--background)",
              "--ck-connectbutton-font-size": "12px",
              "--ck-connectbutton-border-radius": "var(--radius-lg)",
              "--ck-connectbutton-color": "var(--foreground)",
              "--ck-connectbutton-background": "var(--background)",
              "--ck-connectbutton-box-shadow":
                "inset 0px 0px 0px 1px var(--primary)",
              "--ck-connectbutton-hover-color": "var(--foreground)",
              "--ck-connectbutton-hover-background": "var(--background)",
              "--ck-connectbutton-hover-box-shadow":
                "inset 0px 0px 0px 2px var(--primary)",
              "--ck-connectbutton-active-color": "var(--foreground)",
              "--ck-connectbutton-active-background": "var(--background)",
              "--ck-connectbutton-active-box-shadow":
                "inset 0px 0px 0px 1px var(--primary)",
            }}
          >
            <NexusContainer>{children}</NexusContainer>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Suspense>
  );
};

export default Web3Provider;
