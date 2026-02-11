"use client";

import { useRef } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { ColorArrayMeta } from "@/lib/shader-defaults";

interface ShaderColorArrayControlProps {
  meta: ColorArrayMeta;
  colors: string[];
  onUpdate: (index: number, color: string) => void;
  onAdd: (color: string) => void;
  onRemove: (index: number) => void;
}

export function ShaderColorArrayControl({
  meta,
  colors,
  onUpdate,
  onAdd,
  onRemove,
}: ShaderColorArrayControlProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div className="space-y-2">
      <span className="text-xs text-muted-foreground">{meta.label}</span>
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((color, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              className="size-7 rounded-md border border-border shadow-sm"
              style={{ backgroundColor: color }}
              onClick={() => inputRefs.current[i]?.click()}
              aria-label={`Edit color ${i + 1}`}
            />
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="color"
              value={color}
              onChange={(e) => onUpdate(i, e.target.value)}
              className="sr-only"
              tabIndex={-1}
            />
          </div>
        ))}
        {colors.length < meta.maxColors && (
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onAdd("#808080")}
            aria-label="Add color"
          >
            <Plus size={14} />
          </Button>
        )}
        {colors.length > 2 && (
          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => onRemove(colors.length - 1)}
            aria-label="Remove last color"
          >
            <Minus size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}
