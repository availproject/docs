import {
  CHAIN_METADATA,
  type ReadableIntent,
  type SUPPORTED_CHAINS_IDS,
  type SUPPORTED_TOKENS,
  type UserAsset,
} from "@avail-project/nexus-core";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Skeleton } from "../../ui/skeleton";
import { useMemo } from "react";
import { useNexus } from "../../nexus/NexusProvider";

interface SourceBreakdownProps {
  intent?: ReadableIntent;
  tokenSymbol: SUPPORTED_TOKENS;
  isLoading?: boolean;
  chain?: SUPPORTED_CHAINS_IDS;
  bridgableBalance?: UserAsset;
  requiredAmount?: string;
}

const SourceBreakdown = ({
  intent,
  tokenSymbol,
  isLoading = false,
  chain,
  bridgableBalance,
  requiredAmount,
}: SourceBreakdownProps) => {
  const { nexusSDK } = useNexus();

  const fundsOnDestination = useMemo(() => {
    if (!bridgableBalance || !chain) return 0;
    return Number.parseFloat(
      bridgableBalance?.breakdown?.find((b) => b.chain?.id === chain)
        ?.balance ?? "0"
    );
  }, [bridgableBalance, chain]);

  const spendOnSources = useMemo(() => {
    if (!intent || (intent?.sources?.length ?? 0) < 2)
      return `1 asset on 1 chain`;
    return `${intent?.sources?.length} Assets on ${intent?.sources?.length} chains`;
  }, [intent]);

  const amountSpend = useMemo(() => {
    const base = Number(requiredAmount ?? "0");
    if (!intent) return base;
    const fees = Number.parseFloat(intent?.fees?.total ?? "0");
    return base + fees;
  }, [requiredAmount, intent]);

  const displaySources = useMemo(() => {
    if (!intent) {
      return [
        {
          chainID: chain as number,
          chainLogo: chain ? CHAIN_METADATA[chain]?.logo : undefined,
          chainName: chain
            ? CHAIN_METADATA[chain]?.name ?? "Destination"
            : "Destination",
          amount: requiredAmount ?? "0",
          contractAddress: "" as `0x${string}`,
        },
      ];
    }
    const baseSources = intent?.sources ?? [];
    const requiredAmountNumber = Number(requiredAmount ?? "0");
    const destUsed = Math.max(
      Math.min(requiredAmountNumber, fundsOnDestination),
      0
    );
    if (destUsed <= 0 || !chain) {
      return baseSources;
    }
    const allSources = intent?.allSources ?? [];
    const destDetails = allSources?.find?.((s) => s?.chainID === chain);
    const hasDest = baseSources?.some?.((s) => s?.chainID === chain);
    const destSource = {
      chainID: chain,
      chainLogo: destDetails?.chainLogo,
      chainName: destDetails?.chainName ?? "Destination",
      amount: destUsed.toString(),
      contractAddress: (destDetails?.contractAddress ?? "") as `0x${string}`,
    };
    if (hasDest) {
      return baseSources.map((s) =>
        s?.chainID === chain ? { ...s, amount: destSource.amount } : s
      );
    }
    return [...baseSources, destSource];
  }, [intent, requiredAmount, fundsOnDestination, chain]);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="sources">
        <div className="flex items-start justify-between gap-x-4 w-full">
          {isLoading ? (
            <>
              <div className="flex flex-col items-start gap-y-1 min-w-fit">
                <p className="text-base font-light">You Spend</p>
                <Skeleton className="h-4 w-44" />
              </div>
              <div className="flex flex-col items-end gap-y-1 min-w-fit">
                <Skeleton className="h-5 w-24" />
                <div className="w-fit">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </>
          ) : (
            displaySources && (
              <>
                <div className="flex flex-col items-start gap-y-1 min-w-fit">
                  <p className="text-base font-light">You Spend</p>
                  <p className="text-sm font-light">{spendOnSources}</p>
                </div>

                <div className="flex flex-col items-end gap-y-1 min-w-fit">
                  <p className="text-base font-light">
                    {nexusSDK?.utils?.formatTokenBalance(amountSpend, {
                      symbol: tokenSymbol,
                      decimals: intent?.token?.decimals,
                    })}
                  </p>

                  <AccordionTrigger
                    containerClassName="w-fit"
                    className="py-0 items-center gap-x-1"
                    hideChevron={false}
                  >
                    <p className="text-sm font-medium">View Sources</p>
                  </AccordionTrigger>
                </div>
              </>
            )
          )}
        </div>
        {!isLoading && displaySources?.length > 0 && (
          <AccordionContent className="my-4 bg-muted pb-0 px-4 py-2 rounded-lg w-full">
            <div className="flex flex-col items-center gap-y-3">
              {displaySources?.map((source) => (
                <div
                  key={source.chainID}
                  className="flex items-center justify-between w-full gap-x-2"
                >
                  <div className="flex items-center gap-x-2">
                    <img
                      src={source?.chainLogo}
                      alt={source?.chainName}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <p className="text-sm font-light">{source.chainName}</p>
                  </div>

                  <p className="text-sm font-light">
                    {nexusSDK?.utils?.formatTokenBalance(source.amount, {
                      symbol: tokenSymbol,
                      decimals: intent?.token?.decimals,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default SourceBreakdown;
