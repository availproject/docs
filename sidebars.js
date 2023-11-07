module.exports = {
  avail: [
    'index',
    'build/quickstart',
    'networks',
    {
      type: 'category',
      label: 'Clash of Nodes',
      link: {
        type: 'generated-index',
      },
      items: [
        'clash-of-nodes/overview',
        'clash-of-nodes/challenges',
        'clash-of-nodes/rules-and-guidelines',
        'clash-of-nodes/terms-and-conditions',
        'clash-of-nodes/faqs',
      ],
    },
    'operate/node/light-client',
    {
      type: 'category',
      label: 'New User Guide',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'about/accounts',
        'about/identity',
        'about/explorer',
        'about/faucet',
      ],
    },
    {
      type: 'category',
      label: 'Operate a Node',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'operate/node-types',
        'operate/system-requirements',
        {
          type: 'category',
          label: 'Run a Node',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Full Node',
              link: {
                type: 'generated-index',
              },
              items: ['operate/node/binaries', 'operate/node/docker'],
            },
            'operate/node/rpc',
            'operate/node/bootstrap',
            'operate/node/relay',
          ],
        },
        {
          type: 'category',
          label: 'Become a Validator',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'operate/validator/already-running-full-node',
            {
              type: 'category',
              label: 'Run a Validator Node',
              link: {
                type: 'generated-index',
              },
              items: ['operate/validator/binaries', 'operate/validator/docker'],
            },
            'operate/validator/staking',
            'operate/validator/backup',
            'operate/validator/upgrade',
            'operate/validator/monitor',
            'operate/validator/chill',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Light Client',
          link: {
            type: 'generated-index',
          },
          items: [
            'api/light-client/avail-light-client-overview',
            'api/light-client/embedding-the-light-client',
          ],
        },
        'api/use-case-validiums',
      ],
    },
    {
      type: 'category',
      label: 'System Design',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'about/introduction',
        'about/introduction/app-id',
        'about/introduction/light-client',
        'about/introduction/validiums',
      ],
    },
    'explorations',
    'glossary',
    'faqs',
  ],
};
