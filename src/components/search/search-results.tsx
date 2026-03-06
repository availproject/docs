"use client";

import { SearchBreadcrumbs } from "@/components/search/search-breadcrumbs";
import { SearchResultItem } from "@/components/search/search-result-item";

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

interface SearchResultsProps {
  results: GroupedResult[];
  search: string;
  onSelect: (url: string, title: string, position: number) => void;
}

/**
 * Returns true when the page title already contains the search query,
 * meaning child results (headings/text) would be redundant noise.
 */
function titleMatchesQuery(title: string, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  return title.toLowerCase().includes(q);
}

export function SearchResults({
  results,
  search,
  onSelect,
}: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {results.map((group, groupIndex) => (
        <div key={group.id} className="flex flex-col gap-2">
          {/* Page header with breadcrumbs */}
          <SearchResultItem
            value={group.id}
            onSelect={() => onSelect(group.url, group.title, groupIndex)}
          >
            <SearchBreadcrumbs breadcrumbs={group.breadcrumbs} />
            {/* Page title */}
            <span className="ui-16 text-search-results-foreground-primary">
              {group.title}
            </span>
          </SearchResultItem>

          {/* Child results — only show when the title doesn't match the query */}
          {group.children.length > 0 &&
            !titleMatchesQuery(group.title, search) && (
              <div className="flex gap-1">
                {/* Vertical connector line */}
                <div className="w-2 shrink-0 border-l-2 border-border ml-2" />
                {/* Child items */}
                <div className="flex flex-col flex-1 gap-2">
                  {group.children.map((child, childIndex) => (
                    <SearchResultItem
                      key={child.id}
                      value={child.id}
                      onSelect={() =>
                        onSelect(
                          child.url,
                          child.content,
                          groupIndex * 100 + childIndex + 1,
                        )
                      }
                      className="ui-16 text-search-results-foreground"
                    >
                      {child.type === "heading"
                        ? `# ${child.content}`
                        : child.content}
                    </SearchResultItem>
                  ))}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
