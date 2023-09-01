<p align="center">
<img align="center" src="/static/img/avail-logo.png" width="250">
</p>

<div align="Center">
<h1>Avail Project Developer Documentation</h1>
<h3>The Essential Base Layer for Modern Blockchains</h3>

</div>

<p align="left">
  Welcome to the Avail Project Developer Documentation, your go-to resource for all things related to data availability and modular blockchain development. Designed with a focus on community collaboration, this repository aims to provide the most accurate, comprehensive, and up-to-date information for anyone interested in learning about, contributing to, or maintaining projects within the Avail ecosystem.
</p>

<!-- TOC -->

- [Avail Overview](#avail-overview)
  * [The Evolution from Monolithic to Modular Blockchains](#the-evolution-from-monolithic-to-modular-blockchains)
  * [The Avail Solution](#the-avail-solution)
    + [Key Features](#key-features)
    + [Benefits for Validiums and Sovereign Rollups](#benefits-for-validiums-and-sovereign-rollups)
  * [High Availability and Scalability](#high-availability-and-scalability)
  * [Key Repositories under availproject](#key-repositories-under-availproject)
- [Repository Overview](#repository-overview)
  * [Configuration Guide](#configuration-guide)
    + [Static-Site Generator](#static-site-generator)
    + [Deployments](#deployments)
    + [Algolia DocSearch](#algolia-docsearch)
    + [Plausible Analytics](#plausible-analytics)
    + [Translations](#translations)
    + [Files and Folders](#files-and-folders)
  * [How to Contribute to the Avail Documentation](#how-to-contribute-to-the-avail-documentation)
    + [How to Contribute Changes via the Avail Documentation Website](#how-to-contribute-changes-via-the-avail-documentation-website)
    + [How to Locally Run the Avail Documentation](#how-to-locally-run-the-avail-documentation)
      - [Quick Run](#quick-run)
      - [Setup Steps](#setup-steps)
  * [License](#license)

<!--/ TOC -->

# Avail Overview

Avail aims to revolutionize the blockchain space by providing a trust-minimized and secure base layer focused on data availability. This base layer serves as the foundation for next-generation, trust-minimized applications and blockchains.

## The Evolution from Monolithic to Modular Blockchains

Traditional monolithic blockchains like Ethereum have faced scaling challenges due to handling multiple operations like Execution, Settlement, Ordering, and Data Availability on a single chain. Avail adopts a modular approach, separating these core operations into different layers for greater scalability and flexibility.

## The Avail Solution

Avail is a blockchain-based platform focused on creating a general-purpose data availability layer, addressing key challenges such as scalability, governance, and decentralization. By enabling technologies like Validiums and Sovereign Rollups, Avail allows for off-chain data availability, which significantly reduces costs and enhances efficiency.

### Key Features

- **Data Blob Indexing**: Avail simplifies data indexing by tying all transaction data to an application ID.
- **Erasure Encoding**: Adds redundancy to the data, making it harder for nodes to suppress information.
- **KZG Polynomial Commitments**: Ensures that the data has a footprint in the Avail block header.
- **Decentralized Network of Validators**: Avail aims to support up to 1,000 external validators to reduce centralization risks.
- **Validity Proofs**: Allows light clients to guarantee state correctness and data availability immediately after finalizing.

### Benefits for Validiums and Sovereign Rollups

- **Trust-Minimized Data Availability**: Avail provides a secure and decentralized solution for data availability.
- **Data Attestation Bridge**: Allows for attestation to Ethereum and other EVM-compatible chains, proving that data is available.

## High Availability and Scalability

Avail's light client network ensures high data availability through Data Availability Sampling. As more light clients join the network, Avail can support bigger blocks, unlocking significant scaling potential for blockchains.

## Key Repositories under availproject

| Category                 | Repository Name                                                     | Description                                                                                     |
|--------------------------|---------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| **Core Components**      | [Avail](https://github.com/availproject/avail) | Main DA (Data Availability) Node for the Avail project.                                         |
|                          | [Avail Core](https://github.com/availproject/avail-core)             | Core components for Avail's data availability layer.                                            |
| **Light Clients**        | [Avail Light](https://github.com/availproject/avail-light)           | Light client for Avail.                                                                         |
|                          | [Avail Light Bootstrap](https://github.com/availproject/avail-light-bootstrap)| Bootstrap for Avail Light client.                                  |
|                          | [Avail Light Relay](https://github.com/availproject/avail-light-relay)| Relay for Avail Light client.                                                                   |
| **Applications**         | [Avail Apps](https://github.com/availproject/avail-apps)             | Repository for applications built on Avail.                                                     |
| **Substrate Integration**| [Go Substrate RPC Client](https://github.com/availproject/go-substrate-rpc-client)| RPC client for Substrate integration.                               |
|                          | [Substrate](https://github.com/availproject/substrate)               | Fork of Substrate for Avail.                                                                    |
| **Explorations**         | [Avail Explorations](https://github.com/availproject/avail-explorations)| Experimental features and research.                                                             |
|                          | [Avail Sovereign DA Adapter](https://github.com/availproject/avail-sovereign-da-adapter)| Data availability adapter for Sovereign Rollups.                    |
| **Tooling**              | [Availup](https://github.com/availproject/availup)                   | CLI tool for Avail.                                                                             |
|                          | [Avail JS](https://github.com/availproject/avail-js)                 | JavaScript library for Avail; Fork of PolkadotJS                                                                   |
| **Contracts and Proofs** | [Op EVM Contracts](https://github.com/availproject/op-evm-contracts)  | EVM contracts for Avail.                                                                        |
|                          | [Poly Multiproof](https://github.com/availproject/poly-multiproof)    | Multiproof contracts for Avail.                                                                 |
| **SDKs**                 | [Sovereign SDK](https://github.com/availproject/sovereign-sdk)        | SDK for Sovereign Rollups on Avail.                                                             |
| **Proposals**            | [RFCs](https://github.com/availproject/RFCs)                         | Repository for Avail Request for Comments and proposals.                                        |

# Repository Overview

## Configuration Guide

### Static-Site Generator

The [Avail Developer Documentation](https://availproject.github.io/) is built using [Docusaurus](https://docusaurus.io/), making it easy to serve and host its static files.

### Deployments

The Avail Documentation is deployed across two distinct environments: **staging** and **prod**. Both are configured to operate from the `main` branch of the repository.

- **Staging**: Hosted on Digital Ocean, this environment serves as the testing ground for new changes. It allows for quality assurance and verification before updates are pushed to Production. You can view the staging site [here](https://docs-refresh-2-rjp2q.ondigitalocean.app/).

- **Production (Prod)**: This is the live environment, hosted on GitHub Pages, and is manually deployed by the Avail Documentation team. It is accessible to end-users and receives updates only after they have been successfully validated in the Staging environment.

### Algolia DocSearch

The documentation utilizes [Algolia's DocSearch](https://docsearch.algolia.com/) to provide a powerful and user-friendly search experience. DocSearch is specifically designed to improve navigation in documentation websites, making it easier for users to find the information they need.

### Plausible Analytics

[Plausible Analytics](https://plausible.io/) is integrated into the platform to monitor user interactions. This helps in understanding user engagement and behavior, thereby aiding in the continuous improvement of the documentation.

### Translations

| ❗ The documentation is currently undergoing reorganization and frequent updates in preparation for the Avail mainnet launch. Translation efforts will be prioritized once this is complete. |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

### Files and Folders

This section provides an overview of the various files and folders in the Avail Documentation repository, explaining the purpose of each.

| Name                  | Purpose                                                                                                         |
|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| `LICENSE`             | Contains the license information for the project.                                                                |
| `README.md`           | The main introduction file for the Avail Docs repository.                                                        |
| `babel.config.js`     | Configuration file for Babel, a JavaScript compiler.                                                             |
| `build/`              | Contains static content generated for deployment.                                                                |
| `docusaurus.config.js`| Configuration file for website layout and other Docusaurus settings.                                             |
| `docs/`               | Contains the Markdown files that make up the content of the documentation.                                       |
| `node_modules/`       | Contains all the npm packages and dependencies.                                                                  |
| `package.json`        | Specifies dependencies and scripts for the project.                                                              |
| `sidebars.js`         | Used to modify the sidebar navigation.                                                                           |
| `src/`                | Contains source files for the project.                                                                           |
| `static/`             | Contains static assets like images, CSS, and fonts.                                                              |
| `yarn.lock`           | Yarn lock file to keep track of all package versions.                                                            |


## How to Contribute to the Avail Documentation

The Documentation team at Avail are the primary maintainers of the Avail Documentation and will review all issues and pull requests created in this repository. If you spot typos or grammar mistakes, please go ahead and submit a pull request with the fixes. For more significant changes, it's advisable to start with a GitHub issue to discuss it with the maintainers. We generally prefer pull requests over issues for suggesting changes to the Docs.

| ❗ We are in the process of setting guidelines to ensure all new contributions continue to improve the Docs without compromising its quality. Please stay tuned. |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

Before making a contribution, please consult any existing issues or initiate a new discussion to ensure alignment with the documentation's objectives.
Your contributions can significantly enrich the Docs in the following ways:

1. **General Overviews**: Introductory articles that provide a comprehensive understanding of Avail's data availability layer and modular approach to blockchains.
  
2. **Technical Deep Dives**: Detailed explorations into specific components of Avail's architecture, such as its data availability layer, modularity, and consensus algorithms.

3. **Use-Case Scenarios**: Articles that showcase real-world applications of Avail in solutions like Validiums, app-chains, and Sovereign Rollups.

4. **Tooling**: Documentation or guides on tools that facilitate development, testing, or deployment on Avail. This could include IDE plugins, testing frameworks, or monitoring tools.

5. **Third-Party Services and Deployments**: Information on external services, deployments, and implementations that integrate with Avail. This could include oracles, data analytics platforms, liquidity providers, as well as infrastructure solutions that provide Avail-based infrastructure.

6. **Community Contributions**: Lists of active Avail communities, educational resources, or upcoming events that enrich the ecosystem.

7. **Governance & Economics**: Insights into the governance model and tokenomics that underpin Avail's network.

8. **Security Practices**: Guidelines and resources for ensuring the security and integrity of applications, smart contracts, and general infrastructure on Avail.

9. **Troubleshooting Guides**: Solutions to common challenges, FAQs, and other resources that assist both newcomers and experienced users.

10. **Emerging Technologies**: Articles on upcoming features, advancements, or experimental technologies in the Avail pipeline. For instance, contributions could explore the impact of "Dank Sharding" on Avail's scalability, transaction costs, and its enablement of new decentralized applications.

> Note: This is a general overview and the actual repository may contain additional files and folders for specific functionalities.

### How to Contribute Changes via the Avail Documentation Website

Contributing to the Avail Documentation is simple. You'll need a GitHub account and a basic understanding of Markdown syntax to get started.

1. **Locate the Page**: Visit the [Avail Documentation page](https://availproject.github.io/) you wish to edit.
2. **Navigate to the Bottom**: Scroll to the bottom of the page.
3. **Edit Link**: Click on the **Edit this page** link. This will redirect you to the corresponding Markdown file on GitHub.
4. **Edit Mode**: Once on GitHub, click the pencil icon located in the upper-right corner to enter edit mode.
5. **Make Edits**: Modify the Markdown file as needed.
6. **Initiate Pull Request**: Scroll to the bottom and click on **Create pull request**.
7. **Title Your PR**: Give your pull request a descriptive title. For example, if you're editing the "Getting Started" page, you could title it *Update /docs/develop/getting-started.md*.
8. **Describe Changes**: In the pull request description, specify the issue your changes resolve. 
   > See [GitHub Docs on Linking a Pull Request to an Issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) for guidance.
9. **Additional Information**: Provide a concise summary of the changes you've made. Include screenshots or references if applicable.
10. **Submit**: Click **Propose changes** to finalize your pull request. This will create a new branch in your fork.

### How to Locally Run the Avail Documentation

#### Quick Run

For those who want to quickly install and start the Avail Documentation locally, you can follow these steps:

  ```bash
  yarn
  yarn start
  ```

#### Setup Steps

> **Prerequisites**:  
> - [Node.js](https://nodejs.org/en/download/) (version >= 16.14.1)  
> - [Yarn](https://yarnpkg.com/getting-started/install) (version >= 1.22)  
> **Note for macOS Users**: Xcode and Command Line Tools are required.

1. **Fork the Repository**

   > See [GitHub Docs: Fork a repo](https://help.github.com/en/articles/fork-a-repo) for guidance.

2. **Clone Your Fork**

   ```bash
   git clone git@github.com:availproject/availproject.github.io.git
   ```

3. **Navigate to the Repository**

    ```bash
    cd availproject.github.io
    ```

4. **Add Upstream Remote**

   > Refer to [GitHub Docs: Configuring a remote for a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork).
   
    ```bash
    git remote add upstream https://github.com/availproject/avail-docs
    ```

5. **Sync Your Fork**

   > See [GitHub Docs: Syncing a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

    ```bash
    git checkout master
    git fetch upstream
    git merge upstream/master
    ```

6. **Install Dependencies**
   
    ```bash
    yarn install
    ```
    
   The site is built using Docusaurus. You may need to install Docusaurus before running the documentation locally.

   ```bash
   yarn add docusaurus
   ```
   
   Alternatively, you can upgrade Docusaurus.

   ```bash
   yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest
   ```

7. **Run the Docs Locally**

    ```bash
    yarn start
    ```

## License

The Avail Project Developer Documentation is licensed under the [MIT License](LICENSE) free software license.
