---
id: faq
title: FAQ
sidebar_label: FAQ
sidebar_position: 9
description: Frequently asked questions about Avail
keywords:
  - docs
  - avail
  - availability
  - client
  - consensus
  - faq
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: faq
---

# Frequently Asked Questions

:::tip

If you do not find your question on this page, please submit your question on the **[<ins>Avail Discord server</ins>](https://discord.gg/S2XQJjHsZt)**.

:::

## What is a light client?

Light clients allow users to interact with a blockchain network without having to sync the full blockchain while maintaining decentralization and security. Generally, they download the blockchain headers, but not the contents of each block. Avail (DA) light clients additionally verify that block contents are available by performing Data Availability Sampling, a technique where small random sections of a block are downloaded.

## What is a popular use case of a light client?

There are many use-cases which today rely on an intermediary to maintain a full node, such that end users of a blockchain do not communicate directly with the blockchain but instead through the intermediary. Light clients have until now not been a suitable replacement for this architecture because they lacked data
availability guarantees. Avail solves this issue, thus enabling more applications to directly participate on the blockchain network without intermediaries. Although Avail does support full nodes, we expect most applications will not need to run one, or will need to run fewer.

## What is data availability sampling?

Avail light clients, like other light clients, only download the headers of the blockchain. However, they additionally perform data availability sampling: a technique that randomly samples small sections of the block data and verifies they are correct. When combined with erasure coding and KZG polynomial commitments, Avail clients are able to provide strong (nearly 100%) guarantees of availability without relying on fraud proofs, and with only a small constant number of queries.

## How is erasure coding used to increase data availability guarantees?

Erasure coding is a technique that encodes data in a way that spreads out the information over multiple "shards", such that the loss of some number of those shards can be tolerated. That is, the information can be reconstructed from the other shards. Applied to the blockchain, this means that we effectively increase the size of each block, but we prevent a malicious actor from being able to hide any part of a block up to the redundant shard size.

Since a malicious actor needs to hide a large part of the block in order to attempt to hide even a single transaction, it makes it much more likely that random sampling would catch the large gaps in the data. Effectively, erasure coding makes the data availibility sampling technique much more powerful.

## What are KZG commitments?

KZG commitments, introduced by Aniket Kate, Gregory M. Zaverucha, and Ian Goldberg in 2010, provide a 
way to commit to polynomials in a succinct manner. Recently, polynomial commitments came to the forefront, 
being primarily used as commitments in PLONK-like zero knowledge constructions.

In our construction, we use KZG commitments for the following reasons:

- It allows us to commit to values in a succinct manner to be kept inside the block header.
- Short openings are possible which helps a light client verify availability.
- The cryptographic binding property helps us avoid fraud proofs by making it computationally infeasible 
  to produce incorrect commitments.

In the future, we might use other polynomial commitment schemes, if that gives us better bounds or guarantees.

## Since Avail is used by multiple applications, does that mean chains have to download transactions from other chains?

No. Avail headers contain an index that allows a given application to determine and download only the sections of a block that have data for that application. Thus, they are largely unaffected by other chains using Avail at the same time or by block sizes.

The only exception is data availability sampling. In order to verify that data is available (and due to the nature of erasure coding), clients sample small parts of the block at random, including possibly sections that contain data for other applications.
