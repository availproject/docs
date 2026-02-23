"use client";

import { CaretDown, CaretUp, Monitor, Moon, Sun } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { pixelTransition } from "@/lib/pixel-transition";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  theme: string;
  resolvedTheme: string;
  setTheme: (theme: string) => void;
  buttonWrapper?: (
    children: React.ReactNode,
    context: { popoverOpen: boolean; isCaret: boolean },
  ) => React.ReactNode;
}

export function ThemeToggle({
  theme,
  resolvedTheme,
  setTheme,
  buttonWrapper,
}: ThemeToggleProps) {
  const [open, setOpen] = useState(false);
  const Icon = resolvedTheme === "dark" ? Moon : Sun;
  const wrap =
    buttonWrapper ??
    ((
      children: React.ReactNode,
      _context: { popoverOpen: boolean; isCaret: boolean },
    ) => children);

  const iconButton = (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const origin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        const next = resolvedTheme === "dark" ? "light" : "dark";
        pixelTransition(() => setTheme(next), origin);
      }}
      className={cn(
        "flex h-10 items-center gap-2 px-3 bg-menu-item-background border-menu-item-border cursor-pointer hover:border-brand/20 transition-colors",
        buttonWrapper ? "border" : "border border-r-transparent",
      )}
    >
      <Icon size={20} className="text-menu-item-foreground" />
    </button>
  );

  const caretButton = (
    <PopoverTrigger asChild>
      <button
        type="button"
        className={cn(
          "flex h-10 items-center px-2 bg-menu-item-background border border-menu-item-border cursor-pointer hover:border-brand/20 transition-colors",
          open && "bg-white",
        )}
      >
        {open ? (
          <CaretUp size={20} className="text-menu-item-foreground" />
        ) : (
          <CaretDown size={20} className="text-menu-item-foreground" />
        )}
      </button>
    </PopoverTrigger>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("flex items-center", buttonWrapper && "gap-1")}>
        {wrap(iconButton, { popoverOpen: open, isCaret: false })}
        {wrap(caretButton, { popoverOpen: open, isCaret: true })}
      </div>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-auto p-0 border-menu-item-border bg-menu-item-background"
      >
        <div className="flex flex-col ui-16">
          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const origin = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              };
              pixelTransition(() => setTheme("light"), origin);
              setOpen(false);
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-3 border-b border-menu-item-border cursor-pointer transition-colors",
              theme === "light"
                ? "bg-menu-item-background text-menu-item-foreground"
                : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
            )}
          >
            <Sun size={20} />
            <span>Avail Light</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const origin = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              };
              pixelTransition(() => setTheme("dark"), origin);
              setOpen(false);
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-3 border-b border-menu-item-border cursor-pointer transition-colors",
              theme === "dark"
                ? "bg-menu-item-background text-menu-item-foreground"
                : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
            )}
          >
            <Moon size={20} />
            <span>Avail Dark</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const origin = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              };
              pixelTransition(() => setTheme("system"), origin);
              setOpen(false);
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-3 cursor-pointer transition-colors",
              theme === "system"
                ? "bg-menu-item-background text-menu-item-foreground"
                : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
            )}
          >
            <Monitor size={20} />
            <span>System</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
