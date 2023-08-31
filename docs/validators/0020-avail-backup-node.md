---
id: avail-backup-node
title: How to Backup Your Avail Validator
sidebar_label: Backup Your Validator
sidebar_position: 2
description: "Learn about backup tasks for Avail validator."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-backup-node
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Validator Directories

It is important to understand the folder structure of the Avail node. Knowing where the database and keys are stored can help manage your node more affectively.

The folder structure for Avail node:
```
└── chains
    └── da_testnet
        └── db
            └── full
        └── keystore
        └── network
```
The `--base-path` parameter allows you to specify a custom base directory for storing Avail's data and configuration files. When you specify a directory using `--base-path`,
 Avail will create the necessary folders (db, keystore, network) within that custom location. 

Details of the folder content:
* db: This folder contains the database files used by Avail to store blockchain state, block data, transaction history, and other related data. The database files are typically
stored in a format optimized for efficient data retrieval and storage. The default database is RocksDB.

* keystore: The keystore folder is where the encrypted key files of the Validator are stored. When you execute `author_rotateKeys` several key files are created. The output from
`author_rotateKeys` provides a hex-encoded value, this value is a concatanation of the file names in the keystore folder.

* network: The network folder holds configuration files related to network connectivity and peer management. It includes information about known nodes, peer addresses, and other network-related settings. 


## Re-Sync or Restore Snapshot

To delete your DB and re-sync from genesis:
```
avail purge-chain
```

Should we wish to restore a DB you will need to
* Stop your node
* Delete the chain data
* Download a snapshot from another node 
* Restore the snapshot on the DB folder

:::info warp sync

Note that the dependancy on snapshots will be less in the future as warp sync will allow a node to be up and running in a few minutes. Current Avail Testnet does not support 
warp sync yet. Will be made available in future release.

:::


## Backup Keystore
If the contents of the keystore from a primary node is moved to backup node that is in sync, will allow the node to carry on particpating in the concensus. However the primary node 
should not be running anymore.

:::warning Never run two nodes with the same keys

Never run two nodes with the same keys. The node will double sign(equivocation) if you have two nodes running at the same time with the same keys.

:::

Moving keystore between servers is not the recommended approach to switch between nodes. This method should only be used in extreme occassions. Review how you can transition between nodes safely in
the [upgrading section](0030-avail-upgrade-validator-node.md)
