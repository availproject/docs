---
id: introduction
title: What is Avail?
sidebar_label: What is Avail
sidebar_position: 1
description: Learn about Avail's data availability chain
keywords:
  - docs
  - avail
  - availability
  - scale
  - rollup
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: /
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Avail is a **modular blockchain** that is laser-focused on **data
availability**: ordering, publishing transactions, and making it
possible to verify that block data is available without downloading
the whole block. This modular approach with a strong data availability
layer at the core enables scalability while maintaining security.

Since Avail is data-agnostic, it can support any execution
environment: EVM, WASM, custom new runtimes, etc. The modular approach
also allows a wide array of possible designs to be built on top, such
as sovereign ZK or OP appchains, general purpose rollups, sidechains,
validiums, and more. And they don't require recruiting a new validator
set, only posting transactions on Avail. Independence and flexibility
matched by shared security and scalability. 

Applications in Avail are built as one of the designs mentioned above
(such as a ZK sovereign appchain), or can be deployed as contracts on
a modular execution layer. 


## Application IDs

As a general purpose base layer, Avail is designed to support many
modular chains at the same time, providing consensus and data
availability to all of them simultaneously.

How does this work? Avail headers contain an index that allows a given
modular chain (or "application" in Avail terminology) to determine and
download _only_ the sections of a block that have data for that
particular application.

This has very important benefits, including:
* Modular applications are largely unaffected by other uses of the
  base layer at the same time.
* Block sizes can increase without requiring applications to fetch
  more data, because they don't fetch the whole block, only what's
  relevant to them.

Data availability sampling is still done on the entire block,
however--this is the process where clients sample very small parts of
the block at random to verify availability.

If you'd like to learn how your idea could
benefit from Avail, please [join our
Discord](https://discord.gg/S2XQJjHsZt). We'd love to chat.
