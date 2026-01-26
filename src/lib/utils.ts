import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TocItem = {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3, etc.
};

// Maintain TOC per-route. Add entries as pages are authored.
// Ids must match the actual heading ids rendered in MDX.
export const TOC_BY_PATH: Record<string, TocItem[]> = {
  "/docs/get-started": [
    { id: "important-note", text: "Important Note", level: 2 },
    { id: "usage", text: "Usage", level: 2 },
    {
      id: "usage-without-shadcn/ui",
      text: "Usage without shadcn/ui",
      level: 2,
    },
  ],
  "/docs/view-components": [
    { id: "view-components", text: "View Components", level: 2 },
  ],
  "/docs/components/fast-bridge": [
    { id: "installation", text: "Installation", level: 2 },
    { id: "usage", text: "Usage", level: 2 },
  ],
  "/docs/components/deposit": [
    { id: "installation", text: "Installation", level: 2 },
    { id: "usage", text: "Usage", level: 2 },
  ],
  "/docs/components/swaps": [
    { id: "installation", text: "Installation", level: 2 },
    { id: "usage-(exact-in)", text: "Usage (Exact In)", level: 2 },
    { id: "usage-(exact-out)", text: "Usage (Exact Out)", level: 2 },
  ],
  "/docs/components/unified-balance": [
    { id: "installation", text: "Installation", level: 2 },
    { id: "usage", text: "Usage", level: 2 },
  ],
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}
