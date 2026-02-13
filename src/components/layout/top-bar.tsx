"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
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

const ThemeControl = dynamic(
  () => import("./theme-control").then((m) => m.default),
  {
    loading: () => <Skeleton className="w-24 h-9" />,
  },
);

const MobileNav = dynamic(() => import("./mobile-nav").then((m) => m.default), {
  loading: () => <Skeleton className="w-24 h-9" />,
});


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

  return (
    <>
      <div className="sticky top-0 z-40 bg-navbar-background border-b border-navbar-border">
        <div className="h-18 px-10 flex items-center justify-between gap-4">
          {/* Left: Logo + Mobile Nav */}
          <div className="flex items-center gap-x-6">
            <Link href="/" className={cn("cursor-pointer hidden sm:block")}>
              <Image
                src="/new-avail-docs-logo.svg"
                alt="Nexus"
                width={84}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <MobileNav
              items={[
                { href: "/docs/nexus/introduction-to-nexus", label: "Nexus" },
                { href: "/docs/da", label: "Data Availability" },
              ]}
              componentItems={[]}
              className="block lg:hidden"
            />
          </div>

          {/* Right: Search + Theme toggle */}
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
