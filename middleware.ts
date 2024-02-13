import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
const { origin } = request.nextUrl
  const redirects = [
    {
      source: '/about/introduction',
      destination: `${origin}/docs/introduction`,
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
        source: "/about/app-ids/",
        destination: `${origin}/docs/end-user-guide/app-id`
      },
      {
        source: "/about/balance-transfers/",
        destination: `${origin}/docs/end-user-guide/balance-transfers`
      },
      {
        source: "/about/nomination-pools/",
        destination: `${origin}/docs/end-user-guide/nomination-pools`
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
        source: "/operate/deployment-options/",
        destination: `${origin}/docs/operate-a-node/deployment-options`
      },
      {
        source: "/category/run-a-light-client/",
        destination: `${origin}/docs/operate-a-node/run-a-light-client`
      },
      {
        source: "/about/introduction/light-client/",
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
        source: "/operate/node/binaries/",
        destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node/0020-full-node-binaries`
      },
      {
        source: "/operate/node/docker/",
        destination: `${origin}/docs/operate-a-node/run-a-full-node/full-node/0030-full-node-docker`
      },
      {
        source: "/operate/node/rpc/",
        destination: `${origin}/docs/operate-a-node/run-a-full-node/0040-rpc-node`
      },
      {
        source: "/operate/node/bootstrap/",
        destination: `${origin}/docs/operate-a-node/run-a-full-node/0050-bootstrap-node`
      },
      {
        source: "/operate/node/relay/",
        destination: `${origin}/docs/operate-a-node/run-a-full-node/0060-relay-node`
      },
      {
        source: "/category/become-a-validator/",
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
        source: "/build/overview/",
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
        destination: `${origin}/docs/learn-about-avail/glossary`
      },
      {
        source: "/faqs/",
        destination: `${origin}/docs/learn-about-avail/faqs`
      }
  ];

  const requestedPath = request.nextUrl.pathname;
  const redirectRule = redirects.find((rule) => rule.source === requestedPath);

  if (redirectRule) {   
    return NextResponse.redirect(redirectRule.destination, { status: 301 });
  }
  return NextResponse.next(); 
}
