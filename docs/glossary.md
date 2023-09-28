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
A modular blockchain is one that focuses on handling a select few duties and outsources the rest to one or more separate layers.

### Modular Blockchain 
Monolithic blockchains is a blockchain which execute all of the core functions of a blockchain (Execution, Settlement, Ordering, Data Availability) inside a single blockchain
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

### Bridging
Data Attestation Bridge (still in its testnet phase) relays the attested Merkle root from Avail to a specific bridge contract on Ethereum, serving as proof that the Avail validators have reached consensus on the data's availability.


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
A commission is a fee that is paid to validators for verifying transactions and adding them to the blockchain. Commissions are typically paid in the native cryptocurrency of the blockchain.

### Era
A (whole) number of sessions, which is the period that the validator set (and each validator's active nominator set) is recalculated and where rewards are paid out.

### Epoch
Epoch refers to a period of time during which a specific set of validation nodes is responsible for verifying transactions and adding them to the blockchain. The length of an epoch varies depending on the blockchain network. For example, an epoch on the Avail network is approximately 20 seconds, while an epoch on the Solana network is approximately 4 seconds.

### Bonding
Bonding refers to the process of staking a certain amount of cryptocurrency in order to participate in the consensus process. This is typically done in Proof-of-Stake (PoS) and Delegated Proof-of-Stake (DPoS) consensus mechanisms.

### Nominated Proof of Stake
Nominated Proof of Stake (NPoS) is a consensus mechanism that allows users to nominate validators to process blocks on their behalf. Validators are responsible for verifying transactions and adding them to the blockchain. In return for their work, validators are rewarded with cryptocurrency. NPoS is used by a number of popular blockchain networks, including Polkadot, Kusama, and Edgeware. It is also being considered by other networks, such as Ethereum 2.0.

### Governance
Governance refers to the process of making decisions about the development and operation of a blockchain network.

### Validator
A validator is a full node that is responsible for verifying transactions and adding them to the blockchain. Avail is building towards supporting up to 1,000 external validators in the active set.

### Oversubscribed
Oversubscribed means that there are more nominators who want to participate in the consensus process than there are slots available.

### Equivocation
Equivocation in the context of consensus is when a validator signs two or more conflicting blocks or messages. This can be done intentionally or unintentionally.

### Chilling
Chilling is a state of the staking bond that allows a validator to temporarily pause their active engagement in staking without having to unbond their funds.



### Slashing
Slashing is a penalty that is imposed on validators who misbehave. For example, a validator may be slashed if they equivocate, meaning that they sign two or more conflicting blocks. Slashing can be a severe penalty, as it can result in the loss of a portion of the validator's stake.

### Finality
It refers to the state of a block or transaction where it is considered to be irreversible. This means that once a block or transaction is finalized, it cannot be changed or reversed.

### Finality Gadget
A finality gadget is a mechanism that ensures blockchain state finality by requiring validators' commitment through signed messages. Once sufficiently validated, the state is finalized and secure from malicious modifications.
### BABE
BABE (Blind Assignment for Blockchain Extension), part of the Substrate framework, is the block production mechanism that Avail uses. BABE utilizes a slot-based algorithm that Avail optimizes for liveness.

### GRANDPA
GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement), part of the Substrate framework, is the finality mechanism Avail uses. It is designed to ensure that blocks are finalized quickly and securely, even in the presence of network partitions and malicious actors. GRANDPA works by having validators vote on chains, not blocks. This means that validators are voting on the longest and heaviest chain, which is the most likely chain to be the canonical chain. GRANDPA also uses a mechanism called finality to ensure that blocks are irreversible once they have been finalized.

### Validity Proof
A type of cryptographic proof that can be used to attest to the validity of a state transition. For example, zk-Rollups utilize validity proofs to prove valid state transitions to a parent chain - commonly used with proof systems such as SNARKs and STARKs.

## Data Management and Availability
### Data Availability Sampling (DAS)
Data availability sampling allows light nodes to confirm the availability of data without downloading the complete block. Through this method, light nodes engage in several rounds of random sampling for small chunks of block data. With each successful round, confidence that the data is available grows. When the light node achieves a set confidence threshold, they recognize the block data as accessible.
In Avail's blockchain architecture, this sampling technique empowers light nodes to enhance the network's security and capacity, all while using much less resource-intensive hardware compared to full nodes.

### KZG Commitments
KZG commitments, introduced by Aniket Kate, Gregory M. Zaverucha, and Ian Goldberg in 2010, provide a way to commit to polynomials in a succinct manner. Recently, polynomial commitments came to the forefront, being primarily used as commitments in PLONK-like zero knowledge constructions.

In Avail’s construction, we use KZG commitments for the following reasons:

* It allows us to commit to values in a succinct manner to be kept inside the block header.
* Short openings are possible which helps a light client verify availability.
* The cryptographic binding property helps us avoid fraud proofs by making it computationally infeasible to produce incorrect commitments.



### Erasure Coding

It is a method of reproducing data from smaller encoded blocks. The light client recovers application data from the already erasure-encoded blocks on Avail. It’s important because the LC is sampling randomly, so block-level redundancy makes it more likely that the LC would find missing data.


### Fraud Proofs
Fraud proofs are a type of cryptographic proof that can be used to prove that a transaction or state transition is invalid. Fraud proofs are particularly useful for blockchain applications, where it is important to be able to verify the validity of transactions and state transitions quickly and efficiently.

### Data Availability Committee (DAC)
A Data Availability Committee (DAC) is a trusted group of data managers (nodes) that store and grant access to data, maintaining the data off the main chain. Upon receiving and verifying data requests, the DAC provides authorized users with the needed data.

### Data Attestation
Data attestation is the process of verifying the authenticity and integrity of data. A block header on Avail contains two types of attestations. One attestation being KZG polynomial commitments of the submitted data and another being the root of the Merkle tree whose leaves are the data blobs. Supermajority of validators of Avail reach finality over the header by signing over a chain containing the header using the GRANDPA protocol.



## Account and Asset Management

### Avail JS Apps
The Avail JS Apps UI is a forked version of [Polkadot JS Apps UI](https://polkadot.js.org/apps/) repository for visualizing and interacting with the Avail network.
### Stash
It is a private and secure storage for accounts. It is typically implemented as a separate wallet or account that is not connected to the main account or wallet. Stashes can be used to store a variety of assets, including cryptocurrencies, NFTs, and other digital assets.

### Controller
Controller is a person or entity that has the authority to manage an account. Controllers can perform a variety of tasks, such as: Transferring assets, Receiving assets, Setting permissions, Changing account settings, and Viewing account information.

### AVL
The native token of Avail.

## Network Architecture
### libp2p
Libp2p is a modular network stack for building peer-to-peer (P2P) applications. It is open source and free to use, and it is used by Avail.
### DHT (Distributed Hash Table)
A distributed hash table (DHT) is a distributed system that provides a lookup service similar to a hash table. A DHT stores key-value pairs and allows peers to efficiently locate the value associated with a given key. The DHT plays a crucial role in the data cells (random sampling and proof verification) sharing process. It allows nodes to store and discover information about cell providers. Nodes in the network are interconnected via the DHT, enabling efficient cell discovery and retrieval.

### Kademlia DHT (Kad-DHT)
Kad-DHT is based on the idea of a chord ring, which is a logical ring of nodes that are ordered by their IDs. Each node in the ring is responsible for storing a subset of the data, and nodes can communicate with each other directly to retrieve data. The Kademlia Distributed Hash Table allows our nodes to store data cells and discover information about what peer is holding exactly what piece of data. Matrix data cells are mapped by unique Peer IDs.

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
A type of node that fully verifies a blockchain. Full nodes maintain the blockchain's current state, and in archive mode, will store the complete transaction history.



