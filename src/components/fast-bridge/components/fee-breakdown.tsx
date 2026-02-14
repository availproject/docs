import { type FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { type ReadableIntent } from "@avail-project/nexus-core";
import { Skeleton } from "../../ui/skeleton";
import { useNexus } from "../../nexus/NexusProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { MessageCircleQuestion } from "lucide-react";

interface FeeBreakdownProps {
  intent: ReadableIntent;
  isLoading?: boolean;
}

const FeeBreakdown: FC<FeeBreakdownProps> = ({ intent, isLoading = false }) => {
  const { nexusSDK } = useNexus();

  const feeRows = [
    {
      key: "caGas",
      label: "Fast Bridge Gas Fees",
      value: intent?.fees?.caGas,
      description:
        "The gas fee required for executing the fast bridge transaction on the destination chain.",
    },
    {
      key: "gasSupplied",
      label: "Gas Supplied",
      value: intent?.fees?.gasSupplied,
      description:
        "The amount of gas tokens supplied to cover transaction costs on the destination chain.",
    },
    {
      key: "solver",
      label: "Solver Fees",
      value: intent?.fees?.solver,
      description:
        "Fees paid to the solver that executes the bridge transaction and ensures fast completion.",
    },
    {
      key: "protocol",
      label: "Protocol Fees",
      value: intent?.fees?.protocol,
      description:
        "Fees collected by the protocol for maintaining and operating the bridge infrastructure.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="breakdown">
        <div className="w-full flex items-start justify-between">
          <p className="font-light text-base">Total fees</p>

          <div className="flex flex-col items-end justify-end-safe gap-y-1">
            {isLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : (
              <p className="font-light text-base min-w-max">
                {nexusSDK?.utils?.formatTokenBalance(intent.fees?.total, {
                  symbol: intent.token?.symbol,
                  decimals: intent?.token?.decimals,
                })}
              </p>
            )}
            <AccordionTrigger
              containerClassName="w-fit"
              className="p-0 items-center gap-x-1"
              hideChevron={false}
            >
              <p className="text-sm font-light">View Breakup</p>
            </AccordionTrigger>
          </div>
        </div>
        <AccordionContent>
          <div className="w-full flex flex-col items-center justify-between gap-y-3 bg-muted px-4 py-2 rounded-lg mt-2">
            {feeRows.map(({ key, label, value, description }) => {
              if (Number.parseFloat(value ?? "0") <= 0) return null;
              return (
                <Tooltip key={key}>
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm font-light">{label}</p>
                      <TooltipTrigger asChild>
                        <MessageCircleQuestion className="size-4" />
                      </TooltipTrigger>
                    </div>
                    {isLoading ? (
                      <Skeleton className="h-4 w-20" />
                    ) : (
                      <p className="text-sm font-light">
                        {nexusSDK?.utils?.formatTokenBalance(value, {
                          symbol: intent.token?.symbol,
                          decimals: intent?.token?.decimals,
                        })}
                      </p>
                    )}
                  </div>
                  <TooltipContent className="max-w-sm text-balance">
                    <p className="text-sm font-light">{description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FeeBreakdown;
