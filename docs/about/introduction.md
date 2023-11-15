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

Avail represents a paradigm shift in blockchain technology, distinguishing itself as a **modular blockchain with a laser-focus on data availability**. At its core, Avail prioritizes the ordering and publishing transactions while enabling users to verify the availability of block data without the need to download entire blocks. This approach uniquely balances scalability with security, addressing core challenges faced by traditional blockchain systems.

Avail's data-agnostic nature is one of its defining features. It supports various execution environments, including EVM, WASM, and custom new runtimes, offering a versatile foundation for diverse blockchain applications. Avail's modular architecture enables the creation of a broad spectrum of designs, such as sovereign ZK or OP appchains, general-purpose rollups, sidechains, validiums, and more. Remarkably, these applications do not require establishing a new validator set but simply involve posting transactions on Avail.

<details>
<summary>Overview of L2 Scailability</summary>

### Overview

In traditional blockchain networks, full nodes are responsible for executing all transactions, ensuring network integrity and security. However, this model, while secure, limits throughput and scalability due to its comprehensive processing requirements. To address these constraints, Layer 2 (L2) solutions emerged, offering enhanced performance by shifting the bulk of transaction execution away from the main chain (Layer 1).

Despite their advantages, L2 solutions face challenges in maintaining data availability and transaction integrity, especially in a manner that is both efficient and cost-effective. Rollups mitigate these challenges by executing transactions off-chain and then posting aggregated results back to the main chain. This approach significantly reduces the strain on Layer 1, leading to lower operational costs and reduced transaction fees, thereby offering a more scalable solution for blockchain networks.

### Optimistic Rollups

Optimistic Rollups operate on a principle of presumed validity, where transactions are assumed to be valid unless proven otherwise. Their lifecycle involves:

1. **Transaction Aggregation**: Transactions are gathered by sequencers and formed into a rollup block.
2. **Block Submission**: This block is submitted to an Ethereum-based smart contract with a bond as a security measure.
3. **Assumption of Validity**: Transactions are presumed valid upon submission.
4. **Challenge Window**: A period for submitting fraud proofs, allowing challenges to the block's validity.
5. **Outcome**:
   - **Challenge Successful**: The bond is forfeited, and the block is reversed.
   - **No Challenge**: The block is finalized if unchallenged.

### ZK Rollups

ZK Rollups require upfront cryptographic proofs of transaction validity, focusing on security and data integrity. Their lifecycle involves:

1. **Validity Requirement**: A validity proof must be provided before block submission.
2. **Block Submission**: Blocks are submitted with the required validity proof.
3. **Assumption of Validity**: Proof of validity is demanded upfront, unlike Optimistic Rollups.
4. **Data Availability**: While validity proofs are independent of data availability, the chain's security heavily depends on it.
5. **Implications of Data Unavailability**:
   - **State Recreation**: Users can potentially recreate the state using main chain data.
   - **Sequencer Intervention**: Other sequencers can step in to restore state and continue operations.

</details>

## Avail Solves Data Availability

### Data Availability in Layer 2s

Data availability in L2 solutions can be classified into two methods:

- **On-Chain Data Availability**: All transaction data is stored on the L1 chain, offering higher security but at greater cost.
- **Off-Chain Data Availability**: Data is stored off-chain, with only cryptographic summaries (hashes) on-chain. This method is cost-effective but depends on external entities for data retrieval.

These methods emphasize the role of L2s in enhancing state management and interaction with L1.

### Taking Layer 2 Data Off-Chain

Validiums and Optimiums represent a class of scalability solutions that prioritize off-chain data availability while maintaining the integrity of transaction processing.

- **Validiums: ZK Rollups + Off-Chain DA**
- **Optimiums: Optimistic Rollups + Off-Chain DA**
- **Volitions: ZK Rollups + Validiums**

Moving data availability off-chain inherently incorporates additional trust dependencies due to their reliance on external data managers. Avail addresses this by providing a robust and reliable off-chain data availability mechanism. This integration significantly strengthens transaction data integrity and accessibility, while minimizing reliance on trust-based data management, thus enhancing the overall security and efficiency of various scaling solutions.

<details>
<summary>What are Validiums?</summary>

Validiums are a direct adaptation of ZK rollups, Validiums shift data availability off-chain while continuing to use validity proofs.

They represent a class of advanced scaling solutions characterized by off-chain computation coupled with robust validity proofs. Unlike traditional approaches, Validiums do not store data on the Ethereum main chain, resulting in significantly enhanced transaction throughput. The cornerstone of these systems is the use of zero-knowledge proofs, such as ZK-SNARKs or ZK-STARKs. These cryptographic tools enable one party to confirm the truth of a statement to another without revealing any additional information beyond the statement's validity.

In Validiums, the integrity of all transactions is secured through these validity proofs, while data availability is maintained off-chain. This architecture allows users to execute withdrawals by providing a Merkle proof. Such proofs can attest to the inclusion of a user’s withdrawal transaction, enabling the on-chain contract to facilitate the withdrawal process.

Interactions between Validiums and Ethereum are orchestrated through a suite of smart contracts. The primary component in this setup is the main attestation contract. This contract is responsible for storing state commitments, represented as Merkle data roots, which are submitted by block producers. Additionally, a verification contract plays a critical role in verifying the validity proofs during state transitions, ensuring the seamless integration and operation of Validiums within the Ethereum ecosystem.

</details>

<details>
<summary>What are Optimiums?</summary>

Optimiums are a direct adaptation of Optimistic rollups and also take data availability off-chain. They retain fraud proof mechanisms for verification while boosting scalability.

At the heart of Optimiums lies the principle of assumed transaction validity. Transactions within this system are initially presumed to be valid. This assumption holds until proven otherwise, a process that is facilitated by fraud proof mechanisms. These mechanisms are crucial in maintaining the integrity and reliability of the network. If a transaction is challenged and found to be fraudulent, it is then reverted, ensuring the network's security and fidelity.

The key distinction of Optimiums from their traditional counterparts is the off-chain storage of transaction data. This strategic shift markedly increases network efficiency and scalability by reducing the data load on the main Ethereum chain. However, this also introduces new considerations for data retrieval and verification, which are adeptly handled through the fraud proof system.

In Optimiums, users can execute transactions and interact with the system seamlessly. Withdrawals are processed by submitting fraud proofs that validate the transaction's authenticity. These proofs serve as the cornerstone for ensuring that all operations within the network are legitimate and in accordance with the established rules.

The integration of Optimiums with the Ethereum main chain is managed via a set of specialized smart contracts. These contracts collectively oversee the transaction lifecycle, from submission to finalization, while ensuring that all data, though stored off-chain, remains accessible and verifiable as needed.

</details>

<details>
<summary>What are Volitions?</summary>

Volitions represent a versatile approach in the realm of scaling solutions. They blend the features of ZK-Rollups and Validiums. This hybrid model offers flexibility in data storage, allowing users to choose between on-chain and off-chain data availability based on their specific requirements and preferences.

At their core, Volitions leverage zero-knowledge proofs, such as ZK-SNARKs or ZK-STARKs, to ensure the integrity and validity of transactions. This mechanism enables the verification of transactions without compromising on privacy or revealing underlying data.

The unique feature of Volitions lies in their dual-mode operation. Users can opt for the ZK-Rollup mode, where transaction data is stored on-chain, thus benefiting from the security and decentralization of the Ethereum main chain. Alternatively, users can choose the Validium mode, which stores transaction data off-chain, enhancing scalability and throughput while still maintaining robust validity proofs.

In both modes, the transaction integrity is maintained through zero-knowledge proofs, but the choice of data availability mode allows for a customizable balance between scalability, security, and cost-efficiency.

The interaction of Volitions with the Ethereum ecosystem is also facilitated through a comprehensive set of smart contracts. These contracts manage state commitments and validity proof verifications, ensuring that the system remains secure, efficient, and seamlessly integrated with Ethereum, regardless of the chosen data availability mode.

</details>

## Avail-Powered Infrastructure

Avail is redefining blockchain scalability by combining erasure coding, KZG polynomial commitments, and data availability sampling to deliver world-class data availbility guarantees. It functions as a foundational (base) layer, offering scalable data hosting without transaction execution, specifically for rollups.

### Transaction Lifecycle

1. **Transaction Submission**
2. **Data Extension and Erasure Coding**
3. **Commitment Creation**
4. **Block Propagation**
5. **Light Client Network**
6. **Proof Verification**

### Starting with Transaction Submission

Rollups, as Avail's main consumers, begin the process by submitting transactions to Avail. Each transaction carries a unique application ID, signifying its origin and purpose within the broader ecosystem.

### Enhancing Data Reliability Through Erasure Coding

Once transactions reach Avail, they undergo a transformation via erasure coding. This process extends the original data, adding layers of redundancy and enhancing the reliability and integrity of the information stored. Blocks are split into `n` original chunks and extending them to `2n`, allowing any `n` out of `2n` chunks to reconstruct the original data. Transactional data is divided into chunks and arranged in an `n × m` matrix. This matrix is then extended to ensure redundancy, a critical feature for preventing data unavailability.

> To combat the misconstruction of erasure-coded chunks, full nodes can create and propagate **fraud proofs**, ensuring that light clients can verify the authenticity of block headers.

### Solidifying Data Integrity with Commitment Creation

Avail takes this redundant data and applies KZG polynomial commitments to each data block. These commitments serve as cryptographic proofs of the data's integrity, ensuring that what is stored is accurate and tamper-proof.

> Block producers create a **Coded Merkle Tree (CMT)** Merkle tree from data chunks and include the root in the block header, facilitating swift and secure data verification by clients.

> The CMT-based design features systematic erasure codes at each Merkle tree layer, leading to constant-sized commitments and logarithmically sized fraud proofs. This structure enables efficient reconstruction of data and verification of block integrity, even under the assumption of minimal honest full nodes.

### Ensuring Consensus and Propagation

Validators play a pivotal role in Avail’s ecosystem. They receive the commitment-laden blocks, regenerate the commitments to verify their accuracy, and reach a consensus on the block. The consensus mechanism which is built on the Substrate framework and utilizing GRANDPA and BABE hybrid consensus, ensures that only verified and agreed-upon data is propagated through the network.

### Light Clients: The Guardians of Data Availability Using DAS

After block finalization, light clients play a crucial role in ensuring data integrity. They use Data Availability Sampling (DAS) to verify block data and detect any data withholding by validators. This process involves downloading random data samples and checking them against the Kate commitments and Merkle proofs. This approach allows light clients to authenticate specific data segments without requiring the full block.

On the other side, full nodes use Kate commitments for two main purposes: reconstructing the full data for network-wide verification or creating fraud proofs to challenge any discrepancies in the data. This dual mechanism of light clients and full nodes working in tandem also strengthens the overall security and reliability of the network.

### Proof Verification: The Final Checkpoint

The journey culminates with light clients performing proof verification. This process involves generating cell-level proofs from the data matrix, enabling light clients to efficiently and independently verify the state of the blockchain. This decentralized approach to verification underpins the security and integrity of the Avail ecosystem.

> The settlement in Avail is primarily about ensuring data availability for rollups. The actual transaction execution and finality occur at the rollup layer, while Avail provides the necessary data infrastructure.

## System Design Overview

By decoupling the data hosting, execution, and verification, Avail optimizes each component's efficiency and effectiveness as a direct result of modularity.

### Data Hosting and Ordering Layer (DA Layer)

At the foundational level, the DA Layer is tasked with the ingestion and sequential ordering of transactional data. This layer does not engage in executing transactions but is dedicated to storing the data and guaranteeing its availability. The DA Layer is pivotal for ensuring that the system does not rely on every full node to execute transactions, thus mitigating the bottleneck issues prevalent in traditional blockchains.

### Execution Layer (Exec Layer)

The Exec Layer interfaces with the DA Layer to access the ordered transactions. It then processes these transactions and generates the necessary checkpoints, assertions, or proofs. These are subsequently committed to the Verification/Dispute Resolution Layer (DR Layer), which can be regarded as the security anchor of the Avail ecosystem.

### Verification/Dispute Resolution Layer (DR Layer)

The DR Layer serves as the adjudicating component where checkpoints or proofs submitted by the Execution Layer are verified. This ensures that only valid state transitions are accepted within the network.

### Network Participants

The Avail network comprises three types of nodes:

- **Full Nodes**: These nodes download and verify the correctness of blocks but do not partake in the consensus process. Their role is essential for maintaining the network's integrity.
- **Validator Nodes**: These nodes are central to Avail’s consensus mechanism. They are responsible for generating blocks, deciding on transaction inclusion, and maintaining the order. Validator nodes are incentivized through consensus participation and are fundamental to the DA Layer's operations.
- **Light Clients**: Operating with constrained resources, light clients rely on block headers to participate in the network. They can query full nodes for specific transactional data as required and are crucial for upholding a decentralized and accessible network.

### Consensus

Avail opts for a Nominated Proof-of-Stake (NPoS) consensus model for its benefits in scalability and energy efficiency. Specifically, it employs the BABE/GRANDPA consensus used by Substrate, offering a blend of fast block production and provable finality.
