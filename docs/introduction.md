---
id: what-is-avail
title: Avail
sidebar_label: Introduction
sidebar_position: 1
description: Learn about Avail's data availability chain
keywords:
  - docs
  - avail
  - availability
  - scale
  - rollup
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: /
---

# Avail

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Avail is a blockchain that is laser-focused on data availability: ordering and recording blockchain transactions, and making it possible to prove that block data is available without downloading the whole block. This allows it to scale in ways that monolithic blockchains cannot.

:::info A Robust General-Purpose Scalable Data Availability Layer

* Enables Layer-2 solutions to offer increased scalability throughput by leveraging Avail to build Validiums with off-chain data availability.

* Enables standalone chains or sidechains with arbitrary execution environments to bootstrap validator security without needing to create and manage their own validator set by guaranteeing transaction data availability.

:::

## Current Availability and Scaling Challenges

### What is the data availability problem?

Peers in a blockchain network need a way to ensure that all the data of a newly proposed block is
readily available. If the data is not available, the block might contain malicious transactions
which are being hidden by the block producer. Even if the block contains non-malicious transactions,
hiding them might compromise the security of the system.

### Avail's approach to data availability

#### High Guarantee

Avail provides a provable, high-level of guarantee that data is available. Light clients can independendly verify availability in a constant number of queries, without downloading the entire block.

#### Minimum Trust

No need to be a validator or host a full node. Even with a light client, get verifiable availability.

#### Easy to Use

Built using modified Substrate, the solution focuses on ease of use, whether you host an application or
operate an off-chain scaling solution.

#### Perfect for Off-Chain Scaling

Unlock the full scaling potential of your off-chain scaling solution by keeping the data with us and
still avoiding the DA problem on L1.

#### Execution Agnostic

Chains that use Avail can implement any type of execution environment irrespective of the application logic. Transactions from any environment are supported: EVM, Wasm, or even new VMs that have not been built yet. Avail is perfect for experimenting with new execution layers.

#### Bootstrapping Security

Avail enables new chains to be created without needing to spin up a new validator set, and leverage Avail's instead. Avail takes care of transaction sequencing, consensus, and availability in exchange for simple transaction fees (gas).

#### Fast provable finality using NPoS

Fast provable finality via Nominated Proof of Stake. Backed by KZG
commitments and erasure coding.

Start by checking out this [blog post](https://polygon.technology/blog/polygon-research-ethereum-scaling-with-rollups) on scaling Ethereum with Rollups.

## Avail-Powered Validiums

Due to the architecture of monolithic blockchains (such as Ethereum in its current state), operating the blockchain is expensive, resulting in high transaction fees. Rollups attempt to extract the burden of execution by running transactions off-chain and then posting the execution results and the [usually compressed] transaction data.

Validiums are the next step: instead of posting the transaction data, it is kept available off-chain, where a proof/attestation is only posted to the base layer. This is by far the most cost-effective solution because both execution and data availability are kept off-chain while still allowing for final verification and settlement on the layer 1 chain.

Avail is a blockchain optimized for data availability. Any rollup that wishes to become a validium can switch to post transaction data to Avail instead of the layer 1 and deploy a verification contract that, in addition to verifying the correct execution, also verifies data availability.

:::note Attestation

The Avail team will make this data availability verification simple on Ethereum by building an attestation bridge to post data availability attestations directly to Ethereum. This will make the verification contract's job a simple one, since the DA attestations will already be on-chain. This bridge is currently in design; please reach out to the Avail team for more information or to join our early access program.

:::

## See Also

* [Introducing Avail — a Robust General-Purpose Scalable Data Availability Layer](https://blog.availproject.org/introducing-avail-by-a-robust-general-purpose-scalable-data-availability-layer/)
* [The Data Availability Problem](https://blog.availproject.org/the-data-availability-problem/)
