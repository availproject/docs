export const contentData = {
  linksCard: [
    {
      title: 'Operate a Node',
      cardLink: '/category/operate/',
      blockInfo: [
        'Optimal Performance',
        'Low Barrier to Entry',
        'Security-Focused Design',
      ],
      tutorialsInfo: [
        {
          title: 'Run a Light Client',
          link: '/operate/node/light-client/',
        },
        {
          title: 'Run a Full Node',
          link: '/category/full-node/',
        },
        {
          title: 'Run a Relay Node',
          link: '/operate/node/relay/',
        },
      ],
    },
    {
      title: 'Become a Validator',
      cardLink: '/category/become-a-validator/',
      blockInfo: [
        'Network Security',
        'Governance Participation',
        'Maintainer Rewards',
      ],
      tutorialsInfo: [
        {
          title: 'Run a Validator Node',
          link: '/category/run-a-node/',
        },
        {
          title: 'Upgrade Your Validator',
          link: '/operate/validator/upgrade/',
        },
        {
          title: 'Monitor Your Validator',
          link: '/operate/validator/monitor/',
        },
      ],
    },
    {
      title: 'Build Modular Solutions',
      cardLink: '/category/api-reference/',
      blockInfo: [
        'Ecosystem Agnostic Modularity',
        'Scalable Across All Layers',
        'Robust Sovereign Chain Rollups',
        'Optimized App-Chains',
      ],
      tutorialsInfo: [
        {
          title: 'Avail-Powered Validiums',
          link: '/api/use-case-validiums',
        },
        {
          title: 'Avail-Powered Optimiums: Docs Coming Soon',
        },
        {
          title: 'Avail-Powered Volitions: Docs Coming Soon',
        },
      ],
    },
  ],
  ecosystem: {
    tabs: [
      {
        name: 'Active Networks',
        details: [
          {
            networkName: 'Kate Testnet',
            explorer: 'https://kate.avail.tools',
            rpcEndpoint: 'https://kate.avail.tools/v1',
            wsEndpoint: 'wss://kate.avail.tools/ws',
            chainSpec: {
              link: 'https://kate.avail.tools/#/explorer/chainspec',
              text: 'chainspec.raw.json',
            },
            chainInfo: {
              link: 'https://kate.avail.tools/chaininfo.txt',
              text: 'chaininfo.txt',
            },
            nodeVersion: {
              link: 'https://github.com/availproject/avail/releases/tag/v1.7.2',
              text: 'v1.7.2',
            },
            lightClientVersion: {
              link: 'https://github.com/availproject/avail-light/releases/tag/v1.7.2',
              text: '1.7.2',
            },
          },
          // Add more active networks here
        ],
      },
      {
        name: 'Retired Networks',
        details: [
          {
            networkName: 'Testnet Phase 1',
            explorer: 'https://testnet.avail.tools',
            rpcEndpoint: 'https://testnet.avail.tools/v1',
            wsEndpoint: 'wss://testnet.avail.tools/ws',
            nodeVersion: {
              link: 'https://github.com/availproject/avail/releases/tag/v1.5.0-303f39d',
              text: 'v1.5.0-303f39d',
            },
            lightClientVersion: {
              link: 'https://github.com/availproject/avail-light/releases/tag/v1.3.1',
              text: '1.3.1',
            },
          },
        ],
      },
    ],
  },
};
