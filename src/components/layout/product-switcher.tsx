"use client";

import { CaretDown } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AvailDALogo } from "@/components/logos/avail-da-logo";
import { AvailNexusLogo } from "@/components/logos/avail-nexus-logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getActiveProduct, products } from "@/lib/products";

const productLogos = {
  "avail-da": AvailDALogo,
  "avail-nexus": AvailNexusLogo,
} as const;

import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

export function ProductSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const [open, setOpen] = useState(false);

  const activeProduct = getActiveProduct(pathname);
  if (!activeProduct) return null;

  const ActiveLogo = productLogos[activeProduct.logoKey];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 text-[#006BF4] dark:text-foreground"
          aria-label={`Switch product (currently ${activeProduct.label})`}
        >
          <ActiveLogo className="h-6 w-auto" />
          <CaretDown
            size={20}
            className={cn(
              "shrink-0 translate-y-[2px] text-muted-foreground",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-auto min-w-48 p-0 border-menu-item-border bg-menu-item-background"
      >
        <div className="flex flex-col ui-16">
          <button
            type="button"
            onClick={() => {
              trackEvent("nav_sidebar_item_clicked", {
                item_type: "page",
                item_title: "Avail",
                destination_path: "/",
              });
              router.push("/");
              setOpen(false);
            }}
            className="flex h-10 w-full items-center gap-2 px-3 border-b border-menu-item-border transition-colors bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover"
          >
            <span>Homepage</span>
          </button>
          {products.map((product) => {
            const isActive = product.slug === activeProduct.slug;
            return (
              <button
                key={product.slug}
                type="button"
                onClick={() => {
                  trackEvent("nav_sidebar_item_clicked", {
                    item_type: "page",
                    item_title: product.label,
                    destination_path: product.startUrl,
                  });
                  router.push(product.startUrl);
                  setOpen(false);
                }}
                className={cn(
                  "flex h-10 w-full items-center gap-2 px-3 transition-colors [&:not(:last-child)]:border-b [&:not(:last-child)]:border-menu-item-border",
                  isActive
                    ? "bg-menu-item-background text-menu-item-foreground"
                    : "bg-menu-item-background text-search-foreground hover:bg-menu-item-background-hover",
                )}
              >
                <span>{product.label}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
