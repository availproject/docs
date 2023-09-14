---
id: avail-bootstrap-node
title: How to Run a Bootstrap Node
sidebar_label: Bootstrap Node
description: "Learn how to run an Avail bootstrap node."
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This guide provides a step-by-step walkthrough for setting up a bootstrap node, which serves as an entry point for light clients in your network.
bootstrap nodes play a vital role in network stability and discoverability. They help new nodes join the network, assist in peer discovery, and often serve as a fallback mechanism to maintain network connectivity. 

It's advisable to deploy multiple bootstrap nodes. A good rule of thumb is to have at least three to five bootstrap nodes to kickstart a new network. 
Follow the installation and configuration steps below to get your bootstrap node up and running.

## Prerequisites

- A local machine or a cloud-based Virtual Machine (VM)
- Basic familiarity with command-line operations
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

### 2. Clone the Bootstrap Node Repository

Clone the [Bootstrap Node project repository](https://github.com/availproject/avail-light-bootstrap/tree/main) 
from GitHub to your local machine or VM:

```bash
git clone https://github.com/availproject/avail-light-bootstrap.git
```

### 3. Compile the Binary

Navigate to the cloned project directory and compile the source code:

```bash
cd avail-light-bootstrap              
cargo build --release                 # Compile the project in release mode
```

Upon successful compilation, you'll find the binary at `target/release/avail-light-bootstrap`.

### 4. Deploy the Binary

If you've compiled the binary on a local machine, transfer it to your server using `scp` or any other secure method.

### 5. Create and Edit the Configuration File

On your server, navigate to the directory where you've placed the binary. Create and edit a `config.yaml` file:

```bash
touch config.yaml                     # Create a new config.yaml file
nano config.yaml                      # Open the file in a text editor
```

Populate the file with the following example configuration:

```yaml
log_level: 'INFO'                     # Logging level
log_format_json: false                # Log format
secret_key: { seed: "unique_seed" }  # Secret key setting
libp2p_port: 39000                    # libp2p port
libp2p_identify_protocol: '/avail_kad/id/1.0.0'  # libp2p protocol
```

For more advanced configurations, consult the [Configuration Reference](https://github.com/availproject/avail-light-bootstrap#config-reference).

Congratulations! You've successfully set up a Bootstrap Node. Your node is now ready to serve as an entry point for light clients in your network. Happy bootstrapping! 🚀
