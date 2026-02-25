"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";
import { Skeleton } from "../ui/skeleton";
import ShowcaseWrapper from "./showcase-wrapper";

const FastBridge = dynamic(
  () => import("@/components/fast-bridge/fast-bridge"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full" />,
  },
);

const FastBridgeShowcase = () => {
  const { address } = useAccount();

  return (
    <ShowcaseWrapper
      connectLabel="Connect wallet to use Nexus Fast Bridge"
      type="fast-bridge"
    >
      <FastBridge connectedAddress={address as `0x${string}`} />
    </ShowcaseWrapper>
  );
};

export default FastBridgeShowcase;
