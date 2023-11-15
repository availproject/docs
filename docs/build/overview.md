---
id: overview
title: Build a Rollup With Avail
sidebar_label: Avail-Powered Rollups
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

import useBaseUrl from '@docusaurus/useBaseUrl';

## Overview

Whether a Validium or Optimium, integrating with Avail enhances transaction processing by keeping data off-chain while ensuring its availability and validity. Avail's role as an optimized blockchain for data availability is central to this adaptation, offering a robust and modular design for diverse use cases.

### System Operations

- **Transaction Processing and Sequencing**: In the L2 framework, transactions are processed, sequenced, and readied for submission to Avail.
- **Data Submission to Avail**: This processed data is securely transferred to Avail, following a specific protocol designed for efficient and secure data handling.
- **Configuration and Connection**: L2 systems are configured for seamless integration with Avail, ensuring smooth data flow and interaction.
- **Smart Contract Interaction**: Users engage with on-chain contracts, providing Merkle proofs for actions like withdrawals. These contracts interact with Avail to authenticate and process these transactions.

### Attestation Bridge

:::note Available on testnet

Avail's Attestation Bridge is available on testnet for Ethereum.

:::

- **Streamlined Verification with Attestation Bridge**: Avail's Attestation Bridge simplifies the verification process on L1. This bridge facilitates the direct posting of data availability attestations to the L1 blockchain, thereby easing the workload of the verification contract.
- **Role of the Verification Contract**: With the Attestation Bridge in place, the verification contract's primary role is to check these on-chain attestations, ensuring data availability and integrity.

### Interaction with L1

- **Verification Contract Functionality**: Situated on the L1, this contract plays a dual role—it verifies transaction accuracy and checks data availability, utilizing Avail's attestations.
- **L1 Contract Dynamics**: Validiums maintain a communicative relationship with Ethereum via dedicated contracts. The main attestation contract stores state commitments (Merkle data roots) from block producers. Parallelly, a verification contract handles state transition validity checks.

---

## Avail Uncharted

Avail Uncharted is a core initiative within the Avail ecosystem dedicated to exploring uncharted territories in modular blockchain technology.
Driven by the core Avail team, the mission is twofold: to nurture innovative projects and to cultivate a close-knit collaboration with the community.

| Project                             | Description                                                                                                  | Repository                                                                                                                                              |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Avail-Powered Optimistic EVM Rollup | A sovereign EVM-compatible optimistic rollup construction.                                                   | [<ins>op-evm</ins>](https://github.com/availproject/op-evm)                                                                                             |
| DA Adapter for Sovereign SDK        | An adapter enabling modular sovereign rollups using the Sovereign Rollup SDK.                                | [<ins>sovereign-da-adapter</ins>](https://github.com/availproject/sovereign-sdk/tree/main)                                                              |
| DA Interface for Madara Starknet    | A unified DA interface allowing the Madara Starknet Sequencer to publish data onto Avail.                    | [<ins>madara-da-interface</ins>](https://github.com/keep-starknet-strange/madara/pull/1021)                                                             |
| Avail-Powered zkEVM-Based Validium  | A Validium based on the Polygon zkEVM stack that uses Avail instead of the native DAC for data availability. | - [<ins>validium-node</ins>](https://github.com/QEDK/validium-node) <br/> - [<ins>validium-contracts</ins>](https://github.com/QEDK/validium-contracts) |
| DA Adapter for Optimism SDK         | An adapter facilitating Avail DA's integration with Optimism's Rollup SDK op-stack.                          | [<ins>avail-op-stack-adapter</ins>](https://github.com/availproject/avail-op-stack-adapter)                                                             |
| DA Adapter for Rollkit              | An adapter designed for Rollkit's modular rollup framework that enables ABCI-compatible solutions.           | [<ins>rollkit-da-adapter</ins>](https://github.com/rollkit/rollkit/pull/1168)                                                                           |
