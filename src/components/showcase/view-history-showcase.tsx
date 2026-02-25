import React from "react";
import ViewHistory from "../view-history/view-history";
import ShowcaseWrapper from "./showcase-wrapper";

const ViewHistoryShowcase = () => {
  return (
    <ShowcaseWrapper
      connectLabel="Connect wallet to use Nexus View History"
      type="view-history"
    >
      <ViewHistory viewAsModal={false} />
    </ShowcaseWrapper>
  );
};

export default ViewHistoryShowcase;
