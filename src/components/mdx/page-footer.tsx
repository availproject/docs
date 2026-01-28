import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Feedback } from "./feedback";

interface PageFooterNavItemProps {
  title: string;
  description?: string;
  href: string;
  direction: "previous" | "next";
}

function PageFooterNavItem({
  title,
  description,
  href,
  direction,
}: PageFooterNavItemProps) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-1 flex-col gap-4 border border-card-border bg-card p-4 transition-colors hover:bg-card-header-background",
        isPrevious ? "items-start" : "items-end"
      )}
    >
      <div
        className={cn(
          "flex w-full items-center gap-1",
          isPrevious ? "justify-start" : "justify-end"
        )}
      >
        {isPrevious && (
          <ChevronLeft className="size-5 text-foreground" />
        )}
        <span className="text-base text-foreground">{title}</span>
        {!isPrevious && (
          <ChevronRight className="size-5 text-foreground" />
        )}
      </div>
      {description && (
        <p className="w-full text-sm leading-relaxed text-muted-foreground">
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
          <p className="text-base leading-relaxed text-foreground">
            Last updated: {lastUpdated}
          </p>
        )}

        {/* Navigation */}
        {(previous || next) && (
          <div className="flex gap-6">
            {previous ? (
              <PageFooterNavItem
                title={previous.title}
                description={previous.description}
                href={previous.href}
                direction="previous"
              />
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <PageFooterNavItem
                title={next.title}
                description={next.description}
                href={next.href}
                direction="next"
              />
            ) : (
              <div className="flex-1" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
