import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
  const { origin } = request.nextUrl

  // we can use console.log to check for the pathname, but commenting it out since we dont need it right now
  // console.log('Requested path:', request.nextUrl.pathname);

  // need to normalize the path because a lot of redirects are not working due to trailing slashes
  const normalizePath = (path: string) => path.replace(/\/$/, '')

  const redirects = [

  // Docs outline reorg redirects start here

    {
      source: '/docs/introduction-to-avail',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/introduction-to-avail/avail-da',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/introduction-to-avail/avail-nexus',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/introduction-to-avail/avail-fusion',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },

    {
      source: '/docs/the-avail-token',
      destination: `${origin}/user-guides/staking-governance/overview`,
    },
    {
      source: '/docs/the-avail-token/overview',
      destination: `${origin}/user-guides/staking-governance/overview`,
    },
    {
      source: '/docs/governance-on-avail',
      destination: `${origin}/user-guides/staking-governance/governance-on-avail`,
    },
    {
      source: '/docs/governance-on-avail/overview',
      destination: `${origin}/user-guides/staking-governance/governance-on-avail/overview`,
    },
    {
      source: '/docs/governance-on-avail/avail-improvement-proposal',
      destination: `${origin}/user-guides/staking-governance/governance-on-avail/avail-improvement-proposal`,
    },
    {
      source: '/docs/governance-on-avail/avail-transparency-report',
      destination: `${origin}/user-guides/staking-governance/governance-on-avail/avail-transparency-report`,
    },
    {
      source: '/docs/governance-on-avail/technical-committee',
      destination: `${origin}/user-guides/staking-governance/governance-on-avail/technical-committee`,
    },
    {
      source: '/docs/learn-about-avail',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/learn-about-avail/consensus',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/learn-about-avail/consensus/babe',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/learn-about-avail/consensus/grandpa',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/learn-about-avail/consensus/npos',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/learn-about-avail/eip-4844',
      destination: `${origin}/docs/welcome-to-avail-docs`,
    },
    {
      source: '/docs/stake-on-avail',
      destination: `${origin}/user-guides/staking-governance/stake-on-avail`,
    },
    {
      source: '/docs/end-user-guide',
      destination: `${origin}/user-guides/accounts`,
    },
    {
      source: '/docs/end-user-guide/accounts',
      destination: `${origin}/user-guides/accounts`,
    },
    {
      source: '/docs/end-user-guide/explorer',
      destination: `${origin}/user-guides/accounts`,
    },
    {
      source: '/docs/end-user-guide/faucet',
      destination: `${origin}/docs/build-with-avail/interact-with-avail-da/faucet`,
    },
    {
      source: '/docs/end-user-guide/identity',
      destination: `${origin}/user-guides/accounts`,
    },
    {
      source: '/docs/end-user-guide/app-id',
      destination: `${origin}/docs/build-with-avail/interact-with-avail-da/app-id`,
    },
    {
      source: '/docs/end-user-guide/balance-transfers',
      destination: `${origin}/user-guides/accounts`,
    },
    {
      source: '/docs/end-user-guide/vectorx',
      destination: `${origin}/user-guides/vectorx`,
    },
    {
      source: '/docs/end-user-guide/ledger-avail',
      destination: `${origin}/user-guides/ledger-avail`,
    },
    {
      source: '/docs/end-user-guide/avail-multisig',
      destination: `${origin}/user-guides/avail-multisig`,
    },
    {
      source: '/docs/end-user-guide/avail-proxy',
      destination: `${origin}/user-guides/avail-proxy`,
    },
    {
      source: '/docs/end-user-guide/avail-snap',
      destination: `${origin}/user-guides/avail-snap`,
    },

    //dhsdhjsadbhsdabdsbjkdsajbksda

    {
      source: '/docs/stake-on-avail/',
      destination: `${origin}/user-guides/staking-governance/stake-on-avail`,
    },
    {
      source: '/docs/stake-on-avail/overview',
      destination: `${origin}/user-guides/staking-governance/stake-on-avail/overview`,
    },
    {
      source: '/docs/stake-on-avail/direct-nomination',
      destination: `${origin}/user-guides/staking-governance/stake-on-avail/direct-nomination`,
    },
    {
      source: '/docs/stake-on-avail/nomination-pools',
      destination: `${origin}/user-guides/staking-governance/stake-on-avail/nomination-pools`,
    },

    {
      source: '/docs/build-with-avail/overview',
      destination: `${origin}/docs/build-with-avail`,
    },
        {
      source: '/docs/build-with-avail/overview',
      destination: `${origin}/docs/build-with-avail`,
    },
    {
      source: '/docs/build-with-avail/quickstart',
      destination: `${origin}/docs/build-with-avail`,
    },
    {
      source: '/docs/build-with-avail/interacting-with-Avail',
      destination: `${origin}/docs/build-with-avail`,
    },
    {
      source: '/docs/build-with-avail/Optimium',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium`,
    },
    {
      source: '/docs/build-with-avail/Optimium/op-stack',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack`,
    },
    {
      source: '/docs/build-with-avail/Optimium/op-stack/overview',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/overview`,
    },
    {
      source: '/docs/build-with-avail/Optimium/op-stack/op-stack',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/op-stack`,
    },
    {
      source: '/docs/build-with-avail/Optimium/arbitrum-nitro',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro`,
    },
    {
      source: '/docs/build-with-avail/Optimium/arbitrum-nitro/overview',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro/overview`,
    },
    {
      source: '/docs/build-with-avail/Optimium/arbitrum-nitro/nitro-stack',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro/nitro-stack`,
    },


  
    // Docs outline reorg redirects end here
    
    {
      source: '/docs/ecosystem',
      destination: `${origin}/docs/introduction-to-avail`,
    },
    {
      source: '/docs/brand',
      destination: `${origin}/docs/introduction-to-avail`,
    },
    {
      source: '/docs/build-with-avail/Validium/reference',
      destination: `${origin}/docs/build-with-avail/vectorx`,
    },
    {
      source: '/docs/the-avail-token/avail-unification-drop',
      destination: `${origin}/docs/archived-content/the-avail-token/avail-unification-drop-content`,
    },
    {
      source: '/docs/the-avail-trinity',
      destination: `${origin}/docs/introduction-to-avail`,
    },
    {
      source: '/docs/the-avail-trinity/avail-da',
      destination: `${origin}/docs/introduction-to-avail/avail-da`,
    },
    {
      source: '/docs/the-avail-trinity/avail-fusion',
      destination: `${origin}/docs/introduction-to-avail/avail-fusion`,
    },
    {
      source: '/docs/the-avail-trinity/avail-nexus',
      destination: `${origin}/docs/introduction-to-avail/avail-nexus`,
    },
    {
      source: '/about/introduction',
      destination: `${origin}/docs/introduction-to-avail`,
    },
    {
      source: '/category/clash-of-nodes',
      destination: `${origin}/docs/clash-of-nodes`,
    },
    {
      source: '/clash-of-nodes/',
      destination: `${origin}/docs/clash-of-nodes/overview`,
    },
    {
      source: '/clash-of-nodes/madara-karnot/',
      destination: `${origin}/docs/clash-of-nodes/karnot`,
    },
    {
      source: '/clash-of-nodes/madara-karnot',
      destination: `${origin}/docs/clash-of-nodes/karnot`,
    },
    {
      source: '/clash-of-nodes/challenges',
      destination: `${origin}/docs/clash-of-nodes/challenges`
    },
    {
      source: '/clash-of-nodes/rules-and-guidelines',
      destination: `${origin}/docs/clash-of-nodes/rules`
    },
    {
      source: '/clash-of-nodes/terms-and-conditions',
      destination: `${origin}/docs/clash-of-nodes/toc`
    },
    {
      source: '/clash-of-nodes/dymension',
      destination: `${origin}/docs/clash-of-nodes/dymension`
    },
    {
      source: '/clash-of-nodes/dymension/',
      destination: `${origin}/docs/clash-of-nodes/dymension`
    },
    {
      source: '/clash-of-nodes/faqs',
      destination: `${origin}/docs/clash-of-nodes/faqs`
    },
    {
      source: "/networks/",
      destination: `${origin}/docs/networks`
    },
    {
      source: "/build/quickstart/",
      destination: `${origin}/docs/build-with-avail/quickstart`
    },
    {
      source: "/category/learn-about-avail/",
      destination: `${origin}/docs/learn-about-avail`
    },
    {
      source: "/category/consensus/",
      destination: `${origin}/docs/learn-about-avail/consensus`
    },
    {
      source: "/about/consensus/babe/",
      destination: `${origin}/docs/learn-about-avail/consensus/babe`
    },
    {
      source: "/about/consensus/grandpa/",
      destination: `${origin}/docs/learn-about-avail/consensus/grandpa`
    },
    {
      source: "/about/consensus/npos/",
      destination: `${origin}/docs/learn-about-avail/consensus/npos`
    },
    {
      source: "/category/new-user-guide/",
      destination: `${origin}/docs/end-user-guide`
    },
    {
      source: "/category/end-user-guide/",
      destination: `${origin}/docs/end-user-guide`
    },
    {
      source: "/about/accounts/",
      destination: `${origin}/docs/end-user-guide/accounts`
    },
    {
      source: "/about/explorer/",
      destination: `${origin}/docs/end-user-guide/explorer`
    },
    {
      source: "/about/faucet/",
      destination: `${origin}/docs/end-user-guide/faucet`
    },
    {
      source: "/about/identity/",
      destination: `${origin}/docs/end-user-guide/identity`
    },
    {
      source: "/about/identity",
      destination: `${origin}/docs/end-user-guide/identity`
    },
    {
      source: "/about/identity",
      destination: `${origin}/docs/end-user-guide/identity`
    },
    {
      source: "/about/app-ids/",
      destination: `${origin}/docs/end-user-guide/app-id`
    },
    {
      source: "/about/balance-transfers/",
      destination: `${origin}/docs/end-user-guide/balance-transfers`
    },
    {
      source: "/about/balance-transfers",
      destination: `${origin}/docs/end-user-guide/balance-transfers`
    },
    {
      source: "/about/nomination-pools/",
      destination: `${origin}/docs/stake-on-avail/nomination-pools`
    },
    {
      source: "/about/nomination-pools",
      destination: `${origin}/docs/stake-on-avail/nomination-pools`
    },
    {
      source: "/docs/end-user-guide/nomination-pools",
      destination: `${origin}/docs/stake-on-avail/nomination-pools`
    },
    {
      source: "/docs/stake-on-avail/join-a-pool",
      destination: `${origin}/docs/stake-on-avail/nomination-pools`
    },
    {
      source: "/category/operate-a-node/",
      destination: `${origin}/docs/operate-a-node`
    },
    {
      source: "/operate/node-types/",
      destination: `${origin}/docs/operate-a-node/node-types`
    },
    {
      source: "/join-the-network/node-types",
      destination: `${origin}/docs/operate-a-node/node-types`
    },
    {
      source: "/operate/deployment-options/",
      destination: `${origin}/docs/operate-a-node/deployment-options`
    },
    {
      source: "/category/run-a-light-client/",
      destination: `${origin}/docs/operate-a-node/run-a-light-client`
    },
    {
      source: "/docs/operate-a-node/run-a-light-client/Reference",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/light-client-api-reference`
    },
    {
      source: "/docs/operate-a-node/run-a-light-client/Reference/configure-a-light-client",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/light-client-api-reference`
    }, {
      source: "/docs/operate-a-node/run-a-light-client/Reference/embedding-the-light-client",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/light-client-api-reference`
    },
    {
      source: "/docs/operate-a-node/run-a-light-client/light-client-api-reference",
      destination: `${origin}/api-reference/avail-lc-api`
    },
    {
      source: "/about/introduction/light-client",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/Overview`
    },
    {
      source: "/operate/node/light-client/",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/0010-light-client`
    },
    {
      source: "/category/reference/",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/Reference`
    },
    {
      source: "/api/light-client/avail-light-client-overview/",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/Reference/configure-a-light-client`
    },
    {
      source: "/api/light-client/embedding-the-light-client/",
      destination: `${origin}/docs/operate-a-node/run-a-light-client/Reference/embedding-the-light-client`
    },
    {
      source: "/category/run-a-full-node/",
      destination: `${origin}/docs/operate-a-node/run-a-full-node`
    },
    {
      source: "/operate/system-requirements/",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/requirements`
    },
    {
      source: "/category/full-node/",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node`
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/requirements",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/overview`
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/rpc-node",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node`
    },
    {
      source: "/operate/node/binaries/",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node/0020-full-node-binaries`
    },
    {
      source: "/operate/node/docker/",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/0030-full-node-docker`
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/full-node/0020-full-node-binaries",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/0020-full-node-binaries`
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/0020-full-node-binaries",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node`
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/0030-full-node-docker",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node`
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/full-node/0030-full-node-docker",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/0030-full-node-docker`
    },
    {
      source: "/operate/node/rpc/",
      destination: `${origin}/docs/operate-a-node/run-a-full-node/0040-rpc-node`
    },
    {
      source: "/category/become-a-validator/",
      destination: `${origin}/docs/operate-a-node/become-a-validator`
    },
    {
      source: "/category/become-a-validator",
      destination: `${origin}/docs/operate-a-node/become-a-validator`
    },
    {
      source: "/category/become-a-validator",
      destination: `${origin}/docs/operate-a-node/become-a-validator`
    },
    {
      source: "/operate/validator/avail-node-basics/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/0010-basics`
    },
    {
      source: "/operate/validator/simple-node-deployment/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/0020-simple-deployment`
    },
    {
      source: "/operate/validator/session-keys/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/0030-session-keys`
    },
    {
      source: "/operate/validator/docker/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/run-a-validator-node/using-docker`
    },
    {
      source: "/operate/validator/staking/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/stake-your-validator`
    },
    {
      source: "/operate/validator/staking",
      destination: `${origin}/docs/operate-a-node/become-a-validator/stake-your-validator`
    },
    {
      source: "/operate/validator/backup/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/backup-your-validator`
    },
    {
      source: "/operate/validator/upgrade/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/upgrade-your-validator`
    },
    {
      source: "/operate/validator/monitor/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/monitor-your-validator`
    },
    {
      source: "/operate/validator/chill/",
      destination: `${origin}/docs/operate-a-node/become-a-validator/chill-your-validator`
    },
    {
      source: "/category/build-with-avail/",
      destination: `${origin}/docs/build-with-avail`
    },
    {
      source: "build/overview",
      destination: `${origin}/docs/build-with-avail/overview`
    },
    {
      source: "/category/optimium/",
      destination: `${origin}/docs/build-with-avail/Optimium`
    },
    {
      source: "/category/op-stack/",
      destination: `${origin}/docs/build-with-avail/Optimium/op-stack`
    },
    {
      source: "/build/op-stack/overview/",
      destination: `${origin}/docs/build-with-avail/Optimium/op-stack/overview`
    },
    {
      source: "/build/op-stack/",
      destination: `${origin}/docs/build-with-avail/Optimium/op-stack/op-stack`
    },
    {
      source: "/category/validium/",
      destination: `${origin}/docs/build-with-avail/Validium`
    },
    {
      source: "/category/polygon-zkevm/",
      destination: `${origin}/docs/build-with-avail/Validium/zkevm`
    },
    {
      source: "/build/zkevm/overview/",
      destination: `${origin}/docs/build-with-avail/Validium/zkevm/overview`
    },
    {
      source: "/build/zkevm/",
      destination: `${origin}/docs/build-with-avail/Validium/zkevm/zkevm`
    },
    {
      source: "/category/madara-starknet/",
      destination: `${origin}/docs/build-with-avail/Validium/madara`
    },
    {
      source: "/build/madara/overview/",
      destination: `${origin}/docs/build-with-avail/Validium/madara/overview`
    },
    {
      source: "/build/madara/",
      destination: `${origin}/docs/build-with-avail/Validium/madara/madara`
    },
    {
      source: "/api/use-case-validiums/",
      destination: `${origin}/docs/build-with-avail/Validium/reference`
    },
    {
      source: "/category/sovereign-rollups/",
      destination: `${origin}/docs/build-with-avail/sovereign-rollups`
    },
    {
      source: "/glossary/",
      destination: `${origin}/docs/glossary`
    },
    {
      source: "/docs/learn-about-avail/glossary",
      destination: `${origin}/docs/glossary`
    },
    {
      source: "/faqs/",
      destination: `${origin}/docs/faqs`
    },
    {
      source: "/docs/learn-about-avail/faqs",
      destination: `${origin}/docs/faqs`
    }
  ];

  // we need to check for both with and without "/docs/" prefix
  const pathsToCheck = [
    request.nextUrl.pathname,
    `/docs${request.nextUrl.pathname}`,
    normalizePath(request.nextUrl.pathname),
    normalizePath(`/docs${request.nextUrl.pathname}`)
  ];

  for (const path of pathsToCheck) {
    const redirectRule = redirects.find((rule) => {
      const normalizedSource = normalizePath(rule.source);
      return normalizedSource === path || path.startsWith(normalizedSource);
    });

    if (redirectRule) {
      // console.log('Redirecting:', path, 'to', redirectRule.destination);
      return NextResponse.redirect(redirectRule.destination, { status: 301 });
    }
  }

  // console.log('No redirect found for:', request.nextUrl.pathname);
  return NextResponse.next();
}
