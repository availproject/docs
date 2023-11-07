---
id: binaries
title: How to Run a Validator Node using Binaries
sidebar_label: Using Binaries
description: 'Learn about running an Avail validator using binaries.'
keywords:
  - docs
  - avail
  - node
  - validator
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Preliminaries

Validator nodes hold a pivotal role in maintaining network integrity by staking real-value tokens. Successfully managing a validator comes with a comprehensive grasp of node operations, hardware configuration, and constant vigilance. Validators face the potential consequences of penalties, such as slashing, for infractions like extended periods of offline activity or equivocation. This responsibility underscores the need for a profound understanding of the associated risks.

:::warning System administration

While Avail is currently in its testnet phase, running validator nodes requires significant system administration expertise.

:::

Becoming a validator is a significant responsibility because mistakes or errors can jeopardize not just your tokens but also your reputation, given your role in managing both your stake and that of your nominators. Despite these challenges, it offers a rewarding chance to enhance network security and be incentivized.

:::info Onboarding

Please join the [<ins>Avail Discord</ins>](https://discord.com/invite/y6fHnxZQX8) for up-to-date information on the Goldberg Testnet and
validator onboarding.

:::

## Run a Validator Node

First, follow the steps for running a full node as outlined in the
[Full Node Setup Instructions](/category/run-a-validator-node/).

To run a validator node, you'll use the same command as the full node with the addition of the `--validator` option.

For example:

```bash
./data-avail --validator \
    --port 30333 \
    --base-path `pwd`/data \
    --chain goldberg
```

The node will output the following when started:

```
2023-06-03 20:36:29 Avail Node
2023-06-03 20:36:29 ✌️  version 1.6.0-99b85257d6b
2023-06-03 20:36:29 ❤️  by Anonymous, 2017-2023
2023-06-03 20:36:29 📋 Chain specification: Avail Goldberg Testnet
2023-06-03 20:36:29 🏷  Node name: bewildered-distance-1229
2023-06-03 20:36:29 👤 Role:Authority
2023-06-03 20:36:29 💾 Database: RocksDb at /Users/thunder/code/avail/data/chains/Avail Testnet_6831251e-0222-11ee-a2c3-c90377335962/db/full
2023-06-03 20:36:29 ⛓  Native runtime: data-avail-9 (data-avail-0.tx1.au11)
2023-06-03 20:36:35 👶 Creating empty BABE epoch changes on what appears to be first startup.
2023-06-03 20:36:35 🏷  Local node identity is: 12D3KooWPt7odw3aeq7azZDugXjNuUvQNPU58n1VRBzY1YBqsjkr
2023-06-03 20:36:35 Prometheus metrics extended with avail metrics
2023-06-03 20:36:35 💻 Operating system: macos
2023-06-03 20:36:35 💻 CPU architecture: aarch64
2023-06-03 20:36:35 📦 Highest known block at #0
2023-06-03 20:36:35 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-06-03 20:36:35 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 🏁 CPU score: 724.71 MiBs
2023-06-03 20:36:35 🏁 Memory score: 41.49 GiBs
2023-06-03 20:36:35 🏁 Disk score (seq. writes): 1.91 GiBs
2023-06-03 20:36:35 🏁 Disk score (rand. writes): 454.66 MiBs
```

**Please take note that the role now displays as `Authority`, indicating that your node is operating as a validator node.**

> If you were previously running a full node and added the `--validator` flag after syncing, you may encounter an error expecting an archive database. In such cases, it's necessary to purge the existing database and then restart the node.

For the best practice, it is highly recommended to run your node as a service.

```
sudo tee /etc/systemd/system/availd.service > /dev/null <<'EOF'
[Unit]
Description=Avail Validator
After=network.target
StartLimitIntervalSec=0

[Service]
User=avail
Type=simple
Restart=always
RestartSec=120
ExecStart=/home/avail/avail-node/data-avail --base-path /home/avail/avail-node/data --chain /home/avail/avail-node/chainspec.raw.json --port 30333 --validator --name MyAvailNode

[Install]
WantedBy=multi-user.target
EOF
```

Enable auto restart on for your Avail node:

```bash
sudo systemctl daemon-reload
sudo systemctl enable availd.service
```

Start your avail node:

```bash
sudo systemctl start availd.service
```

Check the node is running:

```bash
sudo systemctl status availd.service
```

View the logs from the running service:

```bash
journalctl -f -u availd.service
```
