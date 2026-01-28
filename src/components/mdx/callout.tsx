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
    <div className={cn("relative mt-6 mr-2 mb-2", className)}>
      {/* Main card */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 w-full p-4 bg-card-header-background border-l border-r border-t border-card-border">
          {icon}
          <span className="text-base leading-5 text-card-foreground">
            {displayTitle}
          </span>
        </div>

        {/* Body */}
        <div className="w-full px-4 py-5 bg-card border border-card-border">
          <div className="text-base leading-[26px] text-card-foreground [&_a]:text-brand [&_a]:underline [&_a]:decoration-blue-150 [&_a:hover]:decoration-brand [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-0 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm">
            {children}
          </div>
        </div>
      </div>

      {/* Shadow - L-shaped effect */}
      <div className="absolute -bottom-2 left-2 right-0 h-2 bg-card-shadow" />
      <div className="absolute top-2 -right-2 bottom-0 w-2 bg-card-shadow" />
    </div>
  );
}
