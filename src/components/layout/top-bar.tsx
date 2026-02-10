"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "../ui/skeleton";
import {
  SearchDialog,
  useSearchDialog,
} from "@/components/search/search-dialog";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { AccountMenu } from "./account-menu";
import { ProductSwitcher } from "./product-switcher";
import { AvailLogo } from "@/components/logos/avail-logo";

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
    href: "/docs/da/welcome-to-avail-docs",
  },
];

export default function Topbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [palette, setPalette] = useState<string>("default");
  const prevPaletteClass = useRef<string | null>(null);
  const isMobile = useIsMobile();
  const { open: searchOpen, setOpen: setSearchOpen } = useSearchDialog();
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/docs/da") || pathname.startsWith("/docs/nexus");

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
          {/* Left: Logo / Product Switcher */}
          <div className="flex items-center gap-x-6">
            <div className="hidden sm:block">
              {isProductPage ? (
                <ProductSwitcher />
              ) : (
                <Link href="/" className="inline-flex items-center cursor-pointer text-[#006BF4] dark:text-foreground">
                  <AvailLogo />
                </Link>
              )}
            </div>
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

          {/* Right: Account */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <AccountMenu
                theme={resolvedTheme ?? "light"}
                setTheme={setTheme}
              />
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
