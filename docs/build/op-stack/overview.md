---
id: overview
title: Building on the OP Stack with Avail
sidebar_label: OP Stack
description: 'Discover how to utilize Avail as a data availability layer.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

The OP Stack, instrumental for the development of L2 rollups and maintained by the [<ins>Optimism Collective</ins>](https://www.optimism.io/), is now extendable with Avail as an alternative data availability layer. Developers working with the OP Stack, which underpins solutions like OP Mainnet, can utilize Avail to address data availability concerns, enhancing the stack's scalability while simultaneously cutting down data handling costs.

## Transaction Lifecycle with Avail OP Stack

### 1. Transaction Submission

- **Process**: Users send transactions to the Sequencer.
- **Role**: The Sequencer temporarily holds the transactions before they are batched.

### 2. Batch Processing

- **Component**: `op-batcher`
- **Function**: Collects transactions into batches for more efficient processing.

### 3. Data Availability with Avail

- **Component**: `op-avail`
- **Function**: Sends the transaction batches to Avail's blockchain for data availability purposes.

### 4. Transaction Reference Creation

- **Outcome**: Avail returns a unique transaction reference to the `op-avail` module after receiving the batch.

### 5. Calldata Submission to Ethereum

- **Component**: `op-batcher`
- **Action**: Submits the transaction reference received from Avail as calldata to the Ethereum mainnet.

- `op-node`: Queries data commitment from Ethereum and fetches L2 transaction data through op-avail.

### Interoperability and Fault Proofing

The Avail OP Stack will evolve to integrate Optimism's fault proof system and the OP Stack sequencer's decentralization efforts. The Avail data root will be posted to Ethereum through the Vector data attestation bridge, allowing for seamless verification of data availability consensus.

### Developer Onboarding

Developers can start experimenting with the Avail OP Stack today by following the guide in the Avail OP Stack repo. For support and updates, join the Avail Forum or Discord.

### Integration of Avail DA Layer in OP-Stack

Integrating the Avail DA layer into the OP Stack enhances its modular blockchain architecture, creating a more efficient optimistic rollup.

- **Sequencer**: Posts L2 transaction data on Avail DA, submitting data commitments to Ethereum as `callData`.
- **Verifier and Rollup Nodes**: Use the data commitment from `callData` to access L2 transaction data from Avail.

## Benefits of Avail DA Integration

- **Cost Efficiency**: Reduces the cost of posting L2 transaction data over the L1 layer, addressing a major bottleneck in Ethereum Rollups.
- **High Data Availability**: Avail's light client network ensures data availability through Data Availability Sampling, offering more space and efficient fraud proof mechanisms compared to pre-EIP 4844 Ethereum.

[Data Availability Layer Importance](https://availproject.github.io/?ref=blog.availproject.org)
