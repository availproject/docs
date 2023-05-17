---
id: avail-validator
title: Run an Avail Validator
sidebar_label: Run a Validator
sidebar_position: 2
description: "Learn about running an Avail validator."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-validator
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Data Availability Deployments

:::info Onboarding validators

In Avail's current state, the Avail team will maintain the network and run
internal validators.

:::

:::warning System administration

Although Avail is in testnet phase, in general, users should have **significant system
administration experience** when running validator nodes.

Validator nodes are responsbile for maintaining and securing the network by staking tokens with real
value. Validators need to understand how to manage their node, its associated hardware & configuration,
and be wary that they are subject to being slashed due to actions like being offline or equivocation.

When in doubt, reach out to the Validator Engagement team.

:::

## Docker Setup

The easiest way to deploy your own Avail validator node is using Docker.

### Run the latest version of the Docker container

Use the default parameters and expose the P2P port with `-p 30333` by running:

```shell
docker run -p 30333 --name my_val 0xpolygon/avail:latest
```

Any extra parameter will be added to the `data-avail` binary as an argument.
If you want to use a specific node key and limit the maximum number of incoming connections
to `10`, you can use:

```shell
docker run -p 30333 --name my_val 0xpolygon/avail:latest --in-peers=10 --node-key 80027666cebec66464611eb0d5c36416213d83a9c689006a80efcf479826de7d
```

This image uses two volumes:
  - `/da/state` to store the database of the chain
  - `/da/keystore` to store the validator's private keys

Most likely you want to bind these volumes to a specific point, like:

```shell
docker run -p 30333 --name my_val -v /volumes/da/state:/da/state -v /volumes/da/keystore/:/da/keystore 0xpolygon/avail:latest
```

### Insert private keys

These private keys will be used by the validator to sign blocks and finalize the chain when it
acts as an active validator. They are stored into `/da/keystore` in plain text format, so you
should take extra care over that volume.

In order to insert these keys, we will open a shell inside the running container:

```shell
docker exec -it my_val bash
root@5f55e51e5a85:/da# /da/bin/data-avail key insert \
      --chain=/da/genesis/testnet.chain.spec.raw.json \
      --base-path=/da/state/ \
      --keystore-path=/da/keystore/ \
      --suri=0x7d98...cae6 \
      --key-type=babe \
      --scheme=Sr25519
```

The `--suri` parameter is the private key as a mnemonic phrase (or secret phrase) where you can generate
one using the `subkey` tool in Substrate.

:::note Learn about subkey

To learn about how to use the subkey, visit the [<ins>Subkey Substrate documentation</ins>](https://docs.substrate.io/v3/tools/subkey/).

:::

This command should be **repeated for each pair of key type and scheme** shown in the following table:

| Key Type | Scheme    |
| -------- | --------- |
| babe     | Sr25519   |
| gran     | *Ed25519* |
| imon     | Sr25519   |
| audi     | Sr25519   |

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
making transactions.

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

First, go to the **Developer** tab in the [Avail Apps](https://testnet.avail.tools/)
navbar and click on **Extrinsics**.

* **Stash** account - Select your Stash account. In this example, we bond 1001 AVL tokens, where the
  minimum bonding amount is 1000. Make sure that your Stash account contains at least this many tokens.
  You can, of course, stake more than this.
* **Controller** account - Select the Controller account created earlier. This account will need a
  small amount of AVL in order to start and stop validating.
* **Value** bonded - The amount of AVL tokens you want to bond from your Stash account.

  :::note

  You do not need to bond all of the AVL in that account. Also note that you can always bond more `AVL` later.
  However, withdrawing any bonded amount requires the duration of the unbonding period.

  :::

* **Payment** destination - The account where the rewards from validating are sent. More information can be found
  [here](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).

<img src={useBaseUrl("img/avail/dev-ext.png")} width="100%" height="100%"/>

Select the **staking** pallet, and the **bond** extrinsic.

<img src={useBaseUrl("img/avail/add_validator_bound_step.png")} width="100%" height="100%"/>

Create a transaction where your **stash** account bounds 1001 AVLs at least to your **controller** account,
as shown below.

<img src={useBaseUrl("img/avail/bond-avl-val.png")} width="100%" height="100%"/>

## Set Session Keys

Once your node is **fully synced**, you need to rotate and submit your session keys.

### Rotate you session keys

Run this command on the same machine (while the node is running with the default HTTP RPC port configured):

```shell
docker exec -it my_val bash
root@5f55e51e5a85:/da# curl \
      -H "Content-Type: application/json" \
      -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' \
      http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the concatenation of the four public keys.
Save this result for a later step.

You can restart your node at this point.

### Submitting the `setKeys` transaction

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates
your validator with your Controller account.

Navigate to the [**Network &rarr; Staking**](https://testnet.avail.tools/#/staking).
Here, you can perform various staking actions. Navigate to **Account actions**, and select **Set Session Key**
on the bonding account you generated earlier. Enter the output `from author_rotateKeys` in the field and click on
**Set Session Key**.

<img src={useBaseUrl("img/avail/set-session-keys.png")} width="100%" height="100%"/>

After submitting this extrinsic, you are ready to start validating.

## Validate

To verify that your node is live and synchronized, navigate to
[**Network &rarr; Staking**](https://testnet.avail.tools/#/staking) and select
**Waiting**. Your account should be shown there. A new validator set is selected every **era**,
based on the staking amount.
