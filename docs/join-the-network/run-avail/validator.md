---
id: validator-node-setup
title: Run an Avail Validator
sidebar_label: Run a Validator
sidebar_position: 3
description: "Learn about running an Avail validator."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: validator-node-setup
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Data Availability Deployments

:::info Onboarding validators

Please join our Discord for up-to-date information on our network and
validator onboarding.

:::

:::warning System administration

Although Avail is in testnet phase, in general, users should have
**significant system administration experience** when running
validator nodes.

Validator nodes are responsbile for maintaining and securing the
network by staking tokens with real value. Validators need to
understand how to manage their node, its associated hardware &
configuration, and be wary that they are subject to being slashed due
to actions like being offline or equivocation.

When in doubt, reach out to the Validator Engagement team.

:::

## Running The Node

First, run a full node as per the [Full
Node](/join-the-network/run-avail/full-node-setup)
instructions. Simply adding the `--validator` option to the command
will enable validator mode.

For example:

```
./data-avail --validator \
    --base-path `pwd`/data \
    --chain `pwd`/chainspec.raw.json \
    --port 30333 \
    --telemetry-url 'ws://telemetry.avail.tools:8001/submit 0'
```

The node will ouput the following when started:
```
2023-06-03 20:36:29 Avail Node
2023-06-03 20:36:29 ✌️  version 1.6.0-99b85257d6b
2023-06-03 20:36:29 ❤️  by Anonymous, 2017-2023
2023-06-03 20:36:29 📋 Chain specification: Avail Kate Testnet
2023-06-03 20:36:29 🏷  Node name: bewildered-distance-1229
2023-06-03 20:36:29 👤 Role: FULL
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
:::info Node Role

Note that the Role now has a value of `Authority`, this indicates it is a validator node.

:::

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

### Add controller key to the local node

Now add the controller account to your local node:
1. Download [this script](pathname:///scripts/avail-insert-key.sh),
   place it in the working directory for the node.
2. Make the script executable and then run it:
   ```
   chmod 755 avail-insert-key.sh
   ./avail-insert-key.sh
   ```
3. The script will prompt for the controller account secret (mnemonic
   or raw seed) and password, enter them and press enter.

:::info Why a separate script?

You might notice that the `avail-insert-key.sh` script merely runs a
few simple commands. While it is possible to run those commands
directly, we advise against it because you might accidentally leave
behind your raw key seed in the shell's history.

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

