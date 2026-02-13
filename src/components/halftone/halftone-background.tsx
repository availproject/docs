"use client";

import { useEffect, useRef } from "react";
import type { GridPosition, RenderContext } from "@/lib/halftone-animations";
import { renderFlow } from "@/lib/halftone-animations";
import { SimplexNoise } from "@/lib/simplex-noise";

// --- Grid constants ---
const PIXEL_SIZE = 2;
const GAP = 4;
const CELL_SIZE = PIXEL_SIZE + GAP;

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

function buildGrid(width: number, height: number): GridPosition[] {
  const positions: GridPosition[] = [];
  for (let y = CELL_SIZE / 2; y < height; y += CELL_SIZE) {
    for (let x = CELL_SIZE / 2; x < width; x += CELL_SIZE) {
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
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const noise = new SimplexNoise(NOISE_SEED);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let gridPositions: GridPosition[] = [];
    let width = 0;
    let height = 0;
    let rafId: number | undefined;
    let time = 0;
    let palette = isDarkMode() ? DARK_PALETTE : LIGHT_PALETTE;

    const observer = new MutationObserver(() => {
      palette = isDarkMode() ? DARK_PALETTE : LIGHT_PALETTE;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridPositions = buildGrid(width, height);
    }

    function renderFrame() {
      const { start, end } = palette;

      const renderContext: RenderContext = {
        noise,
        gridPositions,
        pixelSize: PIXEL_SIZE,
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

      renderFlow(ctx, renderContext, time, FLOW_PARAMS);
    }

    function animate() {
      time += FLOW_PARAMS.speed * 16.67;
      renderFrame();
      rafId = requestAnimationFrame(animate);
    }

    resize();

    if (prefersReducedMotion) {
      renderFrame();
    } else {
      animate();
    }

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      observer.disconnect();
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      tabIndex={-1}
    />
  );
}
