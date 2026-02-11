"use client";

import { useState } from "react";
import { FloppyDisk, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShaderSaveFormProps {
  onSave: (name: string) => void;
}

export function ShaderSaveForm({ onSave }: ShaderSaveFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setName("");
    setOpen(false);
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen(true)}>
        <FloppyDisk size={14} />
        Save preset
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        placeholder="Preset name..."
        className="h-8 text-xs"
        autoFocus
      />
      <Button variant="outline" size="icon-xs" onClick={handleSave} aria-label="Confirm save">
        <FloppyDisk size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => {
          setName("");
          setOpen(false);
        }}
        aria-label="Cancel"
      >
        <X size={14} />
      </Button>
    </div>
  );
}
