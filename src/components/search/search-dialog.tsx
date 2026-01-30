"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, ChevronDown, Check } from "lucide-react";
import { useDocsSearch } from "fumadocs-core/search/client";
import type { SortedResult } from "fumadocs-core/search";
import {
  CommandDialog,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "/docs/nexus", label: "Nexus" },
  { value: "/docs/DA", label: "Data Availability" },
  { value: "/docs/user-guides", label: "User Guides" },
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
    // Extract base page URL (remove hash fragments)
    const baseUrl = result.url.split("#")[0];

    if (result.type === "page") {
      // This is a page-level result
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
      // This is a heading or text result - add to parent group
      let group = groups.get(baseUrl);
      if (!group) {
        // Create a placeholder group if page result hasn't been seen
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

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [filter, setFilter] = React.useState<FilterValue>("all");
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
  const results = groupResultsByPage(filteredResults);
  const isLoading = query.isLoading;
  const hasQuery = search.trim().length > 0;

  // Get current filter label
  const currentFilterLabel =
    FILTER_OPTIONS.find((opt) => opt.value === filter)?.label ?? "All";

  // Reset search and filter when dialog closes
  React.useEffect(() => {
    if (!open) {
      setSearch("");
      setFilter("all");
      lastTrackedQuery.current = "";
    }
  }, [open, setSearch]);

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
    onOpenChange(false);
    router.push(url);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Documentation"
      description="Search for pages, components, and more"
      className="w-150 max-w-[calc(100vw-2rem)] overflow-hidden border-none bg-transparent p-0 shadow-lg"
      showCloseButton={false}
    >
      {/* Search input */}
      <div className="flex h-10 items-center gap-2 border-x border-t border-search-border rounded-t-lg px-3 bg-search-background">
        <Search className="size-5 shrink-0 text-search-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 bg-transparent text-base text-search-foreground-active placeholder:text-search-foreground outline-none"
          autoFocus
        />
        <kbd className="flex h-6 items-center gap-0.5 rounded-sm bg-key-background px-1 pt-0.5 pb-1 text-sm text-key-foreground relative">
          <span>ESC</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-key-underline" />
        </kbd>
      </div>

      {/* Results */}
      <CommandList className="max-h-80 border-x border-t border-search-border px-3 py-4 bg-search-background overflow-y-auto">
        {hasQuery && results.length === 0 && !isLoading && (
          <CommandEmpty className="text-search-foreground py-6 text-center">
            No results found.
          </CommandEmpty>
        )}

        {isLoading && (
          <div className="py-6 text-center text-sm text-search-foreground">
            Searching...
          </div>
        )}

        {/* Grouped results */}
        {results.length > 0 && (
          <div className="flex flex-col gap-4">
            {results.map((group, groupIndex) => (
              <div key={group.id} className="flex flex-col gap-2">
                {/* Page header with breadcrumbs */}
                <button
                  type="button"
                  onClick={() => handleSelect(group.url, group.title, groupIndex)}
                  className={cn(
                    "w-full text-left p-2 rounded-sm transition-colors",
                    groupIndex === 0
                      ? "bg-search-results-background-hover"
                      : "hover:bg-search-results-background-hover",
                  )}
                >
                  {/* Breadcrumbs */}
                  {group.breadcrumbs.length > 0 && (
                    <div className="flex items-center gap-1 mb-1">
                      {group.breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <ChevronRight className="size-4 text-search-foreground" />
                          )}
                          <span className="text-sm text-search-foreground">
                            {crumb}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {/* Page title */}
                  <span className="text-base text-search-results-foreground-primary">
                    {group.title}
                  </span>
                </button>

                {/* Child results (headings/text) */}
                {group.children.length > 0 && (
                  <div className="flex gap-1">
                    {/* Vertical connector line */}
                    <div className="w-2 shrink-0 border-l-2 border-border ml-2" />
                    {/* Child items */}
                    <div className="flex flex-col flex-1 gap-2">
                      {group.children.map((child, childIndex) => (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() =>
                            handleSelect(
                              child.url,
                              child.content,
                              groupIndex * 100 + childIndex + 1
                            )
                          }
                          className={cn(
                            "w-full text-left p-2 rounded-sm transition-colors",
                            "text-search-results-foreground",
                            "hover:bg-search-results-background-hover",
                          )}
                        >
                          {child.type === "heading"
                            ? `# ${child.content}`
                            : child.content}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CommandList>

      {/* Footer */}
      <div className="flex h-10 items-center justify-between border border-search-border rounded-b-lg px-3 bg-search-background">
        <div className="flex items-center gap-4">
          <span className="text-sm text-search-foreground">Filter</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-search-foreground hover:text-search-foreground-active transition-colors"
              >
                {currentFilterLabel}
                <ChevronDown className="size-4" />
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
                  {filter === option.value && <Check className="size-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
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
