"use client";

import UnifiedBalanceDemo from "../unified-balance/demo/unified-balance-demo";
import UnifiedBalance from "../unified-balance/unified-balance";
import DemoShowcaseShell from "./demo-showcase-shell";

const UnifiedBalanceDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="unified-balance">
      {(ctx) =>
        ctx.isConnected && ctx.nexusSDK ? (
          <UnifiedBalance />
        ) : (
          <UnifiedBalanceDemo />
        )
      }
    </DemoShowcaseShell>
  );
};

export default UnifiedBalanceDemoShowcase;
