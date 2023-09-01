---
id: full-node-docker
title: How to Run a Full Node using Docker
sidebar_label: Run a Full Node Using Docker
sidebar_position: 2
description: "Learn how to run an Avail full node using Docker."
keywords:
  - docs
  - avail
  - node
  - full node
  - data availability
  - da
  - docker
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';


The Avail team provides official Docker images designed to run nodes on the **Kate testnet**. While these guidelines focus on setting up a Full Node, they can easily be modified to accommodate the requirements for running a validator node.

## Before You Start

The following instructions are tailored for Linux distribution with `apt` support, such as Debian.
Note that the available Docker images are compatible only with **Linux/amd64 or x86_64 based** CPUs. Running nodes on a cloud server is also common.
Recommended hardware specifications for your environment are provided below:
hardware specs that your environment should have:

| Minimum                            | Recommended                         |
|------------------------------------|-------------------------------------|
| 4GB RAM                            | 8GB RAM                             |
| 2 core CPU amd64/x86 architecture  | 4 core CPU  amd64/x86 architecture  |
| 20-40 GB SSD                       | 200-300 GB SSD                      |

**Port 30333** is typically required for peer exchange. Ensure this port, along with any others needed for machine access, is open when setting up your firewall or cloud provider's security groups.

#### Info Alternate networks & releases

All instructions below are for the **Kate testnet** network. To join a
different network, you may need to download a different node version
from the [node releases
page](https://github.com/availproject/avail/releases) and a chain
specification file for the specific network. Contact the Avail team if
you have questions.

## Useful Links

[Dockerhub Repository](https://hub.docker.com/r/availj/avail/tags)

[Github Releases](https://github.com/availproject/avail/releases)

## Initial Setup

At this point, you should have shell access with root privileges to a linux machine.

### Install Docker 
Most likely your operating system won’t have Docker installed by default. Please follow the instructions for your particular distribution found here: https://docs.docker.com/engine/install/

We’re following the instructions for Ubuntu. The steps are included below, but please see the official instructions in case they’ve been updated.

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

At this point you should have Docker installed.

In many cases, it’s inconvenient to run docker as **`root`** user so we’ll follow the post install steps [here](https://docs.docker.com/engine/install/linux-postinstall/) in order to interact with docker without needing to be **`root:`**

```bash
sudo groupadd docker
sudo usermod -aG docker $USER

```

Now you should be able to logout and log back in and run docker commands without **`sudo.`**
## Disk Setup

The exact steps required here are going to vary a lot based on your needs. Most likely you’ll have a root partition running your operating system on one device. You’ll probably want one or more devices for actually holding the blockchain data. For the rest of the walkthrough, we’re going to have that additional device mounted at **`/mnt/avail`**.

Before Mounting the Additional Disk it is recommended to format that disk for Use and Create a Filesystem You can [Follow Here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html) for that.

In this example, we have a device with 300 GB of available space located at **`/dev/nvme1n1`**. We are going to mount that using the steps below:

```bash
sudo mkdir /mnt/avail
sudo mount -a /dev/nvme1n1 /mnt/avail
```
We use **`df -h`** to make sure the mount looks good.

If that all looks good, we might as well create Additional Sub-Directories for our DATA and config store

```bash
sudo mkdir /mnt/avail/config
sudo mkdir /mnt/avail/state
sudo mkdir /mnt/avail/keystore
```

Depending on your use case and operating system, you’ll likely want to create an entry in **`/etc/fstab`** in order to make sure your device is mounted when the system reboots.

In our case we're following some steps like this:

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
At this point you should be able to reboot and confirm that the system loads your mount properly.

## Avail setup

Download the Correct Chaispec file for the network in our case we are using the **`Kate-Testnet`** Chainspec.

   
   | Network      |Docker Hub |  Chain Specification File | Chain Info Reference|
   |--------------|-----------|--------------------------|----------------------|
   | Kate Testnet |[Releases](https://hub.docker.com/r/availj/avail/tags)|[chainspec.raw.json](/configs/kate/chainspec.raw.json) | [Chain Info](/configs/kate/chaininfo.txt) |

In our case we will download the chainspec into our config folder as `kate-chainspec.raw.json`

```bash
curl -L -o /mnt/avail/config/kate-chainspec.raw.json https://raw.githubusercontent.com/availproject/availproject.github.io/main/static/configs/kate/chainspec.raw.json
```
Now that we have Our Chainspec config Downlaoded Let's start our Avail Node.

```bash
cd /mnt/avail

sudo docker run -v $(pwd)/config/kate-chainspec.raw.json:/da/genesis/chainspec.raw.json -v $(pwd)/state:/da/state:rw -v $(pwd)/keystore:/da/keystore:rw -e DA_CHAIN=/da/genesis/chainspec.raw.json -e DA_NAME=kate-docker-avail-Node -p 0.0.0.0:30333:30333 -p 9615:9615 -p 9933:9933 -d --restart unless-stopped availj/avail:v1.6.2-rc1
```

in the above command steps include:

- changing directory to `/mnt/avail` so we are in correct directory 
- we have mounted the `/mnt/avail/config/kate-chainspec.raw.json` to `/da/genesis/chainspec.raw.json` of the docker container so that the chainspec is correct
- `/mnt/avail/state` to `/da/state` and gave it permission to read and write both so that our da data is stored on the separate disk and is presistent in case of even the container crashes.
- `DA_CHAIN` suggest which chainspec file to use inside the container
- `DA_NAME` is Name of your node you can give if any name in our example we have given kate-docker-avail-Node
- ports convention **`30333`** is used for public `p2p connection` **`9615`** is the `prometheus metrics endpoint port` and **`9933`** is the `http rpc port` if you also want to add `websocket` you add port **`9944`** in the docker command.
- image we have used if from the availj docker hub repository
- you can add any chain flag you want after the image name as --rpc ... 

check the docker logs to see if the node is working fine or not .

```bash
ubuntu:/mnt/avail# docker ps
CONTAINER ID   IMAGE                     COMMAND            CREATED         STATUS         PORTS                                                                                                            NAMES
5b3978de8f35   availj/avail:v1.6.2-rc1   "/entrypoint.sh"   6 minutes ago   Up 6 minutes   0.0.0.0:9615->9615/tcp, :::9615->9615/tcp, 0.0.0.0:9933->9933/tcp, 0.0.0.0:30333->30333/tcp, :::9933->9933/tcp   relaxed_wilson
ubuntu:/mnt/avail# docker logs 5b3978de8f35
# 5b3978de8f35 is the container id 
```

```shell
2023-08-21 08:29:55 Avail Node
2023-08-21 08:29:55 ✌️  version 1.6.2-bb4cc104b25
2023-08-21 08:29:55 ❤️  by Anonymous, 2017-2023
2023-08-21 08:29:55 📋 Chain specification: Avail Kate Testnet
2023-08-21 08:29:55 🏷  Node name: kate-docker-avail-Node
2023-08-21 08:29:55 👤 Role: FULL
2023-08-21 08:29:55 💾 Database: RocksDb at /da/state/chains/Avail Testnet_116d7474-0481-11ee-bc2a-7bfc086be54e/db/full
2023-08-21 08:29:55 ⛓  Native runtime: data-avail-11 (data-avail-0.tx1.au11)
2023-08-21 08:30:04 🏷  Local node identity is: 12D3KooWEdgyAtH8ZCU8ScTx1hx5NWh4gmDGNcedtLxrJ1htSeBe
2023-08-21 08:30:04 Prometheus metrics extended with avail metrics
2023-08-21 08:30:04 💻 Operating system: linux
2023-08-21 08:30:04 💻 CPU architecture: x86_64
2023-08-21 08:30:04 💻 Target environment: gnu
2023-08-21 08:30:04 💻 CPU: Intel(R) Xeon(R) Platinum 8175M CPU @ 2.50GHz
2023-08-21 08:30:04 💻 CPU cores: 1
2023-08-21 08:30:04 💻 Memory: 7835MB
2023-08-21 08:30:04 💻 Kernel: 5.15.0-1040-aws
2023-08-21 08:30:04 💻 Linux distribution: Debian GNU/Linux 11 (bullseye)
2023-08-21 08:30:04 💻 Virtual machine: yes
2023-08-21 08:30:04 📦 Highest known block at #9150
2023-08-21 08:30:04 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-08-21 08:30:04 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-08-21 08:30:04 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-08-21 08:30:04 🏁 CPU score: 671.55 MiBs
2023-08-21 08:30:04 🏁 Memory score: 4.47 GiBs
2023-08-21 08:30:04 🏁 Disk score (seq. writes): 339.36 MiBs
2023-08-21 08:30:04 🏁 Disk score (rand. writes): 62.48 MiBs
2023-08-21 08:30:05 🔍 Discovered new external address for our node: /ip4/13.53.42.153/tcp/30333/ws/p2p/12D3KooWEdgyAtH8ZCU8ScTx1hx5NWh4gmDGNcedtLxrJ1htSeBe2023-08-21 08:30:09 ⚙️  Syncing, target=#326624 (15 peers), best: #9406 (0x875e…c887), finalized #9317 (0x37b6…28ff), ⬇ 321.9kiB/s ⬆ 30.1kiB/s
2023-08-21 08:30:14 ⚙️  Syncing 64.4 bps, target=#326624 (15 peers), best: #9728 (0xb4fe…e318), finalized #9317 (0x37b6…28ff), ⬇ 40.2kiB/s ⬆ 1.8kiB/s
```

It will also be listed on the [Avail
   Telemetry](http://telemetry.avail.tools/) site under the "Node
   name" that appears in the node command output. Note that there are
   network tabs at the top, select the one for the network you joined.

That's all! You are now running an Avail full node 🎉
