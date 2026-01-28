"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "../ui/skeleton";
import { Search, Sun, Moon, ChevronDown } from "lucide-react";
import {
  SearchDialog,
  useSearchDialog,
} from "@/components/search/search-dialog";

const ThemeControl = dynamic(
  () => import("./theme-control").then((m) => m.default),
  {
    loading: () => <Skeleton className="w-24 h-9" />,
  },
);

const MobileNav = dynamic(() => import("./mobile-nav").then((m) => m.default), {
  loading: () => <Skeleton className="w-24 h-9" />,
});

const NAV_ITEMS = [
  {
    id: "docs",
    label: "Docs",
    href: "/docs",
  },
];

// Search bar component matching Figma design
function SearchBar({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 items-center gap-2 px-3 bg-search-background border border-search-border text-search-foreground w-[342px] hover:bg-search-background-hover transition-colors",
        className,
      )}
      onClick={onClick}
    >
      <Search className="size-5 shrink-0" />
      <span className="flex-1 text-left text-base">Search...</span>
      <kbd className="relative flex h-6 items-center gap-0.5 bg-key-background px-1 pt-0.5 pb-1 text-sm text-key-foreground">
        <span>S</span>
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-key-underline" />
      </kbd>
    </button>
  );
}

// Theme toggle button matching Figma design
function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  const isDark = theme === "dark";

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex h-10 items-center gap-2 px-3 bg-menu-item-background border border-menu-item-border border-r-0"
      >
        {isDark ? (
          <Moon className="size-5 text-sidebar-item-foreground" />
        ) : (
          <Sun className="size-5 text-sidebar-item-foreground" />
        )}
      </button>
      <button
        type="button"
        className="flex h-10 items-center px-2 bg-menu-item-background border border-menu-item-border"
      >
        <ChevronDown className="size-5 text-sidebar-item-foreground" />
      </button>
    </div>
  );
}

export default function Topbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [palette, setPalette] = useState<string>("default");
  const prevPaletteClass = useRef<string | null>(null);
  const isMobile = useIsMobile();
  const { open: searchOpen, setOpen: setSearchOpen } = useSearchDialog();

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("palette") as string) || "default";
      setPalette(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("palette", palette);
    } catch {}
  }, [palette]);

  useEffect(() => {
    const root = document.documentElement;
    if (prevPaletteClass.current) {
      root.classList.remove(prevPaletteClass.current);
      prevPaletteClass.current = null;
    }

    if (
      palette !== "default" &&
      (resolvedTheme === "light" || resolvedTheme === "dark")
    ) {
      const cls = `${resolvedTheme}-${palette}`;
      root.classList.add(cls);
      prevPaletteClass.current = cls;
    }
  }, [palette, resolvedTheme]);

  const topItems = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: item.label,
  }));

  return (
    <>
      <div className="sticky top-0 z-40 bg-navbar-background border-b border-navbar-border">
        <div className="h-18 px-10 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-x-6">
            <Link href="/" className={cn("cursor-pointer hidden sm:block")}>
              <Image
                src="/new_logo.svg"
                alt="Nexus"
                width={84}
                height={32}
                className="h-8 w-auto dark:hidden block"
              />
              <Image
                src="/avail_light.svg"
                alt="Nexus"
                width={84}
                height={32}
                className="h-8 w-auto hidden dark:block"
              />
            </Link>
            <MobileNav
              items={topItems}
              componentItems={[]}
              className="block lg:hidden"
            />
          </div>

          {/* Center: Search + Theme toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <SearchBar onClick={() => setSearchOpen(true)} />
            <ThemeToggle theme={resolvedTheme ?? "light"} setTheme={setTheme} />
          </div>

          {/* Right: Account (placeholder) */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 h-10 px-3">
              <div className="size-6 rounded-full bg-sidebar-item-foreground overflow-hidden">
                <Image
                  src="/avatar-placeholder.png"
                  alt="User"
                  width={24}
                  height={24}
                  className="size-full object-cover"
                  onError={(e) => {
                    // Hide if no avatar exists
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-base text-foreground">faraday.eth</span>
              <ChevronDown className="size-5 text-sidebar-item-foreground" />
            </div>
            {/* Mobile theme control */}
            <div className="lg:hidden">
              <ThemeControl
                theme={theme ?? ""}
                setTheme={setTheme}
                palette={palette}
                setPalette={setPalette}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
