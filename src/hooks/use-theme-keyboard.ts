"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { pixelTransition } from "@/lib/pixel-transition";

/**
 * Toggles the theme when the "T" key is pressed,
 * with a pixel transition effect from the center of the viewport.
 */
export function useThemeKeyboard() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        const next = resolvedTheme === "dark" ? "light" : "dark";
        pixelTransition(() => setTheme(next), {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [resolvedTheme, setTheme]);
}
