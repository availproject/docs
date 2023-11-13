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

## Avail-Powered Rollups

Whether a Validium or Optimium, integrating with Avail enhances transaction processing by keeping data off-chain while ensuring its availability and validity. Avail's role as an optimized blockchain for data availability is central to this adaptation, offering a robust and modular design for diverse use cases.

### System Operations

- **Transaction Processing and Sequencing**: Transactions are processed and sequenced in the Layer 2 environment, prepped for submission to Avail.
- **Data Submission**: Processed data is securely transferred to Avail following established protocols.
- **Configuration and Connection**: Seamless integration is achieved through tailored configurations linking Layer 2 systems with Avail.
- **Smart Contract Interaction**: For activities like withdrawals, users provide Merkle proofs to on-chain contracts. These contracts collaborate with Avail to validate data and execute transactions.
- **Data Availability and Validation**: The Avail team plans to implement an attestation bridge to simplify the verification process on Ethereum. This bridge will post data availability attestations directly to Ethereum, aiding the verification contract in ensuring data availability.
  Interaction with Layer 1
- **Verification Contract**: Deployed on Layer 1, this contract verifies the correctness of transactions and confirms data availability through Avail's attestations.
- **L1 Contract Communication**: Validiums interface with L1 through specific contracts. The main attestation contract holds state commitments from block producers, while the verification contract oversees the validity of state transitions.
