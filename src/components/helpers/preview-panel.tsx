"use client";
import {
  type EthereumProvider,
  truncateAddress,
} from "@avail-project/nexus-core";
import { Spinner, SpinnerGap } from "@phosphor-icons/react";
import { ConnectKitButton } from "connectkit";
import { type ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useAccount, useConnectorClient } from "wagmi";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNexus } from "../nexus/NexusProvider";
import { Button } from "../ui/button";

interface PreviewPanelProps {
  children: ReactNode;
}

export function PreviewPanel({ children }: Readonly<PreviewPanelProps>) {
  const { status, connector } = useAccount();
  const { data: walletClient } = useConnectorClient();
  const { nexusSDK, handleInit, loading } = useNexus();
  const isMobile = useIsMobile();

  const initializeNexus = async () => {
    try {
      const mobileProvider = walletClient && {
        // biome-ignore lint/suspicious/noExplicitAny: wagmi provider typing mismatch
        request: (args: unknown) => walletClient.request(args as any),
      };
      const desktopProvider = await connector?.getProvider();
      const effectiveProvider = isMobile ? mobileProvider : desktopProvider;

      await handleInit(effectiveProvider as EthereumProvider);
      if (nexusSDK) {
        toast.success("Nexus initialized successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to initialize Nexus ${(error as Error)?.message}`);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally stable — re-init only on status/SDK change
  useEffect(() => {
    if (status === "connected" && !nexusSDK) {
      initializeNexus();
    }
  }, [status, nexusSDK]);
  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-center min-h-[450px] relative">
        {status === "connected" && (
          <ConnectKitButton.Custom>
            {({ show, address }) => (
              <button
                type="button"
                onClick={show}
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-muted-foreground bg-muted/50 border border-border rounded-md hover:bg-muted transition-colors"
              >
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {truncateAddress(address ?? "", 4, 4)}
              </button>
            )}
          </ConnectKitButton.Custom>
        )}
        {(status === "connected" || status === "connecting") &&
          nexusSDK &&
          children}
        {status === "connected" && !nexusSDK && (
          <Button onClick={initializeNexus}>
            {loading ? (
              <Spinner size={24} className="animate-spin" />
            ) : (
              "Initialize Nexus"
            )}
          </Button>
        )}
        {status !== "connected" && (
          <div className="flex flex-col items-center gap-4">
            <ConnectKitButton.Custom>
              {({ isConnecting, show }) => (
                <Button onClick={show}>
                  {isConnecting ? (
                    <SpinnerGap size={20} className="animate-spin" />
                  ) : (
                    "Connect Wallet"
                  )}
                </Button>
              )}
            </ConnectKitButton.Custom>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Connect your wallet to interact with a live
              <br />
              preview of this component.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
