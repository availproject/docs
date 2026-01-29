"use client";
import React, { ReactNode, useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";
import { type EthereumProvider } from "@avail-project/nexus-core";
import { useAccount, useConnectorClient } from "wagmi";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNexus } from "../nexus/NexusProvider";
import { Button } from "../ui/button";
import { toast } from "sonner";
interface PreviewPanelProps {
  children: ReactNode;
  connectLabel: string;
}

export function PreviewPanel({
  children,
  connectLabel,
}: Readonly<PreviewPanelProps>) {
  const { status, connector } = useAccount();
  const { data: walletClient } = useConnectorClient();
  const { nexusSDK, handleInit, loading } = useNexus();
  const isMobile = useIsMobile();

  const initializeNexus = async () => {
    try {
      const mobileProvider = walletClient && {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  useEffect(() => {
    if (status === "connected" && !nexusSDK) {
      initializeNexus();
    }
  }, [status, nexusSDK]);
  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-center min-h-[450px] relative">
        {(status === "connected" || status === "connecting") && nexusSDK && (
          <>{children}</>
        )}
        {status === "connected" && !nexusSDK && (
          <Button onClick={initializeNexus}>
            {loading ? (
              <LoaderPinwheel className="size-6 animate-spin" />
            ) : (
              "Initialize Nexus"
            )}
          </Button>
        )}
        {status !== "connected" && (
          <p className="text-lg font-semibold">{connectLabel}</p>
        )}
      </div>
    </div>
  );
}
