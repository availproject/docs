import dynamic from "next/dynamic";
import type React from "react";
import { Skeleton } from "../ui/skeleton";
import { ComponentPreviewTabs } from "./component-preview-tabs";
import { ComponentSource } from "./component-source";

type ComponentPreviewProps = React.ComponentProps<"div"> & {
  name: string;
  styleName?: "nexus-elements";
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  showAllFiles?: boolean;
};

// Map component names to their preview components
const SHOWCASE_MAP: Record<
  string,
  () => Promise<{ default: React.ComponentType<unknown> }>
> = {
  "fast-bridge": () => import("@/components/showcase/fast-bridge-showcase"),
  deposit: () => import("@/components/showcase/deposit-showcase"),
  swaps: () => import("@/components/showcase/swaps-showcase"),
  "unified-balance": () =>
    import("@/components/showcase/unified-balance-showcase"),
  "fast-transfer": () => import("@/components/showcase/transfer-showcase"),
  "view-history": () => import("@/components/showcase/view-history-showcase"),
};

export function ComponentPreview({
  name,
  styleName = "nexus-elements",
  className,
  align = "center",
  hideCode = false,
  showAllFiles = true,
  ...props
}: ComponentPreviewProps) {
  const showcaseLoader = SHOWCASE_MAP[name];
  const Showcase = dynamic(showcaseLoader, {
    loading: () => <Skeleton className="w-full h-full" />,
  });

  if (!showcaseLoader) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={<Showcase />}
      source={
        <ComponentSource
          name={name}
          collapsible={false}
          styleName={styleName}
          showAllFiles={showAllFiles}
        />
      }
      {...props}
    />
  );
}
