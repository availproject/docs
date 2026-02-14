import React from "react";
import ShowcaseWrapper from "./showcase-wrapper";
import ViewHistory from "../view-history/view-history";

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
