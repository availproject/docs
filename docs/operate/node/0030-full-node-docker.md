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
sudo docker run -v $(pwd)/state:/da/state:rw -v $(pwd)/keystore:/da/keystore:rw -e DA_CHAIN=goldberg -e DA_NAME=goldberg-docker-avail-Node -p 0.0.0.0:30333:30333 -p 9615:9615 -p 9933:9933 -d --restart unless-stopped availj/avail:v1.8.0.0
```

> The Docker command performs several important steps:

> - Maps the state and keystore directories, providing read-write permissions for data persistence.
> - Opens various ports for different functionalities, including P2P connections, metrics, and HTTP RPC.
> - Utilizes the Avail image from Docker Hub and sets it to restart unless manually stopped.
> - Using `DA_CHAIN` to specify the goldberg chainspec.

<details>
<summary>Sample output</summary>

You should see an output similar to the following:

```shell
2023-11-07 17:35:19 Avail Node    
2023-11-07 17:35:19 ✌️  version 1.8.0-9c5f37b9230    
2023-11-07 17:35:19 ❤️  by Anonymous, 2017-2023    
2023-11-07 17:35:19 📋 Chain specification: Avail Goldberg Testnet    
2023-11-07 17:35:19 🏷  Node name: fresh-fan-5502    
2023-11-07 17:35:19 👤 Role: FULL    
2023-11-07 17:35:19 💾 Database: RocksDb at /tmp/substrateCTFPb5/chains/avail_goldberg_testnet/db/full    
2023-11-07 17:35:20 🔨 Initializing Genesis block/state (state: 0x6bc7…ec83, header-hash: 0x6f09…a7ae)    
2023-11-07 17:35:20 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.    
2023-11-07 17:35:21 👶 Creating empty BABE epoch changes on what appears to be first startup.    
2023-11-07 17:35:21 🏷  Local node identity is: 12D3KooWEEa9iNANi6PUeXGaDqTgTR9T5YcP3A69nwbT4VXnG5R1    
2023-11-07 17:35:21 Prometheus metrics extended with avail metrics    
2023-11-07 17:35:21 💻 Operating system: linux    
2023-11-07 17:35:21 💻 CPU architecture: x86_64    
2023-11-07 17:35:21 💻 Target environment: gnu    
2023-11-07 17:35:21 💻 CPU: 13th Gen Intel(R) Core(TM) i7-13700K    
2023-11-07 17:35:21 💻 CPU cores: 16    
2023-11-07 17:35:21 💻 Memory: 31863MB    
2023-11-07 17:35:21 💻 Kernel: 6.5.8-100.fc37.x86_64    
2023-11-07 17:35:21 💻 Linux distribution: Fedora Linux 37 (Workstation Edition)    
2023-11-07 17:35:21 💻 Virtual machine: no    
2023-11-07 17:35:21 📦 Highest known block at #0    
2023-11-07 17:35:21 〽️ Prometheus exporter started at 127.0.0.1:9615    
2023-11-07 17:35:21 Running JSON-RPC server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]    
2023-11-07 17:35:21 🏁 CPU score: 1.62 GiBs    
2023-11-07 17:35:21 🏁 Memory score: 22.99 GiBs    
2023-11-07 17:35:21 🏁 Disk score (seq. writes): 6.78 GiBs    
2023-11-07 17:35:21 🏁 Disk score (rand. writes): 2.67 GiBs    
2023-11-07 17:35:21 🔍 Discovered new external address for our node: /ip4/176.61.156.176/tcp/30333/ws/p2p/12D3KooWEEa9iNANi6PUeXGaDqTgTR9T5YcP3A69nwbT4VXnG5R1
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
