import React from "react";
import ShowcaseWrapper from "./showcase-wrapper";
import FastTransfer from "../transfer/transfer";

const TransferShowcase = () => {
  return (
    <ShowcaseWrapper
      connectLabel="Connect wallet to use Nexus Fast Transfer"
      type="fast-transfer"
    >
      <FastTransfer />
    </ShowcaseWrapper>
  );
};

export default TransferShowcase;
