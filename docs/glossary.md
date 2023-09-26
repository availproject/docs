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
In a monolithic blockchain, all tasks are handled on a single layer or a group of tightly coupled chains operating on the same layer. The latter distinction is important to note: a network of interconnected blockchains that handle all roles, such as Polkadot’s parachains or Avalanche’s subnets, doesn’t qualify as modular architecture.

### Data Availability (DA)
The DA layer guarantees that all necessary data is available for reconstructing the state of a rollup. Data Availability is not Data Storage. Data availability is the assurance that full nodes have been able to access and verify the full set of transactions associated with a specific block.

### Scalability
Scalability refers to the ability to increase the amount of data published by the chain without negatively impacting the participants and users of the chain. For example, without drastically increasing hardware requirements for validators, full nodes, or application clients.

### Execution
Execution is how nodes on the blockchain process transactions to transition the blockchain between states. Nodes participating in consensus must execute transactions using their copy of the blockchain to attest before validating blocks.

### Settlement
The "finality" that blockchains offer is a promise that the transactions that have been recorded in the chain's history are unchangeable (or "immutable"). The blockchain must be persuaded of a transaction's authenticity for this to occur. The chain must therefore validate transactions, check the accuracy of proofs, and resolve disagreements in order to perform the settlement function.

### Decoupling
The concept behind a modular blockchain is that it can focus on a few tasks rather than attempting to perform all of them. In particular, modular blockchains decouple execution from consensus.

### Bridging
Connection between different layers in modular blockchain


## Blockchain Solution
### Validiums 
A validium is like a zero-knowledge rollup, but it doesn't store the transaction data on the parent chain. Instead, it uses a validity proof to prove that the transactions are valid.

### Sovereign Rollups
A sovereign rollup is a type of blockchain that publishes its transactions to another blockchain, typically for ordering and data availability, but handles its own settlement. This means that sovereign rollups have their own canonical chain and validity rules, and they do not need to rely on a settlement layer to determine which transactions are valid.

### App-Chains

App-chains, short for application-specific blockchains, are specialized blockchains that are designed to meet the specific needs of a particular application or use case. This customization can lead to significant improvements in efficiency, scalability, and security compared to general-purpose blockchains, such as Ethereum, which serve a wide range of applications.

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
A validator in blockchain is a full node that is responsible for verifying transactions and adding them to the blockchain.

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
Data Availability Sampling (DAS) is a technique that allows light nodes to verify the availability of data without having to download all of it. This is important because blockchains can contain a lot of data, and it can be expensive and time-consuming for light nodes to download all of it. DAS works by having light nodes download a small sample of the data from each block. If the light node can successfully download and verify the sample, then it can be confident that the entire block is available.

### KZG Commitments
KZG Commitments are a type of polynomial commitment scheme that was introduced by Kate, Zaverucha, and Goldberg in 2010. KZG commitments are non-interactive, meaning that they can be generated and verified without any communication between the prover and the verifier. This makes them ideal for use in blockchain applications, where it is important to minimize communication overhead.

### Erasure Coding
Erasure coding is a data protection technique that allows data to be recovered even if some of the data is lost or corrupted. Erasure coding works by dividing the data into fragments and then adding redundant data to the fragments. The redundant data is calculated in such a way that it can be used to reconstruct the original data if a certain number of fragments are lost or corrupted.

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



