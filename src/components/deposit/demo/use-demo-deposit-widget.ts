"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AssetSelectionState,
  DepositInputs,
  DepositWidgetContextValue,
  NavigationDirection,
  TransactionStatus,
  WidgetStep,
} from "../types";
import {
  createMockSteps,
  generateMockActiveIntent,
  generateMockConfirmation,
  generateMockFeeBreakdown,
  generateMockSourceSwaps,
  generateMockSwapBalance,
  generateMockTxHash,
  getAllChainIds,
  MOCK_DESTINATION,
} from "./mock-data";

const STEP_HISTORY: Record<WidgetStep, WidgetStep | null> = {
  amount: null,
  confirmation: "amount",
  "transaction-status": null,
  "transaction-complete": null,
  "transaction-failed": null,
  "asset-selection": "amount",
};

/**
 * Demo version of useDepositWidget that uses mock data and
 * simulated timing instead of a real wallet/SDK connection.
 */
export function useDemoDepositWidget(): DepositWidgetContextValue {
  // Core state
  const [step, setStepState] = useState<WidgetStep>("amount");
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [inputs, setInputsState] = useState<DepositInputs>({
    amount: undefined,
    selectedToken: "USDC",
  });
  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const [simulationLoading, setSimulationLoading] = useState(false);

  // Mock data state
  const [swapBalance, setSwapBalance] = useState(() =>
    generateMockSwapBalance(),
  );
  const [assetSelection, setAssetSelectionState] =
    useState<AssetSelectionState>(() => ({
      selectedChainIds: getAllChainIds(swapBalance),
      filter: "all" as const,
      expandedTokens: new Set<string>(),
    }));

  // Transaction flow state
  // biome-ignore lint/suspicious/noExplicitAny: mock intent shape matches accessed fields only
  const [activeIntent, setActiveIntent] = useState<any>(null);
  const [confirmationDetails, setConfirmationDetails] =
    useState<DepositWidgetContextValue["confirmationDetails"]>(null);
  const [feeBreakdown, setFeeBreakdown] = useState(generateMockFeeBreakdown());
  const [steps, setSteps] = useState(createMockSteps());
  const [sourceSwaps, setSourceSwaps] = useState<
    DepositWidgetContextValue["sourceSwaps"]
  >([]);
  const [explorerUrls, setExplorerUrls] = useState({
    sourceExplorerUrl: null as string | null,
    destinationExplorerUrl: null as string | null,
  });
  const [depositTxHash, setDepositTxHash] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [skipSwap] = useState(false);

  // Brief initial loading skeleton
  const [initialLoading, setInitialLoading] = useState(true);

  // Timer refs for cleanup
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup all timers
  const clearAllTimers = useCallback(() => {
    for (const id of timerIds.current) clearTimeout(id);
    timerIds.current = [];
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => clearAllTimers, [clearAllTimers]);

  // Brief skeleton on mount
  useEffect(() => {
    const id = setTimeout(() => setInitialLoading(false), 500);
    return () => clearTimeout(id);
  }, []);

  // Computed values
  const totalBalance = swapBalance
    ? {
        balance: swapBalance.reduce((acc, b) => acc + parseFloat(b.balance), 0),
        usdBalance: swapBalance.reduce((acc, b) => acc + b.balanceInFiat, 0),
      }
    : undefined;

  const totalSelectedBalance = swapBalance
    ? swapBalance.reduce((sum, asset) => {
        for (const b of asset.breakdown ?? []) {
          const key = `${b.contractAddress}-${b.chain?.id}`;
          if (assetSelection.selectedChainIds.has(key)) {
            sum += b.balanceInFiat;
          }
        }
        return sum;
      }, 0)
    : 0;

  // Derived booleans
  const isProcessing = status === "executing";
  const isSuccess = status === "success";
  const isError = status === "error";

  // --- Actions ---

  const setStep = useCallback(
    (newStep: WidgetStep, direction: NavigationDirection) => {
      setNavigationDirection(direction);
      setStepState(newStep);
    },
    [],
  );

  const setInputs = useCallback((next: Partial<DepositInputs>) => {
    setInputsState((prev) => ({ ...prev, ...next }));
  }, []);

  const setAssetSelection = useCallback(
    (selection: Partial<AssetSelectionState>) => {
      setAssetSelectionState((prev) => ({ ...prev, ...selection }));
    },
    [],
  );

  // --- Core flow handlers (declared before goToStep which depends on them) ---

  const handleAmountContinue = useCallback(
    (totalAmountUsd: number) => {
      clearAllTimers();
      setInputsState((prev) => ({
        ...prev,
        amount: totalAmountUsd.toString(),
      }));
      setSimulationLoading(true);
      setStatus("simulation-loading");
      setStep("confirmation", "forward");

      // Simulate quote fetching
      const id = setTimeout(() => {
        const details = generateMockConfirmation(totalAmountUsd);
        const intent = generateMockActiveIntent(totalAmountUsd);
        setConfirmationDetails(details);
        setActiveIntent(intent);
        setFeeBreakdown(generateMockFeeBreakdown());
        setSimulationLoading(false);
        setStatus("previewing");
      }, 1500);
      timerIds.current.push(id);
    },
    [clearAllTimers, setStep],
  );

  const goToStep = useCallback(
    (newStep: WidgetStep) => {
      if (step === "amount" && newStep === "confirmation") {
        const amount = inputs.amount;
        if (amount) {
          const totalAmountUsd = parseFloat(amount.replace(/,/g, ""));
          if (totalAmountUsd > 0) {
            handleAmountContinue(totalAmountUsd);
            return;
          }
        }
      }
      setStep(newStep, "forward");
    },
    [step, inputs.amount, handleAmountContinue, setStep],
  );

  const goBack = useCallback(() => {
    const previousStep = STEP_HISTORY[step];
    if (previousStep) {
      clearAllTimers();
      setTxError(null);
      setActiveIntent(null);
      setConfirmationDetails(null);
      setSimulationLoading(false);
      setStatus("idle");
      setTimer(0);
      setStep(previousStep, "backward");
    }
  }, [step, clearAllTimers, setStep]);

  const reset = useCallback(() => {
    clearAllTimers();
    const newBalance = generateMockSwapBalance();
    setSwapBalance(newBalance);
    setAssetSelectionState({
      selectedChainIds: getAllChainIds(newBalance),
      filter: "all",
      expandedTokens: new Set(),
    });
    setStepState("amount");
    setStatus("idle");
    setInputsState({ amount: undefined, selectedToken: "USDC" });
    setNavigationDirection(null);
    setTxError(null);
    setSimulationLoading(false);
    setActiveIntent(null);
    setConfirmationDetails(null);
    setFeeBreakdown(generateMockFeeBreakdown());
    setSteps(createMockSteps());
    setSourceSwaps([]);
    setExplorerUrls({
      sourceExplorerUrl: null,
      destinationExplorerUrl: null,
    });
    setDepositTxHash(null);
    setTimer(0);
  }, [clearAllTimers]);

  const handleConfirmOrder = useCallback(() => {
    if (!activeIntent) return;
    clearAllTimers();

    setStatus("executing");
    setStep("transaction-status", "forward");
    setTimer(0);

    // Start timer
    const startTime = Date.now();
    timerInterval.current = setInterval(() => {
      setTimer((Date.now() - startTime) / 1000);
    }, 100);

    // Step 1: Intent Verification (2s)
    const t1 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) => (s.id === 1 ? { ...s, completed: true } : s)),
      );
    }, 2000);

    // Step 2: Collecting on Source (4s)
    const t2 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) => (s.id === 2 ? { ...s, completed: true } : s)),
      );
    }, 4000);

    // Step 3: Deposit Transaction complete (6s)
    const t3 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) => (s.id === 3 ? { ...s, completed: true } : s)),
      );

      // Transition to complete
      const txHash = generateMockTxHash();
      const mockSourceSwaps = generateMockSourceSwaps();

      setDepositTxHash(txHash);
      setSourceSwaps(mockSourceSwaps);
      setExplorerUrls({
        sourceExplorerUrl: mockSourceSwaps[0]?.explorerUrl ?? null,
        destinationExplorerUrl: `https://basescan.org/tx/${txHash}`,
      });
      setStatus("success");

      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }

      // Small delay before showing complete screen
      const t4 = setTimeout(() => {
        setStepState("transaction-complete");
        setNavigationDirection("forward");
      }, 500);
      timerIds.current.push(t4);
    }, 6000);

    timerIds.current.push(t1, t2, t3);
  }, [activeIntent, clearAllTimers, setStep]);

  const startTransaction = useCallback(() => {}, []);

  return {
    step,
    inputs,
    setInputs,
    status,
    explorerUrls,
    sourceSwaps,
    nexusIntentUrl: null,
    depositTxHash,
    destination: MOCK_DESTINATION,
    isProcessing,
    isSuccess,
    isError,
    txError,
    setTxError,
    goToStep,
    goBack,
    reset,
    navigationDirection,
    startTransaction,
    lastResult: null,
    assetSelection,
    setAssetSelection,
    swapBalance: initialLoading ? null : swapBalance,
    activeIntent,
    confirmationDetails,
    feeBreakdown,
    steps,
    timer,
    handleConfirmOrder,
    handleAmountContinue,
    totalSelectedBalance,
    skipSwap,
    simulationLoading,
    totalBalance: initialLoading ? undefined : totalBalance,
  };
}
