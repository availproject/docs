"use client";

import { useAccount } from "wagmi";
import FastBridge from "../fast-bridge/fast-bridge";
import MockNexusProvider from "../nexus/MockNexusProvider";
import DemoShowcaseShell from "./demo-showcase-shell";

const MOCK_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18" as const;

const FastBridgeDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="fast-bridge">
      {(ctx) =>
        ctx.isConnected && ctx.nexusSDK ? (
          <RealFastBridge />
        ) : (
          <MockNexusProvider>
            <FastBridge connectedAddress={MOCK_ADDRESS} />
          </MockNexusProvider>
        )
      }
    </DemoShowcaseShell>
  );
};

function RealFastBridge() {
  const { address } = useAccount();
  return <FastBridge connectedAddress={address as `0x${string}`} />;
}

export default FastBridgeDemoShowcase;
