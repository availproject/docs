---
id: madara-karnot
title: How to Deploy an Appchain using Madara & Karnot
sidebar_label: Madara | Karnot Appchains
description: 'Discover how to build chains with Madara that utilize Avail as a DA layer.'
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

The "Madara | Karnot Appchain Challenge", part of the groundbreaking **[<ins>Clash of Nodes campaign</ins>](/category/clash-of-nodes/)**, represents an exciting collaboration between **[<ins>Karnot</ins>](https://www.karnot.xyz/)** and Avail. This guide offers developers comprehensive instructions to deploy a Madara appchain using Avail as the data availability (DA) layer, with the option to self-host or Karnot as a chain-running service.

### How to Participate

To partake in the Madara | Karnot Appchain Challenge, follow these key steps:

1. **Deploy a Madara Appchain**: Use the Karnot CLI for rapid deployment. You can choose to host it yourself or request the Karnot team for hosting services.
2. **Deploy on Avail's Goldberg Testnet**: Opt to post your chain data to the Avail Goldberg testnet.
3. **Fund Your Account**: Use the Avail Goldberg faucet to acquire tokens for the Goldberg testnet.
4. **List Your Appchain for Clash of Nodes**: Create a PR to list your app chain on the official repo for the Karnot CLI, following the specified JSON format.

:::info What Qualifies as an Avail-Powered Madara Appchain?

For your project to qualify, it must meet these criteria:

1. **Uses Madara & Avail**: Your appchain should be deployed using Madara and must integrate Avail as the DA layer.
2. **Operational and Accessible**: The appchain should be actively running and accessible to the public.
3. **Functionality and Public Interface**: They must have operational features and a publicly accessible interface or usage instructions.
4. **Compliance with Listing and Registration Requirements**: Follow the JSON format for chain listing and include Avail-specific configurations in the campaign listing directory.
5. **Community Engagement**: Engage with the community and adhere to the verification processes outlined in the respective documentation.

:::

### How to Deploy a Madara Appchain

1. **Create a New Appchain Instance**: To begin, create a new appchain instance. Detailed instructions can be found **[<ins>here</ins>](https://github.com/karnotxyz/madara-cli)**. This step involves setting up the environment and initializing your appchain using the Karnot CLI. **Ensure you select 'Avail' as the DA layer**.

> For help in creating an AppId, check out the **[<ins>AppId guide</ins>](/about/app-ids)**.

1. **Fund Your Avail Account**: You will also need to fund your Avail account for your appchain. Visit the Avail faucet with your Avail address and follow the **[<ins>faucet guide instructions</ins>](/about/faucet)** to secure the necessary testnet tokens for the Goldberg network.

   > The faucet requires meeting a mandatory threshold using the Gitcoin passport. If necessary, you can link your Avail account on your machine with the wallet you are using for this process. Exercise caution when exporting your account's key for any reason.

1. **If Needed, Host Your Appchain with Karnot**: Karnot provides comprehensive, ready-to-use services for appchains, including RPC, proof, cross-chain capabilities, and more. Fill out **[<ins>this form</ins>](https://forms.gle/8cYP2d3PqMDZc5oj7)** to request hosting services.

1. **Create a PR to Register Your Appchain**: For your appchain to be recognized in the Clash of Nodes campaign, you must register it by submitting a pull request in the **[<ins>avail-campaign-listing</ins>](https://github.com/karnotxyz/avail-campaign-listing)** repository. The PR should include a JSON configuration file named "listing.json" with the following structure:

   ```json
   {
     "name": "my_app_chain",
     "logo": "https://placehold.co/400x400",
     "rpc_url": "https://rpc.mychain.xyz",
     "explorer_url": "https://explorer.mychain.xyz",
     "metrics_endpoint": "https://metrics.mychain.xyz",
     "id": "942ff35e-f048-4d10-ae61-6cb970cad2f0"
   }
   ```

   <p align="center"><img src="/img/karnot/karnot-pr.png" alt="Karnot PR Submission" width="100%"/></p>

   This configuration file includes essential details about your appchain, such as its name, logo URL, RPC endpoint, explorer URL, metrics endpoint, and a unique identifier. Ensure all information is accurate and up-to-date to facilitate smooth registration and participation in the campaign. Once the PR is merged, the appchain will appear on the **[<ins>Clash of Nodes Leaderboard</ins>](https://leaderboard.availproject.org/)**.
