"use client";

import { useReducer, useCallback } from "react";
import {
  defaultState,
  paperTextureDefaults,
  meshGradientDefaults,
  grainGradientDefaults,
  neuroNoiseDefaults,
  ditheringDefaults,
  type ShaderPlaygroundState,
  type ShaderName,
} from "@/lib/shader-defaults";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type Action =
  | { type: "SET_ENABLED"; enabled: boolean }
  | { type: "SET_ACTIVE_SHADER"; shader: ShaderName }
  | { type: "SET_PANEL_OPEN"; open: boolean }
  | { type: "UPDATE_PARAM"; shader: ShaderName; key: string; value: number | string }
  | { type: "UPDATE_COLOR_ARRAY"; shader: ShaderName; key: string; index: number; color: string }
  | { type: "ADD_COLOR"; shader: ShaderName; key: string; color: string }
  | { type: "REMOVE_COLOR"; shader: ShaderName; key: string; index: number }
  | { type: "RESET_SHADER"; shader: ShaderName }
  | { type: "LOAD_CONFIG"; shader: ShaderName; config: Record<string, unknown> };

const shaderDefaults: Record<ShaderName, ShaderPlaygroundState[ShaderName]> = {
  paperTexture: paperTextureDefaults,
  meshGradient: meshGradientDefaults,
  grainGradient: grainGradientDefaults,
  neuroNoise: neuroNoiseDefaults,
  dithering: ditheringDefaults,
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: ShaderPlaygroundState, action: Action): ShaderPlaygroundState {
  switch (action.type) {
    case "SET_ENABLED":
      return { ...state, enabled: action.enabled };

    case "SET_ACTIVE_SHADER":
      return { ...state, activeShader: action.shader };

    case "SET_PANEL_OPEN":
      return { ...state, panelOpen: action.open };

    case "UPDATE_PARAM":
      return {
        ...state,
        [action.shader]: {
          ...state[action.shader],
          [action.key]: action.value,
        },
      };

    case "UPDATE_COLOR_ARRAY": {
      const config = state[action.shader] as Record<string, unknown>;
      const arr = [...(config[action.key] as string[])];
      arr[action.index] = action.color;
      return {
        ...state,
        [action.shader]: { ...config, [action.key]: arr },
      };
    }

    case "ADD_COLOR": {
      const config = state[action.shader] as Record<string, unknown>;
      const arr = [...(config[action.key] as string[]), action.color];
      return {
        ...state,
        [action.shader]: { ...config, [action.key]: arr },
      };
    }

    case "REMOVE_COLOR": {
      const config = state[action.shader] as Record<string, unknown>;
      const arr = (config[action.key] as string[]).filter((_, i) => i !== action.index);
      return {
        ...state,
        [action.shader]: { ...config, [action.key]: arr },
      };
    }

    case "RESET_SHADER":
      return {
        ...state,
        [action.shader]: shaderDefaults[action.shader],
      };

    case "LOAD_CONFIG":
      return {
        ...state,
        [action.shader]: action.config,
      };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useShaderPlayground() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const setEnabled = useCallback((enabled: boolean) => {
    dispatch({ type: "SET_ENABLED", enabled });
  }, []);

  const setActiveShader = useCallback((shader: ShaderName) => {
    dispatch({ type: "SET_ACTIVE_SHADER", shader });
  }, []);

  const setPanelOpen = useCallback((open: boolean) => {
    dispatch({ type: "SET_PANEL_OPEN", open });
  }, []);

  const updateParam = useCallback((shader: ShaderName, key: string, value: number | string) => {
    dispatch({ type: "UPDATE_PARAM", shader, key, value });
  }, []);

  const updateColorArray = useCallback(
    (shader: ShaderName, key: string, index: number, color: string) => {
      dispatch({ type: "UPDATE_COLOR_ARRAY", shader, key, index, color });
    },
    []
  );

  const addColor = useCallback((shader: ShaderName, key: string, color: string) => {
    dispatch({ type: "ADD_COLOR", shader, key, color });
  }, []);

  const removeColor = useCallback((shader: ShaderName, key: string, index: number) => {
    dispatch({ type: "REMOVE_COLOR", shader, key, index });
  }, []);

  const resetShader = useCallback((shader: ShaderName) => {
    dispatch({ type: "RESET_SHADER", shader });
  }, []);

  const loadConfig = useCallback((shader: ShaderName, config: Record<string, unknown>) => {
    dispatch({ type: "LOAD_CONFIG", shader, config });
  }, []);

  return {
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
  };
}
