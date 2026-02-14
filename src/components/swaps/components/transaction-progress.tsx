import { type FC, useMemo } from "react";
import {
  type BridgeStepType,
  type SwapStepType,
} from "@avail-project/nexus-core";
import { StepFlow } from "./step-flow";

export type DisplayStep = { id: string; label: string; completed: boolean };
type ProgressStep = BridgeStepType | SwapStepType;

interface TokenSource {
  tokenLogo: string;
  chainLogo: string;
  symbol: string;
}

interface TransactionProgressProps {
  steps: Array<{ id: number; completed: boolean; step: ProgressStep }>;
  explorerUrls: {
    sourceExplorerUrl: string | null;
    destinationExplorerUrl: string | null;
  };
  sourceSymbol: string;
  destinationSymbol: string;
  sourceLogos: {
    token: string;
    chain: string;
  };
  destinationLogos: {
    token: string;
    chain: string;
  };
  hasMultipleSources?: boolean;
  sources?: TokenSource[];
}

const STEP_TYPES = {
  INTENT_VERIFICATION: ["CREATE_PERMIT_FOR_SOURCE_SWAP"],
  SOURCE_STEP_TYPES: [
    "CREATE_PERMIT_EOA_TO_EPHEMERAL",
    "CREATE_PERMIT_FOR_SOURCE_SWAP",
    "SOURCE_SWAP_BATCH_TX",
    "SOURCE_SWAP_HASH",
  ],
  SOURCE_TRANSACTION: ["SOURCE_SWAP_HASH", "SOURCE_SWAP_BATCH_TX"],
  DESTINATION_STEP_TYPES: [
    "DESTINATION_SWAP_BATCH_TX",
    "DESTINATION_SWAP_HASH",
    "SWAP_COMPLETE",
  ],
  TRANSACTION_COMPLETE: ["SWAP_COMPLETE"],
};

const TransactionProgress: FC<TransactionProgressProps> = ({
  steps,
  explorerUrls,
  sourceSymbol,
  destinationSymbol,
  sourceLogos,
  destinationLogos,
  hasMultipleSources,
  sources,
}) => {
  const { effectiveSteps, currentIndex, allCompleted } = useMemo(() => {
    const completedTypes = new Set<string | undefined>(
      steps?.filter((s) => s?.completed).map((s) => s?.step?.type)
    );
    // Consider only steps that were actually emitted by the SDK (ignore pre-seeded placeholders)
    const eventfulTypes = new Set<string | undefined>(
      steps
        ?.filter((s) => {
          const st = s?.step ?? {};
          return (
            "explorerURL" in st || "chain" in st || "completed" in st // present when event args were merged into step
          );
        })
        .map((s) => s?.step?.type)
    );
    const hasAny = (types: string[]) =>
      types.some((t) => completedTypes.has(t));
    const sawAny = (types: string[]) => types.some((t) => eventfulTypes.has(t));

    const intentVerified = hasAny(["DETERMINING_SWAP", "SWAP_START"]);

    // If the flow does not include SOURCE_* steps, consider it implicitly collected

    const collectedOnSources =
      (sawAny(STEP_TYPES.SOURCE_STEP_TYPES) &&
        hasAny(STEP_TYPES.SOURCE_TRANSACTION)) ||
      (!sawAny(STEP_TYPES.SOURCE_STEP_TYPES) &&
        hasAny(STEP_TYPES.DESTINATION_STEP_TYPES));

    const filledOnDestination = hasAny(STEP_TYPES.DESTINATION_STEP_TYPES);

    const displaySteps: DisplayStep[] = [
      { id: "intent", label: "Intent verified", completed: intentVerified },
      {
        id: "collected",
        label: "Collected on sources",
        completed: collectedOnSources,
      },
      {
        id: "filled",
        label: "Filled on destination",
        completed: filledOnDestination,
      },
    ];

    // Mark overall completion ONLY when the SDK reports SWAP_COMPLETE
    const done = hasAny(STEP_TYPES.TRANSACTION_COMPLETE);
    const current = displaySteps.findIndex((st) => !st.completed);
    return {
      effectiveSteps: displaySteps,
      currentIndex: current,
      allCompleted: done,
    };
  }, [steps]);

  return (
    <div className="w-full flex flex-col items-start">
      <StepFlow
        steps={effectiveSteps}
        currentIndex={currentIndex}
        totalSteps={effectiveSteps.length}
        sourceLogos={sourceLogos}
        sourceSymbol={sourceSymbol}
        destinationLogos={destinationLogos}
        destinationSymbol={destinationSymbol}
        explorerUrls={explorerUrls}
        allCompleted={allCompleted}
        hasMultipleSources={hasMultipleSources}
        sources={sources}
      />
    </div>
  );
};

export default TransactionProgress;
