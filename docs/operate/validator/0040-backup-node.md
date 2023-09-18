---
id: backup
title: How to Backup Your Avail Validator
sidebar_label: Backup Your Validator
description: "A comprehensive guide on backup tasks essential for maintaining an Avail Validator."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
---

## Understanding Validator Directories

Before diving into backup procedures, it's crucial to understand the directory structure of your Avail node.

### Directory Structure

The Avail node's directory structure is as follows:

```
└── chains
    └── da_testnet
        └── db
        └── keystore
        └── network
```

### Directory Descriptions

- **db**: This directory contains the database files, which store blockchain state, transaction history, and other data.
- **keystore**: This is where the encrypted key files for your Validator are stored.
- **network**: This directory contains configuration files related to network connectivity and peer management.

You can specify a custom directory using the `--base-path` parameter.

## Step 1: Re-Sync or Restore Snapshot

### To Re-Sync from Genesis

Run the following command:

```bash
avail purge-chain
```

### To Restore a Database Snapshot

1. Stop your node.
2. Delete existing chain data.
3. Download a snapshot from another node.
4. Restore the snapshot to the `db` folder.

:::info Warp Sync
Warp sync will be available in future releases, allowing quicker node setup.
:::

## Step 2: Backup Keystore

### To Move Keystore to a Backup Node

1. Ensure the primary node is offline.
2. Transfer the keystore to a backup node that is in sync.

:::warning Equivocation Risk
Never run two nodes with identical keys at the same time to avoid double-signing.
:::

This method is not recommended for routine transitions between nodes. For safer alternatives, consult the [Upgrading Guide](/docs/operate/validator/0060-validator-upgrade.md).
