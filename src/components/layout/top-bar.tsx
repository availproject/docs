"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "../ui/skeleton";

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

export default function Topbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [palette, setPalette] = useState<string>("default");
  const prevPaletteClass = useRef<string | null>(null);
  const isMobile = useIsMobile();

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
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="h-(--header-height) px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-x-6">
          <Link href="/" className={cn("cursor-pointer hidden sm:block")}>
            <Image
              src="/new_logo.svg"
              alt="Avail Docs"
              width={100}
              height={100}
              className="h-8 w-auto dark:hidden block"
            />
            <Image
              src="/avail_light.svg"
              alt="Avail Docs"
              width={100}
              height={100}
              className="h-8 w-auto hidden dark:block"
            />
          </Link>
          <MobileNav
            items={topItems}
            componentItems={[]}
            className="block lg:hidden"
          />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors hidden lg:inline-block"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
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
  );
}
