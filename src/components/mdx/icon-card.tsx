"use client";

import Link from "next/link";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

interface IconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  className?: string;
  external?: boolean;
}

export function IconCard({
  icon,
  title,
  description,
  href,
  className,
  external = false,
}: IconCardProps) {
  const { trackEvent } = useAnalytics();
  const isExternal = external || href.startsWith("http");
  const Wrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  const handleClick = () => {
    trackEvent("nav_card_clicked", {
      card_title: title,
      card_type: "icon",
      destination_path: href,
    });
  };

  return (
    <Wrapper
      {...wrapperProps}
      onClick={handleClick}
      className={cn(
        "group flex flex-col gap-3 border border-card-border bg-card p-4 w-full transition-colors can-hover:bg-secondary",
        className,
      )}
    >
      <div className="text-primary [&>svg]:size-6">{icon}</div>
      <div className="flex flex-col gap-2">
        <span className="ui-16 text-foreground">{title}</span>
        <p className="ui-16 text-muted-foreground">{description}</p>
      </div>
    </Wrapper>
  );
}

interface IconCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function IconCardGrid({ children, className }: IconCardGridProps) {
  return (
    <div
      className={cn("mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2", className)}
    >
      {children}
    </div>
  );
}
