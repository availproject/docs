---
id: avail-upgrade-validator-node
title: Upgrading Validators
sidebar_label: Upgrading Validators
description: "Learn about upgrading a validator"
keywords:
  - docs
  - avail
  - node
  - validator
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-upgrade-validator-node
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Upgrade Process

Upgrading a Avail node involves a careful process to ensure a smooth transition without disruption to the network. Here's a step-by-step guide on how to upgrade a Avail node, 
including the process of switching nodes using rotated keys:

- Preparing for the Upgrade:

	- Ensure you have a backup of your node's data and keystore files. This ensures you can restore your node in case of any issues during the upgrade process.
	Familiarize yourself with the release notes and documentation of the new Avail version to understand any specific instructions or requirements.
	
- Setting up Node B:
	- Install and set up the new version of Avail on a separate server or machine. This will be Node B, which will eventually replace Node A. Configure Node B with the 
	necessary configuration files, including the customizations you had on Node A. Ensure that Node B is fully synchronized with the Avail network before proceeding.

- Generating Rotated Keys:
	- Generate a new set of keys for Node B using `author_rotateKeys`. 

- Updating Session Keys:
	- Open Avail Apps and navigate to [**Network &rarr; Staking**](https://testnet.avail.tools/#/staking/actions). You will be able to select from a hidden menu the option 
	to change session keys.

	 <img src={useBaseUrl("img/avail/validator-change-session-keys.png")} width="100%" height="100%"/>

	- Can enter the hex-encoded value obtained from `author_rotateKeys` and click on **Set Session Key**.
	
	 <img src={useBaseUrl("img/avail/validator-change-session-keys-2.png")} width="100%" height="100%"/>

	- You will now be able to see the new and old hex-encoded value. In the next epoch or two it will only show the new hex-encoded 
	value.

	 <img src={useBaseUrl("img/avail/validator-change-session-keys-3.png")} width="100%" height="100%"/>

	- After a few epochs Node B will be performing the validator tasks. You must ensure this by looking in the logs for sealed blocks. You should see `🎁 Prepared block for proposing` appear
	 in the logs of Node B and stop appearing Node A.


- You can now upgrade Node A. You can repeat the process to switch back to Node A.

:::warning Ensure the node has switched

Before turning Node A off you must ensure Node B has become the active validator. In Avail Apps it may show the switch, however there is an epoch delay before the node 
fully switches over. The best is to look in the logs and confirm the new node is sealing the blocks.

:::

