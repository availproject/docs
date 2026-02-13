import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function CategoryCard({
  href,
  icon,
  title,
  description,
  className,
}: CategoryCardProps) {
  return (
    <div className={cn("group relative can-hover:hover:z-10", className)}>
      {/* Shadow — fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-brand/20 bg-card-shadow opacity-0 transition-opacity duration-200 ease-out can-hover:group-hover:opacity-100"
      />

      {/* Card — translates on hover, revealing the shadow underneath */}
      <Link
        href={href}
        className={cn(
          "relative flex items-center gap-4 bg-card border border-card-border px-5 py-6",
          "[transition:translate_200ms_cubic-bezier(0.165,0.84,0.44,1),border-color_200ms_ease]",
          "can-hover:group-hover:-translate-x-1.5 can-hover:group-hover:-translate-y-1.5 can-hover:group-hover:border-brand/20",
          "active:-translate-x-0.5 active:-translate-y-0.5 active:duration-100",
        )}
      >
        <span className="flex size-11 shrink-0 items-center justify-center text-brand">
          {icon}
        </span>
        <span className="flex flex-col gap-2">
          <span className="ui-16 text-foreground">{title}</span>
          <span className="body-14 text-muted-foreground">{description}</span>
        </span>
        <span className="extend-touch-target" />
      </Link>
    </div>
  );
}
