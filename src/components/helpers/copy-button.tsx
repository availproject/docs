"use client";

import { Check, Copy } from "@phosphor-icons/react";
import * as React from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function CopyButton({
  value,
  className,
  variant = "ghost",
  customPosition,
  language,
  codeTitle,
  codeType = "block",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
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
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant={variant}
      className={cn(
        "z-10 size-8 cursor-pointer bg-transparent hover:bg-secondary active:bg-muted transition-colors extend-touch-target",
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
  );
}
