---
id: avail-getting-started
title: Getting Started
sidebar_label: Getting started
description: Get started with Avail
keywords:
  - docs
  - avail
  - explorer
  - accounts
  - faucet
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-getting-started
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Getting started

:::note

We are working on improving many of the current features. We appreciate you using our testnet and encourage your valuable feedback through one of our [<ins>community channels</ins>](https://discord.gg/y6fHnxZQX8).

:::

## Using the Explorer

Avail networks are deployed with an [explorer](https://kate.avail.tools/) that you can use to perform network and account related operations. At a high level, you can perform the following:

1. Inspect blocks, events, and general network-related data.
2. Manage your accounts and send transactions.
3. Participate in governance.
4. Submit [extrinsics](https://docs.substrate.io/v3/concepts/extrinsics/)., make RPC calls, and more.

You can also deploy your own instance of the explorer to connect to a node. Find the repository with the latest version and instructions for the Avail Explorer [here](https://github.com/availproject/avail-apps).

## Managing avail accounts

### Creating an account

You can create accounts on the Kate testnet directly from the [explorer](https://kate.avail.tools/).

1. Open the [explorer](https://kate.avail.tools/).
2. Navigate to Accounts -> Accounts.
<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>
3. Click on the +Account button.
<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>
4. Follow the account creation wizard to complete creating your account.
5. The account creation wizard downloads your account's JSON file to your file system at the end of the process. You may be prompted to allow the browser to download the files.

:::caution Key Management

The seed phrase is your account key, which controls your account.
The seed phrase should be written down and stored on a non-digital medium.

Storing your account's JSON file does not have to be as rigourous as storing the seed phrase,
as long as you use a strong password to encrypt the file. You can import the JSON file to
access your account.

:::

## Using the Avail faucet to get AVL tokens

If you need Avail (AVL) tokens to work with on the Kate testnet, you can use the Discord faucet.

1. Create an account <link to account creation>
2. Navigate to the #avail-faucet channel on [Avail Discord]()
3. Use the following command in the #avail-faucet channel:
`/deposit <your address> `
4. Your address will be deposited 1 AVL token. You can repeat this process every 3 minutes.
