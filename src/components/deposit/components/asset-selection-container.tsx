"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each `at` value is ms after mount.
 *
 *    0ms   component mounts, everything invisible
 *  100ms   card container fades in, scale 0.96 → 1.0
 *  200ms   header fades in + slides down from -8px
 *  350ms   search bar fades in + slides down from -8px
 *  500ms   token rows stagger in (120ms each, slide up from 12px)
 *  980ms   done button fades in + slides up from 8px
 * ───────────────────────────────────────────────────────── */

import { formatTokenBalance, type UserAsset } from "@avail-project/nexus-core";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usdFormatter } from "../../common";
import { Button } from "../../ui/button";
import { CardContent } from "../../ui/card";
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
import { CoinIcon } from "./icons";
import TokenRow from "./token-row";

/* ── Timing ─────────────────────────────────────────────── */

const TIMING = {
  cardAppear: 100, // card fades in and scales up
  header: 200, // header fades in + slides down
  searchBar: 350, // search bar appears
  tokenRows: 500, // first token row starts staggering
  doneButton: 980, // done button fades in
};

/* ── Element configs ────────────────────────────────────── */

/* Card container */
const CARD = {
  initialScale: 0.96, // scale before appearing
  finalScale: 1.0, // resting scale
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

/* Header section */
const HEADER = {
  offsetY: -8, // px header slides from
  spring: { type: "spring" as const, stiffness: 350, damping: 28 },
};

/* Search input */
const SEARCH = {
  offsetY: -8, // px search slides from
  spring: { type: "spring" as const, stiffness: 350, damping: 28 },
};

/* Token row list */
const ROWS = {
  stagger: 0.12, // seconds between each row
  offsetY: 12, // px each row slides up from
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

/* Done button */
const DONE_BUTTON = {
  offsetY: 8, // px button slides up from
  spring: { type: "spring" as const, stiffness: 350, damping: 28 },
};

/* ── Data transform ─────────────────────────────────────── */

function transformSwapBalanceToTokens(
  swapBalance: UserAsset[] | null,
): Token[] {
  if (!swapBalance) return [];
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
        .sort((a, b) => b.usdValue - a.usdValue);

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

/* ── Component ──────────────────────────────────────────── */

interface AssetSelectionContainerProps {
  widget: DepositWidgetContextValue;
  heading?: string;
  onClose?: () => void;
}

const AssetSelectionContainer = ({
  widget,
  onClose,
}: AssetSelectionContainerProps) => {
  const { assetSelection, setAssetSelection, swapBalance } = widget;
  const selectedChainIds = assetSelection.selectedChainIds;
  const expandedTokens = assetSelection.expandedTokens;

  /* ── Animation stage ── */
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setStage(0);
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setStage(1), TIMING.cardAppear));
    timers.push(setTimeout(() => setStage(2), TIMING.header));
    timers.push(setTimeout(() => setStage(3), TIMING.searchBar));
    timers.push(setTimeout(() => setStage(4), TIMING.tokenRows));
    timers.push(setTimeout(() => setStage(5), TIMING.doneButton));

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Search state ── */
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Token data ── */
  const tokens = useMemo(
    () => transformSwapBalanceToTokens(swapBalance),
    [swapBalance],
  );

  const tokensById = useMemo(
    () => new Map(tokens.map((t) => [t.id, t])),
    [tokens],
  );

  const filteredTokens = useMemo(() => {
    if (!searchQuery.trim()) return tokens;
    const query = searchQuery.toLowerCase();
    return tokens.filter(
      (t) =>
        t.symbol.toLowerCase().includes(query) ||
        t.chainsLabel.toLowerCase().includes(query),
    );
  }, [tokens, searchQuery]);

  /* ── Selected count ── */
  const selectedCount = useMemo(() => {
    let count = 0;
    tokens.forEach((token) => {
      const hasSelected = token.chains.some((c) => selectedChainIds.has(c.id));
      if (hasSelected) count++;
    });
    return count;
  }, [tokens, selectedChainIds]);

  /* ── Handlers ── */
  const toggleTokenSelection = useCallback(
    (tokenId: string) => {
      const token = tokensById.get(tokenId);
      if (!token) return;

      const allChainsSelected = token.chains.every((c) =>
        selectedChainIds.has(c.id),
      );
      const newChainIds = new Set(selectedChainIds);

      if (allChainsSelected) {
        for (const chain of token.chains) newChainIds.delete(chain.id);
      } else {
        for (const chain of token.chains) newChainIds.add(chain.id);
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
      const newExpanded = new Set(expandedTokens);
      if (newExpanded.has(tokenId)) {
        newExpanded.delete(tokenId);
      } else {
        // Collapse other tokens, expand this one
        const cleaned = new Set<string>();
        cleaned.add(tokenId);
        setAssetSelection({ expandedTokens: cleaned });
        return;
      }
      setAssetSelection({ expandedTokens: newExpanded });
    },
    [expandedTokens, setAssetSelection],
  );

  const handleDone = useCallback(() => {
    widget.goToStep("amount");
  }, [widget]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      widget.goToStep("amount");
    }
  }, [onClose, widget]);

  /* ── Render ── */
  return (
    <CardContent className="p-3">
      <motion.div
        initial={{ opacity: 0, scale: CARD.initialScale }}
        animate={{
          opacity: stage >= 1 ? 1 : 0,
          scale: stage >= 1 ? CARD.finalScale : CARD.initialScale,
        }}
        transition={CARD.spring}
        className="flex flex-col gap-5"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: HEADER.offsetY }}
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : HEADER.offsetY,
          }}
          transition={HEADER.spring}
          className="flex items-center justify-between p-3 rounded-t-lg"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--card) 0%, transparent 100%)",
          }}
        >
          <div className="flex gap-3 items-center">
            <CoinIcon className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <span className="text-sm leading-[18px] text-card-foreground">
                Paying with
              </span>
              <span className="text-[13px] leading-[18px] text-muted-foreground">
                {selectedCount} asset{selectedCount !== 1 ? "s" : ""} selected
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="size-5 flex items-center justify-center group/close"
          >
            <X
              size={12}
              className="text-muted-foreground group-hover/close:text-foreground transition-colors"
            />
          </button>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: SEARCH.offsetY }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            y: stage >= 3 ? 0 : SEARCH.offsetY,
          }}
          transition={SEARCH.spring}
        >
          <div className="flex gap-2 items-center bg-muted rounded-lg px-4 py-3">
            <MagnifyingGlass
              size={20}
              className="text-muted-foreground shrink-0"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>
        </motion.div>

        {/* Token list */}
        <div className="flex flex-col gap-3">
          <div className="border rounded-lg overflow-hidden">
            {filteredTokens.map((token, i) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, y: ROWS.offsetY }}
                animate={{
                  opacity: stage >= 4 ? 1 : 0,
                  y: stage >= 4 ? 0 : ROWS.offsetY,
                }}
                transition={{
                  ...ROWS.spring,
                  delay: i * ROWS.stagger,
                }}
              >
                <TokenRow
                  token={token}
                  selectedChainIds={selectedChainIds}
                  isExpanded={expandedTokens.has(token.id)}
                  onToggleExpand={() => toggleExpanded(token.id)}
                  onToggleToken={() => toggleTokenSelection(token.id)}
                  onToggleChain={toggleChainSelection}
                  isLast={i === filteredTokens.length - 1}
                />
              </motion.div>
            ))}
            {filteredTokens.length === 0 && (
              <div className="p-5 text-center text-sm text-muted-foreground">
                No tokens found
              </div>
            )}
          </div>

          {/* Done button */}
          <motion.div
            initial={{ opacity: 0, y: DONE_BUTTON.offsetY }}
            animate={{
              opacity: stage >= 5 ? 1 : 0,
              y: stage >= 5 ? 0 : DONE_BUTTON.offsetY,
            }}
            transition={DONE_BUTTON.spring}
          >
            <Button
              className="w-full h-12 rounded-xl text-sm font-medium"
              onClick={handleDone}
            >
              Done
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </CardContent>
  );
};

export default AssetSelectionContainer;
