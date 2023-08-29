---
id: full-node-setup
title: Run a Full Node
sidebar_position: 4
sidebar_label: Run a Full Node
description: Learn how to run an Avail full node
keywords:
  - docs
  - avail
  - node
  - full node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: full-node-setup
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Before you start

The instructions below assume a Linux distribution with `apt` (Debian,
for example), but you may be able to adapt them to a different
distribution. It's also common for users to run nodes on a cloud
server. The following list of standard hardware is a recommendation of
hardware specs that your environment should have:

| Minimum      | Recommended    |
|--------------|----------------|
| 4GB RAM      | 8GB RAM        |
| 2 core CPU   | 4 core CPU     |
| 20-40 GB SSD | 200-300 GB SSD |

:::info Alternate networks & releases

All instructions below are for the **Kate testnet** network. To join a
different network, you may need to download a different node version
from the [node releases
page](https://github.com/availproject/avail/releases) and a chain
specification file for the specific network. Contact the Avail team if
you have questions.

:::

## Quick Full Node Setup

This is the easiest way to get started.

1. Download the node binary and chain specification file for the
   network you want to join:
   
   | Network      | Node Binary           | Chain Specification File | Chain Info Reference |
   |--------------|-----------------------|--------------------------|----------------------|
   | Kate Testnet | [v1.6.2-rc1](https://github.com/availproject/avail/releases/tag/v1.6.2-rc1) | [chainspec.raw.json](/configs/kate/chainspec.raw.json) | [Chain Info](/configs/kate/chaininfo.txt) |

2. Unpack both files into a folder, and run the node from that folder (adjust for
   platform or version in the downloaded binary name):
   ```
   ./data-avail --port 30333 --base-path `pwd`/data --chain `pwd`/chainspec.raw.json
   ```

   The node should output:
   ```
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

   It will also be listed on the [Avail
   Telemetry](http://telemetry.avail.tools/) site under the "Node
   name" that appears in the node command output. Note that there are
   network tabs at the top, select the one for the network you joined.

That's all! You are now running an Avail full node 🎉

## Building From Source

We recommend the quick setup above, but if you prefer to build the
node from source (e.g. if you are developing a pallet or need a
version for which there aren't binaries available), then follow these
instructions to build it.

1. Install dependencies. You may need to adjust these for a different
   Linux distribution, or if you already have Rust installed. Note
   that Avail currently requires a nightly Rust build:

   ```
sudo apt install make clang pkg-config libssl-dev build-essential
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
rustc --version # verify rust is working, print the installed version
   ```

2. Select the appropriate node version From the table in the "Quick
   Full Node Setup" section above, and download the source. You may
   also use `git`, but be sure to download a specific release tag.

3. Unpack the sources and build the binary with:

   ```
   cargo build --release -p data-avail
   ```

3. Create a working directory and copy the binary into that directory,
   and follow the rest of the "Quick Full Node Setup" instructions to
   download the appropriate chain specification file and run the node.

:::tip Run Avail Locally

If you are working on the node itself, it can be useful to run a local dev node with temporary datastore:

```sh
./data-avail --dev --tmp
```

:::
