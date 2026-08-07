"use client";

import { NexusWidget } from "@avail-project/widgets";
import DemoShowcaseShell from "./demo-showcase-shell";

const TransferDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="fast-transfer">
      {() => (
        <NexusWidget
          config={{
            mode: "send",
          }}
        />
      )}
    </DemoShowcaseShell>
  );
};

export default TransferDemoShowcase;
