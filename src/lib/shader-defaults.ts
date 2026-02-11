import type {
  PaperTextureParams,
  MeshGradientParams,
  GrainGradientParams,
  NeuroNoiseParams,
  DitheringParams,
} from "@paper-design/shaders-react";

// ---------------------------------------------------------------------------
// Shader names
// ---------------------------------------------------------------------------

export const SHADER_NAMES = [
  "paperTexture",
  "meshGradient",
  "grainGradient",
  "neuroNoise",
  "dithering",
] as const;

export type ShaderName = (typeof SHADER_NAMES)[number];

export const SHADER_LABELS: Record<ShaderName, string> = {
  paperTexture: "Paper Texture",
  meshGradient: "Mesh Gradient",
  grainGradient: "Grain Gradient",
  neuroNoise: "Neuro Noise",
  dithering: "Dithering",
};

// ---------------------------------------------------------------------------
// Per-shader param types (pick only the knobs we expose)
// ---------------------------------------------------------------------------

export type PaperTextureConfig = Required<
  Pick<
    PaperTextureParams,
    | "colorFront"
    | "colorBack"
    | "contrast"
    | "roughness"
    | "fiber"
    | "fiberSize"
    | "crumples"
    | "crumpleSize"
    | "folds"
    | "foldCount"
    | "drops"
    | "fade"
    | "seed"
  >
>;

export type MeshGradientConfig = Required<
  Pick<MeshGradientParams, "colors" | "distortion" | "swirl">
> & { speed: number };

export type GrainGradientConfig = Required<
  Pick<
    GrainGradientParams,
    "colorBack" | "colors" | "softness" | "intensity" | "noise" | "shape"
  >
> & { speed: number };

export type NeuroNoiseConfig = Required<
  Pick<
    NeuroNoiseParams,
    "colorFront" | "colorMid" | "colorBack" | "brightness" | "contrast"
  >
> & { speed: number };

export type DitheringConfig = Required<
  Pick<
    DitheringParams,
    "colorFront" | "colorBack" | "shape" | "type" | "size"
  >
> & { speed: number; scale: number };

// ---------------------------------------------------------------------------
// Unified playground state
// ---------------------------------------------------------------------------

export interface ShaderPlaygroundState {
  enabled: boolean;
  activeShader: ShaderName;
  panelOpen: boolean;
  paperTexture: PaperTextureConfig;
  meshGradient: MeshGradientConfig;
  grainGradient: GrainGradientConfig;
  neuroNoise: NeuroNoiseConfig;
  dithering: DitheringConfig;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const paperTextureDefaults: PaperTextureConfig = {
  colorFront: "#9fadbc",
  colorBack: "#ffffff",
  contrast: 0.3,
  roughness: 0.4,
  fiber: 0.3,
  fiberSize: 0.5,
  crumples: 0.3,
  crumpleSize: 0.5,
  folds: 0.65,
  foldCount: 5,
  drops: 0.2,
  fade: 0,
  seed: 5.8,
};

export const meshGradientDefaults: MeshGradientConfig = {
  colors: ["#e0eaff", "#241d9a", "#f75092", "#9f50d3"],
  distortion: 0.8,
  swirl: 0.1,
  speed: 0.6,
};

export const grainGradientDefaults: GrainGradientConfig = {
  colorBack: "#000000",
  colors: ["#7300ff", "#eba8ff", "#00bfff", "#2a00ff"],
  softness: 0.5,
  intensity: 0.5,
  noise: 0.25,
  shape: "corners",
  speed: 1,
};

export const neuroNoiseDefaults: NeuroNoiseConfig = {
  colorFront: "#ffffff",
  colorMid: "#47a6ff",
  colorBack: "#000000",
  brightness: 0.05,
  contrast: 0.3,
  speed: 1,
};

export const ditheringDefaults: DitheringConfig = {
  colorFront: "#00b2ff",
  colorBack: "#000000",
  shape: "sphere",
  type: "4x4",
  size: 2,
  speed: 1,
  scale: 0.6,
};

export const defaultState: ShaderPlaygroundState = {
  enabled: true,
  activeShader: "meshGradient",
  panelOpen: true,
  paperTexture: paperTextureDefaults,
  meshGradient: meshGradientDefaults,
  grainGradient: grainGradientDefaults,
  neuroNoise: neuroNoiseDefaults,
  dithering: ditheringDefaults,
};

// ---------------------------------------------------------------------------
// Saved presets
// ---------------------------------------------------------------------------

export interface SavedPreset {
  id: string;
  name: string;
  shader: ShaderName;
  config: Record<string, unknown>;
  savedAt: number;
}

// ---------------------------------------------------------------------------
// Slider metadata — drives the control panel UI
// ---------------------------------------------------------------------------

export interface SliderMeta {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

export interface ColorMeta {
  key: string;
  label: string;
}

export interface ColorArrayMeta {
  key: string;
  label: string;
  maxColors: number;
}

export interface SelectMeta {
  key: string;
  label: string;
  options: string[];
}

export const paperTextureSliders: SliderMeta[] = [
  { key: "contrast", label: "Contrast", min: 0, max: 1, step: 0.01 },
  { key: "roughness", label: "Roughness", min: 0, max: 1, step: 0.01 },
  { key: "fiber", label: "Fiber", min: 0, max: 1, step: 0.01 },
  { key: "fiberSize", label: "Fiber Size", min: 0, max: 1, step: 0.01 },
  { key: "crumples", label: "Crumples", min: 0, max: 1, step: 0.01 },
  { key: "crumpleSize", label: "Crumple Size", min: 0, max: 1, step: 0.01 },
  { key: "folds", label: "Folds", min: 0, max: 1, step: 0.01 },
  { key: "foldCount", label: "Fold Count", min: 1, max: 20, step: 1 },
  { key: "drops", label: "Drops", min: 0, max: 1, step: 0.01 },
  { key: "fade", label: "Fade", min: 0, max: 1, step: 0.01 },
  { key: "seed", label: "Seed", min: 0, max: 20, step: 0.1 },
];

export const paperTextureColors: ColorMeta[] = [
  { key: "colorFront", label: "Front Color" },
  { key: "colorBack", label: "Back Color" },
];

export const meshGradientSliders: SliderMeta[] = [
  { key: "distortion", label: "Distortion", min: 0, max: 2, step: 0.01 },
  { key: "swirl", label: "Swirl", min: 0, max: 1, step: 0.01 },
  { key: "speed", label: "Speed", min: 0, max: 2, step: 0.01 },
];

export const meshGradientColorArrays: ColorArrayMeta[] = [
  { key: "colors", label: "Colors", maxColors: 10 },
];

export const grainGradientSliders: SliderMeta[] = [
  { key: "softness", label: "Softness", min: 0, max: 1, step: 0.01 },
  { key: "intensity", label: "Intensity", min: 0, max: 1, step: 0.01 },
  { key: "noise", label: "Noise", min: 0, max: 1, step: 0.01 },
  { key: "speed", label: "Speed", min: 0, max: 2, step: 0.01 },
];

export const grainGradientColors: ColorMeta[] = [
  { key: "colorBack", label: "Background" },
];

export const grainGradientColorArrays: ColorArrayMeta[] = [
  { key: "colors", label: "Colors", maxColors: 7 },
];

export const grainGradientSelects: SelectMeta[] = [
  {
    key: "shape",
    label: "Shape",
    options: ["wave", "dots", "truchet", "corners", "ripple", "blob", "sphere"],
  },
];

export const neuroNoiseSliders: SliderMeta[] = [
  { key: "brightness", label: "Brightness", min: 0, max: 1, step: 0.01 },
  { key: "contrast", label: "Contrast", min: 0, max: 1, step: 0.01 },
  { key: "speed", label: "Speed", min: 0, max: 2, step: 0.01 },
];

export const neuroNoiseColors: ColorMeta[] = [
  { key: "colorFront", label: "Front" },
  { key: "colorMid", label: "Mid" },
  { key: "colorBack", label: "Back" },
];

export const ditheringSliders: SliderMeta[] = [
  { key: "size", label: "Size", min: 1, max: 20, step: 0.5 },
  { key: "scale", label: "Scale", min: 0.01, max: 4, step: 0.01 },
  { key: "speed", label: "Speed", min: 0, max: 2, step: 0.01 },
];

export const ditheringColors: ColorMeta[] = [
  { key: "colorFront", label: "Front" },
  { key: "colorBack", label: "Back" },
];

export const ditheringSelects: SelectMeta[] = [
  {
    key: "shape",
    label: "Shape",
    options: ["simplex", "warp", "dots", "wave", "ripple", "swirl", "sphere"],
  },
  {
    key: "type",
    label: "Type",
    options: ["random", "2x2", "4x4", "8x8"],
  },
];
