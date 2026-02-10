"use client";

import Link from "next/link";
import { LinkSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

interface ConceptCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
  external?: boolean;
}

export function ConceptCard({
  title,
  description,
  href,
  className,
  external = false,
}: ConceptCardProps) {
  const { trackEvent } = useAnalytics();
  const isExternal = external || href.startsWith("http");
  const Wrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  const handleClick = () => {
    trackEvent("nav_card_clicked", {
      card_title: title,
      card_type: "concept",
      destination_path: href,
    });
  };

  return (
    <Wrapper
      {...wrapperProps}
      onClick={handleClick}
      className={cn(
        "group flex flex-col gap-3 border border-card-border bg-card p-4 h-[140px] w-full transition-colors hover:bg-secondary",
        className
      )}
    >
      <LinkSimple size={24} className="text-primary" />
      <div className="flex flex-col gap-2">
        <span className="text-base font-normal leading-5 text-foreground">
          {title}
        </span>
        <p className="text-sm font-normal leading-[22px] text-muted-foreground">
          {description}
        </p>
      </div>
    </Wrapper>
  );
}

interface ConceptCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ConceptCardGrid({ children, className }: ConceptCardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {children}
    </div>
  );
}
