"use client";

import { Slider } from "@/components/ui/slider";
import type { SliderMeta } from "@/lib/shader-defaults";

interface ShaderSliderControlProps {
  meta: SliderMeta;
  value: number;
  onChange: (value: number) => void;
}

export function ShaderSliderControl({ meta, value, onChange }: ShaderSliderControlProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-muted-foreground">{meta.label}</span>
      <Slider
        min={meta.min}
        max={meta.max}
        step={meta.step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="flex-1"
      />
      <span className="w-10 shrink-0 text-right font-mono text-xs text-muted-foreground">
        {meta.step >= 1 ? value : value.toFixed(2)}
      </span>
    </div>
  );
}
