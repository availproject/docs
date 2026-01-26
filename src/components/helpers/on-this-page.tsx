"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn, TOC_BY_PATH } from "@/lib/utils";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type TocEntry = {
  title?: React.ReactNode;
  url: string;
  depth: number;
};

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
      observer.disconnect();
    };
  }, [itemIds]);

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
};

export function OnThisPage({
  toc: tocProp,
  variant = "list",
  className,
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
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  if (variant === "dropdown") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 md:h-7", className)}
          >
            <Menu className="mr-2 size-4" />
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
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
        On This Page
      </p>
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6"
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}
