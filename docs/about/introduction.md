---
id: introduction
title: What is Avail?
sidebar_label: What is Avail
sidebar_position: 1
description: Learn about Avail's data availability chain
keywords:
  - docs
  - avail
  - availability
  - scale
  - rollup
image: https://availproject.github.io/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Avail is a **modular blockchain** that is laser-focused on **data
availability**: ordering, publishing transactions, and making it
possible to verify that block data is available without downloading
the whole block. This modular approach with a strong data availability
layer at the core enables scalability while maintaining security.

Since Avail is data-agnostic, it can support any execution
environment: EVM, WASM, custom new runtimes, etc. The modular approach
also allows a wide array of possible designs to be built on top, such
as sovereign ZK or OP appchains, general purpose rollups, sidechains,
validiums, and more. And they don't require recruiting a new validator
set, only posting transactions on Avail. Independence and flexibility
matched by shared security and scalability. 

Applications in Avail are built as one of the designs mentioned above
(such as a ZK sovereign appchain), or can be deployed as contracts on
a modular execution layer. 


## Application IDs

As a general purpose base layer, Avail is designed to support many
modular chains at the same time, providing consensus and data
availability to all of them simultaneously.

How does this work? Avail headers contain an index that allows a given
modular chain (or "application" in Avail terminology) to determine and
download _only_ the sections of a block that have data for that
particular application.

This has very important benefits, including:
* Modular applications are largely unaffected by other uses of the
  base layer at the same time.
* Block sizes can increase without requiring applications to fetch
  more data, because they don't fetch the whole block, only what's
  relevant to them.

Data availability sampling is still done on the entire block,
however--this is the process where clients sample very small parts of
the block at random to verify availability.

If you'd like to learn how your idea could
benefit from Avail, please [join our
Discord](https://discord.gg/S2XQJjHsZt). We'd love to chat.

## Avail-Powered Validiums

Due to the architecture of monolithic blockchains (such as Ethereum in
its current state), operating the blockchain is expensive, resulting
in high transaction fees. Rollups attempt to extract the burden of
execution by running transactions off-chain and then posting the
execution results and the [usually compressed] transaction data.

Validiums are the next step: instead of posting the transaction data,
it is kept available off-chain, where a proof/attestation is only
posted to the base layer. This is by far the most cost-effective
solution because both execution and data availability are kept
off-chain while still allowing for final verification and settlement
on the layer 1 chain.

Avail is a blockchain optimized for data availability. Any rollup that
wishes to become a validium can switch to post transaction data to
Avail instead of the layer 1 and deploy a verification contract that,
in addition to verifying the correct execution, also verifies data
availability.

The Avail team will make this data availability verification simple on
Ethereum by building an attestation bridge to post data availability
attestations directly to Ethereum. This will make the verification
contract's job a simple one, since the DA attestations will already be
on-chain. Please reach out to the Avail team for more information or
to join our early access program.

### What are Validiums?

Validiums are scaling solutions that are using off-chain computation and
validity proofs, but data is not stored on Ethereum chain which significantly
increases transactions throughput.  Validity proof can come in from of zero 
knowledge proofs like _ZK-SNARK_ or _ZK-STARK_ in which one party can prove to 
another party that the given statement is true while the prover avoids disclosure 
of additional information apart from the fact that the statement is indeed true.
Validity of all transactions is enforced using validity proofs while data availability 
is kept off chain. User can withdraw funds by providing a Merkle proof which can prove 
inclusion of the users withdrawal transaction and allow the on-chain contract to process 
withdrawal. Validium interact with Ethereum with a collection of contracts including main 
_attestation_ contract that stores state commitments (Merkle data roots) submitted by the 
block produce and _verification_ contract which verifies the validity proof when making
state transitions.
