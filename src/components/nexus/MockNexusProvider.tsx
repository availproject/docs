"use client";

import {
  NEXUS_EVENTS,
  NexusSDK,
  type OnAllowanceHookData,
  type OnIntentHookData,
  type OnSwapIntentHookData,
} from "@avail-project/nexus-core";
import type React from "react";
import { useCallback, useMemo, useRef } from "react";
import {
  generateMockSwapBalance,
  generateMockTxHash,
} from "../deposit/demo/mock-data";
import { NexusContext } from "./NexusProvider";

// --- Real SDK instance for utils (no wallet needed) ---
const realSdk = new NexusSDK({ network: "mainnet" });
const supportedChains = realSdk.utils.getSupportedChains();
const swapSupportedChains = realSdk.utils.getSwapSupportedChainsAndTokens();

// --- Mock exchange rates ---
const MOCK_EXCHANGE_RATE: Record<string, number> = {
  USDC: 1,
  USDT: 1,
  ETH: 2400,
  BNB: 600,
  AVAX: 35,
  POL: 0.5,
  MATIC: 0.5,
};

// --- Mock ReadableIntent ---
function createMockReadableIntent(
  token: string,
  amount: string,
  toChainId: number,
) {
  const chains = supportedChains ?? [];
  const destChain = chains.find((c) => c.id === toChainId) ?? chains[0];
  // Pick 2 source chains (not the destination)
  const sourceChains = chains.filter((c) => c.id !== toChainId).slice(0, 2);

  const numAmount = parseFloat(amount) || 100;
  const source1Amount = (numAmount * 0.6).toFixed(6);
  const source2Amount = (numAmount * 0.4).toFixed(6);
  const totalFee = (numAmount * 0.003).toFixed(6);

  return {
    token: { symbol: token, decimals: token === "ETH" ? 18 : 6 },
    sources: [
      {
        chainID: sourceChains[0]?.id ?? 1,
        chainName: sourceChains[0]?.name ?? "Ethereum",
        chainLogo: sourceChains[0]?.logo ?? "",
        amount: source1Amount,
      },
      {
        chainID: sourceChains[1]?.id ?? 42161,
        chainName: sourceChains[1]?.name ?? "Arbitrum One",
        chainLogo: sourceChains[1]?.logo ?? "",
        amount: source2Amount,
      },
    ],
    sourcesTotal: numAmount.toFixed(6),
    destination: {
      amount: (numAmount - parseFloat(totalFee)).toFixed(6),
      chainName: destChain?.name ?? "Base",
      chainID: toChainId,
    },
    fees: {
      total: totalFee,
      caGas: (parseFloat(totalFee) * 0.4).toFixed(6),
      gasSupplied: (parseFloat(totalFee) * 0.2).toFixed(6),
      solver: (parseFloat(totalFee) * 0.25).toFixed(6),
      protocol: (parseFloat(totalFee) * 0.15).toFixed(6),
    },
  };
}

// --- MockNexusProvider ---

interface MockNexusProviderProps {
  children: React.ReactNode;
}

const MockNexusProvider = ({ children }: MockNexusProviderProps) => {
  const intent = useRef<OnIntentHookData | null>(null);
  const allowance = useRef<OnAllowanceHookData | null>(null);
  const swapIntent = useRef<OnSwapIntentHookData | null>(null);
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Hook callbacks stored by mock SDK
  const intentHookCb = useRef<((data: OnIntentHookData) => void) | null>(null);
  const swapIntentHookCb = useRef<
    ((data: OnSwapIntentHookData) => void) | null
  >(null);

  const mockBalance = useMemo(() => generateMockSwapBalance(), []);

  // --- Build mock SDK ---
  // biome-ignore lint/suspicious/noExplicitAny: mock SDK proxies real utils with simulated transaction methods
  const mockSdk = useMemo((): any => {
    const sdk = {
      utils: realSdk.utils,
      isInitialized: () => true,
      hasEvmProvider: () => true,

      // Store hook callbacks
      setOnIntentHook: (cb: (data: OnIntentHookData) => void) => {
        intentHookCb.current = cb;
      },
      setOnSwapIntentHook: (cb: (data: OnSwapIntentHookData) => void) => {
        swapIntentHookCb.current = cb;
      },
      setOnAllowanceHook: () => {},

      // Mock calculateMaxForBridge
      calculateMaxForBridge: async ({
        token,
      }: {
        token: string;
        toChainId: number;
        recipient: string;
      }) => {
        const balance = mockBalance.find((b) => b.symbol === token);
        return { amount: balance?.balance ?? "100" };
      },

      // Mock convertTokenReadableAmountToBigInt
      convertTokenReadableAmountToBigInt: (amount: string, token: string) => {
        const decimals = token === "ETH" ? 18 : 6;
        const [whole = "0", frac = ""] = amount.split(".");
        const paddedFrac = frac.padEnd(decimals, "0").slice(0, decimals);
        return BigInt(whole + paddedFrac);
      },

      // Mock balance fetching
      getBalancesForBridge: async () => mockBalance,
      getBalancesForSwap: async () => mockBalance,
      getMyIntents: async () => [],

      // --- Mock bridge() ---
      bridge: (
        params: { token: string; amount: bigint; toChainId: number },
        options?: {
          onEvent?: (event: { name: string; args: unknown }) => void;
        },
      ) => {
        return new Promise((resolve, reject) => {
          const onEvent = options?.onEvent;
          const mockIntent = createMockReadableIntent(
            params.token,
            (Number(params.amount) / 10 ** 6).toString(),
            params.toChainId,
          );

          // Step 1: Fire steps list + intent after delay
          const t1 = setTimeout(() => {
            onEvent?.({
              name: NEXUS_EVENTS.STEPS_LIST,
              args: [
                { type: "INTENT_HASH_SIGNED", typeID: "INTENT_HASH_SIGNED" },
              ],
            });

            const hookData: OnIntentHookData = {
              allow: () => {
                // Step 2: Fire completion events
                const t2 = setTimeout(() => {
                  onEvent?.({
                    name: NEXUS_EVENTS.STEP_COMPLETE,
                    args: {
                      type: "INTENT_HASH_SIGNED",
                      typeID: "INTENT_HASH_SIGNED",
                      completed: true,
                      data: generateMockTxHash(),
                    },
                  });
                  resolve({
                    explorerUrl: `https://explorer.nexus.avail.so/intent/${Date.now()}`,
                  });
                }, 3000);
                timerIds.current.push(t2);
              },
              deny: () => reject(new Error("Transaction denied by user")),
              refresh: async () => mockIntent,
              intent: mockIntent,
            } as OnIntentHookData;

            // Populate the ref and call provider hook
            intent.current = hookData;
            intentHookCb.current?.(hookData);
          }, 1500);
          timerIds.current.push(t1);
        });
      },

      // --- Mock bridgeAndTransfer() ---
      bridgeAndTransfer: (
        params: { token: string; amount: bigint; toChainId: number },
        options?: {
          onEvent?: (event: { name: string; args: unknown }) => void;
        },
      ) => {
        // Same flow as bridge
        return sdk.bridge(params, options);
      },

      // --- Mock swapWithExactIn() ---
      swapWithExactIn: (
        params: {
          fromTokenAddress: string;
          fromChainId: number;
          toTokenAddress: string;
          toChainId: number;
          fromAmount: bigint;
        },
        options?: {
          onEvent?: (event: { name: string; args: unknown }) => void;
        },
      ) => {
        return new Promise((resolve, reject) => {
          const onEvent = options?.onEvent;

          const t1 = setTimeout(() => {
            const mockSwapData = {
              allow: () => {
                // Fire swap step events
                const t2 = setTimeout(() => {
                  onEvent?.({
                    name: NEXUS_EVENTS.SWAP_STEP_COMPLETE,
                    args: {
                      type: "SOURCE_SWAP_HASH",
                      completed: true,
                      data: {
                        explorerURL: `https://etherscan.io/tx/${generateMockTxHash()}`,
                      },
                    },
                  });

                  const t3 = setTimeout(() => {
                    onEvent?.({
                      name: NEXUS_EVENTS.SWAP_STEP_COMPLETE,
                      args: {
                        type: "DESTINATION_SWAP_HASH",
                        completed: true,
                        data: {
                          explorerURL: `https://basescan.org/tx/${generateMockTxHash()}`,
                        },
                      },
                    });
                    resolve({
                      sourceSwaps: [],
                      explorerURL: `https://explorer.nexus.avail.so/swap/${Date.now()}`,
                    });
                  }, 2000);
                  timerIds.current.push(t3);
                }, 2000);
                timerIds.current.push(t2);
              },
              deny: () => reject(new Error("Swap denied")),
              refresh: async () => null,
              intent: {
                sources: [],
                destination: {
                  amount: (Number(params.fromAmount) / 10 ** 6).toFixed(2),
                  chain: { id: params.toChainId, name: "Base" },
                  token: { symbol: "USDC", decimals: 6 },
                },
              },
            } as unknown as OnSwapIntentHookData;

            swapIntent.current = mockSwapData;
            swapIntentHookCb.current?.(mockSwapData);
          }, 1500);
          timerIds.current.push(t1);
        });
      },

      // Mock swapWithExactOut (same behavior)
      swapWithExactOut: (
        params: Record<string, unknown>,
        options?: {
          onEvent?: (event: { name: string; args: unknown }) => void;
        },
      ) => {
        return sdk.swapWithExactIn(
          params as Parameters<typeof sdk.swapWithExactIn>[0],
          options,
        );
      },

      // No-ops
      initialize: async () => {},
      deinit: async () => {},
      execute: async () => ({}),
      simulateBridge: async () => ({}),
      simulateBridgeAndTransfer: async () => ({}),
      simulateExecute: async () => ({}),
      bridgeAndExecute: async () => ({}),
      simulateBridgeAndExecute: async () => ({}),
      getSwapSupportedChains: () => swapSupportedChains,
    };
    return sdk;
  }, [mockBalance]);

  const getFiatValue = useCallback((amount: number, token: string) => {
    const rate = MOCK_EXCHANGE_RATE[token.toUpperCase()] ?? 1;
    return rate * amount;
  }, []);

  const contextValue = useMemo(
    () => ({
      nexusSDK: mockSdk,
      bridgableBalance: mockBalance,
      swapBalance: mockBalance,
      intent,
      allowance,
      swapIntent,
      exchangeRate: MOCK_EXCHANGE_RATE,
      supportedChainsAndTokens: supportedChains,
      swapSupportedChainsAndTokens: swapSupportedChains,
      network: "mainnet" as const,
      loading: false,
      handleInit: async () => {},
      fetchBridgableBalance: async () => {},
      fetchSwapBalance: async () => {},
      getFiatValue,
      initializeNexus: async () => {},
      deinitializeNexus: async () => {},
      attachEventHooks: () => {},
    }),
    [mockSdk, mockBalance, getFiatValue],
  );

  return (
    <NexusContext.Provider value={contextValue}>
      {children}
    </NexusContext.Provider>
  );
};

export default MockNexusProvider;
