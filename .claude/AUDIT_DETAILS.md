# Audit Details

> Generated: 2026-02-11
>
> Detailed breakdowns from the code health audit. Referenced by [CODE_HEALTH_AUDIT.md](./CODE_HEALTH_AUDIT.md).
> Run `/audit` to regenerate.

---

## Build & Type Safety

| Check | Status |
|-------|--------|
| `next build` | **Passes** — 390 static pages generated (Next.js 16, Turbopack) |
| `tsc --noEmit` | **Clean** — no TypeScript errors |
| Build warnings | `Failed to fetch registry item: 404` (2 occurrences — shadcn registry fetch) |

---

## Biome Lint Breakdown

**Total: 455 errors, 185 warnings** (252 files checked)

| Rule | Count | Severity | Auto-fixable |
|------|-------|----------|-------------|
| Format/parse (CSS + JSON) | ~190 | Error | Yes (`biome format --write`) |
| `lint/style/useImportType` | ~77 | Warning | Yes |
| `lint/correctness/useExhaustiveDependencies` | ~56 | Error | Needs review |
| `lint/performance/noImgElement` | ~34 | Warning | Use `next/image` |
| `lint/correctness/noUnusedImports` | ~20 | Error | Yes |
| `lint/complexity/useLiteralKeys` | ~11 | Warning | Yes |
| `lint/correctness/noUnusedVariables` | ~10 | Error | Yes |
| `lint/complexity/noImportantStyles` | ~10 | Warning | Refactor CSS |
| `lint/suspicious/noExplicitAny` | ~9 | Warning | Type properly |
| `lint/suspicious/noArrayIndexKey` | ~8 | Warning | Use stable keys |
| `lint/correctness/noUnusedFunctionParameters` | ~8 | Error | Yes |
| `lint/style/noNonNullAssertion` | ~7 | Warning | Add null checks |
| `lint/suspicious/useIterableCallbackReturn` | ~6 | Warning | Add return |
| `lint/style/useTemplate` | ~5 | Warning | Yes |
| `lint/style/useNodejsImportProtocol` | ~4 | Warning | Yes |
| `lint/suspicious/noGlobalIsNan` | ~3 | Warning | Use `Number.isNaN` |
| `lint/security/noDangerouslySetInnerHtml` | ~3 | Error | Needs review |
| `lint/correctness/useHookAtTopLevel` | ~3 | Error | Needs review |
| `lint/correctness/useParseIntRadix` | ~3 | Error | Yes |
| `lint/suspicious/noDocumentCookie` | ~1 | Warning | Mixed |
| `lint/style/useExponentiationOperator` | ~1 | Warning | Yes |

**Quick win:** `npx biome check --write` auto-fixes ~300 issues (formatting, unused imports, import types, literal keys, template strings, parseInt radix, Node.js protocol).

### Top offenders for `useExhaustiveDependencies`

- `src/components/transfer/hooks/useTransfer.ts` (lines 272, 286)
- `src/components/fast-bridge/hooks/useBridge.ts` (lines 285, 299)
- `src/components/swaps/hooks/useSwaps.ts` (line 377)
- `src/components/common/hooks/useStopwatch.ts` (line 36)
- `src/components/nexus/NexusProvider.tsx` (line 232)

### CSS parse errors

`src/app/global.css` (lines 65, 67, 573, 581, 589, 597, 611, 616, 724)

---

## Broken Links in Content

### Internal broken links (4 remaining — 3 resolved since last audit)

| File | Broken Link | Fix |
|------|-------------|-----|
| ~~`content/docs/da/faqs/index.mdx`~~ | ~~`/docs/clash-of-nodes/faqs.mdx`~~ | ~~Resolved — now links to external blog~~ |
| ~~`content/docs/da/build-with-avail/.../Optimium/op-stack/index.mdx`~~ | ~~`/docs/introduction-to-avail/avail-da`~~ | ~~Resolved — now uses `/docs/da/welcome-to-avail-docs`~~ |
| ~~`content/docs/da/build-with-avail/.../cosmos-avail-module/index.mdx`~~ | ~~`/docs/introduction-to-avail/...` (×2)~~ | ~~Resolved — now uses `/docs/da/welcome-to-avail-docs`~~ |
| `content/docs/da/user-guides/.../stake-on-avail/overview/index.mdx:60` | `/docs/glossary#era` | `/docs/da/glossary#era` — missing `/da/` segment |
| `content/docs/da/user-guides/.../staking-governance/overview/index.mdx:26` | `/docs/da/build-with-avail/vectorx#using-the-bridge` | Remove anchor — `#using-the-bridge` heading no longer exists |
| `content/docs/nexus/concepts/bridge-v-swap/index.mdx:21,47` | Self-referential links to own page | Line 21: `/docs/nexus/nexus-sdk/swap-methods`; Line 47: remove |
| `content/docs/da/glossary/index.mdx:27` | Relative link `(../user-guides/staking-governance/overview)` | Use absolute `/docs/da/user-guides/staking-governance/overview` |

### Frontmatter links to docs.availproject.org (NEW — 20 links across 10 files)

10 Nexus element/component files have `doc:` and `api:` frontmatter fields pointing to `https://docs.availproject.org/nexus/...` instead of internal `/docs/nexus/...` paths. These are used by component rendering, so impact depends on how the site consumes them. Lower priority than content links.

### External links that should be internal (NEW — 11 links across 4 files)

| File | External `docs.availproject.org` Link | Internal Equivalent |
|------|---------------------------------------|---------------------|
| `da/faqs/index.mdx:60` | `https://docs.availproject.org/` | `/docs/da` |
| `da/faqs/index.mdx:61` | `.../docs/operate-a-node/become-a-validator` | `/docs/da/operate-a-node/become-a-validator` |
| `da/faqs/index.mdx:62` | `.../docs/operate-a-node/run-a-light-client` | `/docs/da/operate-a-node/run-a-light-client` |
| `da/.../cosmos-avail-module/index.mdx:104` | `.../docs/operate-a-node/run-a-light-client/Overview` | `/docs/da/operate-a-node/run-a-light-client/Overview` |
| `da/.../Validium/cdk/cdk/index.mdx:226` | `.../docs/build-with-avail/vectorx` | `/docs/da/build-with-avail/vectorx` |
| `da/.../Validium/zksync/zksync/index.mdx:169` | `.../user-guides/accounts` | `/docs/da/user-guides/accounts` |
| `da/.../Validium/zksync/zksync/index.mdx:170` | `.../docs/build-with-avail/interact-with-avail-da/faucet` | `/docs/da/build-with-avail/interact-with-avail-da/faucet` |
| `da/.../Validium/zksync/zksync/index.mdx:171,180,223` | `.../docs/build-with-avail/interact-with-avail-da/app-id` (×3) | `/docs/da/build-with-avail/interact-with-avail-da/app-id` |
| `da/.../Validium/zksync/zksync/index.mdx:199` | `.../docs/networks#alternate-endpoints` | `/docs/da/networks#alternate-endpoints` |

---

## Duplicate Content

### Exact duplicates (6 files — HIGH)

`nexus/nexus-quickstart/nexus-elements/` contains 6 files identical to `nexus/nexus-ui-elements/components/`:

| File | Action |
|------|--------|
| `fast-bridge.mdx` | Remove one copy |
| `swaps.mdx` | Remove one copy |
| `deposit.mdx` | Remove one copy |
| `view-history.mdx` | Remove one copy |
| `unified-balance.mdx` | Remove one copy |
| `transfer.mdx` | Remove one copy |

**Recommendation:** Remove `nexus-quickstart/nexus-elements/` and redirect to `nexus-ui-elements/components/`.

### Duplicate titles (different content, confusing navigation)

| Title | Files |
|-------|-------|
| "Nexus UI Elements" | `nexus/nexus-quickstart/nexus-elements/index.mdx`, `nexus/nexus-ui-elements/index.mdx` |
| "Get Started" | `nexus/get-started/index.mdx`, `nexus/nexus-quickstart/index.mdx`, root `index.mdx` |
| "Stake on Avail" | `da/.../stake-on-avail/index.mdx` (cards nav), `da/.../stake-on-avail/overview/index.mdx` (content) |

---

## Stray Code Fences

Files with quadruple backticks (`````) instead of triple, causing rendering issues:

| File | Line |
|------|------|
| `content/docs/nexus/nexus-quickstart/nexus-elements/swaps.mdx` | 89 |
| `content/docs/nexus/nexus-quickstart/nexus-elements/transfer.mdx` | 98 |
| `content/docs/nexus/nexus-quickstart/nexus-elements/view-history.mdx` | 81 |
| `content/docs/nexus/nexus-quickstart/nexus-elements/unified-balance.mdx` | 83 |
| `content/docs/nexus/nexus-ui-elements/components/swaps.mdx` | 89 |
| `content/docs/nexus/nexus-ui-elements/components/view-history.mdx` | 81 |
| `content/docs/nexus/nexus-ui-elements/components/transfer.mdx` | 98 |
| `content/docs/nexus/nexus-ui-elements/components/unified-balance.mdx` | 83 |
| `content/docs/da/api-reference/avail-bridge-api/vector-send-message/index.mdx` | 81 |

Also: `content/docs/nexus/nexus-ui-elements/installation/index.mdx:124` — stray trailing triple-backtick after `</Card>`.

---

## Missing Frontmatter Descriptions

**122 out of 191 files (64%)** lack a `description` field. _(Was 123/190 -- marginal improvement.)_

Consistently missing:
- Nearly all DA API reference files
- Most DA rollup deployment guides
- Most DA section index/landing pages
- Several DA user guide files (staking, governance, snap, multisig, recovery, ledger)
- A handful of Nexus pages

Consistently present:
- All Nexus UI Elements component pages
- All Nexus quickstart element pages
- Most Nexus concept pages
- Root index pages

---

## Spelling Errors

| File | Error | Fix |
|------|-------|-----|
| `content/docs/da/build-with-avail/.../Optimium/op-stack/index.mdx` | "permisionless" | "permissionless" |
| `content/docs/da/build-with-avail/.../cosmos-avail-module/index.mdx` | "permisionless" | "permissionless" |
| `content/docs/da/faqs/index.mdx` | "buiding" | "building" |
| `content/docs/da/user-guides/accounts/index.mdx` | "nnote" | "note" |
| `content/docs/da/user-guides/avail-multisig/index.mdx:110` | "seperate" | "separate" |
| `content/docs/da/operate-a-node/become-a-validator/0020-simple-deployment/index.mdx:132` | "seperate" | "separate" |
| `content/docs/da/api-reference/avail-node-api/da-app-keys/index.mdx:212` | "seperated" | "separated" |

---

## Placeholder / Coming Soon Pages

| File | Content |
|------|---------|
| `content/docs/nexus/nexus-ui-elements/mcp-documentation/index.mdx` | "This page is coming soon." |
| `content/docs/nexus/nexus-sdk/build-your-first-liquid-app/index.mdx` | "This guide is coming soon." |

~~`content/docs/nexus/cookbook-recipes/index.mdx`~~ -- Resolved (content added or removed).


Near-empty pages:
- `da/api-reference/gas-relay-deprecated/index.mdx` — deprecation notice only
- `da/api-reference/avail-lc-api/v1-deprecated/index.mdx` — deprecation notice only
- `da/build-with-avail/deploy-rollup-on-avail/Validium/index.mdx` — cards nav only
- `da/build-with-avail/deploy-rollup-on-avail/Validium/zksync/index.mdx` — single card link

---

## Dependency Issues

| Issue | Detail |
|-------|--------|
| Unused devDependency | `tw-animate-css` — listed in devDependencies but not imported anywhere |
| False positive | `fumadocs-mdx:collections` in `src/lib/source.ts` — virtual module resolved by Fumadocs at build time |

---

## Priority Summary

| Priority | Category | Items | Action |
|----------|----------|-------|--------|
| **HIGH** | Duplicate content | 6 files | Remove `nexus-quickstart/nexus-elements/` or `nexus-ui-elements/components/` |
| **HIGH** | Biome quick-fix | ~300 | Run `npx biome check --write` |
| **HIGH** | External->internal links | 11 links | Convert `docs.availproject.org` references to internal `/docs/da/...` paths |
| **MEDIUM** | Broken internal links | 4 remaining | Fix link paths (3 resolved since last audit) |
| **LOW** | Frontmatter external links | 20 links | Convert Nexus element `doc:`/`api:` fields to internal paths |
| **MEDIUM** | Stray code fences | 9 files | Fix quadruple -> triple backticks |
| **MEDIUM** | Exhaustive deps | ~56 | Review hook dependencies |
| **MEDIUM** | `next/image` | ~34 | Replace `<img>` with `<Image>` |
| **LOW** | Missing descriptions | 122 files | Add frontmatter `description` |
| **LOW** | Dead code | 4 files | Remove unused code |
| **LOW** | Spelling errors | 7 | Fix typos |
| **LOW** | Coming soon pages | 2 | Draft content or hide from nav |
| **LOW** | Unused dep | 1 | Remove `tw-animate-css` |
