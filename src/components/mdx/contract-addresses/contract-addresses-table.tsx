"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  type TokenEntry,
  usdcMainnet,
  usdcTestnet,
  usdtMainnet,
  usdtTestnet,
  type VaultEntry,
  vaultMainnet,
  vaultTestnet,
} from "./data";

const tokenData = {
  usdc: { mainnet: usdcMainnet, testnet: usdcTestnet },
  usdt: { mainnet: usdtMainnet, testnet: usdtTestnet },
} as const;

type TokenKey = keyof typeof tokenData;

function VaultRows({ entries }: { entries: VaultEntry[] }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block">
        <div className="overflow-hidden border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Chain
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Chain ID
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Vault Contract Address
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.chainId}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {entry.chain}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {entry.chainId}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground break-all">
                    {entry.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {entries.map((entry) => (
          <div
            key={entry.chainId}
            className="border border-border bg-card p-4 shadow-[var(--shadow-xs)]"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-foreground">{entry.chain}</span>
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {entry.chainId}
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground break-all">
              {entry.address}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function TokenRows({ entries }: { entries: TokenEntry[] }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block">
        <div className="overflow-hidden border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Chain
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Contract Address
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.chain}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {entry.chain}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground break-all">
                    {entry.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {entries.map((entry) => (
          <div
            key={entry.chain}
            className="border border-border bg-card p-4 shadow-[var(--shadow-xs)]"
          >
            <span className="mb-2 block font-medium text-foreground">
              {entry.chain}
            </span>
            <p className="font-mono text-xs text-muted-foreground break-all">
              {entry.address}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export function VaultContractTable() {
  return (
    <Tabs defaultValue="mainnet" className="mt-6">
      <TabsList className="rounded-none">
        <TabsTrigger value="mainnet" className="rounded-none">
          Mainnet
        </TabsTrigger>
        <TabsTrigger value="testnet" className="rounded-none">
          Testnet
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mainnet" className="mt-4">
        <VaultRows entries={vaultMainnet} />
      </TabsContent>
      <TabsContent value="testnet" className="mt-4">
        <VaultRows entries={vaultTestnet} />
      </TabsContent>
    </Tabs>
  );
}

export function TokenAddressesTable() {
  const [token, setToken] = useState<TokenKey>("usdc");

  return (
    <Tabs defaultValue="mainnet" className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <TabsList className="rounded-none">
          <TabsTrigger value="mainnet" className="rounded-none">
            Mainnet
          </TabsTrigger>
          <TabsTrigger value="testnet" className="rounded-none">
            Testnet
          </TabsTrigger>
        </TabsList>

        <Select value={token} onValueChange={(v) => setToken(v as TokenKey)}>
          <SelectTrigger className="rounded-none font-medium text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="usdc" className="rounded-none">
              USDC
            </SelectItem>
            <SelectItem value="usdt" className="rounded-none">
              USDT
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsContent value="mainnet" className="mt-4">
        <TokenRows entries={tokenData[token].mainnet} />
      </TabsContent>
      <TabsContent value="testnet" className="mt-4">
        <TokenRows entries={tokenData[token].testnet} />
      </TabsContent>
    </Tabs>
  );
}
