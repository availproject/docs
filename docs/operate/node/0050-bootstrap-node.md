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

### Step 1: Compile the Binary

Navigate to the cloned project directory and compile the source code:

```bash
cd avail-light-bootstrap              
cargo build --release                 # Compile the project in release mode
```

Upon successful compilation, you'll find the binary at `target/release/avail-light-bootstrap`.

### Step 2: Deploy the Binary

If you've compiled the binary on a local machine, transfer it to your server using `scp` or any other secure method.

### Step 3: Create and Edit the Configuration File

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
