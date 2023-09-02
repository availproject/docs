// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

module.exports = {
  title: "Avail Docs",
  tagline: "The official documentation hub for the Avail Project.",
  url: "https://availproject.github.io/",
  baseUrl: "/",
  favicon: "/img/favicon.ico",
  organizationName: "availproject",
  projectName: "availproject.github.io",
  trailingSlash: true,
  scripts: [{src: 'https://plausible.io/js/plausible.js', async: true, defer: true, 'data-domain': 'availproject.github.io'}],
  customFields: {
    description: "Build your next blockchain solution using Avail.",
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: ['/en/latest', '/en/'],
          },
          {
            to: '/',
            from: '/join-the-network/networks',
          },
          {
            to: '/about/managing-accounts',
            from: '/using-avail/getting-started/managing-accounts',
          },
          {
            to: '/about/testnet-faucet',
            from: '/using-avail/getting-started/testnet-faucet',
          },
          // Getting started
          {
            to: '/about/avail-explorer',
            from: '/using-avail/getting-started/avail-explorer',
          },
          {
            to: '/about/managing-accounts',
            from: '/using-avail/getting-started/managing-accounts',
          },
          {
            to: '/about/testnet-faucet',
            from: '/using-avail/getting-started/testnet-faucet',
          },
          {
            to: '/api/light-client/avail-light-client-overview/',
            from: '/using-avail/core-sdks-and-apis/avail-light-client-overview',
          },
          {
            to: '/api/light-client/embedding-the-light-client/',
            from: '/using-avail/core-sdks-and-apis/embedding-the-light-client',
          },
          // Node guides
          {
            to: '/',
            from: '/join-the-network/networks',
          },
          {
            to: '/node/node-types',
            from: '/join-the-network/node-types',
          },
          {
            to: '/about/light-client-setup',
            from: '/join-the-network/run-avail/light-client-setup',
          },
          {
            to: '/node/full-node/full-node-binaries',
            from: '/join-the-network/run-avail/full-node-setup',
          },
          {
            to: '/validators/validator-node/validator-binaries/',
            from: '/join-the-network/run-avail/validator-node-setup',
          },
          {
            to: '/node/full-node/full-node-binaries',
            from: '/join-the-network/run-avail/other-nodes/avail-archive-node',
          },
          {
            to: '/node/avail-rpc-node',
            from: '/join-the-network/run-avail/other-nodes/avail-rpc-node',
          },
          {
            to: '/validators/avail-backup-node',
            from: '/join-the-network/run-avail/validator-ops/avail-backup-node',
          },
          {
            to: '/validators/avail-upgrade-validator-node',
            from: '/join-the-network/run-avail/validator-ops/avail-upgrade-validator-node',
          },
          {
            to: '/validators/avail-monitoring-validator-node',
            from: '/join-the-network/run-avail/validator-ops/avail-monitoring-validator-node',
          },
        ],
      },
    ],
  ],
  onBrokenLinks: 'log',
  themeConfig: {
    metadata: [{name: 'description', content: 'Welcome to the Avail Project Documentation, the official documentation for Avail.'}],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: "Company",
          items: [
            {
              label: "About Us",
              href: "https://www.availproject.org/ecosystem"
            },
            {
              label: "Blog",
              href: "https://blog.availproject.org/"
            },
            {
              label: "Careers",
              href: "https://wellfound.com/company/avail-6/jobs"
            }
          ]
        },
        {
          title: "Repositories",
          items: [
            {
              href: 'https://github.com/availproject/avail-light',
              label: 'Light Client',
            },
            {
              href: 'https://github.com/availproject/avail',
              label: 'DA Node',
            },
            {
              href: 'https://github.com/availproject/avail-core',
              label: 'Avail Core',
            },
          ]
        },
        {
          title: "Data Availability Resources",
          items: [
            {
              href: 'https://ethereum.org/en/developers/docs/data-availability/',
              label: 'What is Data Availability',
            },
            {
              href: 'https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html',
              label: 'Data Availability Checks',
            },
          ]
        },
        {
          title: "Network Guides",
          items: [
            {
              href: '/node/node-types/',
              label: 'Node Guide',
            },
            {
              href: '/validators/validator-node/validator-binaries/',
              label: 'Validator Guide',
            },
          ]
        },
        {
          title: "Community",
          items: [
            {
              href: 'https://discord.com/invite/y6fHnxZQX8',
              label: 'Discord',
            },
            {
              href: 'https://twitter.com/AvailProjects',
              label: 'Twitter',
            },
            {
              href: 'https://github.com/availproject',
              label: 'GitHub',
            },
            {
              href: 'https://www.linkedin.com/company/availproject/',
              label: 'LinkedIn',
            },
          ]
        },
      ],
    },
    image: 'img/avail-logo.png',
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    algolia: {
      indexName: "availprojectio",
      appId: 'SRNYX3PD60',
      apiKey: "fe996ed80af806d818acfbc4bab16ddf",
      contextualSearch: true,
      algoliaOptions: {
        attributesToSnippet: ['content:20'],
      },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Avail logo",
        src: "img/avail-logo.png",
        srcDark: "img/avail-logo.png",
        href: '/',
        target: "_self",
       },
      items: [
        {
          href: "/about/introduction/",
          position: 'left',
          label: 'Get Started',
        },
        {
          href: "/node/node-types/",
          position: 'left',
          label: 'Node Guide',
        },
        {
          href: "/validators/validator-node/validator-binaries/",
          position: 'left',
          label: 'Validator Guide',
        },
        {
          href: "/api/communicating-with-avail/",
          position: 'left',
          label: 'API Reference',
        },
        {
          href: "https://blog.availproject.org/",
          position: 'right',
          label: 'Blog',
        },
        {
          href: "https://github.com/availproject/avail",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          href: "https://twitter.com/AvailProject",
          position: "right",
          className: "header-twitter-link",
        },
        {
          href: "https://discord.com/invite/y6fHnxZQX8",
          position: "right",
          className: "header-discord-link",
        },
      ],
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/availproject/availproject.github.io/tree/main",
          path: "docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
