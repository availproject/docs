---
id: validator-docker
title: How to Run an Avail Validator Node using Docker
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

The Avail team distributes official Docker images which can be used to run nodes on the **Kate testnet** network . These instructions are for running a Full Node, but they can be adapted for running validators as well.

## Before you start

The instructions below assume a Linux distribution with `apt` (Debian,
for example), but you may be able to adapt them to a different
distribution. Also the Docker images Currently Available are only supported for **Linux/amd64 or x86_64 based** cpus .It's also common for users to run nodes on a cloud
server. The following list of standard hardware is a recommendation of
hardware specs that your environment should have:

| Minimum                            | Recommended                         |
|------------------------------------|-------------------------------------|
| 4GB RAM                            | 8GB RAM                             |
| 2 core CPU amd64/x86 architecture  | 4 core CPU  amd64/x86 architecture  |
| 20-40 GB SSD                       | 200-300 GB SSD                      |

The peer exchange for a Avail full node generally depends on port 30333 being open. When you configure your firewall or security groups for Cloud Providers, make sure these ports are open along with whatever ports you need to access the machine.

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
Now that we have Our Chainspec config Downloaded Let's start our Avail Validator Node.

```bash
cd /mnt/avail

sudo docker run -v $(pwd)/config/kate-chainspec.raw.json:/da/genesis/chainspec.raw.json -v $(pwd)/state:/da/state:rw -v $(pwd)/keystore:/da/keystore:rw -e DA_CHAIN=/da/genesis/chainspec.raw.json -e DA_NAME=kate-docker-avail-Node -p 0.0.0.0:30333:30333 -p 9615:9615 -p 9933:9933 -d --restart unless-stopped availj/avail:v1.6.2-rc1 --validator
```

in the above command steps include:

- changing directory to `/mnt/avail` so we are in correct directory 
- we have mounted the `/mnt/avail/config/kate-chainspec.raw.json` to `/da/genesis/chainspec.raw.json` of the docker container so that the chainspec is correct
- `/mnt/avail/state` to `/da/state` and gave it permission to read and write both so that our da data is stored on the separate disk and is presistent in case of even the container crashes.
- `DA_CHAIN` suggest which chainspec file to use inside the container
- `DA_NAME` is Name of your node you can give if any name in our example we have given kate-docker-avail-Node
- ports convention **`30333`** is used for public `p2p connection` **`9615`** is the `prometheus metrics endpoint port` and **`9933`** is the `http rpc port` if you also want to add `websocket` you add port **`9944`** in the docker command.
- image we have used if from the availj docker hub repository
- --validator flags indicates to run this as a validator.
- you can add any chain flag you want after the image name as --rpc ... 

check the docker logs to see if the node is working fine or not .

```bash
ubuntu:/mnt/avail# docker ps
CONTAINER ID   IMAGE                     COMMAND            CREATED         STATUS         PORTS                                                                                                            NAMES
5b3978de8f35   availj/avail:v1.6.2-rc1   "/entrypoint.sh"   6 minutes ago   Up 6 minutes   0.0.0.0:9615->9615/tcp, :::9615->9615/tcp, 0.0.0.0:9933->9933/tcp, 0.0.0.0:30333->30333/tcp, :::9933->9933/tcp   relaxed_wilson
ubuntu:/mnt/avail# docker logs 5b3978de8f35
# 5b3978de8f35 is the container id 
```

If started with --validator flags the Role will `Role:Authority`
and logs will look like this:

```shell
2023-08-21 08:27:03 Avail Node2023-08-21 08:27:03 ✌️  version 1.6.2-bb4cc104b25
2023-08-21 08:27:03 ❤️  by Anonymous, 2017-2023
2023-08-21 08:27:03 📋 Chain specification: Avail Kate Testnet
2023-08-21 08:27:03 🏷  Node name: kate-docker-avail-Node
2023-08-21 08:27:03 👤 Role: AUTHORITY
2023-08-21 08:27:03 💾 Database: RocksDb at /da/state/chains/Avail Testnet_116d7474-0481-11ee-bc2a-7bfc086be54e/db/full
2023-08-21 08:27:03 ⛓  Native runtime: data-avail-11 (data-avail-0.tx1.au11)
2023-08-21 08:27:09 🔨 Initializing Genesis block/state (state: 0x6bc8…8ac6, header-hash: 0xd120…50c6)
2023-08-21 08:27:09 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
root@ip-172-31-34-103:/mnt/avail# docker logs 0d24ff1e8c20
Launching node kate-docker-avail-Node on chain /da/genesis/chainspec.raw.json...
2023-08-21 08:27:03 Avail Node
2023-08-21 08:27:03 ✌️  version 1.6.2-bb4cc104b25
2023-08-21 08:27:03 ❤️  by Anonymous, 2017-2023
2023-08-21 08:27:03 📋 Chain specification: Avail Kate Testnet
2023-08-21 08:27:03 🏷  Node name: kate-docker-avail-Node
2023-08-21 08:27:03 👤 Role: AUTHORITY
2023-08-21 08:27:03 💾 Database: RocksDb at /da/state/chains/Avail Testnet_116d7474-0481-11ee-bc2a-7bfc086be54e/db/full
2023-08-21 08:27:03 ⛓  Native runtime: data-avail-11 (data-avail-0.tx1.au11)
2023-08-21 08:27:09 🔨 Initializing Genesis block/state (state: 0x6bc8…8ac6, header-hash: 0xd120…50c6)
2023-08-21 08:27:09 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2023-08-21 08:27:14 👶 Creating empty BABE epoch changes on what appears to be first startup.
2023-08-21 08:27:14 🏷  Local node identity is: 12D3KooWEdgyAtH8ZCU8ScTx1hx5NWh4gmDGNcedtLxrJ1htSeBe
2023-08-21 08:27:14 Prometheus metrics extended with avail metrics
2023-08-21 08:27:14 💻 Operating system: linux
2023-08-21 08:27:14 💻 CPU architecture: x86_64
2023-08-21 08:27:14 💻 Target environment: gnu
2023-08-21 08:27:14 💻 CPU: Intel(R) Xeon(R) Platinum 8175M CPU @ 2.50GHz
2023-08-21 08:27:14 💻 CPU cores: 1
2023-08-21 08:27:14 💻 Memory: 7835MB
2023-08-21 08:27:14 💻 Kernel: 5.15.0-1040-aws2023-08-21 08:27:14 💻 Linux distribution: Debian GNU/Linux 11 (bullseye)
2023-08-21 08:27:14 💻 Virtual machine: yes2023-08-21 08:27:14 📦 Highest known block at #02023-08-21 08:27:14 〽️ Prometheus exporter started at 127.0.0.1:96152023-08-21 08:27:14 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]2023-08-21 08:27:14 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]2023-08-21 08:27:14 🏁 CPU score: 674.66 MiBs2023-08-21 08:27:14 🏁 Memory score: 4.53 GiBs2023-08-21 08:27:14 🏁 Disk score (seq. writes): 324.35 MiBs2023-08-21 08:27:14 🏁 Disk score (rand. writes): 62.64 MiBs
2023-08-21 08:27:14 👶 Starting BABE Authorship worker
```

## Staking Set-up

Once the node is running and connected to the network, it needs to be
linked to accounts with bonded (staked) funds in order to be eligible
to become an active validator.

### Creating accounts

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

### Bonding

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

## Set Session Keys

Once your node is **fully synced**, you need to rotate and submit your
session keys.

### Rotate your session keys

Run this command on the machine where you are running your Avail
validator node (while the node is running with the default HTTP RPC
port configured):

```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the
concatenation of the four public keys.  Save this result for a later
step.

You should now restart the node so it will use the new session keys.

### Submitting the `setKeys` transaction

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

## Validate

If you are ready to start validating you must click **Validate**

<img src={useBaseUrl("img/avail/start-validating.png")} width="100%" height="100%"/>

You will be prompted to enter your validator commission
percentage. Once you click on **Validate** you will be prompted for
your password.

<img src={useBaseUrl("img/avail/set-validate-commission.png")} width="100%" height="100%"/>

Your validator is now ready to start validating. You can click the
stop icon should you wish to exit. Note that the Avail interface does
not check if your node is in sync.  You need to ensure your node is in
sync. The Avail blockchain will select your node in the next epoch or
two if you have enough stake.

<img src={useBaseUrl("img/avail/validator-ready.png")} width="100%" height="100%"/>

To verify that your node is ready for possible selection at the end of
the next era , navigate to [**Network &rarr;
Staking**](https://kate.avail.tools/#/staking) and select
**Waiting**. Your account should be shown there. A new validator set
is selected every **era**, based on the staking amount.

<img src={useBaseUrl("img/avail/validator-waiting-list.png")} width="100%" height="100%"/>


When the validator node has enough stake it will be elected, below is
an example of the node being elected and making blocks.

<img src={useBaseUrl("img/avail/validator-active-set.png")} width="100%" height="100%"/>
