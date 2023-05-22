---
id: full-node-setup
title: Run a Full Node
sidebar_position: 3
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

This is the easiest way to get started. Follow these steps for the Kate testnet:

1. Download the [node binary](https://github.com/availproject/avail/releases/tag/v1.3.0-2-ad405d0) and unpack it into a new folder of your choice. Rename the binary to `data-avail` for convenience.
2. Download the [chain specification](https://testnet.avail.tools/chainspec.raw.json) file and place it in the same folder.
3. `cd` into the folder and run the node:
   ```
./data-avail --base-path `pwd`/data \
		--chain `pwd`/chainspec.raw.json \
		--port 30333 \
		--bootnodes /dns/gateway-fullnode-002.testnet.avail.tools/tcp/30333/p2p/12D3KooWNuBaLtAGNxQbei7rUzpp8N8TF8k5kPsgKShAJgK4crkB \
		/dns/gateway-fullnode-001.testnet.avail.tools/tcp/30333/p2p/12D3KooWDgqCRtsJWKjckh2XHtRZbboVdgDJswsxoNmX8PMf59bV \
		/dns/gateway-fullnode-003.testnet.avail.tools/tcp/30333/p2p/12D3KooWBNy1vzragtwiummqXwry19h6dke68hybY6jVeEH4mAtT
   ```

The node should output:
```
2023-05-07 12:55:07 ✌️  version 1.3.0-ad405d0-x86_64-linux-gnu
2023-05-07 12:55:07 ❤️  by Anonymous, 2017-2023
2023-05-07 12:55:07 📋 Chain specification: Avail Testnet 03
2023-05-07 12:55:07 🏷 Node name: nosy-representative-3906
2023-05-07 12:55:07 👤 Role: FULL
2023-05-07 12:55:07 💾 Database: RocksDb at /home/avail/avail-node/data/chains/da_testnet_b10449bc-6f5e-11ed-b8ec-26a2f5211234/db/full
2023-05-07 12:55:07 ⛓  Native runtime: data-avail-6 (data-avail-0.tx1.au10)
2023-05-07 12:55:21 🏷 Local node identity is: 12D3KooWMimM5Unm7xBPfZiCL1tPjh9g9C6dkVRnnKiGtRsH8yo1
2023-05-07 12:55:21 📦 Highest known block at #688669
2023-05-07 12:55:21 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-05-07 12:55:21 Listening for new connections on 127.0.0.1:9944.
```

That's all! You are now running an Avail full node 🎉

## Build Binary & Full Node Setup

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

2. Download the Avail node source and build the binary:

   ```
wget https://github.com/maticnetwork/avail/archive/refs/tags/v1.3.0-2-ad405d0.tar.gz
tar -xvf v1.3.0-2-ad405d0.tar.gz
cd avail-1.3.0-2-ad405d0 
cargo build --release -p data-avail
   ```

:::info Avail on GitHub

You may download the Avail node source from our [git
repository](https://github.com/availproject/avail) instead, though we
advise that you download a specific release tag unless you
specifically require the latest source.

:::

3. Create a working directory and transfer the binary into that
   directory (you may use any directory you like, `~/avail-node` is an
   example):
   ```
mkdir ~/avail-node
cp  target/release/avail-node ~/avail-node/
cd avail-node
   ```

4. Download the chain specification file and run the node:
   ```
wget https://testnet.polygonavail.net/chainspec.raw.json
./data-avail --base-path ~/avail-node/data \
                --chain ~/avail-node/chainspec.raw.json \
                --port 30333 \
                --bootnodes /dns/gateway-fullnode-002.testnet.avail.tools/tcp/30333/p2p/12D3KooWNuBaLtAGNxQbei7rUzpp8N8TF8k5kPsgKShAJgK4crkB \
                /dns/gateway-fullnode-001.testnet.avail.tools/tcp/30333/p2p/12D3KooWDgqCRtsJWKjckh2XHtRZbboVdgDJswsxoNmX8PMf59bV \
                /dns/gateway-fullnode-003.testnet.avail.tools/tcp/30333/p2p/12D3KooWBNy1vzragtwiummqXwry19h6dke68hybY6jVeEH4mAtT
   ```

The node should start running and output the following:
```
2023-05-07 12:55:07 ✌️  version 1.3.0-ad405d0-x86_64-linux-gnu
2023-05-07 12:55:07 ❤️  by Anonymous, 2017-2023
2023-05-07 12:55:07 📋 Chain specification: Avail Testnet 03
2023-05-07 12:55:07 🏷 Node name: nosy-representative-3906
2023-05-07 12:55:07 👤 Role: FULL
2023-05-07 12:55:07 💾 Database: RocksDb at /home/avail/avail-node/data/chains/da_testnet_b10449bc-6f5e-11ed-b8ec-26a2f5211234/db/full
2023-05-07 12:55:07 ⛓  Native runtime: data-avail-6 (data-avail-0.tx1.au10)
2023-05-07 12:55:21 🏷 Local node identity is: 12D3KooWMimM5Unm7xBPfZiCL1tPjh9g9C6dkVRnnKiGtRsH8yo1
2023-05-07 12:55:21 📦 Highest known block at #688669
2023-05-07 12:55:21 〽 Prometheus exporter started at 127.0.0.1:9615
2023-05-07 12:55:21 Listening for new connections on 127.0.0.1:9944.
```

:::tip Run Avail Locally

If you are working on the node itself, it can be useful to run a local dev node with temporary datastore:

```sh
./data-avail --dev --tmp
```

:::
