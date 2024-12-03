<p align="center">
<img align="center" src="/public/img/avail-logo.png" width="250">
</p>

<div align="Center">
<h1>Avail Project Developer Documentation</h1>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<h3>The Essential Platform for Modern Blockchains</h3>

</div>

> ℹ️ We are in the process of putting out a comprehensive README following a docs migration. For contribution guidelines, check out the [Contributing Guide](./CONTRIBUTING.md)

<p align="left">
  Welcome to the Avail Project Developer Documentation, your go-to resource for all things related to data availability and modular blockchain development. Designed with a focus on community collaboration, this repository aims to provide the most accurate, comprehensive, and up-to-date information for anyone interested in learning about, contributing to, or maintaining projects within the Avail ecosystem.
</p>

<!-- TOC -->

- [Key Repositories](#key-repositories)
- [Configuration Guide](#configuration-guide)
  - [Static-Site Generator](#static-site-generator)
- [Contributing](#contributing)
- [License](#license)

<!--/ TOC -->

Avail provides a secure, trust-minimized base layer designed for high data availability, forming the cornerstone of next-generation, scalable applications. Its core features include:

- **Data Blob Indexing**: Streamlines data indexing by associating transaction data with specific application IDs.
- **Erasure Encoding**: Enhances data resilience, making it more challenging for nodes to withhold information.
- **KZG Polynomial Commitments**: Guarantees data presence in the block header.
- **Decentralized Network of Validators**: Targets a network of up to 1,000 external validators to minimize centralization risks.
- **Validity Proofs**: Enables light clients to instantly confirm state correctness and data availability upon finalization.

Leveraging Data Availability Sampling, Avail's light client network ensures robust data availability. With an increasing number of light clients, Avail supports larger blocks, thereby unlocking substantial scaling capabilities for blockchain technologies.

Start learning about Avail [<ins>here</ins>](https://docs.availproject.org/about/introduction/).

## Key Repositories

Below is a curated list of GitHub repositories part of the Avail Project.

<details>
<summary>Get Started</summary>

| Repository Name & Link                                                                                                                                      | Description                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Reference Document](https://github.com/availproject/data-availability/blob/93c547ce4efce3e992b573179a8d22b3657fdcee/reference%20document/Avail%20Reference%20Paper%20v2.1%206%20Nov%202024.pdf) | Comprehensive document outlining the rationale, design decisions, and theoretical foundations. |
| [Avail Node](https://github.com/availproject/avail)                                                                                                         | Repository for the Avail node implementation, built using Substrate.                           |
| [Light Client](https://github.com/availproject/avail-light)                                                                                                 | Light client designed for verifying data availability proofs on Avail.                         |
| [Explorer](https://github.com/availproject/avail-apps)                                                                                                      | Implementation repository for the Avail explorer, built using PolkadotJS Apps.                 |
| [Tests](https://github.com/availproject/avail-test)                                                                                                         | Repository for end-to-end tests designed to validate Avail's functionalities.                  |

</details>

<details>
<summary>All Repos</summary>

| Category            | Repository Name                                                                                  | Description                                              |
| ------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| **Core Components** | [Avail](https://github.com/availproject/avail)                                                   | Main DA Node for the Avail project.                      |
|                     | [Avail Core](https://github.com/availproject/avail-core)                                         | Core components for Avail's DA layer.                    |
| **Light Client**    | [Avail Light](https://github.com/availproject/avail-light)                                       | Light client for Avail.                                  |
| Relay for Avail Light client.                            |
|                     | [Light Client Web](https://github.com/availproject/light-client-web)                             | Web version of Avail's light client.                     |
|                     | [Avail Light Client Flutter App](https://github.com/availproject/avail-light-client-flutter-app) | Flutter app for Avail's light client.                    |
|                     | [Avail LC Android Lib](https://github.com/availproject/avail-lc-android-lib)                     | Android library for Avail Light Client.                  |
| **Applications**    | [Avail Apps](https://github.com/availproject/avail-apps)                                         | Repository for applications built on Avail.              |
|                     | [Avail JS](https://github.com/availproject/avail-js)                                             | JavaScript library for Avail; Fork of PolkadotJS         |
|                     | [Avail Staking Dashboard](https://github.com/availproject/avail-staking-dashboard)               | Dashboard for staking on Avail.                          |
|                     | [MetaMask Snap Avail](https://github.com/availproject/metamask-snap-avail)                       | MetaMask Snap plugin for Avail.                          |
| **Substrate**       | [Go Substrate RPC Client](https://github.com/availproject/go-substrate-rpc-client)               | RPC client for Substrate integration.                    |
|                     | [Substrate](https://github.com/availproject/substrate)                                           | Fork of Substrate for Avail.                             |
| **Explorations**    | [Avail Uncharted](https://github.com/availproject/avail-explorations)                            | Experimental features and research.                      |
|                     | [Validium Node](https://github.com/availproject/validium-node)                                   | Polygon zkEVM Node implementation for Validium on Avail. |
|                     | [Validium Contracts](https://github.com/availproject/validium-contracts)                         | Polygon zkEVM Contracts for Validium on Avail.           |
|                     | [Validium Bridge Service](https://github.com/availproject/validium-bridge-service)               | Bridge service for Polygon zkEVM Validium on Avail.      |
|                     | [Op EVM](https://github.com/availproject/op-evm)                                                 | OpEVM implementation on Avail.                           |
|                     | [Op EVM Contracts](https://github.com/availproject/op-evm-contracts)                             | OpEVM contracts on Avail.                                |
|                     | [Avail OP Stack Adapter](https://github.com/availproject/avail-op-stack-adapter)                 | DA Adapter for OP Stack.                                 |
|                     | [Avail Sovereign DA Adapter](https://github.com/availproject/avail-sovereign-da-adapter)         | DA adapter for Sovereign SDK.                            |
|                     | [Sovereign SDK](https://github.com/availproject/sovereign-sdk)                                   | SDK for Sovereign Rollups on Avail.                      |
|                     | [Nomad Config](https://github.com/availproject/nomad-config)                                     | Configuration for Nomad in the Avail ecosystem.          |
|                     | [Nomad Agents](https://github.com/availproject/nomad-agents)                                     | Agents for Nomad in the Avail ecosystem.                 |
|                     | [ZkNFT](https://github.com/availproject/zknft)                                                   | Zero-Knowledge NFTs on Avail.                            |
| **Tooling**         | [CLI](https://github.com/availproject/cli)                                                       | CLI tool for Avail.                                      |
|                     | [AvailUp](https://github.com/availproject/availup)                                               | Standalone script for easy Avail network setup via CLI.  |
|                     | [Avail Indexer](https://github.com/availproject/avail-indexer)                                   | Indexer for the Avail network.                           |
| **Documents**       | [RFCs](https://github.com/availproject/RFCs)                                                     | Repository for Avail Request for Comments and proposals. |
|                     | [Incident Reports](https://github.com/availproject/incident-reports)                             | Repository for incident reports in the Avail ecosystem.  |

</details>

## Contributing

Please check out the [Contributing Guide](./CONTRIBUTING.md) for a detailed primer on how to contribute to the Avail documentation.
