<div align="Center">
<h1>Contribution Guidelines for Avail's docs</h1>
</div>

- [How to Contribute to the Avail Documentation](#how-to-contribute-to-the-avail-documentation)
  - [How to Contribute Changes via the Avail Documentation Website](#how-to-contribute-changes-via-the-avail-documentation-website)
  - [How to Locally Run the Avail Documentation](#how-to-locally-run-the-avail-documentation)
    - [Quick Run](#quick-run)
    - [Setup Steps](#setup-steps)

## Ways to Contribute to the Avail Documentation

The Documentation team at Avail are the primary maintainers of the Avail Documentation and will review all issues and pull requests created in this repository. If you spot typos or grammar mistakes, please go ahead and submit a pull request with the fixes. For more significant changes, it's advisable to start with a GitHub issue to discuss it with the maintainers. We generally prefer pull requests over issues for suggesting changes to the Docs.

| ❗ We are in the process of setting guidelines to ensure all new contributions continue to improve the Docs without compromising its quality. Please stay tuned. |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |

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

## How to Contribute Changes via the Avail Documentation Website

Contributing to the Avail Documentation is simple. You'll need a GitHub account and a basic understanding of Markdown syntax to get started.

1. **Locate the Page**: Visit the [Avail Documentation page](https://docs.availproject.org/) you wish to edit.
2. **Navigate to the Bottom**: Scroll to the bottom of the page.
3. **Edit Link**: Click on the **Edit this page** link. This will redirect you to the corresponding Markdown file on GitHub.
4. **Edit Mode**: Once on GitHub, click the pencil icon located in the upper-right corner to enter edit mode.
5. **Make Edits**: Modify the Markdown file as needed.
6. **Initiate Pull Request**: Scroll to the bottom and click on **Create pull request**.
7. **Title Your PR**: Give your pull request a descriptive title. For example, if you're editing the "Getting Started" page, you could title it _Update /docs/getting-started.md_.
8. **Describe Changes**: In the pull request description, specify the issue your changes resolve.
   > See [GitHub Docs on Linking a Pull Request to an Issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) for guidance.
9. **Additional Information**: Provide a concise summary of the changes you've made. Include screenshots or references if applicable.
10. **Submit**: Click **Propose changes** to finalize your pull request. This will create a new branch in your fork.

## How to Locally Run the Avail Documentation

### Quick Run

For those who want to quickly install and start the Avail Documentation locally, you can follow these steps:

```bash
yarn
yarn start
```

### Setup Steps

> **Prerequisites**:
>
> - [Node.js](https://nodejs.org/en/download/) (version >= 16.14.1)
> - [Yarn](https://yarnpkg.com/getting-started/install) (version >= 1.22)  
>   **Note for macOS Users**: Xcode and Command Line Tools are required.

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

The Avail Project Developer Documentation is licensed under the [MIT License](./LICENSE) free software license.### How to Contribute Changes via the Avail Documentation Website

Contributing to the Avail Documentation is simple. You'll need a GitHub account and a basic understanding of Markdown syntax to get started.

1. **Locate the Page**: Visit the [Avail Documentation page](https://docs.availproject.org/) you wish to edit.
2. **Navigate to the Bottom**: Scroll to the bottom of the page.
3. **Edit Link**: Click on the **Edit this page** link. This will redirect you to the corresponding Markdown file on GitHub.
4. **Edit Mode**: Once on GitHub, click the pencil icon located in the upper-right corner to enter edit mode.
5. **Make Edits**: Modify the Markdown file as needed.
6. **Initiate Pull Request**: Scroll to the bottom and click on **Create pull request**.
7. **Title Your PR**: Give your pull request a descriptive title. For example, if you're editing the "Getting Started" page, you could title it _Update /docs/getting-started.md_.
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
>
> - [Node.js](https://nodejs.org/en/download/) (version >= 16.14.1)
> - [Yarn](https://yarnpkg.com/getting-started/install) (version >= 1.22)  
>   **Note for macOS Users**: Xcode and Command Line Tools are required.

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
