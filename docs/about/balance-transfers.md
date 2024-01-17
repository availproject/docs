---
id: balance-transfers
title: How to Perform Balance Transfers on Avail
sidebar_label: Balance Transfers
description: 'Learn how to perform balance transfers on the Goldberg testnet.'
keywords:
  - docs
  - avail
  - explorer
  - balance
  - transfers
  - send
  - receive
  - transaction
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

## Overview

Balance transfers are a method for transferring funds from one account to another. This guide will walk you through the process using [<ins>Avail-JS UI</ins>](https://goldberg.avail.tools/). Before you begin, ensure you have [<ins>created an account</ins>](/about/accounts) and have [<ins>funds available</ins>](/about/faucet) for transfer.

:::info Clash of Nodes

In the balance transfer challenge part of [<ins>Clash of Nodes</ins>](/category/clash-of-nodes/), participants must follow these guidelines:

1. **Token Acquisition**: To participate in balance transfers, tokens must be acquired through the designated [<ins>faucet</ins>](/about/faucet).
2. **Faucet Transfer Limit**: Participants can obtain tokens from the [<ins>faucet</ins>](/about/faucet) only once per day.
3. **Regular Engagement**: Participants are encouraged to engage with the challenge daily. The daily acquisition of tokens from the faucet and subsequent transfers cultivate consistent participation.

:::

## Transferring Funds Using SubWallet

You can follow the video instruction [here](https://www.youtube.com/watch?v=30lHgMC_0d0)

### 1. Select token AVL

Open SubWallet app and select `Send tokens`. On the token tab, select AVL. Paste the recipient address and press Next.

<img src={useBaseUrl("img/avail/subwallet-send-token.png")} width="100%" height="100%" />
<img src={useBaseUrl("img/avail/subwallet-choose-avl.png")} width="100%" height="100%" />

### 2. Transfer confirmation

Enter amount and press Transfer. Then, double check transfer information and press Approve. Your transaction is completed.
<img src={useBaseUrl("img/avail/subwallet-transfer.png")} width="100%" height="100%" />
<img src={useBaseUrl("img/avail/subwallet-transfer-confirm.png")} width="100%" height="100%" />
<img src={useBaseUrl("img/avail/subwallet-transfer-complete.png")} width="100%" height="100%" />

## Transferring Funds Using Avail-JS

1. To withdraw test AVL and send funds from your account, select "Transfer" in the Accounts menu, or click the "Send" button on the Accounts page adjacent to the account you wish to send from.

2. Both options lead to a pop-up window where you can specify the recipient's account and the amount to be sent. If accessed via the "Send" button, the "Send from account" is pre-selected. For the recipient's account, choose from the drop-down menu, which includes your accounts and those in your Address Book, or paste an address directly. The recipient's account is not required to be in your Address Book.

3. After entering all necessary details, click on the "Make Transfer" button. This action opens a pop-up window displaying the expected transaction fees.

:::note Minimum Balance

On Avail, similar to other Substrate-based chains, an account must hold a minimum balance to stay active. This minimum, known as the Existential Deposit (ED), is set at **0.00001 AVL on the Goldberg testnet**. The ED helps prevent blockchain bloat from accounts with tiny or zero balances, thereby maintaining network efficiency and low fees. If an account's balance falls below this threshold, it gets deactivated, and the remaining balance is removed. Reactivating the account requires a deposit larger than the ED, but this won't restore the lost funds.

:::

4. When you are ready to execute your transaction, enter your password and click on the "Sign and Submit" button.
