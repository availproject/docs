"use client";

import { NexusWidget } from "@avail-project/widgets";
import DemoShowcaseShell from "./demo-showcase-shell";

const SwapsDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="swaps">
      {() => (
        <NexusWidget
          config={{
            mode: "swap",
          }}
        />
      )}
    </DemoShowcaseShell>
  );
};

export default SwapsDemoShowcase;
