---
id: migrate
title: How to Use Migrate Your RollApp to Use Avail
sidebar_label: Migrate Your RollApp
description: 'Discover how to migrate your existing RollApp to the Avail Goldberg testnet.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
  - dymension
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

For developers who previously ran RollApps and are looking to migrate to the Avail Goldberg network, the following guide outlines how to do so.

## 1. Stop All Roller Services

Before initiating the migration, ensure that all Roller services associated with your RollApp are halted. This is crucial to prevent any conflicts or data corruption during the transition.

## 2. Update Avail Network Endpoint

The next step involves updating the Avail endpoint to point to the Goldberg network.
Run the following command, replacing `ROLLER_HOME_DIR` with your Roller home directory:

```bash
sed -i 's|wss://dymension-devnet.avail.tools/ws|wss://goldberg.avail.tools/ws|g' <ROLLER_HOME_DIR>/rollapp/config/dymint.toml
```

This command modifies the Avail network endpoint in your RollApp configuration file.

## 3. Retrieve Your Avail Address

To proceed with the migration, you need your Avail address. Obtain this by running the following command:

```bash
roller keys list
```

This command will list the keys associated with your RollApp, including the Avail address.

## 4. Fund Your Avail Address

With your Avail address in hand, head to the Avail faucet to secure the necessary funding for your RollApp on the Goldberg network. Follow the [<ins>faucet guide instructions</ins>](/docs/about/faucet.md) to deposit testnet tokens into your Avail address.

## 5. Restart All Services

Once the Avail address is funded and the network endpoint updated, you can restart all Roller services.
This restart will initiate your RollApp on the Avail Goldberg network, completing the migration process.

### Post-Migration Verification

After completing these steps, it's crucial to verify that your RollApp is functioning correctly on the Avail Goldberg network. Monitor your RollApp's performance and transactions to ensure that everything is operating as expected.

## 6. Add Your RollApp to the Dymension Portal

:::info Prove RollApp Ownership

An [<ins>ownership verification process</ins>](#ownership-verification) is mandatory for any PR submitted to the Dymension registry that modifies an existing app to switch to the Avail Incentivized Testnet. It verifies that the team modifying the registry entry is the actual owner of the RollApp. This process is not required for PRs that add completely new apps.
:::

If your existing RollApp is **not registered** on the Dymension registry, follow the instructions in the README file of the **[<ins>RollApp registry repository</ins>](https://github.com/dymensionxyz/rollapp-registry)**. This process involves raising a pull request with the necessary details and configurations.

<p align="center"><img src="/img/dymension/rollapps-register.png" alt="Register RollApp" width="80%"/></p>

As part of the PR submission, **a verification transaction using the sequencer is required to prove ownership of the RollApp**.

### Ownership Verification

1. **Contact a Moderator**: Reach out to a moderator on Discord to obtain the specific amount needed for the verification transaction. This amount will be unique to each verification process to ensure authenticity.

2. **Export the Sequencer's Private Key**: Carefully export the private key of the `hub_sequencer` address. Remember to excerise caution as this is a sensitive operation.

```bash
roller keys export hub_sequencer
```

3. **Import Key into any EVM Wallet**:

   - Open your wallet application, such as MetaMask.
   - Select the option to import an account.
   - Enter the sequencer's private key when prompted. Then, switch to that account; you should see the balance of your RollApp on the Dymension Hub.

4. **Send the Verification Transaction**:

   - After importing the sequencer's address into your wallet, conduct a transaction by sending the specified amount to the designated verification address.
   - Ensure the transaction details match the amount and destination address provided by the moderator.

5. **Submit Proof of Transaction in PR**:
   - Visit the [<ins>explorer link</ins>](https://fl.dym.fyi/) and obtain the transaction ID of the completed transfer.
   - Submit this URL as part of your RollApp registration process in the PR description or comment section.

Look out for the gold Avail logo next to your RollApp on the [<ins>Dymension Portal</ins>](https://portal.dymension.xyz/rollapps), signaling your integration with the Goldberg testnet.

<p align="center"><img src="/img/dymension/dy-portal-avail.png" alt="Avail RollApp Icon on Portal" width="90%"/></p>
