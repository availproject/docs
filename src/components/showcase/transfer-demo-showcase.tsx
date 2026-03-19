"use client";

import MockNexusProvider from "../nexus/MockNexusProvider";
import FastTransfer from "../transfer/transfer";
import DemoShowcaseShell from "./demo-showcase-shell";

const TransferDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="fast-transfer">
      {(ctx) =>
        ctx.isConnected && ctx.nexusSDK ? (
          <FastTransfer />
        ) : (
          <MockNexusProvider>
            <FastTransfer />
          </MockNexusProvider>
        )
      }
    </DemoShowcaseShell>
  );
};

export default TransferDemoShowcase;
