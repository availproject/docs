---
id: glossary
title: Glossary
sidebar_label: Glossary
description: "A glossary of essential terms, definitions, and concepts related to Avail."

keywords:
    - docs
    - avail
    - Glossary
    - Monolithic
    - data availability
image: https://availproject.github.io/img/avail/AvailDocs.png

---

## General

### Monolithic Blockchain
A monolithic blockchain execute all of the core functions of a blockchain (Execution, Settlement, Ordering, Data Availability) inside a single blockchain.

### Modular Blockchain 
Modular blockchains is one that focuses on handling a select few duties and outsources the rest to one or more separate layers.

### Data Availability (DA)
Data Availability is the ability of nodes to access and validate the data associated with a blockchain.

### Scalability
Scalability in Avail refers to the ability to increase the amount of data published by the chain without negatively impacting the participants and users of the chain. This is achieved through a modular design that separates data availability (DA) from execution. This allows for modular scaling of key constructs, as they can be optimized individually.

### Execution
Execution is how nodes on the blockchain process transactions to transition the blockchain between states. Avail uses optimistic and succinct systems (zk) to scale execution. This means that transactions can be executed off-chain and then verified on-chain using proofs of execution. This allows Avail to handle a large number of transactions without sacrificing security or decentralization.

### Settlement
The "finality" that blockchains offer is a promise that the transactions that have been recorded in the chain's history are unchangeable (or "immutable"). The blockchain must be persuaded of a transaction's authenticity for this to occur. The chain must therefore validate transactions, check the accuracy of proofs, and resolve disagreements in order to perform the settlement function.

### Decoupling
The concept behind a modular blockchain is that it can focus on a few tasks rather than attempting to perform all of them. Decoupling refers to the process of separating functions into modular layers or components.

### Data Attestation Bridge
Bridging is a communication mechanism between Avail and Ethereum that allows data to be shared between the two chains. The data attestation bridge, which is still in its testnet phase, helps secure data off-chain. It’s connected to Ethereum, and can be used by both [zero-knowledge](https://ethereum.org/en/developers/docs/scaling/zk-rollups/) and [optimistic rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) that use Ethereum as a base layer. It establishes a direct connection between the L2 rollup’s data and the L1 via Avail’s off-chain data availability layer.

## Blockchain Solution

### Validiums 
Validiums store transaction data off the L1 (e.g. Ethereum). Validiums can inherit the benefits of Avail’s scalable and purpose-built module quite well. Instead of posting transaction data to a Data Availability Committee (or somewhere else), Validiums can post transaction data to Avail.

### Sovereign Rollups
A sovereign rollup is a type of blockchain that publishes its transactions to another blockchain, typically for ordering and data availability, but handles its own settlement. This means that sovereign rollups have their own canonical chain and validity rules, and they do not need to rely on a settlement layer to determine which transactions are valid.

### App-Chains
App-chains allow developers to optimize their applications by tailoring a chain to the specific needs of their use case, without constraints from a shared blockchain. They provide enhanced performance and scalability by functioning as independent chains, serving specific applications. App-chains simplify the development process by eliminating the need for developers to manage and maintain a validator set.

### Sidechains
A sidechain is a separate blockchain network that is connected to another blockchain, called a parent chain or mainnet, through a two-way bridge. Sidechains can have their own consensus mechanisms, block times, and transaction fees, which allows them to be optimized for specific use cases.

### Volitions
Volition is a type of zero-knowledge rollup that allows developers to choose whether to store transaction data on the blockchain or off-chain.

## Consensus

### Consensus
Consensus refers to the mechanism by which nodes come to an agreement about what data on the blockchain can be verified as true and accurate. The consensus protocol determines how transactions are ordered and how new blocks are added to the chain.

### Commission
Commission in Avail is a fee that is paid to validators for verifying transactions, attestations, and providing data availability services. Commissions are typically paid in the native token of Avail, called AVL.

### Era
An Era is the number of sessions, which is the period that the validator set (and each validator's active nominator set) is recalculated and where rewards are paid out. Before the start of every new era in Avail, validators are selected for being part of the active validator set based on their stake. Other parameters are also checked for this selection, such as whether the validator was not producing blocks in the previous era due to being chilled or slashed. If a new validator stakes more tokens than the existing validators, or if there is a vacant seat in the active validator set because some existing validator was not producing blocks, the new validator replaces the existing one.

### Epoch
Epoch refers to a period of time during which a specific set of validation nodes is responsible for verifying transactions and adding them to the blockchain. The length of an epoch varies depending on the blockchain network. An epoch on the Avail network is approximately 20 seconds.

### Bonding
Bonding is a process of locking or depositing tokens in order to participate in the operations of the Avail network. This includes participating in the consensus process, securing the network, and providing data availability services.

### Nominated Proof of Stake
Nominated Proof of Stake (NPoS) is a consensus mechanism that allows users to nominate validators to process blocks on their behalf. Validators are responsible for verifying transactions and adding them to the blockchain. In return for their work, validators are rewarded with native token. Avail uses NPOS as implemented in Substrate.

### Governance
Governance refers to the process of making decisions about the development and operation of a blockchain network.

### Validator
A validator is a full node that is responsible for verifying transactions and adding them to the blockchain.

### Oversubscribed
Oversubscribed means that there are more nominators who want to participate in the consensus process than there are slots available.

### Equivocation
Equivocation is when a validator signs two or more conflicting blocks or messages. This can be done intentionally or unintentionally.

### Chilling
Chilling is the act of stepping back from any nominating or validating. It can be done by a validator or nominator at any time, taking effect in the next era. It can also specifically mean removing a validator from the active validator set by another validator, disqualifying them from the set of electable candidates in the next NPoS cycle.

### Slashing
Slashing is a penalty that is imposed on validators who misbehave. For example, a validator may be slashed if they equivocate, meaning that they sign two or more conflicting blocks. Slashing can be a severe penalty, as it can result in the loss of a portion of the validator's stake.

### Finality
Finality refers to the state of a block or transaction where it is considered to be irreversible. This means that once a block or transaction is finalized, it cannot be changed or reversed.

### Finality Gadget
A finality gadget is a mechanism that ensures blockchain state finality by requiring validators' commitment through signed messages. Once sufficiently validated, the state is finalized and secure from malicious modifications.

### BABE
BABE (Blind Assignment for Blockchain Extension), part of the Substrate framework, is the block production mechanism that Avail uses. Please refer to [the BABE official consensus doc](https://paritytech.github.io/polkadot-sdk/master/sc_consensus_babe/index.html) for more details.

### GRANDPA
GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement), part of the Substrate framework, is the finality gadget Avail uses. Please refer to [the GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) for a full description of the protocol.

### Validity Proof
Validity Proof is a type of cryptographic proof that can be used to attest to the validity of a state transition. For example, zk-Rollups utilize validity proofs to prove valid state transitions to a parent chain - commonly used with proof systems such as SNARKs and STARKs.

## Data Management and Availability

### Data Availability Sampling (DAS)

Data availability sampling allows light clients to confirm the availability of data without downloading complete blocks. Through this method, light clients engage in several rounds of random sampling for small chunks of block data. With each successful round, confidence that the data is available grows. When the light node achieves a set confidence threshold, they recognize the block data as accessible.

### KZG Commitments
KZG commitments, introduced by Aniket Kate, Gregory M. Zaverucha, and Ian Goldberg in 2010, provide a way to commit to polynomials in a succinct manner. Recently, polynomial commitments came to the forefront, being primarily used as commitments in PLONK-like zero knowledge constructions.

In Avail’s construction, we use KZG commitments for the following reasons:

* It allows us to commit to values in a succinct manner to be kept inside the block header.
* Short openings are possible which helps a light client verify availability.
* The cryptographic binding property helps us avoid fraud proofs by making it computationally infeasible to produce incorrect commitments.

### Erasure Coding
Erasure coding is a method of data storage and transmission that uses redundant data to protect against data loss. The Light Client (LC) recovers application data from the already erasure-encoded blocks on Avail. It’s important because the LC is sampling randomly, so block-level redundancy makes it more likely that the LC would find missing data. It can be used to improve the efficiency and scalability of the network by distributing the data across multiple nodes in the network, reducing the burden on any one node and making the network more resilient to failures. Erasure coding takes place at the block level in the data lifecycle.

### Fraud Proofs
Fraud proofs are a type of cryptographic proof that can be used to prove that a transaction or state transition on Avail is invalid. Any node can create a fraud proof and transmit it to other nodes on the P2P network. App clients can verify fraud proofs and take appropriate action.

### Data Availability Committee (DAC)
A data availability committee (DAC) is a set of nodes charged with storing copies of off-chain data and making it available on request. DACs feature in scaling solutions that increase throughput on a blockchain by processing transactions on a separate layer (i.e., off-chain scaling). Avail is more credibly neutral as a data availability layer than a DAC because it is a general-purpose data availability layer that exists as an independent chain, rather than a data availability layer for a specific Ethereum L2.

### Data Attestation
Data attestation is the process of verifying the authenticity and integrity of data. Avail uses data attestation to ensure that all data published on the chain is available and accurate. A block header on Avail contains two types of attestations: KZG polynomial commitments of the submitted data and the root of the Merkle tree whose leaves are the data blobs. Supermajority of validators of Avail reach finality over the header by signing over a chain containing the header using the GRANDPA protocol.

## Account and Asset Management

### Avail JS Apps
The Avail JS Apps UI is a forked version of [Polkadot JS Apps UI](https://polkadot.js.org/apps/) repository for visualizing and interacting with the Avail network.

### Stash Account 
The stash account holds the tokens you wish to stake/bond. This account is like a cold storage account and is used for bonding and unbonding tokens, as well as for designating the controller account.

### Controller Account
The controller account is used to take actions related to the bonded tokens. Most of the staking actions, like verifying reward payout methods, nominating a validator, or unbonding staked tokens, are performed by the controller account.

### AVL
AVL is the native token of Avail. AVL token is currently using 18 decimal digits as regular ERC20 for its token precision. At the moment, the Minimum Validator Bond is 1000 AVL.

## Network Architecture

### libp2p
libp2p is modular network stack for building peer-to-peer (P2P) applications. It is open source, modular and allows for greater flexibility in terms of how data is transferred. Avail uses libp2p to build a decentralized network for data availability. This network is responsible for storing and distributing transaction data to validators and full nodes.

### DHT (Distributed Hash Table)
A Distributed Hash Table (DHT) is a distributed system that provides a lookup service similar to a hash table. A DHT stores key-value pairs and allows peers to efficiently locate the value associated with a given key. The DHT plays a crucial role in the data cells (random sampling and proof verification) sharing process. It allows nodes to store and discover information about cell providers. Nodes in the network are interconnected via the DHT, enabling efficient cell discovery and retrieval.

### Kademlia DHT (Kad-DHT)
Kad-DHT is a type of DHT which is based on the idea of a chord ring, which is a logical ring of nodes that are ordered by their IDs. Avail uses Kad-DHT to create a decentralized network for storing and retrieving data. Kad-DHT is a distributed hash table (DHT) that uses a chord ring to organize nodes and data. Each node in the ring is responsible for storing a subset of the data, and nodes can communicate with each other directly to retrieve data. It uses Kad-DHT to store data cells and discover information about what peer is holding exactly what piece of data. Matrix data cells are mapped by unique Peer IDs.

### Peer routing
Peer routing is the process of nodes in a blockchain network discovering and communicating with each other. Peer routing is essential for the operation of blockchain networks, as it allows nodes to broadcast and receive transactions and blocks, and to synchronize the state of the network.

### Content Routing
Content routing is the process of delivering content to users in a blockchain network in a way that is efficient, secure, and scalable.

### Mainnet
A mainnet is a blockchain network that is fully operational and open to the public. It is the "production" version of a blockchain network, and it is where real-world transactions and applications are deployed.

### Testnet
A testnet is a simulated blockchain network that is used to test and debug blockchain applications before they are deployed on the mainnet. Testnets are typically open to the public, and anyone can participate in them.

### Node
A node is a device that participates in a blockchain protocol by running its software.

### Client
A client is a software application that allows users to interact with a blockchain network. Clients can be used to perform a variety of tasks, such as sending and receiving transactions, viewing the state of the network, and deploying and interacting with smart contracts.

### Host
A host is a computer or server that runs a blockchain node. A blockchain node is a software application that helps to maintain and secure a blockchain network. Blockchain nodes store a copy of the blockchain ledger and verify transactions.

### Full Node
Full node is a type of node that fully verifies a blockchain. Full nodes maintain the blockchain's current state, and in archive mode, will store the complete transaction history.



