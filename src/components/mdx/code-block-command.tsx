"use client";

import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// Tokenize and highlight bash/shell commands
function highlightCommand(command: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const parts = command.split(/(\s+)/);

  let isFirstWord = true;

  parts.forEach((part, index) => {
    // Whitespace
    if (/^\s+$/.test(part)) {
      tokens.push(<span key={index}>{part}</span>);
      return;
    }

    // Command (first word): npx, npm, pnpm, yarn, bun, bunx, etc.
    if (isFirstWord) {
      tokens.push(
        <span key={index} className="text-[#e36209] dark:text-[#ffab70]">
          {part}
        </span>
      );
      isFirstWord = false;
      return;
    }

    // Subcommands: install, add, run, dlx, create, etc.
    if (/^(install|add|run|dlx|create|exec|init|--bun)$/.test(part)) {
      tokens.push(
        <span key={index} className="text-[#22863a] dark:text-[#85e89d]">
          {part}
        </span>
      );
      return;
    }

    // Flags: -g, --save-dev, etc.
    if (part.startsWith("-")) {
      tokens.push(
        <span key={index} className="text-[#6f42c1] dark:text-[#b392f0]">
          {part}
        </span>
      );
      return;
    }

    // Scoped packages: @scope/package or @latest
    if (part.startsWith("@")) {
      tokens.push(
        <span key={index} className="text-[#005cc5] dark:text-[#79b8ff]">
          {part}
        </span>
      );
      return;
    }

    // Default text
    tokens.push(
      <span key={index} className="text-[#24292e] dark:text-[#e1e4e8]">
        {part}
      </span>
    );
  });

  return tokens;
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
}) {
  const [config, setConfig] = React.useState<{
    packageManager: "pnpm" | "npm" | "yarn" | "bun";
  }>({
    packageManager: "pnpm",
  });
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    };
  }, [__npm__, __pnpm__, __yarn__, __bun__]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    navigator.clipboard.writeText(command);
    setHasCopied(true);
  }, [packageManager, tabs]);

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <Terminal className="text-code size-3" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none"
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
                <pre>
                  <code
                    className={cn(
                      "relative font-mono text-sm leading-none",
                      "bg-transparent"
                    )}
                    data-language="bash"
                  >
                    {value ? highlightCommand(value) : value}
                  </code>
                </pre>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            data-slot="copy-button"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
            onClick={copyCommand}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check /> : <Copy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasCopied ? "Copied" : "Copy to Clipboard"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
