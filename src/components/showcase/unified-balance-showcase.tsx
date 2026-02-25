import dynamic from "next/dynamic";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import ShowcaseWrapper from "./showcase-wrapper";

const UnifiedBalance = dynamic(
  () => import("@/components/unified-balance/unified-balance"),
  {
    loading: () => <Skeleton className="w-full h-full" />,
  },
);

const UnifiedBalanceShowcase = () => {
  return (
    <ShowcaseWrapper
      connectLabel="Connect wallet to use Nexus Unified Balance"
      type="unified-balance"
    >
      <UnifiedBalance />
    </ShowcaseWrapper>
  );
};

export default UnifiedBalanceShowcase;
