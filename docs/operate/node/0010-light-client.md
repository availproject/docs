---
id: light-client
title: How to Run an Avail Light Client
sidebar_label: Run a Light Client
description: 'Learn how to run an Avail Light Client.'
keywords:
  - docs
  - avail
  - node
  - light client
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide outlines how to set up an Avail light client. You can either:

1. [<ins>Run the light client on an existing network</ins>](#run-the-avail-light-client-on-an-existing-network)
2. [<ins>Run the light client locally</ins>](#run-the-light-client-locally)

## Requirements

### Hardware Specifications

The Avail light client is designed to run on resource-constrained and low powered devices. However, we recommend the following configuration to set up your Avail light client.

| Component                    | Minimum  | Recommended |
| ---------------------------- | -------- | ----------- |
| RAM                          | 4GB      | 8GB         |
| CPU (amd64/x86 architecture) | 2 core   | 4 core      |
| Storage (SSD)                | 20-40 GB | 200-300 GB  |

### Latest release

You can find the latest release binary in the `avail-light` repository.

| Repository                                                            | Latest Release                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [<ins>avail-light</ins>](https://github.com/availproject/avail-light) | [<ins>v1.7.4</ins>](https://github.com/availproject/avail-light/releases/tag/v1.7.4) |

## Run on an Existing Network

In this example, you will download the light client and connect to an existing public network.

1. Download the latest Avail light client [<ins>release</ins>](https://github.com/availproject/avail-light/releases/). The light client is available pre-built for different architectures.

2. If you prefer building the light client yourself, see [<ins>build the Avail light client from source</ins>](#build-the-avail-light-client-from-source).

3. Run the light client with the following pre-defined configuration file:

```bash
./avail-light --network goldberg
```

4. If you want to supply your own [<ins>configuration file</ins>](https://github.com/availproject/avail-light#configuration-reference), use:

```bash
./avail-light --config config.yaml --network goldberg
```

That's it 🎉! You have successfully run the light client and connected to a public network. The light client should show output similar to the following:

<details>
<summary> Sample output </summary>

The client output should look like this:

```shell
2023-06-04T02:56:31.871284Z  INFO avail_light::telemetry: Metrics server on http://0.0.0.0:9520/metrics
2023-06-04T02:56:31.884271Z  INFO avail_light::http: RPC running on http://127.0.0.1:7000
2023-06-04T02:56:31.884386Z  INFO avail_light::network: Local peer id: PeerId("12D3KooWQ77VEayXfSPWcj6ucAGcjZRTL8ANmtjsuULoyToGSBoo"). Public key: Ed25519(PublicKey(compressed): d44de4113b372855a655f1675325379705aa7a273698194e8e6814dab7791a).
2023-06-04T02:56:31.884605Z  INFO Server::run{addr=127.0.0.1:7000}: warp::server: listening on http://127.0.0.1:7000
2023-06-04T02:56:31.892181Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/127.0.0.1/udp/37000/quic-v1"
2023-06-04T02:56:31.892487Z  INFO avail_light: Bootstraping the DHT with bootstrap nodes...
2023-06-04T02:56:31.892487Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/192.168.1.146/udp/37000/quic-v1"
2023-06-04T02:56:31.892540Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/127.0.0.1/tcp/37000"
2023-06-04T02:56:31.892745Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/192.168.1.146/tcp/37000"
2023-06-04T02:56:42.220179Z  INFO avail_light::rpc: Connection established to the node: wss://goldberg.avail.tools:443/ws <v1.6.0-99b85257d6b/data-avail/9>
2023-06-04T02:56:42.444576Z  INFO avail_light::light_client: Starting light client...
2023-06-04T02:56:43.453935Z  INFO avail_light::subscriptions: Received finalized block header header.number=2074
2023-06-04T02:56:43.455236Z  INFO avail_light::light_client: Processing finalized block block_number=2074 block_delay=0
2023-06-04T02:56:43.456055Z  INFO avail_light::light_client: Random cells generated: 4 block_number=2074 cells_requested=4
2023-06-04T02:56:43.617885Z  INFO avail_light::light_client: Number of cells fetched from DHT: 0 block_number=2074 cells_from_dht=0
2023-06-04T02:56:43.820098Z  INFO avail_light::light_client: Number of cells fetched from RPC: 4 block_number=2074 cells_from_rpc=4
2023-06-04T02:56:43.889260Z  INFO avail_light::light_client: Completed 4 verification rounds in 	433.968ms block_number=2074
2023-06-04T02:56:43.889395Z  INFO avail_light::light_client: Confidence factor: 93.75 block_number=2074 confidence=93.75
2023-06-04T02:56:43.889495Z  INFO avail_light::light_client: Partition cells received. Time elapsed: 	0ns block_number=2074 partition_retrieve_time_elapsed=0.0 partition_cells_fetched=4
2023-06-04T02:56:44.050133Z  INFO avail_light::light_client: DHT PUT operation success rate: inf block_number=2074
2023-06-04T02:56:44.050211Z  INFO avail_light::light_client: 4 cells inserted into DHT. Time elapsed: 	160.697ms block_number=2074 partition_dht_insert_time_elapsed=0.160697
```

</details>

## Run Locally

If you want to connect the Avail light client to a local network, you will need to run your own Avail node and your own Avail light client bootstrap node.

1. Run the Avail [<ins>node</ins>](/docs/operate/node/binaries). For local set-up, run the node in `dev` mode:

   ```bash
   ./data-avail --dev
   ```

2. Run a [<ins>bootstrap node</ins>](/operate/node/bootstrap).

3. Once the bootstrap node is running, use the following command to run your client:

   ```bash
   ./avail-light --network local
   ```

4. If you want to supply your own [<ins>configuration file</ins>](https://github.com/availproject/avail-light#configuration-reference), use:
   ```bash
   ./avail-light --config config.yaml --network local
   ```

## Build From Source

You can build the light client directly from source.

```sh
git clone https://github.com/availproject/avail-light.git
cd avail-light
cargo build --release
```

Find the resulting `avail-light` binary in the `target/release` directory.

## Next Steps

### Run a Relay node

We provide an Avail light client relay node that can help you with running your light client from behing NAT and firewalls. Find more information on running a relay node [<ins>here</ins>](/docs/operate/node/0060-relay-node.md).

### Run a Full Node

Consider running a full node by following the deployment guide [<ins>here</ins>](/docs/operate/node/0020-full-node-binaries.md).
