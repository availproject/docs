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
./data-avail --validator -d ./data --chain goldberg --name MyAvailNode
```

The node will output the following when started:

```bash
2023-11-07 17:32:02 Avail Node    
2023-11-07 17:32:02 ✌️  version 1.8.0-9c5f37b9230    
2023-11-07 17:32:02 ❤️  by Anonymous, 2017-2023    
2023-11-07 17:32:02 📋 Chain specification: Avail Goldberg Testnet    
2023-11-07 17:32:02 🏷  Node name: abusive-foot-8197    
2023-11-07 17:32:02 👤 Role: AUTHORITY    
2023-11-07 17:32:02 💾 Database: RocksDb at /tmp/substratex6JdRn/chains/avail_goldberg_testnet/db/full    
2023-11-07 17:32:03 🔨 Initializing Genesis block/state (state: 0x6bc7…ec83, header-hash: 0x6f09…a7ae)    
2023-11-07 17:32:03 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.    
2023-11-07 17:32:03 👶 Creating empty BABE epoch changes on what appears to be first startup.    
2023-11-07 17:32:03 🏷  Local node identity is: 12D3KooWFtjJFk9e5qS4jNWTPSUhTcpSLzeY25P3MeAhzDg6PHwd    
2023-11-07 17:32:03 Prometheus metrics extended with avail metrics    
2023-11-07 17:32:03 💻 Operating system: linux    
2023-11-07 17:32:03 💻 CPU architecture: x86_64    
2023-11-07 17:32:03 💻 Target environment: gnu    
2023-11-07 17:32:03 💻 CPU: 13th Gen Intel(R) Core(TM) i7-13700K    
2023-11-07 17:32:03 💻 CPU cores: 16    
2023-11-07 17:32:03 💻 Memory: 31863MB    
2023-11-07 17:32:03 💻 Kernel: 6.5.8-100.fc37.x86_64    
2023-11-07 17:32:03 💻 Linux distribution: Fedora Linux 37 (Workstation Edition)    
2023-11-07 17:32:03 💻 Virtual machine: no    
2023-11-07 17:32:03 📦 Highest known block at #0    
2023-11-07 17:32:03 〽️ Prometheus exporter started at 127.0.0.1:9615    
2023-11-07 17:32:03 Running JSON-RPC server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]    
2023-11-07 17:32:03 🏁 CPU score: 1.64 GiBs    
2023-11-07 17:32:03 🏁 Memory score: 22.77 GiBs    
2023-11-07 17:32:03 🏁 Disk score (seq. writes): 6.70 GiBs    
2023-11-07 17:32:03 🏁 Disk score (rand. writes): 2.66 GiBs    
2023-11-07 17:32:03 👶 Starting BABE Authorship worker    
2023-11-07 17:32:04 🔍 Discovered new external address for our node: /ip4/176.61.156.176/tcp/30333/p2p/12D3KooWFtjJFk9e5qS4jNWTPSUhTcpSLzeY25P3MeAhzDg6PHwd  
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
ExecStart=/home/avail/avail-node/data-avail -d /home/avail/avail-node/data --chain goldberg --validator --name MyAvailNode

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
