---
id: validator-node-setup
title: Run an Avail Validator
sidebar_label: Run a Validator
sidebar_position: 5
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

Although Avail is in testnet phase, in general, users should have **significant system
administration experience** when running validator nodes.

Validator nodes are responsbile for maintaining and securing the network by staking tokens with real
value. Validators need to understand how to manage their node, its associated hardware & configuration,
and be wary that they are subject to being slashed due to actions like being offline or equivocation.

When in doubt, reach out to the Validator Engagement team.

:::

## Validator Setup

To run an validator node you must first review the full node setup. You will complete all the same steps. 
The only difference is the addition of `--validator` to the paramaters.

A quick recap on creating a node:
```
cd ~
mkdir avail-node
cd avail-node
wget https://github.com/availproject/avail/releases/download/v1.3.0-2-ad405d0/data-avail-linux-amd64.tar.gz
tar -xvf data-avail-linux-amd64.tar.gz
mv data-avail-linux-amd64 data-avail
rm data-avail-linux-amd64.tar.gz
wget https://testnet.polygonavail.net/chainspec.raw.json
```

Now run as a validator:

```
./data-avail --base-path ~/avail-node/data \
        --chain ~/avail-node/chainspec.raw.json \
        --port 30333 \
        --validator \
        --bootnodes /dns/gateway-fullnode-002.testnet.avail.tools/tcp/30333/p2p/12D3KooWNuBaLtAGNxQbei7rUzpp8N8TF8k5kPsgKShAJgK4crkB \
        /dns/gateway-fullnode-001.testnet.avail.tools/tcp/30333/p2p/12D3KooWDgqCRtsJWKjckh2XHtRZbboVdgDJswsxoNmX8PMf59bV \
        /dns/gateway-fullnode-003.testnet.avail.tools/tcp/30333/p2p/12D3KooWBNy1vzragtwiummqXwry19h6dke68hybY6jVeEH4mAtT
```

The node will ouput the following when started:
```
2023-05-11 15:21:37 Polygon Avail Node
2023-05-11 15:21:37 ✌️  version 1.3.0-unknown-x86_64-linux-gnu
2023-05-11 15:21:37 ❤️  by Anonymous, 2017-2023
2023-05-11 15:21:37 📋 Chain specification: Avail Testnet 03
2023-05-11 15:21:37 🏷 Node name: wistful-roof-2283
2023-05-11 15:21:37 👤 Role: AUTHORITY
2023-05-11 15:21:37 💾 Database: RocksDb at /home/avail/avail-node/data/chains/da_testnet_b10449bc-6f5e-11ed-b8ec-26a2f5211234/db/full
2023-05-11 15:21:37 ⛓  Native runtime: data-avail-6 (data-avail-0.tx1.au10)
2023-05-11 15:21:41 🏷 Local node identity is: 12D3KooWCWbwj3xnxJi4kUuHRnxp7yPZkc3jzBXP3QcU5nx5bSvV
2023-05-11 15:21:41 📦 Highest known block at #113736
2023-05-11 15:21:41 〽️ Prometheus exporter started at 127.0.0.1:9615
```
:::info Node Role

Note that the Role now has a value of `Authority`, this indicates it is a validator node.

:::

By default validator node will run as an archive and validate. Overtime this can increase the cost of running a validator. Therefore for a validator node you can run 
a pruned node. The addition of of `--unsafe-pruning` and `--pruning=1000` to the paramaters is required. Pruned node must be synced from genesis with the pruned parameters.

The command would then be:
```
./data-avail --base-path ~/avail-node/data \
        --chain ~/avail-node/chainspec.raw.json \
        --port 30333 \
        --validator \
        --unsafe-pruning \
        --pruning=1000 \
        --bootnodes /dns/gateway-fullnode-002.testnet.avail.tools/tcp/30333/p2p/12D3KooWNuBaLtAGNxQbei7rUzpp8N8TF8k5kPsgKShAJgK4crkB \
        /dns/gateway-fullnode-001.testnet.avail.tools/tcp/30333/p2p/12D3KooWDgqCRtsJWKjckh2XHtRZbboVdgDJswsxoNmX8PMf59bV \
        /dns/gateway-fullnode-003.testnet.avail.tools/tcp/30333/p2p/12D3KooWBNy1vzragtwiummqXwry19h6dke68hybY6jVeEH4mAtT
```

:::info Changing to Pruned Node

Note if you attempt to enable pruning on an existing validator node without resyncing, you will encounter an error message similar to 
`Error: Service(Client(StateDatabase("Expected pruning mode: archive")))`. This error indicates that the node's database is set to an archive mode, 
which expects to store the complete transaction history.
:::


## Bond AVL tokens

It is highly recommended that you set up a stash and controller account and have separate key (two separate accounts) for both.

:::info Stash and Controller Keys

- A controller key is used to control staking actions for your account
- A stash key is used to control your funds. It is recommended that the stash key be a cold wallet or offline and not be used for account-related activities like submitting extrinsics.

Follow the [Polkadot Wiki](https://wiki.polkadot.network/docs/learn-staking#accounts) and the
[Substrate Hub](https://docs.substrate.io/v3/concepts/account-abstractions/#:~:text=Controller%20Key%3A%20a%20Controller%20account,somewhat%20regularly%20for%20validator%20maintenance)
to learn more about stash and controller accounts and how to manage them.

:::

You will start by creating two accounts; ensure each account has enough funds to pay the fees for
making transactions. This can be done on [Avail Apps](https://testnet.avail.tools/#/accounts).

<img src={useBaseUrl("img/avail/stash-controller-accounts.png")} width="200%" height="200%"/>


:::tip Storing Funds

Keep most of your funds in the stash account since it is meant to be the custodian of
your staking funds, and have just enough funds in the controller account to pay for fees.

Make sure not to bond all your AVL balance since you will be unable to pay transaction fees from your bonded
balance.

:::

It is now time to set up your validator by doing the following:

 - Bond the AVL of the Stash account. These token will be put at stake for the security of the network and
   subject to slashing.
 - Select the Controller. This is the account that will decide when to start or stop validating.

First, go to the accounts section on the **Staking** tab in the [Avail Apps](https://testnet.avail.tools/#/staking/actions). Here, you can perform various staking actions. Click on Stash.

<img src={useBaseUrl("img/avail/staking-bond-1.png")} width="100%" height="100%"/>

The bonding preferences window will open with the following options
* **Stash** account - Select your Stash account. In this example, we bond 1090 AVL tokens, where the
  minimum bonding amount is 1000. Make sure that your Stash account contains at least this many tokens.
  You can, of course, stake more than this.
* **Controller** account - Select the Controller account created earlier. This account will need a
  small amount of AVL in order to start and stop validating.
* **Value** bonded - The amount of AVL tokens you want to bond from your Stash account.

  :::note

  You should not bond all of the AVL in that account, you will require some AVL for transactions. Also note that you can always bond more `AVL` later.
  However, withdrawing any bonded amount requires the duration of the unbonding period.

  :::

* **Payment** destination - The account where the rewards from validating are sent. More information can be found
  [here](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).

Once populating the fields you can click bond.

You will then be promted to enter your wallet password. Enter your password and then click **Sign and Submit**.

<img src={useBaseUrl("img/avail/staking-bond-3.png")} width="100%" height="100%"/>

You should now be ready to generate your session keys. Note the **Set Session Key**, in the next step we will generate a key to submit here.
<img src={useBaseUrl("img/avail/staking-bond-4.png")} width="100%" height="100%"/>


## Set Session Keys

Once your node is **fully synced**, you need to rotate and submit your session keys.

### Rotate your session keys

Run this command on the machine where you are running your Avail validator node (while the node is running with the default HTTP RPC port configured):

```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the concatenation of the four public keys.
Save this result for a later step.

### Submitting the `setKeys` transaction

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates
your validator with your Controller account.

Navigate back to the [**Network &rarr; Staking**](https://testnet.avail.tools/#/staking/actions) if you closed the window.
Ensure you are on **Account actions**, and select **Set Session Key** on the bonding account you generated earlier. 
Enter the output `from author_rotateKeys` in the field and click on **Set Session Key**. Will be promted for password again.

<img src={useBaseUrl("img/avail/set-session-keys.png")} width="100%" height="100%"/>

After submitting this extrinsic, you will notice **Set Session Key** changed to **Validate**. Ensure your node is in sync before proceeding.

## Validate

If you are ready to start validating you must click **Validate**
<img src={useBaseUrl("img/avail/start-validating.png")} width="100%" height="100%"/>

You will be prompted to enter your validator commission percentage. Once you click on **Validate** you will be prompted for your password.
<img src={useBaseUrl("img/avail/set-validate-commission.png")} width="100%" height="100%"/>

Your validator is now ready to start validating. You can click the stop icon should you wish to exit. Note that the Avail App does not check if your node is in sync.
You need to ensure your node is in sync. Avail blockchain will select your node in the next epoch or two if you have enough stake.
<img src={useBaseUrl("img/avail/validator-ready.png")} width="100%" height="100%"/>

To verify that your node is ready for possible selection at the end of the next era , navigate to
[**Network &rarr; Staking**](https://testnet.avail.tools/#/staking) and select **Waiting**. Your account should be shown there. A new validator set is selected every **era**,
based on the staking amount.

<img src={useBaseUrl("img/avail/validator-waiting-list.png")} width="100%" height="100%"/>


When the validator node has enough stake it will be elected, below is an example of the node being elected and making blocks.

<img src={useBaseUrl("img/avail/validator-active-set.png")} width="100%" height="100%"/>

