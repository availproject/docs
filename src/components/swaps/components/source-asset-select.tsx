"use client";
import { type FC, useMemo, useState } from "react";
import { Button } from "../../ui/button";
import { useNexus } from "../../nexus/NexusProvider";
import {
  type UserAsset,
  type SUPPORTED_CHAINS_IDS,
  CHAIN_METADATA,
} from "@avail-project/nexus-core";
import { TOKEN_IMAGES } from "../config/destination";
import { Link2, Loader2, Search, X } from "lucide-react";
import { DialogClose } from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import { TokenIcon } from "./token-icon";
import { SHORT_CHAIN_NAME } from "../../common";
import { type SourceTokenInfo } from "../hooks/useSwaps";

interface SourceAssetSelectProps {
  onSelect: (chainId: SUPPORTED_CHAINS_IDS, token: SourceTokenInfo) => void;
  swapBalance: UserAsset[] | null;
}

const SourceAssetSelect: FC<SourceAssetSelectProps> = ({
  onSelect,
  swapBalance,
}) => {
  const { swapSupportedChainsAndTokens, nexusSDK } = useNexus();
  const [tempChain, setTempChain] = useState<{
    id: number;
    logo: string;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get all tokens from swapBalance with their chain info
  const allTokens: SourceTokenInfo[] = useMemo(() => {
    if (!swapBalance) return [];
    const tokens: SourceTokenInfo[] = [];

    for (const asset of swapBalance) {
      if (!asset?.breakdown?.length) continue;
      for (const breakdown of asset.breakdown) {
        if (Number.parseFloat(breakdown.balance) <= 0) continue;

        tokens.push({
          contractAddress: breakdown.contractAddress,
          decimals: breakdown.decimals ?? asset.decimals,
          logo: TOKEN_IMAGES[asset.symbol] ?? "",
          name: asset.symbol,
          symbol: asset.symbol,
          balance: nexusSDK?.utils?.formatTokenBalance(breakdown?.balance, {
            symbol: asset.symbol,
            decimals: asset.decimals,
          }),
          balanceInFiat: `$${breakdown.balanceInFiat}`,
          chainId: breakdown.chain?.id,
        });
      }
    }

    // Dedupe by contractAddress + chainId
    const unique = new Map<string, SourceTokenInfo>();
    for (const t of tokens) {
      const key = `${t.contractAddress.toLowerCase()}-${t.chainId}`;
      unique.set(key, t);
    }
    return Array.from(unique.values());
  }, [swapBalance, nexusSDK]);

  // Only show chains that have tokens with balance
  const chainsWithTokens = useMemo(() => {
    if (!swapSupportedChainsAndTokens || !allTokens.length) return [];
    const chainIdsWithTokens = new Set(allTokens.map((t) => t.chainId));
    return swapSupportedChainsAndTokens.filter((c) =>
      chainIdsWithTokens.has(c.id)
    );
  }, [swapSupportedChainsAndTokens, allTokens]);

  // Filter tokens by selected chain and search query
  const displayedTokens: SourceTokenInfo[] = useMemo(() => {
    let filtered = allTokens;

    // Filter by chain
    if (tempChain) {
      filtered = filtered.filter((t) => t.chainId === tempChain.id);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (t) =>
          t.symbol.toLowerCase().includes(query) ||
          t.name.toLowerCase().includes(query) ||
          t.contractAddress.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tempChain, allTokens, searchQuery]);

  const handlePick = (tok: SourceTokenInfo) => {
    const chainId = tempChain?.id ?? tok.chainId;
    if (!chainId) return;
    onSelect(chainId as SUPPORTED_CHAINS_IDS, tok);
  };

  if (!swapBalance)
    return (
      <div className="flex flex-col items-center justify-center gap-y-3">
        <p className="text-sm text-muted-foreground">
          Fetching swappable assets
        </p>
        <Loader2 className="animate-spin size-5" />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-y-3">
      <Select
        value={tempChain?.name}
        onValueChange={(value) => {
          const matchedChain = chainsWithTokens.find(
            (chain) => chain.name === value
          );
          if (matchedChain) {
            setTempChain(matchedChain);
          }
        }}
      >
        <div className="flex bg-input/30 w-full px-2 py-1.5">
          <div className="flex items-center gap-x-2 w-full justify-between">
            <Search className="size-5 opacity-65" />
            <input
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-foreground text-base font-medium outline-none transition-all duration-150 placeholder-muted-foreground proportional-nums disabled:opacity-80"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-0.5 hover:bg-muted rounded-full transition-colors"
              >
                <X className="size-4 opacity-65" />
              </button>
            )}
          </div>
          <SelectTrigger className="rounded-full border-none cursor-pointer bg-transparent!">
            {tempChain ? (
              <img
                src={tempChain?.logo}
                alt={tempChain?.name}
                width={24}
                height={24}
                className="rounded-full size-6"
              />
            ) : (
              <div className="size-8 rounded-full flex items-center justify-center border border-border">
                <Link2 className="size-4" />
              </div>
            )}
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectGroup>
            {chainsWithTokens.map((c) => (
              <SelectItem key={c.id} value={c.name}>
                <div className="flex items-center justify-between gap-x-2">
                  <img
                    src={c.logo}
                    alt={c.name}
                    width={20}
                    height={20}
                    className="rounded-full size-5"
                  />
                  <span className="text-sm">{c.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-sm">
        {tempChain?.id
          ? `Tokens on ${SHORT_CHAIN_NAME[tempChain.id]}`
          : "All Tokens"}
      </p>
      <div className="rounded-md max-h-80 overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center sm:items-start gap-y-4 w-full no-scrollbar">
          {displayedTokens.length > 0 ? (
            displayedTokens.map((t) => (
              <DialogClose asChild key={`${t.contractAddress}-${t.chainId}`}>
                <Button
                  variant={"ghost"}
                  onClick={() => handlePick(t)}
                  className="flex items-center justify-between gap-x-2 p-2 rounded w-full h-max"
                >
                  <div className="flex  items-center gap-x-4">
                    {t.symbol ? (
                      <div className="relative">
                        <TokenIcon
                          symbol={t.symbol}
                          tokenLogo={t.logo}
                          chainLogo={CHAIN_METADATA[t.chainId ?? 1]?.logo}
                          className="border border-border rounded-full"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-base text-foreground">{t.balance}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.balanceInFiat}
                    </p>
                  </div>
                </Button>
              </DialogClose>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No Tokens Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceAssetSelect;
