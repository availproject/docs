# Contribution Guidelines

All pull requests and issues

> ℹ️ Please make sure to create an issue outlining your feedback/content request for the docs before creating a PR.
> PRs created without approval will be closed. We are open to technical articles on a wide variety of topics related to Avail and Web3 in general. If you have something in mind, please feel free to jump in with an issue on the repo.

<details>
<summary>**Contribute Changes directly from the Avail Documentation Website**</summary>

Contributing to the Avail Documentation using Github's UIis simple. You'll need a GitHub account and a basic understanding of Markdown syntax to get started.

1. **Locate the Page**: Visit the [Avail Documentation page](https://docs.availproject.org/) you wish to edit.
2. **Edit Link**: Click on the **Edit this page** link. This will redirect you to the corresponding Markdown file on GitHub.
3. **Edit Mode**: Once on GitHub, click the pencil icon located in the upper-right corner to enter edit mode.
4. **Make Edits**: Modify the Markdown file as needed.
5. **Initiate Pull Request**: Scroll to the bottom and click on **Create pull request**.
6. **Title Your PR**: Give your pull request a descriptive title. For example, if you're editing the "Getting Started" page, you could title it _Update /docs/getting-started.md_.
7. **Describe Changes**: In the pull request description, specify the issue your changes resolve.

   > See [GitHub Docs on Linking a Pull Request to an Issue](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) for guidance.

8. **Additional Information**: Provide a concise summary of the changes you've made. Include screenshots or references if applicable.

9. **Submit**: Click **Propose changes** to finalize your pull request. This will create a new branch in your fork.

</details>


<details>
<summary>**Contribute Changes by setting up a local development environment**</summary>

> **Prerequisites**:
>
> - [Node.js](https://nodejs.org/en/download/) (version >= 22 is recommended)
> - [pnpm](https://pnpm.io/installation)

1. **Fork the repository**

   > See [GitHub Docs: Fork a repo](https://help.github.com/en/articles/fork-a-repo) for guidance.

2. **Clone your fork**

   ```bash
   git clone https://github.com/<your-username>/docs.git
   ```

   This will create a repo named `docs` in your current directory.

3. **Navigate to the Repository**

   ```bash
   cd docs
   ```

   > ℹ️ You can check if the upstream was added correctly by running `git remote -v`


6. **Install Dependencies**

   ```bash
   pnpm install
   ```

7. **Run the Docs Locally**

   ```bash
   pnpm run dev
   ```

  This will start a local dev derver at `http://localhost:3000` on your machine.

## Push changes and create PR

Once you are done with all the changes, save all you files and run:

1. ```bash
   git add .
   ```
   
   to stage all the changes.

2. ```bash
   git commit -m "Your commit message"
   ```

   to commit the changes with ann appropriate commit message.

3. Once you have committed all the changes, push the changes to your forked repository by running:

   ```bash
   git push origin main
   ```

   Now you can use the Github UI to create a PR from your forked repository to the `main` branch of the `availproject/docs` repository.

## License

The Avail Project Developer Documentation is licensed under the [MIT License](./LICENSE) free software license.### How to Contribute Changes via the Avail Documentation Website.
