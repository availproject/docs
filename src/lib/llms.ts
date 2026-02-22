import { cleanMarkdownForAgents } from "@/lib/markdown-clean";
import { products } from "@/lib/products";
import { source } from "@/lib/source";

type ProductSlug = (typeof products)[number]["slug"];
type DocsPage = typeof source.getPages extends () => Array<infer T> ? T : never;

function urlBelongsToProduct(url: string, slug: ProductSlug): boolean {
  const normalized = url.toLowerCase();

  if (slug === "nexus") {
    return (
      normalized === "/docs/nexus" || normalized.startsWith("/docs/nexus/")
    );
  }

  return (
    normalized === "/docs" ||
    normalized === "/docs/da" ||
    normalized.startsWith("/docs/da/")
  );
}

function getProductPages(allPages: DocsPage[], slug: ProductSlug): DocsPage[] {
  const seen = new Set<string>();

  return allPages.filter((page) => {
    if (!urlBelongsToProduct(page.url, slug)) return false;
    if (seen.has(page.url)) return false;
    seen.add(page.url);
    return true;
  });
}

function bulletLink(name: string, url: string, description?: string): string {
  if (description) {
    return `- [${name}](${url}): ${description}`;
  }
  return `- [${name}](${url})`;
}

/**
 * Filter pages whose URL starts with a given section prefix.
 * e.g. "da/build" matches /docs/da/build, /docs/da/build/networks, etc.
 */
function filterBySection(pages: DocsPage[], section: string): DocsPage[] {
  const prefix = `/docs/${section}`.toLowerCase();
  return pages.filter(
    (page) =>
      page.url.toLowerCase() === prefix ||
      page.url.toLowerCase().startsWith(`${prefix}/`),
  );
}

export function generateLlmsTxt(): string {
  const allPages = source.getPages();

  const lines: string[] = [
    "# Avail Documentation",
    "",
    "> Avail is a modular blockchain for data availability (Avail DA)",
    "> and cross-chain unification (Avail Nexus).",
    "",
    "## Quick Reference",
    "",
    "- Mainnet RPC: https://mainnet-rpc.avail.so/rpc",
    "- Testnet RPC: https://turing-rpc.avail.so/rpc",
    "- Faucet: https://faucet.avail.so",
    "- Explorer: https://avail.subscan.io",
    "- Bridge: https://bridge.availproject.org",
    "- Structured data (JSON): /api/reference.json",
    "",
    "## If you want to...",
    "",
    "### Build on Avail DA",
    "",
    "- [Submit data to Avail](/docs/da/build/interact/read-write-on-avail): Read and write data on-chain",
    "- [Get testnet tokens](/docs/da/build/interact/faucet): Fund your account on Turing testnet",
    "- [Networks & endpoints](/docs/da/networks): RPC URLs, chain specs, contract addresses",
    "- [Create an App ID](/docs/da/build/interact/app-id): Register your application on Avail DA",
    "- [Node API reference](/docs/da/api-reference/avail-node-api): SDK examples in TypeScript, Rust, and Go",
    "- [Turbo DA](/docs/da/build/turbo-da): Fast data submissions via hosted service",
    "- [Query balances](/docs/da/build/interact/query-balances): Check account balances",
    "- [Transfer balances](/docs/da/build/interact/transfer-balances): Send tokens between accounts",
    "",
    "### Deploy a rollup on Avail DA",
    "",
    "- [Rollup frameworks overview](/docs/da/build/rollups): Supported frameworks at a glance",
    "- [OP Stack](/docs/da/build/rollups/op-stack): Deploy an OP Stack rollup",
    "- [Arbitrum Nitro](/docs/da/build/rollups/arbitrum-nitro): Deploy an Arbitrum Nitro rollup",
    "- [Polygon CDK](/docs/da/build/rollups/cdk): Deploy a Polygon CDK rollup",
    "- [Madara (Starknet)](/docs/da/build/rollups/madara): Deploy a Madara rollup",
    "- [zkEVM](/docs/da/build/rollups/zkevm): Deploy a zkEVM rollup",
    "- [zkSync](/docs/da/build/rollups/zksync): Deploy a zkSync rollup",
    "- [Cosmos SDK](/docs/da/build/rollups/cosmos): Integrate with Cosmos",
    "",
    "### Run infrastructure",
    "",
    "- [Node types](/docs/da/operate/node-types): Choose the right node type",
    "- [Run a full node](/docs/da/operate/run-a-full-node/full-node): Set up and run a full node",
    "- [Run a light client](/docs/da/operate/run-a-light-client/light-client): Set up and run a light client",
    "- [Become a validator](/docs/da/operate/become-a-validator/basics): Join the validator set",
    "- [Deployment options](/docs/da/operate/deployment-options): Cloud, Docker, and bare-metal",
    "",
    "### Understand Avail DA",
    "",
    "- [What is Avail DA?](/docs/da/concepts/what-is-avail-da): High-level overview",
    "- [How Avail DA works](/docs/da/concepts/how-avail-da-works): Technical deep-dive into data availability",
    "- [App IDs](/docs/da/concepts/app-ids): Application identification on Avail",
    "- [Transaction pricing](/docs/da/concepts/tx-pricing): How fees are calculated",
    "- [Glossary](/docs/da/glossary): Key terms and definitions",
    "- [FAQs](/docs/da/faqs): Frequently asked questions",
    "",
    "### Use Avail (wallets, staking, bridge)",
    "",
    "- [Create an account](/docs/da/user-guides/accounts): Set up a wallet",
    "- [Stake AVAIL tokens](/docs/da/user-guides/staking-governance/stake-on-avail): Nominate validators or join pools",
    "- [Bridge AVAIL](/docs/da/user-guides/bridge-avail): Move tokens between Avail, Ethereum, and Base",
    "- [Avail Ledger guide](/docs/da/user-guides/ledger-avail): Use a Ledger hardware wallet",
    "- [Governance](/docs/da/user-guides/staking-governance/governance-on-avail): Participate in on-chain governance",
    "",
    "### Use the bridge & APIs (developers)",
    "",
    "- [Bridge overview](/docs/da/build/vectorx): VectorX bridge architecture",
    "- [Bridge API reference](/docs/da/api-reference/avail-bridge-api): REST endpoints for bridge operations",
    "- [Light Client API](/docs/da/api-reference/avail-lc-api): HTTP and WebSocket endpoints",
    "- [Turbo DA API](/docs/da/api-reference/avail-turbo-da-api): Fast submission API",
    "",
    "### Build with Avail Nexus",
    "",
    "- [Get started with Nexus](/docs/nexus/get-started): Introduction to Avail Nexus",
    "- [Nexus SDK quickstart](/docs/nexus/nexus-sdk/quickstart): Set up the SDK and make your first cross-chain call",
    "- [SDK installation](/docs/nexus/nexus-sdk/get-started/installation): Install and configure Nexus SDK",
    "- [Bridge tokens](/docs/nexus/nexus-sdk/get-started/bridge-tokens): Bridge assets across chains",
    "- [Deposit into Aave](/docs/nexus/nexus-sdk/get-started/deposit-into-aave): Cross-chain DeFi example",
    "- [SDK reference](/docs/nexus/nexus-sdk/reference): Bridge methods, swap methods, hooks, and utilities",
    "- [Bridge methods](/docs/nexus/nexus-sdk/reference/bridge-methods): Cross-chain bridge functions",
    "- [Swap methods](/docs/nexus/nexus-sdk/reference/swap-methods): Cross-chain swap functions",
    "- [Nexus UI Elements](/docs/nexus/nexus-ui-elements): Pre-built React components",
    "- [Contracts](/docs/nexus/contracts): Nexus contract addresses",
    "- [Supported chains & tokens](/docs/nexus/supported-chains-and-tokens): Supported networks and assets",
    "- [Cookbook recipes](/docs/nexus/cookbook-recipes): Common integration patterns",
    "",
    "### Nexus concepts",
    "",
    "- [Chain abstraction](/docs/nexus/concepts/chain-abstraction): What is chain abstraction?",
    "- [Intents](/docs/nexus/concepts/intent): How intents work",
    "- [Intent lifecycle](/docs/nexus/concepts/intent-lifecycle): From creation to settlement",
    "- [Solvers](/docs/nexus/concepts/solvers): Who fulfills intents",
    "- [Cross-chain swaps](/docs/nexus/concepts/xcs-swaps): How XCS swaps work",
    "- [Token allowances](/docs/nexus/concepts/allowances): Approve tokens for Nexus contracts",
    "- [Balance types](/docs/nexus/concepts/bridge-v-swap): Why bridge and swap use different balances",
    "- [Nexus operations](/docs/nexus/concepts/nexus-ops): Bridge, transfer, or bridge & execute in one action",
    "- [Liquidity routing](/docs/nexus/concepts/source-chain-selection): Control which chains tokens are sourced from",
    "",
    "## Full page index",
    "",
    "- [Full documentation dump](/llms-full.txt): Complete content for all pages",
    "- [Section-scoped dump](/llms-full.txt?section=da/build): Add ?section= to filter (e.g. da/build, da/api-reference, nexus)",
    "- [Markdown API](/api/markdown/{slug}): Get any page as markdown (also supports ?format=json)",
    "- [Structured reference data](/api/reference.json): Networks, contracts, SDKs as JSON",
    "",
  ];

  // Append flat page index for discoverability
  lines.push("## All pages", "");

  for (const product of products) {
    const pages = getProductPages(allPages, product.slug);
    if (pages.length === 0) continue;

    lines.push(`### ${product.label}`, "");

    for (const page of pages) {
      lines.push(
        bulletLink(
          page.data.title,
          page.url,
          page.data.description || undefined,
        ),
      );
    }

    lines.push("");
  }

  return lines.join("\n");
}

export async function generateLlmsFullTxt(section?: string): Promise<string> {
  const allPages = source.getPages();

  const lines: string[] = [
    "# Avail Documentation",
    "",
    "> Avail is a modular blockchain focused on data availability and cross-chain interoperability. This documentation covers Avail DA (data availability layer) and Avail Nexus (cross-chain unification).",
  ];

  if (section) {
    lines.push("", `> Filtered to section: ${section}`);
  }

  for (const product of products) {
    let pages = getProductPages(allPages, product.slug);
    if (section) {
      pages = filterBySection(pages, section);
    }
    if (pages.length === 0) continue;

    lines.push("", `## ${product.label}`);

    for (const page of pages) {
      const raw = await page.data.getText("processed");
      const content = cleanMarkdownForAgents(raw);
      lines.push("", `### ${page.data.title}`, "", content);
    }
  }

  return lines.join("\n");
}
