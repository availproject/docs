"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn, TOC_BY_PATH } from "@/lib/utils";

import {
  List,
  ChatDots,
  Copy,
  FileText,
  Check,
  SpinnerGap,
  CaretRight,
  GithubLogo,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAnalytics } from "@/hooks/use-analytics";

// AI service configurations
const AI_SERVICES = [
  {
    id: "v0",
    name: "Open in v0",
    icon: (
      <svg
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
          fill="currentColor"
        />
        <path
          d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
          fill="currentColor"
        />
      </svg>
    ),
    getUrl: (content: string, title: string) => {
      // v0 uses a different approach - we'll encode content in URL
      const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
      return `https://v0.dev/chat?q=${encodeURIComponent(`Help me understand this documentation:\n\n# ${title}\n\n${content.slice(0, 4000)}`)}`;
    },
  },
  {
    id: "chatgpt",
    name: "Open in ChatGPT",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
    getUrl: (content: string, title: string) => {
      return `https://chat.openai.com/?q=${encodeURIComponent(`Help me understand this documentation:\n\n# ${title}\n\n${content.slice(0, 4000)}`)}`;
    },
  },
  {
    id: "claude",
    name: "Open in Claude",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H4.08v-1.92h8.08v1.291l-4.72 2.726-.08.205.08.128h5.04v1.92H4.709v-1.345zm8.32-8.635h3.2l3.84 11.52h-3.36l-.64-2.24h-3.52l-.64 2.24h-3.2l4.32-11.52zm2.24 6.72l-1.12-3.92h-.08l-1.12 3.92h2.32z" />
      </svg>
    ),
    getUrl: (content: string, title: string) => {
      return `https://claude.ai/new?q=${encodeURIComponent(`Help me understand this documentation:\n\n# ${title}\n\n${content.slice(0, 4000)}`)}`;
    },
  },
] as const;

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

type PageAction = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
};

type OnThisPageProps = {
  toc?: TocEntry[];
  variant?: "dropdown" | "list";
  className?: string;
  showActions?: boolean;
  pageUrl?: string;
  pageContent?: string;
};

export function OnThisPage({
  toc: tocProp,
  variant = "list",
  className,
  showActions = true,
  pageUrl,
  pageContent,
}: Readonly<OnThisPageProps>) {
  const routeToc = useRouteToc();
  const pathname = usePathname();
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

  const [copied, setCopied] = React.useState(false);
  const [isCopyLoading, setIsCopyLoading] = React.useState(false);
  const [isAIMenuOpen, setIsAIMenuOpen] = React.useState(false);
  const [isAILoading, setIsAILoading] = React.useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  // Get the markdown API path from the current pathname
  const getMarkdownApiPath = React.useCallback(() => {
    // Convert /docs/foo/bar to /api/markdown/foo/bar
    // For /docs root, use empty path which the API will handle
    const path = pathname?.replace(/^\/docs\/?/, "") || "";
    if (!path) {
      return "/api/markdown";
    }
    return `/api/markdown/${path}`;
  }, [pathname]);

  const handleCopyForLLM = React.useCallback(async () => {
    // If pageContent is provided, use it; otherwise fetch from API
    if (pageContent) {
      await navigator.clipboard.writeText(pageContent);
      setCopied(true);
      trackEvent("ai_copy_for_llm_clicked", {
        content_length: pageContent.length,
      });
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    setIsCopyLoading(true);
    try {
      const response = await fetch(getMarkdownApiPath());
      if (response.ok) {
        const markdown = await response.text();
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        trackEvent("ai_copy_for_llm_clicked", {
          content_length: markdown.length,
        });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Failed to copy markdown:", error);
    } finally {
      setIsCopyLoading(false);
    }
  }, [pageContent, getMarkdownApiPath, trackEvent]);

  const handleOpenInAI = React.useCallback(
    async (serviceId: string) => {
      const service = AI_SERVICES.find((s) => s.id === serviceId);
      if (!service) return;

      setIsAILoading(serviceId);
      try {
        const response = await fetch(`${getMarkdownApiPath()}?format=json`);

        if (response.ok) {
          const data = await response.json();
          const url = service.getUrl(data.content, data.title);
          trackEvent("ai_service_opened", {
            service: serviceId as "v0" | "chatgpt" | "claude",
          });
          window.open(url, "_blank");
        }
      } catch (error) {
        console.error("Failed to open in AI:", error);
      } finally {
        setIsAILoading(null);
        setIsAIMenuOpen(false);
      }
    },
    [getMarkdownApiPath, trackEvent],
  );

  const handleViewMarkdown = React.useCallback(() => {
    trackEvent("ai_view_markdown_clicked", {});
    // Open the markdown API route in a new tab
    window.open(getMarkdownApiPath(), "_blank");
  }, [getMarkdownApiPath, trackEvent]);

  const handleTocClick = React.useCallback(
    (item: TocEntry) => {
      const headingId = item.url.replace("#", "");
      trackEvent("nav_toc_heading_clicked", {
        heading_text: typeof item.title === "string" ? item.title : headingId,
        heading_level: item.depth,
        heading_id: headingId,
      });
    },
    [trackEvent],
  );

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

  const tocContainerRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState({ top: 14, height: 12 });

  // Update indicator position when active heading changes
  React.useEffect(() => {
    if (!tocContainerRef.current || !activeHeading) return;

    const activeLink = tocContainerRef.current.querySelector(
      `a[data-active="true"]`
    ) as HTMLElement | null;

    if (activeLink) {
      const containerRect = tocContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      // Calculate the center position of the active item relative to the container
      const top = linkRect.top - containerRect.top + (linkRect.height - 12) / 2;

      setIndicatorStyle({ top, height: 12 });
    }
  }, [activeHeading]);

  return (
    <div className={cn("flex flex-col gap-12", className)}>
      {/* Table of Contents */}
      {toc?.length > 0 && (
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
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex flex-col items-start">
          {/* Ask AI dropdown */}
          <Popover open={isAIMenuOpen} onOpenChange={setIsAIMenuOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 text-page-nav-foreground hover:text-page-nav-foreground-hover transition-colors cursor-pointer"
              >
                <ChatDots size={20} className="shrink-0" />
                <span className="text-base">Ask AI about this page</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="right"
              sideOffset={16}
              className="w-auto p-0 border-menu-item-border bg-menu-item-background"
            >
              <div className="flex flex-col ui-16">
                {AI_SERVICES.map((service, index) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleOpenInAI(service.id)}
                    disabled={isAILoading === service.id}
                    className={cn(
                      "flex h-10 w-full items-center gap-2 px-3 bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover transition-colors disabled:opacity-50",
                      index < AI_SERVICES.length - 1 && "border-b border-menu-item-border",
                    )}
                  >
                    {isAILoading === service.id ? (
                      <SpinnerGap size={16} className="shrink-0 animate-spin" />
                    ) : (
                      service.icon
                    )}
                    <span>{service.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-border" />

          {/* Utility actions */}
          <div className="flex flex-col gap-5 items-start">
            {/* Copy for LLM */}
            <button
              type="button"
              className="flex items-center gap-2 text-page-nav-foreground hover:text-page-nav-foreground-hover transition-colors disabled:opacity-50 cursor-pointer"
              onClick={handleCopyForLLM}
              disabled={isCopyLoading}
            >
              {copied ? (
                <Check size={20} className="shrink-0 text-green-500" />
              ) : isCopyLoading ? (
                <SpinnerGap size={20} className="shrink-0 animate-spin" />
              ) : (
                <Copy size={20} className="shrink-0" />
              )}
              <span className="text-base">
                {copied ? "Copied!" : "Copy for LLM"}
              </span>
            </button>

            {/* View as markdown */}
            <button
              type="button"
              className="flex items-center gap-2 text-page-nav-foreground hover:text-page-nav-foreground-hover transition-colors cursor-pointer"
              onClick={handleViewMarkdown}
            >
              <FileText size={20} className="shrink-0" />
              <span className="text-base">View as markdown</span>
            </button>

            {/* Edit in GitHub */}
            <a
              href={`https://github.com/availproject/docs-fumadocs/edit/main/content/docs${pathname?.replace(/^\/docs/, "") || ""}/index.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-page-nav-foreground hover:text-page-nav-foreground-hover transition-colors cursor-pointer"
            >
              <GithubLogo size={20} className="shrink-0" />
              <span className="text-base">Edit in GitHub</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
