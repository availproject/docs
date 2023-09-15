---
id: node-types
title: What are the Types of Nodes in the Avail Network?
sidebar_label: Types of Nodes
sidebar_position: 1
description: Understand the various types of nodes in the Avail network and their unique functionalities.
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: node-types
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Introduction

While Avail diverges from conventional blockchain frameworks to concentrate on modular solutions tailored for data availability, it continues to utilize a diverse array of node types. These nodes differ in their functions, storage needs, and levels of engagement within the network.

## Node Types Comparison

| Node Type       | Storage Requirement | Network Role | Special Features | Use Case |
|-----------------|---------------------|--------------|------------------|----------|
| Light Clients   | Low                 | Interaction  | Minimal Storage  | Quick Queries, Low-resource Environments |
| Full Nodes      | Moderate            | Core         | Network Access      | Transaction Verification, Data Retrieval |
| Validator Nodes | Moderate            | Core         | Block Production | Network Security, Governance |
| Archive Nodes   | High                | Auxiliary    | Historical Data  | Auditing, Compliance, Reference |
| Pruned Nodes    | Variable            | Core         | Disk Space Efficiency | Limited Storage Environments |
| RPC Nodes       | Moderate            | Gateway      | API Exposure     | Development, Remote Access |
| Bootstrap Nodes | Low                 | Initial      | Network Entry    | Network Initialization |
| Relay Nodes     | Moderate            | Mediator     | Connectivity     | NAT Traversal; Firewall Bypass |

## Overview of Node Types

### Light Clients

Light clients allow users to interact with the blockchain without downloading the entire transaction history. They rely on a trusted set of nodes for the data needed to engage with the network.

### Full Nodes

Full nodes maintain the blockchain's current state but do not store its entire history. Optimized for quick access to current data, they are ideal for tasks like transaction verification.

### Validator Nodes

Validator nodes are specialized full nodes that participate in block production and network governance. They are staked to ensure network security and integrity.

### Archive Nodes

Archive nodes store the complete transaction history, making them valuable for auditing and historical data analysis. However, they require significant storage and computational resources.

### Pruned Nodes

Pruned nodes discard certain historical data to reduce storage requirements while still participating in network consensus. They maintain only the most recent state.

### RPC Nodes

RPC nodes expose an API for remote interactions, serving as a gateway for developers and external clients to engage with the Avail network.

### Bootstrap Nodes

Bootstrap nodes serve as initial connection points for new nodes joining the network. They are essential for network stability and discovery as they help new nodes join the network, discover peers, and maintain connectivity.

### Relay Nodes

Relay nodes act as intermediaries to enable communication between peers that cannot establish a direct connection, often due to firewalls or NAT issues.

## Next Steps

Now that you have a comprehensive understanding of the various node types within the Avail network, it's recommended to take your first step by setting up a Light Client. Before you begin, make sure to review the [<ins>System Requirements</ins>](/docs/validators/requirements.md) and [<ins>Before You Start</ins>](/docs/validators/before-starting.md) guides. Once you're ready, you can proceed to the [<ins>Light Client Deployment guide</ins>](/docs/node/light-client.md) to get started.

> Light Clients provide an accessible entry point to the Avail network, enabling quick interactions without storing the full blockchain. Ideal for newcomers, they play an integral role in maintaining a robust data availability layer.
