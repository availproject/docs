# Audit Details

> Generated: 2026-02-11
>
> Detailed breakdowns from the code health audit. Referenced by [CODE_HEALTH_AUDIT.md](./CODE_HEALTH_AUDIT.md).
> Run `/review` to regenerate.

---

## Build & Type Safety

| Check | Status |
|-------|--------|
| `next build` | **Passes** — 387 static pages generated (Next.js 16.0.10, Turbopack) |
| `tsc --noEmit` | **Clean** — no TypeScript errors |
| Build warnings | `Failed to fetch registry item: 404` (4 occurrences — shadcn registry fetch) |
| Build warnings | `baseline-browser-mapping` data stale — run `npm i baseline-browser-mapping@latest -D` |

---

## Biome Lint Breakdown

**Total: 438 errors, 179 warnings** (238 files checked)

| Rule | Count | Severity | Auto-fixable |
|------|-------|----------|-------------|
| Format/parse (CSS + JSON) | ~187 | Error | Yes (`biome format --write`) |
| `lint/style/useImportType` | 77 | Warning | Yes |
| `lint/correctness/useExhaustiveDependencies` | 56 | Error | Needs review |
| `lint/performance/noImgElement` | 34 | Warning | Use `next/image` |
| `lint/correctness/noUnusedImports` | 20 | Error | Yes |
| `lint/complexity/useLiteralKeys` | 11 | Warning | Yes |
| `lint/correctness/noUnusedVariables` | 10 | Error | Yes |
| `lint/complexity/noImportantStyles` | 10 | Warning | Refactor CSS |
| `lint/suspicious/noExplicitAny` | 9 | Warning | Type properly |
| `lint/suspicious/noArrayIndexKey` | 8 | Warning | Use stable keys |
| `lint/correctness/noUnusedFunctionParameters` | 8 | Error | Yes |
| `lint/style/noNonNullAssertion` | 7 | Warning | Add null checks |
| `lint/suspicious/useIterableCallbackReturn` | 6 | Warning | Add return |
| `lint/style/useTemplate` | 5 | Warning | Yes |
| `lint/style/useNodejsImportProtocol` | 4 | Warning | Yes |
| `lint/suspicious/noGlobalIsNan` | 3 | Warning | Use `Number.isNaN` |
| `lint/security/noDangerouslySetInnerHtml` | 3 | Error | Needs review |
| `lint/correctness/useHookAtTopLevel` | 3 | Error | Needs review |
| `lint/correctness/useParseIntRadix` | 3 | Error | Yes |
| `lint/suspicious/noDocumentCookie` | 1 | Warning | Mixed |
| `lint/style/useExponentiationOperator` | 1 | Warning | Yes |

**Quick win:** `npx biome check --write` auto-fixes ~290 issues (formatting, unused imports, import types, literal keys, template strings, parseInt radix, Node.js protocol).

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

| File | Broken Link | Fix |
|------|-------------|-----|
| `content/docs/da/faqs/index.mdx` | `/docs/clash-of-nodes/faqs.mdx` | Remove — "clash-of-nodes" doesn't exist, `.mdx` extension shouldn't be in links |
| `content/docs/da/build-with-avail/.../Optimium/op-stack/index.mdx` | `/docs/introduction-to-avail/avail-da` | `/docs/da/learn-about-avail` |
| `content/docs/da/build-with-avail/.../cosmos-avail-module/index.mdx` | `/docs/introduction-to-avail/...` (×2) | `/docs/da/learn-about-avail/...` |
| `content/docs/da/user-guides/.../stake-on-avail/overview/index.mdx:60` | `/docs/glossary#era` | `/docs/da/glossary#era` — missing `/da/` segment |
| `content/docs/da/user-guides/.../staking-governance/overview/index.mdx:26` | `/docs/da/build-with-avail/vectorx#using-the-bridge` | Remove anchor — `#using-the-bridge` heading no longer exists |
| `content/docs/nexus/concepts/bridge-v-swap/index.mdx:21` | `/docs/nexus/concepts/bridge-v-swap` (self-referential) | `/docs/nexus/nexus-sdk/swap-methods` |

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

Files with quadruple backticks (`````````) instead of triple, causing rendering issues:

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

**123 out of 190 files (65%)** lack a `description` field.

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

---

## Placeholder / Coming Soon Pages

| File | Content |
|------|---------|
| `content/docs/nexus/nexus-ui-elements/mcp-documentation/index.mdx` | "This page is coming soon." |
| `content/docs/nexus/cookbook-recipes/index.mdx` | "Recipes are coming soon." |
| `content/docs/nexus/nexus-sdk/build-your-first-liquid-app/index.mdx` | "This guide is coming soon." |

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
| **HIGH** | Biome quick-fix | ~290 | Run `npx biome check --write` |
| **MEDIUM** | Broken links | 6 total | Fix link paths |
| **MEDIUM** | Stray code fences | 9 files | Fix quadruple → triple backticks |
| **MEDIUM** | Exhaustive deps | 56 | Review hook dependencies |
| **MEDIUM** | `next/image` | 34 | Replace `<img>` with `<Image>` |
| **LOW** | Missing descriptions | 123 files | Add frontmatter `description` |
| **LOW** | Dead code | 4 files | Remove unused code |
| **LOW** | Spelling errors | 4 | Fix typos |
| **LOW** | Coming soon pages | 3 | Draft content or hide from nav |
| **LOW** | Unused dep | 1 | Remove `tw-animate-css` |
