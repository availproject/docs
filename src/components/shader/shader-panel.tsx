"use client";

import { X, ArrowCounterClockwise } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShaderPresetGrid } from "./shader-preset-grid";
import { ShaderSavedPresets } from "./shader-saved-presets";
import { ShaderSaveForm } from "./shader-save-form";
import { ShaderSliderControl } from "./shader-slider-control";
import { ShaderColorControl } from "./shader-color-control";
import { ShaderColorArrayControl } from "./shader-color-array-control";
import { ShaderSelectControl } from "./shader-select-control";
import {
  SHADER_LABELS,
  defaultState as shaderDefaultState,
  paperTextureSliders,
  paperTextureColors,
  meshGradientSliders,
  meshGradientColorArrays,
  grainGradientSliders,
  grainGradientColors,
  grainGradientColorArrays,
  grainGradientSelects,
  neuroNoiseSliders,
  neuroNoiseColors,
  ditheringSliders,
  ditheringColors,
  ditheringSelects,
  type SavedPreset,
  type ShaderName,
  type ShaderPlaygroundState,
  type SliderMeta,
  type ColorMeta,
  type ColorArrayMeta,
  type SelectMeta,
} from "@/lib/shader-defaults";

// ---------------------------------------------------------------------------
// Metadata lookup per shader
// ---------------------------------------------------------------------------

const slidersByShader: Record<ShaderName, SliderMeta[]> = {
  paperTexture: paperTextureSliders,
  meshGradient: meshGradientSliders,
  grainGradient: grainGradientSliders,
  neuroNoise: neuroNoiseSliders,
  dithering: ditheringSliders,
};

const colorsByShader: Record<ShaderName, ColorMeta[]> = {
  paperTexture: paperTextureColors,
  meshGradient: [],
  grainGradient: grainGradientColors,
  neuroNoise: neuroNoiseColors,
  dithering: ditheringColors,
};

const colorArraysByShader: Record<ShaderName, ColorArrayMeta[]> = {
  paperTexture: [],
  meshGradient: meshGradientColorArrays,
  grainGradient: grainGradientColorArrays,
  neuroNoise: [],
  dithering: [],
};

const selectsByShader: Record<ShaderName, SelectMeta[]> = {
  paperTexture: [],
  meshGradient: [],
  grainGradient: grainGradientSelects,
  neuroNoise: [],
  dithering: ditheringSelects,
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ShaderPanelProps {
  state: ShaderPlaygroundState;
  onClose: () => void;
  setEnabled: (enabled: boolean) => void;
  setActiveShader: (shader: ShaderName) => void;
  updateParam: (shader: ShaderName, key: string, value: number | string) => void;
  updateColorArray: (shader: ShaderName, key: string, index: number, color: string) => void;
  addColor: (shader: ShaderName, key: string, color: string) => void;
  removeColor: (shader: ShaderName, key: string, index: number) => void;
  resetShader: (shader: ShaderName) => void;
  savedPresets: SavedPreset[];
  onSavePreset: (name: string) => void;
  onLoadPreset: (id: string) => void;
  onDeletePreset: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ShaderPanel({
  state,
  onClose,
  setEnabled,
  setActiveShader,
  updateParam,
  updateColorArray,
  addColor,
  removeColor,
  resetShader,
  savedPresets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
}: ShaderPanelProps) {
  const { activeShader, enabled } = state;
  const config = (state[activeShader] ?? shaderDefaultState[activeShader]) as Record<string, unknown>;

  const sliders = slidersByShader[activeShader];
  const colors = colorsByShader[activeShader];
  const colorArrays = colorArraysByShader[activeShader];
  const selects = selectsByShader[activeShader];

  return (
    <div className="fixed top-16 right-4 bottom-16 z-50 hidden w-80 md:block">
      <div className="flex h-full flex-col rounded-lg border border-border bg-popover/95 shadow-lg backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">
            {SHADER_LABELS[activeShader]}
          </h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setEnabled(!enabled)}
              aria-label={enabled ? "Disable shader" : "Enable shader"}
              className={enabled ? "text-primary" : "text-muted-foreground"}
            >
              <span className="text-xs font-medium">{enabled ? "ON" : "OFF"}</span>
            </Button>
            <Button variant="ghost" size="icon-xs" onClick={onClose} aria-label="Close panel">
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="space-y-5 p-4">
            {/* Preset grid */}
            <ShaderPresetGrid activeShader={activeShader} onSelect={setActiveShader} />

            {/* Saved presets */}
            <ShaderSavedPresets
              presets={savedPresets}
              onLoad={onLoadPreset}
              onDelete={onDeletePreset}
            />

            {/* Color controls */}
            {colors.length > 0 && (
              <div className="space-y-3">
                {colors.map((meta) => (
                  <ShaderColorControl
                    key={meta.key}
                    meta={meta}
                    value={config[meta.key] as string}
                    onChange={(v) => updateParam(activeShader, meta.key, v)}
                  />
                ))}
              </div>
            )}

            {/* Color array controls */}
            {colorArrays.length > 0 && (
              <div className="space-y-3">
                {colorArrays.map((meta) => (
                  <ShaderColorArrayControl
                    key={meta.key}
                    meta={meta}
                    colors={config[meta.key] as string[]}
                    onUpdate={(i, c) => updateColorArray(activeShader, meta.key, i, c)}
                    onAdd={(c) => addColor(activeShader, meta.key, c)}
                    onRemove={(i) => removeColor(activeShader, meta.key, i)}
                  />
                ))}
              </div>
            )}

            {/* Select controls */}
            {selects.length > 0 && (
              <div className="space-y-3">
                {selects.map((meta) => (
                  <ShaderSelectControl
                    key={meta.key}
                    meta={meta}
                    value={config[meta.key] as string}
                    onChange={(v) => updateParam(activeShader, meta.key, v)}
                  />
                ))}
              </div>
            )}

            {/* Slider controls */}
            {sliders.length > 0 && (
              <div className="space-y-3">
                {sliders.map((meta) => (
                  <ShaderSliderControl
                    key={meta.key}
                    meta={meta}
                    value={config[meta.key] as number}
                    onChange={(v) => updateParam(activeShader, meta.key, v)}
                  />
                ))}
              </div>
            )}

            {/* Save & Reset */}
            <div className="space-y-2">
              <ShaderSaveForm onSave={onSavePreset} />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => resetShader(activeShader)}
              >
                <ArrowCounterClockwise size={14} />
                Reset to defaults
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
