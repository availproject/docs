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
- [0. Prerequisites](#0-prerequisites)
  - [Hardware Requirements](#hardware-requirements)
- [1. Create Configuration Files](#1-create-configuration-files)
  - [Process Overview](#process-overview)
  - [Flags Breakdown](#flags-breakdown)
- [2. Fund Your RollApp Addresses](#2-fund-your-rollapp-addresses)
- [3. Fund Your Avail Account](#3-fund-your-avail-account)
- [4. Register Your RollApp](#4-register-your-rollapp)
- [5. Run Your RollApp](#5-run-your-rollapp)
- [6. Add Your RollApp to the Dymension Portal](#6-add-your-rollapp-to-the-dymension-portal)

## 0. Prerequisites

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

## 1. Create Configuration Files

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

## 2. Fund Your RollApp Addresses

Once you have initialized your RollApp, the system will provide you with several key addresses that require funding. These addresses are essential for various operations within your RollApp.

To fund these addresses, follow these steps in Dymension's Discord:

1. **Access the froopyland-faucet and avail-faucet channels**: Navigate to the **`#froopyland-faucet`** channel in Dymension's Discord to fund your Dymension RollApp addresses, and to the **`#avail-faucet`** channel to fund your Avail address.

   :::note
   Use only the **#froopyland-faucet** channel for Goldberg tokens. Avoid the **#dymension-faucet channel**, as it provides tokens for the old Dymension devnet.
   :::

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

## 3. Fund Your Avail Account

You'll also need to fund your Avail account using the Avail faucet available on the **[<ins>official Avail Discord</ins>](https://discord.com/invite/availproject)**.

For detailed guidance, visit the **[<ins>Avail Faucet Guide</ins>](/docs/about/faucet.md)** and follow the provided instructions.

> The faucet requires meeting a mandatory threshold using the Gitcoin passport. If necessary, you can link your Avail account on your machine with the wallet you are using for this process. Exercise caution when exporting your account's key for any reason. Always ensure the highest level of security and privacy when handling your key.

## 4. Register Your RollApp

After initializing and funding your RollApp accounts, the next step is to register your RollApp.

To register, execute the following command using the previously generated addresses:

```bash
roller tx register
```

> This registration process introduces a dedicated namespace in the Dymension Hub for your RollApp, replacing the need for complex multi-sig smart contract management. Registration streamlines the integration with the Dymension ecosystem, enabling developers to use a simple command for setup. Once registered, the RollApp is recognized by the Dymension Hub, allowing Sequencers to publish state updates on-chain and enhancing the interoperability across different ecosystems.

## 5. Run Your RollApp

With the RollApp now registered on the Dymension Hub, we're ready to start running the RollApp, leveraging Avail for data availability.

Run the RollApp using the following command:

```bash
roller run
```

> Starting the RollApp can take up to an hour, initially showing 'starting...' as the status. Once it switches to 'active', this indicates successful integration with source IBC channels, essential for functions like token transfers to other ecosystems. The `roller run` command connects the RollApp with the Dymension Hub via IBC. During this process, a status table will display, giving you key details about the RollApp's operation and its IBC relayer connections. This output provides valuable insights into the RollApp's status and its network connectivity.

## 6. Add Your RollApp to the Dymension Portal

To register your RollApp on the Dymension Portal, follow the instructions in the README file of the **[<ins>RollApp Registry repository</ins>](https://github.com/dymensionxyz/rollapp-registry)** on GitHub. This process involves raising a pull request with the necessary details and configurations.

<p align="center"><img src="/img/dymension/rollapps-register.png" alt="Register RollApp" width="80%"/></p>

Look out for the gold Avail logo next to your RollApp on the [<ins>Dymension Portal</ins>](https://portal.dymension.xyz/rollapps), signaling your integration with the Goldberg testnet.

<p align="center"><img src="/img/dymension/dy-portal-avail.png" alt="Avail RollApp Icon on Portal" width="90%"/></p>
