---
id: validator-docker
title: How to Run a Validator Node using Docker
sidebar_label: Using Docker
description: "Learn about running an Avail validator using Docker."
keywords:
  - docs
  - avail
  - node
  - docker
  - validator
  - data availability
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Preliminaries

Validator nodes hold a pivotal role in maintaining network integrity by staking real-value tokens. Successfully managing a validator comes with a comprehensive grasp of node operations, hardware configuration, and constant vigilance. Validators face the potential consequences of penalties, such as slashing, for infractions like extended periods of offline activity or equivocation. This responsibility underscores the need for a profound understanding of the associated risks.

:::warning System administration

While Avail is currently in its testnet phase, running validator nodes requires significant system administration expertise.

:::

Becoming a validator is a significant responsibility because mistakes or errors can jeopardize not just your tokens but also your reputation, given your role in managing both your stake and that of your nominators. Despite these challenges, it offers a rewarding chance to enhance network security and be incentivized.

:::info Onboarding

Please join the [<ins>Avail Discord</ins>](https://discord.com/invite/y6fHnxZQX8) for up-to-date information on the Kate Testnet and
validator onboarding.

:::

The Avail team provides official Docker images designed to run nodes on 
the **Kate testnet**.

## Run a Validator Node

Download the Correct Chaispec file for the network in our case we are using the **`Kate-Testnet`** Chainspec.

   
   | Network      |Docker Hub |  Chain Specification File | Chain Info Reference|
   |--------------|-----------|--------------------------|----------------------|
   | Kate Testnet |[Releases](https://hub.docker.com/r/availj/avail/tags)|[chainspec.raw.json](https://kate.avail.tools/#/explorer/chainspec) | [Chain Info](https://availproject.github.io/assets/files/chaininfo-de1eeff4d63715bbec85aae81a956d40.txt) |

In our case we will download the chainspec into our config folder as `kate-chainspec.raw.json`

```bash
curl -L -o /mnt/avail/config/kate-chainspec.raw.json https://raw.githubusercontent.com/availproject/availproject.github.io/main/static/configs/kate/chainspec.raw.json
```

Now that we've downloaded our Chainspec configuration, let's proceed to launch our Avail Node.

```bash
cd /mnt/avail

sudo docker run -v $(pwd)/config/kate-chainspec.raw.json:/da/genesis/chainspec.raw.json -v $(pwd)/state:/da/state:rw -v $(pwd)/keystore:/da/keystore:rw -e DA_CHAIN=/da/genesis/chainspec.raw.json -e DA_NAME=kate-docker-avail-Node -p 0.0.0.0:30333:30333 -p 9615:9615 -p 9933:9933 -d --restart unless-stopped availj/avail:v1.6.2-rc1
```

Now that we've downloaded our Chainspec configuration, let's proceed to launch our Avail Node. The steps in the command include:

- Navigating to `/mnt/avail` to ensure we're in the correct directory.
- Mounting `/mnt/avail/config/kate-chainspec.raw.json` to `/da/genesis/chainspec.raw.json` in the Docker container for accurate chainspec.
- Mapping `/mnt/avail/state` to `/da/state` and granting read-write permissions to ensure data persistence, even if the container crashes.
- Using `DA_CHAIN` to specify the chainspec file within the container.
- Setting `DA_NAME` as the name of your node; in our example, it's `kate-docker-avail-Node`.
- Utilizing port **`30333`** for public P2P connections, **`9615`** for the Prometheus metrics endpoint, and **`9933`** for the HTTP RPC port. For WebSocket, add port **`9944`**.
- Using an image from the Avail Docker Hub repository.
- Adding any desired chain flags after the image name, such as `--rpc`.

Inspect the Docker logs to verify that the node is functioning as expected.

```bash
ubuntu:/mnt/avail# docker ps
CONTAINER ID   IMAGE                     COMMAND            CREATED         STATUS         PORTS                                                                                                            NAMES
5b3978de8f35   availj/avail:v1.6.2-rc1   "/entrypoint.sh"   6 minutes ago   Up 6 minutes   0.0.0.0:9615->9615/tcp, :::9615->9615/tcp, 0.0.0.0:9933->9933/tcp, 0.0.0.0:30333->30333/tcp, :::9933->9933/tcp   relaxed_wilson
ubuntu:/mnt/avail# docker logs 5b3978de8f35
# 5b3978de8f35 is the container id 
```

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

Your node will also appear on the [Avail Telemetry](http://telemetry.avail.tools/) 
website, listed under the "Node name" displayed in the node command output. Be sure 
to select the appropriate network tab at the top corresponding to the network you've 
joined.
