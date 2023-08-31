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
      // need to update this
      indexName: "docs-availproject",
      appId: '5787ZYX98U',
      apiKey: "c86a5367191e7a307aba4a20285dd1b1",
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
          href: "/docs/",
          position: 'left',
          label: 'Get Started',
        },
        {
          href: "/docs/node/node-types/",
          position: 'left',
          label: 'Node Guide',
        },
        {
          href: "/docs/validators/validator-node-setup/",
          position: 'left',
          label: 'Validator Guide',
        },
        {
          href: "/docs/api/communicating-with-avail/",
          position: 'left',
          label: 'API Reference',
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
          routeBasePath: '/docs',
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/availproject/availproject.github.io/tree/main",
          path: "docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          // Need to create new tags for zkEVM docs
           trackingID: 'GTM-5TKTB44',
           anonymizeIP: true,
        },
      },
    ],
  ],
};
