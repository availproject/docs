---
id: managing-accounts
title: Create an Account
sidebar_label: Create an Account
sidebar_position: 2
description: Managing Avail accounts
keywords:
  - docs
  - avail
  - explorer
  - accounts
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: managing-accounts
---
import useBaseUrl from '@docusaurus/useBaseUrl';

You can create accounts on the Kate testnet directly from the [explorer](https://kate.avail.tools/).

1. Open the [explorer](https://kate.avail.tools/).
2. Navigate to Accounts -> Accounts.
   <img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%" />
3. Click on the +Account button.
   <img src={useBaseUrl("img/avail/add-account.png")} />
4. Follow the account creation wizard to complete creating your
   account.
5. The account creation wizard downloads your account's JSON file to
   your file system at the end of the process. You may be prompted to
   allow the browser to download the files.

:::caution Secret Management

The only ways to get access to your account are via your secret seed or your account’s JSON file in combination with a password. Keep them offline in a secure and private location.

:::
