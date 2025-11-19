# `getUnifiedBalances` End-to-End Guide

The `getUnifiedBalances` method collects a user's on-chain portfolio across every chain that Nexus knows about. The call is a great way to have a single source of truth for every balance-aware widget in your application, from asset pickers to transaction reviews and more. Handling and setting up the the experience well in your front-end requires a bit more work as you depend on a larger number of concurrent calls with different properties and guarantees. This document provides some best practices for working with the call in your UI to achieve the best results.

This document walks through:

1. Preparing the SDK
2. Calling `getUnifiedBalances`
3. Understanding the response shape
4. Rendering balances in a production-ready UI with resilient UX patterns

---

## 1. Prerequisites

- Install the core SDK and peers: `npm install @avail-project/nexus-core viem`
- Make sure you have a connected wallet provider (e.g., `window.ethereum`)
- Initialize the SDK once during app bootstrap, then reuse the instance everywhere

```ts
import { NexusSDK } from '@avail-project/nexus-core';

const sdk = new NexusSDK({ network: 'mainnet' });
await sdk.initialize(window.ethereum);
```

> **Tip:** Run `initialize` after the wallet is connected. This lets Nexus read the current account and chain before any balance calls go out.

---

## 2. Fetching unified balances

```ts
const balances = await sdk.getUnifiedBalances();
```

Calling `getUnifiedBalances` automatically:

- Fetches balances for every supported chain
- Normalizes token decimals
- Calculates fiat equivalents (USD) for each entry
- Groups the raw sources in a `breakdown` array so UIs can explain where funds sit

Because `getUnifiedBalances` makes multiple RPC/intent requests under the hood, prefer memoized calls (React Query, SWR, Zustand store) instead of calling it inside render loops.

---

## 3. Response shape

Each entry in the returned array is a `UserAsset`:

```ts
export type UserAsset = {
  symbol: string;           // e.g., 'USDC'
  decimals: number;         // 6 for USDC, 18 for ETH, etc.
  balance: string;          // human-readable balance (already decimal adjusted)
  balanceInFiat: number;    // USD value of the total balance
  icon?: string;            // CDN URL for token icon (optional)
  abstracted?: boolean;     // True if the asset is available via chain abstraction
  breakdown: Array<{
    balance: string;        // chain-specific portion of the balance
    balanceInFiat: number;  // USD value for that portion
    chain: {
      id: number;           // EVM chain ID
      name: string;         // Human label, e.g., 'Base'
      logo: string;         // Logo URL for the chain
    };
    decimals: number;
    contractAddress: `0x${string}`;
    isNative?: boolean;     // Native ETH/MATIC/etc.
    universe: 'evm' | 'fuel' | 'cosmos';
  }>;
};
```

### Common UI operations

- Convert `balance` to `number` or `bigint` for calculations via `parseFloat` / `parseUnits`
- Aggregate totals per chain by summing `breakdown`
- Flag abstracted balances (e.g., "Available through Chain Abstraction")

---

## 4. UI integration best practices

### 4.1 React hook using TanStack Query (recommended)

```tsx
import { useQuery } from '@tanstack/react-query';
import { sdk } from './nexus-sdk-instance';

export function useUnifiedBalances() {
  return useQuery({
    queryKey: ['nexus', 'unified-balances'],
    queryFn: () => sdk.getUnifiedBalances(),
    staleTime: 30_000,        // cache for 30s to avoid spam
    refetchInterval: 60_000,  // background refresh
    retry: 2,                 // auto-retry transient RPC issues
  });
}
```

Why TanStack Query?

- Deduplicates concurrent requests when multiple components need balances
- Survives re-renders and route changes
- Gives you `isLoading`, `isError`, and `refetch` helpers for UI states

### 4.2 Rendering component with skeleton, error, empty states

```tsx
import { formatUSD } from './currency';
import { useUnifiedBalances } from './useUnifiedBalances';

export function PortfolioPanel() {
  const { data, isLoading, isError, refetch } = useUnifiedBalances();

  if (isLoading) return <Skeleton rows={3} />;
  if (isError)
    return (
      <StateCard
        title="Unable to load balances"
        description="Check your wallet connection and try again."
        actionLabel="Retry"
        onAction={refetch}
      />
    );

  if (!data?.length) return <StateCard title="No assets yet" description="Bridge or deposit to get started." />;

  return (
    <section className="portfolio">
      {data.map((asset) => (
        <article key={asset.symbol} className="portfolio__row">
          <div className="portfolio__token">
            <TokenAvatar symbol={asset.symbol} icon={asset.icon} />
            <div>
              <strong>{asset.symbol}</strong>
              <span>{asset.balance}</span>
            </div>
          </div>
          <div className="portfolio__fiat">{formatUSD(asset.balanceInFiat)}</div>
          <button onClick={() => openBreakdown(asset)}>View chains</button>
        </article>
      ))}
    </section>
  );
}
```

### 4.3 Showing the chain breakdown (modal or drawer)

```tsx
function openBreakdown(asset: UserAsset) {
  showModal({
    title: `${asset.symbol} sources`,
    body: (
      <ul>
        {asset.breakdown.map((entry) => (
          <li key={`${entry.chain.id}-${entry.contractAddress}`}>
            <ChainAvatar name={entry.chain.name} logo={entry.chain.logo} />
            <span>{entry.balance}</span>
            <span>{formatUSD(entry.balanceInFiat)}</span>
            {entry.isNative && <Badge>Native</Badge>}
            {asset.abstracted && <Badge tone="blue">Abstracted</Badge>}
          </li>
        ))}
      </ul>
    ),
  });
}
```

### 4.4 Additional UX recommendations

- **Keep totals consistent**: Derive UI totals from `balanceInFiat` rather than recalculating on the client, to avoid rounding drift with large decimal tokens.
- **Sort deterministically**: Sort by `balanceInFiat` (desc) or alphabetically so that rows do not jump between renders.
- **Respect chain context**: When a user switches wallet chains, call `sdk.initialize` again or trigger a refetch so balances stay accurate.
- **Highlight actionable entries**: Show "Bridge" or "Send" buttons inline when `asset.balanceInFiat` exceeds a threshold.
- **Avoid blocking UI**: Never gate the page behind the balance call; render skeletons or cached data immediately and refresh in the background.
- **Accessibility**: Use semantic lists/tables and ensure fiat + token amounts have `aria-label`s (e.g., "15.23 USDC on Base").

---

## 5. Testing strategies

- **Unit test parsing**: Mock `sdk.getUnifiedBalances` to return fixture data and ensure your selectors (totals, breakdown) behave as expected.
- **Integration test flows**: In Playwright/Cypress, stub the SDK call to simulate loading, error, and success states.
- **Performance checks**: Measure render time with 20+ assets to ensure the UI remains responsive; memoize derived data if necessary.

With these patterns, `getUnifiedBalances` becomes a single source of truth for every balance-aware widget in your application, from asset pickers to transaction reviews.
