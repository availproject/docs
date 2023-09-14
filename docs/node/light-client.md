---
id: light-client-setup
title: How to Run a Light Client
sidebar_label: Run a Light Client
description: Learn how to run an Avail Light Client
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: light-client-setup
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Quick Setup

Follow these steps to connect a light client to the Kate testnet.

1. Download the client binary and config file for the network you want to join:
   
   | Network      | Client Binary           | Config File             |
   |--------------|-------------------------|-------------------------|
   | Kate Testnet | [v1.6.0-rc1](https://github.com/availproject/avail-light/releases/tag/v1.6.0-rc1) | <a target="_blank" href="/configs/kate/avail-light-1.4.3/config.yaml" download>Config</a> |

2. Unpack both files into a folder, and run the client (adjust for
   platform or version in the downloaded binary name):
   
   ```bash
   ./avail-light -c config.yaml
   ```
   
   The client output should look like this:
   ```
   2023-06-04T02:56:31.871284Z  INFO avail_light::telemetry: Metrics server on http://0.0.0.0:9520/metrics
   2023-06-04T02:56:31.884271Z  INFO avail_light::http: RPC running on http://127.0.0.1:7000
   2023-06-04T02:56:31.884386Z  INFO avail_light::network: Local peer id: PeerId("12D3KooWQ77VEayXfSPWcj6ucAGcjZRTL8ANmtjsuULoyToGSBoo"). Public key: Ed25519(PublicKey(compressed): d44de4113b372855a655f1675325379705aa7a273698194e8e6814dab7791a).
   2023-06-04T02:56:31.884605Z  INFO Server::run{addr=127.0.0.1:7000}: warp::server: listening on http://127.0.0.1:7000
   2023-06-04T02:56:31.892181Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/127.0.0.1/udp/37000/quic-v1"
   2023-06-04T02:56:31.892487Z  INFO avail_light: Bootstraping the DHT with bootstrap nodes...
   2023-06-04T02:56:31.892487Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/192.168.1.146/udp/37000/quic-v1"
   2023-06-04T02:56:31.892540Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/127.0.0.1/tcp/37000"
   2023-06-04T02:56:31.892745Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/192.168.1.146/tcp/37000"
   2023-06-04T02:56:42.220179Z  INFO avail_light::rpc: Connection established to the node: wss://kate-beta.avail.tools:443/ws <v1.6.0-99b85257d6b/data-avail/9>
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


3. That's it! There is no step 3. You're running the light client 🎉
   
   Refer to the [config
   reference](https://github.com/availproject/avail-light#config-reference)
   for available configuration options. And check out the "Using Avail"
   section of these docs for guides and examples for how to interact with
   Avail, embed the light client into your application, and more.

## Building From Source

We recommend the binary download above because it's faster and easier,
but if you need to build the client (e.g. for a platform we don't have
binaries for), these are the steps to follow:

1. Ensure have Rust installed:

   ```bash
   curl https://sh.rustup.rs -sSf | sh
   source $HOME/.cargo/env
   rustup update nightly
   rustup target add wasm32-unknown-unknown --toolchain nightly
   rustc --version # verify rust is working, print the installed version
   ```

2. Clone the light client [git repository](https://github.com/availproject/avail-light):

   ```bash
   git clone https://github.com/availproject/avail-light.git
   ```

3. Build and run the light client:

   ```bash
   cd avail-light
   cargo run
   ```

   The client will generate a default `config.yaml` file, but it will
   not be connected to any network. Replace the config with the
   appropriate one from the "Quick Setup" section above, and re-run
   the client. That's it!
