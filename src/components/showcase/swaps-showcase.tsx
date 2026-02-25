import React from "react";
import SwapWidget from "../swaps/swap-widget";
import ShowcaseWrapper from "./showcase-wrapper";

const SwapsShowcase = () => {
  return (
    <ShowcaseWrapper
      connectLabel="Connect wallet to use Nexus Swaps"
      type="swaps"
    >
      <SwapWidget />
    </ShowcaseWrapper>
  );
};

export default SwapsShowcase;
