// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Avail Docs',
  tagline: '',
  favicon: 'img/favicon.ico',
  url: 'https://availproject.github.io',
  baseUrl: '/',
  organizationName: 'availproject',
  projectName: 'availproject.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: ['/en/latest', '/en/'],
          },
          // Getting started
          {
            to: '/getting-started/avail-explorer',
            from: '/using-avail/getting-started/avail-explorer',
          },
          {
            to: '/getting-started/managing-accounts',
            from: '/using-avail/getting-started/managing-accounts',
          },
          {
            to: '/getting-started/testnet-faucet',
            from: '/using-avail/getting-started/testnet-faucet',
          },
          // Development guides
          {
            to: '/develop/core-sdks-and-apis/avail-light-client-overview',
            from: '/using-avail/core-sdks-and-apis/avail-light-client-overview',
          },
          {
            to: '/develop/core-sdks-and-apis/embedding-the-light-client',
            from: '/using-avail/core-sdks-and-apis/embedding-the-light-client',
          },
          // Node guides
          {
            to: '/validators/networks',
            from: '/join-the-network/networks',
          },
          {
            to: '/validators/node-types',
            from: '/join-the-network/node-types',
          },
          {
            to: '/validators/run-avail/light-client-setup',
            from: '/join-the-network/run-avail/light-client-setup',
          },
          {
            to: '/validators/run-avail/full-node-setup',
            from: '/join-the-network/run-avail/full-node-setup',
          },
          {
            to: '/validators/run-avail/validator-node-setup',
            from: '/join-the-network/run-avail/validator-node-setup',
          },
          {
            to: '/validators/run-avail/other-nodes/avail-archive-node',
            from: '/join-the-network/run-avail/other-nodes/avail-archive-node',
          },
          {
            to: '/validators/run-avail/other-nodes/avail-rpc-node',
            from: '/join-the-network/run-avail/other-nodes/avail-rpc-node',
          },
          {
            to: '/validators/run-avail/validator-ops/avail-backup-node',
            from: '/join-the-network/run-avail/validator-ops/avail-backup-node',
          },
          {
            to: '/validators/run-avail/validator-ops/avail-upgrade-validator-node',
            from: '/join-the-network/run-avail/validator-ops/avail-upgrade-validator-node',
          },
          {
            to: '/validators/run-avail/validator-ops/avail-monitoring-validator-node',
            from: '/join-the-network/run-avail/validator-ops/avail-monitoring-validator-node',
          },
        ],
      },
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Avail Docs',
      items: [
        {
          href: 'https://github.com/availproject',
          position: 'right',
          label: 'GitHub',
        },
      ],
    },
    algolia: {
      indexName: "avail_documentation",
      appId: '5787ZYX98U',
      apiKey: "c86a5367191e7a307aba4a20285dd1b1",
      contextualSearch: true,
      algoliaOptions: {
        attributesToSnippet: ['content:20'],
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Avail Home',
              href: 'https://www.availproject.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Erasure Coding Technologies Ltd.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['rust'],
    },
  },
};

module.exports = config;
