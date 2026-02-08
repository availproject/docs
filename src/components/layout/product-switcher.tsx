"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { productLogos, AvailLogo } from "@/components/logos";
import { products, getActiveProduct } from "@/lib/products";
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
          className="inline-flex items-center gap-1 cursor-pointer text-[#006BF4] dark:text-foreground"
          aria-label={`Switch product (currently ${activeProduct.label})`}
        >
          <ActiveLogo className="h-8 w-auto" />
          <ChevronDown
            className={cn(
              "size-5 shrink-0 translate-y-[2px] text-muted-foreground",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={12}
        className="w-auto min-w-48 p-2"
      >
        <div className="flex flex-col gap-1">
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
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <AvailLogo className="h-6 w-auto" />
          </button>
          {products.map((product) => {
            const Logo = productLogos[product.logoKey];
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
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Logo className="h-6 w-auto" />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
