"use client";
import { ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface NavSection {
  title: string;
  items: { href: string; label: string }[];
}

const DA_SECTIONS: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs/da/get-started", label: "Get Started" },
      { href: "/docs/da/networks", label: "Networks" },
      { href: "/docs/da/concepts", label: "Concepts" },
    ],
  },
  {
    title: "Build & Operate",
    items: [
      { href: "/docs/da/build", label: "Build" },
      { href: "/docs/da/operate", label: "Operate" },
      { href: "/docs/da/api-reference", label: "API Reference" },
    ],
  },
];

const NEXUS_SECTIONS: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs/nexus/get-started", label: "Get Started" },
      {
        href: "/docs/nexus/supported-chains-and-tokens",
        label: "Chains & Tokens",
      },
      { href: "/docs/nexus/concepts", label: "Concepts" },
    ],
  },
  {
    title: "Build",
    items: [
      { href: "/docs/nexus/nexus-sdk", label: "Nexus SDK" },
      { href: "/docs/nexus/nexus-ui-elements", label: "UI Elements" },
      { href: "/docs/nexus/cookbook-recipes", label: "Cookbook" },
    ],
  },
];

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

function MobileNavSection({
  section,
  onOpenChange,
}: {
  section: NavSection;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
        {section.title}
      </div>
      <div className="flex flex-col gap-1.5">
        {section.items.map((item) => (
          <MobileLink
            key={item.href}
            href={item.href}
            onOpenChange={onOpenChange}
            className="text-base font-normal text-foreground/80 hover:text-foreground flex items-center gap-1"
          >
            <ChevronRight className="size-3 text-muted-foreground" />
            {item.label}
          </MobileLink>
        ))}
      </div>
    </div>
  );
}

function MobileNav({
  items,
  componentItems,
  className,
  onSearchClick,
}: Readonly<{
  items: { href: string; label: string }[];
  componentItems: { href: string; label: string }[];
  className?: string;
  onSearchClick?: () => void;
}>) {
  const [open, setOpen] = useState(false);

  const handleSearchClick = () => {
    setOpen(false);
    onSearchClick?.();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8  touch-manipulation items-center justify-start gap-2.5 p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className,
          )}
        >
          <div className="flex items-center gap-x-2">
            <div className="relative flex h-8 w-4 items-center justify-center">
              <div className="relative size-4">
                <span
                  className={cn(
                    "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                    open ? "top-[0.4rem] -rotate-45" : "top-1",
                  )}
                />
                <span
                  className={cn(
                    "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                    open ? "top-[0.4rem] rotate-45" : "top-2.5",
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
            <span className="flex h-8 items-center text-lg leading-none font-medium">
              Menu
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-6 overflow-auto px-6 py-6">
          {/* Logo row */}
          <div className="w-full items-center justify-between flex sm:hidden h-fit">
            <Link href={"/"} className={cn("cursor-pointer ")}>
              <Image
                src="/avail-logo-dark.svg"
                alt="Avail"
                width={100}
                height={100}
                className="sm:w-25 sm:h-25 w-15 h-15 dark:hidden block"
              />
              <Image
                src="/avail-logo-light.svg"
                alt="Avail"
                width={100}
                height={100}
                className="sm:w-25 sm:h-25 w-15 h-15 hidden dark:block"
              />
            </Link>
          </div>

          {/* Search bar */}
          {onSearchClick && (
            <button
              type="button"
              onClick={handleSearchClick}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 text-left text-muted-foreground hover:bg-muted transition-colors"
            >
              <Search className="size-4" />
              <span className="text-sm">Search documentation...</span>
            </button>
          )}

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <div className="text-muted-foreground text-sm font-medium">
              Quick Links
            </div>
            <div className="flex flex-col gap-2">
              <MobileLink href="/" onOpenChange={setOpen} className="text-xl">
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                  className="text-xl"
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>

          {/* Avail DA section */}
          <div className="flex flex-col gap-4">
            <MobileLink
              href={products[0].startUrl}
              onOpenChange={setOpen}
              className="text-2xl font-semibold"
            >
              {products[0].label}
            </MobileLink>
            <div className="flex flex-col gap-4 pl-2 border-l-2 border-border">
              {DA_SECTIONS.map((section) => (
                <MobileNavSection
                  key={section.title}
                  section={section}
                  onOpenChange={setOpen}
                />
              ))}
            </div>
          </div>

          {/* Avail Nexus section */}
          <div className="flex flex-col gap-4">
            <MobileLink
              href={products[1].startUrl}
              onOpenChange={setOpen}
              className="text-2xl font-semibold"
            >
              {products[1].label}
            </MobileLink>
            <div className="flex flex-col gap-4 pl-2 border-l-2 border-border">
              {NEXUS_SECTIONS.map((section) => (
                <MobileNavSection
                  key={section.title}
                  section={section}
                  onOpenChange={setOpen}
                />
              ))}
            </div>
          </div>

          {componentItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground text-sm font-medium">
                Components
              </div>
              <div className="flex flex-col gap-3">
                {componentItems.map((item, idx) => (
                  <MobileLink
                    key={`${item.href}-${idx}`}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MobileNav;
