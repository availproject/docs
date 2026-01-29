import { cn } from "@/lib/utils";
import { Info, AlertTriangle, AlertCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "default";

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  type?: CalloutType;
  emoji?: string;
}

const typeIcons: Record<CalloutType, React.ReactNode> = {
  info: <Info className="size-5 text-card-foreground" />,
  warning: <AlertTriangle className="size-5 text-card-foreground" />,
  error: <AlertCircle className="size-5 text-card-foreground" />,
  default: <Info className="size-5 text-card-foreground" />,
};

const defaultTitles: Record<CalloutType, string> = {
  info: "Note",
  warning: "Warning",
  error: "Error",
  default: "Note",
};

export function Callout({
  title,
  children,
  className,
  type = "default",
  emoji,
}: CalloutProps) {
  // If no title provided, use default title based on type
  const displayTitle = title || defaultTitles[type];
  const icon = emoji ? (
    <span className="text-base">{emoji}</span>
  ) : (
    typeIcons[type]
  );

  return (
    <div className={cn("flex flex-col mt-6", className)}>
      {/* Header - separate from body/shadow group */}
      <div className="flex items-center gap-2 w-full p-4 bg-card-header-background border-l border-r border-t border-card-border">
        {icon}
        <span className="text-base leading-5 text-card-foreground">
          {displayTitle}
        </span>
      </div>

      {/* Body + Shadow group */}
      <div className="flex">
        {/* Body column */}
        <div className="flex flex-col flex-1">
          {/* Body content */}
          <div className="w-full px-4 py-5 bg-card border border-card-border">
            <div className="text-base leading-[26px] text-card-foreground [&_a]:text-brand [&_a]:underline [&_a]:decoration-blue-150 [&_a:hover]:decoration-brand [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-0 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm">
              {children}
            </div>
          </div>

          {/* Bottom shadow */}
          <div className="h-2 w-full bg-card-shadow" />
        </div>

        {/* Right shadow - only alongside body */}
        <div className="w-2 bg-card-shadow" />
      </div>
    </div>
  );
}
