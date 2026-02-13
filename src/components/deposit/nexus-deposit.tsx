"use client";

import { useCallback, useState } from "react";
import { WidgetErrorBoundary } from "../common";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  AmountContainer,
  AssetSelectionContainer,
  ConfirmationContainer,
  TransactionCompleteContainer,
  TransactionFailedContainer,
  TransactionStatusContainer,
} from "./components";
import { useDepositWidget } from "./hooks/use-deposit-widget";
import type {
  DepositWidgetProps,
  NavigationDirection,
  WidgetStep,
} from "./types";
import { cn } from "./utils";

const ANIMATION_CLASSES: Record<NonNullable<NavigationDirection>, string> = {
  forward: "animate-slide-in-from-right",
  backward: "animate-slide-in-from-left",
};

const getAnimationClass = (direction: NavigationDirection): string =>
  direction ? ANIMATION_CLASSES[direction] : "";

type ScreenRenderer = (
  widget: ReturnType<typeof useDepositWidget>,
  heading?: string,
  onClose?: () => void,
) => React.ReactNode;

const SCREENS: Record<WidgetStep, ScreenRenderer> = {
  amount: (widget, heading, onClose) => (
    <AmountContainer widget={widget} heading={heading} onClose={onClose} />
  ),
  confirmation: (widget, heading, onClose) => (
    <ConfirmationContainer
      widget={widget}
      heading={heading}
      onClose={onClose}
    />
  ),
  "transaction-status": (widget, heading, onClose) => (
    <TransactionStatusContainer
      widget={widget}
      heading={heading}
      onClose={onClose}
    />
  ),
  "transaction-complete": (widget, heading, onClose) => (
    <TransactionCompleteContainer
      widget={widget}
      heading={heading}
      onClose={onClose}
    />
  ),
  "transaction-failed": (widget, heading, onClose) => (
    <TransactionFailedContainer
      widget={widget}
      heading={heading}
      onClose={onClose}
    />
  ),
  "asset-selection": (widget, _heading, onClose) => (
    <AssetSelectionContainer
      widget={widget}
      heading={"Pay using"}
      onClose={onClose}
    />
  ),
};

const NexusDeposit = ({
  heading = "Deposit USDC",
  embed = false,
  className,
  onClose,
  onSuccess,
  onError,
  executeDeposit,
  destination,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: DepositWidgetProps) => {
  const widget = useDepositWidget({
    executeDeposit,
    destination,
    onSuccess,
    onError,
  });
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Use controlled or uncontrolled open state
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
      if (!open) {
        onClose?.();
        widget.reset();
      }
    },
    [isControlled, onOpenChange, onClose, widget.reset],
  );

  const handleClose = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const animationClass = getAnimationClass(widget.navigationDirection);

  // Embed mode: render as inline Card
  if (embed) {
    return (
      <Card
        className={cn(
          "relative w-full max-w-md overflow-hidden transition-[height] duration-200 ease-out",
          className,
        )}
      >
        <WidgetErrorBoundary widgetName="Deposit" onReset={widget.reset}>
          <div key={widget.step} className={animationClass}>
            {SCREENS[widget.step](widget, heading)}
          </div>
        </WidgetErrorBoundary>
      </Card>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn("px-0 max-w-md!", className)}
        showCloseButton={false}
      >
        <WidgetErrorBoundary widgetName="Deposit" onReset={widget.reset}>
          <div
            key={widget.step}
            className={cn("flex flex-col gap-4", animationClass)}
          >
            {SCREENS[widget.step](widget, heading, handleClose)}
          </div>
        </WidgetErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};

export default NexusDeposit;

export { useDepositWidget } from "./hooks/use-deposit-widget";
// Re-export types and hooks for consumers
export type {
  AssetFilterType,
  AssetSelectionState,
  BaseDepositWidgetProps,
  DepositInputs,
  DepositWidgetContextValue,
  DepositWidgetProps,
  DestinationConfig,
  ExecuteDepositParams,
  ExecuteDepositResult,
  TransactionStatus,
  UseDepositWidgetProps,
  WidgetStep,
} from "./types";
