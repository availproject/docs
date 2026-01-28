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
      <span key={index} className="text-card-foreground">
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
      {/* Header with terminal icon and tabs */}
      <div className="relative flex items-center h-[52px] border border-b-0 border-card-border bg-card px-4">
        <Terminal className="size-5 text-card-foreground shrink-0" />
        <TabsList className="ml-3 rounded-none bg-transparent p-0 h-auto gap-0">
          {Object.entries(tabs).map(([key]) => (
            <TabsTrigger
              key={key}
              value={key}
              className={cn(
                "px-2 py-1.5 h-auto rounded-none border-none shadow-none",
                "font-mono text-sm text-muted-foreground",
                "data-[state=active]:bg-muted data-[state=active]:text-muted-foreground"
              )}
            >
              {key}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Copy button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              data-slot="copy-button"
              size="icon"
              variant="ghost"
              className={cn(
                "absolute right-2.5 top-2.5 size-8 bg-transparent hover:bg-secondary active:bg-muted transition-colors",
                hasCopied && "bg-muted"
              )}
              onClick={copyCommand}
            >
              <span className="sr-only">Copy</span>
              {hasCopied ? (
                <Check className="size-5 text-muted-foreground" />
              ) : (
                <Copy className="size-5 text-muted-foreground" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {hasCopied ? "Copied" : "Copy to Clipboard"}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Code body */}
      <div className="border border-card-border bg-card">
        {Object.entries(tabs).map(([key, value]) => (
          <TabsContent key={key} value={key} className="mt-0 px-4 py-5">
            <pre className="overflow-x-auto">
              <code
                className="font-mono text-sm leading-normal text-card-foreground"
                data-language="bash"
              >
                {value ? highlightCommand(value) : value}
              </code>
            </pre>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
