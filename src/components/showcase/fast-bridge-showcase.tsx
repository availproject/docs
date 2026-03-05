"use client";
import dynamic from "next/dynamic";
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
    <ShowcaseWrapper type="fast-bridge">
      <FastBridge connectedAddress={address as `0x${string}`} />
    </ShowcaseWrapper>
  );
};

export default FastBridgeShowcase;
