"use client";
import { Tabs } from "../ui/tabs";
import * as React from "react";

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = React.useState<{
    installationType: "cli" | "manual";
  }>({
    installationType: "cli",
  });

  return (
    <Tabs
      value={config.installationType}
      onValueChange={(value) =>
        setConfig({ ...config, installationType: value as "cli" | "manual" })
      }
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  );
}
