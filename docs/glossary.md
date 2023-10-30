---
id: glossary
title: Glossary
sidebar_label: Glossary
description: 'A glossary of essential terms, definitions, and concepts related to Avail.'
keywords:
  - docs
  - avail
  - Glossary
  - Monolithic
  - data availability
image: https://availproject.github.io/img/avail/AvailDocs.png
---

:::note Glossary as a Reference for Concepts

While the Avail documentation is under development, the Glossary is being used to elaborate on key concepts.
If you have any questions or concerns, please don't hesitate to contact the Avail team.

:::

## App-Chain

App-chains allow developers to optimize their applications by tailoring a chain to the specific needs of their use case, without constraints from a shared blockchain. They provide enhanced performance and scalability by functioning as independent chains, serving specific applications. App-chains also simplify the development process by eliminating the need for developers to manage and maintain a validator set. Avail enables the creation of modular app-chain architectures that can be based on different layer 2 or 3 scaling solutions.

## AVL

AVL is the native token of the Avail network. Currently, there is no publicly available "AVL" token with monetary value; it is solely used for testnet purposes.

## Avail JS Apps

The Avail JS Apps UI is a forked version of [<ins>Polkadot JS Apps UI</ins>](https://polkadot.js.org/apps/) that is used for visualizing and interacting with the Avail network.

## BABE

BABE (Blind Assignment for Blockchain Extension), part of the Substrate framework, is the block production mechanism that Avail uses. Please refer to the [<ins>Polkadot Wiki</ins>](https://wiki.polkadot.network/docs/learn-consensus#block-production-babe) for more details.

## Bonding

Bonding is a process of locking or depositing tokens in order to participate in the operations of the Avail network. This includes participating in the consensus process and securing the network.

## Chilling

Chilling refers to the deliberate action of withdrawing from nominating or validating roles. Both validators and nominators can initiate chilling, which becomes effective in the subsequent era. Additionally, chilling can denote the exclusion of a validator from the active set by their peers, rendering them ineligible as candidates for the upcoming consensus cycle.

## Commission

Validators earn rewards for block production on the network. They set a commission rate, which is first deducted from their total rewards. The remaining rewards are then distributed to the nominators backing that validator based on this commission rate.

## Consensus

Consensus refers to the mechanism by which nodes come to an agreement about what data on the blockchain can be verified as true and accurate. The consensus protocol determines how transactions are ordered and how new blocks are added to the chain, which is [<ins>NPoS</ins>](#nominated-proof-of-stake) for Avail.

## Data Attestation

Data attestation involves confirming the authenticity and integrity of data. In Avail, this process ensures that data on the chain is both accessible and accurate. An Avail block header incorporates two attestations: KZG polynomial commitments for the provided data and the Merkle tree root with data blobs as leaves. A supermajority of Avail's validators achieve finality on the header by signing a chain that includes the header, utilizing the [<ins>GRANDPA</ins>](#grandpa) protocol.

## Data Availability Committee (DAC)

A data availability committee (DAC) is a set of nodes charged with storing copies of off-chain data and making it available on request. DACs feature in scaling solutions that increase throughput on a blockchain by processing transactions on a separate layer (i.e., off-chain scaling). Avail is more credibly neutral as a data availability layer than a DAC because it is a general-purpose data availability layer that exists as an independent chain, rather than a data availability layer for a specific L2.

## Data Availability Sampling (DAS)

Data availability sampling allows light clients to confirm the availability of data without downloading complete blocks. Through this method, light clients engage in several rounds of random sampling for small chunks of block data. With each successful round, confidence that the data is available grows. When the light node achieves a set confidence threshold, they recognize the block data as accessible.

## DHT (Distributed Hash Table)

A Distributed Hash Table (DHT) is a decentralized system offering a lookup service akin to a traditional hash table. It holds key-value pairs, enabling peers to swiftly find the value corresponding to a specific key. The DHT is pivotal in the process of sharing data cells, especially for random sampling and proof verification. It facilitates nodes in storing and identifying information about providers. Through the DHT, nodes in the network are interconnected, streamlining cell discovery and access.

## Decoupling

The concept behind a modular blockchain is that it can focus on a few tasks rather than attempting to perform all of them. Decoupling refers to the process of separating functions into modular layers or components.

## Equivocation

Equivocation is when a validator signs two or more conflicting blocks or messages. This can be done intentionally or unintentionally.

## Era

An Era is the number of sessions, which is the period that the validator set (and each validator's active nominator set) is recalculated and where rewards are paid out. Before the start of every new era in Avail, validators are selected for being part of the active validator set based on their stake. Other parameters are also checked for this selection, such as whether the validator was not producing blocks in the previous era due to being chilled or slashed. If a new validator stakes more tokens than the existing validators, or if there is a vacant seat in the active validator set because some existing validator was not producing blocks, the new validator replaces the existing one.

## Epoch

An Epoch refers to a period of time during which a specific set of validation nodes is responsible for verifying transactions and adding them to the blockchain. The length of an epoch varies depending on the blockchain network. An epoch on the Avail network is approximately 20 seconds.

## Execution

In traditional blockchains, execution refers to how nodes process transactions to transition the blockchain between states. However, Avail operates differently. As a modular base chain, Avail does not possess a general-purpose execution layer. Instead, execution occurs in other layers, such as rollups, and the resulting data is posted to Avail in its raw form, without undergoing execution on Avail itself.

In Avail's context, "Consensus" carries a more specific meaning than in typical blockchains with integrated execution layers. For Avail, consensus signifies the network's agreement that data has been appropriately published. Explicitly, validator nodes in Avail do not execute transactions as a prerequisite for attesting to the validity of blocks. With a few exceptions, such as balance transfers, validators primarily attest to the correct packaging of published data within blocks. This streamlined approach is a primary reason Avail can accommodate larger block sizes. Since validators undertake less work per block, increasing block size has a reduced impact compared to other blockchains.

## Finality

Finality refers to the state of a block or transaction where it is considered to be irreversible. This means that once a block or transaction is finalized, it cannot be changed or reversed.

## Finality Gadget

A finality gadget is a mechanism that ensures blockchain state finality by requiring validators' commitment through signed messages. Once sufficiently validated, the state is finalized and secure from malicious modifications.

## Fraud Proofs

Fraud proofs are cryptographic proofs employed to validate the legitimacy of a transaction or state transition on Avail. Any node can generate and share a fraud proof across the P2P network. App clients can then assess these proofs and respond accordingly.

## GRANDPA

GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement), part of the Substrate framework, is the finality gadget Avail uses. Please refer to [the GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) for a full description of the protocol.

## Host

A host is a computer or server that runs a blockchain node. A blockchain node is a software application that helps to maintain and secure a blockchain network. Blockchain nodes store a copy of the blockchain ledger and verify transactions.

## KZG Commitments

KZG commitments, pioneered by Aniket Kate, Gregory M. Zaverucha, and Ian Goldberg in 2010, offer a concise method for committing to polynomials. These commitments have recently gained prominence, especially in PLONK-like zero-knowledge frameworks.

In Avail's design, KZG commitments are employed for several key reasons:

- They enable succinct commitments, ideal for inclusion in block headers.
- They support brief openings, facilitating light client availability verification.
- Their strong cryptographic binding ensures the prevention of fraud proofs by rendering the creation of false commitments
  computationally challenging.

## Kademlia DHT (Kad-DHT)

Kad-DHT is a specific Distributed Hash Table (DHT) variant that organizes nodes and data based on a chord ring—a logical arrangement of nodes ordered by their IDs. Avail employs Kad-DHT to establish a decentralized network for data storage and retrieval. In this structure, each node is tasked with holding a portion of the data. Nodes can directly communicate to access data. Avail utilizes Kad-DHT to store data cells and pinpoint which peer possesses a particular data segment, with matrix data cells uniquely mapped to Peer IDs.

## libp2p

[<ins>libp2p</ins>](https://libp2p.io/) is an open-source modular network stack designed for constructing peer-to-peer (P2P) applications. It offers a flexible framework for data transfer across diverse transport protocols. Avail integrates libp2p to establish a decentralized network dedicated to data availability, ensuring that transaction data is efficiently stored and disseminated to validators and full nodes.

## Light Client

Light clients enable users to engage with a blockchain network without synchronizing the entire blockchain, preserving both decentralization and security. Typically, they retrieve only the blockchain headers, omitting the full block contents. Avail's light clients enhance this by employing Data Availability Sampling. This method ensures block content availability by downloading and verifying random segments of a block.

## Mainnet

A mainnet is a blockchain network that is fully operational and open to the public. It is the "production" version of a blockchain network, and it is where real-world transactions and applications are deployed. View the [Roadmap to Mainnet blog post](https://blog.availproject.org/road-to-mainnet-september-2023/) for more information on Avail's mainnet.

## Modular Blockchain

A modular blockchain specializes in managing specific tasks while delegating other responsibilities to distinct layers or components.

## Monolithic Blockchain

A monolithic blockchain encompasses all core functionalities (Execution, Settlement, Ordering, Data Availability) within a singular blockchain structure.

## Nominated Proof of Stake

Nominated Proof of Stake (NPoS) is a consensus algorithm where users nominate validators to process blocks for them. These validators verify and append transactions to the blockchain. For their services, validators receive rewards in the form of the native tokens. They then commission a portion of these rewards to nominators based on a set commission rate. Avail uses NPoS as implemented within Substrate.

## Oversubscribed

"Oversubscribed" refers to a situation where the number of nominators wishing to participate in the consensus process exceeds the available slots.

## Scalability

Scalability within Avail pertains to the capacity to augment the volume of data disseminated by the chain, ensuring that the experience of its participants and users remains unaffected. Avail achieves this by adopting a modular approach, taking DA off-chain, which allows the main network to primarily focus on execution. This modular design facilitates the individual optimization of key constructs, enabling each component to be scaled according to its unique requirements.

## Settlement

In the context of Avail and modular blockchains, settlement refers to the process by which modular layers agree on the correct execution outcome of transaction data. This includes any necessary dispute resolution processes. Since Avail operates as a modular base chain, it merely receives and stores raw transaction data without executing it. This data can encompass a wide range, from valid transactions to potential spam.

The actual execution of these transactions and the subsequent validation of their outcomes occur in other layers or systems. Once these layers reach an agreement on the outcome, the results are "settled." For instance, in the case of a validium, transaction data is published to Avail, sequencers then execute these transactions, and finally, proofs of these executions are posted to Ethereum for settlement. Different modular constructions might employ varying mechanisms or platforms for settlement, but the core principle remains the same: determining and agreeing upon the correct outcome of transactions.

## Slashing

Slashing is a penalty that is imposed on validators who misbehave. For example, a validator may be slashed if they equivocate, meaning that they sign two or more conflicting blocks. Slashing can be a severe penalty, as it can result in the loss of a portion of the validator's stake.

## Sovereign Rollup

A sovereign rollup is a type of blockchain that publishes its transactions to another blockchain, typically for ordering and data availability, but handles its own settlement. This means that sovereign rollups have their own canonical chain and validity rules, and they do not need to rely on a settlement layer to determine which transactions are valid.

## Stash Account

The stash account holds the tokens you wish to stake/bond. This account is like a cold storage account and is used for bonding and unbonding tokens, as well as for designating the controller account.

## Testnet

A testnet is a simulated blockchain network that is used to test and debug blockchain applications before they are deployed on the mainnet. Testnets are typically open to the public, and anyone can participate in them.

## Validium

Validiums store transaction data off the L1 (e.g. Ethereum). Validiums can inherit the benefits of Avail’s scalable and purpose-built module quite well. Instead of posting transaction data to a Data Availability Committee (or somewhere else), Validiums can post transaction data to Avail.

## Validator

An Avail validator is a full node that is responsible for verifying transactions and adding them to the blockchain.

## Volitions

Volition is a type of zero-knowledge rollup that allows developers to choose whether to store transaction data on the blockchain or off-chain.
