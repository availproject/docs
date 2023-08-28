---
id: avail-explorer
title: Using the Explorer
sidebar_label: Using the Explorer
sidebar_position: 1
description: Using the Avail Explorer
keywords:
  - docs
  - avail
  - explorer
  - accounts
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-explorer
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The Avail network features a full-featured
[explorer](https://kate.avail.tools/) that can be used to observe and
interact with the Avail network in several ways. It can be used to:

1. Inspect blocks, events, and general network-related data.
2. Manage your accounts and send transactions.
3. Participate in governance.
4. Manually submit
   [transactions](https://docs.substrate.io/v3/concepts/extrinsics/),
   make RPC calls, and other development/debugging tasks.

## Recent Blocks Overview

The default explorer page displays recent blocks as they are produced
by the chain:

![Avail Explorer](/img/avail/explorer.png)

## Block Details

Clicking on a block number (or block "height") opens up a detailed
view of that block:

![Avail Explorer Block Detail](/img/avail/explorer-block-detail.png)

:::info Confidence

The explorer hosts a light client which performs DAS to verify data
availability. The very latest blocks will not display a confidence
score until that process is complete. Note that your own light clients
may be configured to guarantee a higher degree of confidence. See our
[FAQ](/faq) for more information.

:::
