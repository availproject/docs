"use client";

import { List, MagnifyingGlass, Moon, Sun } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { AvailIcon } from "@/components/logos/avail-icon";
import { AvailLogo } from "@/components/logos/avail-logo";
import {
  SearchDialog,
  useSearchDialog,
} from "@/components/search/search-dialog";
import { useSidebar } from "@/components/ui/sidebar";
import { useThemeKeyboard } from "@/hooks/use-theme-keyboard";
import { pixelTransition } from "@/lib/pixel-transition";
import { ProductSwitcher } from "./product-switcher";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";

export default function Topbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [palette, setPalette] = useState<string>("default");
  const prevPaletteClass = useRef<string | null>(null);
  const {
    open: searchOpen,
    setOpen: setSearchOpen,
    openWithClick,
  } = useSearchDialog();
  const { openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const isProductPage =
    pathname.startsWith("/docs/da") || pathname.startsWith("/docs/nexus");

  useThemeKeyboard();

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

  return (
    <>
      <div
        className={`sticky top-0 z-50 bg-navbar-background border-b border-navbar-border transition-shadow duration-500 ease-in-out${openMobile ? " shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""}`}
      >
        <div className="relative h-18 px-4 lg:px-10 flex items-center justify-between gap-4">
          {/* Left: Sidebar trigger + Logo */}
          <div className="flex items-center gap-x-3 lg:gap-x-6">
            {/* Mobile sidebar trigger */}
            <button
              type="button"
              className="lg:hidden extend-touch-target flex items-center justify-center size-10"
              onClick={() => setOpenMobile(true)}
              aria-label="Open navigation"
            >
              <List size={24} weight="regular" />
            </button>

            {isProductPage ? (
              <ProductSwitcher />
            ) : (
              <>
                <Link
                  href="/"
                  className="hidden lg:inline-flex items-center cursor-pointer text-[#006BF4] dark:text-foreground"
                >
                  <AvailLogo />
                </Link>
                <Link
                  href="/"
                  className="lg:hidden inline-flex items-center"
                  aria-label="Avail home"
                >
                  <AvailIcon className="size-6 text-[#006BF4] dark:text-foreground" />
                </Link>
              </>
            )}
          </div>

          {/* Center: Desktop search + theme toggle */}
          <div className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
            <SearchBar onClick={openWithClick} />
            <ThemeToggle
              theme={theme ?? "system"}
              resolvedTheme={resolvedTheme ?? "light"}
              setTheme={setTheme}
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Mobile search trigger */}
            <button
              type="button"
              className="lg:hidden extend-touch-target flex items-center justify-center size-10"
              onClick={openWithClick}
              aria-label="Search documentation"
            >
              <MagnifyingGlass size={20} weight="regular" />
            </button>

            {/* Mobile theme toggle */}
            <button
              type="button"
              className="lg:hidden extend-touch-target flex items-center justify-center size-10"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const next = resolvedTheme === "dark" ? "light" : "dark";
                pixelTransition(() => setTheme(next), {
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                });
              }}
              aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
            >
              {resolvedTheme === "dark" ? (
                <Moon size={20} weight="regular" />
              ) : (
                <Sun size={20} weight="regular" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
