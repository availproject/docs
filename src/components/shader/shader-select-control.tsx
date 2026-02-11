"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectMeta } from "@/lib/shader-defaults";

interface ShaderSelectControlProps {
  meta: SelectMeta;
  value: string;
  onChange: (value: string) => void;
}

export function ShaderSelectControl({ meta, value, onChange }: ShaderSelectControlProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-muted-foreground">{meta.label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger size="sm" className="flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          {meta.options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
