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
      className={cn(
        "group relative mt-4 mb-12 flex flex-col gap-2 border",
        className,
      )}
      {...props}
    >
      <div data-slot="preview">
        <div
          data-align={align}
          className={cn(
            "preview flex w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start sm:h-max sm:p-10 p-5",
            chromeLessOnMobile ? "" : "",
          )}
        >
          {component}
        </div>
        {!hideCode && (
          <div
            data-slot="code"
            className="overflow-y-hidden overflow-x-scroll **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t [&_pre]:max-h-100"
          >
            {source}
          </div>
        )}
      </div>
    </div>
  );
}
