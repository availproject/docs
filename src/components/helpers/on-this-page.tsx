"use client";

import { List } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import React from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn, TOC_BY_PATH } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PageActions } from "./page-actions";

type TocEntry = {
  title?: React.ReactNode;
  url: string;
  depth: number;
};

// Must exceed scroll-margin on headings (112px for h2–h5, 128px for .steps h3)
const TOC_SCROLL_OFFSET_PX = 140;
// How long after last scroll event before we consider scroll "settled"
const SCROLL_IDLE_MS = 150;

function useActiveItem(
  itemIds: string[],
  overrideId: string | null,
  clearOverride: () => void,
) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const overrideRef = React.useRef(overrideId);
  overrideRef.current = overrideId;

  // Immediately apply click override
  React.useEffect(() => {
    if (overrideId) setActiveId(overrideId);
  }, [overrideId]);

  React.useEffect(() => {
    if (!itemIds.length) return;

    let rafId = 0;
    let idleTimer = 0;

    function scan() {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;

      // Near bottom of page — activate last item
      if (scrollY + innerHeight >= docHeight - 30) {
        setActiveId(itemIds[itemIds.length - 1]);
        return;
      }

      // Find last heading that has scrolled past the offset
      let found: string | null = null;
      for (const id of itemIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= TOC_SCROLL_OFFSET_PX) {
          found = id;
        }
      }

      // Default to first item when at top of page
      setActiveId(found ?? itemIds[0]);
    }

    function onScroll() {
      if (overrideRef.current) {
        // During click override: don't scan, but detect when scroll settles
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          clearOverride();
        }, SCROLL_IDLE_MS);
        return;
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(scan);
    }

    // Initial scan on mount (handles page load with hash)
    if (!overrideRef.current) scan();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      window.clearTimeout(idleTimer);
    };
  }, [itemIds, clearOverride]);

  return activeId;
}

function useRouteToc(): TocEntry[] {
  const pathname = usePathname();
  return React.useMemo<TocEntry[]>(() => {
    if (!pathname) return [];
    const key = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const routeToc = TOC_BY_PATH[key] ?? [];
    return routeToc.map((h) => ({
      title: h.text,
      url: `#${h.id}`,
      depth: h.level,
    }));
  }, [pathname]);
}

type OnThisPageProps = {
  toc?: TocEntry[];
  variant?: "dropdown" | "list";
  className?: string;
  showActions?: boolean;
  pageContent?: string;
};

export function OnThisPage({
  toc: tocProp,
  variant = "list",
  className,
  showActions = true,
  pageContent,
}: Readonly<OnThisPageProps>) {
  const routeToc = useRouteToc();
  const toc = React.useMemo<TocEntry[]>(
    () => (tocProp?.length ? tocProp : routeToc),
    [tocProp, routeToc],
  );
  const [open, setOpen] = React.useState(false);
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const [clickedId, setClickedId] = React.useState<string | null>(null);
  const clearOverride = React.useCallback(() => setClickedId(null), []);
  const activeHeading = useActiveItem(itemIds, clickedId, clearOverride);
  const { trackEvent } = useAnalytics();

  const handleTocClick = React.useCallback(
    (item: TocEntry) => {
      const headingId = item.url.replace("#", "");
      setClickedId(headingId);
      trackEvent("nav_toc_heading_clicked", {
        heading_text: typeof item.title === "string" ? item.title : headingId,
        heading_level: item.depth,
        heading_id: headingId,
      });
    },
    [trackEvent],
  );

  const tocContainerRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    top: 14,
    height: 12,
  });

  // Update indicator position when active heading changes
  React.useEffect(() => {
    if (!tocContainerRef.current || !activeHeading) return;

    const activeLink = tocContainerRef.current.querySelector(
      `a[data-active="true"]`,
    ) as HTMLElement | null;

    if (activeLink) {
      activeLink.scrollIntoView({ block: "nearest", behavior: "smooth" });

      const containerRect = tocContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      const top = linkRect.top - containerRect.top + (linkRect.height - 12) / 2;

      setIndicatorStyle({ top, height: 12 });
    }
  }, [activeHeading]);

  if (variant === "dropdown") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 md:h-7", className)}
          >
            <List size={16} className="mr-2" />
            On This Page
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="no-scrollbar max-h-[70svh]">
          <div className="flex flex-col">
            {toc.map((item) => (
              <a
                key={item.url}
                href={item.url}
                onClick={() => setOpen(false)}
                data-depth={item.depth}
                className="text-muted-foreground hover:text-foreground data-[depth=3]:pl-6 data-[depth=4]:pl-8 py-1.5 text-sm"
              >
                {item.title}
              </a>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Table of Contents - scrollable */}
      {toc?.length > 0 && (
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <div ref={tocContainerRef} className="relative flex items-start">
            {/* Track + indicator wrapper */}
            <div className="relative flex w-[8px] shrink-0 self-stretch items-center justify-center">
              {/* Vertical line track - stretches with content */}
              <div className="absolute top-0 bottom-0 w-px bg-border" />

              {/* Blue active indicator - positioned based on actual element position */}
              <div
                className="absolute w-[5px] bg-brand transition-all duration-200"
                style={{
                  top: `${indicatorStyle.top}px`,
                  height: `${indicatorStyle.height}px`,
                }}
              />
            </div>

            <div className="flex flex-1 flex-col items-start">
              {toc.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={() => handleTocClick(item)}
                  className={cn(
                    "flex min-h-10 items-center px-4 py-2.5 text-base leading-5 no-underline transition-colors w-full",
                    item.url === `#${activeHeading}`
                      ? "text-page-nav-foreground-active"
                      : "text-page-nav-foreground hover:text-page-nav-foreground-hover",
                    item.depth === 3 && "pl-8",
                    item.depth === 4 && "pl-12",
                  )}
                  data-active={item.url === `#${activeHeading}`}
                  data-depth={item.depth}
                >
                  <span className="flex-1">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions - pinned at bottom */}
      {showActions && <PageActions pageContent={pageContent} />}
    </div>
  );
}
