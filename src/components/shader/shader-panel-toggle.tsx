"use client";

import { Palette } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface ShaderPanelToggleProps {
  panelOpen: boolean;
  onToggle: () => void;
}

export function ShaderPanelToggle({ panelOpen, onToggle }: ShaderPanelToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="fixed right-4 bottom-4 z-50 hidden size-10 rounded-full shadow-lg md:flex"
      aria-label={panelOpen ? "Close shader panel" : "Open shader panel"}
    >
      <Palette size={20} />
    </Button>
  );
}
