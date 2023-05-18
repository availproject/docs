---
id: avail-light-client-overview
title: Light Client Overview
sidebar_label: Light client overview
description: Short summary of light client use
keywords:
  - docs
  - avail
  - data
  - availability
  - light client
  - DHT
  - Kademlia
  - data sampling
# image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-light-client-overview
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

## General concepts

Avail light client (LC) lets you interact with Avail blockchain without requiring a full node and without trust assumptions towards remote peers.
This is accomplished by leveraging **Data Availability Sampling (DAS)** performed by the light client on every newly created block.

The light client listens on the Avail network for finalized blocks and performs DAS on a predetermined number of cells on each new block.
After successful block verification, **block confidence** is calculated for a number of cells in the matrix, with the number depending on the percentage of certainty the users wishes to achieve.

Light client functionality is separated into two logical parts - the *light client* and the *app client*. While the LC is primarily focused on DAS, the app client is used to perform data reconstruction.

### Light client

The **light client** mode of operation is active regardless of whether the app client is also active or not. 
Light client connects to an Avail node via a WebSocket connection and waits for a newly finalized block, with the header containing its KZG commitments.

:::info
Avail blocks are chunked and divided into equal sized cells as a part of that blocks matrix. Each row in the matrix is then erasure coded using **Reed-Solomon (RS)** erasure codes and committed with **Kate-Zaverucha-Goldberg (KZG)** commitments.
:::

On each received header the client does random sampling of the matrix cells, which are retrieved using one of two mechanisms:

1. **DHT** - the client first tries to retrieve cells via Kademlia DHT, on the LC-only high availability peer-to-peer network.
2. **RPC** - if some or all of the required cells can't be found on the DHT, LC uses RPC calls to the Avail node(s) to retrieve the data. Cells not already found in the DHT will be uploaded thus increasing blocks availability in the LC P2P network

Once the data is received, light client verifies individual cells and calculates the confidence that is then stored locally.

:::note
Light client uses *libp2p* with **Kademlia** as a DHT implementation. Peer-to-peer network is able to perform NAT traversal, both symmetric and asymmetric, enabling easy connectivity with various network configurations (e.g. symmetric and asymmetric NAT). 
:::

:::note
On fresh startup, the LC performs a block sync with the node, using both DHT and RPC mechanisms. The block depth to which the sync is going to be done is set with the `sync_block_depth` config parameter, which needs to be set to the max number of blocks the connected node is caching (if downloading via RPC).
:::

---

The **fat client** mode of operation is enabled by setting the `block_matrix_partition` parameter in the config file. This mode is  used to populate the DHT with the new block data by retrieving larger contiguous chunks of block matrix on each new block via RPC calls, and storing them on the DHT. The `block_matrix_partition` parameter needs to be set to a fraction of the matrix, the fraction size depending on the CPU power of the instance running the client. 

:::caution
Fat client mode is **very** resource intensive and requires a far stronger machine than the regular light client.
:::

---

Light client is *heavily* customizable with the most important parameters being exposed through its config file, the full config reference can be found [here](https://github.com/availproject/avail-light#config-reference). The default config files for both light and fat client mode of operations can be found bellow.

Light client config example:

```yaml
log_level = "info"
http_server_host = "127.0.0.1"
http_server_port = "7000"

libp2p_port = "37000"

full_node_rpc = ["http://127.0.0.1:9933"]
full_node_ws = ["ws://127.0.0.1:9944"]
app_id = 0
confidence = 92.0
avail_path = "avail_path"
prometheus_port = 9520
bootstraps = [["12D3KooWStAKPADXqJ7cngPYXd2mSANpdgh1xQ34aouufHA2xShz", "/ip4/127.0.0.1/tcp/39000"]]
```

Fat client config example:

```yaml
log_level = "info"
http_server_host = "127.0.0.1"
http_server_port = "7001"

libp2p_port = "37001"

full_node_rpc = ["http://127.0.0.1:9933"]
full_node_ws = ["ws://127.0.0.1:9944"]
app_id = 0
confidence = 92.0
avail_path = "avail_path"
prometheus_port = 9521
disable_client_sync = true
block_matrix_partition = "1/10"
query_proof_rpc_parallel_tasks = 300
max_cells_per_rpc = 1024
dht_parallelization_limit = 20
block_processing_delay = 0

bootstraps = [["12D3KooWStAKPADXqJ7cngPYXd2mSANpdgh1xQ34aouufHA2xShz", "/ip4/127.0.0.1/tcp/39000"]]
```
For monitoring purposes, **Prometheus** is used.

### Application client

The app client mode is used by individual apps to download, reconstruct and locally store relevant app data. 
Application data is primarily downloaded from the DHT, either by downloading individual block matrix rows or with per-cell approach, downloading relevant individual cells.
RPC is (again) used as a fallback mechanisms, if DHT doesn't contain the data.

Downloaded and reconstructed data is exposed through a HTTP endpoint, with port configured by the `http_server_port` parameter. 

App client mode is activated by setting the `app_id` to a value greater than `0`. 