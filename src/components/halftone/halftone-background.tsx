"use client";

import { useEffect, useRef } from "react";
import type { GridPosition, RenderContext } from "@/lib/halftone-animations";
import { renderFlow } from "@/lib/halftone-animations";
import { SimplexNoise } from "@/lib/simplex-noise";

// --- Grid constants (at reference width) ---
const BASE_PIXEL_SIZE = 2;
const BASE_GAP = 4;
const REFERENCE_WIDTH = 1440;

// --- Flow animation params ---
const FLOW_PARAMS = {
  scale: 0.008,
  speed: 0.001,
  threshold: 0.1,
  octaves: 5,
  lacunarity: 2,
};

// --- Color palettes (easy to tweak) ---
const LIGHT_PALETTE = {
  bg: "#fffffe",
  start: { r: 219, g: 229, b: 255 }, // #dbe5ff
  end: { r: 168, g: 193, b: 255 }, // #a8c1ff
};

const DARK_PALETTE = {
  bg: "#141413",
  start: { r: 66, g: 66, b: 65 }, // #424241
  end: { r: 51, g: 51, b: 50 }, // #333332
};

const NOISE_SEED = 42;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function buildGrid(
  width: number,
  height: number,
  cellSize: number,
): GridPosition[] {
  const positions: GridPosition[] = [];
  for (let y = cellSize / 2; y < height; y += cellSize) {
    for (let x = cellSize / 2; x < width; x += cellSize) {
      positions.push({ x, y });
    }
  }
  return positions;
}

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

export function HalftoneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // biome-ignore lint/style/noNonNullAssertion: ref is set after mount
    const canvas = canvasRef.current!;
    // biome-ignore lint/style/noNonNullAssertion: 2d context always exists
    const ctx = canvas.getContext("2d")!;
    const noise = new SimplexNoise(NOISE_SEED);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let gridPositions: GridPosition[] = [];
    let width = 0;
    let height = 0;
    let currentPixelSize = BASE_PIXEL_SIZE;
    let currentNoiseScale = FLOW_PARAMS.scale;
    let rafId: number | undefined;
    let time = 0;
    let lastTime: number | undefined;
    let palette = isDarkMode() ? DARK_PALETTE : LIGHT_PALETTE;
    let paused = false;

    const observer = new MutationObserver(() => {
      const next = isDarkMode() ? DARK_PALETTE : LIGHT_PALETTE;
      if (next === palette) return;
      palette = next;
      if (paused) renderFrame();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      if (w === width && h === height) return;
      width = w;
      height = h;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale grid and noise relative to viewport so mobile looks proportional
      const scaleFactor = Math.min(1, width / REFERENCE_WIDTH);
      currentPixelSize = Math.max(1, Math.round(BASE_PIXEL_SIZE * scaleFactor));
      const gap = Math.max(2, Math.round(BASE_GAP * scaleFactor));
      const cellSize = currentPixelSize + gap;
      currentNoiseScale = FLOW_PARAMS.scale * (REFERENCE_WIDTH / width);

      gridPositions = buildGrid(width, height, cellSize);
    }

    function renderFrame() {
      const { start, end } = palette;

      const renderContext: RenderContext = {
        noise,
        gridPositions,
        pixelSize: currentPixelSize,
        width,
        height,
        getColor(intensity: number, alpha: number) {
          const r = Math.round(lerp(end.r, start.r, intensity));
          const g = Math.round(lerp(end.g, start.g, intensity));
          const b = Math.round(lerp(end.b, start.b, intensity));
          return `rgba(${r},${g},${b},${alpha})`;
        },
      };

      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      renderFlow(ctx, renderContext, time, {
        ...FLOW_PARAMS,
        scale: currentNoiseScale,
      });
    }

    function animate(now: number) {
      const dt = lastTime !== undefined ? now - lastTime : 16.67;
      lastTime = now;
      time += FLOW_PARAMS.speed * dt;
      renderFrame();
      rafId = requestAnimationFrame(animate);
    }

    resize();

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      rafId = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    function onTransitionStart() {
      paused = true;
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
        rafId = undefined;
      }
    }

    function onTransitionEnd() {
      paused = false;
      if (!prefersReducedMotion && rafId === undefined) {
        lastTime = undefined;
        rafId = requestAnimationFrame(animate);
      }
    }

    document.addEventListener("pixelTransitionStart", onTransitionStart);
    document.addEventListener("pixelTransitionEnd", onTransitionEnd);

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("pixelTransitionStart", onTransitionStart);
      document.removeEventListener("pixelTransitionEnd", onTransitionEnd);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      tabIndex={-1}
    />
  );
}
