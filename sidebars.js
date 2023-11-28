module.exports = {
  avail: [
    'index',
    'about/introduction',
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
    {
      type: 'category',
      label: 'Get Started',
      link: {
        type: 'generated-index',
      },
      items: [
        'networks',
        'build/quickstart',
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
            'about/balance-transfers',
            'about/explorer',
            'about/faucet',
          ],
        },
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
        {
          type: 'category',
          label: 'Run a Light Client',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'about/introduction/light-client',
            'operate/node/light-client',
            {
              type: 'category',
              label: 'Reference',
              link: {
                type: 'generated-index',
              },
              items: [
                'api/light-client/avail-light-client-overview',
                'api/light-client/embedding-the-light-client',
              ],
            },
          ],
        },
        'operate/system-requirements',
        {
          type: 'category',
          label: 'Run a Full Node',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'operate/system-requirements',
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
      label: 'Build with Avail',
      link: {
        type: 'generated-index',
      },
      items: [
        'build/overview',
        //'about/introduction/app-id',
        {
          type: 'category',
          label: 'Optimium',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'OP Stack',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              items: [
                'build/op-stack/overview',
                'build/op-stack/op-stack',
                {
                  type: 'link',
                  label: 'OP Stack Adapter',
                  href: 'https://github.com/availproject/avail-op-stack-adapter',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Validium',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Polygon zkEVM',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              items: [
                'build/zkevm/overview',
                'build/zkevm/zkevm',
                {
                  type: 'link',
                  label: 'Validium Node',
                  href: 'https://github.com/availproject/validium-node',
                },
                {
                  type: 'link',
                  label: 'Validium Contracts',
                  href: 'https://github.com/availproject/validium-contracts',
                },
                {
                  type: 'link',
                  label: 'Validium Bridge',
                  href: 'https://github.com/availproject/validium-bridge-service',
                },
              ],
            },
            {
              type: 'link',
              label: 'Madara Starknet',
              href: 'https://github.com/keep-starknet-strange/madara',
            },
            'api/use-case-validiums',
          ],
        },
        {
          type: 'category',
          label: 'Sovereign Rollups',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            {
              type: 'link',
              label: 'Sovereign SDK',
              href: 'https://github.com/availproject/sovereign-sdk/tree/main',
            },
            {
              type: 'link',
              label: 'Rollkit',
              href: 'https://github.com/rollkit/avail-da',
            },
            {
              type: 'link',
              label: 'OpEVM',
              href: 'https://github.com/availproject/op-evm',
            },
          ],
        },
      ],
    },
    'glossary',
    'faqs',
  ],
};
