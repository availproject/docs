import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function CategoryCard({
  href,
  icon: Icon,
  title,
  description,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-4 bg-card border border-card-border px-5 py-5",
        "transition-[color,background-color,border-color]",
        "can-hover:hover:border-brand/30 can-hover:hover:bg-accent",
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center text-brand">
        <Icon size={24} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="ui-16 text-foreground">{title}</span>
        <span className="body-14 text-muted-foreground">{description}</span>
      </span>
      <span className="extend-touch-target" />
    </Link>
  );
}
