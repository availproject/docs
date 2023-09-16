---
id: staking
title: How to Stake Your Validator
sidebar_label: Stake Your Validator
description: "Learn about running an Avail validator using binaries."
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

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
network explorer is at [kate.avail.tools](https://kate.avail.tools/)

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
Explorer at [kate.avail.tools](https://kate.avail.tools/#/staking/actions) for the
Kate network. Here, you can perform
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

## Register as a Validator

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
