module.exports = {
  avail: [
    'index',
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
        'clash-of-nodes/dymension',
        'clash-of-nodes/madara-karnot',
        'clash-of-nodes/faqs',
      ],
    },
    'about/introduction',
    'networks',
    'build/quickstart',
    {
      type: 'category',
      label: 'End-User Guide',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'about/accounts',
        'about/explorer',
        'about/faucet',
        'about/identity',
        'about/app-ids',
        'about/balance-transfers',
        'about/nomination-pools',
      ],
    },
    {
      type: 'category',
      label: 'Learn about Avail',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Consensus',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'about/consensus/babe',
            'about/consensus/grandpa',
            'about/consensus/npos',
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
        'operate/deployment-options',
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
              type: 'category',
              label: 'Madara Starknet',
              link: {
                type: 'generated-index',
              },
              collapsed: true,
              items: [
                'build/madara/overview',
                'build/madara/madara',
                {
                  type: 'link',
                  label: 'Madara Starknet',
                  href: 'https://github.com/keep-starknet-strange/madara',
                },
              ],
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
              href: 'https://github.com/Sovereign-Labs/sovereign-sdk',
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
