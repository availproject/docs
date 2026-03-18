"use client";

import {
  CHAIN_METADATA,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
} from "@avail-project/nexus-core";
import { useState } from "react";
import { type Abi, type Address, encodeFunctionData } from "viem";
import NexusDepositDemo from "../deposit/demo/nexus-deposit-demo";
import NexusDeposit from "../deposit/nexus-deposit";
import DemoShowcaseShell from "./demo-showcase-shell";

// --- Execute deposit builder (Aave supply on Base) ---

function buildExecuteDeposit(
  tokenSymbol: string,
  tokenAddress: `0x${string}`,
  amount: bigint,
  _chainId: number,
  user: Address,
) {
  const contractAddress = "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5" as const;
  const abi: Abi = [
    {
      inputs: [
        { internalType: "address", name: "asset", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "address", name: "onBehalfOf", type: "address" },
        { internalType: "uint16", name: "referralCode", type: "uint16" },
      ],
      name: "supply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  if (tokenSymbol === "ETH") {
    throw new Error("ETH is native and not supported for this execute builder");
  }
  const encoded = encodeFunctionData({
    abi,
    functionName: "supply",
    args: [tokenAddress, amount, user, 0],
  });
  if (!encoded) {
    throw new Error("Failed to encode contract call");
  }
  return {
    to: contractAddress,
    data: encoded,
    gasPriceSelector: "medium",
    tokenApproval: {
      token: tokenAddress,
      amount,
      spender: contractAddress,
    },
  };
}

const DepositDemoShowcase = () => {
  const [embed, setEmbed] = useState(false);

  return (
    <DemoShowcaseShell
      type="deposit"
      toggle={{ label: "Embed", pressed: embed, onChange: setEmbed }}
    >
      {(ctx) =>
        ctx.isConnected && ctx.nexusSDK ? (
          <NexusDeposit
            embed={embed}
            heading="Deposit USDC"
            destination={{
              chainId: SUPPORTED_CHAINS.BASE,
              tokenAddress:
                TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.BASE],
              tokenSymbol: "USDC",
              tokenDecimals: TOKEN_METADATA.USDC.decimals,
              tokenLogo: TOKEN_METADATA.USDC.icon,
              label: "Deposit USDC on Aave Base",
              gasTokenSymbol:
                CHAIN_METADATA[SUPPORTED_CHAINS.BASE].nativeCurrency.symbol,
              estimatedTime: "≈ 30s",
              explorerUrl:
                CHAIN_METADATA[SUPPORTED_CHAINS.BASE].blockExplorerUrls[0],
              depositTargetLogo: "/aave.svg",
            }}
            executeDeposit={buildExecuteDeposit}
          />
        ) : (
          <NexusDepositDemo heading="Deposit USDC" />
        )
      }
    </DemoShowcaseShell>
  );
};

export default DepositDemoShowcase;
