---
id: avail-node-management
title: Run an Avail Node
sidebar_label: Run an Avail node
description: "Learn about running an Avail node."
keywords:
  - docs
  - avail
  - node
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-node-management
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip Common practice

Users often run nodes on a cloud server. You may consider using a VPS provider to run your node.

:::

## Prerequisites

The following list of standard hardware is a recommendation of hardware specs that your environment should
have.

The hardware specs should at least have:

* 4GB RAM
* 2 core CPU
* 20-40 GB SSD

:::caution If you plan on running a validator

The hardware recommendations for running a validator on a Substrate-based chain:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* Storage - A NVMe solid state drive with about 256GB. Should be reasonably sized to deal with
  blockchain growth.
* Memory - 64GB ECC

:::

### Node prerequisites: Install Rust & dependencies

:::info Installation steps by Substrate

Avail is a Substrate-based chain and requires the same configuration to run a Substrate chain.

Additional installation documentation is available in the Substrate
**[getting started documentation](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Once you choose an environment to run your node, ensure Rust is installed.
If you already have Rust installed, run the following command to make sure you are using the latest version.

```sh
rustup update
```

If not, start by running the following command to fetch the latest version of Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

To configure your shell, run:

```sh
source $HOME/.cargo/env
```

Verify your installation with:

```sh
rustc --version
```

## Run Avail Locally

Clone the [Avail source code](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Compile the source code:

```sh
cargo build --release
```

:::caution This process usually takes time

:::

Run a local dev node with temporary datastore:

```sh
./target/release/data-avail --dev --tmp
```
