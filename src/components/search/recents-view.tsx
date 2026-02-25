"use client";

import { CaretRight } from "@phosphor-icons/react";
import * as React from "react";
import { SearchResultItem } from "@/components/search/search-result-item";
import {
  deriveBreadcrumbs,
  getRecentPages,
  type RecentPage,
} from "@/lib/recent-pages";

interface RecentsViewProps {
  onSelect: (url: string, title: string) => void;
}

export function RecentsView({ onSelect }: RecentsViewProps) {
  const [pages, setPages] = React.useState<RecentPage[]>([]);

  React.useEffect(() => {
    setPages(getRecentPages());
  }, []);

  if (pages.length === 0) {
    return (
      <div className="ui-16 text-search-foreground py-6 text-center">
        No pages in history.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {pages.map((page) => {
        const breadcrumbs = deriveBreadcrumbs(page.url);
        return (
          <SearchResultItem
            key={page.url}
            value={`recent-page-${page.url}`}
            onSelect={() => onSelect(page.url, page.title)}
          >
            {breadcrumbs.length > 0 && (
              <div className="flex items-center gap-1 mb-1">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <CaretRight
                        size={16}
                        className="text-search-foreground"
                      />
                    )}
                    <span className="ui-16 text-search-foreground">
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
            <span className="ui-16 text-search-results-foreground-primary">
              {page.title}
            </span>
          </SearchResultItem>
        );
      })}
    </div>
  );
}
