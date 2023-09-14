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

## Methods to Run an Avail Node

There are two primary methods to run an Avail node, each with its own set of instructions:

1. **[<ins>Using Binaries</ins>](/docs/validators/validator-node/validator-node-binaries.md):** You can follow the instructions provided here for setting up an Avail node using binary releases. This method is suitable for users who prefer manual installation and configuration. For reference, you can also explore the [GitHub Releases](https://github.com/availproject/avail/releases) page for binary releases.

2. **[<ins>Using Docker</ins>](/docs/validators/validator-node/validator-node-docker.md):** Alternatively, if you're comfortable with Docker, you can pull Avail node images from the [DockerHub Repository](https://hub.docker.com/r/availj/avail/tags). Docker provides a convenient way to containerize and deploy Avail nodes.
> The Avail team offers official Docker images specifically designed for running nodes on the Kate testnet.

<details>
<summary>Install Docker</summary>

If Docker is not already installed on your system, please follow the installation instructions provided [here](https://docs.docker.com/engine/install/). In this guide, we will use the **Ubuntu-specific** installation instructions, but it's advisable to refer to the official guidelines for the most up-to-date information.

To install Docker, execute the following commands:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

At this point, you should have Docker installed. To ensure a more convenient user experience and avoid running Docker as the root user (which can be inconvenient), follow the post-installation steps [here](https://docs.docker.com/engine/install/linux-postinstall/). These steps enable you to interact with Docker without requiring root privileges:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

</details>

## Setting Up Your Environment

If you haven't already, make sure to check if your system meets the hardware requirements. You can find the hardware requirements [<ins>here</ins>](/docs/validators/requirements.md).

This section provides specific instructions tailored for Linux distributions with apt support, such as **Debian**. It's worth noting that the available Docker images are compatible exclusively with **Linux/amd64** or **x86_64** based CPUs. Additionally, it's common practice to run nodes on cloud servers.

When configuring your environment, take into account the following:

**Port 30333** is typically required for peer exchange. Ensure that this port, along with any others needed for machine access, is open when configuring your firewall or your cloud provider's security groups.

### Installation Packages for Full Node

| Installation Type | Network      | Source/Hub             | Chain Specification File                                      | Chain Info Reference                                                               |
|-------------------|--------------|------------------------|---------------------------------------------------------------|------------------------------------------------------------------------------------|
| Docker            | Kate Testnet | [Docker Hub](https://hub.docker.com/r/availj/avail/tags)      | [chainspec.raw.json](https://kate.avail.tools/#/explorer/chainspec)                 | [Chain Info](https://availproject.github.io/assets/files/chaininfo-de1eeff4d63715bbec85aae81a956d40.txt) |
| Binaries          | Kate Testnet | [v1.6.2-rc1](https://github.com/availproject/avail/releases/tag/v1.6.2-rc1) | [chainspec.raw.json](https://kate.avail.tools/#/explorer/chainspec)                 | [Chain Info](https://availproject.github.io/assets/files/chaininfo-de1eeff4d63715bbec85aae81a956d40.txt) |

### Disk Setup Example

For disk setup, you'll typically have a root partition for the operating system on one device, and one or more separate devices for storing blockchain data. In this guide, we'll assume the additional storage device is mounted at `/mnt/avail`.

Before mounting the additional disk, it's advisable to format it and create a filesystem. For guidance, you can [follow these instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html).

Here's an example of working with a 300 GB device located at `/dev/nvme1n1`. Mount the device with these steps:

```bash
sudo mkdir /mnt/avail
sudo mount -a /dev/nvme1n1 /mnt/avail
```

Use `df -h` to verify the successful configuration.

If everything looks good, create sub-directories for data and configuration files:

```bash
sudo mkdir /mnt/avail/config
sudo mkdir /mnt/avail/state
sudo mkdir /mnt/avail/keystore
```

Depending on your use case and operating system, you may need to add an entry to `/etc/fstab` to ensure the device remains mounted after system reboots.
In our scenario, we'll proceed as follows:

```bash
# Use blkid to get the UUID for the device that we're mounting

blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}      /mnt/data   {your filesystem}   defaults    0   1
sudo emacs /etc/fstab

#you can use any test editor based on your prefereance to edit the file here we have used emacs .

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

### Alternate Networks & Releases Information

The instructions provided here are specifically for the **Kate testnet**. If you need to connect to a different network, you may have to download an alternate node version from the [node releases page](https://github.com/availproject/avail/releases) and obtain the corresponding chain specification file.

## How Many Tokens Do I Need to Become an Active Validator?

To become an active validator, you'll need a certain number of tokens for staking. Please refer to the [Faucet guide](/docs/about/faucet.md) on obtaining test AVL tokens.

If you have any questions or need further assistance, don't hesitate to get in touch with the Avail team for guidance and support.
