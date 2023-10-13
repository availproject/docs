---
id: explorations
title: Avail Uncharted
sidebar_label: Data Availability Explorations
slug: /exploration-team
description:  "An overview of the explorations and projects by Avail Uncharted."

---

## Exploring Uncharted Horizons in Modular Blockchains

This page gives an overview of ***Avail Uncharted***. It shows the exploration within the Avail ecosystem. The mission is to encourage exciting initiatives and collaboration.  The aim is to gain deeper insights into the needs of builders within our ecosystem and push beyond the horizons of what is possible.

## Active Projects
| Project              | Description | Repository |               
|:------------------------- | :----- | :-------- | 
| OpEVM   |  OpEVM is a sovereign EVM-compatible optimistic rollup construction designed for efficient and secure transaction processing  |  [OpEVM](https://github.com/availproject/op-evm)  |
| Adapter for Soverign SDK  | A data availability adapter for Sovereign Rollups integrated with sovereign-sdk   | [sovereign-da-adapter](https://github.com/availproject/sovereign-sdk/tree/main) |
| Madara DA Interface | A unified DA interface for Madara Starknet Sequencer to publish data onto a preferred DA Layer such as Avail for a reliable and secure DA    | [madara-da-interface](https://github.com/keep-starknet-strange/madara/pull/1021) | 
| Validium Node and Validium Contracts |A production-ready validium based on the Polygon zkEVM stack with Avail as the data availability layer for scalable and secure DA | [validium-node](https://github.com/QEDK/validium-node) <br/>&<br/> [validium-contracts](https://github.com/QEDK/validium-contracts) | 
| Avail Stack Adapter    | Avail DA's integration with Optimism's rollup SDK op-stack | [avail-op-stack-adapter ](https://github.com/availproject/avail-op-stack-adapter) | 
| Rollkit DA Adapter  | A Data availability adapter for Rollkit's modular rollup framework | [rollkit-da-adapter ](https://github.com/rollkit/rollkit/pull/1168) | 

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