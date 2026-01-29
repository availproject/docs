"use client";

import { cn } from "@/lib/utils";

type StackedIconSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<StackedIconSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
};

const OVERLAP_MAP: Record<StackedIconSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

interface TokenSource {
  tokenLogo?: string;
  chainLogo?: string;
  symbol?: string;
}

interface StackedTokenIconsProps {
  sources: TokenSource[];
  size?: StackedIconSize;
  maxDisplay?: number;
  className?: string;
}

export const StackedTokenIcons = ({
  sources,
  size = "md",
  maxDisplay = 4,
  className,
}: StackedTokenIconsProps) => {
  const dimension = SIZE_MAP[size];
  const overlap = OVERLAP_MAP[size];

  const displaySources = sources.slice(0, maxDisplay);
  const remainingCount = sources.length - maxDisplay;

  // Calculate total width based on number of icons
  const totalWidth =
    displaySources.length > 0
      ? dimension + (displaySources.length - 1) * (dimension - overlap)
      : 0;

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      style={{ width: totalWidth, height: dimension }}
    >
      {displaySources.map((source, index) => (
        <span
          key={`${source.symbol}-${index}`}
          className="absolute inline-flex"
          style={{
            left: index * (dimension - overlap),
            zIndex: displaySources.length - index,
          }}
        >
          <span className="relative inline-flex">
            {source.tokenLogo ? (
              <img
                src={source.tokenLogo}
                alt={source.symbol ?? "token"}
                width={dimension}
                height={dimension}
                className="rounded-full object-cover border-2 border-background"
              />
            ) : (
              <span
                className={cn(
                  "rounded-full bg-ring/80 text-muted-foreground flex items-center justify-center font-semibold uppercase border-2 border-background",
                  {
                    "h-6 w-6 text-xs": size === "sm",
                    "h-8 w-8 text-sm": size === "md",
                    "h-10 w-10 text-base": size === "lg",
                  }
                )}
              >
                {source.symbol?.charAt(0) ?? "?"}
              </span>
            )}
            {source.chainLogo && (
              <span className="absolute -bottom-0.5 -right-0.5 rounded-full border border-background bg-background">
                <img
                  src={source.chainLogo}
                  alt="chain logo"
                  width={Math.max(12, dimension * 0.35)}
                  height={Math.max(12, dimension * 0.35)}
                  className="rounded-full object-cover"
                />
              </span>
            )}
          </span>
        </span>
      ))}
      {remainingCount > 0 && (
        <span
          className="absolute inline-flex"
          style={{
            left: displaySources.length * (dimension - overlap),
            zIndex: 0,
          }}
        >
          <span
            className={cn(
              "rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium border-2 border-background",
              {
                "h-6 w-6 text-[10px]": size === "sm",
                "h-8 w-8 text-xs": size === "md",
                "h-10 w-10 text-sm": size === "lg",
              }
            )}
          >
            +{remainingCount}
          </span>
        </span>
      )}
    </span>
  );
};
