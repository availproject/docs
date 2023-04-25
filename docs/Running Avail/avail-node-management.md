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

Clone the [Avail source code](https://github.com/availproject/avail.git):

```sh
git clone git@github.com:availproject/avail.git
```

Now go to `avail` directory and compile the source code:

```sh
cargo build --release -p data-avail
```

:::caution This process usually takes time

:::

Run a local dev node with temporary datastore:

```sh
./target/release/data-avail --dev --tmp
```

## Running Avail full node

If you intend to run a full node instaead of a validator node, then you must have following two things ready with you -

1) Raw chain spec to connect to the Avail testnet available [here](http://testnet.avail.tools/chainspec.raw.json) 

2) The p2p address of the boot node to connect to.  

When you have both of them, then from your `avail` directory execute the command -

```bash
./target/release/data-avail --base-path /tmp/Testnet --chain misc/genesis/avail-testnet-raw-chain-spec.json --port 30333 --bootnodes /ip4/32.xxx.yyy.21/tcp/30333/p2p/12D3KoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYwLNRAnW*
``` 

Of course, you can specify some other flags as per your needs too. Please refer to `data-avail` `--help` documentation if you need to know more about those options and flags.


💡  **Running data-avail binary as service:** The command line execution shown above is not the best way to use the `data-avail` binary in production. We recommend that you build a service around `data-avail` binary to use in your production environments. 


⚠️ The output must show at least one peer, otherwise there is something wrong in the command execution, such as a typo, an incorrect parameter, etc. 

Successfully connecting to one or more peers indicates that your new full node is now successfully connected to the Avail testnet. Congratulations!

