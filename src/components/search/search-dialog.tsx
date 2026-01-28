"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  content?: string;
  section?: string;
  subsection?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Debounced search
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`,
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Documentation"
      description="Search for pages, components, and more"
      className="max-w-150 bg-search-background border-search-border"
      showCloseButton={false}
    >
      {/* Search input */}
      <div className="flex h-10 items-center gap-2 border-b border-search-border px-3 bg-search-background">
        <Search className="size-5 shrink-0 text-search-foreground-active" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 bg-transparent text-base text-search-foreground-active placeholder:text-search-foreground-active outline-none"
        />
        <kbd className="flex h-6 items-center gap-0.5 bg-key-background px-1 pt-0.5 pb-1 text-sm text-key-foreground relative">
          <span>ESC</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-key-underline" />
        </kbd>
      </div>

      {/* Results */}
      <CommandList className="max-h-100 p-4 bg-search-background">
        {query && results.length === 0 && !isLoading && (
          <CommandEmpty className="text-search-foreground">
            No results found.
          </CommandEmpty>
        )}

        {isLoading && (
          <div className="py-6 text-center text-sm text-search-foreground">
            Searching...
          </div>
        )}

        {/* Group results by section */}
        {results.length > 0 && (
          <div className="flex flex-col gap-4">
            {results.map((result) => (
              <div key={result.id} className="flex flex-col gap-2">
                {/* Section header */}
                <div className="flex items-center gap-1 px-2">
                  {result.section && (
                    <>
                      <span className="text-sm text-search-foreground">
                        {result.section}
                      </span>
                      {result.subsection && (
                        <>
                          <ChevronRight className="size-4 text-search-foreground" />
                          <span className="text-sm text-search-foreground">
                            {result.subsection}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Result item */}
                <button
                  type="button"
                  onClick={() => handleSelect(result.url)}
                  className={cn(
                    "w-full text-left p-2 text-base transition-colors",
                    "text-search-results-foreground-primary",
                    "hover:bg-search-results-background-hover",
                  )}
                >
                  {result.title}
                </button>

                {/* Content snippet */}
                {result.content && (
                  <div className="border-l-2 border-border ml-2 pl-2">
                    <p className="text-base text-search-results-foreground line-clamp-2">
                      {result.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CommandList>

      {/* Footer */}
      <div className="flex h-10 items-center justify-between border-t border-search-border px-3 bg-search-background">
        <div className="flex items-center gap-4">
          <span className="text-sm text-search-foreground">Filter</span>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-search-foreground"
          >
            All
            <ChevronRight className="size-4 rotate-90" />
          </button>
        </div>
      </div>
    </CommandDialog>
  );
}

// Hook for keyboard shortcut
export function useSearchDialog() {
  const [open, setOpen] = React.useState(false);

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
        setOpen(true);
      }
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}
