"use client";

import {
  type EthereumProvider,
  truncateAddress,
} from "@avail-project/nexus-core";
import { Check, SpinnerGap, X } from "@phosphor-icons/react";
import { ConnectKitButton } from "connectkit";
import type React from "react";
import { useEffect, useState } from "react";
import { useAccount, useConnectorClient } from "wagmi";
import { useIsMobile } from "@/hooks/use-mobile";
import { NETWORK_KEY } from "@/lib/constants";
import { getItem } from "@/lib/local-storage";
import NetworkToggle from "../helpers/network-toggle";
import { useNexus } from "../nexus/NexusProvider";
import { Toggle } from "../ui/toggle";

// --- Wallet button ---

function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnecting, show, address }) => {
        if (address) {
          return (
            <button
              type="button"
              onClick={show}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground bg-muted/50 border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {truncateAddress(address, 4, 4)}
            </button>
          );
        }
        return (
          <button
            type="button"
            onClick={show}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground bg-muted/50 border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
          >
            {isConnecting ? (
              <SpinnerGap size={14} className="animate-spin" />
            ) : (
              "Connect Wallet"
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

// --- Nexus SDK initializer ---

export function useNexusInit() {
  const { status, connector } = useAccount();
  const { data: walletClient } = useConnectorClient();
  const { nexusSDK, handleInit, loading } = useNexus();
  const isMobile = useIsMobile();

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally stable
  useEffect(() => {
    if (status !== "connected" || nexusSDK) return;

    const init = async () => {
      try {
        const mobileProvider = walletClient && {
          // biome-ignore lint/suspicious/noExplicitAny: wagmi provider typing mismatch
          request: (args: unknown) => walletClient.request(args as any),
        };
        const desktopProvider = await connector?.getProvider();
        const effectiveProvider = isMobile ? mobileProvider : desktopProvider;
        await handleInit(effectiveProvider as EthereumProvider);
      } catch (error) {
        console.error("Failed to initialize Nexus:", error);
      }
    };
    init();
  }, [status, nexusSDK]);

  return { isConnected: status === "connected", nexusSDK, loading };
}

// --- Testnet-disabled types ---

type ElementType =
  | "deposit"
  | "swaps"
  | "fast-bridge"
  | "unified-balance"
  | "fast-transfer"
  | "view-history"
  | "swap-deposit";

const disabledTestnet = new Set<ElementType>([
  "deposit",
  "swaps",
  "swap-deposit",
]);

// --- Shell props ---

interface ToggleConfig {
  label: string;
  pressed: boolean;
  onChange: (pressed: boolean) => void;
}

export interface DemoShowcaseContext {
  isConnected: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: NexusSDK type varies
  nexusSDK: any;
  loading: boolean;
}

interface DemoShowcaseShellProps {
  type: ElementType;
  toggle?: ToggleConfig;
  children: (ctx: DemoShowcaseContext) => React.ReactNode;
}

// --- Shell component ---

const DemoShowcaseShell = ({
  type,
  toggle,
  children,
}: DemoShowcaseShellProps) => {
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const ctx = useNexusInit();

  useEffect(() => {
    const storedNetwork = getItem(NETWORK_KEY);
    setCurrentNetwork(storedNetwork ?? "mainnet");
  }, []);

  const showTestnetMessage =
    disabledTestnet.has(type) && currentNetwork === "testnet";

  return (
    <div className="w-full flex flex-col gap-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full">
        <NetworkToggle />
        <div className="flex items-center gap-2">
          <WalletButton />
          {toggle && (
            <Toggle
              variant="outline"
              size="sm"
              pressed={toggle.pressed}
              onPressedChange={toggle.onChange}
            >
              <p className="text-sm font-medium">{toggle.label}</p>
              {toggle.pressed ? <Check size={16} /> : <X size={16} />}
            </Toggle>
          )}
        </div>
      </div>

      {/* Content */}
      {showTestnetMessage ? (
        <div className="w-full h-64 flex flex-col gap-y-2 items-center justify-center">
          <p className="text-lg font-medium">
            This feature is not available on testnet
          </p>
          <p className="text-lg font-medium">Please switch to mainnet</p>
          <p className="text-center text-base">
            You can still view the source code or <br /> download the element
            with the command below.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center min-h-[450px]">
          {ctx.isConnected && !ctx.nexusSDK ? (
            <div className="flex flex-col items-center gap-3">
              {ctx.loading ? (
                <SpinnerGap size={24} className="animate-spin" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Initializing Nexus...
                </p>
              )}
            </div>
          ) : (
            children(ctx)
          )}
        </div>
      )}
    </div>
  );
};

export default DemoShowcaseShell;
