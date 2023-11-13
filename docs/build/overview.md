---
id: overview
title: Build a Rollup With Avail
sidebar_label: Overview
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

## Avail-Powered Rollups

Whether a Validium or Optimium, integrating with Avail enhances transaction processing by keeping data off-chain while ensuring its availability and validity. Avail's role as an optimized blockchain for data availability is central to this adaptation, offering a robust and modular design for diverse use cases.

### System Operations

- **Transaction Processing and Sequencing**: In the Layer 2 framework, transactions are processed, sequenced, and readied for submission to Avail.
- **Data Submission to Avail**: This processed data is securely transferred to Avail, following a specific protocol designed for efficient and secure data handling.
- **Configuration and Connection**: Layer 2 systems are configured for seamless integration with Avail, ensuring smooth data flow and interaction.
- **Smart Contract Interaction**: Users engage with on-chain contracts, providing Merkle proofs for actions like withdrawals. These contracts interact with Avail to authenticate and process these transactions.

### Attestation Bridge on Testnet

- **Streamlined Verification with Attestation Bridge**: Currently available in testnet, Avail's Attestation Bridge simplifies the verification process on Ethereum. This bridge facilitates the direct posting of data availability attestations to the Ethereum blockchain, thereby easing the workload of the verification contract.
- **Role of the Verification Contract**: With the Attestation Bridge in place, the verification contract's primary role is to check these on-chain attestations, ensuring data availability and integrity.

### Interaction with Ethereum

- **Verification Contract Functionality**: Situated on Ethereum, this contract plays a dual role—it verifies transaction accuracy and checks data availability, utilizing Avail's attestations.
- **Layer 1 Contract Dynamics**: Validiums maintain a communicative relationship with Ethereum via dedicated contracts. The main attestation contract stores state commitments (Merkle data roots) from block producers. Parallelly, a verification contract handles state transition validity checks.

---

Monolithic blockchains are challenged by their inherent architecture, resulting in high operational costs and elevated transaction fees. Rollups, as a Layer 2 (L2) solution, address these issues by executing transactions off-chain and posting condensed results to the main chain. Avail, as a data availability layer, plays a crucial role in this modular architecture, ensuring the accessibility and integrity of off-chain data.

## Optimistic Rollups

Optimistic Rollups operate on a principle of presumed validity, where transactions are assumed to be valid unless proven otherwise. Their lifecycle involves:

1. **Transaction Aggregation**: Transactions are gathered by sequencers and formed into a rollup block.
2. **Block Submission**: This block is submitted to an Ethereum-based smart contract with a bond as a security measure.
3. **Assumption of Validity**: Transactions are presumed valid upon submission.
4. **Challenge Window**: A period for submitting fraud proofs, allowing challenges to the block's validity.
5. **Outcome**:
   - **Challenge Successful**: The bond is forfeited, and the block is reversed.
   - **No Challenge**: The block is finalized if unchallenged.

Avail distributes fraud proofs via a peer-to-peer network, bypassing the need for a base layer smart contract.

## ZK Rollups

ZK Rollups require upfront cryptographic proofs of transaction validity, focusing on security and data integrity.

**General Transaction Lifecycle & Data Flow:**

1. **Validity Requirement**: A validity proof must be provided before block submission.
2. **Block Submission**: Blocks are submitted with the required validity proof.
3. **Assumption of Validity**: Proof of validity is demanded upfront, unlike Optimistic Rollups.
4. **Data Availability**: While validity proofs are independent of data availability, the chain's security heavily depends on it.
5. **Implications of Data Unavailability**:
   - **State Recreation**: Users can potentially recreate the state using main chain data.
   - **Sequencer Intervention**: Other sequencers can step in to restore state and continue operations.

## Data Availability in Layer 2s

Data availability in L2 solutions can be classified into two methods:

- **On-chain Data Availability**: All transaction data is stored on the L1 chain, offering higher security but at greater cost.
- **Off-chain Data Availability**: Data is stored off-chain, with only cryptographic summaries on-chain. This method is cost-effective but depends on external entities for data retrieval.

These methods underscore the role of L2s in enhancing state management and interaction with L1.

## Taking Layer 2 Data Off-Chain

Validiums and Optimiums represent a class of scalability solutions that prioritize off-chain data availability while maintaining the integrity of transaction processing.

- **Validiums: ZK Rollups + Off-Chain DA**: A direct adaptation of ZK Rollups, Validiums shift data availability off-chain while continuing to use ZK Rollups' validity proofs.
- **Optimiums: Optimistic Rollups + Off-Chain DA**: Optimiums also take data availability off-chain. They retain fraud proof mechanisms for verification while boosting scalability.

Validiums and Optimiums introduce additional trust assumptions by not publishing data on L1. They rely on external data availability solutions.

Avail, as a data availability layer, complements these solutions by providing a reliable off-chain data availability mechanism, ensuring the integrity and accessibility of transaction data.
