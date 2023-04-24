---
id: avail-quick-start
title: How to use Avail
sidebar_label: Quick Start
description: Learn how to use Avail
keywords:
  - docs
  - avail
  - data
  - availability
  - how-to
  - extrinsic
  - explorer
  - use
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-quick-start
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# How to use Avail

:::note

We are working on improving many of the current features. We appreciate you using our testnet and encourage your valuable feedback through one of our [<ins>community channels</ins>](https://discord.gg/y6fHnxZQX8).

:::

## Generate an Avail Account

You can generate an account using one of two methods:
- [Avail Explorer](https://testnet.polygonavail.net/)
- Console/Typescript

<Tabs
  defaultValue="explorer"
  values={[
    { label: 'Avail Explorer', value: 'explorer', },
    { label: '@polkadot/api', value: 'library', },
  ]
}>
<TabItem value="explorer">

Head over to [Avail Explorer](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.polygonavail.net/)** is a fork
of **[Polkadot-JS Apps](https://polkadot.js.org/)**. The interface and navigation are the same
if you are familiar with Polkadot-JS Apps.

:::

Navigate to the **Accounts** tab and click on the **Accounts** sub-tab.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Address Format

As Avail is implemented using [Substrate](https://substrate.io/), generic Substrate addresses
always start with a 5 and follow the **[SS58 address format](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

On the Accounts page, click on the **Add account** button and follow the steps in the pop-up window.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Key Management

The seed phrase is your account key, which controls your account.
You should not store your seed phrase on a device that has or may have access to
an internet connection. The seed phrase should be written down and stored on a non-digital
medium.

Storing your account's JSON file does not have to be as rigourous as storing the seed phrase,
as long as you use a strong password to encrypt the file. You can import the JSON file to
access your account.

:::

## Receive AVL Testnet Tokens

On the Avail Explorer, click on the icon next to your account name to
copy your address.  Alternatively, you can copy the address manually.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Head over to the [faucet](https://faucet.polygon.technology).

On the faucet page, select `DA Network`  and  `DA (Test Token)` as the network and token.
Paste your account address and click on **Submit**. The transfer will up to one
minute to complete.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Upon successful transfer, your account should now have a non-zero balance. If you face any issues
obtaining tokens from the faucet, please reach out on
[Discord](https://discord.gg/y6fHnxZQX8).

## Submit a New Transaction

On the Avail Explorer, navigate to the **Developer** tab and click on
the **Extrinsics** sub-tab.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Select your newly created account.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

There are many extrinsics to choose from; go ahead and select
the `dataAvailability` extrinsic from the **extrinsic dropdown menu**.

:::info What are extrinsics?

Extrinsics are a form of external information and can either be inherents, signed transactions,
or unsigned Transactions. More details about extrinsics are available in the
[Substrate documentation](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

You can then use the dropdown menu on the right-hand side to create an application key or
submit data.

<Tabs
  defaultValue="key"
  values={[
    { label: 'Create an application key', value: 'key', },
    { label: 'Submit data', value: 'data', },
  ]
}>
<TabItem value="key">

In this example, `createApplicationKey` is used to create an application key.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Enter the value you wish to submit as part of this transaction using the `App_ID`, or
without a default key value as `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Before sending a transaction using `App_ID`, it must be created using the `createApplicationKey` field.

:::

Submit the transaction. Head over to the [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
The recent event list should list your transaction. You can click on the event and expand it to check out
the transaction details.

</TabItem>

<TabItem value="data">

In this example, `submitBlockLengthProposal` is used to submit data.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Enter the values you wish to submit as part of this transaction for `row` and `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Submit the transaction. Head over to the [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
The recent event list should list your transaction. You can click on the event and expand it to check out
the transaction details.

</TabItem>
</Tabs>

:::info How to get guarantees that the data behind the transaction is available?

We have abstracted out the nitty-gritty of verifying data availability and have hosted a light client
for your use. All you need to do is click on the block number against your desired transaction and
see all of the block details.

You will also see a **confidence factor**. If it shows `0%`, give it some time and recheck it later.
Otherwise, it should show a non-zero confidence level indicating the probability with which the underlying data
is available.

:::

</TabItem>
<TabItem value="library">

Alternatively, you can use the console/typescript to generate an Avail account
via [`@polkadot/api`](https://polkadot.js.org/docs/). Create a new folder and add the
JS library using `yarn add @polkadot/api` or `npm install @polkadot/api`

:::info

Make sure Typescript dependencies are added for running the script. Here,
`@polkadot/api` version `7.9.1` is used.

You can use `ts-node` to execute Typescript files in the console. Either use
`yarn add ts-node typescript '@types/node'` or `npm i ts-node typescript '@types/node'`
to install the packages.

For instance, if you create a script called `account.ts`, you can execute the script
in the command line by running:

```bash

ts-node account.ts

```

You will also need to **[connect to a node](../Running Avail/avail-node-management.md)** before running
the scripts.

:::

To generate an account, run the following script:

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {

  // Create the API and wait until ready
  return ApiPromise.create({
    types: {
        AccountInfo: 'AccountInfoWithRefCount',
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  const keyring = new Keyring({ type: 'sr25519'});
  const mnemonic = mnemonicGenerate();

  const pair = keyring.createFromUri(mnemonic, { name: 'test_pair' },'sr25519');
  console.log(pair.meta.name, 'has address', pair.address, 'and the mnemonic is', mnemonic);
  process.exit(0);

}
main().catch(console.error)

```

Sample Result:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Address Format

As Avail is implemented using [Substrate](https://substrate.io/), generic Substrate addresses
always start with a 5 and follow the **[SS58 address format](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Key derivation and signing algorithm

The reasons for using `sr25519` are outlined **[here](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Save the newly generated address and mnemonic phrase for next steps.

:::caution Key Management

The seed phrase is your account key, which controls your account.
You should not store your seed phrase on a device that has or may have access to
an internet connection. The seed phrase should be written down and stored on a non-digital
medium.

:::

## Receive AVL Testnet Tokens

Head over to the [faucet](https://faucet.polygon.technology).

On the faucet page, select `DA (Test Token)` and `DA Network` as the token and network,
respectively. Paste your account address and click on **Submit**. The transfer will take up to one
minute to complete.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Upon successful transfer, your account should now have a non-zero balance. If you face any issues obtaining tokens from the faucet, please reach out on [Discord](https://discord.gg/y6fHnxZQX8).

### Balance Check with `@polkadot/api`

Use the following script to check the balance of the account you just created:

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

import type { ISubmittableResult} from '@polkadot/types/types';

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://testnet.polygonavail.net/ws');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
    types: {
        DataLookup: {
          size: 'u32',
          index: 'Vec<(u32,u32)>'
        },
        KateExtrinsicRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        KateHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'KateExtrinsicRoot',
          digest: 'Digest',
          app_data_lookup: 'DataLookup'
        },
        Header: 'KateHeader',
        AppId: 'u32',
        CheckAppId: {
            extra: {
                appId: 'u32',
            },
            types: {}
        }
    },
    signedExtensions: {
      CheckAppId: {
        extrinsic: {
          appId: 'u32'
        },
        payload: {}
      },
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    //address which is generated from previous step👇
    let ADDRESS = '_ADDRESS_';
    console.log(ADDRESS);
    try{
      let { data: { free:balance}} = await api.query.system.account(ADDRESS)
      console.log(`${ADDRESS} has balance of ${balance}`)
    }catch (e){
      console.log(e)
    }finally{
      process.exit(0)
    }
}
main().catch(console.error)

```

Sample Result:

```
You are connected to chain Avail-Testnet using Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> You should get balance as `0` if the account is newly created and you have not used the faucet.
> You should also see the confirmation of the transaction.

:::tip Using The Avail Explorer

For convenience, you can add the account you generated with
`@polkadot/api` on the Avail Explorer UI to perform account actions.

:::

## Submit a New Transaction

You can use the provided scripts in this section to sign and submit transactions.

:::note

Replace `value` and `APP_ID` with those you want to submit.
Also, replace the mnemonic string with your own.

:::

<Tabs
  defaultValue="key-script"
  values={[
    { label: 'Create an application key', value: 'key-script', },
    { label: 'Submit data', value: 'data-script', },
  ]
}>
<TabItem value="key-script">

The following script creates an application key:

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

import type { ISubmittableResult} from '@polkadot/types/types';

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('ws://127.0.0.1:9944');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
    types: {
        DataLookup: {
          size: 'u32',
          index: 'Vec<(u32,u32)>'
        },
        KateExtrinsicRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        KateHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'KateExtrinsicRoot',
          digest: 'Digest',
          app_data_lookup: 'DataLookup'
        },
        Header: 'KateHeader',
        AppId: 'u32',
        CheckAppId: {
            extra: {
                appId: 'u32',
            },
            types: {}
        }
    },
    signedExtensions: {
      CheckAppId: {
        extrinsic: {
          appId: 'u32'
        },
        payload: {}
      },
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  //enter your mnemonic generated from the previous step and replace below.
  const pair = keyring.addFromUri( 'put your mnemonic', { name: 'test pair' }, 'sr25519');
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);
  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    try{
        let KEY = 1;
        let createId = api.tx.dataAvailability.createApplicationKey(KEY);
        const unsub = await createId
            .signAndSend(
            pair,
            { app_id: 0},
            ( result: ISubmittableResult ) => {
                console.log(`Tx status: ${result.status}`);

                if (result.status.isInBlock) {
                    console.log(`Tx included at block hash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Tx included at blockHash ${result.status.asFinalized}`);

                    result.events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                    });
                    unsub
                    process.exit(0);
                }
            });
    }catch(e){
        console.error(e);
    }
}
main().catch(console.error)

```

</TabItem>
<TabItem value="data-script">

The following script submits data:

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

import type { EventRecord, ExtrinsicStatus, H256, SignedBlock } from '@polkadot/types/interfaces';
import type { ISubmittableResult} from '@polkadot/types/types';

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://testnet.polygonavail.net/ws');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
    types: {
        DataLookup: {
          size: 'u32',
          index: 'Vec<(u32,u32)>'
        },
        KateExtrinsicRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        KateHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'KateExtrinsicRoot',
          digest: 'Digest',
          app_data_lookup: 'DataLookup'
        },
        Header: 'KateHeader',
        AppId: 'u32',
        CheckAppId: {
            extra: {
                appId: 'u32',
            },
            types: {}
        }
    },
    signedExtensions: {
      CheckAppId: {
        extrinsic: {
          appId: 'u32'
        },
        payload: {}
      },
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  //enter your mnemonic generated from the previous step and replace below 👇.
  const pair = keyring.addFromUri( 'enter mnemonic here', { name: 'test pair' }, 'sr25519');
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    try{
        let APP_ID = 1;
        let VALUE = `iucakcbak`;
        let transfer = api.tx.dataAvailability.submitData(VALUE);
        const unsub = await transfer
            .signAndSend(
            pair,
            { app_id: APP_ID},
            ( result: ISubmittableResult ) => {
                console.log(`Tx status: ${result.status}`);

                if (result.status.isInBlock) {
                    console.log(`Tx included at block hash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Tx included at blockHash ${result.status.asFinalized}`);

                    result.events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                    });

                    process.exit(0);
                }
            });
    }catch(e){
        console.error(e);
    }
}
main().catch(console.error)

```

</TabItem>
</Tabs>

You can head over to the [Avail Explorer](https://testnet.polygonavail.net/#/explorer), and the
recent event list should list your transaction. You can click on the event and expand it to check out
the transaction details.

:::info How to get guarantees that the data behind the transaction is available?

You can use the following curl request to check out the confidence level. Just replace the block number with the
one you wish to get availability guarantees for.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
