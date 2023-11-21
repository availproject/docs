---
id: op-stack
title: How to Use the OP Stack with Avail
sidebar_label: Use the OP Stack
description: 'Discover how to utilize Avail as a data availability layer.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

## Introduction

Embark on setting up your own Avail-Optimism chain. This guide targets Ethereum's Goerli testnet and Avail Goldberg testnet. For a detailed understanding, review the [Optimism Documentation](https://stack.optimism.io/docs/build/getting-started/#know-before-you-go).

In this guide, you will conduct the following:

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Compile the Core Codebase](#compile-the-core-codebase)
  - [Building the Optimism Monorepo](#building-the-optimism-monorepo)
  - [Building `op-geth`](#building-op-geth)
  - [Get Access to a Goerli Node](#get-access-to-a-goerli-node)
- [Generate and Secure Keys](#generate-and-secure-keys)
- [Network Configuration and Setup](#network-configuration-and-setup)
- [Smart Contract Deployment](#smart-contract-deployment)
- [Initialize and Configure Geth](#initialize-and-configure-geth)
- [Launch and Monitor Nodes](#launch-and-monitor-nodes)
  - [Running `op-geth`](#running-op-geth)
  - [Reinitializing `op-geth`](#reinitializing-op-geth)
  - [Operating `op-node`](#operating-op-node)
  - [Activating `op-batcher`](#activating-op-batcher)
  - [Starting `op-proposer`](#starting-op-proposer)
- [Acquire Goerli ETH for Layer 2](#acquire-goerli-eth-for-layer-2)
- [Conduct Test Transactions](#conduct-test-transactions)

## Prerequisites

Ensure you have installed the following software.

> Installation commands are based on Ubuntu 20.04 LTS:

<table>
  <tr>
    <td valign="top">

| Software                                                                 | Version                                                                                |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [<ins>Git</ins>](https://git-scm.com/)                                   | OS default                                                                             |
| [<ins>Go</ins>](https://go.dev/)                                         | 1.20                                                                                   |
| [<ins>Node</ins>](https://nodejs.org/en/)                                | 16.19.0                                                                                |
| [<ins>Pnpm</ins>](https://pnpm.io/installation)                          | 8.5.6                                                                                  |
| [<ins>Make</ins>](https://linux.die.net/man/1/make)                      | OS default                                                                             |
| [<ins>jq</ins>](https://github.com/jqlang/jq)                            | OS default                                                                             |
| [<ins>direnv</ins>](https://direnv.net/)                                 | Latest                                                                                 |
| [<ins>Foundry</ins>](https://github.com/foundry-rs/foundry#installation) | Foundry will be installed locally within the project's environment, via `package.json` |

</td>
<td valign="top">

```bash
# Install Git
sudo apt install -y git curl make jq

# Install Go
wget https://go.dev/dl/go1.20.linux-amd64.tar.gz
tar xvzf go1.20.linux-amd64.tar.gz
sudo cp go/bin/go /usr/bin/go
sudo mv go /usr/lib
echo export GOROOT=/usr/lib/go >> ~/.bashrc

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs npm

# Install Pnpm
sudo npm install -g pnpm

# Install Make
sudo apt install -y make

# Install jq
sudo apt install -y jq

# Install direnv
sudo apt install -y direnv
```

</td>
  </tr>
</table>

## Compile the Core Codebase

Setting up the EVM Rollup requires compiling code from two critical repositories: the [<ins>avail-op-stack-adapter monorepo</ins>](https://github.com/availproject/avail-op-stack-adapter) and the [<ins>op-geth repository</ins>](https://github.com/ethereum-optimism/op-geth).

### Building the Optimism Monorepo

1. Clone and navigate to the Avail adapter:

   ```bash
   git clone https://github.com/availproject/avail-op-stack-adapter.git
   cd avail-op-stack-adapter
   ```

2. Install modules (simultaneously, you may start [<ins>building `op-geth`</ins>](#building-op-geth)):

   ```bash
   pnpm install
   ```

3. Compile the necessary packages:
   ```bash
   make op-node op-batcher op-proposer
   pnpm build
   ```

### Building `op-geth`

1. Clone and navigate to `op-geth`:

   ```bash
   git clone https://github.com/ethereum-optimism/op-geth.git
   cd op-geth
   ```

2. Compile `op-geth`:
   ```bash
   make geth
   ```

### Get Access to a Goerli Node

For deploying to Goerli, access an L1 node using a provider like [<ins>Alchemy</ins>](https://www.alchemy.com/) or [<ins>run your own Goerli node</ins>](https://notes.ethereum.org/@launchpad/goerli).

## Generate and Secure Keys

Create four essential accounts with private keys:

- `Admin` (contract upgrade authority)
- `Batcher` (publishes Sequencer data to L1)
- `Proposer` (publishes L2 results to L1)
- `Sequencer` (signs blocks on the p2p network)

Use `cast wallet` in `contracts-bedrock` for key generation:

1. Enter Avail-Optimism monorepo:

   ```bash
   cd avail-op-stack-adapter
   ```

2. Go to `contracts-bedrock`:

   ```bash
   cd packages/contracts-bedrock
   ```

3. Generate accounts:
   ```bash
   echo "Admin:"
   cast wallet new
   echo "Proposer:"
   cast wallet new
   echo "Batcher:"
   cast wallet new
   echo "Sequencer:"
   cast wallet new
   ```

Record and securely store these key details. Fund `Admin`, `Proposer`, and `Batcher` with Goerli ETH (2 ETH for `Admin`, 5 ETH for `Proposer`, 10 ETH for `Batcher`).

**Note for Production**: Use secure hardware for key management in production environments.

- `Admin` — 2 ETH
- `Proposer` — 5 ETH
- `Batcher` — 10 ETH

## Network Configuration and Setup

After building the repositories, configure your chain settings in the [<ins>contracts-bedrock package</ins>](https://github.com/availproject/avail-optimism/tree/129032f15b76b0d2a940443a39433de931a97a44/packages/contracts-bedrock).

1. Enter the Avail-OP-Stack monorepo:

   ```bash
   cd ~/avail-op-stack-adapter
   ```

2. Navigate to `contracts-bedrock`:

   ```bash
   cd packages/contracts-bedrock
   ```

3. Copy the environment file:

   ```bash
   cp .envrc.example .envrc
   ```

4. Edit `.envrc` with necessary values (`ETH_RPC_URL`, `PRIVATE_KEY`, `DEPLOYMENT_CONTEXT`).

5. Activate the environment with `direnv`:

   ```bash
   direnv allow .
   ```

6. Choose an L1 block as a starting point using `cast` command:

   ```bash
   cast block finalized --rpc-url $ETH_RPC_URL | grep -E "(timestamp|hash|number)"
   ```

7. Create and modify `deploy-config/avail-optimism.json` based on `deploy-config/getting-started.json`.

8. Configure `enableDA` in `avail-optimism.json` (true for Avail chain as DA, false for Ethereum).

9. Enter `op-avail` module:

   ```bash
   cd ~/avail-op-stack-adapter/op-avail
   ```

10. Create `config.json` with necessary variables (`seed`, `api_url`, `app_id`).

## Smart Contract Deployment

Deploy essential L1 contracts for the chain’s functionality:

1. Create `avail-optimism` directory:

   ```bash
   mkdir deployments/avail-optimism
   ```

2. Deploy contracts (can take up to 15 minutes):
   ```bash
   forge script scripts/Deploy.s.sol:Deploy --private-key $PRIVATE_KEY --broadcast --rpc-url $ETH_RPC_URL
   forge script scripts/Deploy.s.sol:Deploy --sig 'sync()' --private-key $PRIVATE_KEY --broadcast --rpc-url $ETH_RPC_URL
   ```

## Initialize and Configure Geth

Prepare `op-geth` for running the chain:

1. Navigate to `op-geth`:

   ```bash
   cd ~/op-geth
   ```

2. Create a data directory:

   ```bash
   mkdir datadir
   ```

3. Initialize with the genesis file:
   ```bash
   build/bin/geth init --datadir=datadir genesis.json
   ```

## Launch and Monitor Nodes

Running `op-geth` and `op-node` is essential for every node. `op-batcher` and `op-proposer` are exclusive to the sequencer.

Set the following environment variables:

| Variable     | Value                                     |
| ------------ | ----------------------------------------- |
| SEQ_KEY      | Sequencer private key                     |
| BATCHER_KEY  | Batcher private key (minimum 1 ETH)       |
| PROPOSER_KEY | Proposer private key                      |
| L1_RPC       | L1 node URL                               |
| RPC_KIND     | L1 server type (e.g., alchemy, quicknode) |
| L2OO_ADDR    | L2OutputOracleProxy address               |

### Running `op-geth`

Execute `op-geth`:

```bash
cd ~/op-geth
./build/bin/geth [other parameters]
```

`op-geth` starts running and waits for `op-node`.

### Reinitializing `op-geth`

Reset `op-geth` if database corruption occurs:

1. Stop `op-geth`.
2. Clear data:

   ```bash
   cd ~/op-geth
   rm -rf datadir/geth
   ```

3. Reinitialize:

   ```bash
   build/bin/geth init --datadir=datadir genesis.json
   ```

4. Restart both `op-geth` and `op-node`.

### Operating `op-node`

Launch `op-node`:

```bash
cd ~/optimism/op-node
./bin/op-node [other parameters]
```

`op-node` processes L1 information and syncs with `op-geth`.

### Activating `op-batcher`

Run `op-batcher`:

```bash
cd ~/optimism/op-batcher
./bin/op-batcher [other parameters]
```

`op-batcher` publishes transactions to L1.

### Starting `op-proposer`

Initiate `op-proposer`:

```bash
cd ~/optimism/op-proposer
./bin/op-proposer [other parameters]
```

`op-proposer` proposes new state roots.

## Acquire Goerli ETH for Layer 2

To obtain ETH on your Rollup:

1. Go to `contracts-bedrock`:

   ```bash
   cd ~/optimism/packages/contracts-bedrock
   ```

2. Find the L1 standard bridge contract address:

   ```bash
   cat deployments/avail-optimism/L1StandardBridgeProxy.json | jq -r .address
   ```

3. Send Goerli ETH to the bridge contract address.

## Conduct Test Transactions

You now have a fully operational Avail-OP-Stack based EVM Rollup. Experiment with it as you would with any other test blockchain.

**Congratulations on setting up your chain!**
