"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

interface LinkCardProps {
  title: string;
  href: string;
  image?: string;
  className?: string;
  external?: boolean;
}

export function LinkCard({
  title,
  href,
  image,
  className,
  external = false,
}: LinkCardProps) {
  const { trackEvent } = useAnalytics();
  const isExternal = external || href.startsWith("http");
  const Wrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  const handleClick = () => {
    trackEvent("nav_card_clicked", {
      card_title: title,
      card_type: "link",
      destination_path: href,
    });
  };

  return (
    <Wrapper
      {...wrapperProps}
      onClick={handleClick}
      className={cn(
        "group flex flex-col gap-4 border border-card-border bg-card p-4 transition-colors hover:bg-card-header-background",
        className
      )}
    >
      <div
        className="h-[155px] w-full bg-muted"
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      />
      <div className="flex items-center gap-2">
        <span className="flex-1 text-base font-normal text-foreground">
          {title}
        </span>
        <ArrowUpRight size={20} className="text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
    </Wrapper>
  );
}

interface LinkCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function LinkCardGrid({ children, className }: LinkCardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}>
      {children}
    </div>
  );
}
