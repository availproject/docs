# End-to-End `bridgeAndExecute` Tutorial

A guided walkthrough for full-stack developers who want to move tokens **and** call a contract in one flow using `bridgeAndExecute`. If you already read the `getUnifiedBalances` tutorial, this picks up where it left off and focuses on the full bridge + execution journey with clear explanations, configuration tips, and response-handling best practices.

## What you will build

A minimal Node/TypeScript script that:

1. Initializes the Nexus SDK with your wallet provider
2. Simulates a bridge + execute flow to preview costs and approvals
3. Bridges USDC from Base to Ethereum **and** deposits it into a Yearn USDC vault
4. Streams progress updates (bridge + execution stages)
5. Waits for receipts and confirmations following production-ready practices

> Feel free to swap the contract, ABI, or destination chain—this tutorial highlights the pieces you need to change later on.

## Prerequisites

- Node 18+ and pnpm/npm/yarn
- An EIP-1193 provider (e.g., injected wallet like MetaMask, or a viem `walletClient` wrapped as a provider)
- USDC on Base for the example flow (or adjust `token`/`sourceChains` as needed)
- Basic TypeScript familiarity (no web3 expertise required)

## Install dependencies

```bash
npm install @avail-project/nexus-core viem dotenv
```

- `@avail-project/nexus-core` – headless SDK
- `viem` – ergonomic provider utilities (works great with Nexus)
- `dotenv` – keep keys out of source control

## Configure an EIP-1193 provider

Nexus only needs a standard EIP-1193 provider. The snippet below shows how to adapt a viem wallet client into that shape for Node scripts. In a browser app you can simply pass `window.ethereum`.

Note that the below example shows a simplified way of handling the private key (and secrets in general). For production, a better validation flow and secret handling is adviseable. 

```ts
// src/provider.ts
import { createWalletClient, http } from 'viem';
import { base, mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

// Use Base as the default chain; Nexus will route bridge legs for you
const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http(process.env.RPC_URL || 'https://mainnet.base.org'),
});

// viem exposes an EIP-1193-compatible provider on the client
export const provider = walletClient.transport as unknown as any; // satisfies EthereumProvider
```

> **Security tip:** keep `PRIVATE_KEY` and `RPC_URL` in `.env` and never commit them.

## Understand the `bridgeAndExecute` inputs

`bridgeAndExecute` combines a bridge with a contract call on the destination chain. Key properties:

- **token** – symbol from `SUPPORTED_TOKENS` (e.g., `"USDC"`).
- **amount** – string amount in token units (e.g., `"100"` for 100 USDC). The SDK normalizes to wei internally.
- **toChainId** – numeric chain ID where the contract call runs (Ethereum in the example).
- **sourceChains** – optional array restricting which chains to pull liquidity from. Use it to avoid slow/expensive sources.
- **execute** – describes the destination contract call:
  - `contractAddress`, `contractAbi`, `functionName` – standard ABI call details.
  - `buildFunctionParams(token, amount, chainId, userAddress)` – returns `{ functionParams, value? }` with properly formatted arguments. Use this to convert amounts to wei and insert token addresses for the target chain.
  - `tokenApproval` – optional approval to request before execution (token + amount in wei). Omit if not needed.
  - `value` – optional native value to forward (e.g., when calling a payable function).
- **waitForReceipt** – when `true`, SDK waits for the destination execution receipt.
- **requiredConfirmations** – number of block confirmations to wait for after the receipt (useful for production safety).

### Best practices before calling

1. **Always simulate** with `simulateBridgeAndExecute` to get gas/fee estimates, approval requirements, and the planned route.
2. **Validate balances** with `getUnifiedBalances` if you want to short-circuit when the user already has funds on the target chain.
3. **Cap approvals** – set `tokenApproval.amount` to the exact amount you need instead of `MAX_UINT`.
4. **Timeouts and polling** – keep `waitForReceipt` + `requiredConfirmations` for production, but surface a loading UI that respects the bridge duration.
5. **Log hashes** – persist `bridgeTransactionHash`, `approvalTransactionHash`, and `executeTransactionHash` so you can rehydrate UI state after a refresh.

## Full example

```ts
// src/bridge-and-execute.ts
import 'dotenv/config';
import { parseUnits } from 'viem';
import {
  NexusSDK,
  TOKEN_METADATA,
  type SUPPORTED_TOKENS,
  type SUPPORTED_CHAINS_IDS,
  NEXUS_EVENTS,
} from '@avail-project/nexus-core';
import { provider } from './provider';

async function main() {
  const sdk = new NexusSDK({ network: 'mainnet' });
  await sdk.initialize(provider);

  // Optional: listen for granular bridge + execute step updates
  sdk.nexusEvents.on(NEXUS_EVENTS.BRIDGE_EXECUTE_COMPLETED_STEPS, (step) => {
    console.log(`[step] ${step.type}:`, step.data);
  });

  const params = {
    token: 'USDC',
    amount: '100', // in token units
    toChainId: 1, // Ethereum
    sourceChains: [8453], // Prefer pulling USDC from Base
    execute: {
      contractAddress: '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE', // Yearn USDC vault
      contractAbi: [
        {
          inputs: [
            { internalType: 'uint256', name: 'assets', type: 'uint256' },
            { internalType: 'address', name: 'receiver', type: 'address' },
          ],
          name: 'deposit',
          outputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'deposit',
      buildFunctionParams:
        (token: SUPPORTED_TOKENS, amount: string, chainId: SUPPORTED_CHAINS_IDS, user: `0x${string}`) => {
          const decimals = TOKEN_METADATA[token].decimals;
          const amountWei = parseUnits(amount, decimals);
          return {
            functionParams: [amountWei, user],
          };
        },
      tokenApproval: {
        token: 'USDC',
        amount: parseUnits('100', TOKEN_METADATA.USDC.decimals).toString(),
      },
    },
    waitForReceipt: true,
    requiredConfirmations: 3,
  } as const;

  // 1) Simulate to surface costs, approvals, and routing
  const simulation = await sdk.simulateBridgeAndExecute(params);
  if (!simulation.success) {
    console.error('Simulation failed:', simulation.error);
    return;
  }

  console.log('Route overview:', simulation.steps);
  console.log('Estimated total cost:', simulation.totalEstimatedCost);
  if (simulation.metadata?.approvalRequired) {
    console.log('Approval required:', simulation.metadata.approvalRequired);
  }

  // 2) Run the real transaction
  const result = await sdk.bridgeAndExecute(params);

  if (!result.success) {
    console.error('Bridge + execute failed:', result.error);
    return;
  }

  // 3) Production-friendly response handling
  console.log('Bridge tx hash:', result.bridgeTransactionHash);
  console.log('Execute tx hash:', result.executeTransactionHash);
  console.log('Explorer links:', {
    bridge: result.bridgeExplorerUrl,
    execute: result.executeExplorerUrl,
  });

  if (result.bridgeSkipped) {
    console.log('Bridge skipped: funds already available on destination chain.');
  }

  // Clean up your listener when done
  sdk.nexusEvents.removeAllListeners(NEXUS_EVENTS.BRIDGE_EXECUTE_COMPLETED_STEPS);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Notes on the example
Some of the practices used in the example for better usage in production user interface:

- **Simulation first** catches allowance issues and previews the exact steps (including chain abstraction routes).
- **`waitForReceipt` + confirmations** ensure the contract call is finalized, which is critical for downstream business logic.
- **Step events** let you stream progress to your UI (or logs) during longer bridge legs.
- **Explicit approvals** scope token allowances to the amount you actually need.
- **Route constraints** via `sourceChains` help you avoid illiquid or slow chains.

## Handling responses safely

- **Persist hashes**: store the transaction hashes and explorer URLs so you can rebuild UI state after refresh or process restarts.
- **Map stages to UX**: use `simulation.steps` and runtime step events to display stages like "bridging", "waiting for settlement", "executing", and "confirming".
- **Timeout strategy**: if you set client-side timers, keep them generous—bridges may take minutes. Prefer showing the live step stream over hard timeouts.
- **Error surfaces**: the SDK returns structured errors (`result.error`) and also emits a final `operation.failed` step; display both in UI for clarity.
- **Reconciliation**: after success, call `getUnifiedBalances` again to refresh balances on the destination chain and verify the vault receipt/shares.

## Next steps

- Swap in your own ABI + params builder to target different protocols (staking, lending, DEX interactions, etc.).
- Gate flows with `simulateBridgeAndExecute` + `getUnifiedBalances` checks to avoid redundant bridges when funds already exist on the destination chain.
- Combine with the widgets package if you want pre-built UI components once the headless flow is working.