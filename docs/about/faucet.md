---
id: faucet
title: How to Use the Testnet Faucet
sidebar_label: Get Testnet Tokens
description: Using the Avail Testnet Faucet
keywords:
  - docs
  - avail
  - explorer
  - accounts
  - faucet
  - funding
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

An automated faucet on Discord has been configured to distribute Avail tokens (AVL) for the Goldberg testnet.

:::note Please note

- The verification step is **mandatory for all users.**
- The `/deposit` command has a cooldown period. You can use it only once every 3 hours.
- The faucet is designed to distribute small amounts of AVL for testing purposes, not large quantities for validator bonding or similar activities.

:::

## Account Verification Process

To prevent spam and ensure a fair distribution of test tokens, Avail has introduced a mandatory verification process. This process links your wallet address to your Discord account. If you are not already a member of the Avail community, please join the [<ins>Avail Discord server</ins>](https://discord.gg/y6fHnxZQX8) first.

Follow these steps to complete the verification:

> The same steps apply using mobile applications.

1. Go to the [<ins>Avail Faucet Verification page</ins>](https://gitcoin-faucet.vercel.app/).

2. Click on the "Connect Wallet" button in the center of the page. You can choose from several wallet providers. For this demonstration, we will be using [<ins>SubWallet</ins>](https://www.subwallet.app/).

   <p align="center"><img src="/img/faucet/1.png" alt="Connect Wallet" width="80%"/></p>

3. A window will appear listing various wallet options. When prompted, verify and approve the connection request.

   <p align="center"><img src="/img/faucet/2.png" alt="Wallet Options" width="80%"/></p>

> Ensure you don't have any pending connections, or else you will get the following prompt:
>
> <p align="center"><img src="/img/faucet/3.png" alt="SubWallet Selection" width="80%"/></p>

If the connection is successful, you will be able to see your linked account on the top right-hand corner of the page.

<p align="center"><img src="/img/faucet/4.png" alt="Connected Wallet" width="80%"/></p>

4. You will then need to connect your Discord account. Click on "Connect Discord" and authorize the requested permissions.

   <p align="center"><img src="/img/faucet/5.png" alt="Discord Authorization" width="80%"/></p>

Once verified, a confirmation message will be displayed. Ensure that your Discord account is connected as it will be used in the following steps. You will also be able to see your connected Discord account that is verified on the top right-hand corner of the page.

## Obtaining Test AVL Tokens from Discord

After completing the account verification process, you can obtain test AVL tokens:

1. In the Avail Discord, navigate to the `#goldberg-faucet` channel.

2. Use the command `/deposit <your-address>` to request AVL tokens.

   <p align="center"><img src="/img/faucet/6.png" alt="Verification Confirmation" width="100%"/></p>

   Your wallet will receive 5 AVL tokens once the transaction status is marked as `Complete`. You can request AVL tokens every 3 hours.

   <p align="center"><img src="/img/faucet/8.png" alt="Transaction Complete" width="50%"/></p>
