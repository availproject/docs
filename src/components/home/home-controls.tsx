"use client";

import { useTheme } from "next-themes";
import { SearchBar } from "@/components/layout/search-bar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  SearchDialog,
  useSearchDialog,
} from "@/components/search/search-dialog";

export function HomeControls() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { open, setOpen, openWithClick } = useSearchDialog();

  return (
    <>
      <div className="flex items-center justify-center gap-3 px-6 pb-12 md:pb-16">
        <SearchBar
          className="flex-1 max-w-[484px]"
          onClick={openWithClick}
        />
        <ThemeToggle
          theme={theme ?? "system"}
          resolvedTheme={resolvedTheme ?? "light"}
          setTheme={setTheme}
        />
      </div>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
