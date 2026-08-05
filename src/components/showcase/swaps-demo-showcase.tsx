"use client";

import { NexusWidget } from "@avail-project/widgets";
import DemoShowcaseShell from "./demo-showcase-shell";

const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const SwapsDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="swaps">
      {() => (
        <NexusWidget
          config={{
            mode: "swap",
            destination: {
              chain: 8453,
              tokens: [{ address: USDC_BASE, symbol: "USDC", decimals: 6 }],
            },
          }}
        />
      )}
    </DemoShowcaseShell>
  );
};

export default SwapsDemoShowcase;
