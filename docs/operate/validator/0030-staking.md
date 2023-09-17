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

This guide offers a step-by-step walkthrough on how to stake your Avail validator. 
It covers essential steps such as bonding your funds, managing session keys, and initiating the validation process.

## Step 1: Prepare for Staking

Before you can become an active validator, you need to bond your funds to your node. This involves creating two separate Avail accounts: a `stash` account for holding your funds and a `controller` account for managing staking actions.

### Create Avail Accounts

1. Navigate to the Kate network explorer at [<ins>kate.avail.tools</ins>](https://kate.avail.tools/).
2. Create a `stash` and a `controller` account. The `stash` account should ideally be a cold wallet, while the `controller` can be a hot wallet.
  > - The controller key is responsible for managing staking activities and executing transactions, 
      including the payment of transaction fees.
  >
  > - The stash key primarily safeguards your funds and should ideally be stored in a cold wallet or 
      kept offline. It is not recommended to use the stash key for routine account activities like submitting 
      extrinsics.
3. Ensure both accounts have sufficient funds to cover transaction fees.

:::tip Funding Accounts

Keep the majority of your funds in the `stash` account and only a minimal amount in the `controller` 
account to cover transaction fees.

:::

For validators participating in our testnet, contact the Avail team to have funds
transferred.

<img src={useBaseUrl("img/avail/stash-controller-accounts.png")} width="200%" height="200%"/>

### Bond Your Funds

:::tip Bonding Tips
Don't bond all your AVL tokens as you'll need some for transaction fees. You can always bond more tokens later.
Note: Withdrawing any bonded amount is subject to the duration of the unbonding period.
:::

1. Navigate to the **Staking** tab in the Explorer.
2. Click on `Stash` to initiate the bonding process.
<img src={useBaseUrl("img/avail/staking-bond-1.png")} width="100%" height="100%"/>

3. Fill in the bonding preferences.

  > - **Stash Account:** This is your designated Stash account.
  > - **Controller Account:** Choose your Controller account, which only requires a minimal amount of AVL to initiate and cease validation.
  >- **Value Bonded:** Specify the quantity of AVL tokens you wish to bond from your Stash account. You can stake any amount that exceeds the minimum requirement.
  > - **Payment Destination:** This is the account where your validation rewards will be sent. For more details, visit [this link](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).


4. After filling in the required fields, click `Bond`. You will be prompted to enter your wallet password. Input your password and then click **Sign and Submit**.

<img src={useBaseUrl("img/avail/staking-bond-3.png")} width="100%" height="100%"/>

You should now be ready to generate your session keys. Note the
**Session Key** button, in the next step we will generate a key to
submit here.  <img src={useBaseUrl("img/avail/staking-bond-4.png")}
width="100%" height="100%"/>

## Step 2: Manage Session Keys

After your node is fully synced, you'll need to rotate and submit your session keys.

### Rotating Session Keys

Run the following command on your node machine:
> Ensure the node is running with the default HTTP RPC port configured.

```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The result is the concatenation of the four public keys. Save the hex-encoded 
result for the next step and **restart your node**.

### Submit Session Keys

You must inform the network of your Session keys by signing and submitting the 
`setKeys` extrinsic. This action associates your validator with your Controller account.

1. Navigate back to the **[<ins>Staking</ins>]((https://kate.avail.tools/#/staking/actions))** tab.
2. Click on `Set Session Key` and enter the hex-encoded result.
3. Click `Set Session Key` and enter your password when prompted.

<img src={useBaseUrl("img/avail/set-session-keys.png")} width="100%" height="100%"/>

After submitting the extrinsic, you'll observe that **Set Session Key** changes 
to **Validate**. Make sure your node is fully synchronized before proceeding further.

## Step 3: Register as a Validator

1. Click `Validate` on the **Staking** tab.

<img src={useBaseUrl("img/avail/start-validating.png")} width="100%" height="100%"/>

2. Set your validator commission percentage.
3. Enter your password and click `Validate`.

<img src={useBaseUrl("img/avail/set-validate-commission.png")} width="100%" height="100%"/>

## Step 5: Start Validation

Your validator is now prepared to begin the validation process. If you wish to discontinue, 
you can click the stop icon. Please note that the Avail interface doesn't automatically verify 
if your node is synchronized; you'll need to confirm this manually. If your node has sufficient 
stake, the Avail blockchain will likely select it in the next epoch or two.

<img src={useBaseUrl("img/avail/validator-ready.png")} width="100%" height="100%"/>

### Verify Validator Status

To verify that your node is ready for possible selection at the end of
the next era, follow these steps:

1. Go to the **[<ins>Staking</ins>](https://kate.avail.tools/#/staking)** tab and 
   select `Waiting` to see if your account appears.
2. If your node has enough stake, it will be elected in the next era or two.
   > A new set of validators is chosen every **era**, based on the amount staked.

<img src={useBaseUrl("img/avail/validator-waiting-list.png")} width="100%" height="100%"/>

### Monitor Validator in Action

Once your validator node has accrued enough stake, it will be elected for validation. 
Below is an example image of an elected validator node actively producing blocks.

In addition, please check out the guide on validator monitoring available 
[<ins>here</ins>](/operate/validator/0050-validator-monitoring.md)

<img src={useBaseUrl("img/avail/validator-active-set.png")} width="100%" height="100%"/>

That's it! You're now successfully running an Avail Validator node. 🎉