"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CaretLeft, CaretDown, Check } from "@phosphor-icons/react";
import { useDocsSearch } from "fumadocs-core/search/client";
import type { SortedResult } from "fumadocs-core/search";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { SearchResults } from "@/components/search/search-results";
import { RecentSearches } from "@/components/search/recent-searches";
import { RecentsView } from "@/components/search/recents-view";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAnalytics } from "@/hooks/use-analytics";
import { addRecentSearch } from "@/lib/recent-searches";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "/docs/nexus", label: "Nexus" },
  { value: "/docs/da", label: "Data Availability" },
  { value: "/docs/da/user-guides", label: "User Guides" },
] as const;

type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

interface GroupedResult {
  id: string;
  url: string;
  title: string;
  breadcrumbs: string[];
  children: Array<{
    id: string;
    url: string;
    content: string;
    type: "heading" | "text";
  }>;
}

/**
 * Groups flat search results by their parent page for hierarchical display
 */
function groupResultsByPage(results: SortedResult[]): GroupedResult[] {
  const groups = new Map<string, GroupedResult>();

  for (const result of results) {
    const baseUrl = result.url.split("#")[0];

    if (result.type === "page") {
      if (!groups.has(baseUrl)) {
        groups.set(baseUrl, {
          id: result.id,
          url: result.url,
          title: result.content,
          breadcrumbs: result.breadcrumbs ?? [],
          children: [],
        });
      }
    } else {
      let group = groups.get(baseUrl);
      if (!group) {
        group = {
          id: `page-${baseUrl}`,
          url: baseUrl,
          title: result.breadcrumbs?.[result.breadcrumbs.length - 1] ?? "Page",
          breadcrumbs: result.breadcrumbs?.slice(0, -1) ?? [],
          children: [],
        };
        groups.set(baseUrl, group);
      }
      group.children.push({
        id: result.id,
        url: result.url,
        content: result.content,
        type: result.type as "heading" | "text",
      });
    }
  }

  return Array.from(groups.values());
}

/**
 * Re-ranks grouped results so pages whose title matches the query
 * appear above pages that only mention the term in body content.
 */
function rankGroups(groups: GroupedResult[], query: string): GroupedResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return groups;

  return [...groups].sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

    const score = (title: string) =>
      title === q ? 0 : title.startsWith(q) ? 1 : title.includes(q) ? 2 : 3;

    return score(aTitle) - score(bTitle);
  });
}

type ViewMode = "search" | "recents";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [filter, setFilter] = React.useState<FilterValue>("all");
  const [viewMode, setViewMode] = React.useState<ViewMode>("search");
  const [selectedValue, setSelectedValue] = React.useState("");
  const { trackEvent, pathname } = useAnalytics();
  const lastTrackedQuery = React.useRef<string>("");

  // Use Fumadocs search hook
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api: "/api/search",
    delayMs: 200,
  });

  // Filter and group results
  const rawResults = query.data && query.data !== "empty" ? query.data : [];
  const filteredResults =
    filter === "all"
      ? rawResults
      : rawResults.filter((r) => r.url.startsWith(filter));
  const results = rankGroups(groupResultsByPage(filteredResults), search);
  const isLoading = query.isLoading;
  const hasQuery = search.trim().length > 0;

  // Get current filter label
  const currentFilterLabel =
    FILTER_OPTIONS.find((opt) => opt.value === filter)?.label ?? "All";

  // Reset search, filter, and view mode when dialog closes
  React.useEffect(() => {
    if (!open) {
      setSearch("");
      setFilter("all");
      setViewMode("search");
      setSelectedValue("");
      lastTrackedQuery.current = "";
    }
  }, [open, setSearch]);

  // Tab key toggles between search and history views
  React.useEffect(() => {
    if (!open) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        setViewMode((v) => (v === "search" ? "recents" : "search"));
        setSelectedValue("");
        requestAnimationFrame(() => {
          const input = document.querySelector<HTMLInputElement>("[cmdk-input]");
          input?.focus();
        });
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  // Track search query when results are loaded
  React.useEffect(() => {
    if (
      hasQuery &&
      !isLoading &&
      search !== lastTrackedQuery.current &&
      search.trim().length >= 2
    ) {
      trackEvent("search_query_submitted", {
        query: search,
        results_count: filteredResults.length,
        page_path: pathname,
      });
      lastTrackedQuery.current = search;
    }
  }, [search, isLoading, hasQuery, filteredResults.length, trackEvent, pathname]);

  const handleSelect = (url: string, title: string, position: number) => {
    trackEvent("search_result_clicked", {
      result_position: position,
      result_title: title,
      result_path: url,
      query: search,
      page_path: pathname,
    });
    addRecentSearch(search);
    onOpenChange(false);
    router.push(url);
  };

  const handleRecentSearchSelect = (query: string) => {
    trackEvent("recent_search_clicked", {
      query,
      page_path: pathname,
    });
    setSearch(query);
  };

  const handleRecentPageSelect = (url: string, title: string) => {
    trackEvent("recent_page_clicked", {
      result_title: title,
      result_path: url,
      page_path: pathname,
    });
    onOpenChange(false);
    router.push(url);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      value={selectedValue}
      onValueChange={setSelectedValue}
      title="Search Documentation"
      description="Search for pages, components, and more"
      className="w-150 max-w-[calc(100vw-2rem)] overflow-hidden border-none bg-transparent p-0 shadow-lg rounded-none [&_[data-slot=command]]:rounded-none [&_[data-slot=command-input-wrapper]]:h-10 [&_[data-slot=command-input-wrapper]]:border-x [&_[data-slot=command-input-wrapper]]:border-t [&_[data-slot=command-input-wrapper]]:border-b-0 [&_[data-slot=command-input-wrapper]]:border-search-border [&_[data-slot=command-input-wrapper]]:bg-search-background [&_[data-slot=command-input-wrapper]]:rounded-none [&_[data-slot=command-input-wrapper]_svg]:size-5 [&_[data-slot=command-input-wrapper]_svg]:text-search-foreground [&_[data-slot=command-input-wrapper]_svg]:opacity-100"
      showCloseButton={false}
      shouldFilter={false}
    >
      {/* Recents view header — back button + ESC key */}
      {viewMode === "recents" && (
        <div className="flex h-10 items-center justify-between border-x border-t border-search-border bg-search-background px-3">
          <button
            type="button"
            onClick={() => {
              setViewMode("search");
              setSelectedValue("");
              requestAnimationFrame(() => {
                const input = document.querySelector<HTMLInputElement>("[cmdk-input]");
                input?.focus();
              });
            }}
            className="flex items-center gap-1 text-search-foreground hover:text-search-foreground-active transition-colors"
          >
            <CaretLeft size={16} />
            <span className="ui-16">History</span>
          </button>
          <kbd className="flex h-6 items-center gap-0.5 rounded-sm bg-key-background px-1 pt-0.5 pb-1 text-sm text-key-foreground relative">
            <span>ESC</span>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-key-underline" />
          </kbd>
        </div>
      )}

      {/* Search input — hidden in recents mode but kept in DOM for cmdk */}
      <div className={viewMode === "recents" ? "h-0 overflow-hidden" : ""}>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Search..."
          className="ui-16 flex-1 bg-transparent text-search-foreground-active placeholder:text-search-foreground outline-none"
          autoFocus
          suffix={
            <kbd className="flex h-6 items-center gap-0.5 rounded-sm bg-key-background px-1 pt-0.5 pb-1 text-sm text-key-foreground relative">
              <span>ESC</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-key-underline" />
            </kbd>
          }
        />
      </div>

      {/* Content area */}
      <CommandList className="max-h-80 border-x border-t border-search-border px-3 py-2 bg-search-background overflow-y-auto">
        {viewMode === "search" ? (
          <>
            {/* Recent searches (empty state — no recently viewed here) */}
            {!hasQuery && !isLoading && (
              <RecentSearches onSelect={handleRecentSearchSelect} />
            )}

            {hasQuery && results.length === 0 && !isLoading && (
              <div className="ui-16 text-search-foreground py-6 text-center">
                No results found.
              </div>
            )}

            {isLoading && (
              <div className="ui-16 py-6 text-center text-search-foreground">
                Searching...
              </div>
            )}

            {/* Grouped search results */}
            <SearchResults
              results={results}
              search={search}
              onSelect={handleSelect}
            />
          </>
        ) : (
          <RecentsView onSelect={handleRecentPageSelect} />
        )}
      </CommandList>

      {/* Footer — only in search mode */}
      {viewMode === "search" && (
        <div className="flex h-10 items-center justify-between border border-search-border rounded-none px-3 bg-search-background">
          <div className="flex items-center gap-4">
            <span className="ui-16 text-search-foreground">Filter</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="ui-16 flex items-center gap-1 text-search-foreground hover:text-search-foreground-active transition-colors"
                >
                  {currentFilterLabel}
                  <CaretDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-40">
                {FILTER_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className="flex items-center justify-between"
                  >
                    {option.label}
                    {filter === option.value && <Check size={16} />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            type="button"
            onClick={() => setViewMode("recents")}
            className="ui-16 text-search-foreground hover:text-search-foreground-active transition-colors"
          >
            History
          </button>
        </div>
      )}
    </CommandDialog>
  );
}

// Hook for keyboard shortcut
export function useSearchDialog() {
  const [open, setOpen] = React.useState(false);
  const { trackEvent, pathname } = useAnalytics();

  const handleOpen = React.useCallback(
    (triggerType: "keyboard" | "click") => {
      trackEvent("search_dialog_opened", {
        trigger_type: triggerType,
        page_path: pathname,
      });
      setOpen(true);
    },
    [trackEvent, pathname]
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && !e.metaKey && !e.ctrlKey) {
        // Check if user is typing in an input
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        handleOpen("keyboard");
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpen("keyboard");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [handleOpen]);

  const openWithClick = React.useCallback(() => {
    handleOpen("click");
  }, [handleOpen]);

  return { open, setOpen, openWithClick };
}
