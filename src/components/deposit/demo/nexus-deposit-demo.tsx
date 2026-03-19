"use client";

import type React from "react";
import { WidgetErrorBoundary } from "../../common";
import { Card } from "../../ui/card";
import {
  AmountContainer,
  AssetSelectionContainer,
  TransactionCompleteContainer,
  TransactionFailedContainer,
  TransactionStatusContainer,
} from "../components";
import type { NavigationDirection, WidgetStep } from "../types";
import { cn } from "../utils";
import DemoConfirmationContainer from "./demo-confirmation-container";
import { useDemoDepositWidget } from "./use-demo-deposit-widget";

const ANIMATION_CLASSES: Record<NonNullable<NavigationDirection>, string> = {
  forward: "animate-slide-in-from-right",
  backward: "animate-slide-in-from-left",
};

const getAnimationClass = (direction: NavigationDirection): string =>
  direction ? ANIMATION_CLASSES[direction] : "";

type ScreenRenderer = (
  widget: ReturnType<typeof useDemoDepositWidget>,
  heading?: string,
  onClose?: () => void,
) => React.ReactNode;

const SCREENS: Record<WidgetStep, ScreenRenderer> = {
  amount: (widget, heading) => (
    <AmountContainer widget={widget} heading={heading} />
  ),
  confirmation: (widget, heading) => (
    <DemoConfirmationContainer widget={widget} heading={heading} />
  ),
  "transaction-status": (widget, heading) => (
    <TransactionStatusContainer widget={widget} heading={heading} />
  ),
  "transaction-complete": (widget, heading) => (
    <TransactionCompleteContainer widget={widget} heading={heading} />
  ),
  "transaction-failed": (widget, heading) => (
    <TransactionFailedContainer widget={widget} heading={heading} />
  ),
  "asset-selection": (widget) => (
    <AssetSelectionContainer widget={widget} heading="Pay using" />
  ),
};

interface NexusDepositDemoProps {
  heading?: string;
  className?: string;
}

const NexusDepositDemo = ({
  heading = "Deposit USDC",
  className,
}: NexusDepositDemoProps) => {
  const widget = useDemoDepositWidget();
  const animationClass = getAnimationClass(widget.navigationDirection);

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
};

export default NexusDepositDemo;
