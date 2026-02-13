"use client";
import * as React from "react";
import { Tabs } from "../ui/tabs";

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
