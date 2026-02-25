"use client";

import * as React from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export function CodeCollapsibleWrapper({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<typeof Collapsible> & { title?: string }) {
  const [isOpened, setIsOpened] = React.useState(false);
  const { trackEvent } = useAnalytics();

  const handleOpenChange = (open: boolean) => {
    setIsOpened(open);
    trackEvent("code_collapsible_toggled", {
      is_expanded: open,
      title,
    });
  };

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={handleOpenChange}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-1.5 right-9 z-10 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-7 rounded-md px-2"
          >
            {isOpened ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        forceMount
        className="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:mx-0!"
      >
        {children}
        <CollapsibleTrigger className="from-transparent to-background text-muted-foreground absolute inset-x-0 bottom-0 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b text-sm group-data-[state=open]/collapsible:hidden">
          Expand
        </CollapsibleTrigger>
      </CollapsibleContent>
    </Collapsible>
  );
}
