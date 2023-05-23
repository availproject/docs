---
id: avail-explorer
title: Using the Explorer
sidebar_label: Using the Explorer
sidebar_position: 1
description: Getting started with the Avail Explorer
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
slug: avail-explorer
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Using the Avail Explorer

:::note

We are working on improving many of the current features. We appreciate you using our testnet and encourage your valuable feedback through one of our [<ins>community channels</ins>](https://discord.gg/y6fHnxZQX8).

:::

## Generate an Avail Account

You can generate an account using one of two methods:
- [Avail Explorer](https://testnet.avail.tools/)
- Console/Typescript

<Tabs
  defaultValue="explorer"
  values={[
    { label: 'Avail Explorer', value: 'explorer', },
    { label: '@polkadot/api', value: 'library', },
  ]
}>
<TabItem value="explorer">

Head over to [Avail Explorer](https://testnet.avail.tools/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.avail.tools/)** is a fork
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
This section will soon be updated with instructions to receive the 
AVL testnet tokens into your account address.


<!-- ## Receive AVL Testnet Tokens

On the Avail Explorer, click on the icon next to your account name to
copy your address.  Alternatively, you can copy the address manually.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Join our [<ins>Discord</ins>](https://discord.gg/y6fHnxZQX8) and use
the /deposit command with your address to receive testnet tokens.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Upon successful transfer, your account should now have a non-zero balance. If you face any issues
obtaining tokens from the faucet, please reach out on
[Discord](https://discord.gg/y6fHnxZQX8). -->

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

Submit the transaction. Head over to the [Avail Explorer](https://testnet.avail.tools/#/explorer).
The recent event list should list your transaction. You can click on the event and expand it to check out
the transaction details.

</TabItem>

<TabItem value="data">

In this example, `submitBlockLengthProposal` is used to submit data.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Enter the values you wish to submit as part of this transaction for `row` and `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Submit the transaction. Head over to the [Avail Explorer](https://testnet.avail.tools/#/explorer).
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
  const provider = new WsProvider('wss://testnet.avail.tools/ws');

  // Create the API and wait until ready
  return ApiPromise.create({
     provider,
      rpc: {
          kate: {
              blockLength: {
                  description: "Get Block Length",
                  params: [
                      {
                          name: 'at',
                          type: 'Hash',
                          isOptional: true
                      }
                  ],
                  type: 'BlockLength'
              },
              queryProof: {
                  description: 'Generate the kate proof for the given `cells`',
                  params: [
                      {
                          name: 'cells',
                          type: 'Vec<Cell>'
                      },
                      {
                          name: 'at',
                          type: 'Hash',
                          isOptional: true
                      },
                  ],
                  type: 'Vec<u8>'
              },
              queryDataProof: {
                  description: 'Generate the data proof for the given `index`',
                  params: [
                      {
                          name: 'data_index',
                          type: 'u32'
                      },
                      {
                          name: 'at',
                          type: 'Hash',
                          isOptional: true
                      }
                  ],
                  type: 'DataProof'
              }
          }
      },
      types: {
          AppId: 'Compact<u32>',
          DataLookupIndexItem: {
              appId: 'AppId',
              start: 'Compact<u32>'
          },
          DataLookup: {
              size: 'Compact<u32>',
              index: 'Vec<DataLookupIndexItem>'
          },
          KateCommitment: {
              rows: 'Compact<u16>',
              cols: 'Compact<u16>',
              dataRoot: 'H256',
              commitment: 'Vec<u8>'
          },
          V1HeaderExtension: {
              commitment: 'KateCommitment',
              appLookup: 'DataLookup'
          },
          VTHeaderExtension: {
              newField: 'Vec<u8>',
              commitment: 'KateCommitment',
              appLookup: 'DataLookup'
          },
          HeaderExtension: {
              _enum: {
                  V1: 'V1HeaderExtension',
                  VTest: 'VTHeaderExtension'
              }
          },
          DaHeader: {
              parentHash: 'Hash',
              number: 'Compact<BlockNumber>',
              stateRoot: 'Hash',
              extrinsicsRoot: 'Hash',
              digest: 'Digest',
              extension: 'HeaderExtension'
          },
          Header: 'DaHeader',
          CheckAppIdExtra: {
              appId: 'AppId'
          },
          CheckAppIdTypes: {},
          CheckAppId: {
              extra: 'CheckAppIdExtra',
              types: 'CheckAppIdTypes'
          },
          BlockLength: {
              max: 'PerDispatchClass',
              cols: 'Compact<u32>',
              rows: 'Compact<u32>',
              chunkSize: 'Compact<u32>'
          },
          PerDispatchClass: {
              normal: 'u32',
              operational: 'u32',
              mandatory: 'u32'
          },
          DataProof: {
              root: 'H256',
              proof: 'Vec<H256>',
              numberOfLeaves: 'Compact<u32>',
              leaf_index: 'Compact<u32>',
              leaf: 'H256'
          },
          Cell: {
              row: 'u32',
              col: 'u32',
          }
      },
      signedExtensions: {
          CheckAppId: {
              extrinsic: {
                  appId: 'AppId'
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
        const nonce = (await api.rpc.system.accountNextIndex(address)).toNumber();
        // Use nonce:-1 if the following nonce query is not working
        const unsub = await createId
            .signAndSend(
            pair,
            { app_id: 0, nonce: nonce},
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
  const provider = new WsProvider('wss://testnet.avail.tools/ws');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
        rpc: {
            kate: {
                blockLength: {
                    description: "Get Block Length",
                    params: [
                        {
                            name: 'at',
                            type: 'Hash',
                            isOptional: true
                        }
                    ],
                    type: 'BlockLength'
                },
                queryProof: {
                    description: 'Generate the kate proof for the given `cells`',
                    params: [
                        {
                            name: 'cells',
                            type: 'Vec<Cell>'
                        },
                        {
                            name: 'at',
                            type: 'Hash',
                            isOptional: true
                        },
                    ],
                    type: 'Vec<u8>'
                },
                queryDataProof: {
                    description: 'Generate the data proof for the given `index`',
                    params: [
                        {
                            name: 'data_index',
                            type: 'u32'
                        },
                        {
                            name: 'at',
                            type: 'Hash',
                            isOptional: true
                        }
                    ],
                    type: 'DataProof'
                }
            }
        },
        types: {
            AppId: 'Compact<u32>',
            DataLookupIndexItem: {
                appId: 'AppId',
                start: 'Compact<u32>'
            },
            DataLookup: {
                size: 'Compact<u32>',
                index: 'Vec<DataLookupIndexItem>'
            },
            KateCommitment: {
                rows: 'Compact<u16>',
                cols: 'Compact<u16>',
                dataRoot: 'H256',
                commitment: 'Vec<u8>'
            },
            V1HeaderExtension: {
                commitment: 'KateCommitment',
                appLookup: 'DataLookup'
            },
            VTHeaderExtension: {
                newField: 'Vec<u8>',
                commitment: 'KateCommitment',
                appLookup: 'DataLookup'
            },
            HeaderExtension: {
                _enum: {
                    V1: 'V1HeaderExtension',
                    VTest: 'VTHeaderExtension'
                }
            },
            DaHeader: {
                parentHash: 'Hash',
                number: 'Compact<BlockNumber>',
                stateRoot: 'Hash',
                extrinsicsRoot: 'Hash',
                digest: 'Digest',
                extension: 'HeaderExtension'
            },
            Header: 'DaHeader',
            CheckAppIdExtra: {
                appId: 'AppId'
            },
            CheckAppIdTypes: {},
            CheckAppId: {
                extra: 'CheckAppIdExtra',
                types: 'CheckAppIdTypes'
            },
            BlockLength: {
                max: 'PerDispatchClass',
                cols: 'Compact<u32>',
                rows: 'Compact<u32>',
                chunkSize: 'Compact<u32>'
            },
            PerDispatchClass: {
                normal: 'u32',
                operational: 'u32',
                mandatory: 'u32'
            },
            DataProof: {
                root: 'H256',
                proof: 'Vec<H256>',
                numberOfLeaves: 'Compact<u32>',
                leaf_index: 'Compact<u32>',
                leaf: 'H256'
            },
            Cell: {
                row: 'u32',
                col: 'u32',
            }
        },
        signedExtensions: {
            CheckAppId: {
                extrinsic: {
                    appId: 'AppId'
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
    const nonce = (await api.rpc.system.accountNextIndex(address)).toNumber();

    try{
        let APP_ID = 1;
        let VALUE = `iucakcbak`;
        let transfer = api.tx.dataAvailability.submitData(VALUE);
        // Use nonce:-1 if the following nonce query is not working
        const unsub = await transfer
            .signAndSend(
            pair,
            { app_id: APP_ID, nonce: nonce},
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

You can head over to the [Avail Explorer](https://testnet.avail.tools/#/explorer), and the
recent event list should list your transaction. You can click on the event and expand it to check out
the transaction details.

</TabItem>
</Tabs>
