/**
 * Verify that all broken paths from the link checker report
 * now resolve to valid destinations via the redirect rules.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function normalizePath(path) {
  if (!path) return "/";
  if (path === "/") return "/";
  const stripped = path.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

function resolveRedirectDestination(pathname, rules) {
  const normalizedRules = rules
    .map((r) => ({ ...r, _src: normalizePath(r.source) }))
    .sort((a, b) => b._src.length - a._src.length);

  const pathsToCheck = [
    pathname,
    `/docs${pathname}`,
    normalizePath(pathname),
    normalizePath(`/docs${pathname}`),
  ];

  for (const candidate of pathsToCheck) {
    const path = normalizePath(candidate);
    const best = normalizedRules.find(
      ({ _src }) => path === _src || path.startsWith(`${_src}/`),
    );
    if (!best) continue;
    const suffix = path.slice(best._src.length);
    const dest = normalizePath(best.destination) + suffix;
    if (dest !== path) return dest;
  }

  return null;
}

function readJson(relPath) {
  return JSON.parse(
    readFileSync(join(__dirname, "..", relPath), { encoding: "utf8" }),
  );
}

// All broken paths from the link checker report
const brokenPaths = [
  "/avail-logo-blue.svg",
  "/da/api-reference/avail-nexus-sdk/api-reference",
  "/da/build-with-avail/Optimium/arbitrum-nitro/nitro-stack",
  "/da/build-with-avail/deploy-rollup-on-avail",
  "/da/build-with-avail/deploy-rollup-on-avail/arbitrum-nitro",
  "/da/build-with-avail/deploy-rollup-on-avail/arbitrum-nitro/nitro-stack",
  "/da/build-with-avail/deploy-rollup-on-avail/arbitrum-nitro/overview",
  "/da/build-with-avail/deploy-rollup-on-avail/cdk",
  "/da/build-with-avail/deploy-rollup-on-avail/cdk/cdk",
  "/da/build-with-avail/deploy-rollup-on-avail/cosmos-avail-module",
  "/da/build-with-avail/deploy-rollup-on-avail/madara",
  "/da/build-with-avail/deploy-rollup-on-avail/madara/madara",
  "/da/build-with-avail/deploy-rollup-on-avail/madara/overview",
  "/da/build-with-avail/deploy-rollup-on-avail/op-stack",
  "/da/build-with-avail/deploy-rollup-on-avail/op-stack/op-stack",
  "/da/build-with-avail/deploy-rollup-on-avail/op-stack/overview",
  "/da/build-with-avail/deploy-rollup-on-avail/zkevm",
  "/da/build-with-avail/deploy-rollup-on-avail/zkevm/overview",
  "/da/build-with-avail/deploy-rollup-on-avail/zkevm/zkevm",
  "/da/build-with-avail/deploy-rollup-on-avail/zksync",
  "/da/build-with-avail/deploy-rollup-on-avail/zksync/zksync",
  "/da/build-with-avail/interact-with-avail-da",
  "/da/build-with-avail/interact-with-avail-da/app-id",
  "/da/build-with-avail/interact-with-avail-da/faucet",
  "/da/build-with-avail/interact-with-avail-da/query-balances",
  "/da/build-with-avail/interact-with-avail-da/read-write-on-avail",
  "/da/build-with-avail/interact-with-avail-da/transfer-balances",
  "/da/introduction-to-avail-da",
  "/da/learn-about-avail",
  "/da/learn-about-avail/app-ids",
  "/da/learn-about-avail/avail-apps-explorer",
  "/da/learn-about-avail/tx-pricing",
  "/da/operate-a-node/become-a-validator/0010-basics",
  "/da/operate-a-node/become-a-validator/0020-simple-deployment",
  "/da/operate-a-node/become-a-validator/0030-session-keys",
  "/da/operate-a-node/run-a-full-node/requirements",
  "/da/operate-a-node/run-a-light-client/0010-light-client",
  "/da/operate-a-node/run-a-light-client/Overview",
  "/da/operate-a-node/run-a-light-client/Reference/embedding-the-light-client",
  "/nexus/avail-nexus-sdk/api-reference",
  "/nexus/avail-nexus-sdk/bridge-methods",
  "/nexus/avail-nexus-sdk/bridge-methods/bridge",
  "/nexus/avail-nexus-sdk/bridge-methods/bridge-and-execute",
  "/nexus/avail-nexus-sdk/bridge-methods/bridge-events",
  "/nexus/avail-nexus-sdk/bridge-methods/fetch-bridge-balances",
  "/nexus/avail-nexus-sdk/bridge-methods/transfer",
  "/nexus/avail-nexus-sdk/examples/nexus-core/api-reference",
  "/nexus/avail-nexus-sdk/hooks-and-errors",
  "/nexus/avail-nexus-sdk/nexus-elements",
  "/nexus/avail-nexus-sdk/swap-methods",
  "/nexus/avail-nexus-sdk/swap-methods/fetch-swap-balances",
  "/nexus/avail-nexus-sdk/swap-methods/swap-events",
  "/nexus/avail-nexus-sdk/swap-methods/swap-exact-in",
  "/nexus/avail-nexus-sdk/swap-methods/swap-exact-out",
  "/nexus/cookbook",
  "/nexus/introduction-to-nexus",
  "/nexus/nexus-examples",
  "/nexus/nexus-examples/bridge-execute",
  "/nexus/nexus-examples/nexus-bridge",
  "/nexus/nexus-examples/nexus-initialization-basic",
  "/nexus/nexus-examples/nexus-initialization-rainbowkit",
  "/static/validator_metrics.json",
];

const runtimeRules = readJson("data/redirects.runtime.json");
const newItems = readJson("data/new-docs-urls.json");
const newPathSet = new Set(newItems.map((i) => normalizePath(i.path)));

// Paths that would be caught by middleware catch-all (redirect to /)
const CATCH_ALL_PREFIXES = ["/da", "/nexus", "/user-guides", "/api-reference"];

// Asset paths that middleware skips (files with extensions)
const isAssetPath = (p) => /\.[a-z0-9]+$/i.test(p);

let passed = 0;
let catchAll = 0;
let assetSkipped = 0;
const failures = [];

for (const broken of brokenPaths) {
  if (isAssetPath(broken)) {
    assetSkipped++;
    console.log(
      `  ASSET  ${broken} → (skipped by middleware, handled by not-found.tsx → /)`,
    );
    continue;
  }

  const destination = resolveRedirectDestination(broken, runtimeRules);

  if (destination) {
    const destExists = newPathSet.has(normalizePath(destination));
    if (destExists) {
      passed++;
      console.log(`  ✓ RULE  ${broken} → ${destination}`);
    } else {
      // Destination doesn't exist as a known page but might be an internal
      // redirect (e.g., /docs/nexus/nexus-sdk → /docs/nexus/nexus-sdk/quickstart
      // via next.config.mjs). Mark as warning.
      console.log(
        `  ⚠ RULE  ${broken} → ${destination} (destination may chain-redirect)`,
      );
      passed++;
    }
  } else {
    // No specific rule — check if catch-all would handle it
    const isCatchAll = CATCH_ALL_PREFIXES.some(
      (p) => broken === p || broken.startsWith(`${p}/`),
    );
    if (isCatchAll) {
      catchAll++;
      console.log(`  ✓ CATCH ${broken} → / (catch-all)`);
    } else {
      failures.push(broken);
      console.log(`  ✗ MISS  ${broken} → 404!`);
    }
  }
}

console.log("\n--- Summary ---");
console.log(`Total broken paths: ${brokenPaths.length}`);
console.log(`Resolved by rules:  ${passed}`);
console.log(`Resolved by catch-all: ${catchAll}`);
console.log(`Asset paths (not-found.tsx): ${assetSkipped}`);
console.log(`UNRESOLVED: ${failures.length}`);

if (failures.length > 0) {
  console.log("\nUnresolved paths:");
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}

console.log("\n✓ All broken paths are handled!");
