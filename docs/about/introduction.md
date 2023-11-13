---
id: introduction
title: What is Avail?
sidebar_label: What is Avail
description: Learn about Avail's data availability chain
keywords:
  - docs
  - avail
  - availability
  - scale
  - rollup
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Avail represents a paradigm shift in blockchain technology, distinguishing itself as a **modular blockchain with a primary focus on data availability**. At its core, Avail prioritizes the ordering and publishing transactions while enabling users to verify the availability of block data without the need to download entire blocks. This approach uniquely balances scalability with security, addressing core challenges faced by traditional blockchain systems.

In conventional networks like Ethereum, the responsibility of executing all transactions falls on full nodes, a mechanism essential for preserving network integrity. While this model upholds robust security standards, it simultaneously restricts throughput and scalability. Recognizing these limitations, Layer 2 solutions were introduced to improve performance. They achieve this by transferring the burden of transaction execution off the main chain (Layer 1). However, these solutions are not without their complexities, often struggling to maintain data availability and transaction integrity.

Avail's data-agnostic nature is one of its defining features. It supports various execution environments, including EVM, WASM, and custom new runtimes, offering a versatile foundation for diverse blockchain applications. Avail's modular architecture enables the creation of a broad spectrum of designs, such as sovereign ZK or OP appchains, general-purpose rollups, sidechains, validiums, and more. Remarkably, these applications do not require establishing a new validator set but simply involve posting transactions on Avail.

## How Avail Enhances Scalability

Avail's architecture is engineered to address the intrinsic scalability limitations of blockchains and monolithic system design. By decoupling the data hosting, execution, and verification, Avail optimizes each component's efficiency and effectiveness.

### Data Hosting and Ordering Layer (DA Layer)

At the foundational level, the DA Layer is tasked with the ingestion and sequential ordering of transactional data. This layer does not engage in executing transactions but is dedicated to storing the data and guaranteeing its availability. The DA Layer is pivotal for ensuring that the system does not rely on every full node to execute transactions, thus mitigating the bottleneck issues prevalent in traditional blockchains like Ethereum.

### Execution Layer (Exec Layer)

The Exec Layer interfaces with the DA Layer to access the ordered transactions. It then processes these transactions and generates the necessary checkpoints, assertions, or proofs. These are subsequently committed to the Verification/Dispute Resolution Layer (DR Layer), which can be regarded as the security anchor of the Avail ecosystem.

### Verification/Dispute Resolution Layer (DR Layer)

The DR Layer serves as the adjudicating component where checkpoints or proofs submitted by the Exec Layer are verified. This ensures that only valid state transitions are accepted within the network. The robustness of this layer is crucial for the security and trustworthiness of the entire blockchain system.

### Network Participants

The Avail network comprises three types of nodes:

- **Full Nodes**: These nodes download and verify the correctness of blocks but do not partake in the consensus process. Their role is essential for maintaining the network's integrity.
- **Validator Nodes**: These nodes are central to Avail’s consensus mechanism. They are responsible for generating blocks, deciding on transaction inclusion, and maintaining the order. Validator nodes are incentivized through consensus participation and are fundamental to the DA Layer's operations.
- **Light Clients**: Operating with constrained resources, light clients rely on block headers to participate in the network. They can query full nodes for specific transactional data as required and are crucial for upholding a decentralized and accessible network.

## System Design Overview

Avail enables modularity through modularity, ensuring that even if execution is off-chain, necessary data for verification or dispute resolution is always accessible. It implements strategies like redundancy (through erasure coding) and fraud proofs to protect against various attacks, such as data withholding or incorrect block header construction.

The Avail system utilizes a sophisticated data structure where transactional data is divided into chunks and arranged in an `n × m` matrix. This matrix is then extended to ensure redundancy, a critical feature for preventing data unavailability.

Kate commitments allow light clients to query data chunks along with Merkle membership proofs, enabling them to verify the legitimacy of data without the entire block's context. Full nodes, on the other hand, can use these commitments to reconstruct the data or to generate fraud proofs in full.

### Data Hosting Primitives

- **Erasure Coding**: This method provides redundancy, splitting blocks into n original chunks and extending them to `2n`, allowing any `n` out of `2n` chunks to reconstruct the original data.
- **Fraud Proofs**: To combat the misconstruction of erasure-coded chunks, full nodes can create and propagate fraud proofs, ensuring that light clients can verify the authenticity of block headers.
- **Commitment Size**: Avail employs a commitment strategy where block producers create a Merkle tree from data chunks and include the root in the block header, facilitating swift and secure data verification by clients.

### Coded Merkle Tree (CMT)

The CMT-based design features systematic erasure codes at each Merkle tree layer, leading to constant-sized commitments and logarithmically sized fraud proofs. This structure enables efficient reconstruction of data and verification of block integrity, even under the assumption of minimal honest full nodes.

### Consensus

Avail opts for a Nominated Proof-of-Stake (NPoS) consensus model for its benefits in scalability and energy efficiency. Specifically, it employs the BABE/GRANDPA consensus used by Substrate, offering a blend of fast block production and provable finality.
