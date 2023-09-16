---
id: avail-light-client-overview
title: How to Configure a Light Client
sidebar_label: Configure a Light Client
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
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

The Avail light client is *heavily* customizable with the most important parameters being exposed through its config file, the full config reference can be found [here](https://github.com/availproject/avail-light#config-reference). The default config files for both light and fat client mode of operations can be found bellow.

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
# Set to actual bootstrap peer ID and multiaddress
bootstraps = [["12D3KooWStAKPADXqJ7cngPYXd2mSANpdgh1xQ34aouufHA2xShz", "/ip4/127.0.0.1/tcp/39000"]]
```

For monitoring purposes, **Prometheus** is used.

### Application client

The app client mode is used by individual apps to download, reconstruct and locally store relevant app data.
Application data is primarily downloaded from the DHT, either by downloading individual block matrix rows or with per-cell approach, downloading relevant individual cells.
RPC is (again) used as a fallback mechanisms, if DHT doesn't contain the data.

Downloaded and reconstructed data is exposed through a HTTP endpoint, with port configured by the `http_server_port` parameter.

App client mode is activated by setting the `app_id` to a value greater than `0`.
