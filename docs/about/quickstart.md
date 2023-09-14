---
id: quickstart
title: Get Started with the Kate Testnet
sidebar_label: Quickstart
sidebar_position: 2
description: Learn how to run an Avail Light Client
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The Kate Testnet is the official test network of the Avail Project.

## Phase One: Laying the Groundwork

The inaugural phase of Avail's testnet served as a sandbox for fundamental 
operations, including the execution of on-chain functions and the initiation 
of protocol governance. This phase was instrumental in setting the stage for 
more advanced testing scenarios.

## Phase Two (Current): Expanding the Testing Ecosystem

The second phase aims to provide a robust testing environment designed to foster 
increased participation from validators. Validators are crucial network participants 
who leverage their computing resources to validate transactions and fortify network 
security, often in exchange for token-based rewards.

### User Participation on the Testnet

The Kate testnet offers a multitude of avenues for user engagement:

- **Token Acquisition**: Users can obtain AVL testnet tokens to explore staking and 
  nomination functionalities.
- **Blockchain Development**: Users have the freedom to develop modular blockchain applications 
  or chains that integrate with Avail's data layer.
- **Network Roles**: Users can opt to join the testnet as either validators or light clients, 
  facilitating data verification processes.

---

## Try it Out

| Action              | Guide Link                                      | Tokens Needed | Staking | Technical Skill Required | Version        | Client Binary | Config File |
|---------------------|-------------------------------------------------|---------------|---------|--------------------------|----------------|---------------|-------------|
| Run a Light Client  | [<ins>Guide</ins>](/docs/node/light-client.md)  | No            | No      | Moderate                 | 1.6.0-rc1      | [<ins>v1.6.0-rc1</ins>](https://github.com/availproject/avail-light/releases/tag/v1.6.0-rc1) | [<ins>Config</ins>](/configs/kate/avail-light-1.4.3/config.yaml) |
| Become a Validator  | [<ins>Guide</ins>](/docs/category/become-a-validator/) | Yes           | Yes     | Advanced                 | 1.6.3          | [<ins>v1.6.3</ins>](https://github.com/availproject/avail/releases/tag/v1.6.3) | N/A |

### Kate Testnet Details

- **Explorer**: Navigate the blockchain with ease using our [<ins>Explorer</ins>](https://kate.avail.tools).
- **Endpoints**: 
  - **RPC**: Connect directly via our [<ins>RPC Endpoint</ins>](https://kate.avail.tools/v1).
  - **WebSocket**: For real-time updates, use our [<ins>WebSocket Endpoint</ins>](wss://kate.avail.tools/ws).
- **Chain Specifications**: Interested in the nitty-gritty? Check out the [<ins>chainspec.raw.json</ins>](https://kate.avail.tools/#/explorer/chainspec).
- **Chain Info**: For a textual overview, refer to `chaininfo.txt`.
---
