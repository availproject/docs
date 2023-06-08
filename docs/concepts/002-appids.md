---
id: app-ids
title: Application IDs
sidebar_label: Application IDs
sidebar_position: 2
description: Learn about how multiple chains can use Avail at the same time
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
  - appid
  - application IDs
  - applications
  - modular chains
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: app-ids
---

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
the block at random to verify availability. Learn more about DAS on
our [FAQ](/faq).
