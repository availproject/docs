---
id: docker
title: How to Run a Validator Node using Docker
sidebar_label: Using Docker
description: 'Learn about running an Avail validator using Docker.'
keywords:
  - docs
  - avail
  - node
  - docker
  - validator
  - data availability
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Preliminaries

Validator nodes hold a pivotal role in maintaining network integrity by staking real-value tokens. Successfully managing a validator comes with a comprehensive grasp of node operations, hardware configuration, and constant vigilance. Validators face the potential consequences of penalties, such as slashing, for infractions like extended periods of offline activity or equivocation. This responsibility underscores the need for a profound understanding of the associated risks.

:::warning System administration

While Avail is currently in its testnet phase, running validator nodes requires significant system administration expertise.

:::

Becoming a validator is a significant responsibility because mistakes or errors can jeopardize not just your tokens but also your reputation, given your role in managing both your stake and that of your nominators. Despite these challenges, it offers a rewarding chance to enhance network security and be incentivized.

:::info Onboarding

Please join the [<ins>Avail Discord</ins>](https://discord.com/invite/y6fHnxZQX8) for up-to-date information on the Goldberg Testnet and
validator onboarding.

:::

## Run a Validator Node

Run the following commands to launch your Avail node:

```bash
cd /mnt/avail
sudo docker run -v $(pwd)/state:/da/state:rw -p 30333:30333 -p 9615:9615 -p 9944:9944 -d --restart unless-stopped availj/avail:v1.9.0.0 --chain goldberg --validator --name "MyAweasomeInContainerAvailAnode" -d /da/state
```

> The Docker command performs several important steps:

> - Navigating to `/mnt/avail` to ensure we're in the correct directory.
> - Mapping `/mnt/avail/state` to `/da/state` and granting read-write permissions to ensure data persistence, even if the container crashes.
> - Using `DA_CHAIN` to specify the goldberg chainspec.
> - Setting `DA_NAME` as the name of your node; in our example, it's `goldberg-docker-avail-Node`.
> - Utilizing port **`30333`** for public P2P connections, **`9615`** for the Prometheus metrics endpoint, and **`9944`** for the HTTP RPC port. For WebSocket, add port **`9944`**.
> - Using an image from the Avail Docker Hub repository.
> - Adding any desired node flags after the image name, such as `--rpc`.

Inspect the Docker logs to verify that the node is functioning as expected.

```bash
ubuntu:/mnt/avail# docker ps
CONTAINER ID   IMAGE                     COMMAND            CREATED         STATUS         PORTS                                                                                                            NAMES
5b3978de8f35   availj/avail:v1.9.0.0   "/entrypoint.sh"   6 minutes ago   Up 6 minutes   0.0.0.0:9615->9615/tcp, :::9615->9615/tcp, 0.0.0.0:9944->9944/tcp, 0.0.0.0:30333->30333/tcp, :::9944->9944/tcp   relaxed_wilson
ubuntu:/mnt/avail# docker logs 5b3978de8f35
# 5b3978de8f35 is the container id
```

```bash
2023-11-07 17:32:02 Avail Node
2023-11-07 17:32:02 ✌️  version 1.8.0-9c5f37b9230
2023-11-07 17:32:02 ❤️  by Anonymous, 2017-2023
2023-11-07 17:32:02 📋 Chain specification: Avail Goldberg Testnet
2023-11-07 17:32:02 🏷  Node name: abusive-foot-8197
2023-11-07 17:32:02 👤 Role: AUTHORITY
2023-11-07 17:32:02 💾 Database: RocksDb at /tmp/substratex6JdRn/chains/avail_goldberg_testnet/db/full
2023-11-07 17:32:03 🔨 Initializing Genesis block/state (state: 0x6bc7…ec83, header-hash: 0x6f09…a7ae)
2023-11-07 17:32:03 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2023-11-07 17:32:03 👶 Creating empty BABE epoch changes on what appears to be first startup.
2023-11-07 17:32:03 🏷  Local node identity is: 12D3KooWFtjJFk9e5qS4jNWTPSUhTcpSLzeY25P3MeAhzDg6PHwd
2023-11-07 17:32:03 Prometheus metrics extended with avail metrics
2023-11-07 17:32:03 💻 Operating system: linux
2023-11-07 17:32:03 💻 CPU architecture: x86_64
2023-11-07 17:32:03 💻 Target environment: gnu
2023-11-07 17:32:03 💻 CPU: 13th Gen Intel(R) Core(TM) i7-13700K
2023-11-07 17:32:03 💻 CPU cores: 16
2023-11-07 17:32:03 💻 Memory: 31863MB
2023-11-07 17:32:03 💻 Kernel: 6.5.8-100.fc37.x86_64
2023-11-07 17:32:03 💻 Linux distribution: Fedora Linux 37 (Workstation Edition)
2023-11-07 17:32:03 💻 Virtual machine: no
2023-11-07 17:32:03 📦 Highest known block at #0
2023-11-07 17:32:03 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-11-07 17:32:03 Running JSON-RPC server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-11-07 17:32:03 🏁 CPU score: 1.64 GiBs
2023-11-07 17:32:03 🏁 Memory score: 22.77 GiBs
2023-11-07 17:32:03 🏁 Disk score (seq. writes): 6.70 GiBs
2023-11-07 17:32:03 🏁 Disk score (rand. writes): 2.66 GiBs
2023-11-07 17:32:03 👶 Starting BABE Authorship worker
2023-11-07 17:32:04 🔍 Discovered new external address for our node: /ip4/176.61.156.176/tcp/30333/p2p/12D3KooWFtjJFk9e5qS4jNWTPSUhTcpSLzeY25P3MeAhzDg6PHwd
2023-08-21 08:30:14 ⚙️  Syncing 64.4 bps, target=#326624 (15 peers), best: #9728 (0xb4fe…e318), finalized #9317 (0x37b6…28ff), ⬇ 40.2kiB/s ⬆ 1.8kiB/s
```

Your node will also appear on the [Avail Telemetry](http://telemetry.avail.tools/)
website, listed under the "Node name" displayed in the node command output. Be sure
to select the appropriate network tab at the top corresponding to the network you've
joined.
