---
id: avail-full-node
title: Run a Full Node
sidebar_label: Run a Full Node
description: Learn how to run a full node
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-full-node
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip Common practice

Users often run nodes on a cloud server. You may consider using a VPS provider (AWS, GCP, etc) to run your node.

:::

## Prerequisites

The following list of standard hardware is a recommendation of hardware specs that your environment should
have.

The hardware specs should at least have:

* 8GB RAM
* 4 core CPU
* 200-300 GB SSD

There is two sections below on how to run a full node, you only need to do one of them. There is also how to run a local dev node section for developers looking for a local node.

## Quick Full Node Setup

Follow the below steps to run a full node in the most minimal time
* Deteremine the latest [Avail binary](https://github.com/availproject/avail/releases) version you would like to use. Avail testnet is using version [v1.3.0-2-ad405d0](https://github.com/availproject/avail/releases/tag/v1.3.0-2-ad405d0)
* Create a working directory:
```
cd ~
mkdir avail-node
cd avail-node
```
* Download the Avail binary. For now we will use the Testnet binary:
```
wget https://github.com/availproject/avail/releases/download/v1.3.0-2-ad405d0/data-avail-linux-amd64.tar.gz
tar -xvf data-avail-linux-amd64.tar.gz
mv data-avail-linux-amd64 data-avail
rm data-avail-linux-amd64.tar.gz
```
* Download the chain specification file for the Testnet:
```
wget https://testnet.polygonavail.net/chainspec.raw.json
```
* Run a full node:
```
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
2023-05-07 12:55:21 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-05-07 12:55:21 Listening for new connections on 127.0.0.1:9944.
```

:::info Observe Role

Pay attention to the role of the node. This will help you know what type of node you are running.

:::

You have succesfully run a full node.


## Build Binary & Full Node Setup
The above quick setup section allows you to get a node up and running without building the binary. making use of an existing binary. Should you wish to build the binary and then run the node then follow the below steps.

* First thing you will need to do is install dependencies:
```
sudo apt install make clang pkg-config libssl-dev build-essential
```

* You will need to install Rust. Proceed with option 1 when using the below commands:
```
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
```

* Use the following to verify Rust version and is in working condition:
```
rustc --version
```

* Update to Rust nightly and have the latest:
```
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

* We are now ready to download the code and build the binary. For the purpose of this document we making use of the TestNet version. You can download your preferred version:
```
wget https://github.com/maticnetwork/avail/archive/refs/tags/v1.3.0-2-ad405d0.tar.gz
tar -xvf v1.3.0-2-ad405d0.tar.gz
rm v1.3.0-2-ad405d0.tar.gz
cd avail-1.3.0-2-ad405d0 
cargo build --release -p data-avail
```

:::tip Build time will vary

The time taken to build the binary will vary from server. The more server resources available the faster the build will be.

:::

* You may now create a working directory and transfer the binary into that directory:
```
cd ~
mkdir avail-node
cp  ~/avail-1.3.0-2-ad405d0/target/release/avail-node ~/avail-node/
cd avail-node
```

* Download the chain specification file for the Testnet:
```
wget https://testnet.polygonavail.net/chainspec.raw.json
```

* Run a full node:
```
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


## Run Avail Locally

To run a local dev node with temporary datastore:

```sh
./data-avail --dev --tmp
```

