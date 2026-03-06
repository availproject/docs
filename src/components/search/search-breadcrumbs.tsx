import { CaretRight } from "@phosphor-icons/react";
import * as React from "react";

interface SearchBreadcrumbsProps {
  breadcrumbs: string[];
}

export function SearchBreadcrumbs({ breadcrumbs }: SearchBreadcrumbsProps) {
  let crumbs = breadcrumbs;
  if (crumbs[0] === "Docs") {
    crumbs = crumbs.slice(1);
  }

  if (crumbs.length > 2) {
    crumbs = [crumbs[0], "\u2026", crumbs[crumbs.length - 1]];
  }

  if (crumbs.length === 0) return null;

  return (
    <div className="flex items-center gap-1 mb-1">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={`${index}-${crumb}`}>
          {index > 0 && (
            <CaretRight size={16} className="text-search-foreground" />
          )}
          <span className="ui-16 text-search-foreground">{crumb}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
