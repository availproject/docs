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
            to: '/about/quickstart',
            from: '/join-the-network/networks',
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
            to: '/node/node-types',
            from: '/join-the-network/node-types',
          },
          {
            to: '/node/light-client-setup',
            from: '/join-the-network/run-avail/light-client-setup',
          },
          {
            to: '/operate/node/full-node/full-node-binaries',
            from: '/join-the-network/run-avail/full-node-setup',
          },
          {
            to: '/validators/validator-node/validator-binaries/',
            from: '/join-the-network/run-avail/validator-node-setup',
          },
          {
            to: '/operate/node/full-node/full-node-binaries',
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
          title: "Data Availability Resources",
          items: [
            {
              href: 'https://blog.availproject.org/the-data-availability-problem/',
              label: 'The Data Availability Problem',
            },
            {
              href: 'https://blog.availproject.org/introducing-avail-by-a-robust-general-purpose-scalable-data-availability-layer/',
              label: 'What is Avail?',
            },
            {
              href: 'https://blog.availproject.org/data-attestation-bridge/',
              label: 'Data Attestation Bridge',
            },
            {
              href: 'https://blog.availproject.org/abilitytoscalepart3/',
              label: 'Ability to Scale',
            },
            {
              href: 'https://github.com/availproject/data-availability/blob/master/reference%20document/Data%20Availability%20-%20Reference%20Document.pdf',
              label: 'Reference Document',
            },
          ]
        },
        {
          title: "Node Repositories",
          items: [
            {
              href: 'https://github.com/availproject/avail-light',
              label: 'Light Client',
            },
            {
              href: 'https://github.com/availproject/avail',
              label: 'Full Node',
            },
            {
              href: 'https://github.com/availproject/avail-light-bootstrap',
              label: 'Bootstrap Node',
            },
            {
              href: 'https://github.com/availproject/avail-light-relay',
              label: 'Relay Node',
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
              href: 'https://twitter.com/AvailProject',
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
          label: "Docs",
          position: "left",
          items: [
            {
              href: '/category/get-started/',
              label: 'Get Started',
              target: '_self',
              rel: null,
            },
            {
              href: '/category/system-design/',
              label: 'System Design',
              target: '_self',
              rel: null,
            },
            {
              href: '/category/run-a-node/',
              label: 'Run a Node',
              target: '_self',
              rel: null,
            },
            {
              href: '/category/become-a-validator/',
              label: 'Become a Validator',
              target: '_self',
              rel: null,
            },
          ],
        },
        /*
        {
          href: "/node/node-types/",
          position: 'left',
          label: 'Run a Node',
        },
        {
          href: "/validators/validator-node/validator-binaries/",
          position: 'left',
          label: 'Maintainer Handbook',
        },
        {
          href: "/api/communicating-with-avail/",
          position: 'left',
          label: 'API Reference',
        },
        */
        {
          href: "https://blog.availproject.org/",
          position: 'left',
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
