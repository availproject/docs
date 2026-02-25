import React from "react";
import FastTransfer from "../transfer/transfer";
import ShowcaseWrapper from "./showcase-wrapper";

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
