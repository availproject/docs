import {
  usdcMainnet,
  usdcTestnet,
  usdtMainnet,
  usdtTestnet,
  vaultMainnet,
  vaultTestnet,
} from "@/components/mdx/contract-addresses/data";
import {
  mainnetChains,
  testnetChains,
  tokenReference,
} from "@/components/mdx/supported-chains/data";
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

export function generateLlmsTxt(): string {
  const allPages = source.getPages();

  const lines: string[] = [
    "# Avail Documentation",
    "",
    "> Avail is a modular blockchain for data availability (Avail DA)",
    "> and cross-chain unification (Avail Nexus).",
    "",
    "## Section-Specific Documentation",
    "",
    "For faster, focused context, fetch the section you need:",
    "",
    "| File | Description |",
    "|------|-------------|",
    "| [/llms-da.txt](/llms-da.txt) | Avail DA — data availability layer (build, operate, concepts, user guides, API reference) |",
    "| [/llms-nexus.txt](/llms-nexus.txt) | Avail Nexus — cross-chain unification (SDK, concepts, contracts, UI elements) |",
    "| [/llms-full.txt](/llms-full.txt) | Complete documentation dump (all pages) |",
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
    "- [Nexus SDK TypeDoc](https://availproject.github.io/nexus-sdk/): Full API reference (methods, types, events, errors)",
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
    "## Other endpoints",
    "",
    "- [AI-friendly features](/docs/ai-features): How AI agents and LLMs can interact with Avail documentation",
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

const sectionMeta: Record<
  string,
  { productSlug: ProductSlug; label: string; description: string }
> = {
  da: {
    productSlug: "da",
    label: "Avail DA",
    description:
      "Data availability layer — build, operate, concepts, user guides, and API reference.",
  },
  nexus: {
    productSlug: "nexus",
    label: "Avail Nexus",
    description:
      "Cross-chain unification — SDK, concepts, contracts, and UI elements.",
  },
};

// ---------------------------------------------------------------------------
// Nexus reference data — rendered as markdown for LLM consumption.
// The website renders these via React components which get stripped by
// cleanMarkdownForAgents, so we generate the tables directly from the
// same data sources.
// ---------------------------------------------------------------------------

function generateSupportedChainsMarkdown(): string {
  const lines: string[] = [
    "## Supported Chains & Tokens",
    "",
    "### Mainnet Chains",
    "",
    "| Network | Chain ID | Native | Supported Tokens | Swaps |",
    "|---------|----------|--------|-----------------|-------|",
  ];

  for (const c of mainnetChains) {
    lines.push(
      `| ${c.name} | ${c.chainId} | ${c.native} | ${c.tokens.join(", ")} | ${c.swaps ? "Yes" : "—"} |`,
    );
  }

  lines.push("", "### Testnet Chains", "");
  lines.push(
    "> Swaps are not supported in testnet environments.",
    "",
    "| Network | Chain ID | Native | Supported Tokens |",
    "|---------|----------|--------|-----------------|",
  );

  for (const c of testnetChains) {
    lines.push(
      `| ${c.name} | ${c.chainId} | ${c.native} | ${c.tokens.join(", ")} |`,
    );
  }

  lines.push("", "### Token Reference", "");
  lines.push("| Token | Name | Decimals |", "|-------|------|----------|");
  for (const t of tokenReference) {
    lines.push(`| ${t.symbol} | ${t.name} | ${t.decimals} |`);
  }

  return lines.join("\n");
}

function generateContractsMarkdown(): string {
  const lines: string[] = [
    "## Contract Addresses",
    "",
    "Avail Nexus deploys Vault contracts on each supported chain.",
    "These contracts escrow user funds during cross-chain operations.",
    "",
    "### Vault Contracts — Mainnet",
    "",
    "| Chain | Chain ID | Vault Contract Address |",
    "|-------|----------|----------------------|",
  ];

  for (const v of vaultMainnet) {
    lines.push(`| ${v.chain} | ${v.chainId} | ${v.address} |`);
  }

  lines.push(
    "",
    "### Vault Contracts — Testnet",
    "",
    "| Chain | Chain ID | Vault Contract Address |",
    "|-------|----------|----------------------|",
  );
  for (const v of vaultTestnet) {
    lines.push(`| ${v.chain} | ${v.chainId} | ${v.address} |`);
  }

  lines.push(
    "",
    "### USDC Token Addresses — Mainnet",
    "",
    "| Chain | Token | Contract Address |",
    "|-------|-------|-----------------|",
  );
  for (const t of usdcMainnet) {
    lines.push(`| ${t.chain} | ${t.tokenName} | ${t.address} |`);
  }

  lines.push(
    "",
    "### USDC Token Addresses — Testnet",
    "",
    "| Chain | Token | Contract Address |",
    "|-------|-------|-----------------|",
  );
  for (const t of usdcTestnet) {
    lines.push(`| ${t.chain} | ${t.tokenName} | ${t.address} |`);
  }

  lines.push(
    "",
    "### USDT Token Addresses — Mainnet",
    "",
    "| Chain | Token | Contract Address |",
    "|-------|-------|-----------------|",
  );
  for (const t of usdtMainnet) {
    lines.push(`| ${t.chain} | ${t.tokenName} | ${t.address} |`);
  }

  lines.push(
    "",
    "### USDT Token Addresses — Testnet",
    "",
    "| Chain | Token | Contract Address |",
    "|-------|-------|-----------------|",
  );
  for (const t of usdtTestnet) {
    lines.push(`| ${t.chain} | ${t.tokenName} | ${t.address} |`);
  }

  return lines.join("\n");
}

/**
 * Pages whose content is rendered by React components rather than markdown.
 * We replace their cleaned (empty) output with generated markdown from the
 * same data sources the components use.
 */
const nexusPageOverrides: Record<string, () => string> = {
  "/docs/nexus/supported-chains-and-tokens": generateSupportedChainsMarkdown,
  "/docs/nexus/contracts": generateContractsMarkdown,
};

/** Exported for testing — validates override URLs match real pages. */
export const NEXUS_PAGE_OVERRIDE_URLS = Object.keys(nexusPageOverrides);

export async function generateLlmsSectionTxt(
  sectionKey: "da" | "nexus",
): Promise<string> {
  const meta = sectionMeta[sectionKey];
  const allPages = source.getPages();
  const pages = getProductPages(allPages, meta.productSlug);

  const lines: string[] = [
    `# ${meta.label} Documentation`,
    "",
    `> ${meta.description}`,
  ];

  if (sectionKey === "nexus") {
    lines.push(
      "",
      "Full SDK API reference (TypeDoc): https://availproject.github.io/nexus-sdk/",
    );
  }

  for (const page of pages) {
    const override = nexusPageOverrides[page.url];
    if (override) {
      lines.push("", override());
    } else {
      const raw = await page.data.getText("processed");
      const content = cleanMarkdownForAgents(raw);
      lines.push("", `## ${page.data.title}`, "", content);
    }
  }

  return lines.join("\n");
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
      const override = nexusPageOverrides[page.url];
      if (override) {
        lines.push("", override());
      } else {
        const raw = await page.data.getText("processed");
        const content = cleanMarkdownForAgents(raw);
        lines.push("", `### ${page.data.title}`, "", content);
      }
    }
  }

  return lines.join("\n");
}
