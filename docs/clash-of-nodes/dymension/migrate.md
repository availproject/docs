---
id: migrate
title: How to Use Migrate Your RollApp to Use Avail
sidebar_label: Migrate Your RollApp
description: 'Discover how to migrate your existing RollApp to Avail's Goldberg testnet.'
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

For developers who previously ran RollApps and are looking to migrate to the Avail Goldberg network, the following guide outlines how to do so.

## 1. Stop All Roller Services

Before initiating the migration, ensure that all Roller services associated with your RollApp are halted. This is crucial to prevent any conflicts or data corruption during the transition.

## 2. Update Avail Network Endpoint

The next step involves updating the Avail endpoint to point to the Goldberg network.
Run the following command, replacing `ROLLER_HOME_DIR` with your Roller home directory:

```bash
sed -i 's|wss://dymension-devnet.avail.tools/ws|wss://goldberg.avail.tools/ws|g' <ROLLER_HOME_DIR>/rollapp/config/dymint.toml
```

This command modifies the Avail network endpoint in your RollApp configuration file.

## 3. Retrieve Your Avail Address

To proceed with the migration, you need your Avail address. Obtain this by running the following command:

```bash
roller keys list
```

This command will list the keys associated with your RollApp, including the Avail address.

## 4. Fund Your Avail Address

With your Avail address in hand, head to the Avail faucet to secure the necessary funding for your RollApp on the Goldberg network.
Follow the [<ins>faucet's instructions</ins>](/docs/about/faucet.md) to deposit testnet tokens into your Avail address.

## 5. Restart All Services

Once the Avail address is funded and the network endpoint updated, you can restart all Roller services.
This restart will initiate your RollApp on the Avail Goldberg network, completing the migration process.

#### Post-Migration Verification

After completing these steps, it's crucial to verify that your RollApp is functioning correctly on the Avail Goldberg network. Monitor your RollApp's performance and transactions to ensure that everything is operating as expected.
