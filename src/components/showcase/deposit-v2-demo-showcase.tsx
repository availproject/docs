"use client";

import { DialRoot } from "dialkit";
import "dialkit/styles.css";
import DepositV2Widget from "../deposit-v2/deposit-v2-widget";
import DemoShowcaseShell from "./demo-showcase-shell";

const DepositV2DemoShowcase = () => {
  return (
    <DemoShowcaseShell type="deposit">
      {() => (
        <>
          <DepositV2Widget />
          <DialRoot position="bottom-right" />
        </>
      )}
    </DemoShowcaseShell>
  );
};

export default DepositV2DemoShowcase;
