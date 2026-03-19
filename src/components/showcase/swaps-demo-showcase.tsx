"use client";

import MockNexusProvider from "../nexus/MockNexusProvider";
import SwapWidget from "../swaps/swap-widget";
import DemoShowcaseShell from "./demo-showcase-shell";

const SwapsDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="swaps">
      {(ctx) =>
        ctx.isConnected && ctx.nexusSDK ? (
          <SwapWidget />
        ) : (
          <MockNexusProvider>
            <SwapWidget />
          </MockNexusProvider>
        )
      }
    </DemoShowcaseShell>
  );
};

export default SwapsDemoShowcase;
