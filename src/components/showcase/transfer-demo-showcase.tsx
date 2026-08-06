"use client";

import { NexusWidget } from "@avail-project/widgets";
import DemoShowcaseShell from "./demo-showcase-shell";

const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const RECIPIENT = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

const TransferDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="fast-transfer">
      {() => (
        <NexusWidget
          config={{
            mode: "send",
            destination: {
              chain: 8453,
              tokens: [{ address: USDC_BASE, symbol: "USDC", decimals: 6 }],
            },
            recipientAddress: RECIPIENT,
            prefill: { amount: "0.1" },
          }}
        />
      )}
    </DemoShowcaseShell>
  );
};

export default TransferDemoShowcase;
