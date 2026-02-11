"use client";

import { Play, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { SavedPreset } from "@/lib/shader-defaults";

interface ShaderSavedPresetsProps {
  presets: SavedPreset[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ShaderSavedPresets({ presets, onLoad, onDelete }: ShaderSavedPresetsProps) {
  if (presets.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium text-muted-foreground">My Presets</h3>
      <div className="space-y-1">
        {presets.map((preset) => (
          <div
            key={preset.id}
            className="flex items-center justify-between rounded-md border border-border px-2.5 py-1.5"
          >
            <span className="truncate text-xs text-foreground">{preset.name}</span>
            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onLoad(preset.id)}
                aria-label={`Load ${preset.name}`}
              >
                <Play size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onDelete(preset.id)}
                aria-label={`Delete ${preset.name}`}
              >
                <Trash size={12} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
