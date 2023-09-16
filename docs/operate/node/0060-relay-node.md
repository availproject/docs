---
id: relay
title: How to Run a Relay Node
sidebar_label: Relay Node
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

This guide provides a step-by-step walkthrough for setting up a relay node, which can help resolve connectivity issues between network peers.

:::note Before you start

**Ensure that you meet the [<ins>system requirements</ins>](/docs/operate/requirements.md).**

:::

## Step 1: Compile the Binary

Navigate to the project directory and compile the source code:

```bash
cd avail-light-relay                 
cargo build --release                # Compile the project in release mode
```

Upon successful compilation, the binary will be located at `target/release/avail-light-relay`.

## Step 2: Deploy the Binary

If you've compiled the binary locally, transfer it to your server using `scp` or another secure method.

## Step 3: Create and Edit the Configuration File

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
