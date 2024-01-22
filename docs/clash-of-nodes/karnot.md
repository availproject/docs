---
id: karnot
title: DRAFT - How to Deploy App-Chains Rollups using Karnot
sidebar_label: Karnot App-Chains
description: 'Discover how to utilize the Avail Goldberg testnet as a DA layer to build RollApps with the Dymension Froopyland testnet.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
  - karnot
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

### Introduction

The "Karnot Appchain" challenge, part of the groundbreaking **[<ins>Clash of Nodes campaign</ins>](/category/clash-of-nodes/)**, represents an exciting collaboration between **[<ins>Karnot</ins>](https://www.karnot.xyz/)** and Avail. This guide offers developers comprehensive instructions to deploy appchains using Avail as the data availability (DA) layer.

### How to Participate

To partake in the Karnot challenge, follow these key steps:

1. **Deploy a Karnot App Chain**: Use the Karnot CLI for rapid deployment of your app chains.
1. **Deploy on Avail's Goldberg Testnet**: Opt to post your rollup data to the Avail Goldberg testnet.
1. **Fund Your Account**: Use the Avail Goldberg faucet to acquire tokens for the Goldberg testnet.
1. **List Your App-Chain for Clash of Nodes**: Create a PR to list your app chain on the official repo for the Karnot CLI, following the specified JSON format.

:::info What Qualifies as an Avail-Powered App-Chain?

For your project to qualify, it must meet these criteria:

1. **Uses Karnot & Avail**: Your app-chain should be deployed using Karnot and must integrate Avail as the DA layer.
1. **Operational and Accessible**: The app-chain should be actively running and accessible to the public.
1. **Functionality and Public Interface**: They must have operational features and a publicly accessible interface or usage instructions.
1. **Compliance with Listing and Registration Requirements**: Follow the JSON format for app-chain listing and include Avail-specific configurations in the campaign listing directory.
1. **Community Engagement**: Engage with the community and adhere to the verification processes outlined in the respective documentation.

:::

### How to Deploy an App-Chain Using Karnot

1. **Create an App-Chain Instance**: To begin, create a new app-chain instance. Detailed instructions can be found **[<ins>here</ins>](https://github.com/karnotxyz/madara-cli)**. This step involves setting up the environment and initializing your app-chain using the Karnot CLI.

[...]

1. **Create a PR to Register Your App-Chain**: For your app-chain to be recognized in the Clash of Nodes campaign, you must register it by submitting a pull request in the **[<ins>avail-campaign-listing</ins>](https://github.com/karnotxyz/avail-campaign-listing)** repository. The PR should include a JSON configuration file named "listing.json" with the following structure:

   ```json
   {
     "name": "my_app_chain",
     "logo": "https://placehold.co/400x400",
     "rpc_url": "https://rpc.myappchain.xyz",
     "explorer_url": "https://explorer.myappchain.xyz",
     "metrics_endpoint": "https://metrics.myappchain.xyz",
     "id": "942ff35e-f048-4d10-ae61-6cb970cad2f0"
   }
   ```

   This configuration file includes essential details about your app-chain, such as its name, logo URL, RPC endpoint, explorer URL, metrics endpoint, and a unique identifier. Ensure all information is accurate and up-to-date to facilitate smooth registration and participation in the campaign.
