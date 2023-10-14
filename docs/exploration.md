---
id: explorations
title: Avail Uncharted
sidebar_label: Data Availability Explorations
description: "Exploring Uncharted Horizons in Modular Blockchains."
---

## Overview

Avail Uncharted is a core initiative within the Avail ecosystem dedicated to exploring uncharted territories in modular blockchain technology. 
Driven by the core Avail team, the mission is twofold: to nurture innovative projects and to cultivate a close-knit collaboration with the community.

## Active Projects

| Project                                | Description                                                                                                         | Repository                                                                                                   |
|:---------------------------------------|:--------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------|
| Optimistic EVM Rollup                   | A sovereign EVM-compatible optimistic rollup construction aimed at efficient and secure transaction processing.     | [<ins>op-evm</ins>](https://github.com/availproject/op-evm)                                                             |
| Adapter for Sovereign SDK              | A data availability adapter for Sovereign Rollups, integrated with the Sovereign SDK.                                | [<ins>sovereign-da-adapter</ins>](https://github.com/availproject/sovereign-sdk/tree/main)                              |
| Madara Starknet DA Interface           | A unified DA interface allowing Madara Starknet Sequencer to publish data onto a preferred DA Layer like Avail for reliable and secure data availability. | [<ins>madara-da-interface</ins>](https://github.com/keep-starknet-strange/madara/pull/1021)                              |
| DA layer for zkEVM-based Validium      | A production-ready Validium based on the Polygon zkEVM stack, with Avail as the data availability layer, aimed at scalable and secure data availability. | - [<ins>validium-node</ins>](https://github.com/QEDK/validium-node) <br/> - [<ins>validium-contracts</ins>](https://github.com/QEDK/validium-contracts) |
| Avail and Optimism Stack Adapter       | An adapter facilitating Avail DA's integration with Optimism's rollup SDK op-stack.                                  | [<ins>avail-op-stack-adapter</ins>](https://github.com/availproject/avail-op-stack-adapter)                              |
| Rollkit Data Availability Adapter      | A data availability adapter designed for Rollkit's modular rollup framework.                                        | [<ins>rollkit-da-adapter</ins>](https://github.com/rollkit/rollkit/pull/1168)                                            |

## OpEVM
OpEVM is an EVM-compatible sovereign optimistic rollup SDK with working fraud proofs and has support for a decentralized sequencer set. OpEVM is designed for efficient and secure transaction processing. It provides a decentralized infrastructure for running a layer-2 (L2) blockchain. OpEVM enables high-throughput, low-latency transaction processing.

## Adapter for Soverign SDK
Sovereign SDK is a free open source tool for building rollup. Adapters contain the logic integrating 3rd party codebases into the Sovereign SDK. Data availability layer(DA) determines the set of data that are fed into the business logic of rollup. Sovereign SDK have adaptaers for all most all DA layer.

## Madara DA Interface
The Madara DA Interface built by the explorations team makes it simple for developers using the Madara Sequencer to utilize Avail’s DA layer. This is particularly useful for developers building chains that leverage Starkware’s ZK technology and developers can still settle on Ethereum via Avail’s Data Attestation Bridge.

## Validium Node and Validium Contracts
Smart contract implementation which will be used by the polygon-hermez zkevm and doesn’t rely on fraud proofs like optimistic chains and can provide correctness guarantees as soon as the proof is verified. This zk-proof and verification model provides users with a better UX in most cases

## Avail Stack Adapter
The Avail OP-Stack Adapter allows anyone to quickly integrate Avail into the OP-Stack and leverage Avail’s highly optimized and cost effective DA layer. This provides rollups with massive cost savings while still allowing settlement on Ethereum via Avail’s Data Attestation Bridge.

## Rollkit DA Adapter
Rollkit allows developers to deploy any Cosmos chain as a sovereign chain on top of a DA layer like Avail. Rollkit is particularly well suited for developers who have experience with the Cosmos SDK and want to use Avail as the DA layer.
