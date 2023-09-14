---
id: validator-binaries
title: How to Run a Validator Node using Binaries
sidebar_label: Binaries
sidebar_position: 1
description: "Learn about running an Avail validator using binaries."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Preliminaries

Validator nodes hold a pivotal role in maintaining network integrity by staking real-value tokens. Successfully managing a validator comes with a comprehensive grasp of node operations, hardware configuration, and constant vigilance. Validators face the potential consequences of penalties, such as slashing, for infractions like extended periods of offline activity or equivocation. This responsibility underscores the need for a profound understanding of the associated risks.

:::warning System administration

While Avail is currently in its testnet phase, running validator nodes requires significant system administration expertise.

:::

Becoming a validator is a significant responsibility because mistakes or errors can jeopardize not just your tokens but also your reputation, given your role in managing both your stake and that of your nominators. Despite these challenges, it offers a rewarding chance to enhance network security and be incentivized.

:::info Onboarding

Please join the [<ins>Avail Discord</ins>](https://discord.com/invite/y6fHnxZQX8) for up-to-date information on the Kate Testnet and
validator onboarding.

:::

## Already Running a Full Node?

If you're already running a full node and wish to transition to a validator node, please note that simply adding the `--validator` flag after your full node has synced will result in an error expecting an archive database. Follow these steps to make the switch:

### 1. Stop Your Full Node

Before making any changes, safely stop your running full node.

```bash
sudo systemctl stop avail-node.service  # Replace 'avail-node.service' with your service name if different
```

### 2. Purge the Database

Since adding the `--validator` flag after syncing expects an archive database, you'll need to purge the existing database.

```bash
# Replace the path with your actual data path
rm -rf /path/to/your/data/directory
```

### 3. Update Command Line Flags

Modify the command line used for running your full node to include the `--validator` flag.
  
For example:

```bash
./data-avail --validator \
    --port 30333 \
    --base-path `pwd`/data \
    --chain `pwd`/chainspec.raw.json
```

### 4. Update Systemd Service File

If you were running your full node as a systemd service, update the service file to reflect the new command 
with the `--validator` flag.
  
```bash
sudo nano /etc/systemd/system/avail-node.service  # Replace 'avail-node.service' with your service name if different
```
  
- Update the `ExecStart` line with the new command.
  
- Save and exit the editor.

### 5. Restart the Service

Restart the systemd service to apply the changes:

```bash
sudo systemctl start avail-node.service  # Replace 'avail-node.service' with your service name if different
```

### 6. Verify Role

Once your node is up and running, verify that the role displays as "Authority," confirming that you are now running a validator node.

## Run a Validator Node

### 1. Run a Full Node as a Validator

First, follow the steps for running a full node as outlined in the 
[Full Node Setup Instructions](/validators/run-avail/full-node-setup).

To run a validator, you'll use the same command line as for the full node, but with the addition of the `--validator` option to the command.

For example:

```bash
./data-avail --validator \
    --port 30333 \
    --base-path `pwd`/data \
    --chain `pwd`/chainspec.raw.json
```

The node will ouput the following when started:
```
2023-06-03 20:36:29 Avail Node
2023-06-03 20:36:29 ✌️  version 1.6.0-99b85257d6b
2023-06-03 20:36:29 ❤️  by Anonymous, 2017-2023
2023-06-03 20:36:29 📋 Chain specification: Avail Kate Testnet
2023-06-03 20:36:29 🏷  Node name: bewildered-distance-1229
2023-06-03 20:36:29 👤 Role:Authority
2023-06-03 20:36:29 💾 Database: RocksDb at /Users/thunder/code/avail/data/chains/Avail Testnet_6831251e-0222-11ee-a2c3-c90377335962/db/full
2023-06-03 20:36:29 ⛓  Native runtime: data-avail-9 (data-avail-0.tx1.au11)
2023-06-03 20:36:35 👶 Creating empty BABE epoch changes on what appears to be first startup.
2023-06-03 20:36:35 🏷  Local node identity is: 12D3KooWPt7odw3aeq7azZDugXjNuUvQNPU58n1VRBzY1YBqsjkr
2023-06-03 20:36:35 Prometheus metrics extended with avail metrics
2023-06-03 20:36:35 💻 Operating system: macos
2023-06-03 20:36:35 💻 CPU architecture: aarch64
2023-06-03 20:36:35 📦 Highest known block at #0
2023-06-03 20:36:35 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-06-03 20:36:35 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"]
2023-06-03 20:36:35 🏁 CPU score: 724.71 MiBs
2023-06-03 20:36:35 🏁 Memory score: 41.49 GiBs
2023-06-03 20:36:35 🏁 Disk score (seq. writes): 1.91 GiBs
2023-06-03 20:36:35 🏁 Disk score (rand. writes): 454.66 MiBs
```

**Please take note that the role now displays as `Authority`, indicating that your node is operating as a validator node.**

> If you were previously running a full node and added the `--validator` flag after syncing, you may encounter an error expecting an archive database. In such cases, it's necessary to purge the existing database and then restart the node.

For the best practice, it is highly recommended to run your node as a service.

```
sudo tee /etc/systemd/system/availd.service > /dev/null <<'EOF'
[Unit]
Description=Avail Validator
After=network.target
StartLimitIntervalSec=0

[Service]
User=avail
Type=simple
Restart=always
RestartSec=120
ExecStart=/home/avail/avail-node/data-avail --base-path /home/avail/avail-node/data --chain /home/avail/avail-node/chainspec.raw.json --port 30333 --validator --name MyAvailNode

[Install]
WantedBy=multi-user.target
EOF
```

Enable auto restart on for your Avail node:

```bash
sudo systemctl daemon-reload
sudo systemctl enable availd.service 
```

Start your avail node:

```bash
sudo systemctl start availd.service 
```

Check the node is running:

```bash
sudo systemctl status availd.service
```

View the logs from the running service:

```bash
journalctl -f -u availd.service
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
Networks](/validators/networks) page.

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
Networks](/validators/networks) page). Here, you can perform
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
