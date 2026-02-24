"use client";

import { Check, LinkSimple } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AnchorState = "idle" | "copied" | "fading";

export function HeadingAnchor({ id }: { id: string | undefined }) {
  const [state, setState] = useState<AnchorState>("idle");

  useEffect(() => {
    if (state === "copied") {
      const timer = setTimeout(() => setState("fading"), 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  if (!id) return null;

  const showCopied = state === "copied" || state === "fading";

  return (
    <button
      type="button"
      aria-label="Copy link to this section"
      className={cn(
        "ml-2 inline-flex items-center gap-2 shrink-0 cursor-pointer transition-all duration-300",
        showCopied
          ? cn(
              "text-muted-foreground",
              state === "copied" ? "opacity-100" : "opacity-0",
            )
          : "opacity-0 can-hover:group-hover:opacity-100 text-muted-foreground",
      )}
      onTransitionEnd={() => {
        if (state === "fading") setState("idle");
      }}
      onClick={() => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
        setState("copied");
      }}
    >
      {showCopied ? (
        <>
          <Check className="size-5" />
          <span className="text-sm font-sans">Link copied!</span>
        </>
      ) : (
        <LinkSimple className="size-5" />
      )}
    </button>
  );
}
