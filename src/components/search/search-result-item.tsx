"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

function SearchResultItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "w-full text-left p-2 rounded-sm transition-colors",
        "data-[selected=true]:bg-search-results-background-hover",
        "hover:bg-search-results-background-hover",
        className,
      )}
      {...props}
    />
  );
}

export { SearchResultItem };
