---
id: nomination-pools
title: How to Create Nomination Pools on Avail
sidebar_label: Nomination Pools
description: 'Learn how to create and join nomination pools on the Goldberg testnet.'
keywords:
  - docs
  - avail
  - explorer
  - nomination
  - nominate
  - pools
  - stake
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

## What Are Nomination Pools?

Nomination pools are a critical feature in Avail's consensus system, akin to those in [<ins>Polkadot and Substrate</ins>](https://wiki.polkadot.network/docs/learn-nomination-pools), They allow users to combine their stakes, effectively acting as a single nominator. This approach addresses the limitations of individual small stakes and ensures more efficient participation in the staking process.

<details>
<summary>Pool Mechanics</summary>

### Features

- **Accessibility**: Open to all users, with no minimum stake requirement.
- **Member Capacity**: Each pool can accommodate a large number of members, ensuring wide participation.
- **Reward System**: Rewards are distributed pro-rata but are not guaranteed if the pool's total stake is insufficient.

### Key Considerations

- **Nominating vs. Joining Pools**: Understand the differences between direct staking and pool participation.
- **Restrictions**: Bonded tokens in pools cannot be used for governance activities.
- **Support Channels**: Avail provides dedicated channels for queries and developer support regarding nomination pools.

### Components

- **Bonded Pool**: Manages actively staked funds.
- **Reward Pool**: Tracks earned rewards.
- **Unbonding Sub Pools**: Handles various unbonding phases.
- **Members**: Individuals contributing to the pools.
- **Points System**: A measure of a member's share in the pool.

### Member Lifecycle

1. **Joining**: Members can join a pool by contributing funds.
2. **Claiming Rewards**: Members claim their share of rewards based on their stake in the pool.
3. **Unbonding and Withdrawal**: Members can unbond and withdraw their funds, following a set duration.

### Limitations

- **Voting Restrictions**: Funds in nomination pools cannot be used for voting in governance matters.
- **Pool Switching**: To switch pools, members must unbond all funds, subject to a waiting period.

### Pool Administration

- **States**: Pools have various states like Open, Blocked, and Destroying.
- **Roles**: Includes Depositor, Nominator, Bouncer, and Root, each with specific responsibilities.
- **Commissions**: Pool commissions can be set and are applied to the rewards before distribution to members.

</details>

## Create a Pool

Nomination pool activites are performed under "Staking".

1. Navigate to "Network" and select "Staking" on the navbar.

   > By default, the Staking UI defaults to the Overview page, which shows you the number of validators, nomination pools, and other relevant staking statistics.

      <img src="/img/nomination-pools/1.png" width="200%" height="200%"/>

2. Under "Staking" select "Pools" to view existing nomination pools. Here, you will see a list of pools, their state, points, claimable rewards, and other details.

    <img src="/img/nomination-pools/2.png" width="200%" height="200%"/>

   :::info Joining a pool

   To join a pool, click the "Join" button next to the pool you're interested in and follow the prompts

   :::

3. Under the "Pools" section, click on "+ Add pool" on the right-hand side to create a new nomination pool.

<img src="/img/nomination-pools/3.png" width="200%" height="200%"/>

4. Fill in the initial value, description, and pool ID in the provided fields.
   <img src="/img/nomination-pools/4.png" width="200%" height="200%"/>

   > The 'pool id' field is a unique identifier for your pool.
   > In the 'description' field, provide a name for your pool. This metadata will serve as the name of your pool and be visible to other users who may wish to join.

5. Click "Sign and Submit" to proceed with the creation of your nomination pool.

<img src="/img/nomination-pools/5.png" width="200%" height="200%"/>

You should see your pool in the list of "All pool" and under the "Own pools" tab.
