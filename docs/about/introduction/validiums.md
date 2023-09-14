---
id: validiums
title: Avail-Powered Validiums
sidebar_label: Validiums
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
