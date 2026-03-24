"use client";

import DepositV2Widget from "../deposit-v2/deposit-v2-widget";
import DemoShowcaseShell from "./demo-showcase-shell";

const DepositV2DemoShowcase = () => {
  return (
    <DemoShowcaseShell type="deposit">
      {() => <DepositV2Widget />}
    </DemoShowcaseShell>
  );
};

export default DepositV2DemoShowcase;
