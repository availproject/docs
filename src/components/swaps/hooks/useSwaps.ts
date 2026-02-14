import { type RefObject, useEffect, useMemo, useReducer } from "react";
import {
  NexusSDK,
  type SUPPORTED_CHAINS_IDS,
  type ExactInSwapInput,
  type ExactOutSwapInput,
  NEXUS_EVENTS,
  type SwapStepType,
  type OnSwapIntentHookData,
  type UserAsset,
} from "@avail-project/nexus-core";
import {
  useTransactionSteps,
  SWAP_EXPECTED_STEPS,
  useNexusError,
  useDebouncedCallback,
  usePolling,
} from "../../common";

export type SourceTokenInfo = {
  contractAddress: `0x${string}`;
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
  balance?: string;
  balanceInFiat?: string;
  chainId?: number;
};

export type DestinationTokenInfo = {
  tokenAddress: `0x${string}`;
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
  chainId?: number;
  balance?: string;
  balanceInFiat?: string;
};

export type TransactionStatus =
  | "idle"
  | "simulating"
  | "swapping"
  | "success"
  | "error";

export type SwapMode = "exactIn" | "exactOut";

export interface SwapInputs {
  fromChainID?: SUPPORTED_CHAINS_IDS;
  fromToken?: SourceTokenInfo;
  fromAmount?: string;
  toChainID?: SUPPORTED_CHAINS_IDS;
  toToken?: DestinationTokenInfo;
  toAmount?: string;
}

export type SwapState = {
  inputs: SwapInputs;
  swapMode: SwapMode;
  status: TransactionStatus;
  error: string | null;
  explorerUrls: {
    sourceExplorerUrl: string | null;
    destinationExplorerUrl: string | null;
  };
};

type Action =
  | { type: "setInputs"; payload: Partial<SwapInputs> }
  | { type: "setStatus"; payload: TransactionStatus }
  | { type: "setError"; payload: string | null }
  | { type: "setSwapMode"; payload: SwapMode }
  | {
      type: "setExplorerUrls";
      payload: Partial<SwapState["explorerUrls"]>;
    }
  | { type: "reset" };

const initialState: SwapState = {
  inputs: {
    fromToken: undefined,
    toToken: undefined,
    fromAmount: undefined,
    toAmount: undefined,
    fromChainID: undefined,
    toChainID: undefined,
  },
  swapMode: "exactIn",
  status: "idle",
  error: null,
  explorerUrls: {
    sourceExplorerUrl: null,
    destinationExplorerUrl: null,
  },
};

function reducer(state: SwapState, action: Action): SwapState {
  switch (action.type) {
    case "setInputs": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ...action.payload,
        },
      };
    }
    case "setStatus":
      return { ...state, status: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "setSwapMode":
      return { ...state, swapMode: action.payload };
    case "setExplorerUrls":
      return {
        ...state,
        explorerUrls: { ...state.explorerUrls, ...action.payload },
      };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
}

interface UseSwapsProps {
  nexusSDK: NexusSDK | null;
  swapIntent: RefObject<OnSwapIntentHookData | null>;
  swapBalance: UserAsset[] | null;
  fetchBalance: () => Promise<void>;
  onComplete?: (amount?: string) => void;
  onStart?: () => void;
  onError?: (message: string) => void;
}

const useSwaps = ({
  nexusSDK,
  swapIntent,
  swapBalance,
  fetchBalance,
  onComplete,
  onStart,
  onError,
}: UseSwapsProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    steps,
    seed,
    onStepComplete,
    reset: resetSteps,
  } = useTransactionSteps<SwapStepType>();

  // Validation for exact-in mode
  const areExactInInputsValid = useMemo(() => {
    return (
      state?.inputs?.fromChainID !== undefined &&
      state?.inputs?.toChainID !== undefined &&
      state?.inputs?.fromToken &&
      state?.inputs?.toToken &&
      state?.inputs?.fromAmount &&
      Number(state.inputs.fromAmount) > 0
    );
  }, [state.inputs]);

  // Validation for exact-out mode
  const areExactOutInputsValid = useMemo(() => {
    return (
      state?.inputs?.toChainID !== undefined &&
      state?.inputs?.toToken &&
      state?.inputs?.toAmount &&
      Number(state.inputs.toAmount) > 0
    );
  }, [state.inputs]);

  // Combined validation based on current mode
  const areInputsValid = useMemo(() => {
    return state.swapMode === "exactIn"
      ? areExactInInputsValid
      : areExactOutInputsValid;
  }, [state.swapMode, areExactInInputsValid, areExactOutInputsValid]);

  const handleNexusError = useNexusError();

  // Event handler shared between exact-in and exact-out
  const handleSwapEvent = (event: { name: string; args: SwapStepType }) => {
    if (event.name === NEXUS_EVENTS.SWAP_STEP_COMPLETE) {
      const step = event.args;
      console.log("STEPS", event);
      if (step?.type === "SOURCE_SWAP_HASH" && step.explorerURL) {
        dispatch({
          type: "setExplorerUrls",
          payload: { sourceExplorerUrl: step.explorerURL },
        });
      }
      if (step?.type === "DESTINATION_SWAP_HASH" && step.explorerURL) {
        dispatch({
          type: "setExplorerUrls",
          payload: { destinationExplorerUrl: step.explorerURL },
        });
      }
      onStepComplete(step);
    }
  };

  const handleExactInSwap = async () => {
    if (
      !nexusSDK ||
      !areExactInInputsValid ||
      !state?.inputs?.fromToken ||
      !state?.inputs?.toToken ||
      !state?.inputs?.fromAmount ||
      !state?.inputs?.toChainID ||
      !state?.inputs?.fromChainID
    )
      return;

    const amountBigInt = nexusSDK.utils.parseUnits(
      state.inputs.fromAmount,
      state.inputs.fromToken.decimals
    );
    const swapInput: ExactInSwapInput = {
      from: [
        {
          chainId: state.inputs.fromChainID,
          amount: amountBigInt,
          tokenAddress: state.inputs.fromToken.contractAddress,
        },
      ],
      toChainId: state.inputs.toChainID,
      toTokenAddress: state.inputs.toToken.tokenAddress,
    };

    const result = await nexusSDK.swapWithExactIn(swapInput, {
      onEvent: (event) =>
        handleSwapEvent(event as { name: string; args: SwapStepType }),
    });

    if (!result?.success) {
      throw new Error(result?.error || "Swap failed");
    }
  };

  const handleExactOutSwap = async () => {
    if (
      !nexusSDK ||
      !areExactOutInputsValid ||
      !state?.inputs?.toToken ||
      !state?.inputs?.toAmount ||
      !state?.inputs?.toChainID
    )
      return;

    const amountBigInt = nexusSDK.utils.parseUnits(
      state.inputs.toAmount,
      state.inputs.toToken.decimals
    );
    const swapInput: ExactOutSwapInput = {
      toAmount: amountBigInt,
      toChainId: state.inputs.toChainID,
      toTokenAddress: state.inputs.toToken.tokenAddress,
    };

    const result = await nexusSDK.swapWithExactOut(swapInput, {
      onEvent: (event) =>
        handleSwapEvent(event as { name: string; args: SwapStepType }),
    });
    console.log("EXACT OUT RES", result);
    if (!result?.success) {
      throw new Error(result?.error || "Swap failed");
    }
  };

  const handleSwap = async () => {
    if (!nexusSDK || !areInputsValid) return;

    try {
      onStart?.();
      dispatch({ type: "setStatus", payload: "simulating" });
      seed(SWAP_EXPECTED_STEPS);

      if (state.swapMode === "exactIn") {
        await handleExactInSwap();
      } else {
        await handleExactOutSwap();
      }

      dispatch({ type: "setStatus", payload: "success" });
      onComplete?.(swapIntent.current?.intent?.destination?.amount);
      await fetchBalance();
    } catch (error) {
      const { message } = handleNexusError(error);
      dispatch({ type: "setStatus", payload: "error" });
      dispatch({ type: "setError", payload: message });
      onError?.(message);
      swapIntent.current = null;
    }
  };

  const debouncedSwapStart = useDebouncedCallback(handleSwap, 1200);

  const reset = () => {
    dispatch({ type: "reset" });
    resetSteps();
    swapIntent.current = null;
  };

  const availableBalance = useMemo(() => {
    if (
      !nexusSDK ||
      !swapBalance ||
      !state.inputs?.fromToken ||
      !state.inputs?.fromChainID
    )
      return undefined;
    return (
      swapBalance
        ?.find((token) => token.symbol === state.inputs?.fromToken?.symbol)
        ?.breakdown?.find(
          (chain) => chain.chain?.id === state.inputs?.fromChainID
        ) ?? undefined
    );
  }, [
    state.inputs?.fromToken,
    state.inputs?.fromChainID,
    swapBalance,
    nexusSDK,
  ]);

  const destinationBalance = useMemo(() => {
    if (
      !nexusSDK ||
      !swapBalance ||
      !state.inputs?.toToken ||
      !state.inputs?.toChainID
    )
      return undefined;
    return (
      swapBalance
        ?.find((token) => token.symbol === state?.inputs?.toToken?.symbol)
        ?.breakdown?.find(
          (chain) => chain.chain?.id === state?.inputs?.toChainID
        ) ?? undefined
    );
  }, [state?.inputs?.toToken, state?.inputs?.toChainID, swapBalance, nexusSDK]);

  const availableStables = useMemo(() => {
    if (!nexusSDK || !swapBalance) return [];
    const filteredToken = swapBalance?.filter((token) => {
      if (["USDT", "USDC", "ETH", "DAI", "WBTC"].includes(token.symbol)) {
        return token;
      }
    });
    return filteredToken ?? [];
  }, [swapBalance, nexusSDK]);

  const formatBalance = (
    balance?: string | number,
    symbol?: string,
    decimals?: number
  ) => {
    if (!balance || !symbol || !decimals) return undefined;
    return nexusSDK?.utils?.formatTokenBalance(balance, {
      symbol: symbol,
      decimals: decimals,
    });
  };

  useEffect(() => {
    if (!swapBalance) {
      fetchBalance();
    }
  }, [swapBalance]);

  useEffect(() => {
    // Check validity based on current swap mode
    const isValidForCurrentMode =
      state.swapMode === "exactIn"
        ? areExactInInputsValid &&
          state?.inputs?.fromAmount &&
          state?.inputs?.fromChainID &&
          state?.inputs?.fromToken &&
          state?.inputs?.toChainID &&
          state?.inputs?.toToken
        : areExactOutInputsValid &&
          state?.inputs?.toAmount &&
          state?.inputs?.toChainID &&
          state?.inputs?.toToken;

    if (!isValidForCurrentMode) {
      swapIntent.current?.deny();
      swapIntent.current = null;
      return;
    }
    if (state.status === "idle") {
      debouncedSwapStart();
    }
  }, [
    state.inputs,
    state.swapMode,
    areExactInInputsValid,
    areExactOutInputsValid,
    state.status,
  ]);

  const refreshSimulation = async () => {
    try {
      const updated = await swapIntent.current?.refresh();
      if (updated) {
        swapIntent.current!.intent = updated;
      }
    } catch (e) {
      console.error(e);
    }
  };

  usePolling(
    state.status === "simulating" && Boolean(swapIntent.current),
    async () => {
      await refreshSimulation();
    },
    15000
  );

  return {
    status: state.status,
    inputs: state.inputs,
    swapMode: state.swapMode,
    setSwapMode: (mode: SwapMode) =>
      dispatch({ type: "setSwapMode", payload: mode }),
    setStatus: (status: TransactionStatus) =>
      dispatch({ type: "setStatus", payload: status }),
    setInputs: (inputs: Partial<SwapInputs>) => {
      if (state.status === "error") {
        dispatch({ type: "setError", payload: null });
        dispatch({ type: "setStatus", payload: "idle" });
      }
      dispatch({ type: "setInputs", payload: inputs });
    },
    txError: state.error,
    setTxError: (error: string | null) =>
      dispatch({ type: "setError", payload: error }),
    availableBalance,
    availableStables,
    destinationBalance,
    formatBalance,
    steps,
    explorerUrls: state.explorerUrls,
    handleSwap,
    reset,
    areInputsValid,
  };
};

export default useSwaps;
