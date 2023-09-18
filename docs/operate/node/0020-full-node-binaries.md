---
id: binaries
title: Running a Full Node with Binaries
sidebar_label: Using Binaries
description: "Discover how to operate an Avail full node through binaries."
keywords:
  - documentation
  - avail
  - node
  - full node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This guide provides step-by-step instructions on how to set up and run a full node for the Avail network using pre-compiled binaries. Whether you're a beginner or an experienced node operator, this guide aims to make the process straightforward.

:::note Before you start

**Ensure that you meet the [<ins>system requirements</ins>](/docs/operate/requirements.md).**
We recommend downloading the pre-compiled binary for speed and convenience.

:::

## Option 1: Run the Pre-Built Release

All you need to do is run:

```bash
./data-avail --port 30333 --base-path `pwd`/data --chain `pwd`/chainspec.raw.json
```

<details>
<summary>Sample Output</summary>

The client output should look like this:

```bash
2023-06-03 20:36:29 Avail Node
2023-06-03 20:36:29 ✌️  version 1.6.0-99b85257d6b
2023-06-03 20:36:29 ❤️  by Anonymous, 2017-2023
2023-06-03 20:36:29 📋 Chain specification: Avail Kate Testnet
2023-06-03 20:36:29 🏷  Node name: bewildered-distance-1229
2023-06-03 20:36:29 👤 Role: FULL
2023-06-03 20:36:29 💾 Database: RocksDb at /Users/thunder/code/avail/data/chains/Avail Testnet_6831251e-0222-11ee-a2c3-c90377335962/db/full
2023-06-03 20:36:29 ⛓  Native runtime: data-avail-9 (data-avail-0.tx1.au11)
2023-06-03 20:36:35 👶 Creating empty BABE epoch changes on what appears to be first startup.
2023-06-03 20:36:35 🏷  Local node identity is: 12D3KooWPt7odw3aeq7azZDugXjNuUvQNPU58n1VRBzY1YBqsjkr
2023-06-03 20:36:35 Prometheus metrics extended with avail metrics
2023-06-03 20:36:35 💻 Operating system: macos
2023-06-03 20:36:35 💻 CPU architecture: aarch64
2023-06-03 20:36:35 📦 Highest known block at #0
2023-06-03 20:36:35 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-06-03 20:36:35 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 🏁 CPU score: 724.71 MiBs
2023-06-03 20:36:35 🏁 Memory score: 41.49 GiBs
2023-06-03 20:36:35 🏁 Disk score (seq. writes): 1.91 GiBs
2023-06-03 20:36:35 🏁 Disk score (rand. writes): 454.66 MiBs
```

</details>

Your node will also appear on the [<ins>Avail Telemetry</ins>](http://telemetry.avail.tools/) site, listed under the "Node name" from the node command output. Be sure to select the appropriate network tab at the top to view your node's status.

## Option 2: Build From Source

### Step 1: Compile the Binary

To compile the client source code, run:

```bash
cargo build --release -p data-avail
```

### Step 2: Run the Node

Create a working directory and copy the binary into that directory. Follow the rest of the "Quick Full Node Setup" instructions to download the appropriate chain specification file and run the node.

:::tip Run Avail Locally

If you are working on the node itself, it can be useful to run a local dev node with a temporary datastore:

```bash
./data-avail --dev --tmp
```

:::

#### Archive Mode

To run an archive node, you must first review the [full node setup guide](/category/run-a-validator-node/). You will complete all the same steps. The only difference is you will add `--pruning archive` to the parameters.

:::info Storage space requirements

An archive node will require more storage over time and the storage space requirements will grow over time.
:::

Example for an archive node start command:

```bash
./data-avail --base-path ~/avail-node/data \
                --chain ~/avail-node/chainspec.raw.json \
                --pruning archive \
                --port 30333 \
                --bootnodes /dns/gateway-fullnode-002.testnet.avail.tools/tcp/30333/p2p/12D3KooWNuBaLtAGNxQbei7rUzpp8N8TF8k5kPsgKShAJgK4crkB \
                /dns/gateway-fullnode-001.testnet.avail.tools/tcp/30333/p2p/12D3KooWDgqCRtsJWKjckh2XHtRZbboVdgDJswsxoNmX8PMf59bV \
                /dns/gateway-fullnode-003.testnet.avail.tools/tcp/30333/p2p/12D3KooWBNy1vzragtwiummqXwry19h6dke68hybY6jVeEH4mAtT
```
