"use client";

import {
  CHAIN_METADATA,
  type EthereumProvider,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
  truncateAddress,
} from "@avail-project/nexus-core";
import { Check, SpinnerGap, X } from "@phosphor-icons/react";
import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import { type Abi, type Address, encodeFunctionData } from "viem";
import { useAccount, useConnectorClient } from "wagmi";
import { useIsMobile } from "@/hooks/use-mobile";
import { NETWORK_KEY } from "@/lib/constants";
import { getItem } from "@/lib/local-storage";
import NexusDepositDemo from "../deposit/demo/nexus-deposit-demo";
import NexusDeposit from "../deposit/nexus-deposit";
import NetworkToggle from "../helpers/network-toggle";
import { useNexus } from "../nexus/NexusProvider";
import { Toggle } from "../ui/toggle";

// --- Wallet button for the toolbar ---

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

// --- Execute deposit builder (Aave supply on Base) ---

function buildExecuteDeposit(
  tokenSymbol: string,
  tokenAddress: `0x${string}`,
  amount: bigint,
  _chainId: number,
  user: Address,
) {
  const contractAddress = "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5" as const;
  const abi: Abi = [
    {
      inputs: [
        { internalType: "address", name: "asset", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "address", name: "onBehalfOf", type: "address" },
        { internalType: "uint16", name: "referralCode", type: "uint16" },
      ],
      name: "supply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  if (tokenSymbol === "ETH") {
    throw new Error("ETH is native and not supported for this execute builder");
  }
  const encoded = encodeFunctionData({
    abi,
    functionName: "supply",
    args: [tokenAddress, amount, user, 0],
  });
  if (!encoded) {
    throw new Error("Failed to encode contract call");
  }
  return {
    to: contractAddress,
    data: encoded,
    gasPriceSelector: "medium",
    tokenApproval: {
      token: tokenAddress,
      amount,
      spender: contractAddress,
    },
  };
}

// --- SDK Initializer (from PreviewPanel logic) ---

function useNexusInit() {
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

// --- Testnet-disabled elements ---

const disabledTestnet = new Set(["deposit"]);

// --- Main showcase ---

const DepositDemoShowcase = () => {
  const [embed, setEmbed] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const { isConnected, nexusSDK, loading } = useNexusInit();

  useEffect(() => {
    const storedNetwork = getItem(NETWORK_KEY);
    setCurrentNetwork(storedNetwork ?? "mainnet");
  }, []);

  const showTestnetMessage =
    disabledTestnet.has("deposit") && currentNetwork === "testnet";

  const showRealWidget = isConnected && nexusSDK && !showTestnetMessage;

  return (
    <div className="w-full flex flex-col gap-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full">
        <NetworkToggle />
        <div className="flex items-center gap-2">
          <WalletButton />
          <Toggle
            variant="outline"
            size="sm"
            pressed={embed}
            onPressedChange={setEmbed}
          >
            <p className="text-sm font-medium">Embed</p>
            {embed ? <Check size={16} /> : <X size={16} />}
          </Toggle>
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
          {showRealWidget ? (
            <NexusDeposit
              embed={embed}
              heading="Deposit USDC"
              destination={{
                chainId: SUPPORTED_CHAINS.BASE,
                tokenAddress:
                  TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.BASE],
                tokenSymbol: "USDC",
                tokenDecimals: TOKEN_METADATA.USDC.decimals,
                tokenLogo: TOKEN_METADATA.USDC.icon,
                label: "Deposit USDC on Aave Base",
                gasTokenSymbol:
                  CHAIN_METADATA[SUPPORTED_CHAINS.BASE].nativeCurrency.symbol,
                estimatedTime: "≈ 30s",
                explorerUrl:
                  CHAIN_METADATA[SUPPORTED_CHAINS.BASE].blockExplorerUrls[0],
                depositTargetLogo: "/aave.svg",
              }}
              executeDeposit={buildExecuteDeposit}
            />
          ) : isConnected && !nexusSDK ? (
            <div className="flex flex-col items-center gap-3">
              {loading ? (
                <SpinnerGap size={24} className="animate-spin" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Initializing Nexus...
                </p>
              )}
            </div>
          ) : (
            <NexusDepositDemo heading="Deposit USDC" />
          )}
        </div>
      )}
    </div>
  );
};

export default DepositDemoShowcase;
