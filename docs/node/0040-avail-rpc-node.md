---
id: avail-rpc-node
title: How to Run an RPC Node
sidebar_label: Run an RPC Node
sidebar_position: 3
description: Learn how to run a rpc node
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-rpc-node
---
import useBaseUrl from '@docusaurus/useBaseUrl';

To run an rpc node you must first reveiw the [archive node](0030-avail-archive-node.md) setup. You will complete the same steps. The only difference is you will add `--rpc-external --ws-external --rpc-port 9944 --ws-port 9933 --rpc-cors=all` to the paramaters. 

You will then be able to communicate with node using `http` or `ws` endpoints. The default ports are 9933 for HTTP and 9944 for WS.

Example for an rpc node start command:
```
./data-avail --base-path ~/avail-node/data \
                --chain ~/avail-node/chainspec.raw.json \
                --pruning archive \
                --port 30333 \
                --rpc-external --ws-external --rpc-port 9933 --ws-port 9944 --rpc-cors=all \
                --bootnodes /dns/gateway-fullnode-002.testnet.avail.tools/tcp/30333/p2p/12D3KooWNuBaLtAGNxQbei7rUzpp8N8TF8k5kPsgKShAJgK4crkB \
                /dns/gateway-fullnode-001.testnet.avail.tools/tcp/30333/p2p/12D3KooWDgqCRtsJWKjckh2XHtRZbboVdgDJswsxoNmX8PMf59bV \
                /dns/gateway-fullnode-003.testnet.avail.tools/tcp/30333/p2p/12D3KooWBNy1vzragtwiummqXwry19h6dke68hybY6jVeEH4mAtT
```

:::info Firewall

Ensure that you have added the rpc ports used to your firewall

:::

You can test that your rpc is running correctly with a smple curl command. A working rpc will reply with data while a non working rpc will reply with an error.
```
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' http://127.0.0.1:9933/
```
