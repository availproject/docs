---
id: dymension
title: How to Deploy Dymension RollApps with Avail
sidebar_label: Avail-Powered RollApps
description: 'Discover how to utilize the Avail Goldberg testnet as a DA layer to build RollApps with the Dymension Froopyland testnet.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
  - dymension
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import Tabs from '@theme/Tabs';

## Introduction

We're thrilled to kick off the "Dymension RollApps" challenge as part of the innovative Clash of Nodes incentivized testnet. This collaboration between Dymension and Avail opens a new avenue for developers to deploy rollups with Avail as the data availability layer.

### Key Steps to Participate

1. **Deploy on Avail's Goldberg Testnet**: Opt to post your rollup data to the Avail Goldberg Testnet, part of the Clash of Nodes.
2. **Fund Your Account**: Use the Avail Goldberg faucet to acquire tokens for the Goldberg Incentivized Testnet.
3. **Update Your Rollup Listing**: Ensure your rollup is listed correctly on the Dymension dashboard with a PR update.
4. **Earn Points**: Your rollup accrues points on the Clash of Nodes leaderboard based on usage.

### Your Mission

Leverage Avail's modular solutions in the Dymension ecosystem. Your efforts not only boost your leaderboard rank but also advance blockchain technology.

Consult the [<ins>Dymension documentation</ins>](https://docs.dymension.xyz/) for in-depth information on Dymension and RollApps. For data migration to the Avail Goldberg testnet, see the [<ins>migration guide</ins>](/clash-of-nodes/dymension/migrate/).

- [Introduction](#introduction)
  - [Key Steps to Participate](#key-steps-to-participate)
  - [Your Mission](#your-mission)
- [Prerequisites](#prerequisites)
  - [Hardware Requirements](#hardware-requirements)
- [Configuration Files Creation](#configuration-files-creation)
  - [Process Overview](#process-overview)
  - [Flags Breakdown](#flags-breakdown)
  - [Address Funding for RollApp](#address-funding-for-rollapp)
- [Fund Your Avail Account](#fund-your-avail-account)
- [Register Your RollApp](#register-your-rollapp)

## Prerequisites

Ensure you have installed the following software.

> Installation commands are based on Ubuntu 20.04 LTS:

Install **Roller CLI** for deploying and managing RollApps:

```bash
# Install Roller
curl -L https://dymensionxyz.github.io/roller/install.sh | bash
```

### Hardware Requirements

Roller, as the engine for the Dymension RDK, has specific hardware requirements to efficiently deploy a RollApp connected to the entire inter-chain. The following are the recommended hardware specifications:

| Component         | Recommended Specifications |
| ----------------- | -------------------------- |
| Processor         | Dual Core (minimum)        |
| SSD Disk Storage  | At least 100GB             |
| Memory (RAM)      | At least 16GB              |
| Network Bandwidth | At least 100mbps           |

## Configuration Files Creation

Initializing your RollApp will create a `.roller` folder in your root directory. This folder contains essential files, including the Genesis file, which are crucial for starting your RollApp. Choose the method that best fits your expertise and requirements. The guided setup is recommended for ease of use, while the manual method offers more customization for experienced developers.

Upon initialization, you will receive the following addresses:

- **Sequencer `<network>`**: This address is used to publish state updates to the Dymension Hub.
- **Relayer `<network>`**: This address handles the relaying of IBC packets.
- **DA `<network>`**: This address is used to publish data on-chain to the DA network (in this case, Avail).

<Tabs>
  <TabItem value="guided" label="Guided Setup" default>

Start the interactive setup with the following command:

```bash
roller config init --interactive
```

### Process Overview

- **Network Selection**: Defaults to Froopyland.
- **Execution Environment**: Choose between EVM options.
- **RollApp ID and Denom**: Enter your RollApp's ID and token denomination.
- **Genesis Token Supply**: Set the initial token supply.
- **Data Layer Selection**: Select Avail as the DA layer.

This method is user-friendly, guiding you through each step with prompts and explanations, ideal for those who prefer a guided setup process.

  </TabItem>
  <TabItem value="manual" label="Manual Setup">

For a customized setup, use the CLI flags. For example:

```bash
roller config init myrollapp DYM --token-supply 1000000000 --hub froopyland --da avail
```

### Flags Breakdown

- **rollapp-id**: Manually enter the RollApp ID.
- **denom**: Specify the token denomination.
- **token-supply (optional)**: Customize the initial token supply.
- **hub (optional)**: Choose the network hub.
- **da (optional)**: Select Avail as the DA layer.
- **rollapp-binary (optional)**: Specify a custom RollApp binary path.
- **vm-type (optional)**: Define the RollApp type.

This approach offers more control and is suited for advanced users who are comfortable with command-line interfaces and require specific customizations.

  </TabItem>
</Tabs>

### Address Funding for RollApp

Once you have initialized your RollApp, the system will provide you with several key addresses that require funding. These addresses are essential for various operations within your RollApp.

To fund these addresses, follow these steps in Dymension's Discord:

1. **Access the Froopyland-Faucet Channel**: Navigate to the `froopyland-faucet` channel in Dymension's Discord.
2. **Fund the Addresses**: Use the following command format to request funds for each address:

   ```bash
   $request <dym-address>
   ```

   Replace `<dym-address>` with the actual addresses provided during initialization.

3. **Example Commands**:

   ```bash
   $request SequencerAddressHere
   $request RelayerAddressHere
   $request DAAddressHere
   ```

4. **Checking Balance**:

   After funding the addresses, you can check the balance of each address to ensure the transaction was successful:

   ```bash
   $balance <dym-address>
   ```

   Replace `<dym-address>` with the respective address you wish to check.

## Fund Your Avail Account

To obtain testnet tokens for Avail, visit the [<ins>Avail Faucet Guide</ins>](/docs/about/faucet.md) and follow the provided instructions.

## Register Your RollApp

To register your RollApp, follow the instructions in the README file of the [<ins>RollApp Registry repository</ins>](https://github.com/dymensionxyz/rollapp-registry) on GitHub. This process involves raising a pull request with the necessary details and configurations.

<p align="center"><img src="/img/dymension/rollapps-register.png" alt="Register RollApp" width="80%"/></p>

Look out for the gold Avail logo next to your RollApp on the [<ins>Dymension Portal</ins>](https://portal.dymension.xyz/rollapps), signaling your integration with the Goldberg testnet.

<p align="center"><img src="/img/dymension/dy-portal-avail.png" alt="Avail RollApp Icon on Portal" width="90%"/></p>
