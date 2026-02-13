import { getItem, setItem } from "@/lib/local-storage";

const STORAGE_KEY = "avail-docs-recent-pages";
const MAX_ITEMS = 5;

export interface RecentPage {
  url: string;
  title: string;
  visitedAt: number;
}

export function getRecentPages(): RecentPage[] {
  try {
    const raw = getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentPage[];
  } catch {
    return [];
  }
}

export function addRecentPage(url: string, title: string): void {
  try {
    const pages = getRecentPages().filter((p) => p.url !== url);
    pages.unshift({ url, title, visitedAt: Date.now() });
    setItem(STORAGE_KEY, JSON.stringify(pages.slice(0, MAX_ITEMS)));
  } catch {
    // silently no-op
  }
}

export function clearRecentPages(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // silently no-op
  }
}

const SEGMENT_OVERRIDES: Record<string, string> = {
  "nexus-sdk": "Nexus SDK",
  "api-reference": "API Reference",
  "user-guides": "User Guides",
  operate: "Operate",
  da: "DA",
};

function titleCase(segment: string): string {
  return (
    SEGMENT_OVERRIDES[segment] ??
    segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

/** Derives breadcrumb labels from a docs URL, excluding `/docs` prefix and final segment. */
export function deriveBreadcrumbs(url: string): string[] {
  const segments = url.split("/").filter(Boolean);
  // Remove "docs" prefix and final segment (the page itself)
  const middle = segments.slice(1, -1);
  return middle.map(titleCase);
}
