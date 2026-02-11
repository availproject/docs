"use client";

import { useRef } from "react";
import type { ColorMeta } from "@/lib/shader-defaults";

interface ShaderColorControlProps {
  meta: ColorMeta;
  value: string;
  onChange: (value: string) => void;
}

export function ShaderColorControl({ meta, value, onChange }: ShaderColorControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-muted-foreground">{meta.label}</span>
      <button
        type="button"
        className="size-7 shrink-0 rounded-md border border-border shadow-sm"
        style={{ backgroundColor: value }}
        onClick={() => inputRef.current?.click()}
        aria-label={`Pick ${meta.label} color`}
      />
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
        }}
        className="h-7 w-20 rounded-md border border-border bg-transparent px-2 font-mono text-xs text-foreground"
      />
    </div>
  );
}
