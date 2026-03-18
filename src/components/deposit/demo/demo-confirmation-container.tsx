"use client";

import { formatTokenBalance } from "@avail-project/nexus-core";
import { useMemo, useState } from "react";
import { usdFormatter } from "../../common";
import { Button } from "../../ui/button";
import { CardContent } from "../../ui/card";
import { ErrorBanner } from "../components/error-banner";
import { CoinIcon, GasPumpIcon } from "../components/icons";
import { ReceiveAmountDisplay } from "../components/receive-amount-display";
import SummaryCard from "../components/summary-card";
import WidgetHeader from "../components/widget-header";
import type { DepositWidgetContextValue } from "../types";

interface DemoConfirmationContainerProps {
  widget: DepositWidgetContextValue;
  heading?: string;
  onClose?: () => void;
}

/**
 * Demo version of ConfirmationContainer.
 * Identical to the real one except it does NOT call useNexus() for getFiatValue.
 * Instead it uses pre-computed balanceInFiat from mock data.
 */
const DemoConfirmationContainer = ({
  widget,
  heading,
  onClose,
}: DemoConfirmationContainerProps) => {
  const [showSpendDetails, setShowSpendDetails] = useState(false);

  const {
    confirmationDetails,
    handleConfirmOrder,
    isProcessing,
    txError,
    activeIntent,
    simulationLoading,
  } = widget;

  const isLoading = simulationLoading || !activeIntent;

  const receiveAmount =
    confirmationDetails?.receiveAmountAfterSwapUsd?.toFixed(2) ?? "0";
  const timeLabel = confirmationDetails?.estimatedTime ?? "~30s";
  const amountSpent = confirmationDetails?.amountSpent;
  const tokenNames = confirmationDetails?.sources
    .filter((s) => s)
    .map((s) => s?.symbol)
    .slice(0, 2)
    .join(", ");
  const moreCount =
    (confirmationDetails?.sources.filter((s) => s).length ?? 0) - 2;
  const tokenNamesSummary =
    moreCount > 0 ? `${tokenNames} + ${moreCount} more` : tokenNames;

  const sourceDetails = useMemo(() => {
    if (!confirmationDetails?.sources) return [];
    const result: Array<{
      chainName: string;
      chainLogo: string | undefined;
      tokenSymbol: string;
      tokenDecimals: number;
      amount: string;
      balanceInFiat: number;
      isDestinationBalance: boolean;
    }> = [];
    for (const source of confirmationDetails.sources) {
      if (!source) continue;
      result.push({
        chainName: source.chainName ?? "",
        chainLogo: source.chainLogo,
        tokenSymbol: source.symbol ?? "",
        tokenDecimals: source.decimals ?? 6,
        amount: source.balance ?? "0",
        balanceInFiat: source.balanceInFiat ?? 0,
        isDestinationBalance: source.isDestinationBalance ?? false,
      });
    }
    return result;
  }, [confirmationDetails]);

  return (
    <>
      <WidgetHeader
        title={heading ?? ""}
        onBack={widget.goBack}
        onClose={onClose}
        depositTargetLogo={widget?.destination?.depositTargetLogo}
      />
      <CardContent>
        <div className="flex flex-col">
          <div className="bg-card rounded-t-lg border-t border-l border-r shadow-[0_1px_12px_0_rgba(91,91,91,0.05)] px-6 pt-10 pb-1 flex flex-col gap-6">
            <ReceiveAmountDisplay
              amount={receiveAmount}
              timeLabel={timeLabel}
              loading={isLoading}
              destinationTokenLogo={widget?.destination?.tokenLogo}
              depositTargetLogo={widget?.destination?.depositTargetLogo}
            />
            <div>
              <SummaryCard
                icon={<CoinIcon className="w-5 h-5 text-muted-foreground" />}
                title="You spend"
                subtitle={
                  isLoading
                    ? "Calculating..."
                    : tokenNamesSummary || "Selected assets"
                }
                value={String(amountSpent)}
                valueSuffix="USD"
                showBreakdown={!isLoading && sourceDetails.length > 0}
                loading={isLoading}
                expanded={showSpendDetails}
                onToggleExpand={() => setShowSpendDetails(!showSpendDetails)}
              >
                <div className="space-y-4">
                  {sourceDetails.map((source) => {
                    // Use pre-computed balanceInFiat instead of getFiatValue()
                    const amountUsd = source.balanceInFiat;
                    return (
                      <div
                        key={`${source.tokenSymbol}-${source.chainName}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {source.chainLogo && (
                            <img
                              src={source.chainLogo}
                              alt={source.chainName}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          )}
                          <div className="flex flex-col gap-0.5">
                            <span className="font-sans text-sm text-card-foreground">
                              {source.tokenSymbol}
                            </span>
                            <span className="font-sans text-[13px] text-muted-foreground">
                              {source.chainName}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 items-end">
                          <span className="font-sans text-sm text-card-foreground">
                            {usdFormatter.format(amountUsd)}USD
                          </span>
                          <span className="font-sans text-[13px] text-muted-foreground">
                            {formatTokenBalance(parseFloat(source.amount), {
                              decimals: source.tokenDecimals,
                              symbol: source.tokenSymbol,
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SummaryCard>

              <SummaryCard
                icon={<GasPumpIcon className="w-5 h-5 text-muted-foreground" />}
                title="Total fees"
                value={(confirmationDetails?.totalFeeUsd ?? 0).toFixed(2)}
                valueSuffix="USD"
                showBreakdown={false}
                loading={isLoading}
                expanded={false}
              />
            </div>
          </div>
          {txError && widget.status === "error" && (
            <ErrorBanner message={txError} />
          )}
          <Button
            className="rounded-t-none"
            onClick={handleConfirmOrder}
            disabled={isProcessing || isLoading}
          >
            {isProcessing
              ? "Fetching quote"
              : isLoading
                ? "Fetching quote"
                : "Confirm and deposit"}
          </Button>
        </div>
      </CardContent>
    </>
  );
};

export default DemoConfirmationContainer;
