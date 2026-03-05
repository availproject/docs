"use client";
import {
  CHAIN_METADATA,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
} from "@avail-project/nexus-core";
import { useState } from "react";
import { type Abi, type Address, encodeFunctionData } from "viem";
import NexusDeposit from "../deposit/nexus-deposit";
import ShowcaseWrapper from "./showcase-wrapper";

const DepositShowcase = () => {
  const [embed, setEmbed] = useState(false);
  const executeDeposit = (
    tokenSymbol: string,
    tokenAddress: `0x${string}`,
    amount: bigint,
    _chainId: number,
    user: Address,
  ) => {
    const contractAddress =
      "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5" as const;
    const abi: Abi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "referralCode",
            type: "uint16",
          },
        ],
        name: "supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    if (tokenSymbol === "ETH") {
      throw new Error(
        "ETH is native and not supported for this execute builder",
      );
    }
    const encoded = encodeFunctionData({
      abi: abi,
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
  };

  return (
    <ShowcaseWrapper
      type="deposit"
      toggle={true}
      toggleLabel="Embed"
      pressed={embed}
      onPressedChange={setEmbed}
    >
      <NexusDeposit
        embed={embed}
        heading={"Deposit USDC"}
        destination={{
          chainId: SUPPORTED_CHAINS.BASE,
          tokenAddress: TOKEN_CONTRACT_ADDRESSES.USDC[SUPPORTED_CHAINS.BASE],
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
        executeDeposit={executeDeposit}
      />
    </ShowcaseWrapper>
  );
};

export default DepositShowcase;
