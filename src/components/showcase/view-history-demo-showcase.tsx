"use client";

import ViewHistoryDemo from "../view-history/demo/view-history-demo";
import ViewHistory from "../view-history/view-history";
import DemoShowcaseShell from "./demo-showcase-shell";

const ViewHistoryDemoShowcase = () => {
  return (
    <DemoShowcaseShell type="view-history">
      {(ctx) =>
        ctx.isConnected && ctx.nexusSDK ? (
          <ViewHistory viewAsModal={false} />
        ) : (
          <ViewHistoryDemo />
        )
      }
    </DemoShowcaseShell>
  );
};

export default ViewHistoryDemoShowcase;
