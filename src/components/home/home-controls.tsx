"use client";

import { useTheme } from "next-themes";
import { OffsetShadow } from "@/components/home/offset-shadow";
import { SearchBar } from "@/components/layout/search-bar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  SearchDialog,
  useSearchDialog,
} from "@/components/search/search-dialog";

export function HomeControls() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { open, setOpen, openWithClick } = useSearchDialog();

  const wrapWithShadow = (
    children: React.ReactNode,
    context: { popoverOpen: boolean; isCaret: boolean },
  ) => (
    <OffsetShadow
      active={context.isCaret && context.popoverOpen}
      className={!context.isCaret && context.popoverOpen ? "z-[1]" : undefined}
    >
      {children}
    </OffsetShadow>
  );

  return (
    <>
      <div className="flex items-center justify-center gap-3 px-6 pb-12 md:pb-16">
        <OffsetShadow className="flex-1 max-w-[484px]">
          <SearchBar className="w-full" onClick={openWithClick} />
        </OffsetShadow>

        <ThemeToggle
          theme={theme ?? "system"}
          resolvedTheme={resolvedTheme ?? "light"}
          setTheme={setTheme}
          buttonWrapper={wrapWithShadow}
        />
      </div>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
