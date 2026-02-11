"use client";

import { Button } from "@/components/ui/button";
import { SHADER_NAMES, SHADER_LABELS, type ShaderName } from "@/lib/shader-defaults";
import { cn } from "@/lib/utils";

interface ShaderPresetGridProps {
  activeShader: ShaderName;
  onSelect: (shader: ShaderName) => void;
}

export function ShaderPresetGrid({ activeShader, onSelect }: ShaderPresetGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHADER_NAMES.map((name) => (
        <Button
          key={name}
          variant={activeShader === name ? "default" : "outline"}
          size="sm"
          className={cn("text-xs", activeShader === name && "pointer-events-none")}
          onClick={() => onSelect(name)}
        >
          {SHADER_LABELS[name]}
        </Button>
      ))}
    </div>
  );
}
