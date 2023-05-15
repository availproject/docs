---
id: avail-consensus
title: Avail's Consensus
sidebar_label: Consensus
description: Learn about Avail's consensus mechanism
keywords:
  - docs
  - avail
  - consensus
  - proof of stake
  - nominated proof of stake
  - pos
  - npos
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-consensus
---

# Avail's Consensus

## Data Availability Committees

Until now, the approach to maintaining DA solutions has generally been through a DAC (data availability committee). A DAC is responsible for posting signatures back to the main chain and attesting to the availability of off-chain data. The DAC must ensure that data is readily available.

Through a DAC, scaling solutions rely on a DAC to reach a Validium. The issue with DACs is that data availability becomes a trusted service upon a small group of committee members who are responsible for storing and truthfully reporting data.

Avail is not a DAC, but an actual blockchain network with its own consensus mechanism, and has its own set of validator nodes and block producers.

## Proof of Stake

:::caution Current validators

With the initial launch of the Avail testnet, validators will be
internally operated and maintained by Avail Labs.

:::

Traditional proof of stake systems require block production authors to have token holdings (stake) on-chain to produce blocks, as opposed to computational resources (work). 

Most protocols use PoS (proof of stake) or a modification of PoS. Usually, validators in traditional PoS systems that have the most stake have the most influence and control of the network.

Systems with many network maintainers tend to form off-chain pools to maximize capital gains by reducing reward variance. This centralization challenge alleviates when pools are included on-chain that allows token holders to back network maintainers who they feel best represent them and the interests of the network. This also distributes the validator power concentration, assuming the right voting and election mechanisms are in place, as the overall stake on the network is allocated as a one-to-many or many-to-many relationship instead of only relying on a one-to-one relationship, where trust is put in the "highest staked" validators.

This modification of proof of stake can be administered through delegation or nomination, commonly referred to as DPoS (delegated proof of stake) or NPoS (nominated proof of stake). Avail has adapted these enhanced mechanisms.

Avail uses NPoS with a modification in block verification. The actors involved are still validators and nominators.

Light clients can also contribute to data availability on Avail. Avail's consensus requires that two-thirds plus 1 of the validators reach consensus for validity.

## Nominators

Nominators can choose to back a set of candidate Avail validators with their stake. Nominators will nominate those validators who they feel will effectively provide data availability.

## Difference between DPoS and NPoS

At face value, delegation and nomination seem like the same action, especially from an avid staker's point of view. However, the differences lay in the underlying consensus mechanisms and how validator selection occurs.

In DPoS, a voting-centric election system determines a fixed number of validators to secure the network. Delegators can delegate their stake against candidate network validators by using it as voting power to back 
delegates. Delegators often support validators on the highest staked, as higher-staked validators have a higher chance of election. The delegates with the most votes become the network's validators and can verify transactions. While using their stake as voting power, on Avail, they are not subject to consequences via slashing if their elected validator behaves maliciously. In other DPoS systems, delegators may be subject to slashing.

In NPoS, delegators turn into nominators and use their stake in a similar manner to nominate potential candidate validators to secure the network. Stake is locked on-chain, and contrary to DPoS, nominators are subject to slashing based on the potential malicious behavior of their nominations. In this regard, NPoS is a more proactive staking mechanism as opposed to staking that is "set and forget," as nominators look out for well-behaving and sustainable validators. This also encourages validators to create robust validator operations to attract and maintain nominations.
