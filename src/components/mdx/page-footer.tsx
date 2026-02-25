"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";
import { Feedback } from "./feedback";

interface PageFooterNavItemProps {
  title: string;
  description?: string;
  href: string;
  direction: "previous" | "next";
  onNavigate?: () => void;
}

function PageFooterNavItem({
  title,
  description,
  href,
  direction,
  onNavigate,
}: PageFooterNavItemProps) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex flex-1 flex-col gap-4 border border-card-border bg-card p-4 transition-colors hover:bg-card-header-background",
        isPrevious ? "items-start" : "items-end",
      )}
    >
      <div
        className={cn(
          "flex w-full items-center gap-1",
          isPrevious ? "justify-start" : "justify-end",
        )}
      >
        {isPrevious && (
          <CaretLeft size={20} className="text-foreground shrink-0" />
        )}
        <span className="ui-16 text-foreground">{title}</span>
        {!isPrevious && (
          <CaretRight size={20} className="text-foreground shrink-0" />
        )}
      </div>
      {description && (
        <p
          className={cn(
            "w-full text-sm leading-[22px] text-muted-foreground",
            !isPrevious && "text-right line-clamp-1",
          )}
        >
          {description}
        </p>
      )}
    </Link>
  );
}

interface PageFooterProps {
  lastUpdated?: string;
  previous?: {
    title: string;
    description?: string;
    href: string;
  };
  next?: {
    title: string;
    description?: string;
    href: string;
  };
  className?: string;
}

export function PageFooter({
  lastUpdated,
  previous,
  next,
  className,
}: PageFooterProps) {
  const { trackEvent } = useAnalytics();

  const handleNavClick = (
    direction: "previous" | "next",
    destinationPath: string,
    destinationTitle: string,
  ) => {
    trackEvent("nav_footer_link_clicked", {
      direction,
      destination_path: destinationPath,
      destination_title: destinationTitle,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Feedback */}
      <Feedback />

      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Footer content */}
      <div className="flex flex-col gap-6">
        {lastUpdated && (
          <p className="text-base leading-[26px] text-card-foreground">
            Last updated: {lastUpdated}
          </p>
        )}

        {/* Navigation */}
        {(previous || next) && (
          <div className="flex gap-6">
            {previous && (
              <PageFooterNavItem
                title={previous.title}
                description={previous.description}
                href={previous.href}
                direction="previous"
                onNavigate={() =>
                  handleNavClick("previous", previous.href, previous.title)
                }
              />
            )}
            {next && (
              <PageFooterNavItem
                title={next.title}
                description={next.description}
                href={next.href}
                direction="next"
                onNavigate={() => handleNavClick("next", next.href, next.title)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
