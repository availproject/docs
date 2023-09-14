---
id: validator-before-starting
title: Before You Start
sidebar_label: Before You Start
description: "Learn about running an Avail validator using binaries."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Running an Avail Node

There are two primary methods to run an Avail node, each with its own set of instructions:

1. **[<ins>Using Binaries</ins>](/docs/validators/validator-node/validator-node-binaries.md):** You can follow the instructions provided here for setting up an Avail node using binary releases. This method is suitable for users who prefer manual installation and configuration. For reference, you can also explore the [GitHub Releases](https://github.com/availproject/avail/releases) page for binary releases.

2. **[<ins>Using Docker</ins>](/docs/validators/validator-node/validator-node-docker.md):** Alternatively, if you're comfortable with Docker, you can pull Avail node images from the [DockerHub Repository](https://hub.docker.com/r/availj/avail/tags). Docker provides a convenient way to containerize and deploy Avail nodes.
> The Avail team offers official Docker images specifically designed for running nodes on the Kate testnet.

## Environment Information

This section provides specific instructions tailored for Linux distributions with apt support, such as **Debian**. It's worth noting that the available Docker images are compatible exclusively with **Linux/amd64** or **x86_64** based CPUs. Additionally, it's common practice to run nodes on cloud servers.

When configuring your environment, take into account the following:

**Port 30333** is typically required for peer exchange. Ensure that this port, along with any others needed for machine access, is open when configuring your firewall or your cloud provider's security groups.

## Alternate Networks & Releases Information

The instructions provided here are specifically for the **Kate testnet**. If you need to connect to a different network, you may have to download an alternate node version from the [node releases page](https://github.com/availproject/avail/releases) and obtain the corresponding chain specification file. If you have any questions or require assistance, don't hesitate to reach out to the Avail team.
