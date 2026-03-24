"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usdFormatter } from "../../common";
import {
  ChevronDownIcon,
  CloseIcon,
  CoinIcon,
} from "../../deposit/components/icons";

interface TokenData {
  symbol: string;
  icon: string;
  iconBg?: string;
  chains: string;
  usdValue: number;
  amount: string;
}

const MOCK_TOKENS: TokenData[] = [
  {
    symbol: "USDC",
    icon: "/usdc.svg",
    chains: "3 Chains",
    usdValue: 1019,
    amount: "1019 USDC",
  },
  {
    symbol: "ETH",
    icon: "/ethereum.svg",
    chains: "2 Chains",
    usdValue: 1302,
    amount: "0.435 ETH",
  },
  {
    symbol: "SOL",
    icon: "",
    iconBg: "#000",
    chains: "Solana",
    usdValue: 1500,
    amount: "10 SOL",
  },
  {
    symbol: "USDT",
    icon: "",
    iconBg: "#50af95",
    chains: "Solana",
    usdValue: 267.89,
    amount: "1,550 USDT",
  },
  {
    symbol: "DAI",
    icon: "",
    iconBg: "#F5AC37",
    chains: "Ethereum",
    usdValue: 842.5,
    amount: "842.5 DAI",
  },
  {
    symbol: "MATIC",
    icon: "",
    iconBg: "#8247E5",
    chains: "Polygon",
    usdValue: 312.4,
    amount: "450 MATIC",
  },
  {
    symbol: "AVAX",
    icon: "",
    iconBg: "#E84142",
    chains: "Avalanche",
    usdValue: 189.75,
    amount: "5.2 AVAX",
  },
  {
    symbol: "ARB",
    icon: "",
    iconBg: "#28A0F0",
    chains: "Arbitrum",
    usdValue: 95.2,
    amount: "82 ARB",
  },
];

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Footer Transition
 *
 * Trigger: isSufficient becomes true (selectedTotal >= requiredAmount)
 *
 *    0ms   progress bar snaps to 100% width
 *  400ms   progress bar section collapses + Done button expands
 *  900ms   transition complete
 *
 * Reverse (isSufficient → false): immediate reset, no staged sequence
 * ───────────────────────────────────────────────────────── */

const FOOTER_TIMING = {
  swap: 400, // ms before collapsing progress bar and expanding Done button
};

interface TokenSelectionProps {
  requiredAmount: number;
  onClose: () => void;
  onDone: (selectedTokens: Set<string>) => void;
  inline?: boolean;
  hideHeader?: boolean;
  selected?: Set<string>;
  onSelectedChange?: (selected: Set<string>) => void;
  initialSelected?: Set<string>;
}

export function TokenSelection({
  requiredAmount,
  onClose,
  onDone,
  inline = false,
  hideHeader = false,
  selected: externalSelected,
  onSelectedChange,
  initialSelected,
}: TokenSelectionProps) {
  const [internalSelected, setInternalSelected] = useState<Set<string>>(
    () => new Set(["USDC"]),
  );
  const selected = externalSelected ?? internalSelected;
  const setSelected = onSelectedChange ?? setInternalSelected;
  const [search, setSearch] = useState("");

  const filteredTokens = useMemo(() => {
    if (!search) return MOCK_TOKENS;
    const q = search.toLowerCase();
    return MOCK_TOKENS.filter(
      (t) =>
        t.symbol.toLowerCase().includes(q) ||
        t.chains.toLowerCase().includes(q),
    );
  }, [search]);

  const selectedTotal = useMemo(
    () =>
      MOCK_TOKENS.filter((t) => selected.has(t.symbol)).reduce(
        (sum, t) => sum + t.usdValue,
        0,
      ),
    [selected],
  );

  const isSufficient = selectedTotal >= requiredAmount;
  const hasChanges = useMemo(() => {
    if (!initialSelected) return true;
    if (selected.size !== initialSelected.size) return true;
    for (const token of selected) {
      if (!initialSelected.has(token)) return true;
    }
    return false;
  }, [selected, initialSelected]);
  const progressPercent = Math.min((selectedTotal / requiredAmount) * 100, 100);

  // Footer animation stage: 0 = progress bar, 1 = bar filled, 2 = Done button
  const [footerStage, setFooterStage] = useState(() =>
    selectedTotal >= requiredAmount ? 2 : 0,
  );

  useEffect(() => {
    if (isSufficient) {
      // If already at stage 2 (e.g. initial mount), stay there
      setFooterStage((prev) => (prev === 2 ? 2 : 1));
      const timer = setTimeout(() => setFooterStage(2), FOOTER_TIMING.swap);
      return () => clearTimeout(timer);
    }
    setFooterStage(0);
  }, [isSufficient]);

  const toggleToken = (symbol: string) => {
    const next = new Set(selected);
    if (next.has(symbol)) {
      next.delete(symbol);
    } else {
      next.add(symbol);
    }
    setSelected(next);
  };

  const tokenRows = (
    <div>
      {filteredTokens.map((token, index) => {
        const isChecked = selected.has(token.symbol);
        const isLast = index === filteredTokens.length - 1;

        return (
          <button
            key={token.symbol}
            type="button"
            onClick={() => toggleToken(token.symbol)}
            className={`flex w-full cursor-pointer items-center gap-5 bg-card p-4 text-left transition-colors duration-100 hover:bg-card/80 ${
              !isLast ? "border-b" : ""
            }`}
          >
            <div
              className={`flex size-5 shrink-0 items-center justify-center rounded transition-colors duration-150 ${
                isChecked ? "bg-[#006bf4]" : "border-2 border-border bg-card"
              }`}
            >
              {isChecked && <div className="size-2 rounded-[2px] bg-white" />}
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center gap-3">
                  {token.icon ? (
                    <Image
                      src={token.icon}
                      alt={token.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <div
                      className="size-6 rounded-full"
                      style={{ backgroundColor: token.iconBg }}
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-[13px] font-medium tracking-[0.52px] text-foreground">
                      {token.symbol}
                    </span>
                    <span className="text-[13px] leading-[18px] text-muted-foreground">
                      {token.chains}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[13px] tabular-nums leading-[18px] text-foreground">
                    {usdFormatter.format(token.usdValue)}
                  </span>
                  <span className="text-[13px] tabular-nums leading-[18px] text-muted-foreground">
                    {token.amount}
                  </span>
                </div>
              </div>
              <div className="size-5 shrink-0">
                {isChecked && (
                  <ChevronDownIcon className="size-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  if (inline) {
    return tokenRows;
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-start justify-between ps-6 pe-5 pt-5">
          <div className="flex items-center gap-3">
            <CoinIcon className="size-5 shrink-0 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <span className="ui-14 text-foreground">Paying with</span>
              <span className="text-[13px] leading-[18px] text-muted-foreground">
                {selected.size} asset(s) selected
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-5 cursor-pointer items-center justify-center"
            aria-label="Close token selection"
          >
            <CloseIcon
              size={20}
              className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
            />
          </button>
        </div>
      )}

      {/* Search + Token list + Footer */}
      <div className="flex flex-col px-3 pb-3">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent ui-14 text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Token list */}
        <div className="mt-3 max-h-[316px] overflow-y-auto rounded-lg border">
          {tokenRows}
        </div>

        {/* Footer */}
        <div>
          {/* Done button — expands when selection changed & sufficient */}
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-spring motion-reduce:transition-none ${
              footerStage >= 2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-2 pb-2">
                <button
                  type="button"
                  onClick={() => onDone(selected)}
                  className="h-12 w-full cursor-pointer rounded-lg bg-[#006bf4] font-medium text-sm text-white shadow-[0_1px_4px_0_rgba(85,85,85,0.05)] transition-colors duration-150 hover:bg-[#0059cc]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar — expands when insufficient */}
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-spring motion-reduce:transition-none ${
              footerStage < 2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-4 px-3 pb-3 pt-[20px]">
                <div className="flex items-center justify-between">
                  <span className="ui-14 text-muted-foreground">
                    Selected / Required
                  </span>
                  <span className="text-sm tabular-nums">
                    <span className="font-display font-medium tracking-[0.56px] text-foreground">
                      {usdFormatter.format(selectedTotal)}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {usdFormatter.format(requiredAmount)}
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-[#006bf4] transition-[width] duration-200 ease-out"
                    style={{
                      width: `${footerStage >= 1 ? 100 : progressPercent}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
