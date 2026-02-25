"use client";

import { MagnifyingGlass } from "@phosphor-icons/react/ssr";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import {
  type Chain,
  mainnetChains,
  testnetChains,
  tokenReference,
} from "./data";

function ChainRows({
  chains,
  showSwaps,
  query,
}: {
  chains: Chain[];
  showSwaps: boolean;
  query: string;
}) {
  const filtered = useMemo(() => {
    if (!query) return chains;
    const q = query.toLowerCase();
    return chains.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.chainId.toString().includes(q) ||
        c.native.toLowerCase().includes(q),
    );
  }, [chains, query]);

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block">
        <div className="overflow-hidden border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Network
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Chain ID
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Native
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Supported Tokens
                </th>
                {showSwaps && (
                  <th className="px-4 py-2.5 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Swaps
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((chain) => (
                <tr
                  key={chain.chainId}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {chain.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {chain.chainId.toLocaleString("en-US", {
                      useGrouping: false,
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className="rounded-none font-mono text-xs"
                    >
                      {chain.native}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {chain.tokens.map((token) => (
                        <Badge
                          key={token}
                          variant="secondary"
                          className="rounded-none font-mono text-xs"
                        >
                          {token}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  {showSwaps && (
                    <td className="px-4 py-3 text-right">
                      {chain.swaps ? (
                        <Badge className="rounded-none bg-feedback-success-background text-feedback-success-foreground border-transparent text-xs">
                          Enabled
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={showSwaps ? 5 : 4}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    No chains match &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {filtered.map((chain) => (
          <div
            key={chain.chainId}
            className="border border-border bg-card p-4 shadow-[var(--shadow-xs)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium text-foreground">{chain.name}</span>
              {showSwaps && chain.swaps && (
                <Badge className="rounded-none bg-feedback-success-background text-feedback-success-foreground border-transparent text-xs">
                  Swaps
                </Badge>
              )}
            </div>
            <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                ID:{" "}
                <span className="font-mono tabular-nums">{chain.chainId}</span>
              </span>
              <span>
                Native:{" "}
                <Badge
                  variant="outline"
                  className="rounded-none font-mono text-xs"
                >
                  {chain.native}
                </Badge>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {chain.tokens.map((token) => (
                <Badge
                  key={token}
                  variant="secondary"
                  className="rounded-none font-mono text-xs"
                >
                  {token}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No chains match &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </>
  );
}

function TokenReferenceTable() {
  return (
    <div className="overflow-hidden border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted">
            <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Token
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Name
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Decimals
            </th>
          </tr>
        </thead>
        <tbody>
          {tokenReference.map((token) => (
            <tr
              key={token.symbol}
              className="border-b border-border last:border-b-0"
            >
              <td className="px-4 py-2.5">
                <Badge
                  variant="secondary"
                  className="rounded-none font-mono text-xs"
                >
                  {token.symbol}
                </Badge>
              </td>
              <td className="px-4 py-2.5 text-foreground">{token.name}</td>
              <td className="px-4 py-2.5 text-right font-mono text-muted-foreground tabular-nums">
                {token.decimals}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SupportedChainsTable() {
  const [query, setQuery] = useState("");

  return (
    <div className={cn("mt-6 space-y-8")}>
      <Tabs defaultValue="mainnet">
        <div className="flex items-center justify-between gap-4">
          <TabsList className="rounded-none">
            <TabsTrigger value="mainnet" className="rounded-none">
              Mainnet
            </TabsTrigger>
            <TabsTrigger value="testnet" className="rounded-none">
              Testnet
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <MagnifyingGlass
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
              weight="bold"
            />
            <input
              type="text"
              placeholder="Filter chains..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full max-w-xs rounded-none border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <TabsContent value="mainnet" className="mt-4">
          <ChainRows chains={mainnetChains} showSwaps query={query} />
        </TabsContent>
        <TabsContent value="testnet" className="mt-4">
          <p className="mb-4 border border-border bg-feedback-info-background px-4 py-3 text-sm text-feedback-info-foreground">
            Swaps are not supported in testnet environments on Nexus.
          </p>
          <ChainRows chains={testnetChains} showSwaps={false} query={query} />
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Token Reference
        </h2>
        <TokenReferenceTable />
      </div>
    </div>
  );
}
