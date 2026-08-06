"use client";

import { NexusWidget } from "@avail-project/widgets";
import { useState } from "react";
import { type Abi, encodeFunctionData } from "viem";
import DemoShowcaseShell from "./demo-showcase-shell";

const AAVE_POOL_ARBITRUM = "0x794a61358D6845594F94dc1DB02A252b5b4814aD";
const USDT_ARBITRUM = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

const AAVE_ABI: Abi = [
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

const DepositDemoShowcase = () => {
  const [embed, setEmbed] = useState(true);

  return (
    <DemoShowcaseShell
      type="deposit"
      toggle={{ label: "Embed", pressed: embed, onChange: setEmbed }}
    >
      {() => (
        <NexusWidget
          embed={embed}
          config={{
            mode: "deposit",
            destination: {
              chain: 42161,
              tokens: [{ address: USDT_ARBITRUM, symbol: "USDT", decimals: 6 }],
            },
            depositAddress: AAVE_POOL_ARBITRUM,
            executeDeposit: (
              tokenSymbol,
              tokenAddress,
              amount,
              chainId,
              user,
            ) => ({
              to: AAVE_POOL_ARBITRUM,
              data: encodeFunctionData({
                abi: AAVE_ABI,
                functionName: "supply",
                args: [tokenAddress, amount, user, 0],
              }),
              gas: 400_000n,
              tokenApproval: {
                toTokenAddress: tokenAddress,
                amount,
                spender: AAVE_POOL_ARBITRUM,
              },
            }),
            appearance: {
              appName: "Aave",
              heading: "Deposit into Aave",
            },
          }}
        />
      )}
    </DemoShowcaseShell>
  );
};

export default DepositDemoShowcase;
