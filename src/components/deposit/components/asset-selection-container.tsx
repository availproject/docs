"use client";

import { formatTokenBalance, type UserAsset } from "@avail-project/nexus-core";
import { X } from "lucide-react";
import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usdFormatter } from "../../common";
import { Button } from "../../ui/button";
import { CardContent } from "../../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  PROGRESS_BAR_ANIMATION_DELAY_MS,
  PROGRESS_BAR_EXIT_DURATION_MS,
  SCROLL_THRESHOLD_PX,
} from "../constants/widget";
import type {
  ChainItem,
  DepositWidgetContextValue,
  Token,
  TokenCategory,
} from "../types";
import {
  checkIfMatchesPreset,
  isNative,
  isStablecoin,
} from "../utils/asset-helpers";
import { ChevronDownIcon } from "./icons";
import TokenRow from "./token-row";
import WidgetHeader from "./widget-header";

interface AssetSelectionContainerProps {
  widget: DepositWidgetContextValue;
  heading?: string;
  onClose?: () => void;
}

function transformSwapBalanceToTokens(
  swapBalance: UserAsset[] | null,
): Token[] {
  if (!swapBalance) return [];
  console.log("SWAP_BALANCE", swapBalance);
  return swapBalance
    .filter((asset) => asset.breakdown && asset.breakdown.length > 0)
    .map((asset) => {
      const chains: ChainItem[] = (asset.breakdown || [])
        .filter((b) => b.chain && b.balance)
        .map((b) => {
          const balanceNum = parseFloat(b.balance);
          return {
            id: `${b.contractAddress}-${b.chain.id}`,
            tokenAddress: b.contractAddress as `0x${string}`,
            chainId: b.chain.id,
            name: b.chain.name,
            usdValue: b.balanceInFiat,
            amount: balanceNum,
          };
        })
        .sort((a, b) => {
          const aVal = a.usdValue;
          const bVal = b.usdValue;
          return bVal - aVal;
        });

      const totalUsdValue = chains.reduce((sum, c) => sum + c.usdValue, 0);

      const totalAmount = chains.reduce((sum, c) => sum + c.amount, 0);

      let category: TokenCategory;
      if (isStablecoin(asset.symbol)) {
        category = "stablecoin";
      } else if (isNative(asset.symbol)) {
        category = "native";
      } else {
        category = "memecoin";
      }

      return {
        id: asset.symbol,
        symbol: asset.symbol,
        chainsLabel:
          chains.length > 1
            ? `${chains.length} Chain${chains.length !== 1 ? "s" : ""}`
            : chains[0].name,
        usdValue: usdFormatter.format(totalUsdValue),
        amount: formatTokenBalance(totalAmount, {
          decimals: asset.decimals,
          symbol: asset.symbol,
        }),
        decimals: asset.decimals,
        logo: asset.icon || "",
        category,
        chains,
      };
    });
}

const AssetSelectionContainer = ({
  widget,
  heading,
  onClose,
}: AssetSelectionContainerProps) => {
  const { assetSelection, setAssetSelection, swapBalance } = widget;

  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [isProgressBarEntering, setIsProgressBarEntering] = useState(false);
  const [isProgressBarExiting, setIsProgressBarExiting] = useState(false);
  const [showStickyPopular, setShowStickyPopular] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const popularSectionRef = useRef<HTMLDivElement>(null);

  const selectedChainIds = assetSelection.selectedChainIds;
  const filter = assetSelection.filter;
  const expandedTokens = assetSelection.expandedTokens;

  // Defer expensive token transformation to avoid blocking UI
  const deferredSwapBalance = useDeferredValue(swapBalance);

  const tokens = useMemo(
    () => transformSwapBalanceToTokens(deferredSwapBalance),
    [deferredSwapBalance],
  );

  // Build index Map for O(1) token lookups (js-index-maps)
  const tokensById = useMemo(
    () => new Map(tokens.map((t) => [t.id, t])),
    [tokens],
  );

  const mainTokens = useMemo(
    () =>
      tokens.filter(
        (t) => t.category === "stablecoin" || t.category === "native",
      ),
    [tokens],
  );

  const otherTokens = useMemo(
    () => tokens.filter((t) => t.category === "memecoin"),
    [tokens],
  );

  const selectedAmount = useMemo(() => {
    let total = 0;
    tokens.forEach((token) => {
      token.chains.forEach((chain) => {
        if (selectedChainIds.has(chain.id)) {
          total += chain.usdValue;
        }
      });
    });
    return total;
  }, [tokens, selectedChainIds]);

  const requiredAmount = widget.inputs.amount
    ? parseFloat(widget.inputs.amount.replace(/,/g, ""))
    : 0;

  const showProgressBar = requiredAmount > 0 && requiredAmount > selectedAmount;
  const progressPercent =
    requiredAmount > 0
      ? Math.min((selectedAmount / requiredAmount) * 100, 100)
      : 0;

  useEffect(() => {
    if (showProgressBar) {
      setIsProgressBarVisible(true);
      setIsProgressBarExiting(false);
      setIsProgressBarEntering(true);
      const timer = setTimeout(() => {
        setIsProgressBarEntering(false);
      }, PROGRESS_BAR_ANIMATION_DELAY_MS);
      return () => clearTimeout(timer);
    } else if (isProgressBarVisible) {
      setIsProgressBarExiting(true);
      const timer = setTimeout(() => {
        setIsProgressBarVisible(false);
        setIsProgressBarExiting(false);
      }, PROGRESS_BAR_EXIT_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [showProgressBar, isProgressBarVisible]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Use startTransition for non-urgent scroll updates (rerender-transitions)
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      startTransition(() => {
        setShowStickyPopular(scrollTop > SCROLL_THRESHOLD_PX);
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPopular = useCallback(() => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handlePresetClick = useCallback(
    (preset: "all" | "stablecoins" | "native") => {
      const newChainIds = new Set<string>();
      tokens.forEach((token) => {
        const shouldInclude =
          preset === "all" ||
          (preset === "stablecoins" && token.category === "stablecoin") ||
          (preset === "native" && token.category === "native");

        if (shouldInclude) {
          token.chains.forEach((chain) => newChainIds.add(chain.id));
        }
      });
      setAssetSelection({
        selectedChainIds: newChainIds,
        filter: preset,
      });
    },
    [tokens, setAssetSelection],
  );

  const toggleTokenSelection = useCallback(
    (tokenId: string) => {
      const token = tokensById.get(tokenId); // O(1) lookup instead of O(n)
      if (!token) return;

      const allChainsSelected = token.chains.every((c) =>
        selectedChainIds.has(c.id),
      );
      const newChainIds = new Set(selectedChainIds);

      if (allChainsSelected) {
        token.chains.forEach((chain) => newChainIds.delete(chain.id));
      } else {
        token.chains.forEach((chain) => newChainIds.add(chain.id));
      }

      const newFilter = checkIfMatchesPreset(tokens, newChainIds);
      setAssetSelection({
        selectedChainIds: newChainIds,
        filter: newFilter,
      });
    },
    [tokens, tokensById, selectedChainIds, setAssetSelection],
  );

  const toggleChainSelection = useCallback(
    (chainId: string) => {
      const newChainIds = new Set(selectedChainIds);
      if (newChainIds.has(chainId)) {
        newChainIds.delete(chainId);
      } else {
        newChainIds.add(chainId);
      }

      const newFilter = checkIfMatchesPreset(tokens, newChainIds);
      setAssetSelection({
        selectedChainIds: newChainIds,
        filter: newFilter,
      });
    },
    [tokens, selectedChainIds, setAssetSelection],
  );

  const toggleExpanded = useCallback(
    (tokenId: string) => {
      let newExpanded = new Set(expandedTokens);
      if (tokenId === "others-section") {
        if (newExpanded.has("others-section")) {
          newExpanded.delete("others-section");
        } else {
          newExpanded = new Set(newExpanded);
          newExpanded.add("others-section");
          setTimeout(() => {
            if (scrollContainerRef.current) {
              const currentScrollTop = scrollContainerRef.current.scrollTop;
              scrollContainerRef.current.scrollTo({
                top: currentScrollTop + 70,
                behavior: "smooth",
              });
            }
          }, 100);
        }
      } else {
        const othersExpanded = newExpanded.has("others-section");
        if (newExpanded.has(tokenId)) {
          newExpanded = othersExpanded
            ? new Set(["others-section"])
            : new Set();
        } else {
          newExpanded = othersExpanded
            ? new Set(["others-section", tokenId])
            : new Set([tokenId]);
        }
      }
      setAssetSelection({ expandedTokens: newExpanded });
    },
    [expandedTokens, setAssetSelection],
  );

  const handleDeselectAll = useCallback(() => {
    setAssetSelection({
      selectedChainIds: new Set(),
      filter: "custom",
    });
  }, [setAssetSelection]);

  const handleDone = useCallback(() => {
    widget.goToStep("amount");
  }, [widget]);

  return (
    <>
      <WidgetHeader
        title={heading ?? ""}
        onBack={widget.goBack}
        onClose={onClose}
        depositTargetLogo={widget?.destination?.depositTargetLogo}
      />
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Tabs
              value={filter}
              onValueChange={(value) => {
                if (value !== "custom") {
                  handlePresetClick(value as "all" | "stablecoins" | "native");
                }
              }}
            >
              <TabsList>
                <TabsTrigger value="all">Any token</TabsTrigger>
                <TabsTrigger value="stablecoins">Stablecoins</TabsTrigger>
                <TabsTrigger value="native">Native</TabsTrigger>
                {filter === "custom" && (
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                )}
              </TabsList>
            </Tabs>
            <button
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={handleDeselectAll}
            >
              {filter === "custom" ? <X className="size-4" /> : "Deselect all"}
            </button>
          </div>

          <div className="flex flex-col">
            <div className="relative">
              {showStickyPopular && mainTokens.length > 0 && (
                <button
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-10 text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer border border-primary/10 px-2 py-1 bg-background"
                  onClick={scrollToPopular}
                >
                  Popular
                </button>
              )}
              <div
                ref={scrollContainerRef}
                className="w-full overflow-y-auto max-h-[300px] scrollbar-hide"
              >
                {mainTokens.length > 0 && (
                  <div
                    ref={popularSectionRef}
                    className="w-full rounded-lg border overflow-hidden"
                  >
                    <div className="px-5 py-2 bg-muted/30 border-b">
                      <span className="font-sans text-xs font-medium text-muted-foreground">
                        Popular
                      </span>
                    </div>
                    {mainTokens.map((token, index) => (
                      <TokenRow
                        key={token.id}
                        token={token}
                        selectedChainIds={selectedChainIds}
                        isExpanded={expandedTokens.has(token.id)}
                        onToggleExpand={() => toggleExpanded(token.id)}
                        onToggleToken={() => toggleTokenSelection(token.id)}
                        onToggleChain={toggleChainSelection}
                        isFirst={false}
                        isLast={index === mainTokens.length - 1}
                      />
                    ))}
                  </div>
                )}

                {otherTokens.length > 0 && (
                  <div className="w-full bg-card rounded-t-lg border overflow-hidden mt-4">
                    <div
                      className="p-5 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleExpanded("others-section")}
                    >
                      <span className="font-sans text-sm text-muted-foreground">
                        Others ({otherTokens.length})
                      </span>
                      <ChevronDownIcon
                        className={`text-muted-foreground transition-transform duration-200 ${
                          expandedTokens.has("others-section")
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>

                    {expandedTokens.has("others-section") && (
                      <div className="w-full border-t">
                        {otherTokens.map((token, index) => (
                          <TokenRow
                            key={token.id}
                            token={token}
                            selectedChainIds={selectedChainIds}
                            isExpanded={expandedTokens.has(token.id)}
                            onToggleExpand={() => toggleExpanded(token.id)}
                            onToggleToken={() => toggleTokenSelection(token.id)}
                            onToggleChain={toggleChainSelection}
                            isFirst={index === 0}
                            isLast={index === otherTokens.length - 1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!showProgressBar && (
                <div
                  className="absolute bottom-0 left-px right-px h-12 pointer-events-none dark:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--background) 100%)",
                  }}
                />
              )}
              {!showProgressBar && (
                <div
                  className="absolute bottom-0 left-px right-px h-12 pointer-events-none hidden dark:block"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--background) 100%)",
                  }}
                />
              )}
            </div>

            <Button className="w-full rounded-t-none" onClick={handleDone}>
              Done
            </Button>
          </div>
        </div>
      </CardContent>

      {isProgressBarVisible && (
        <div
          className={`absolute -bottom-6 left-0 right-0 z-20 flex flex-col gap-2 pt-5 pb-8 px-7 bg-card border-t shadow-[0_-11px_12px_0_rgba(91,91,91,0.05)] transform transition-transform duration-300 ease-out ${
            isProgressBarEntering || isProgressBarExiting
              ? "translate-y-full"
              : "translate-y-0"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Selected / Required
            </span>
            <span className="text-sm">
              <span className="font-semibold text-card-foreground">
                ${selectedAmount.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                {" "}
                / ${requiredAmount.toLocaleString()}
              </span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AssetSelectionContainer;
