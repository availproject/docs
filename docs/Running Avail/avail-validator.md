---
id: avail-validator
title: Run an Avail Validator
sidebar_label: Run a Validator
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

## Manual Setup

The easiest way to deploy your own Avail validator node is a Manual setup. But before we start, need to ensure a few pre-requisites for *Manual Setup*, explained in next *Praparing for Node Configuration* section.

### Preparing for Node Configuration

Please ensure that, follwing three things are ready with you -
1. Create a **Stash** and **Controller** account and obtain AVLs for these accounts.
2. Raw chain spec for the chain to connect to (i.e. testnet or devnet chain spec)
3. Address of the node to connect to (i.e. p2p address of a node on testnet or devnet)

1. To create **Stash** and **Controller** accounts -
Please visit Polygon Avail Explorer [here](https://testnet.avail.tools/), preferably in the incognito mode.

<aside>
🗒️ The **[Avail Explorer](https://testnet.avail.tools/)** is a fork of **[Polkadot-JS Apps](https://polkadot.js.org/).** The interface and navigation are the same if you are familiar with Polkadot-JS Apps.

</aside>

Navigate to the **Accounts** tab and click on the **Accounts** sub-tab as shown in figure below. 

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>


On this **Accounts** page, click on the **Add account** button and follow the steps in the pop-up window to create your *Stash* and *Controller* accounts.

Please reachout to the Avail team with your *Stash* account address to seek the AVL tokens for validating.

2. If you have built the `data-avail` binary from sources, you already have the *raw chain spec* to connect to the testnet in `avail/misc/genesis` folder file `avail-testnet-raw-chain-spec.json`, if not, reach out to Avail team. But if you are using the binary directly, then please reach out to Avail team to get the *raw chain spec* to connect to.

3. Please reach out to the Avail team to obtain the p2p address (similar to the one shown below) of a node to connect with. 

```bash
**p2p address:** *ip4/32.xxx.yyy.21/tcp/30333/p2p/12D3KoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYwLNRAnW*
```

Now, the *Manual Setup* comprises of follwoing three steps -

* ***1. Run `data-avail` binary to connect to the testnet***
* ***2. Insert keys in the node’s key store for Controller account and Generate session key for the node***
* ***3. Stake AVLs and Associate session key to the Controller account to become new validator***

### 1. Run `data-avail` binary to connect to the testnet

If you built the `data-avail` binary from the sources, then navigate to your `avail` directory and run:

```bash
[ec2-user@ip-171-32-14-198 avail]$ *./target/release/data-avail --base-path /tmp/Testnet --chain misc/genesis/avail-testnet-raw-chain-spec.json --port 30333 --validator --bootnodes /ip4/32.xxx.yyy.21/tcp/30333/p2p/12D3KoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYwLNRAnW*
```

- The `--validator` flag indicates that we intend to run this new node as a validator node
- The `--base-path` flag identifies `/tmp/Testnet` is the directory where this new node will maintain its local store.
- Apart from port 30333, we can specify other ports such as `ws-port` , which specifies the port you can use to connect to using the Avail block explorer, and `rpc-port`, which is the port where this new node will listen to `rpc-calls`.
    
    > For security reasons we are not specifying those ports and they are not needed at this stage. Please refer to `data-avail` `--help` documentation if you need to know more about those options and flags.
    > 

<aside>
💡 **Running data-avail binary as service:** This is not the best way to use the `data-avail` binary in production. We recommend that you build the service around `data-avail` binary to use in your production environments.
</aside>

Note that, the `--bootnodes` flag uses the p2p address of the bootnode that you received from Avail team. After issuing this command, you should get output logs on your screen.

If you are using the pre-built binaries, then issue the above command from the directory where you have your `data-avail` binary. Ensure that you change the path appropriately to point to your `raw chain spec` file and the `local store` directory. 

<aside>
⚠️ The output must show at least one peer, otherwise there is something wrong in the command execution, such as a typo, an incorrect parameter, etc. 
</aside>

Successfully connecting one or more peers indicates that your new node is now successfully connected to the Avail testnet.



### 2. Insert keys in the node’s key store for Controller account and Generate session key for the node

Open another command line session, navigate to the `avail` directory and then run the following command:

```bash
*[ec2-user@ip-171-32-14-198 avail]$./target/release/data-avail key insert --base-path /tmp/Testnet --chain avail-testnet-raw-chain-spec.json --scheme Sr25519 --suri* 0x13ffxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxd7cf8292f3  *--password-interactive --key-type babe* 
```

This command inserts key for [BABE](https://wiki.polkadot.network/docs/learn-consensus#block-production-babe) (the block production mechanism) in the key store. The argument `--suri` specifies the secret seed used to generate the SS58 address and public key for the Controller account. You may use it in “quotes” in its mnemonic form, or the way shown above as a raw seed. 

The JSON file of your Controller account has this raw seed as the `genesisHash`.

Like this insert the key for the grandpa, imon and audi pallets used in the Avail node. For that, the above command should be **repeated for each pair of key type and scheme** shown in the following table:

| Key type | Scheme    |
| -------- | --------- |
| babe     | Sr25519   |
| gran     | *Ed25519* |
| imon     | Sr25519   |
| audi     | Sr25519   |

> Please remember to key in the password for the Controller account when you are prompted to do so, every time you issue the `key insert` commands.
> 

<aside>
💡 **Additional Help:** For the key insertion commands, there is a provision to input the key `--suri` parameter through a file as input instead of argument in the command. Please refer to the [Substrate subkey documentation](https://docs.substrate.io/reference/command-line-tools/subkey/) to know more about using the `key insert` [command](https://docs.substrate.io/tutorials/get-started/add-trusted-nodes/) and reading `--suri` argument from a file.

</aside>

Now to generate the session key for this node execute following command -

```jsx
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' [http://localhost:9933](http://localhost:9933/)
```

<aside>
💡 Even though RPC port is not explicitly exposed while running the node, the above command executes because by default the `data-avail` binary allows access to the RPC port locally.
</aside>

It gives an output something similar to:

```jsx
{"jsonrpc":"2.0","result":"0x14cccfe72a5606902b429493ee3b5c48eb4c7660bdcc0bc7df59cb5a7a959570436c6714c050fe7302a74b0555eb65445af2011cf46aa936cbf014255a75e1946a2ee9184d47cc02d1b58767edb36ed911c29a8e927e104e24fe5a4b7f1ae95ada248033170a1ed9f2a3ab030512dbebdf80ede8607077466fb549ed3c10c218","id":1}
```

**Please copy and preserve this output**, as it is needed later. Specifically the `result` field from this output, which is the session key.

Now **do not forget to restart the Avail node i.e. Avail service**. Once the node is back up and running, proceed to the final section.



### 3. Stake AVLs and Associate session key to the Controller account to become new validator

Now [Avail Explorer](https://testnet.avail.tools) can be used to stake AVLs and associate the session key with the Controller account and thereby run Validator node. Go to the Accounts page on [Avail Explorer](https://testnet.avail.tools) where you should see your Stash and Controller accounts. If you do not see them there, simply restore them by importing their respective JSON files. 

Ensure following configurations for your validator's **Stash** and **Controller** accounts:

- **Stash** account - The minimum bonding amount is 1000. Make sure that your Stash account contains at least this much. You can, of course, stake more than this.
    
    <aside>
    ⚠️ Keep most of the funds in stash account as it is the custodian of your staking funds. Keep small, say just enough funds in the controller account to pay for fees. Make sure not to bond all the AVL balance since you will not be able to pay transaction fees from your bonded balance.
    </aside>
    
- **Controller** account - This account will need a small amount of AVL in order to start and stop validating.
- **Value** bonded - The amount of AVL tokens you intend to bond from the Stash account.
    
    <aside>
    💡 No need to bond all of the AVL in that account, later you can always bond more `AVL` later, if needed. However, withdrawing any bonded amount requires the duration of the unbonding period.
    </aside>
    
- **Payment** destination - This is the account where rewards for validation are sent. More information can be found [here](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).

Navigate to the “Staking” sub-tab under the “Network” tab, select “Account actions” where you see options to “Add Nominator”, “Add Validator”, and “Add Stash” as shown in figure below. Click on the “Add Stash” option.

<img src={useBaseUrl("img/avail/StakingPage.png")} width="100%" height="100%"/>

Follow the process to provide your “Stash” and ‘Controller’ accounts, along with the AVL you intend to bond for staking. Only after this is done, the "Session Key" option (as seen in the figure above) will be visible. Select the “Session Key” option; it will pop a dialog box where you can paste the session key (i.e. the key generated by the author_rotateKeys() RPC call as explained in earlier section). Follow the process, once you add the session key, the maintainer's actions available i.e. “Validate” and “Nominate” as shown in figure below.

<img src={useBaseUrl("img/avail/ValidateNominate.png")} width="100%" height="100%"/>

Select “Validate” option and follow the process to configure your node as the new validator on Avail testnet. If enough AVLs are bonded/staked (preferably more that those staked by existing set of validators), your newly added node will soon get chosen in the set of active validators, after say one or two Era time. 

To verify that your node is live and synchronized, navigate to
[**Network &rarr; Staking**](https://testnet.avail.tools/#/staking) and select
**Waiting**. Your account should be shown there. A new validator set is selected every **era**, based on the staking amount.

Alternatively, after one or two Era time you will see the screen something like the one shown below -

<img src={useBaseUrl("img/avail/Validator.png")} width="100%" height="100%"/>

Congratulations! Your new node is now validating the Avail testnet.

