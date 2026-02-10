"use client";

import * as React from "react";
import { SearchResultItem } from "@/components/search/search-result-item";
import {
  getRecentSearches,
  type RecentSearch,
} from "@/lib/recent-searches";

interface RecentSearchesProps {
  onSelect: (query: string) => void;
}

export function RecentSearches({ onSelect }: RecentSearchesProps) {
  const [searches, setSearches] = React.useState<RecentSearch[]>([]);

  React.useEffect(() => {
    setSearches(getRecentSearches());
  }, []);

  if (searches.length === 0) return null;

  return (
    <div className="flex flex-col gap-0.5">
      {searches.map((item) => (
        <SearchResultItem
          key={item.query}
          value={`recent-search-${item.query}`}
          onSelect={() => onSelect(item.query)}
        >
          <span className="ui-16 text-search-results-foreground-primary">
            {item.query}
          </span>
        </SearchResultItem>
      ))}
    </div>
  );
}
