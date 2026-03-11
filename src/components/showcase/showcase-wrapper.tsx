"use client";
import { Check, X } from "@phosphor-icons/react";
import type React from "react";
import { useEffect, useState } from "react";
import { NETWORK_KEY } from "@/lib/constants";
import { getItem } from "@/lib/local-storage";
import NetworkToggle from "../helpers/network-toggle";
import { PreviewPanel } from "../helpers/preview-panel";
import { Toggle } from "../ui/toggle";

type ElementType =
  | "deposit"
  | "swaps"
  | "fast-bridge"
  | "unified-balance"
  | "fast-transfer"
  | "view-history"
  | "swap-deposit";

const disabledTestnet = new Set<ElementType>([
  "deposit",
  "swaps",
  "swap-deposit",
]);

type ToggleControlProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "children" | "type"
>;

interface ShowcaseWrapperProps extends ToggleControlProps {
  children: React.ReactNode;
  type: ElementType;
  toggleLabel?: string;
  toggle?: boolean;
  banner?: string;
}

const ShowcaseWrapper = ({
  children,
  type,
  toggle,
  toggleLabel,
  variant = "outline",
  size = "sm",
  pressed,
  defaultPressed,
  onPressedChange,
  banner,
  ...toggleProps
}: ShowcaseWrapperProps) => {
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);

  useEffect(() => {
    // Read from localStorage on client side only
    const storedNetwork = getItem(NETWORK_KEY);
    setCurrentNetwork(storedNetwork ?? "mainnet");
  }, []);

  const resolvedToggle =
    typeof toggle === "boolean"
      ? toggle
      : pressed !== undefined ||
        defaultPressed !== undefined ||
        onPressedChange !== undefined;
  const isPressed = pressed ?? defaultPressed ?? false;
  const label = toggleLabel ?? "Swap with Exact In";

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex items-center justify-between w-full">
        <NetworkToggle />
        {resolvedToggle && (
          <Toggle
            variant={variant}
            size={size}
            pressed={pressed}
            defaultPressed={defaultPressed}
            onPressedChange={onPressedChange}
            {...toggleProps}
          >
            <p className="text-sm font-medium">{label}</p>
            {isPressed ? <Check size={16} /> : <X size={16} />}
          </Toggle>
        )}
      </div>
      <p className="text-sm font-medium">{banner}</p>
      {disabledTestnet.has(type) && currentNetwork === "testnet" ? (
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
        <PreviewPanel>{children}</PreviewPanel>
      )}
    </div>
  );
};

export default ShowcaseWrapper;
