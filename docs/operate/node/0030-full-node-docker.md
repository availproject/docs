---
id: docker
title: How to Run a Full Node with Docker
sidebar_label: Using Docker
description: 'This step-by-step guide will walk you through the process of setting up and running an Avail full node using Docker.'
keywords:
  - docs
  - avail
  - node
  - full node
  - data availability
  - da
  - docker
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide provides step-by-step instructions for setting up and running a full node on the Avail network using Docker. Whether you're new to node operation or have prior experience, this guide is designed to make the setup process straightforward.

:::note Before you start

**Ensure that you meet the [<ins>system requirements</ins>](/docs/operate/requirements.md).** We recommend downloading the pre-compiled binary for speed and convenience.

:::

## Step 1: Launch Your Avail Node

To launch your Avail node, navigate to the `/mnt/avail` directory and execute the following Docker command:

```bash
cd /mnt/avail
sudo docker run -v $(pwd)/state:/da/state:rw -v $(pwd)/keystore:/da/keystore:rw -e DA_CHAIN=kate -e DA_NAME=kate-docker-avail-Node -p 0.0.0.0:30333:30333 -p 9615:9615 -p 9933:9933 -d --restart unless-stopped availj/avail:v1.7.1
```

> The Docker command performs several important steps:

> - Maps the state and keystore directories, providing read-write permissions for data persistence.
> - Opens various ports for different functionalities, including P2P connections, metrics, and HTTP RPC.
> - Utilizes the Avail image from Docker Hub and sets it to restart unless manually stopped.
> - Using `DA_CHAIN` to specify the kate chainspec.

<details>
<summary>Sample output</summary>

You should see an output similar to the following:

```shell
2023-08-21 08:29:55 Avail Node
2023-08-21 08:29:55 ✌️  version 1.6.2-bb4cc104b25
2023-08-21 08:29:55 ❤️  by Anonymous, 2017-2023
2023-08-21 08:29:55 📋 Chain specification: Avail Kate Testnet
2023-08-21 08:29:55 🏷  Node name: kate-docker-avail-Node
2023-08-21 08:29:55 👤 Role: FULL
2023-08-21 08:29:55 💾 Database: RocksDb at /da/state/chains/Avail Testnet_116d7474-0481-11ee-bc2a-7bfc086be54e/db/full
2023-08-21 08:29:55 ⛓  Native runtime: data-avail-11 (data-avail-0.tx1.au11)
2023-08-21 08:30:04 🏷  Local node identity is: 12D3KooWEdgyAtH8ZCU8ScTx1hx5NWh4gmDGNcedtLxrJ1htSeBe
2023-08-21 08:30:04 Prometheus metrics extended with avail metrics
2023-08-21 08:30:04 💻 Operating system: linux
2023-08-21 08:30:04 💻 CPU architecture: x86_64
2023-08-21 08:30:04 💻 Target environment: gnu
2023-08-21 08:30:04 💻 CPU: Intel(R) Xeon(R) Platinum 8175M CPU @ 2.50GHz
2023-08-21 08:30:04 💻 CPU cores: 1
2023-08-21 08:30:04 💻 Memory: 7835MB
2023-08-21 08:30:04 💻 Kernel: 5.15.0-1040-aws
2023-08-21 08:30:04 💻 Linux distribution: Debian GNU/Linux 11 (bullseye)
2023-08-21 08:30:04 💻 Virtual machine: yes
2023-08-21 08:30:04 📦 Highest known block at #9150
2023-08-21 08:30:04 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-08-21 08:30:04 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-08-21 08:30:04 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-08-21 08:30:04 🏁 CPU score: 671.55 MiBs
2023-08-21 08:30:04 🏁 Memory score: 4.47 GiBs
2023-08-21 08:30:04 🏁 Disk score (seq. writes): 339.36 MiBs
2023-08-21 08:30:04 🏁 Disk score (rand. writes): 62.48 MiBs
2023-08-21 08:30:05 🔍 Discovered new external address for our node: /ip4/13.53.42.153/tcp/30333/ws/p2p/12D3KooWEdgyAtH8ZCU8ScTx1hx5NWh4gmDGNcedtLxrJ1htSeBe2023-08-21 08:30:09 ⚙️  Syncing, target=#326624 (15 peers), best: #9406 (0x875e…c887), finalized #9317 (0x37b6…28ff), ⬇ 321.9kiB/s ⬆ 30.1kiB/s
2023-08-21 08:30:14 ⚙️  Syncing 64.4 bps, target=#326624 (15 peers), best: #9728 (0xb4fe…e318), finalized #9317 (0x37b6…28ff), ⬇ 40.2kiB/s ⬆ 1.8kiB/s
```

</details>

## Step 2: Verify Node Functionality

### Inspect Node Logs

To confirm that your node is operating as expected, inspect the Docker logs by running the following:

```bash
ubuntu:/mnt/avail# docker ps
ubuntu:/mnt/avail# docker logs 5b3978de8f35  # 5b3978de8f35 is the container id
```

### Monitor Your Node

You can monitor the status of your node on the [<ins>Avail Telemetry</ins>](http://telemetry.avail.tools/) website.
