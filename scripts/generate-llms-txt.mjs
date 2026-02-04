// scripts/generate-llms-txt.mjs
// Generates llms.txt hub and product-specific spoke files
// Following the hub-spoke architecture for optimal LLM context usage
// Reference: https://llmstxt.org/

import fg from "fast-glob";
import { promises as fs } from "node:fs";
import path from "node:path";

const DOCS_BASE = "app";
const BASE_URL = "https://docs.availproject.org";

// Product definitions for spoke files
const PRODUCTS = {
  da: {
    name: "Avail DA",
    description: "Data Availability layer with KZG commitments and DAS",
    patterns: ["da/**"],
    outputFile: "llms-da.txt",
    routingHint: "data availability, posting data, light clients, full nodes, validators, rollups, KZG commitments, DAS, App IDs",
    // Priority ordering: conceptual content first, then guides, then API reference last
    // Lower number = higher priority (appears earlier in file)
    priorityPatterns: [
      { pattern: /introduction/, priority: 1 },
      { pattern: /learn-about/, priority: 2 },
      { pattern: /glossary/, priority: 3 },
      { pattern: /networks/, priority: 4 },
      { pattern: /build-with-avail\/(?!.*api)/, priority: 5 },
      { pattern: /operate-a-node/, priority: 6 },
      { pattern: /api-reference/, priority: 99 },
    ],
  },
  nexus: {
    name: "Avail Nexus",
    description: "Cross-chain abstraction and intent-based bridging",
    patterns: ["nexus/**"],
    outputFile: "llms-nexus.txt",
    routingHint: "cross-chain, bridging, intents, swaps, chain abstraction, SDK integration, liquidity",
    // Priority: SDK reference first (most useful for devs), then intro, concepts, examples
    priorityPatterns: [
      { pattern: /avail-nexus-sdk/, priority: 1 },
      { pattern: /introduction/, priority: 2 },
      { pattern: /nexus-overview/, priority: 3 },
      { pattern: /concepts/, priority: 4 },
      { pattern: /quickstart/, priority: 5 },
      { pattern: /cookbook/, priority: 6 },
      { pattern: /nexus-examples/, priority: 7 },
    ],
  },
  "user-guides": {
    name: "User Guides",
    description: "End-user guides for staking, bridging, and account management",
    patterns: ["user-guides/**"],
    outputFile: "llms-user-guides.txt",
    routingHint: "staking, governance, wallets, accounts, Ledger, MetaMask, bridging AVAIL tokens, nomination pools",
    priorityPatterns: [
      { pattern: /accounts/, priority: 1 },
      { pattern: /staking/, priority: 2 },
      { pattern: /bridge/, priority: 3 },
      { pattern: /governance/, priority: 4 },
    ],
  },
};

/**
 * Get sort priority for a file path based on product's priority patterns
 */
function getFilePriority(filePath, priorityPatterns) {
  if (!priorityPatterns) return 50; // default middle priority

  for (const { pattern, priority } of priorityPatterns) {
    if (pattern.test(filePath)) {
      return priority;
    }
  }
  return 50; // default for unmatched files
}

const SEPARATOR = "\n-------------------------------------------------------------------------------\n\n";

/**
 * Clean MDX content for LLM consumption
 */
function cleanMDX(src) {
  return src
    .replace(/^\s*import\s.+$/gm, "")
    .replace(/^\s*export\s.+$/gm, "")
    .replace(/<\/?Tabs[^>]*>/g, "")
    .replace(/<\/?Tab[^>]*>/g, "")
    .replace(/<\/?Callout[^>]*>/gi, "")
    .replace(/<\/?Cards[^>]*>/gi, "")
    .replace(/<\/?Card[^>]*>/gi, "")
    .trim();
}

/**
 * Extract title from MDX frontmatter or first H1
 */
function extractTitle(content, filePath) {
  const frontmatterMatch = content.match(/^---[\s\S]*?title:\s*["']?([^"'\n]+)["']?[\s\S]*?---/);
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim();
  }
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  const segments = filePath.split("/");
  const lastSegment = segments[segments.length - 2] || "index";
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Convert file path to URL route
 */
function filePathToRoute(filePath) {
  const rel = path.relative(DOCS_BASE, filePath).replace(/\/page\.(mdx?|md)$/i, "");
  if (rel === "" || rel === ".") {
    return "/";
  }
  return "/" + rel;
}

/**
 * Generate a product-specific spoke file
 */
async function generateSpokeFile(productKey, product, allFiles) {
  const productPatterns = product.patterns.map((p) => `${DOCS_BASE}/${p}/page.mdx`);
  const productPatternsMd = product.patterns.map((p) => `${DOCS_BASE}/${p}/page.md`);
  const patterns = [...productPatterns, ...productPatternsMd];

  // Sort files by priority (conceptual content first, API reference last)
  // Then alphabetically within the same priority level
  const files = (await fg(patterns, { dot: false })).sort((a, b) => {
    const priorityA = getFilePriority(a, product.priorityPatterns);
    const priorityB = getFilePriority(b, product.priorityPatterns);
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return a.localeCompare(b);
  });

  if (files.length === 0) {
    console.log(`  Skipping ${product.outputFile} - no files found`);
    return null;
  }

  const chunks = [];

  // Add header
  chunks.push(`# ${product.name} Documentation

> ${product.description}

This file contains the complete ${product.name} documentation for LLM context.
Base URL: ${BASE_URL}

---
`);

  // Add each page with its route as context
  for (const file of files) {
    let src = await fs.readFile(file, "utf8");
    const title = extractTitle(src, file);
    const route = filePathToRoute(file);
    src = cleanMDX(src);

    chunks.push(`## ${title}
URL: ${BASE_URL}${route}

${src}`);
  }

  const content = chunks.join(SEPARATOR).trim() + "\n";
  const outPath = path.join("public", product.outputFile);
  await fs.writeFile(outPath, content, "utf8");

  console.log(`  wrote /${product.outputFile} with ${files.length} pages, ${content.length} bytes`);

  return {
    file: product.outputFile,
    pages: files.length,
    bytes: content.length,
  };
}

/**
 * Generate the hub llms.txt file (routing index only)
 */
async function generateHubFile(spokeStats) {
  const content = `# Avail Documentation

> Modular blockchain providing data availability (Avail DA) and cross-chain interoperability (Avail Nexus).

## Instructions

This file is a routing index. To help users with Avail, you MUST:
1. Read the routing table below to identify which product the user needs.
2. Fetch exactly ONE context file — the single best match for the user's question.

Do NOT attempt to answer using only this file — it does not contain implementation details.
Do NOT fetch all files — each file is self-contained, so only one is needed.

## Routing

If the user needs help with **${PRODUCTS.da.routingHint}**:
→ ${BASE_URL}/${PRODUCTS.da.outputFile}

If the user needs help with **${PRODUCTS.nexus.routingHint}**:
→ ${BASE_URL}/${PRODUCTS.nexus.outputFile}

If the user needs help with **${PRODUCTS["user-guides"].routingHint}**:
→ ${BASE_URL}/${PRODUCTS["user-guides"].outputFile}

If the user's question spans multiple products or you are unsure:
→ ${BASE_URL}/llms-full.txt

## About Avail Products

- **Avail DA**: Modular data availability layer using KZG polynomial commitments and data availability sampling (DAS). Enables rollups to post data with cryptographic guarantees without full nodes.
- **Avail Nexus**: Cross-chain abstraction protocol enabling intent-based bridging, swaps, and liquidity access across chains. Build once, deploy everywhere.
- **User Guides**: Step-by-step guides for staking AVAIL, governance participation, wallet setup, and token bridging.

## Networks

### Avail DA
- **Mainnet**: Avail DA mainnet is live
- **Turing Testnet**: Active testnet for development and testing

### Avail Nexus
Supported Chains
- ${BASE_URL}/nexus/avail-nexus-sdk/api-reference#supported-chains
Supported Tokens
- ${BASE_URL}/nexus/avail-nexus-sdk/api-reference#supported-tokens
`;

  const outPath = path.join("public", "llms.txt");
  await fs.writeFile(outPath, content.trim() + "\n", "utf8");

  console.log(`  wrote /llms.txt (hub), ${content.length} bytes`);
}

/**
 * Update llms-full.txt to include routing header
 */
async function updateFullFile() {
  const existingPath = path.join("public", "llms-full.txt");

  try {
    const existingContent = await fs.readFile(existingPath, "utf8");

    // Check if it already has the routing header
    if (existingContent.startsWith("# Avail Complete Documentation")) {
      console.log("  llms-full.txt already has routing header");
      return;
    }

    const header = `# Avail Complete Documentation

> This file contains ALL Avail documentation. For faster, more focused responses, consider using product-specific files instead.

## Recommended: Use Product-Specific Files

- Avail DA: ${BASE_URL}/llms-da.txt
- Avail Nexus: ${BASE_URL}/llms-nexus.txt
- User Guides: ${BASE_URL}/llms-user-guides.txt

See ${BASE_URL}/llms.txt for routing guidance.

---

`;

    const newContent = header + existingContent;
    await fs.writeFile(existingPath, newContent, "utf8");
    console.log(`  updated /llms-full.txt with routing header`);
  } catch (e) {
    console.log(`  llms-full.txt not found, skipping header update`);
  }
}

// Main execution
console.log("Generating LLM documentation files (hub-spoke architecture)...\n");

await fs.mkdir("public", { recursive: true });

// Generate spoke files for each product
console.log("Generating spoke files:");
const spokeStats = [];
for (const [key, product] of Object.entries(PRODUCTS)) {
  const stats = await generateSpokeFile(key, product, []);
  if (stats) {
    spokeStats.push(stats);
  }
}

// Generate hub file
console.log("\nGenerating hub file:");
await generateHubFile(spokeStats);

// Update llms-full.txt with routing header
console.log("\nUpdating llms-full.txt:");
await updateFullFile();

console.log("\nDone! Hub-spoke architecture generated.");
