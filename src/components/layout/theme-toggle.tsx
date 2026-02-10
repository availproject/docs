"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ThemeToggleProps {
  theme: string;
  resolvedTheme: string;
  setTheme: (theme: string) => void;
}

export function ThemeToggle({ theme, resolvedTheme, setTheme }: ThemeToggleProps) {
  const [open, setOpen] = useState(false);
  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            const next = resolvedTheme === "dark" ? "light" : "dark";
            setTheme(next);
          }}
          className="flex h-10 items-center gap-2 px-3 bg-menu-item-background border-l border-t border-b border-menu-item-border"
        >
          <Icon className="size-5 text-menu-item-foreground" />
        </button>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex h-10 items-center px-2 bg-menu-item-background border border-menu-item-border",
              open && "bg-menu-item-background-active",
            )}
          >
            {open ? (
              <ChevronUp className="size-5 text-menu-item-foreground" />
            ) : (
              <ChevronDown className="size-5 text-menu-item-foreground" />
            )}
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-auto p-0 border-menu-item-border bg-menu-item-background"
      >
        <div className="flex flex-col ui-16">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-3 border-b border-menu-item-border transition-colors",
              theme === "light"
                ? "bg-menu-item-background text-menu-item-foreground"
                : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
            )}
          >
            <Sun className="size-5" />
            <span>Avail Light</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-3 border-b border-menu-item-border transition-colors",
              theme === "dark"
                ? "bg-menu-item-background text-menu-item-foreground"
                : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
            )}
          >
            <Moon className="size-5" />
            <span>Avail Dark</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-3 transition-colors",
              theme === "system"
                ? "bg-menu-item-background text-menu-item-foreground"
                : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
            )}
          >
            <Monitor className="size-5" />
            <span>System</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
