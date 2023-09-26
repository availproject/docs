---
id: glossary
title: Glossary
sidebar_label: Glossary
description:  Avail common reference for general definitions and concepts.

keywords:
    - docs
    - avail
    - modularity
    - Monolithic
    - data availability
image: https://availproject.github.io/img/avail/AvailDocs.png



---

# Avail Glossary

## General

### Modular Blockchain
A modular blockchain is one that focuses on handling a select few duties and outsources the rest to one or more separate layers.

### Monolithic Blockchain 
In a monolithic blockchain, all tasks are handled on a single layer or a group of tightly coupled chains operating on the same layer. 
### Data Availability (DA)
The DA layer guarantees that all necessary data is available for reconstructing the state of a rollup. Data Availability is not Data Storage. Data availability is the assurance that full nodes have been able to access and verify the full set of transactions associated with a specific block.

### Scalability
Scalability refers to the ability to increase the amount of data published by the chain without negatively impacting the participants and users of the chain. For example, without drastically increasing hardware requirements for validators, full nodes, or application clients.

### Execution
Execution is how nodes on the blockchain process transactions to transition the blockchain between states. Nodes participating in consensus must execute transactions using their copy of the blockchain to attest before validating blocks.

### Settlement
The "finality" that blockchains offer is a promise that the transactions that have been recorded in the chain's history are unchangeable (or "immutable"). The blockchain must be persuaded of a transaction's authenticity for this to occur. The chain must therefore validate transactions, check the accuracy of proofs, and resolve disagreements in order to perform the settlement function.

### Decoupling
The concept behind a modular blockchain is that it can focus on a few tasks rather than attempting to perform all of them. Decoupling refers to the process of separating functions into modular layers or components.

### Bridging
Connection between different layers in modular blockchain


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
Governance in blockchain refers to the process of making decisions about the development and operation of a blockchain network.

### Validator
A validator in blockchain is a full node that is responsible for verifying transactions and adding them to the blockchain. Avail is building towards supporting up to 1,000 external validators in the active set.

### Oversubscribed
Oversubscribed means that there are more validators who want to participate in the consensus process than there are slots available.

### Equivocation
Equivocation in the context of consensus in blockchain is when a validator signs two or more conflicting blocks or messages. This can be done intentionally or unintentionally.

### Chilling
It refers to a situation where validators are reluctant to participate in the consensus process because they are afraid of being penalized.

### Slashing
Slashing is a penalty that is imposed on validators who misbehave. For example, a validator may be slashed if they equivocate, meaning that they sign two or more conflicting blocks. Slashing can be a severe penalty, as it can result in the loss of a portion of the validator's stake.

### Finality
It refers to the state of a block or transaction where it is considered to be irreversible. This means that once a block or transaction is finalized, it cannot be changed or reversed.

### Finality Gadget
A finality gadget is a mechanism that can be used to achieve finality in a variety of consensus mechanisms. Finality gadgets typically work by requiring validators to sign a message that commits them to a particular state of the blockchain. Once a sufficient number of validators have signed the message, the state is considered to be finalized., even by malicious actors. For example, Ethereum 2.0 is using a finality gadget called Casper FFG to achieve finality. Whereas, Polkadot uses a finality gadget called GRANDPA to achieve finality in its main chain.

### BABE
BABE stands for Blind Assignment for Blockchain Extension. It is a block production mechanism that is used in the Polkadot and Kusama blockchain networks. BABE is a slot-based algorithm, meaning that time is divided into fixed-length slots and each slot is assigned to a specific validator to produce a block. It uses a random process to assign slots to validators. This process is designed to be fair and to prevent any one validator from having too much control over the block production process. BABE also uses a mechanism called finality to ensure that blocks are irreversible once they have been finalized.

### GRANDPA
GRANDPA stands for GHOST-based Recursive Ancestor Deriving Prefix Agreement. It is a finality gadget that is used in the Polkadot and Kusama blockchain networks. GRANDPA is designed to ensure that blocks are finalized quickly and securely, even in the presence of network partitions and malicious actors. GRANDPA works by having validators vote on chains, not blocks. This means that validators are voting on the longest and heaviest chain, which is the most likely chain to be the canonical chain. GRANDPA also uses a mechanism called finality to ensure that blocks are irreversible once they have been finalized.

### Validity Proof
A type of cryptographic proof that can be used to attest to the validity of a state transition. For example, zk-Rollups utilize validity proofs to prove valid state transitions to a parent chain - commonly used with proof systems such as SNARKs and STARKs.

## Data Management and Availability
### Data Availability Sampling (DAS)
Avail light clients, like other light clients, only download the headers of the blockchain. However, they additionally perform data availability sampling: a technique that randomly samples small sections of the block data and verifies they are correct. When combined with erasure coding and KZG polynomial commitments, Avail clients are able to provide strong (nearly 100%) guarantees of availability without relying on fraud proofs, and with only a small constant number of queries.

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
A Data Availability Committee (DAC) is a group of trusted parties that are responsible for storing and providing access to off-chain data for a blockchain network. DACs are used in a variety of blockchain applications, such as rollups and layer-2 solutions, to improve scalability and reduce costs. DACs work by storing copies of off-chain data on their own servers. When a user wants to access this data, they send a request to the DAC. The DAC then verifies that the user is authorized to access the data and then provides them with a copy.

### Data Attestation
Data attestation is the process of verifying the authenticity and integrity of data. Attesting data is a fundamental process in blockchain networks that fosters consensus, ensures data integrity, facilitates efficient communication, and encourages active participation. By embracing attestation mechanisms, blockchain ecosystems can achieve greater security, reliability, and trust in their operations.



## Account and Asset Management

### Avail JS Apps
Avail apps is a forked version of the polkadot-apps repository for visualizing and interacting with the Avail network.
### Stash
It is a private and secure storage for accounts. It is typically implemented as a separate wallet or account that is not connected to the main account or wallet. Stashes can be used to store a variety of assets, including cryptocurrencies, NFTs, and other digital assets.

### Controller
Controller is a person or entity that has the authority to manage an account. Controllers can perform a variety of tasks, such as: Transferring assets, Receiving assets, Setting permissions, Changing account settings, and Viewing account information.

### AVL
The native token of Avail.

## Network Architecture
### libp2p
libp2p is a modular network stack for building peer-to-peer (P2P) applications. It is open source and free to use. libp2p is used by Avail.
DHT (Distributed Hash Table): A distributed hash table (DHT) is a distributed system that provides a lookup service similar to a hash table. A DHT stores key-value pairs and allows peers to efficiently locate the value associated with a given key. DHTs are often used in blockchain networks to store and retrieve data, such as blocks, transactions, and state data.

### Kademlia DHT (Kad-DHT)
Kademlia is a distributed hash table (DHT) protocol that is used to store and retrieve data in a decentralized manner. It is based on the idea of a chord ring, which is a logical ring of nodes that are ordered by their IDs. Each node in the ring is responsible for storing a subset of the data, and nodes can communicate with each other directly to retrieve data. Kademlia is a popular DHT protocol because it is efficient, scalable, and fault-tolerant. This is used by Avail.

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
A type of node that fully verifies a blockchain. To fully verify a block, at minimum, a full node must download the block’s data and check that it has consensus. If full nodes are required to ensure that the transactions are valid, they must also re-execute them.



