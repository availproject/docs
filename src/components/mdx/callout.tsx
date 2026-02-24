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
  info: <Info size={20} />,
  warning: <Warning size={20} />,
  error: <WarningCircle size={20} />,
  default: <Info size={20} />,
};

const defaultTitles: Record<CalloutType, string> = {
  info: "Note",
  warning: "Warning",
  error: "Error",
  default: "Note",
};

const typeTokens: Record<CalloutType, string> = {
  info: "info",
  warning: "warning",
  error: "error",
  default: "info",
};

export function Callout({
  title,
  children,
  className,
  type = "default",
  emoji,
}: CalloutProps) {
  const displayTitle = title || defaultTitles[type];
  const icon = emoji ? (
    <span className="text-base">{emoji}</span>
  ) : (
    typeIcons[type]
  );
  const token = typeTokens[type];

  return (
    <div className={cn("flex items-start my-8", className)}>
      {/* Wrapper: header + body + bottom shadow */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div
          className="flex items-center gap-2 w-full p-4 border-l border-r border-t"
          style={{
            backgroundColor: `var(--callout-${token}-header)`,
            borderColor: `var(--callout-${token}-border)`,
            color: `var(--callout-${token}-fg)`,
          }}
        >
          {icon}
          <span className="text-base leading-5">{displayTitle}</span>
        </div>

        {/* Body */}
        <div
          className="w-full px-4 py-5 border"
          style={{
            backgroundColor: `var(--callout-${token}-bg)`,
            borderColor: `var(--callout-${token}-border)`,
            color: `var(--callout-${token}-fg)`,
          }}
        >
          <div className="text-base leading-6.5 [&_a]:text-brand [&_a]:underline [&_a]:decoration-blue-150 [&_a:hover]:decoration-brand [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-0 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm">
            {children}
          </div>
        </div>

        {/* Bottom shadow - offset from left */}
        <div className="pl-2">
          <div
            className="h-2"
            style={{ backgroundColor: `var(--callout-${token}-shadow)` }}
          />
        </div>
      </div>

      {/* Right shadow - offset from top */}
      <div className="pt-2 self-stretch">
        <div
          className="w-2 h-full"
          style={{ backgroundColor: `var(--callout-${token}-shadow)` }}
        />
      </div>
    </div>
  );
}
