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
      source: '/docs/staking-governance/the-avail-token',
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
      source: '/docs/staking-governance/governance-on-avail',
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
    // {
    //   source: '/docs/learn-about-avail',
    //   destination: `${origin}/docs/welcome-to-avail-docs`,
    // },
    // {
    //   source: '/docs/learn-about-avail/consensus',
    //   destination: `${origin}/docs/welcome-to-avail-docs`,
    // },
    // {
    //   source: '/docs/learn-about-avail/consensus/babe',
    //   destination: `${origin}/docs/welcome-to-avail-docs`,
    // },
    // {
    //   source: '/docs/learn-about-avail/consensus/grandpa',
    //   destination: `${origin}/docs/welcome-to-avail-docs`,
    // },
    // {
    //   source: '/docs/learn-about-avail/consensus/npos',
    //   destination: `${origin}/docs/welcome-to-avail-docs`,
    // },
    // {
    //   source: '/docs/learn-about-avail/eip-4844',
    //   destination: `${origin}/docs/welcome-to-avail-docs`,
    // },
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
      destination: `${origin}/docs/learn-about-avail/avail-apps-explorer`,
    },
    {
      source: '/docs/end-user-guide/faucet',
      destination: `${origin}/docs/build-with-avail/interact-with-avail-da/faucet`,
    },
    {
      source: '/docs/end-user-guide/identity',
      destination: `${origin}/user-guides/identity`,
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
      source: '/docs/build-with-avail/interact-with-avail-da/query-transfer-balances',
      destination: `${origin}/docs/build-with-avail/interact-with-avail-da/query-balances`,
    },
    {
      source: '/docs/end-user-guide/vectorx',
      destination: `${origin}/user-guides/vectorx`,
    },
    {
      source: '/user-guides/vectorx',
      destination: `${origin}/user-guides/bridge-avail/avail-ethereum`,
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
      source: '/user-guides/avail-proxy',
      destination: `${origin}/user-guides/proxies-on-avail/avail-proxy`,
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
      source: '/docs/staking-governance/stake-on-avail/',
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
    {
      source: '/docs/build-with-avail/Validium',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium`,
    },
    {
      source: '/docs/build-with-avail/Validium/zkevm',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/zkevm`,
    },
    {
      source: '/docs/build-with-avail/Validium/zkevm/overview',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/zkevm/overview`,
    },
    {
      source: '/docs/build-with-avail/Validium/zkevm/zkevm',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/zkevm/zkevm`,
    },
    {
      source: '/docs/build-with-avail/Validium/madara',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/madara`,
    },
    {
      source: '/docs/build-with-avail/Validium/madara/overview',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/madara/overview`,
    },
    {
      source: '/docs/build-with-avail/Validium/madara/madara',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/madara/madara`,
    },
    {
      source: '/docs/build-with-avail/Validium/zksync',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/zksync`,
    },
    {
      source: '/docs/build-with-avail/Validium/zksync/zksync',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/Validium/zksync/zksync`,
    },
    {
      source: '/docs/build-with-avail/sovereign-rollups',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/sovereign-rollups`,
    },
    {
      source: '/docs/build-with-avail/sovereign-rollups/cosmos-avail-module',
      destination: `${origin}/docs/build-with-avail/deploy-rollup-on-avail/sovereign-rollups/cosmos-avail-module`,
    },

    // Gas relay temp redirects
    

    {
      source: '/api-reference/gas-relay-api',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_all_expenditure',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_all_tokens',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_all_users',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_pre_image',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_submission_info',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_token_expenditure',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_token_using_address',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_token',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/token_map',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/request_fund_status',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/get_user',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/register_new_token',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/register_new_user',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/request_funds',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/submit_data',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/submit_raw_data',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
    },
    {
      source: '/api-reference/gas-relay-api/transfer_funds',
      destination: `${origin}/api-reference/gas-relay-deprecated`,
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

    // Avail Nexus SDK redirects
    {
      source: '/docs/build-with-avail/avail-nexus',
      destination: `${origin}/api-reference/avail-nexus-sdk`,
    },
    {
      source: '/docs/build-with-avail/avail-nexus/avail-nexus-architecture',
      destination: `${origin}/api-reference/avail-nexus-sdk`,
    },
    {
      source: '/docs/build-with-avail/avail-nexus/avail-nexus-tutorial',
      destination: `${origin}/api-reference/avail-nexus-sdk`,
    },
    {
      source: '/docs/build-with-avail/avail-nexus/overview',
      destination: `${origin}/api-reference/avail-nexus-sdk`,
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
      destination: `${origin}/docs/learn-about-avail/avail-apps-explorer`
    },
    {
      source: "/about/faucet/",
      destination: `${origin}/docs/end-user-guide/faucet`
    },
    {
      source: "/about/identity/",
      destination: `${origin}/user-guides/identity`
    },
    {
      source: "/about/identity",
      destination: `${origin}/user-guides/identity`
    },
    {
      source: "/about/identity",
      destination: `${origin}/user-guides/identity`
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
      source: "/api-reference/avail-lc-api/v1-latest-block",
      destination: `${origin}/api-reference/avail-lc-api/v1-deprecated`
    },
    {
      source: "/api-reference/avail-lc-api/v1-confidence",
      destination: `${origin}/api-reference/avail-lc-api/v1-deprecated`
    },
    {
      source: "/api-reference/avail-lc-api/v1-appdata",
      destination: `${origin}/api-reference/avail-lc-api/v1-deprecated`
    },
    {
      source: "/api-reference/avail-lc-api/v1-mode",
      destination: `${origin}/api-reference/avail-lc-api/v1-deprecated`
    },
    {
      source: "/api-reference/avail-lc-api/v1-status",
      destination: `${origin}/api-reference/avail-lc-api/v1-deprecated`
    },
    {
      source: "/api-reference/avail-lc-api/v2-ws-subscription-id",
      destination: `${origin}/api-reference/avail-lc-api/v2-subscriptions`
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
    },


    // Nexus sdk Redirects for Nexus launch docs reorg

    {
      source: "/api-reference/avail-nexus-sdk",
      destination: `${origin}/nexus/avail-nexus-sdk`
    },
    {
      source: "/api-reference/avail-nexus-sdk/overview",
      destination: `${origin}/nexus/avail-nexus-sdk/overview`,
    },
    {
      source: "/api-reference/avail-nexus-sdk/api-reference",
      destination: `${origin}/nexus/avail-nexus-sdk/api-reference`,
    },
    {
      source: "/api-reference/avail-nexus-sdk/examples",
      destination: `${origin}/nexus/avail-nexus-sdk/examples`,
    },
    {
      source: "/api-reference/avail-nexus-sdk/examples/fetch-bridge-balances",
      destination: `${origin}/nexus/avail-nexus-sdk/examples/fetch-bridge-balances`,
    },
    {
      source: "/api-reference/avail-nexus-sdk/examples/transfer",
      destination: `${origin}/nexus/avail-nexus-sdk/examples/transfer`,
    },
    {
      source: "/api-reference/avail-nexus-sdk/examples/bridge-tokens",
      destination: `${origin}/nexus/avail-nexus-sdk/examples/bridge-tokens`,
    },
    {
      source: "/api-reference/avail-nexus-sdk/examples/bridge-and-execute",
      destination: `${origin}/nexus/avail-nexus-sdk/examples/bridge-and-execute`,
    },

    // Docs top-level redirects for Nexus launch docs reorg

    {
      source: "/docs/welcome-to-avail-docs",
      destination: `${origin}/da/welcome-to-avail-docs`,
    },

    {
      source: "/docs/archived-content",
      destination: `${origin}/da/archived-content`,
    },
    {
      source: "/docs/bug-bounty",
      destination: `${origin}/da/bug-bounty`,
    },
    {
      source: "/docs/build-with-avail",
      destination: `${origin}/da/build-with-avail`,
    },
    {
      source: "/docs/build-with-avail/interact-with-avail-da",
      destination: `${origin}/da/build-with-avail/interact-with-avail-da`,
    },
    {
      source: "/docs/build-with-avail/interact-with-avail-da/faucet",
      destination: `${origin}/da/build-with-avail/interact-with-avail-da/faucet`,
    },
    {
      source: "/docs/build-with-avail/interact-with-avail-da/app-id",
      destination: `${origin}/da/build-with-avail/interact-with-avail-da/app-id`,
    },
    {
      source: "/docs/build-with-avail/interact-with-avail-da/read-write-on-avail",
      destination: `${origin}/da/build-with-avail/interact-with-avail-da/read-write-on-avail`,
    },
    {
      source: "/docs/build-with-avail/interact-with-avail-da/query-balances",
      destination: `${origin}/da/build-with-avail/interact-with-avail-da/query-balances`,
    },
    {
      source: "/docs/build-with-avail/interact-with-avail-da/transfer-balances",
      destination: `${origin}/da/build-with-avail/interact-with-avail-da/transfer-balances`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/overview",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/overview`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/op-stack",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/op-stack`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro/overview",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro/overview`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro/nitro-stack",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Optimium/arbitrum-nitro/nitro-stack`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/zkevm",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/zkevm`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/zkevm/overview",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/zkevm/overview`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/zkevm/zkevm",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/zkevm/zkevm`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/cdk",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/cdk`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/cdk/cdk",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/cdk/cdk`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/madara",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/madara`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/madara/overview",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/madara/overview`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/madara/madara",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/madara/madara`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/zksync",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/zksync`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/Validium/zksync/zksync",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/Validium/zksync/zksync`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/sovereign-rollups",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/sovereign-rollups`,
    },
    {
      source: "/docs/build-with-avail/deploy-rollup-on-avail/sovereign-rollups/cosmos-avail-module",
      destination: `${origin}/da/build-with-avail/deploy-rollup-on-avail/sovereign-rollups/cosmos-avail-module`,
    },
    {
      source: "/docs/build-with-avail/turbo-da",
      destination: `${origin}/da/build-with-avail/turbo-da`,
    },
    {
      source: "/docs/build-with-avail/vectorx",
      destination: `${origin}/da/build-with-avail/vectorx`,
    },
    {
      source: "/docs/clash-of-nodes",
      destination: `${origin}/da/clash-of-nodes`,
    },
    {
      source: "/docs/faqs",
      destination: `${origin}/da/faqs`,
    },
    {
      source: "/docs/glossary",
      destination: `${origin}/da/glossary`,
    },
    {
      source: "/docs/learn-about-avail",
      destination: `${origin}/da/learn-about-avail`,
    },
    {
      source: "/docs/learn-about-avail/app-ids",
      destination: `${origin}/da/learn-about-avail/app-ids`,
    },
    {
      source: "/docs/learn-about-avail/avail-apps-explorer",
      destination: `${origin}/da/learn-about-avail/avail-apps-explorer`,
    },
    {
      source: "/docs/learn-about-avail/tx-pricing",
      destination: `${origin}/da/learn-about-avail/tx-pricing`,
    },
    {
      source: "/docs/networks",
      destination: `${origin}/da/networks`,
    },
    {
      source: "/docs/operate-a-node",
      destination: `${origin}/da/operate-a-node`,
    },
    {
      source: "/docs/operate-a-node/deployment-options",
      destination: `${origin}/da/operate-a-node/deployment-options`,
    },
    {
      source: "/docs/operate-a-node/node-types",
      destination: `${origin}/da/operate-a-node/node-types`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator",
      destination: `${origin}/da/operate-a-node/become-a-validator`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/0010-basics",
      destination: `${origin}/da/operate-a-node/become-a-validator/0010-basics`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/0020-simple-deployment",
      destination: `${origin}/da/operate-a-node/become-a-validator/0020-simple-deployment`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/0030-session-keys",
      destination: `${origin}/da/operate-a-node/become-a-validator/0030-session-keys`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/backup-your-validator",
      destination: `${origin}/da/operate-a-node/become-a-validator/backup-your-validator`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/monitor-your-validator",
      destination: `${origin}/da/operate-a-node/become-a-validator/monitor-your-validator`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/stake-your-validator",
      destination: `${origin}/da/operate-a-node/become-a-validator/stake-your-validator`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/upgrade-your-validator",
      destination: `${origin}/da/operate-a-node/become-a-validator/upgrade-your-validator`,
    },
    {
      source: "/docs/operate-a-node/become-a-validator/chill-your-validator",
      destination: `${origin}/da/operate-a-node/become-a-validator/chill-your-validator`,
    },
    {
      source: "/docs/operate-a-node/run-a-full-node",
      destination: `${origin}/da/operate-a-node/run-a-full-node`,
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/overview",
      destination: `${origin}/da/operate-a-node/run-a-full-node/overview`,
    },
    {
      source: "/docs/operate-a-node/run-a-full-node/full-node",
      destination: `${origin}/da/operate-a-node/run-a-full-node/full-node`,
    },
    {
      source: "/docs/operate-a-node/run-a-light-client",
      destination: `${origin}/da/operate-a-node/run-a-light-client`,
    },
    {
      source: "/docs/operate-a-node/run-a-light-client/Overview",
      destination: `${origin}/da/operate-a-node/run-a-light-client/Overview`,
    },
    {
      source: "/docs/operate-a-node/run-a-light-client/0010-light-client",
      destination: `${origin}/da/operate-a-node/run-a-light-client/0010-light-client`,
    },
    {
      source: "/docs/operate-a-node/run-a-light-client/light-client-challenge",
      destination: `${origin}/da/operate-a-node/run-a-light-client/light-client-challenge`,
    },


    // API reference redirects for Nexus launch docs reorg

    {
      source: "/api-reference/start-here",
      destination: `${origin}/da/api-reference`,
    },
    {
      source: "/api-reference",
      destination: `${origin}/da/api-reference`,
    },

    {
      source: "/api-reference/gas-relay-deprecated",
      destination: `${origin}/da/api-reference/gas-relay-deprecated`,
    },
    
    // Avail Node API
    {
      source: "/api-reference/avail-node-api",
      destination: `${origin}/da/api-reference/avail-node-api`,
    },
    {
      source: "/api-reference/avail-node-api/author-submit-extrinsic",
      destination: `${origin}/da/api-reference/avail-node-api/author-submit-extrinsic`,
    },
    {
      source: "/api-reference/avail-node-api/author-submit-and-watch-extrinsic",
      destination: `${origin}/da/api-reference/avail-node-api/author-submit-and-watch-extrinsic`,
    },
    {
      source: "/api-reference/avail-node-api/balances-transfer-all",
      destination: `${origin}/da/api-reference/avail-node-api/balances-transfer-all`,
    },
    {
      source: "/api-reference/avail-node-api/balances-transfer-allow-death",
      destination: `${origin}/da/api-reference/avail-node-api/balances-transfer-allow-death`,
    },
    {
      source: "/api-reference/avail-node-api/balances-transfer-keep-alive",
      destination: `${origin}/da/api-reference/avail-node-api/balances-transfer-keep-alive`,
    },
    {
      source: "/api-reference/avail-node-api/chain-get-block",
      destination: `${origin}/da/api-reference/avail-node-api/chain-get-block`,
    },
    {
      source: "/api-reference/avail-node-api/da-app-keys",
      destination: `${origin}/da/api-reference/avail-node-api/da-app-keys`,
    },
    {
      source: "/api-reference/avail-node-api/da-create-application-key",
      destination: `${origin}/da/api-reference/avail-node-api/da-create-application-key`,
    },
    {
      source: "/api-reference/avail-node-api/da-next-app-id",
      destination: `${origin}/da/api-reference/avail-node-api/da-next-app-id`,
    },
    {
      source: "/api-reference/avail-node-api/da-submit-data",
      destination: `${origin}/da/api-reference/avail-node-api/da-submit-data`,
    },
    {
      source: "/api-reference/avail-node-api/nomination-pools-create",
      destination: `${origin}/da/api-reference/avail-node-api/nomination-pools-create`,
    },
    {
      source: "/api-reference/avail-node-api/nomination-pools-create-with-pool-id",
      destination: `${origin}/da/api-reference/avail-node-api/nomination-pools-create-with-pool-id`,
    },
    {
      source: "/api-reference/avail-node-api/nomination-pools-join",
      destination: `${origin}/da/api-reference/avail-node-api/nomination-pools-join`,
    },
    {
      source: "/api-reference/avail-node-api/nomination-pools-nominate",
      destination: `${origin}/da/api-reference/avail-node-api/nomination-pools-nominate`,
    },
    {
      source: "/api-reference/avail-node-api/staking-active-era",
      destination: `${origin}/da/api-reference/avail-node-api/staking-active-era`,
    },
    {
      source: "/api-reference/avail-node-api/staking-bond",
      destination: `${origin}/da/api-reference/avail-node-api/staking-bond`,
    },
    {
      source: "/api-reference/avail-node-api/staking-chill",
      destination: `${origin}/da/api-reference/avail-node-api/staking-chill`,
    },
    {
      source: "/api-reference/avail-node-api/staking-nominate",
      destination: `${origin}/da/api-reference/avail-node-api/staking-nominate`,
    },
    {
      source: "/api-reference/avail-node-api/staking-unbond",
      destination: `${origin}/da/api-reference/avail-node-api/staking-unbond`,
    },
    {
      source: "/api-reference/avail-node-api/staking-validate",
      destination: `${origin}/da/api-reference/avail-node-api/staking-validate`,
    },
    {
      source: "/api-reference/avail-node-api/system-account",
      destination: `${origin}/da/api-reference/avail-node-api/system-account`,
    },
    
    // Avail Light Client API
    {
      source: "/api-reference/avail-lc-api",
      destination: `${origin}/da/api-reference/avail-lc-api`,
    },
    {
      source: "/api-reference/avail-lc-api/v1-deprecated",
      destination: `${origin}/da/api-reference/avail-lc-api/v1-deprecated`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-version",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-version`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-status",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-status`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-blocks",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-blocks`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-blocks-header",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-blocks-header`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-blocks-header-datafields",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-blocks-header-datafields`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-submit",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-submit`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-subscriptions",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-subscriptions`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-ws-status",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-ws-status`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-ws-submit",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-ws-submit`,
    },
    {
      source: "/api-reference/avail-lc-api/v2-ws-version",
      destination: `${origin}/da/api-reference/avail-lc-api/v2-ws-version`,
    },
    
    // Avail Bridge API
    {
      source: "/api-reference/avail-bridge-api",
      destination: `${origin}/da/api-reference/avail-bridge-api`,
    },
    {
      source: "/api-reference/avail-bridge-api/liveness",
      destination: `${origin}/da/api-reference/avail-bridge-api/liveness`,
    },
    {
      source: "/api-reference/avail-bridge-api/info",
      destination: `${origin}/da/api-reference/avail-bridge-api/info`,
    },
    {
      source: "/api-reference/avail-bridge-api/eth-head",
      destination: `${origin}/da/api-reference/avail-bridge-api/eth-head`,
    },
    {
      source: "/api-reference/avail-bridge-api/avail-head",
      destination: `${origin}/da/api-reference/avail-bridge-api/avail-head`,
    },
    {
      source: "/api-reference/avail-bridge-api/merkle-proof",
      destination: `${origin}/da/api-reference/avail-bridge-api/merkle-proof`,
    },
    {
      source: "/api-reference/avail-bridge-api/storage-proof",
      destination: `${origin}/da/api-reference/avail-bridge-api/storage-proof`,
    },
    {
      source: "/api-reference/avail-bridge-api/vector-send-message",
      destination: `${origin}/da/api-reference/avail-bridge-api/vector-send-message`,
    },
    {
      source: "/api-reference/avail-bridge-api/vector-send-tokens",
      destination: `${origin}/da/api-reference/avail-bridge-api/vector-send-tokens`,
    },
    
    // Turbo DA API
    {
      source: "/api-reference/avail-turbo-da-api",
      destination: `${origin}/da/api-reference/avail-turbo-da-api`,
    },
    {
      source: "/api-reference/avail-turbo-da-api/submit-data",
      destination: `${origin}/da/api-reference/avail-turbo-da-api/submit-data`,
    },
    {
      source: "/api-reference/avail-turbo-da-api/submit-raw-data",
      destination: `${origin}/da/api-reference/avail-turbo-da-api/submit-raw-data`,
    },
    {
      source: "/api-reference/avail-turbo-da-api/get-pre-image",
      destination: `${origin}/da/api-reference/avail-turbo-da-api/get-pre-image`,
    },
    {
      source: "/api-reference/avail-turbo-da-api/get-submission-info",
      destination: `${origin}/da/api-reference/avail-turbo-da-api/get-submission-info`,
    },

    {
      source: "/nexus/avail-nexus-sdk/api-reference",
      destination: `${origin}/nexus/avail-nexus-sdk/examples/nexus-core/api-reference`,
    },

    // Nexus redirects due to the decision taken to not go with the Tutorials top-level 

    {
      source: "/nexus/avail-nexus-sdk/overview",
      destination: `${origin}/nexus/nexus-overview`,
    },
    // {
    //   source: "/nexus/avail-nexus-sdk/overview",
    //   destination: `${origin}/nexus/nexus-quickstart`,
    // },

    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-core/fetch-bridge-balances",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-core/bridge-methods/fetch-bridge-balances`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-core/transfer",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-core/transfer`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-core/bridge-tokens",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-core/bridge`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-core/bridge-and-execute",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-core/bridge-and-execute`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-core/api-reference",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-core/api-reference`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-widgets/transfer",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-widgets/transfer`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-widgets/bridge-tokens",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-widgets/bridge`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-widgets/bridge-and-execute",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-widgets/bridge-and-execute`,
    },
    {
      source: "/nexus/avail-nexus-sdk/examples/nexus-widgets/api-reference",
      destination: `${origin}/nexus/avail-nexus-sdk/nexus-widgets/api-reference`,
    },

    
  ];

  // we need to check for both with and without "/docs/" prefix
  const pathsToCheck = [
    request.nextUrl.pathname,
    `/docs${request.nextUrl.pathname}`,
    normalizePath(request.nextUrl.pathname),
    normalizePath(`/docs${request.nextUrl.pathname}`)
  ];

  for (const path of pathsToCheck) {
    const normalizedRedirects = redirects
      .map((rule) => ({ ...rule, _src: normalizePath(rule.source) }))
      .sort((a, b) => b._src.length - a._src.length); // longest source first

    const best = normalizedRedirects.find(({ _src }) =>
      path === _src || path.startsWith(_src + '/')
    );

    if (best) {
      const suffix = path.slice(best._src.length); // preserves subpath
      const destination = best.destination + suffix;
      return NextResponse.redirect(destination, { status: 301 });
    }
  }

  // console.log('No redirect found for:', request.nextUrl.pathname);
  return NextResponse.next();
}
