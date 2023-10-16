module.exports = {
  avail: [
    'index',
    'about/introduction',
    'build/quickstart',
    {
      type: 'category',
      label: 'Get Started',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: ['about/accounts', 'about/explorer', 'about/faucet'],
    },
    {
      type: 'category',
      label: 'System Design',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'about/introduction/app-id',
        'about/introduction/light-client',
        'about/introduction/validiums',
      ],
    },
    /*
    {
      type: "category",
      label: "Build",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: [
        "build/validium",
        {
          type: "category",
          label: "Sovereign Rollup",
          link: {
            type: "generated-index",
          },
          collapsed: true,
          items: [
            "build/zk-rollup",
            "build/op-rollup",
          ],
        },
        "build/app-chains",
        "build/volitions",
      ],
    },
    */
    {
      type: 'category',
      label: 'Operate',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'operate/node-types',
        'operate/system-requirements',
        'operate/node/light-client',
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
      collapsed: false,
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
    "explorations",
  ],
};
