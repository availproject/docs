import { Info, Warning, WarningCircle } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "error" | "default";

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  type?: CalloutType;
  emoji?: string;
}

const typeIcons: Record<CalloutType, React.ReactNode> = {
  info: <Info size={20} className="text-card-foreground" />,
  warning: <Warning size={20} className="text-card-foreground" />,
  error: <WarningCircle size={20} className="text-card-foreground" />,
  default: <Info size={20} className="text-card-foreground" />,
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
      <div className="flex">
        <div className="flex items-center gap-2 w-full p-4 bg-card-header-background border-l border-r border-t border-card-border">
          {icon}
          <span className="text-base leading-5 text-card-foreground">
            {displayTitle}
          </span>
        </div>
        <div className="w-2 bg-card-shadow" />
      </div>

      {/* Body row - body content + right shadow */}
      <div className="flex">
        <div className="w-full px-4 py-5 bg-card border border-card-border flex-1">
          <div className="text-base leading-6.5 text-card-foreground [&_a]:text-brand [&_a]:underline [&_a]:decoration-blue-150 [&_a:hover]:decoration-brand [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-0 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm">
            {children}
          </div>
        </div>
        {/* Right shadow - only alongside body */}
        <div className="w-2 bg-card-shadow" />
      </div>

      {/* Bottom shadow row - L-shape completion */}
      <div className="flex">
        <div className="pl-2 flex-1">
          <div className="h-2 bg-card-shadow" />
        </div>
        {/* Corner piece */}
        <div className="w-2 h-2 bg-card-shadow" />
      </div>
    </div>
  );
}
