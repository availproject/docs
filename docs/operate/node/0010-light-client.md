---
id: light-client
title: How to Run an Avail Light Client
sidebar_label: Run a Light Client
description: 'Learn how to run an Avail Light Client.'
keywords:
  - docs
  - avail
  - node
  - light client
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide outlines how to set up an Avail light client.

## Before you start

1. Ensure you meet the hardware configuration requirements to set up an Avail light client.

| Component                    | Minimum  | Recommended |
| ---------------------------- | -------- | ----------- |
| RAM                          | 4GB      | 8GB         |
| CPU (amd64/x86 architecture) | 2 core   | 4 core      |
| Storage (SSD)                | 20-40 GB | 200-300 GB  |

2. Download the latest pre-compiled binary.

| Repository                                                            | Latest Release                                                                               |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [<ins>avail-light</ins>](https://github.com/availproject/avail-light) | [<ins>v1.7.3-rc3</ins>](https://github.com/availproject/avail-light/releases/tag/v1.7.3-rc3) |

## Run the Pre-Built Release

All you need to do is run:

```bash
./avail-light -c config.yaml
```

> Refer to the [<ins>configuration reference</ins>](https://github.com/availproject/avail-light#configuration-reference) for configuration options. See the "Using Avail" section for guides on embedding the light client.

<details>
<summary> Sample out </summary>

The client output should look like this:

```shell
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

</details>

<!--
## Option 2: Build From Source

To compile the client source code, run:

```bash
cd avail-light
cargo run
```

The client creates a default `config.yaml` file, initially unconnected to any network.

Once the build is complete, run:

```bash
./avail-light -c config.yaml
```
-->

That's it 🎉

You have successfully deployed an Avail light client.

## Next Steps

### Monitor Your Node

You can monitor the status of your node on the [<ins>Avail Telemetry</ins>](http://telemetry.avail.tools/) website.

### Run a Full Node

Consider running a full node by following the deployment guide [<ins>here</ins>](/docs/operate/node/0020-full-node-binaries.md)
