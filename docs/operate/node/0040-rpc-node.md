---
id: rpc
title: How to Run an RPC Node
sidebar_label: RPC Node
description: Learn how to run a rpc node
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide offers a walkthrough for configuring and running an RPC node, enabling seamless interaction with the Avail network via HTTP and WebSocket.

:::note Before you start

**Ensure that you meet the [<ins>system requirements</ins>](/docs/operate/requirements.md).**

Before setting up an RPC node, make sure to review the [archive node setup process](/docs/operate/node/0020-full-node-binaries.md#archive-mode). The setup process for an RPC node is almost identical, with a few additional parameters to enable RPC functionality.

:::

## Configuration Parameters

To run an RPC node, append the following flags to your startup command:

- `--rpc-external`
- `--ws-external`
- `--rpc-port 9944`
- `--ws-port 9933`
- `--rpc-cors=all`

These flags enable external RPC and WebSocket connections and set the default ports to 9933 for HTTP and 9944 for WebSocket (WS).

## Example Startup Command

Here's an example command to start your RPC node:

```bash
./data-avail -d ~/avail-node/data --chain goldberg --pruning archive \
             --rpc-external --ws-external --rpc-port 9933 --ws-port 9944 --rpc-cors=all 
```

:::info Firewall Configuration
Make sure to add the RPC ports (9933 for HTTP and 9944 for WS) to your firewall's allowed list to ensure smooth communication.
:::

## Testing Your RPC Node

You can verify that your RPC node is running correctly by executing a simple `curl` command. A functioning RPC node will return data, while a non-functioning one will return an error.

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' http://127.0.0.1:9933/
```
