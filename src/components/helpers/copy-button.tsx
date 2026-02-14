"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, Copy } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";

export function CopyButton({
  value,
  className,
  variant = "ghost",
  tooltip = "Copy to Clipboard",
  customPosition,
  language,
  codeTitle,
  codeType = "block",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
  tooltip?: string;
  customPosition?: string;
  language?: string;
  codeTitle?: string;
  codeType?: "inline" | "block" | "command" | "component";
}) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const { trackEvent } = useAnalytics();

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          data-copied={hasCopied}
          size="icon"
          variant={variant}
          className={cn(
            "z-10 size-8 bg-transparent hover:bg-secondary active:bg-muted transition-colors extend-touch-target",
            hasCopied && "bg-muted",
            customPosition ?? "absolute top-2 right-2",
            className,
          )}
          onClick={() => {
            navigator.clipboard.writeText(value);
            setHasCopied(true);
            trackEvent("code_copy_clicked", {
              language,
              content_length: value.length,
              code_title: codeTitle,
              code_type: codeType,
            });
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? (
            <Check size={20} className="text-muted-foreground" />
          ) : (
            <Copy size={20} className="text-muted-foreground" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{hasCopied ? "Copied" : tooltip}</TooltipContent>
    </Tooltip>
  );
}
