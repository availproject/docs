"use client";

import React from "react";
import { PaperTexture } from "@paper-design/shaders-react";
import { MeshGradient } from "@paper-design/shaders-react";
import { GrainGradient } from "@paper-design/shaders-react";
import { NeuroNoise } from "@paper-design/shaders-react";
import { Dithering } from "@paper-design/shaders-react";
import type { ShaderPlaygroundState, ShaderName } from "@/lib/shader-defaults";

interface ShaderCanvasProps {
  enabled: boolean;
  activeShader: ShaderName;
  config: ShaderPlaygroundState;
}

function ShaderCanvasInner({ enabled, activeShader, config }: ShaderCanvasProps) {
  const shaderProps = { style: { width: "100%", height: "100%" } };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden transition-opacity duration-500 md:block"
      style={{ opacity: enabled ? 1 : 0 }}
    >
      {enabled && (
        <>
          {activeShader === "paperTexture" && (
            <PaperTexture {...shaderProps} {...config.paperTexture} />
          )}
          {activeShader === "meshGradient" && (
            <MeshGradient {...shaderProps} {...config.meshGradient} />
          )}
          {activeShader === "grainGradient" && (
            <GrainGradient {...shaderProps} {...config.grainGradient} />
          )}
          {activeShader === "neuroNoise" && (
            <NeuroNoise {...shaderProps} {...config.neuroNoise} />
          )}
          {activeShader === "dithering" && (
            <Dithering {...shaderProps} {...config.dithering} />
          )}
        </>
      )}
    </div>
  );
}

export const ShaderCanvas = React.memo(ShaderCanvasInner);
