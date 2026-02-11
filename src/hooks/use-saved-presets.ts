"use client";

import { useState, useCallback, useEffect } from "react";
import { getItem, setItem } from "@/lib/local-storage";
import type { SavedPreset, ShaderName } from "@/lib/shader-defaults";

const STORAGE_KEY = "shader-presets";

function readPresets(): SavedPreset[] {
  const raw = getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedPreset[];
  } catch {
    return [];
  }
}

function writePresets(presets: SavedPreset[]) {
  setItem(STORAGE_KEY, JSON.stringify(presets));
}

export function useSavedPresets() {
  const [presets, setPresets] = useState<SavedPreset[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setPresets(readPresets());
  }, []);

  const savePreset = useCallback(
    (name: string, shader: ShaderName, config: Record<string, unknown>) => {
      const preset: SavedPreset = {
        id: crypto.randomUUID(),
        name,
        shader,
        config,
        savedAt: Date.now(),
      };
      setPresets((prev) => {
        const next = [...prev, preset];
        writePresets(next);
        return next;
      });
    },
    []
  );

  const loadPreset = useCallback(
    (id: string) => presets.find((p) => p.id === id) ?? null,
    [presets]
  );

  const deletePreset = useCallback((id: string) => {
    setPresets((prev) => {
      const next = prev.filter((p) => p.id !== id);
      writePresets(next);
      return next;
    });
  }, []);

  const presetsForShader = useCallback(
    (shader: ShaderName) => presets.filter((p) => p.shader === shader),
    [presets]
  );

  return { presets, savePreset, loadPreset, deletePreset, presetsForShader };
}
