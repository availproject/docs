import {
  type BridgeStepType,
  NEXUS_EVENTS,
  type NexusNetwork,
  type NexusSDK,
  type OnAllowanceHookData,
  type OnIntentHookData,
  SUPPORTED_CHAINS,
  type SUPPORTED_CHAINS_IDS,
  type SUPPORTED_TOKENS,
  type UserAsset,
} from "@avail-project/nexus-core";
import {
  type RefObject,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { type Address, isAddress } from "viem";
import {
  type TransactionStatus,
  useNexusError,
  usePolling,
  useStopwatch,
  useTransactionSteps,
} from "../../common";

export interface FastBridgeState {
  chain: SUPPORTED_CHAINS_IDS;
  token: SUPPORTED_TOKENS;
  amount?: string;
  recipient?: `0x${string}`;
}

interface UseBridgeProps {
  network: NexusNetwork;
  connectedAddress: Address;
  nexusSDK: NexusSDK | null;
  intent: RefObject<OnIntentHookData | null>;
  allowance: RefObject<OnAllowanceHookData | null>;
  bridgableBalance: UserAsset[] | null;
  prefill?: {
    token: string;
    chainId: number;
    amount?: string;
    recipient?: Address;
  };
  onComplete?: () => void;
  onStart?: () => void;
  onError?: (message: string) => void;
  fetchBalance: () => Promise<void>;
}

type BridgeState = {
  inputs: FastBridgeState;
  status: TransactionStatus;
};

type Action =
  | { type: "setInputs"; payload: Partial<FastBridgeState> }
  | { type: "resetInputs" }
  | { type: "setStatus"; payload: TransactionStatus };

const buildInitialInputs = (
  network: NexusNetwork,
  connectedAddress: Address,
  prefill?: {
    token: string;
    chainId: number;
    amount?: string;
    recipient?: Address;
  },
): FastBridgeState => {
  return {
    chain:
      (prefill?.chainId as SUPPORTED_CHAINS_IDS) ??
      (network === "testnet"
        ? SUPPORTED_CHAINS.SEPOLIA
        : SUPPORTED_CHAINS.ETHEREUM),
    token: (prefill?.token as SUPPORTED_TOKENS) ?? "USDC",
    amount: prefill?.amount ?? undefined,
    recipient: (prefill?.recipient as `0x${string}`) ?? connectedAddress,
  };
};

const useBridge = ({
  network,
  connectedAddress,
  nexusSDK,
  intent,
  bridgableBalance,
  prefill,
  onComplete,
  onStart,
  onError,
  fetchBalance,
  allowance,
}: UseBridgeProps) => {
  const handleNexusError = useNexusError();
  const initialState: BridgeState = {
    inputs: buildInitialInputs(network, connectedAddress, prefill),
    status: "idle",
  };
  function reducer(state: BridgeState, action: Action): BridgeState {
    switch (action.type) {
      case "setInputs":
        return { ...state, inputs: { ...state.inputs, ...action.payload } };
      case "resetInputs":
        return {
          ...state,
          inputs: buildInitialInputs(network, connectedAddress, prefill),
        };
      case "setStatus":
        return { ...state, status: action.payload };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputs = state.inputs;
  const setInputs = (next: FastBridgeState | Partial<FastBridgeState>) => {
    dispatch({ type: "setInputs", payload: next as Partial<FastBridgeState> });
  };

  const loading = state.status === "executing";
  const [refreshing, setRefreshing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [lastExplorerUrl, setLastExplorerUrl] = useState<string>("");
  const commitLockRef = useRef<boolean>(false);
  const {
    steps,
    onStepsList,
    onStepComplete,
    reset: resetSteps,
  } = useTransactionSteps<BridgeStepType>();

  const areInputsValid = useMemo(() => {
    const hasToken = inputs?.token !== undefined && inputs?.token !== null;
    const hasChain = inputs?.chain !== undefined && inputs?.chain !== null;
    const hasAmount = Boolean(inputs?.amount) && Number(inputs?.amount) > 0;
    const hasValidrecipient =
      Boolean(inputs?.recipient) && isAddress(inputs?.recipient as string);
    return hasToken && hasChain && hasAmount && hasValidrecipient;
  }, [inputs]);

  const handleTransaction = async () => {
    if (
      !inputs?.amount ||
      !inputs?.recipient ||
      !inputs?.chain ||
      !inputs?.token
    ) {
      console.error("Missing required inputs");
      return;
    }
    dispatch({ type: "setStatus", payload: "executing" });
    setTxError(null);
    onStart?.();
    setLastExplorerUrl("");

    try {
      if (!nexusSDK) {
        throw new Error("Nexus SDK not initialized");
      }
      console.log("INPUTS", inputs);

      const formattedAmount = nexusSDK.convertTokenReadableAmountToBigInt(
        inputs?.amount,
        inputs?.token,
        inputs?.chain,
      );

      console.log("FORMATTED INPUTS", {
        token: inputs?.token,
        amount: formattedAmount,
        toChainId: inputs?.chain,
        recipient: inputs?.recipient ?? connectedAddress,
      });

      const bridgeTxn = await nexusSDK.bridge(
        {
          token: inputs?.token,
          amount: formattedAmount,
          toChainId: inputs?.chain,
          recipient: inputs?.recipient ?? connectedAddress,
        },
        {
          onEvent: (event) => {
            if (event.name === NEXUS_EVENTS.STEPS_LIST) {
              const list = Array.isArray(event.args) ? event.args : [];
              onStepsList(list);
            }
            if (event.name === NEXUS_EVENTS.STEP_COMPLETE) {
              if (event.args.type === "INTENT_HASH_SIGNED") {
                stopwatch.start();
              }
              onStepComplete(event.args);
            }
          },
        },
      );
      if (!bridgeTxn) {
        throw new Error("Transaction rejected by user");
      }
      if (bridgeTxn) {
        setLastExplorerUrl(bridgeTxn.explorerUrl);
        await onSuccess();
      }
    } catch (error) {
      const { message } = handleNexusError(error);
      intent.current?.deny();
      intent.current = null;
      allowance.current = null;
      setTxError(message);
      onError?.(message);
      setIsDialogOpen(false);
      dispatch({ type: "setStatus", payload: "error" });
    }
  };

  const onSuccess = async () => {
    // Close dialog and stop timer on success
    stopwatch.stop();
    dispatch({ type: "setStatus", payload: "success" });
    onComplete?.();
    intent.current = null;
    allowance.current = null;
    dispatch({ type: "resetInputs" });
    setRefreshing(false);
    await fetchBalance();
  };

  const filteredBridgableBalance = useMemo(() => {
    return bridgableBalance?.find((bal) => bal?.symbol === inputs?.token);
  }, [bridgableBalance, inputs?.token]);

  const refreshIntent = async () => {
    setRefreshing(true);
    try {
      await intent.current?.refresh([]);
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const reset = () => {
    intent.current?.deny();
    intent.current = null;
    allowance.current = null;
    dispatch({ type: "resetInputs" });
    dispatch({ type: "setStatus", payload: "idle" });
    setRefreshing(false);
    stopwatch.stop();
    stopwatch.reset();
    resetSteps();
  };

  const startTransaction = () => {
    // Reset timer for a fresh run
    intent.current?.allow();
    setIsDialogOpen(true);
    setTxError(null);
  };

  const commitAmount = async () => {
    if (commitLockRef.current) return;
    if (!intent.current || loading || txError || !areInputsValid) return;
    commitLockRef.current = true;
    try {
      await handleTransaction();
    } finally {
      commitLockRef.current = false;
    }
  };

  usePolling(Boolean(intent.current) && !isDialogOpen, refreshIntent, 15000);

  const stopwatch = useStopwatch({ intervalMs: 100 });

  useEffect(() => {
    if (intent.current) {
      intent.current.deny();
      intent.current = null;
    }
  }, [intent]);

  useEffect(() => {
    if (!isDialogOpen) {
      stopwatch.stop();
      stopwatch.reset();
    }
  }, [isDialogOpen, stopwatch]);

  useEffect(() => {
    if (txError) {
      setTxError(null);
    }
  }, [txError]);

  return {
    inputs,
    setInputs,
    timer: stopwatch.seconds,
    setIsDialogOpen,
    setTxError,
    loading,
    refreshing,
    isDialogOpen,
    txError,
    handleTransaction,
    reset,
    filteredBridgableBalance,
    startTransaction,
    commitAmount,
    lastExplorerUrl,
    steps,
    status: state.status,
  };
};

export default useBridge;
