---
id: op-stack
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

### Transaction Lifecycle with Avail OP Stack

- **Transaction Submission**: Transactions are sent to the sequencer.
- **Batch Processing**: The `op-batcher` collects these transactions into batches.
- **Data Availability with Avail**: The `op-avail` module sends the batch to Avail's blockchain.
- **Transaction Reference Creation**: Avail returns a transaction reference to `op-avail`.
- **Calldata Submission to Ethereum**: The `op-batcher` submits the transaction reference as calldata to Ethereum.

### Interoperability and Fault Proofing

The Avail OP Stack will evolve to integrate Optimism's fault proof system and the OP Stack sequencer's decentralization efforts. The Avail data root will be posted to Ethereum through the Vector data attestation bridge, allowing for seamless verification of data availability consensus.

### Developer Onboarding

Developers can start experimenting with the Avail OP Stack today by following the guide in the Avail OP Stack repo. For support and updates, join the Avail Forum or Discord.

## Start Experimenting with the Avail OP Stack today

Check out the [getting started guide](#) in the Avail OP Stack repository to begin your integration journey. Avail is also launching an incentivized testnet to support development efforts.
