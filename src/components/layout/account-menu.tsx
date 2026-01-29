"use client";

import { useState } from "react";
import {
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Loader2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, ConnectKitButton } from "connectkit";
import { truncateAddress } from "@avail-project/nexus-core";

interface AccountMenuProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export function AccountMenu({ theme, setTheme }: AccountMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        if (!isConnected) {
          return (
            <button
              type="button"
              onClick={show}
              className="flex h-10 items-center gap-2 px-3 bg-menu-item-background border border-menu-item-border text-menu-item-foreground hover:bg-menu-item-background-hover transition-colors"
            >
              {isConnecting ? (
                <Loader2 className="size-5 animate-spin" />
              ) : null}
              <span className="text-base leading-5">Connect</span>
            </button>
          );
        }

        const displayName = ensName || truncateAddress(address ?? "", 4, 4);

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-10 items-center gap-2 px-3 transition-colors",
                  open
                    ? "bg-background-tertiary"
                    : "hover:bg-background-tertiary",
                )}
              >
                <div className="size-6 rounded-full overflow-hidden bg-muted">
                  <Avatar />
                </div>
                <span className="text-base leading-5 text-foreground">
                  {displayName}
                </span>
                {open ? (
                  <ChevronUp className="size-5 text-menu-item-foreground" />
                ) : (
                  <ChevronDown className="size-5 text-menu-item-foreground" />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-56 p-0 border-menu-item-border bg-menu-item-background"
            >
              <div className="flex flex-col">
                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                  }}
                  className="flex h-10 w-full items-center gap-2 px-3 border-l border-r border-t border-menu-item-border bg-menu-item-background text-menu-item-foreground hover:bg-menu-item-background-hover transition-colors"
                >
                  {theme === "dark" ? (
                    <Sun className="size-5" />
                  ) : (
                    <Moon className="size-5" />
                  )}
                  <span className="text-base leading-5">
                    {theme === "dark" ? "Avail Light" : "Avail Dark"}
                  </span>
                </button>
                {/* Disconnect */}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    show?.();
                  }}
                  className="flex h-10 w-full items-center gap-2 px-3 border border-menu-item-border bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover transition-colors"
                >
                  <LogOut className="size-5" />
                  <span className="text-base leading-5">Disconnect wallet</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
