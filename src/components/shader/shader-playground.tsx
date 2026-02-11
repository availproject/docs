"use client";

import { useCallback } from "react";
import { useShaderPlayground } from "@/hooks/use-shader-playground";
import { useSavedPresets } from "@/hooks/use-saved-presets";
import { ShaderCanvas } from "./shader-canvas";
import { ShaderPanel } from "./shader-panel";
import { ShaderPanelToggle } from "./shader-panel-toggle";

export function ShaderPlayground() {
  const {
    state,
    setEnabled,
    setActiveShader,
    setPanelOpen,
    updateParam,
    updateColorArray,
    addColor,
    removeColor,
    resetShader,
    loadConfig,
  } = useShaderPlayground();

  const { presetsForShader, savePreset, loadPreset, deletePreset } = useSavedPresets();

  const handleSavePreset = useCallback(
    (name: string) => {
      const config = state[state.activeShader] as Record<string, unknown>;
      savePreset(name, state.activeShader, config);
    },
    [state, savePreset]
  );

  const handleLoadPreset = useCallback(
    (id: string) => {
      const preset = loadPreset(id);
      if (!preset) return;
      setActiveShader(preset.shader);
      loadConfig(preset.shader, preset.config);
    },
    [loadPreset, setActiveShader, loadConfig]
  );

  return (
    <>
      <ShaderCanvas
        enabled={state.enabled}
        activeShader={state.activeShader}
        config={state}
      />

      {state.panelOpen && (
        <ShaderPanel
          state={state}
          onClose={() => setPanelOpen(false)}
          setEnabled={setEnabled}
          setActiveShader={setActiveShader}
          updateParam={updateParam}
          updateColorArray={updateColorArray}
          addColor={addColor}
          removeColor={removeColor}
          resetShader={resetShader}
          savedPresets={presetsForShader(state.activeShader)}
          onSavePreset={handleSavePreset}
          onLoadPreset={handleLoadPreset}
          onDeletePreset={deletePreset}
        />
      )}

      <ShaderPanelToggle
        panelOpen={state.panelOpen}
        onToggle={() => setPanelOpen(!state.panelOpen)}
      />
    </>
  );
}
