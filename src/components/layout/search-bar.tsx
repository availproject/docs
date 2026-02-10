"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onClick?: () => void;
}

export function SearchBar({ className, onClick }: SearchBarProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 items-center gap-2 px-3 bg-search-background border border-search-border text-search-foreground w-85.5 hover:bg-search-background-hover transition-colors",
        className,
      )}
      onClick={onClick}
    >
      <MagnifyingGlass size={20} className="shrink-0" />
      <span className="ui-16 flex-1 text-left">Search...</span>
      <kbd className="relative flex h-6 items-center gap-0.5 bg-key-background px-1 pt-0.5 pb-1 text-sm leading-[18px] text-key-foreground">
        <span>S</span>
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-key-underline" />
      </kbd>
    </button>
  );
}
