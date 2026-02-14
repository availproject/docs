# Code Health Audit

> Last reviewed: 2026-02-14
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
| `src/components/layout/sidebar-nav.tsx:279-338` | `renderTopLevel()` is a near-copy of `renderNode()` — same page/folder/separator handling | Eliminate `renderTopLevel()`, call `displayTree.children.map(renderNode)` directly |
| `src/components/layout/mobile-nav.tsx:136-141` | Product links ("Avail DA", "Avail Nexus") hardcoded instead of reading from `products.ts` | Import and map over `products` array |

## 3. File Size Violations (> 400 lines)

| File | Lines | Recommended Split |
|------|-------|-------------------|
| `src/components/helpers/on-this-page.tsx` | 460 | Extract `AI_SERVICES` config + AI menu into `ai-service-menu.tsx`; keep TOC rendering in main file |
| `src/components/mdx/mdx-components.tsx` | 415 | Extract heading components into `mdx-headings.tsx` with shared ID generation utility |

## 4. Broken Links in Content

| File | Broken Link | Suggested Fix |
|------|-------------|---------------|
| ~~All previously tracked broken internal links~~ | ~~7 links across 4 files~~ | ~~All resolved in v1.3.0 restructure~~ |
| ~~External `docs.availproject.org` links~~ | ~~11 links across 4 files~~ | ~~All resolved — converted to internal paths~~ |

No broken internal links or stale external-to-internal links remain.

## 5. Spelling Errors in Content

| File | Error | Fix |
|------|-------|-----|
| ~~`content/docs/da/build-with-avail/.../op-stack/index.mdx`~~ | ~~"permisionless"~~ | ~~Resolved — file restructured~~ |
| ~~`content/docs/da/build-with-avail/.../cosmos-avail-module/index.mdx`~~ | ~~"permisionless"~~ | ~~Resolved — file restructured~~ |
| ~~`content/docs/da/faqs/index.mdx`~~ | ~~"buiding"~~ | ~~Resolved~~ |
| ~~`content/docs/da/user-guides/avail-multisig/index.mdx:110`~~ | ~~"seperate"~~ | ~~Resolved~~ |
| ~~`content/docs/da/operate-a-node/.../0020-simple-deployment/index.mdx:132`~~ | ~~"seperate"~~ | ~~Resolved~~ |
| ~~`content/docs/da/api-reference/.../da-app-keys/index.mdx:212`~~ | ~~"seperated"~~ | ~~Resolved~~ |
| `content/docs/da/build/interact/faucet/index.mdx:15` | "forseeable" | "foreseeable" |
| `content/docs/da/user-guides/accounts/index.mdx:60` | "tour Avail account" | "your Avail account" |
| `content/docs/da/user-guides/accounts/index.mdx:79` | "nnote" | "note" |
| `content/docs/da/user-guides/accounts/index.mdx:247` | "metedata" | "metadata" |

## 6. Stale Hardcoded Values

| File | Issue |
|------|-------|
| `src/components/layout/sidebar-nav.tsx:367` | Sidebar footer has hardcoded link to `/docs/components` — route doesn't exist in the product-based structure |
| `src/components/mdx/feedback.tsx:35` | `await new Promise(resolve => setTimeout(resolve, 500))` — simulated API call, no real feedback endpoint |
| `src/components/helpers/on-this-page.tsx:46,58,70` | Magic number `4000` for content truncation in AI service URLs — should be a named constant |

## 7. Minor Quality Notes

| File | Issue |
|------|-------|
| `src/components/mdx/mdx-components.tsx:4-5` | `eslint-disable @typescript-eslint/no-explicit-any` — type the MDX components map properly |
| `src/components/layout/mobile-nav.tsx:95,102` | Logo alt text says "Nexus Elements" but this is the main Avail logo — should be "Avail" |
