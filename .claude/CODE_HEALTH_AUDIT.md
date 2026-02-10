# Code Health Audit

> Last reviewed: 2026-02-11
>
> This file tracks verified code quality issues. Work through items during cleanup sessions — not every PR.
> Mark items with ~~strikethrough~~ or delete rows as they get resolved.
> Run `/audit` to refresh findings and update this file.
>
> For detailed breakdowns (biome lint rules, broken links, duplicates, missing descriptions, build status, priorities), see [AUDIT_DETAILS.md](./AUDIT_DETAILS.md).

---

## 1. Dead Code

| File | Issue | Priority |
|------|-------|----------|
| `src/lib/utils.ts:16-46` | `TOC_BY_PATH` — hardcoded TOC referencing old routes (`/docs/get-started`, `/docs/components/...`) that no longer exist. Only consumer is `on-this-page.tsx`'s `useRouteToc()` which never matches current product-prefixed paths. | Low |
| `src/lib/layout.shared.tsx` | Entire file — exports `baseOptions()` returning `{ nav: { title: 'My App' } }`. Not imported anywhere. | Low |
| `src/components/layout/mobile-nav.tsx:8` | Commented import `// import ConnectWalletButton` and commented usage on line 108. | Low |
| `src/components/mdx/feedback.tsx:34` | Commented API endpoint. Either implement or remove. | Low |

## 2. DRY Violations

| File | Issue | Suggested Fix |
|------|-------|---------------|
| `src/components/mdx/mdx-components.tsx:67-118` | Heading ID generation duplicated identically in h2, h3, h4 (`.replace(/ /g, "-").replace(/'/g, "").replace(/\?/g, "").toLowerCase()`) | Extract `generateHeadingId(children)` utility |
| `src/components/layout/sidebar-nav.tsx:262-321` | `renderTopLevel()` is a near-copy of `renderNode()` — same page/folder/separator handling | Eliminate `renderTopLevel()`, call `displayTree.children.map(renderNode)` directly |
| `src/components/layout/mobile-nav.tsx:136-141` | Product links ("Avail DA", "Avail Nexus") hardcoded instead of reading from `products.ts` | Import and map over `products` array |

## 3. File Size Violations (< 400 lines)

| File | Lines | Recommended Split |
|------|-------|-------------------|
| `src/components/helpers/on-this-page.tsx` | 451 | Extract `AI_SERVICES` config + AI menu into `ai-service-menu.tsx`; keep TOC rendering in main file |
| `src/components/mdx/mdx-components.tsx` | 415 | Extract heading components into `mdx-headings.tsx` with shared ID generation utility |

## 4. Broken Links in Content

| File | Broken Link | Suggested Fix |
|------|-------------|---------------|
| ~~`content/docs/da/faqs/index.mdx`~~ | ~~`/docs/clash-of-nodes/faqs.mdx`~~ | ~~Resolved — now links to external blog~~ |
| ~~`content/docs/da/build-with-avail/.../Optimium/op-stack/index.mdx`~~ | ~~`/docs/introduction-to-avail/avail-da`~~ | ~~Resolved — now uses `/docs/da/welcome-to-avail-docs`~~ |
| ~~`content/docs/da/build-with-avail/.../cosmos-avail-module/index.mdx`~~ | ~~`/docs/introduction-to-avail/...`~~ | ~~Resolved — now uses `/docs/da/welcome-to-avail-docs`~~ |
| `content/docs/da/user-guides/.../stake-on-avail/overview/index.mdx:60` | `/docs/glossary#era` | `/docs/da/glossary#era` — missing `/da/` segment |
| `content/docs/da/user-guides/.../staking-governance/overview/index.mdx:26` | `/docs/da/build-with-avail/vectorx#using-the-bridge` | Remove anchor — `#using-the-bridge` heading no longer exists |
| `content/docs/nexus/concepts/bridge-v-swap/index.mdx:21,47` | Self-referential links to `/docs/nexus/concepts/bridge-v-swap` | Line 21: `/docs/nexus/nexus-sdk/swap-methods`; Line 47: remove or change target |
| `content/docs/da/glossary/index.mdx:27` | Relative link `(../user-guides/staking-governance/overview)` | Use absolute `/docs/da/user-guides/staking-governance/overview` |

### External links that should be internal (NEW)

| File | External Link | Internal Equivalent |
|------|---------------|---------------------|
| `da/faqs/index.mdx:60-62` | `https://docs.availproject.org/` (×3 links) | `/docs/da`, `/docs/da/operate-a-node/become-a-validator`, `/docs/da/operate-a-node/run-a-light-client` |
| `da/.../cosmos-avail-module/index.mdx:104` | `https://docs.availproject.org/docs/operate-a-node/run-a-light-client/Overview` | `/docs/da/operate-a-node/run-a-light-client/Overview` |
| `da/.../Validium/cdk/cdk/index.mdx:226` | `https://docs.availproject.org/docs/build-with-avail/vectorx` | `/docs/da/build-with-avail/vectorx` |
| `da/.../Validium/zksync/zksync/index.mdx` | 6 links to `docs.availproject.org` (lines 169-223) | Corresponding `/docs/da/...` internal paths |

## 5. Spelling Errors in Content

| File | Error | Fix |
|------|-------|-----|
| `content/docs/da/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/index.mdx` | "permisionless" | "permissionless" |
| `content/docs/da/build-with-avail/deploy-rollup-on-avail/sovereign-rollups/cosmos-avail-module/index.mdx` | "permisionless" | "permissionless" |
| `content/docs/da/faqs/index.mdx` | "buiding" | "building" |
| `content/docs/da/user-guides/accounts/index.mdx` | "nnote" | "note" |
| `content/docs/da/user-guides/avail-multisig/index.mdx:110` | "seperate" | "separate" |
| `content/docs/da/operate-a-node/become-a-validator/0020-simple-deployment/index.mdx:132` | "seperate" | "separate" |
| `content/docs/da/api-reference/avail-node-api/da-app-keys/index.mdx:212` | "seperated" | "separated" |

## 6. Stale Hardcoded Values

| File | Issue |
|------|-------|
| `src/components/layout/sidebar-nav.tsx:349-359` | Sidebar footer has hardcoded link to `/docs/components` — route doesn't exist in the product-based structure |
| `src/components/mdx/feedback.tsx:35` | `await new Promise(resolve => setTimeout(resolve, 500))` — simulated API call, no real feedback endpoint |
| `src/components/helpers/on-this-page.tsx:45,57,69` | Magic number `4000` for content truncation in AI service URLs — should be a named constant |

## 7. Minor Quality Notes

| File | Issue |
|------|-------|
| `src/components/mdx/mdx-components.tsx:4-5` | `eslint-disable @typescript-eslint/no-explicit-any` — type the MDX components map properly |
| `src/components/layout/mobile-nav.tsx:94-106` | Logo alt text says "Nexus Elements" but this is the main Avail logo — should be "Avail" |
