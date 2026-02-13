import type { SimplexNoise } from "@/lib/simplex-noise";

export interface GridPosition {
  x: number;
  y: number;
}

export interface RenderContext {
  noise: SimplexNoise;
  gridPositions: GridPosition[];
  pixelSize: number;
  width: number;
  height: number;
  getColor: (intensity: number, alpha: number) => string;
}

// Use `type` (not `interface`) so they satisfy Record<string, number>

// --- Puddle ---

type PuddleParams = {
  scale: number;
  speed: number;
  spread: number;
  tension: number;
  wobble: number;
};

export const PUDDLE_DEFAULTS: PuddleParams = {
  scale: 0.012,
  speed: 0.0004,
  spread: 0.6,
  tension: 0.3,
  wobble: 0.15,
};

export function renderPuddle(
  ctx: CanvasRenderingContext2D,
  c: RenderContext,
  time: number,
  p: PuddleParams = PUDDLE_DEFAULTS,
) {
  for (const pos of c.gridPositions) {
    const baseNoise = c.noise.fbm(
      pos.x * p.scale + time * 0.15,
      pos.y * p.scale + time * 0.1,
      4,
      2.2,
      0.45,
    );

    const wobbleNoise =
      c.noise.noise2D(
        pos.x * p.scale * 3 + time * 0.8,
        pos.y * p.scale * 3 + time * 0.6,
      ) * p.wobble;

    const flowNoise = c.noise.fbm(
      pos.x * p.scale * 0.5 + time * 0.3,
      pos.y * p.scale * 0.5 - time * 0.2,
      2,
      2,
      0.5,
    );

    const combined = baseNoise + wobbleNoise + flowNoise * 0.3;
    const threshold = 0.1 - p.spread * 0.4;
    const edgeSharpness = p.tension * 4 + 1;

    if (combined > threshold) {
      const edgeDist = (combined - threshold) / (1 - threshold);
      const tensionFalloff = edgeDist ** (1 / edgeSharpness);

      const caustic =
        c.noise.noise2D(
          pos.x * p.scale * 2 + time * 0.5,
          pos.y * p.scale * 2 + time * 0.4,
        ) *
          0.3 +
        0.7;

      const edgeBrightness = edgeDist < 0.15 ? 1.2 - edgeDist * 2 : 1;

      const intensity = Math.min(1, tensionFalloff * caustic * edgeBrightness);
      const alpha = (0.4 + tensionFalloff * 0.5) * Math.min(1, intensity + 0.2);

      ctx.fillStyle = c.getColor(intensity, alpha);
      ctx.fillRect(
        Math.round(pos.x - c.pixelSize / 2),
        Math.round(pos.y - c.pixelSize / 2),
        c.pixelSize,
        c.pixelSize,
      );
    }
  }
}

// --- Flow ---

type FlowParams = {
  scale: number;
  speed: number;
  threshold: number;
  octaves: number;
  lacunarity: number;
};

export const FLOW_DEFAULTS: FlowParams = {
  scale: 0.008,
  speed: 0.0003,
  threshold: 0.1,
  octaves: 4,
  lacunarity: 2,
};

export function renderFlow(
  ctx: CanvasRenderingContext2D,
  c: RenderContext,
  time: number,
  p: FlowParams = FLOW_DEFAULTS,
) {
  for (const pos of c.gridPositions) {
    const n1 = c.noise.fbm(
      pos.x * p.scale + time * 0.5,
      pos.y * p.scale + time * 0.3,
      p.octaves,
      p.lacunarity,
      0.5,
    );
    const n2 = c.noise.fbm(
      pos.x * p.scale * 1.5 - time * 0.4,
      pos.y * p.scale * 1.5 + time * 0.2,
      Math.max(1, p.octaves - 1),
      p.lacunarity,
      0.5,
    );
    const combined = (n1 + n2 * 0.5) / 1.5;

    if (combined > p.threshold) {
      const intensity = Math.min(
        1,
        (combined - p.threshold) / (1 - p.threshold),
      );
      const alpha = 0.3 + intensity * 0.7;
      ctx.fillStyle = c.getColor(intensity, alpha);
      ctx.fillRect(
        Math.round(pos.x - c.pixelSize / 2),
        Math.round(pos.y - c.pixelSize / 2),
        c.pixelSize,
        c.pixelSize,
      );
    }
  }
}

// --- Drift ---

type DriftParams = {
  scale: number;
  speed: number;
  angle: number;
  density: number;
};

export const DRIFT_DEFAULTS: DriftParams = {
  scale: 0.006,
  speed: 0.0004,
  angle: 45,
  density: 0.5,
};

export function renderDrift(
  ctx: CanvasRenderingContext2D,
  c: RenderContext,
  time: number,
  p: DriftParams = DRIFT_DEFAULTS,
) {
  const angleRad = (p.angle * Math.PI) / 180;
  const dx = Math.cos(angleRad);
  const dy = Math.sin(angleRad);

  for (const pos of c.gridPositions) {
    const driftX = pos.x + time * dx * 50;
    const driftY = pos.y + time * dy * 50;

    const n = c.noise.fbm(driftX * p.scale, driftY * p.scale, 3, 2, 0.5);

    const cornerDist = (pos.x / c.width + pos.y / c.height) / 2;
    const densityMod = 1 - cornerDist * (1 - p.density);
    const threshold = 0.3 - densityMod * 0.4;

    if (n > threshold) {
      const intensity = Math.min(1, (n - threshold) / 0.6) * densityMod;
      const alpha = 0.2 + intensity * 0.6;
      ctx.fillStyle = c.getColor(intensity, alpha);
      ctx.fillRect(
        Math.round(pos.x - c.pixelSize / 2),
        Math.round(pos.y - c.pixelSize / 2),
        c.pixelSize,
        c.pixelSize,
      );
    }
  }
}

// --- Breathe ---

type BreatheParams = {
  scale: number;
  speed: number;
  intensity: number;
  falloff: number;
};

export const BREATHE_DEFAULTS: BreatheParams = {
  scale: 0.01,
  speed: 0.0008,
  intensity: 0.4,
  falloff: 0.5,
};

export function renderBreathe(
  ctx: CanvasRenderingContext2D,
  c: RenderContext,
  time: number,
  p: BreatheParams = BREATHE_DEFAULTS,
) {
  const cx = c.width / 2;
  const cy = c.height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  const breath = (Math.sin(time * 2) + 1) / 2;

  for (const pos of c.gridPositions) {
    const dx = pos.x - cx;
    const dy = pos.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const normDist = dist / maxDist;

    const radialFalloff = (1 - normDist) ** p.falloff;
    const breathMod = 1 - breath * 0.3 * normDist;

    const n = c.noise.fbm(
      pos.x * p.scale + time * 0.2,
      pos.y * p.scale + time * 0.15,
      3,
      2,
      0.5,
    );

    const threshold = 0.5 - radialFalloff * p.intensity * breathMod;

    if (n > threshold) {
      const dotIntensity = Math.min(1, (n - threshold) / 0.5) * radialFalloff;
      const alpha = 0.25 + dotIntensity * 0.65;
      ctx.fillStyle = c.getColor(dotIntensity, alpha);
      ctx.fillRect(
        Math.round(pos.x - c.pixelSize / 2),
        Math.round(pos.y - c.pixelSize / 2),
        c.pixelSize,
        c.pixelSize,
      );
    }
  }
}

// --- Vortex ---

type VortexParams = {
  scale: number;
  speed: number;
  twist: number;
  arms: number;
};

export const VORTEX_DEFAULTS: VortexParams = {
  scale: 0.008,
  speed: 0.0005,
  twist: 0.003,
  arms: 2,
};

export function renderVortex(
  ctx: CanvasRenderingContext2D,
  c: RenderContext,
  time: number,
  p: VortexParams = VORTEX_DEFAULTS,
) {
  const cx = c.width / 2;
  const cy = c.height / 2;

  for (const pos of c.gridPositions) {
    const dx = pos.x - cx;
    const dy = pos.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const twist = dist * p.twist;
    const twistedAngle = angle + twist + time;

    const spiralVal = Math.sin(twistedAngle * p.arms) * 0.5 + 0.5;

    const n = c.noise.fbm(
      pos.x * p.scale + Math.cos(twistedAngle) * 0.5,
      pos.y * p.scale + Math.sin(twistedAngle) * 0.5,
      3,
      2,
      0.5,
    );

    const combined = (n + spiralVal) / 2;
    const threshold = 0.35;

    if (combined > threshold) {
      const intensity = Math.min(1, (combined - threshold) / 0.5);
      const alpha = 0.2 + intensity * 0.7;
      ctx.fillStyle = c.getColor(intensity, alpha);
      ctx.fillRect(
        Math.round(pos.x - c.pixelSize / 2),
        Math.round(pos.y - c.pixelSize / 2),
        c.pixelSize,
        c.pixelSize,
      );
    }
  }
}

// --- Waves ---

type WavesParams = {
  scale: number;
  speed: number;
  frequency: number;
  amplitude: number;
  layers: number;
};

export const WAVES_DEFAULTS: WavesParams = {
  scale: 0.01,
  speed: 0.0006,
  frequency: 0.02,
  amplitude: 0.3,
  layers: 3,
};

export function renderWaves(
  ctx: CanvasRenderingContext2D,
  c: RenderContext,
  time: number,
  p: WavesParams = WAVES_DEFAULTS,
) {
  for (const pos of c.gridPositions) {
    let totalIntensity = 0;

    for (let layer = 0; layer < p.layers; layer++) {
      const layerOffset = (layer * Math.PI) / p.layers;
      const waveY = Math.sin(pos.x * p.frequency + time + layerOffset);

      const n = c.noise.noise2D(
        pos.x * p.scale + time * 0.3,
        pos.y * p.scale * 0.5 + layer,
      );

      const waveCenter =
        c.height * (0.3 + layer * 0.2) + waveY * c.height * p.amplitude;
      const distFromWave = Math.abs(pos.y - waveCenter);
      const waveWidth = c.height * 0.15;

      if (distFromWave < waveWidth) {
        const waveFalloff = 1 - distFromWave / waveWidth;
        const noiseThreshold = 0.3 - waveFalloff * 0.4;

        if (n > noiseThreshold) {
          const layerIntensity = waveFalloff * (n - noiseThreshold + 0.5);
          totalIntensity = Math.max(totalIntensity, layerIntensity);
        }
      }
    }

    if (totalIntensity > 0.1) {
      const alpha = 0.2 + Math.min(1, totalIntensity) * 0.6;
      ctx.fillStyle = c.getColor(Math.min(1, totalIntensity), alpha);
      ctx.fillRect(
        Math.round(pos.x - c.pixelSize / 2),
        Math.round(pos.y - c.pixelSize / 2),
        c.pixelSize,
        c.pixelSize,
      );
    }
  }
}
