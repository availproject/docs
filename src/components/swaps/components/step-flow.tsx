import { type FC, Fragment, memo } from "react";
import { TokenIcon } from "./token-icon";
import { StackedTokenIcons } from "./stacked-token-icons";
import { cn } from "@/lib/utils";
import { Atom, CircleCheck, SquareArrowOutUpRight } from "lucide-react";
import { type DisplayStep } from "./transaction-progress";

interface TokenSource {
  tokenLogo: string;
  chainLogo: string;
  symbol: string;
}

interface StepFlowProps {
  steps: DisplayStep[];
  currentIndex: number;
  totalSteps: number;
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
  allCompleted: boolean;
  hasMultipleSources?: boolean;
  sources?: TokenSource[];
}

interface StepItemProps {
  step: DisplayStep;
  symbol: string;
  logos: {
    token: string;
    chain: string;
  };
  explorerUrl: string | null;
  isCompleted: boolean;
  isCurrent: boolean;
  totalSteps: number;
  index: number;
  allCompleted: boolean;
  hasMultipleSources?: boolean;
  sources?: TokenSource[];
}

const StepItem: FC<StepItemProps> = memo(
  ({
    step,
    isCompleted,
    isCurrent,
    logos,
    symbol,
    totalSteps,
    index,
    explorerUrl,
    allCompleted,
    hasMultipleSources,
    sources,
  }) => {
    const isSecondLast = index === totalSteps - 2;

    // Determine opacity based on step state
    const getOpacity = () => {
      if (allCompleted) return "opacity-100";
      if (isCompleted) return "opacity-100";
      if (isCurrent) return "opacity-100";
      return "opacity-50";
    };

    // Render the appropriate icon based on state
    const renderIcon = () => {
      if (isSecondLast) {
        return <Atom className="size-4 animate-spin" />;
      }
      if (hasMultipleSources && sources && sources.length > 0) {
        return <StackedTokenIcons sources={sources} size="sm" maxDisplay={3} />;
      }
      return (
        <TokenIcon
          size="sm"
          symbol={symbol}
          chainLogo={logos.chain}
          tokenLogo={logos.token}
          className="w-full h-full object-cover"
        />
      );
    };

    return (
      <div
        className={cn(
          "flex gap-x-4 items-center rounded-lg w-full py-1 transition-opacity duration-300",
          getOpacity()
        )}
      >
        {/* Left Indicator */}
        {isCurrent ? (
          <div className="rounded-full relative">
            <div
              className={cn(
                "rounded-full flex items-center justify-center ring-2 ring-chart-1 ring-offset-2 ring-offset-background transition-all duration-300 animate-pulse",
                hasMultipleSources ? "min-w-max px-1" : "size-6"
              )}
            >
              {renderIcon()}
            </div>
          </div>
        ) : isCompleted ? (
          <div className="size-6 flex items-center justify-center rounded-full bg-chart-1/10">
            <span className="size-2 rounded-full bg-chart-1" />
          </div>
        ) : (
          <div className="size-6 flex items-center justify-center rounded-full">
            <span className="size-2 rounded-full bg-muted-foreground/50" />
          </div>
        )}

        {/* Content */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-y-0.5">
            <h3
              className={cn(
                "font-medium text-sm transition-colors duration-300",
                isCompleted || isCurrent
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </h3>
            {explorerUrl &&
              isCompleted &&
              (isSecondLast || index === totalSteps - 1) && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-x-1 transition-colors"
                >
                  <SquareArrowOutUpRight className="size-3" /> View Transaction
                </a>
              )}
          </div>

          {/* Right Actions */}
          {isCurrent && !isCompleted && (
            <p className="text-xs text-muted-foreground">
              Step {index + 1} of {totalSteps}
            </p>
          )}
          {isCompleted && <CircleCheck className="size-5 text-chart-1" />}
        </div>
      </div>
    );
  }
);

StepItem.displayName = "StepItem";

export const StepFlow: FC<StepFlowProps> = memo(
  ({
    steps,
    currentIndex,
    totalSteps,
    sourceSymbol,
    destinationSymbol,
    sourceLogos,
    destinationLogos,
    explorerUrls,
    allCompleted,
    hasMultipleSources,
    sources,
  }) => {
    return (
      <div className="flex flex-col gap-y-0 w-full">
        {steps.map((step, index) => {
          const isCompleted = !!step.completed;
          const isCurrent =
            currentIndex === -1 ? false : index === currentIndex;
          const isLast = index === steps.length - 1;
          const url = isLast
            ? explorerUrls.destinationExplorerUrl
            : index === steps.length - 2
            ? explorerUrls.sourceExplorerUrl
            : null;

          // For source steps (not the last step), pass multiple sources info
          const isSourceStep = !isLast;
          const showMultipleSources = isSourceStep && hasMultipleSources;

          return (
            <Fragment key={step.id}>
              <StepItem
                step={step}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                index={index}
                symbol={isLast ? destinationSymbol : sourceSymbol}
                logos={isLast ? destinationLogos : sourceLogos}
                totalSteps={totalSteps}
                explorerUrl={url}
                allCompleted={allCompleted}
                hasMultipleSources={showMultipleSources}
                sources={showMultipleSources ? sources : undefined}
              />

              {!isLast && (
                <div className="flex w-max ml-[11px]">
                  <div
                    className={cn(
                      "w-0.5 h-5 border border-dashed transition-colors duration-300",
                      isCompleted ? "border-chart-1/50" : "border-border"
                    )}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }
);

StepFlow.displayName = "StepFlow";
