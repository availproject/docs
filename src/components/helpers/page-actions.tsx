"use client";

import {
  ChatDots,
  Check,
  Copy,
  FileText,
  GithubLogo,
  SpinnerGap,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/use-analytics";
import { REPO } from "@/lib/repo";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

/** Max characters of page content to include in AI service prompt URLs */
const AI_CONTEXT_CHAR_LIMIT = 4000;

const AI_SERVICES = [
  {
    id: "v0",
    name: "Open in v0",
    icon: (
      <svg
        role="img"
        aria-label="v0"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <title>v0</title>
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
      return `https://v0.dev/chat?q=${encodeURIComponent(`Help me understand this documentation:\n\n# ${title}\n\n${content.slice(0, AI_CONTEXT_CHAR_LIMIT)}`)}`;
    },
  },
  {
    id: "chatgpt",
    name: "Open in ChatGPT",
    icon: (
      <svg
        role="img"
        aria-label="ChatGPT"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <title>ChatGPT</title>
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
    getUrl: (content: string, title: string) => {
      return `https://chat.openai.com/?q=${encodeURIComponent(`Help me understand this documentation:\n\n# ${title}\n\n${content.slice(0, AI_CONTEXT_CHAR_LIMIT)}`)}`;
    },
  },
  {
    id: "claude",
    name: "Open in Claude",
    icon: (
      <svg
        role="img"
        aria-label="Claude"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <title>Claude</title>
        <path d="M15.788 4.096a.86.86 0 0 0-1.196-.27l-2.61 1.584a.86.86 0 0 0-.27 1.196.86.86 0 0 0 1.196.27l2.61-1.584a.86.86 0 0 0 .27-1.196m-5.407 1.57a.86.86 0 0 0-1.196-.27L4.2 8.544a.86.86 0 0 0-.27 1.196.86.86 0 0 0 1.196.27l4.985-3.148a.86.86 0 0 0 .27-1.196m10.463 2.058a.86.86 0 0 0-1.196-.27l-4.986 3.148a.86.86 0 1 0 .926 1.466l4.986-3.148a.86.86 0 0 0 .27-1.196m-3.085-.575a.86.86 0 0 0-1.196-.27l-7.596 4.796a.86.86 0 1 0 .926 1.466l7.596-4.796a.86.86 0 0 0 .27-1.196M5.771 11.5a.86.86 0 0 0-1.196-.27l-1.18.746a.86.86 0 1 0 .926 1.466l1.18-.746a.86.86 0 0 0 .27-1.196m14.341.49a.86.86 0 0 0-1.196-.27l-1.18.745a.86.86 0 1 0 .926 1.466l1.18-.745a.86.86 0 0 0 .27-1.196m-5.702 1.07a.86.86 0 0 0-1.196-.27l-7.596 4.796a.86.86 0 0 0 .926 1.466l7.596-4.796a.86.86 0 0 0 .27-1.196m5.015.485a.86.86 0 0 0-1.196-.27l-4.986 3.148a.86.86 0 1 0 .926 1.466l4.986-3.148a.86.86 0 0 0 .27-1.196m-6.42 2.29a.86.86 0 0 0-1.196-.27l-2.61 1.584a.86.86 0 1 0 .926 1.466l2.61-1.584a.86.86 0 0 0 .27-1.196m-5.234 1.87a.86.86 0 0 0-1.196-.27l-2.38 1.503a.86.86 0 1 0 .926 1.466l2.38-1.503a.86.86 0 0 0 .27-1.196" />
      </svg>
    ),
    getUrl: (content: string, title: string) => {
      return `https://claude.ai/new?q=${encodeURIComponent(`Help me understand this documentation:\n\n# ${title}\n\n${content.slice(0, AI_CONTEXT_CHAR_LIMIT)}`)}`;
    },
  },
] as const;

type PageActionsProps = {
  pageContent?: string;
};

export function PageActions({ pageContent }: Readonly<PageActionsProps>) {
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();

  const [copied, setCopied] = React.useState(false);
  const [isCopyLoading, setIsCopyLoading] = React.useState(false);
  const [isAIMenuOpen, setIsAIMenuOpen] = React.useState(false);
  const [aiServiceLoading, setAiServiceLoading] = React.useState<string | null>(
    null,
  );
  const prefetchedDataRef = React.useRef<{
    content: string;
    title: string;
  } | null>(null);

  const getMarkdownApiPath = React.useCallback(() => {
    const path = pathname?.replace(/^\/docs\/?/, "") || "";
    if (!path) return "/api/markdown";
    return `/api/markdown/${path}`;
  }, [pathname]);

  const handleCopyForLLM = React.useCallback(async () => {
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
      } else {
        toast.error("Failed to copy page content.");
      }
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      toast.error("Failed to copy page content.");
    } finally {
      setIsCopyLoading(false);
    }
  }, [pageContent, getMarkdownApiPath, trackEvent]);

  const fetchPageData = React.useCallback(async () => {
    const res = await fetch(`${getMarkdownApiPath()}?format=json`);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    return (await res.json()) as { content: string; title: string };
  }, [getMarkdownApiPath]);

  const handleAIMenuOpenChange = React.useCallback(
    (open: boolean) => {
      setIsAIMenuOpen(open);
      if (open) {
        prefetchedDataRef.current = null;
        fetchPageData()
          .then((data) => {
            prefetchedDataRef.current = data;
          })
          .catch((err) => {
            console.error("Failed to prefetch page markdown:", err);
          });
      } else {
        setAiServiceLoading(null);
      }
    },
    [fetchPageData],
  );

  const handleOpenInAI = React.useCallback(
    async (serviceId: string) => {
      const service = AI_SERVICES.find((s) => s.id === serviceId);
      if (!service) return;

      let data = prefetchedDataRef.current;

      if (data) {
        const url = service.getUrl(data.content, data.title);
        trackEvent("ai_service_opened", {
          service: serviceId as "v0" | "chatgpt" | "claude",
        });
        window.open(url, "_blank");
        setIsAIMenuOpen(false);
        return;
      }

      setAiServiceLoading(serviceId);
      try {
        data = await fetchPageData();
        prefetchedDataRef.current = data;
        const url = service.getUrl(data.content, data.title);
        trackEvent("ai_service_opened", {
          service: serviceId as "v0" | "chatgpt" | "claude",
        });
        window.open(url, "_blank");
        setIsAIMenuOpen(false);
      } catch (err) {
        console.error("Failed to fetch page markdown on click:", err);
        trackEvent("ai_service_opened", {
          service: serviceId as "v0" | "chatgpt" | "claude",
        });
        window.open(service.getUrl("", document.title), "_blank");
        setIsAIMenuOpen(false);
      } finally {
        setAiServiceLoading(null);
      }
    },
    [trackEvent, fetchPageData],
  );

  const handleViewMarkdown = React.useCallback(() => {
    trackEvent("ai_view_markdown_clicked", {});
    window.open(getMarkdownApiPath(), "_blank");
  }, [getMarkdownApiPath, trackEvent]);

  return (
    <div className="shrink-0 pt-12 pb-20 flex flex-col items-start">
      {/* Ask AI dropdown */}
      <Popover open={isAIMenuOpen} onOpenChange={handleAIMenuOpenChange}>
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
            {AI_SERVICES.map((service, index) => {
              const isLoading = aiServiceLoading === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleOpenInAI(service.id)}
                  disabled={isLoading}
                  className={cn(
                    "flex h-10 w-full items-center gap-2 px-3 bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover transition-colors",
                    index < AI_SERVICES.length - 1 &&
                      "border-b border-menu-item-border",
                    isLoading && "opacity-70 cursor-wait",
                  )}
                >
                  {isLoading ? (
                    <SpinnerGap size={16} className="shrink-0 animate-spin" />
                  ) : (
                    service.icon
                  )}
                  <span>{service.name}</span>
                </button>
              );
            })}
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
          href={`https://github.com/${REPO.owner}/${REPO.name}/edit/${REPO.branch}/${REPO.contentDir}${pathname?.replace(/^\/docs/, "") || ""}/index.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-page-nav-foreground hover:text-page-nav-foreground-hover transition-colors cursor-pointer"
        >
          <GithubLogo size={20} className="shrink-0" />
          <span className="text-base">Edit in GitHub</span>
        </a>
      </div>
    </div>
  );
}
