---
id: light-client-setup
title: Run a Light Client
sidebar_label: Run a Light Client
sidebar_position: 1
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
   | Kate Testnet | [Node v1.4.0](https://github.com/availproject/avail-light/releases/tag/v1.4.0) | [Config](https://) |

2. Unpack both files into a folder and run the client:
   
   ```
      ./avail-light -c config.yaml
   ```
   You may need to tweak the command depending on the binary name. You can also rename the binary for convenience.
   
   The client output should look like this:
   ```
   ...
   ```


3. That's it! There is no step 3. You're running the light client 🎉
   
   Refer to the [config
   reference](https://github.com/availproject/avail-light#config-reference)
   for available configuration options. And check out the "Using Avail"
   section of these docs for guides and examples for how to interact with
   Avail, embed the light client into your application, and more.

## Building From Source

1. Ensure have Rust installed:

   ```
   curl https://sh.rustup.rs -sSf | sh
   source $HOME/.cargo/env
   rustup update nightly
   rustup target add wasm32-unknown-unknown --toolchain nightly
   rustc --version # verify rust is working, print the installed version
   ```

2. Clone the light client [git repository](https://github.com/availproject/avail-light):

   ```
   git clone https://github.com/availproject/avail-light.git
   ```

3. Buid and run the light client:

   ```
   cd avail-light
   cargo run
   ```

   The client will generate a default `config.yaml` file, but it will
   not be connected to any network. Replace the config with the
   appropriate one from the "Quick Setup" section above, and re-run
   the client. That's it!
