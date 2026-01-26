"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import ConnectWalletButton from "../helpers/wallet-connect-button";
import Image from "next/image";

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
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

function MobileNav({
  items,
  componentItems,
  className,
}: Readonly<{
  items: { href: string; label: string }[];
  componentItems: { href: string; label: string }[];
  className?: string;
}>) {
  const [open, setOpen] = useState(false);

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
        <div className="flex flex-col sm:gap-12 gap-6 overflow-auto px-6 py-6">
          <div className="w-full items-center justify-between flex sm:hidden h-fit">
            <Link href={"/"} className={cn("cursor-pointer ")}>
              <Image
                src="/avail-logo-dark.svg"
                alt="Nexus Elements"
                width={100}
                height={100}
                className="sm:w-25 sm:h-25 w-15 h-15  dark:hidden block"
              />
              <Image
                src="/avail-logo-light.svg"
                alt="Nexus Elements"
                width={100}
                height={100}
                className="sm:w-25 sm:h-25 w-15 h-15  hidden dark:block"
              />
            </Link>
            {/*<ConnectWalletButton />*/}
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>

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
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MobileNav;
