import { cn } from "@/lib/utils";

interface OffsetShadowProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export function OffsetShadow({
  children,
  className,
  active,
}: OffsetShadowProps) {
  return (
    <div
      className={cn(
        "group relative can-hover:hover:z-10",
        active && "z-10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 border border-brand/20 bg-card-shadow opacity-0 transition-opacity duration-200 ease-out can-hover:group-hover:opacity-100",
          active && "opacity-100",
        )}
      />
      <div
        className={cn(
          "relative can-hover:group-hover:-translate-x-1.5 can-hover:group-hover:-translate-y-1.5 [transition:translate_200ms_cubic-bezier(0.165,0.84,0.44,1)]",
          active && "-translate-x-1.5 -translate-y-1.5",
        )}
      >
        {children}
      </div>
    </div>
  );
}
