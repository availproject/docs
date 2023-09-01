---
id: avail-relay-node
title: How to Run a Relay Node
sidebar_label: Run a Relay Node
sidebar_position: 6
description: "Learn how to run an Avail relay node."
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This guide provides a step-by-step walkthrough for setting up a relay node, which can help resolve connectivity issues between network peers. Follow the installation and configuration steps below to get your relay node up and running.

<!-- TO DO: add context -->

## Prerequisites

- A local machine or a cloud-based Virtual Machine (VM)
- Basic understanding of command-line operations
- Rust programming language installed

## Installation Steps

### 1. Install Rust and Dependencies

First, you'll need to install Rust and its toolchain. Open your terminal and run the following commands:
> If you're using a new machine (i.e. Ubuntu), you may need to install essential build tools:

> ```bash
> sudo apt update
> sudo apt install build-essential
> ```

```bash
curl https://sh.rustup.rs -sSf | sh  # Download and install Rust
source $HOME/.cargo/env              # Add Rust to your PATH
rustup update nightly                # Update to the nightly version
rustup target add wasm32-unknown-unknown --toolchain nightly  # Add WebAssembly target
rustc --version                      # Verify Rust installation by displaying the version
```

### 2. Clone the Relay Node Repository

Clone the [Relay Node project repository](https://github.com/availproject/avail-light-relay) from GitHub:

```bash
git clone https://github.com/availproject/avail-light-relay.git
```

### 3. Compile the Binary

Navigate to the project directory and compile the source code:

```bash
cd avail-light-relay                 
cargo build --release                # Compile the project in release mode
```

Upon successful compilation, the binary will be located at `target/release/avail-light-relay`.

### 4. Deploy the Binary

If you've compiled the binary locally, transfer it to your server using `scp` or another secure method.

### 5. Create and Edit the Configuration File

On your server, navigate to the directory where you've placed the binary. Create and edit a `config.yaml` file:

```bash
touch config.yaml                    # Create a new config.yaml file
nano config.yaml                     # Open the file in a text editor
```

To avoid conflicts between nodes, especially if they are running on the same machine or network, consider the following:

- `libp2p_port`: This could potentially cause a conflict if multiple nodes are running on the same machine and trying to bind to the same port. Each node on the same machine should have a unique port.

- `secret_key`: If this is used for cryptographic operations like signing messages, then using the same key across different nodes could be a security risk and could also lead to logical errors in the network operation.

Use the following example configuration:

```yaml
log_level: 'INFO'                    # Logging level
log_format_json: false               # Log format
secret_key: { seed: "unique_seed" }  # Secret key setting
libp2p_port: 39000                   # libp2p port
libp2p_identify_protocol: '/avail_kad/id/1.0.0'  # libp2p protocol
```

For more advanced configurations, consult the [Configuration Reference](https://github.com/availproject/avail-light-relay#config-reference).

Congratulations! You've successfully set up a relay Node. Your node is now ready to assist with connectivity issues between light clients in your network. Happy relaying! 🚀
