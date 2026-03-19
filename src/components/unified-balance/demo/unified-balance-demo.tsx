"use client";

import { formatTokenBalance, type UserAsset } from "@avail-project/nexus-core";
import { DollarSign } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { generateMockSwapBalance } from "../../deposit/demo/mock-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

// Generate a slightly different balance set for bridgeable vs swappable
function generateMockBridgeBalance(): UserAsset[] {
  return generateMockSwapBalance().map(
    (asset) =>
      ({
        ...asset,
        // Slightly different amounts for bridge vs swap
        balance: (parseFloat(asset.balance) * 0.85).toString(),
        balanceInFiat: asset.balanceInFiat * 0.85,
        breakdown: asset.breakdown.map((b) => ({
          ...b,
          balance: (parseFloat(b.balance) * 0.85).toString(),
          balanceInFiat: b.balanceInFiat * 0.85,
        })),
      }) as UserAsset,
  );
}

const BalanceBreakdown = ({
  className,
  totalFiat,
  tokens,
}: {
  totalFiat: string;
  tokens: UserAsset[];
  className?: string;
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-start w-full">
        <Label className="font-semibold text-muted-foreground">
          Total Balance:
        </Label>
        <Label className="text-lg font-bold gap-x-0">
          <DollarSign className="w-4 h-4 font-bold" strokeWidth={3} />
          {totalFiat}
        </Label>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {tokens.map((token) => {
          const positiveBreakdown = token.breakdown.filter(
            (chain) => Number.parseFloat(chain.balance) > 0,
          );
          const chainsCount = positiveBreakdown.length;
          const chainsLabel =
            chainsCount > 1 ? `${chainsCount} chains` : `${chainsCount} chain`;
          return (
            <AccordionItem
              key={token.symbol}
              value={token.symbol}
              className="px-4"
            >
              <AccordionTrigger
                className="hover:no-underline cursor-pointer items-center"
                hideChevron={false}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex sm:flex-row flex-col items-center gap-3">
                    <div className="relative size-6 sm:size-8">
                      {token.icon && (
                        <img
                          src={token.icon}
                          alt={token.symbol}
                          className="rounded-full size-full"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold sm:block hidden">
                        {token.symbol}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {chainsLabel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <p className="text-base font-medium">
                        {formatTokenBalance(parseFloat(token.balance), {
                          symbol: token.symbol,
                          decimals: token.decimals,
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${token.balanceInFiat.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  {positiveBreakdown.map((chain, index) => (
                    <React.Fragment key={chain.chain.id}>
                      <div className="flex items-center justify-between px-2 py-1 rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="relative size-4 sm:size-6">
                            <img
                              src={chain?.chain?.logo}
                              alt={chain.chain.name}
                              sizes="100%"
                              className="rounded-full size-full"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <span className="text-sm sm:block hidden">
                            {chain.chain.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatTokenBalance(parseFloat(chain.balance), {
                              symbol: token.symbol,
                              decimals: token.decimals,
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${chain.balanceInFiat.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < positiveBreakdown.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

const UnifiedBalanceDemo = () => {
  const [bridgeBalance] = useState(generateMockBridgeBalance);
  const [swapBalance] = useState(generateMockSwapBalance);

  const bridgeTotalFiat = useMemo(
    () => bridgeBalance.reduce((acc, b) => acc + b.balanceInFiat, 0).toFixed(2),
    [bridgeBalance],
  );

  const swapTotalFiat = useMemo(
    () => swapBalance.reduce((acc, b) => acc + b.balanceInFiat, 0).toFixed(2),
    [swapBalance],
  );

  const bridgeTokens = useMemo(
    () => bridgeBalance.filter((token) => Number.parseFloat(token.balance) > 0),
    [bridgeBalance],
  );

  const swapTokens = useMemo(
    () => swapBalance.filter((token) => Number.parseFloat(token.balance) > 0),
    [swapBalance],
  );

  return (
    <Tabs
      defaultValue="bridgeBalance"
      className="w-full max-w-lg py-4 px-1 sm:p-4 flex flex-col gap-y-2 items-center rounded-lg border border-border"
    >
      <TabsList className="w-full">
        <TabsTrigger value="bridgeBalance">
          <p className="text-sm font-medium">Bridgeable Balance</p>
        </TabsTrigger>
        <TabsTrigger value="swapBalance">
          <p className="text-sm font-medium">Swappable Balance</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="bridgeBalance"
        className="w-full overflow-y-scroll max-h-[372px] pt-6 no-scrollbar"
      >
        <BalanceBreakdown totalFiat={bridgeTotalFiat} tokens={bridgeTokens} />
      </TabsContent>
      <TabsContent
        value="swapBalance"
        className="w-full overflow-y-scroll max-h-[372px] pt-6 no-scrollbar"
      >
        <BalanceBreakdown totalFiat={swapTotalFiat} tokens={swapTokens} />
      </TabsContent>
    </Tabs>
  );
};

export default UnifiedBalanceDemo;
