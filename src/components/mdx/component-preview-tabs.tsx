"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  chromeLessOnMobile?: boolean;
  component: React.ReactNode;
  source: React.ReactNode;
}) {
  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-6", className)}
      {...props}
    >
      <div
        data-slot="preview"
        data-align={align}
        className={cn(
          "preview flex w-full justify-center border data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start sm:h-max sm:p-10 p-5",
          chromeLessOnMobile ? "" : "",
        )}
      >
        {component}
      </div>
      {!hideCode && (
        <div
          data-slot="code"
          className="[&_pre]:max-h-100 [&_figure]:mt-0 [&_figure]:mr-0 [&_figure]:mb-0 [&_figure_::before]:hidden [&_figure_::after]:hidden"
        >
          {source}
        </div>
      )}
    </div>
  );
}
