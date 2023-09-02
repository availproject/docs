---
id: validator-docker
title: How to Run a Validator Node using Docker
sidebar_label: Run a Validator Node Using Docker
sidebar_position: 2
description: "Learn about running an Avail validator using Docker."
keywords:
  - docs
  - avail
  - node
  - docker
  - validator
  - data availability
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The Avail team provides official Docker images designed to run nodes on 
the **Kate testnet**.

## Before you start

The following instructions are tailored for Linux distribution with `apt` 
support, such as Debian.Note that the available Docker images are compatible 
only with **Linux/amd64 or x86_64 based** CPUs. Running nodes on a cloud server 
is also common. Recommended hardware specifications for your environment are 
provided below:

| Minimum                            | Recommended                         |
|------------------------------------|-------------------------------------|
| 4GB RAM                            | 8GB RAM                             |
| 2 core CPU amd64/x86 architecture  | 4 core CPU  amd64/x86 architecture  |
| 20-40 GB SSD                       | 200-300 GB SSD                      |

**Port 30333** is typically required for peer exchange. Ensure this port, 
along with any others needed for machine access, is open when setting up your 
firewall  or cloud provider's security groups.

> Useful Links:

- [DockerHub Repository](https://hub.docker.com/r/availj/avail/tags)
- [Github Releases](https://github.com/availproject/avail/releases)

#### Alternate Networks & Releases Information

The instructions provided are specifically for the **Kate testnet**.
To connect to a different network, you may need to download an alternate node 
version from the 
[node releases page](https://github.com/availproject/avail/releases) and acquire 
the corresponding chain specification file. For any queries, feel free to reach out 
to the Avail team.

## Initial Setup

At this point, you should have shell access with root privileges to a linux machine.

## Initial Setup

At this point, you should have shell access with root privileges to a linux machine.

### Install Docker

If you do not have Docker installed, please follow the installation instructions [here](https://docs.docker.com/engine/install/).

In this guide, we will use the Ubuntu-specific installation instructions. It's advisable to consult the official guidelines for the most up-to-date information.

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

At this point, you should have Docker installed.

To avoid running Docker as the **root** user, which is often inconvenient, we'll adhere to the post-installation steps outlined [here](https://docs.docker.com/engine/install/linux-postinstall/). This allows us to interact with Docker without requiring **root** privileges.

```bash
sudo groupadd docker
sudo usermod -aG docker $USER

```

You should now be able to log out and log back in, and execute Docker commands without the need for **sudo**.

## Disk Setup

The specific steps will vary significantly based on your requirements. Typically, you'll have a root partition for the operating system on one device, and one or more separate devices for storing blockchain data. For the remainder of this guide, we'll assume that the additional storage device is mounted at `/mnt/avail`.

Before mounting the additional disk, it's advisable to format it and create a filesystem. For guidance on this process, you can [follow these instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html).

In this example, we're working with a 300 GB device located at `/dev/nvme1n1`. The steps to mount this device are outlined below:

```bash
sudo mkdir /mnt/avail
sudo mount -a /dev/nvme1n1 /mnt/avail
Use the the `df -h` command to verify that the mount has been successfully configured.

If everything appears to be in order, it's advisable to create additional sub-directories for storing our data and configuration files.

```bash
sudo mkdir /mnt/avail/config
sudo mkdir /mnt/avail/state
sudo mkdir /mnt/avail/keystore
```

Based on your specific use case and operating system, you'll likely need to add an entry to `/etc/fstab` to ensure the device remains mounted upon system reboot.

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

At this stage, you should be able to reboot and verify that the system correctly mounts your device upon startup.

## Avail Setup

Download the Correct Chaispec file for the network in our case we are using the **`Kate-Testnet`** Chainspec.

   
   | Network      |Docker Hub |  Chain Specification File | Chain Info Reference|
   |--------------|-----------|--------------------------|----------------------|
   | Kate Testnet |[Releases](https://hub.docker.com/r/availj/avail/tags)|[chainspec.raw.json](/kate/chainspec.raw.json) | [Chain Info](/kate/chaininfo.txt) |

In our case we will download the chainspec into our config folder as `kate-chainspec.raw.json`

```bash
curl -L -o /mnt/avail/config/kate-chainspec.raw.json https://raw.githubusercontent.com/availproject/availproject.github.io/main/static/configs/kate/chainspec.raw.json
```

Now that we've downloaded our Chainspec configuration, let's proceed to launch our Avail Node.

```bash
cd /mnt/avail

sudo docker run -v $(pwd)/config/kate-chainspec.raw.json:/da/genesis/chainspec.raw.json -v $(pwd)/state:/da/state:rw -v $(pwd)/keystore:/da/keystore:rw -e DA_CHAIN=/da/genesis/chainspec.raw.json -e DA_NAME=kate-docker-avail-Node -p 0.0.0.0:30333:30333 -p 9615:9615 -p 9933:9933 -d --restart unless-stopped availj/avail:v1.6.2-rc1
```

Now that we've downloaded our Chainspec configuration, let's proceed to launch our Avail Node. The steps in the command include:

- Navigating to `/mnt/avail` to ensure we're in the correct directory.
- Mounting `/mnt/avail/config/kate-chainspec.raw.json` to `/da/genesis/chainspec.raw.json` in the Docker container for accurate chainspec.
- Mapping `/mnt/avail/state` to `/da/state` and granting read-write permissions to ensure data persistence, even if the container crashes.
- Using `DA_CHAIN` to specify the chainspec file within the container.
- Setting `DA_NAME` as the name of your node; in our example, it's `kate-docker-avail-Node`.
- Utilizing port **`30333`** for public P2P connections, **`9615`** for the Prometheus metrics endpoint, and **`9933`** for the HTTP RPC port. For WebSocket, add port **`9944`**.
- Using an image from the Avail Docker Hub repository.
- Adding any desired chain flags after the image name, such as `--rpc`.

Inspect the Docker logs to verify that the node is functioning as expected.

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

Your node will also appear on the [Avail Telemetry](http://telemetry.avail.tools/) 
website, listed under the "Node name" displayed in the node command output. Be sure 
to select the appropriate network tab at the top corresponding to the network you've 
joined.

## Prepare for Staking

Once the node is running and connected to the network, it needs to be
linked to accounts with bonded (staked) funds in order to be eligible
to become an active validator.

### Create Avail Accounts

We recommend creating two accounts, `stash` and `controller`, each
with their own key:
- The controller key is used to control staking actions and submitting
  transactions (paying for transaction fees).
- The stash key is used to control most of your funds. It is
  recommended that the stash key be a cold wallet or offline and not
  be used for account-related activities like submitting extrinsics.

You can create the two accounts via the Explorer interface. The Kate
network explorer is at [kate.avail.tools](https://kate.avail.tools/),
for other networks refer to the [Avail
Networks](/join-the-network/networks) page.

Once you have created the accounts, Ensure each account has enough
funds to pay the fees for making transactions. For validators
participating in our testnet, contact the Avail team to have funds
transferred.

<img src={useBaseUrl("img/avail/stash-controller-accounts.png")} width="200%" height="200%"/>

:::tip Storing Funds

Keep most of your funds in the stash account since it is meant to be
the custodian of your staking funds, and have just enough funds in the
controller account to pay for fees.

Make sure not to bond all your AVL balance since you will be unable to
pay transaction fees from your bonded balance.

:::

### Bonding Process

It is now time to set up your validator by doing the following:

- Bond the AVL of the Stash account. These token will be put at stake
   for the security of the network and subject to slashing.
- Select the Controller. This is the account that will decide when to start or stop validating.

First, go to the accounts section on the **Staking** tab in the
Explorer at
[kate.avail.tools](https://kate.avail.tools/#/staking/actions) for the
Kate network (for other networks refer to the [Avail
Networks](/join-the-network/networks) page). Here, you can perform
various staking actions. Click on Stash.

<img src={useBaseUrl("img/avail/staking-bond-1.png")} width="100%" height="100%"/>

The bonding preferences window will open with the following options:
- **Stash account:** Your Stash account.
- **Controller account:** Select your Controller account. This account
  only needs a small amount of AVL in order to start and stop
  validating.
- **Value bonded:** The amount of AVL tokens you want to bond from
  your Stash account. You may stake any amount above the minimum.
- **Payment destination:** The account where the rewards from
  validating are sent. More information can be found
  [here](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).

:::tip

You should not bond all of the AVL in that account, you will require
some AVL for transactions. Also note that you can always bond more
`AVL` later.  However, withdrawing any bonded amount requires the
duration of the unbonding period.

:::

Once populating the fields you can click bond. You will then be
promted to enter your wallet password. Enter your password and then
click **Sign and Submit**.

<img src={useBaseUrl("img/avail/staking-bond-3.png")} width="100%" height="100%"/>

You should now be ready to generate your session keys. Note the
**Session Key** button, in the next step we will generate a key to
submit here.  <img src={useBaseUrl("img/avail/staking-bond-4.png")}
width="100%" height="100%"/>

## Session Key Management

Once your node is **fully synced**, you need to rotate and submit your
session keys.

### Rotating Session Keys

Run the following command on your Avail validator node machine:
> While the node is running with the default HTTP RPC port configured.

```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the
concatenation of the four public keys.  Save this result for a later
step.

You should now restart the node so it will use the new session keys.

### Submitting the `setKeys` Transaction

You need to tell the chain your Session keys by signing and submitting
an extrinsic. This is what associates your validator with your
Controller account.

Navigate back to the [**Network &rarr;
Staking**](https://kate.avail.tools/#/staking/actions) if you
closed the window.  Ensure you are on **Account actions**, and select
**Set Session Key** on the bonding account you generated earlier.
Enter the output `from author_rotateKeys` in the field and click on
**Set Session Key**. Will be promted for password again.

<img src={useBaseUrl("img/avail/set-session-keys.png")} width="100%" height="100%"/>

After submitting this extrinsic, you will notice **Set Session Key**
changed to **Validate**. Ensure your node is in sync before
proceeding.

## Becoming a Validator

If you are ready to start validating you must click **Validate**

<img src={useBaseUrl("img/avail/start-validating.png")} width="100%" height="100%"/>

You will be prompted to enter your validator commission
percentage. Once you click on **Validate** you will be prompted for
your password.

<img src={useBaseUrl("img/avail/set-validate-commission.png")} width="100%" height="100%"/>

### Starting Validation

Your validator is now ready to start validating. You can click the
stop icon should you wish to exit. Note that the Avail interface does
not check if your node is in sync.  You need to ensure your node is in
sync. The Avail blockchain will select your node in the next epoch or
two if you have enough stake.

<img src={useBaseUrl("img/avail/validator-ready.png")} width="100%" height="100%"/>

### Verifying Validator Status

To verify that your node is ready for possible selection at the end of
the next era , navigate to [**Network &rarr;
Staking**](https://kate.avail.tools/#/staking) and select
**Waiting**. Your account should be shown there. A new validator set
is selected every **era**, based on the staking amount.

<img src={useBaseUrl("img/avail/validator-waiting-list.png")} width="100%" height="100%"/>

### Validator in Action

When the validator node has enough stake it will be elected. The image below is
an example of our elected validator node producing blocks.

<img src={useBaseUrl("img/avail/validator-active-set.png")} width="100%" height="100%"/>

That's it! You're now successfully running an Avail Validator node. 🎉
