---
id: overview
title: Building a RollApp with Dymension
sidebar_label: Overview
description: 'Discover how to utilize Avail as a data availability layer.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

## Introduction

Dymension introduces RollApps, standardizing rollups through the Inter-Blockchain Communication Protocol (IBC) for enhanced scalability and speed in decentralized applications. Integrating Avail as the DA layer, Dymension provides a robust 'Rollup as a Service' model, ensuring reliable and efficient data availability in the blockchain ecosystem.

## Transaction Lifecycle

1. **Transaction Initiation**

   - **Process**: Users conduct transactions on specific RollApps.
   - **Role**: Each RollApp, serving as a distinct blockchain for a particular application, manages the initial processing of transactions.

2. **Batch Assembly and Checkpoint Creation**

   - **Component**: The Sequencer within the Dymension protocol.
   - **Role**: Transactions are compiled into batches. These batches, along with state roots, form checkpoints.

3. **Data Availability with Avail**

   - **Component**: Avail as the chosen Data Availability (DA) provider.
   - **Role**: Ensures that data related to checkpoints is available and incorruptible, maintaining integrity across the network.

4. **Validation at Dymension Hub**

   - **Component**: The Dymension Hub, acting as the settlement layer.
   - **Role**: Validates the transactions and secures them, ensuring the network's overall integrity and security.

5. **Finalization and State Transition**
   - **Action**: The confirmed transactions are finalized, and state transitions are consistently updated across RollApp nodes.

## Key Features

- **Modular Architecture**: RollApps in Dymension provide a scalable and flexible environment for specific blockchain applications.
- **Enhanced Scalability**: Efficient partitioning and data off-loading capabilities contribute to high scalability.
- **Robust Security**: Segregated duties between RollApps and the Dymension Hub, combined with Avail integration, ensure a secure ecosystem.
- **Efficient Data Availability**: Avail's integration offers a robust solution for ensuring data availability and integrity.
- **Developer Flexibility**: The common interface for RollApps facilitates easy development and deployment of decentralized applications (dApps).
- **Interoperability**: Dymension's design allows for efficient communication and asset transfer within the broader blockchain ecosystem.
