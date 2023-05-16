---
id: avail-system-overview
title: System Overview
sidebar_label: System Overview
description: Learn about the architecture of the Avail chain
keywords:
  - docs
  - avail
  - data
  - availability
  - architecture
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-system-overview
---

# System Overview

## Modularity

Currently, monolithic blockchain architectures like that of Ethereum cannot efficiently handle the execution, settlement, and data availability. 

Modularizing execution to scale blockchains is what rollup-centric chain models attempt to do. This can work well when the settlement and data availability layers are on the same layer, which is the approach Ethereum rollups take. Still, there are necessary trade-offs when working with rollups, as the rollup construction can be more secure depending on the security of the data availability layer but would be inherently more challenging to scale.

However, a granular design creates different layers to be lightweight protocols, like microservices. Then, the overall network becomes a collection of loosely-coupled lightweight protocols. An example is a data availability layer that only specializes in data availability. Avail is a Substrate-based layer two blockchain for data availability. 

:::info Substrate runtime

Although Avail is based on the Substrate codebase, it includes modifications to the block structure that prevent it from interoperating with other Substrate networks. Avail implements an independent network unrelated to Polkadot or Kusama.

:::

Avail provides a high guarantee of data availability to any light client, but does not make higher guarantees to light clients about DA than any other network. Avail focuses on making it possible to prove that block data is available without downloading the whole block by leveraging Kate polynomial commitments, erasure coding, and other technologies to allow light clients (which download only the _headers_ of the chain) to efficiently and randomly sample small amounts of the block data to verify its full availability. However, there are fundamentally different primitives than fraud-proof-based DA systems, which are explained [here](https://blog.availproject.org/the-data-availability-problem/).

### Providing data availability

The DA guarantee is something a client determines for itself; it does not have to trust nodes. As the number of light clients grows, they collectively sample the entire block (even though each client only samples a small percentage). Light clients eventually form a P2P network amongst themselves; thus, after a block has been sampled, it becomes highly available — that is, even if the nodes were to go down (or attempt to censor a block), the light clients would be able to re-construct the block by sharing the pieces amongst themselves.

### Enabling the next set of solutions

Avail will take rollups to the next level as chains can allocate their data availability component to Avail. Avail also provides an alternative way to bootstrap any standalone chain, as chains can offload their data availability. There are, of course, trade-offs that are made with different modularity approaches, but the overall goal is to maintain high security while being able to scale.

Transaction costs are also reduced. Avail can grow block size with a smaller impact on the validator workload than a monolithic chain. When a monolithic chain increases block size, validators have to do a lot more work because blocks have to execute, and state has to be calculated. Since Avail has no execution environment, it is much cheaper to increase the block size. The cost is not zero because of the need to calculate KZG commitments and generate proofs, but still inexpensive. 

Avail also makes sovereign rollups a possibility. Users can create sovereign chains that rely on Avail's validators to reach consensus on transaction data and order. Sovereign rollups on Avail allow for seamless upgrades, as users can push updates to application-specific nodes to upgrade the chain and, in turn, upgrade to new settlement logic. Whereas in a traditional environment, the network requires a fork.

:::info Avail does not have an execution environment

Avail does not run smart contracts but allows other chains to make their transaction data available through Avail. These chains may implement their execution environments of any kind: EVM, Wasm, or anything else.

:::

Data availability on Avail is available for a window of time that it is required. For instance, beyond needing data or reconstruction, security is not compromised.

:::info Avail doesn't care what the data is for

Avail guarantees that block data is available but does not care about what that data is. The data can be transactions but can take on other forms too. 

:::

Storage systems, on the other hand, are designed to store data for long periods, and include incentivization mechanisms to encourage users to store data.

## Validation

### Peer Validation

Three types of peers typically compose an ecosystem:

* **Validator nodes:** A validator collects transactions from the mempool, executes them, and generates a candidate block that is appended to the network. The block contains a small block header with the digest and metadata of the transactions in the block.
* **Full nodes:** The candidate block propagates to full nodes across the network for verification. The nodes will re-execute the transactions contained in the candidate block. 
* **Light clients:** Light clients only fetch the block header to use for verification and will fetch transaction details from neighboring full nodes as needed.

While a secure approach, Avail addresses the limitations of this architecture to create robustness and increased guarantees. Light clients can be tricked into accepting blocks whose underlying data is unavailable. A block producer can include a malicious transaction in a block and not reveal its entire content to the network. As mentioned in the Avail docs, this is known as the data availability problem.

Avail's network peers include:

* **Validator nodes:** Protocol incentivized full nodes that participate in the consensus. Validator nodes on Avail do not execute transactions. They package up arbitrary transactions and construct candidate blocks, generating KZG commitments for the data. **Other validators check that generated blocks are correct**.

* **Avail (DA) full nodes:** Nodes that download and make available all block data for all applications using Avail. Similarly, Avail full nodes do not execute transactions.

* **Avail (DA) light clients:** Clients that only download block headers randomly sample small parts of the block to verify availability. They expose a local API to interact with the Avail network.

:::info The goal of Avail is not to be reliant on full nodes to keep data available

The aim is to give similar DA guarantees to a light client as a full node. Users are encouraged to use Avail light clients. However, they can still run Avail full nodes, which are well supported.

:::

:::caution The local API is a WIP and is not yet stable
:::

This allows applications that want to use Avail to embed the DA light client. They can then build:

* **App full nodes**
  - Embed an Avail (DA) light client
  - Download all data for a specific appID
  - Implement an execution environment to run transactions
  - Maintain application state

* **App light clients**
  - Embed an Avail (DA) light client
  - Implement end-user-facing functionality

The Avail ecosystem will also feature bridges to enable specific use-cases. One such bridge being designed at this time is an _attestation bridge_ that will post attestations of data available on Avail to Ethereum, thus allowing the creation of validiums.

## State verification

### Block verification &rarr; DA verification

#### Validators

Instead of Avail validators verifying the application state, they concentrate on ensuring the availability of posted transaction data and providing transaction ordering. A block is considered valid only if the data behind that block is available.

Avail validators take on incoming transactions, order them, construct a candidate block, and propose to the network. The block contains special features, especially for DA—erasure coding and KZG commitments. This is in a particular format, so clients can do random sampling and download only a single application's transactions.

Other validators verify the block by ensuring the block is well formed, the KZG commitments 
check out, the data is there, etc.

#### Clients

Requiring data to be available prevents block producers from releasing block headers without releasing the data behind them, as this prevents clients from reading the transactions necessary to compute the state of their applications. As with other chains, Avail uses data availability verification to address this through DA checks which utilize erasure codes; these checks are heavily used in data redundancy design.

Erasure codes effectively duplicate data so that if part of a block is suppressed, clients can re-construct that part by using another part of the block. This means that a node trying to hide that part would need to hide a lot more.

> The technique is used in devices like CD-ROMs and multi-disk (RAID) arrays (for instance,
> if a hard drive dies, it can be replaced and re-constructed from the data on other disks).

What is unique about Avail is that the chain design allows **anyone** to check DA without needing to download the data. DA checks require each light client to sample a minimal number of random chunks from each block in the chain. A set of light clients can collectively sample the entire blockchain in this manner. Consequently, the more non-consensus nodes there are, the greater the block size (and throughput) can securely exist. Meaning, non-consensus nodes can contribute to the throughput and security of the network.

### Transaction settlement

Avail will use a settlement layer built with Polygon Edge. The settlement layer provides an EVM-compatible blockchain for rollups to store their data and perform dispute resolution. The settlement layer utilizes Avail for its DA. When rollups are using a settlement layer, they also inherit all the DA properties of Avail.

:::note Different ways to settle

There are different ways to use Avail, and the validiums will not use the settlement layer, but rather settle on Ethereum.

:::

Avail offers data hosting and ordering. The execution layer will likely come from multiple off-chain scaling solutions or legacy execution layers. The settlement layer takes on the verification and dispute resolution component.

## Resources

- [Introduction to Avail](https://blog.availproject.org/introducing-avail-by-a-robust-general-purpose-scalable-data-availability-layer/).
- [Avail Blogs](https://blog.availproject.org/
<!-- - [Polygon Talks: Avail](https://www.youtube.com/watch?v=okqMT1v3xi0) -->
