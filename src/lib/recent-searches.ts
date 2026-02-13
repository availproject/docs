import { getItem, setItem } from "@/lib/local-storage";

const STORAGE_KEY = "avail-docs-recent-searches";
const MAX_ITEMS = 3;

export interface RecentSearch {
  query: string;
  searchedAt: number;
}

export function getRecentSearches(): RecentSearch[] {
  try {
    const raw = getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentSearch[];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  try {
    const searches = getRecentSearches().filter(
      (s) => s.query.toLowerCase() !== query.toLowerCase(),
    );
    searches.unshift({ query, searchedAt: Date.now() });
    setItem(STORAGE_KEY, JSON.stringify(searches.slice(0, MAX_ITEMS)));
  } catch {
    // silently no-op
  }
}

export function clearRecentSearches(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // silently no-op
  }
}
