"use client";

import Link from "next/link";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

interface IconCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  href: string;
  className?: string;
  external?: boolean;
  children?: React.ReactNode;
  arrow?: boolean;
}

export function IconCard({
  icon,
  title,
  description,
  href,
  className,
  external = false,
  children,
  arrow = false,
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
        "group flex flex-col gap-3 border border-card-border bg-background p-4 w-full transition-colors can-hover:hover:bg-secondary",
        className,
      )}
    >
      {icon && <div className="text-primary [&>svg]:size-6">{icon}</div>}
      <div className="flex flex-col gap-2">
        <span className="ui-16 text-foreground flex items-center gap-1.5">
          {title}
          {arrow && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          )}
        </span>
        {description && (
          <p className="body-16 text-muted-foreground">{description}</p>
        )}
        {children && (
          <div className="body-16 text-muted-foreground">{children}</div>
        )}
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
