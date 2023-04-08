---
id: avail-light-client-da
title: Build and Run a Light Client with Data Availability
sidebar_label: Run a Light Client
description: Learn about building and running a Light Client with Data Availability
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-light-client-da
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Build & Run `avail-light` & `data-avail`

First clone the Light client repo 

```
git clone https://github.com/availproject/avail-light.git
```

then create a config file( if you don't create a file it will be automatically generated with default values)

```
http_server_host = "127.0.0.1"
http_server_port = "7000"

libp2p_seed = 1
libp2p_port = "37000"
ipfs_path = "avail_ipfs_store"

# put full_node_rpc = https://testnet.polygonavail.net/rpc incase you are connecting to devnet
full_node_rpc = ["http://127.0.0.1:9933"]
# put full_node_ws = wss://testnet.polygonavail.net/ws incase you are connecting to devnet
full_node_ws = ["ws://127.0.0.1:9944"]
# None in case of default Light Client Mode
app_id = 1
# sync_blocks_depth=400

confidence = 92.0
avail_path = "avail_path"
secret_key = { seed =  "1" }

bootstraps = []


# See https://docs.rs/log/0.4.14/log/enum.LevelFilter.html for possible log level values
log_level = "INFO"
```

You can also read the readme file for config values

https://github.com/availproject/avail-light#config-reference


Run the Light client with following config
```
cargo run -- -c config.yaml
```
