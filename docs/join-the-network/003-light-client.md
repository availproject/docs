---
id: light-client-setup
title: Run a Light Client
sidebar_label: Run a Light Client
sidebar_position: 2
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

## Before you start

1. Ensure have Rust installed:

   ```
   curl https://sh.rustup.rs -sSf | sh
   source $HOME/.cargo/env
   rustup update nightly
   rustup target add wasm32-unknown-unknown --toolchain nightly
   rustc --version # verify rust is working, print the installed version
   ```

   If it's not possible to install rust, you may be able to use one of
   our pre-compiled binaries, see the releases link below.

## Quick Setup

Follow these steps to connect a light client to the Kate testnet.

1. Clone the light client [git repository](https://github.com/availproject/avail-light):

   ```
   git clone https://github.com/availproject/avail-light.git
   ```

   Binary releases are [also available](https://github.com/availproject/avail-light/releases) for convenience.

2. Run the light client:

   ```
   cd avail-light
   cargo run
   ```

   After the compilation is complete (which can take a while), the client
   will print something similar to this:
   
   ```
   2023-05-22T18:51:02.695946Z  INFO avail_light::telemetry: Metrics server on http://0.0.0.0:9520/metrics
   2023-05-22T18:51:02.719962Z  INFO avail_light::http: RPC running on http://127.0.0.1:7000
   2023-05-22T18:51:02.720093Z  INFO avail_light::network: Local peer id: PeerId("12D3KooWQ5mVQPuq2urxqDZGpLE1BMqSi5kKAgFpNrGK467XxHUB"). Public key: Ed25519(PublicKey(compressed): d3f5b2f56be65c64e657f3c7f5b54f4cba3fd0c92644b52c96374474cf360).
   2023-05-22T18:51:02.720365Z  INFO Server::run{addr=127.0.0.1:7000}: warp::server: listening on http://127.0.0.1:7000
   2023-05-22T18:51:02.728516Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/127.0.0.1/udp/37000/quic-v1"
   2023-05-22T18:51:02.728596Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/192.168.1.146/udp/37000/quic-v1"
   2023-05-22T18:51:02.728702Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/127.0.0.1/tcp/37000"
   2023-05-22T18:51:02.728703Z  INFO avail_light: No bootstrap nodes, waiting for first peer to connect...
   2023-05-22T18:51:02.728731Z  INFO avail_light::network::event_loop: Local node is listening on "/ip4/192.168.1.146/tcp/37000"
   ```

3. Stop the client with `Control-c` and edit the `config.yaml` file.

   Although the client runs, it needs to know the network
   endpoint to use to subscribe to new block headers. The example
   below is for the Kate testnet network, for other networks please
   check the documentation or ask for help on Discord.
   
   Edit the `config.yaml` file (created by the client on first-run)
   and set the `full_node_ws` setting as follows:

   ```
   full_node_ws = ['wss://testnet.avail.tools/ws']
   ```

   See the [config
   reference](https://github.com/availproject/avail-light#config-reference)
   for a complete description of the availa

When run again, the light client should show:

```
...
```

Note that as each block is produced by the network, the light client
performs random sampling to reach the confidence level set in the
config file.

Read more about how to build on the light client in the [Light Client
Overview](/) section.

Thanks for running an Avail light client!
