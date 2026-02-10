# Code Health Audit

> Last reviewed: 2026-02-11
>
> This file tracks verified code quality issues. Work through items during cleanup sessions — not every PR.
> Mark items with ~~strikethrough~~ or delete rows as they get resolved.
> Run `/review` to refresh findings and update this file.
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
| `content/docs/da/faqs/index.mdx` | `/docs/clash-of-nodes/faqs.mdx` | Remove or update — "clash-of-nodes" section doesn't exist, `.mdx` extension shouldn't be in links |
| `content/docs/da/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/index.mdx` | `/docs/introduction-to-avail/avail-da` | `/docs/da/learn-about-avail` |
| `content/docs/da/build-with-avail/deploy-rollup-on-avail/sovereign-rollups/cosmos-avail-module/index.mdx` | `/docs/introduction-to-avail/...` (2 occurrences) | `/docs/da/learn-about-avail/...` |

## 5. Spelling Errors in Content

| File | Error | Fix |
|------|-------|-----|
| `content/docs/da/build-with-avail/deploy-rollup-on-avail/Optimium/op-stack/index.mdx` | "permisionless" | "permissionless" |
| `content/docs/da/build-with-avail/deploy-rollup-on-avail/sovereign-rollups/cosmos-avail-module/index.mdx` | "permisionless" | "permissionless" |
| `content/docs/da/faqs/index.mdx` | "buiding" | "building" |
| `content/docs/da/user-guides/accounts/index.mdx` | "nnote" | "note" |

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
