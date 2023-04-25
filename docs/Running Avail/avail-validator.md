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

The easiest way to deploy your own Avail validator node is to use the Manual setup. But please take additional care about the node security aspects. A few tips and tricks provided throughout this document may prove to be useful. 

### Prerequisites for node setup
Ensure that, follwing three things are ready with you -
1. To create **Stash** and **Controller** accounts please visit Avail [Explorer](https://testnet.avail.tools/), preferably in the incognito mode. 

🗒️ The Avail [Explorer](https://testnet.avail.tools/) is a fork of [Polkadot-JS-Apps](https://polkadot.js.org/). The interface and navigation are the same if you are familiar with Polkadot-JS Apps.

<br />
    
    On the **Accounts** page, click **Add account** button and follow steps in the pop-up window to create your *Stash* and *Controller* accounts.
    <img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

    Another option to create an account is to run the following command. <br />
    **PS**: But before using this command you should build the node binary first.

    ```bash
    ./target/release/data-avail key generate --scheme Sr25519 --password-interactive
    ```
    Type a password for the generated keys

    The command generates keys and displays output similar to the following:

    ```console
    Secret phrase:     cherry xxxx yyyy zzzz xxyy xxyyzz xxyyxxzz gap xxyyzz yyzz xxyyz cheese
    Network ID:        substrate
    Secret seed:       0x4bxxxyyyf903e6czzzxxxyyyjk6d90xxxyyyzzzpppqqqc7510exxxyyyzzzad271
    Public key (hex):  0x2c47bxxxyyyzzzpppqqq1ece27862exxxyyyzzzpppqqq62a1bexxxyyyzzz262b
    Account ID:        0x2c47bxxxyyyzzzpppqqq1ece27862exxxyyyzzzpppqqq62a1bexxxyyyzzz262b
    Public key (SS58): 5D4mxxxyyyzzzdSgSVbcxxxyyyzzztk8VXxxxyyyzzzRXP22
    SS58 Address:      5D4mxxxyyyzzzdSgSVbcxxxyyyzzztk8VXxxxyyyzzzRXP22
    ```
    
2. Raw chain spec to connect to the Avail testnet is available [here](http://testnet.avail.tools/chainspec.raw.json)  
3. The p2p address (similar to the one shown below) of the boot node to connect to 
ip4/32.xxx.yyy.21/tcp/30333/p2p/12D3KoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYwLNRAnW

Reach out to Avail Team for getting AVL tokens in your stash account and the p2p address of the bootnode.



### 1. Run `data-avail` binary to connect to the testnet

If you built the `data-avail` binary from sources, then navigate to your `avail` directory and run:

```bash
./target/release/data-avail --base-path /tmp/Testnet --chain misc/genesis/avail-testnet-raw-chain-spec.json --port 30333 --validator --bootnodes /ip4/32.xxx.yyy.21/tcp/30333/p2p/12D3KoxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxYwLNRAnW*
```

- The `--validator` flag makes this new node run as a validator node
- The `--base-path` flag specifies that, `/tmp/Testnet` is the directory where this new node will maintain its local store.
- Apart from 30333, one can specify other ports such as `ws-port` to connect to using the Avail block explorer and `rpc-port` where this new node will listen to `rpc-calls`.
    
    > For security reasons those ports are not specified at this stage. Please refer to `data-avail` `--help` documentation if you need to know more about those options and flags.
    > 

<aside>
💡 **Running data-avail binary as service:** The command line execution shown above is not the best way to use the `data-avail` binary in production. We recommend that you build a service around `data-avail` binary to use in your production environments. 
</aside>

Note that, `--bootnodes` flag uses p2p address of the bootnode that you received from Avail team. After issuing this command, you should get output logs on your screen.

If using the pre-built binaries, then issue the above command from the directory where you have your `data-avail` binary. Also ensure that the path appropriately points to your `raw chain spec` file and the `local store` directory. 

<aside>
⚠️ The output must show at least one peer, otherwise there is something wrong in the command execution, such as a typo, an incorrect parameter, etc. 
</aside>

Successfully connecting one or more peers indicates that your new node is now successfully connected to the Avail testnet.

### 2. Insert keys in the node’s key store for Controller account and generate session key for the node

Open another command line session, navigate to the `avail` directory and then

1.  Open a text editor such as nano, vim, or gedit.
2.  Type the following command in the text editor:

```bash
#! /bin/bash
./target/release/data-avail key insert --base-path /tmp/Testnet --chain avail-testnet-raw-chain-spec.json --scheme Sr25519 --suri 0x13ffxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxd7cf8292f3  --password-interactive --key-type babe
```
3.  Save the file with a .sh extension, for example, "data-avail.sh".

4.  Open a terminal and navigate to the directory where the sh file is located.

5.  Make the file executable by running the following command:

```bash
chmod +x data-avail.sh
```
6. Finally, run the sh file by typing the following command in the terminal:

```bash
./data-avail.sh
```

You can directly use the command directly instead of making a sh file, but for security reasons we prefer this way. <br />


This command inserts key for [BABE](https://wiki.polkadot.network/docs/learn-consensus#block-production-babe) (the block production mechanism) in the key store of the validator node. Argument `--suri` specifies the secret seed used to generate SS58 address and public key for the Controller account. You may use it in “quotes” in its mnemonic form, or the way shown above as a raw seed. 

The JSON file of your Controller account has this raw seed as the `genesisHash`.

Like this, insert the key for the grandpa, imon and audi pallets used in the Avail node. For that, the above command should be **repeated for each pair of key type and scheme** shown in the following table:

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

<aside>
💡 **Caution: Avoid inserting the keys through command line** This command line execution is not the best way to insert the keys in production because it could reveal the `--suri` parameters through command history. We recommend use of any secure solution or at least use a shell script. 
</aside>

Now to generate the session key for this node execute following command -

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933/
```

<aside>
💡 Even though RPC port is not explicitly exposed while running the node, the above command executes because by default `data-avail` binary allows access to the RPC port locally.
</aside>

It gives an output something similar to:

```
{"jsonrpc":"2.0","result":"0x14cccxxxyyyzzzpppqqq9493ee3b5c48eb4c7660bdcc0bc7xxxyyyzzzpppqqq0436c6714c050fe7302a7xxxyyyzzzpppqqq2011cf46aa936cbf0142xxxyyyzzzpppqqq184d47cc02d1b58767edb36ed91xxxyyyzzzpppqqq24fe5a4b7f1ae95ada24xxxyyyzzzpppqqq3ab030512dbebdf80ede860xxxyyyzzzpppqqqc10c218","id":1}
```

**Please copy and preserve the output that you are getting**, as it is needed later. Specifically the `result` field from this output, which is the session key.

Now **do not forget to restart the Avail node i.e. Avail service**. Once the Avail node is back up and running, proceed to the final section.



### 3. Stake AVLs and associate session key to the Controller account to become new validator

Now [Avail Explorer](https://testnet.avail.tools) can be used to stake AVLs and associate the session key with the Controller account and thereby run Validator node. Go to the Accounts page on [Avail Explorer](https://testnet.avail.tools) where you should see your Stash and Controller accounts. If you do not see them there, simply restore them by importing their respective JSON files. 

<aside>
⚠️ Please note that, it is better to wait till your node syncs with the testnet before you carry out the steps in this section. Node sync status can be checked by looking at your node logs.  
</aside>

Ensure following configurations for your validator's **Stash** and **Controller** accounts:

- **Stash** account - The minimum bonding amount is 1000. Make sure that your Stash account contains at least this much. You can, of course, stake more than this.
    
    <aside>
    ⚠️ Keep most of your funds in stash account and small, say just enough funds in the controller account to pay for fees. Please do not bond all the AVLs you have so that you have some spare AVLs to pay transaction fees from your un-bonded balance.
    </aside>
    
- **Controller** account - Keep only a few AVLs in this account to start and stop validating.
- **Value** bonded - The amount of AVL tokens you intend to bond from the Stash account.
    
    <aside>
    💡 No need to bond all of the AVL in that account, later you can always bond more `AVL` later, if needed. However, withdrawing any bonded amount requires the duration of the unbonding period.
    </aside>
    
- **Payment** destination - This is the account where rewards for validation are sent. More information can be found [here](https://wiki.polkadot.network/docs/learn-staking#reward-distribution).

Navigate to the “Staking” sub-tab under the “Network” tab and select “Account actions”. Here you see options to “Add Nominator”, “Add Validator”, and “Add Stash” as shown in figure below. Click on the “Add Stash” option.

<img src={useBaseUrl("img/avail/StakingPage.png")} width="100%" height="100%"/>

Follow the process to provide your “Stash” and ‘Controller’ accounts as well as the AVLs you intend to bond. Only after this is done, the "Session Key" option (as seen in the figure above) will be visible. 
Select the “Session Key” option; it will pop a dialog box where you can paste the session key (i.e. the key generated by the author_rotateKeys() RPC call as explained in earlier section). Follow the process, once you add the session key, the maintainer's actions are available i.e. “Validate” and “Nominate” can be seen as shown in figure below.

<img src={useBaseUrl("img/avail/ValidateNominate.png")} width="100%" height="100%"/>

Select “Validate” option and follow the process to configure your node as new validator on Avail testnet. If enough AVLs are bonded/staked (preferably more that those staked by existing set of validators), your newly added node will soon get chosen in the set of active validators, after say one or two Era time. 

To verify that your node is live and synchronized, navigate to
[**Network &rarr; Staking**](https://testnet.avail.tools/#/staking) and select
**Waiting**. Your account should be shown there. A new validator set is selected every **era**, based on the staking amount.

Alternatively, after one or two Era time you will see the screen something like the one shown below -

<img src={useBaseUrl("img/avail/Validator.png")} width="100%" height="100%"/>

Congratulations! Your new node is now validating the Avail testnet.

