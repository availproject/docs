### Tutorial: Bridge from Base to Ethereum and Stake USDC in Aave

The following example shows how to wire up a complete bridge → stake experience that:

1. Bridges 5,000,000 USDC (5,000 USDC with 6 decimals) from **Base (chainId 8453)**.
2. Stakes the bridged USDC inside **Aave v3 on Ethereum mainnet (chainId 1)** by calling `Pool.supply` at `0x87870Bca3F3fD6335C3F4ce8392D69350B4FA4E2`.
3. Requires a token approval on Ethereum because Aave pulls USDC via `transferFrom` (non-native deposit).
4. Streams progress, handles transaction responses, and surfaces explorer links in your UI.

#### 1. Subscribe to bridge-and-execute progress for UI updates

```tsx
import { useEffect, useState } from 'react';
import {
  NexusSDK,
  NEXUS_EVENTS,
  type BridgeAndExecuteResult,
  type ProgressStep,
} from '@avail-project/nexus-core';

const sdk = new NexusSDK({ network: 'mainnet' });

export function useBridgeAndStakeProgress() {
  const [expectedSteps, setExpectedSteps] = useState<ProgressStep[]>([]);
  const [completedStep, setCompletedStep] = useState<ProgressStep | null>(null);

  useEffect(() => {
    const unsubExpected = sdk.nexusEvents.on(
      NEXUS_EVENTS.BRIDGE_EXECUTE_EXPECTED_STEPS,
      (steps) => setExpectedSteps(steps),
    );
    const unsubCompleted = sdk.nexusEvents.on(
      NEXUS_EVENTS.BRIDGE_EXECUTE_COMPLETED_STEPS,
      (step) => setCompletedStep(step),
    );
    return () => {
      unsubExpected();
      unsubCompleted();
    };
  }, []);

  return { expectedSteps, completedStep };
}
```

Render `expectedSteps` to show the checklist (intent signed → bridge submitted → execute submitted) and `completedStep` to highlight the active stage or link out to the explorer when a step exposes `step.data.explorerURL`.

#### 2. Simulate the flow and prompt for approvals

```typescript
import {
  type BridgeAndExecuteParams,
  type BridgeAndExecuteSimulationResult,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
} from '@avail-project/nexus-core';
import { parseUnits } from 'viem';

const params: BridgeAndExecuteParams = {
  token: 'USDC',
  amount: '5000000', // 5,000 USDC with 6 decimals
  toChainId: 1,
  sourceChains: [8453],
  enableTransactionPolling: true, // auto-poll if the provider does not emit receipts
  transactionTimeout: 180_000, // 3 minutes
  waitForReceipt: true,
  requiredConfirmations: 2,
  execute: {
    contractAddress: '0x87870Bca3F3fD6335C3F4ce8392D69350B4FA4E2', // Aave v3 Pool
    contractAbi: [
      {
        inputs: [
          { internalType: 'address', name: 'asset', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
          { internalType: 'address', name: 'onBehalfOf', type: 'address' },
          { internalType: 'uint16', name: 'referralCode', type: 'uint16' },
        ],
        name: 'supply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'supply',
    buildFunctionParams: (token, amount, chainId, userAddress) => {
      const decimals = TOKEN_METADATA[token].decimals;
      const amountWei = parseUnits(amount, decimals);
      const tokenAddress = TOKEN_CONTRACT_ADDRESSES[token][chainId];
      return {
        functionParams: [tokenAddress, amountWei, userAddress, 0],
      };
    },
    tokenApproval: {
      token: 'USDC',
      amount: '5000000',
    },
  },
};

const preview: BridgeAndExecuteSimulationResult = await sdk.simulateBridgeAndExecute(params);

if (!preview.success) {
  throw new Error(preview.error || 'Simulation failed');
}

if (preview.metadata?.approvalRequired) {
  // Trigger your allowance modal – show preview.metadata.minApproval to the user.
}
```

Simulations also return the full `steps` array so you can pre-render the UI timeline while the user decides whether to proceed.

#### 3. Submit the bridge and staking call

```typescript
const result: BridgeAndExecuteResult = await sdk.bridgeAndExecute(params);

if (!result.success) {
  console.error('Bridge + stake failed:', result.error);
  return;
}

// Update the UI immediately after each phase
if (result.approvalTransactionHash) {
  setApprovalLink(result.approvalTransactionHash);
}

if (result.bridgeTransactionHash) {
  setBridgeLink(result.bridgeExplorerUrl ?? result.bridgeTransactionHash);
}

if (result.executeTransactionHash) {
  setStakeLink(result.executeExplorerUrl ?? result.executeTransactionHash);
}
```

- With `waitForReceipt: true`, the promise resolves only after the execute transaction reaches 2 confirmations (configurable via `requiredConfirmations`). Surface `result.executeExplorerUrl` as “Funds staked” in the UI.
- Without waiting for receipts you can still poll your own subgraph or rely on `enableTransactionPolling` so the SDK polls for hashes on RPCs that delay responses.

#### 4. Keep the UI in sync post-submission

Even after the promise resolves, you may want to periodically refresh balances or intent status:

```typescript
// Example poller to refresh balances + confirmations every 15 seconds
const interval = window.setInterval(async () => {
  const balances = await sdk.getUnifiedBalances();
  updatePortfolio(balances);
}, 15_000);

// When you no longer need updates
window.clearInterval(interval);
```

Pairing periodic refreshes with the progress events from Step 1 guarantees that users always see the latest state: intent accepted, bridge mined, Aave supply confirmed, and the resulting aUSDC balance increase.
