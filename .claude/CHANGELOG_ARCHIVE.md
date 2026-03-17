# Avail Docs — Work Log & Changelog

> Each version gets an entry when shipped (merged to main or deployed).
> Include what changed, why, and any notable decisions.
> The `/audit` command can suggest entries, but write the final version yourself.

---

## v1.6.0: Post-Refactor Audit & Agent-Friendly Fixes — 2026-02-22

Robin merged PR #17 (major content refactor: Nexus SDK restructured into get-started/reference/cookbook-recipes, DA pages moved, redirect system added). Audited all agent-friendly features for breakage.

**Audit findings:**
- Build: PASS (379 pages)
- Internal MDX links: PASS (Robin's validator: 0 broken)
- Content negotiation middleware: PASS
- Sitemap, reference.json: PASS
- Vitest suite: 1 failure (stale test), 42 passing
- "Ask AI" / markdown API: works correctly (user's issue was pre-v1.5.1 production deploy)

**Fixed:**
- Updated `src/lib/llms.ts` "If you want to..." section — replaced 4 broken Nexus paths (deleted `build-your-first-liquid-app`, `cheat-sheet`, old `bridge-methods`/`swap-methods`), added 6 new entries (SDK quickstart, installation, bridge tokens, deposit into Aave, contracts, supported chains & tokens), fixed DA `networks` path
- Deleted local-only stale test file (`build-your-first-liquid-app.test.ts`) — referenced deleted MDX, was never committed to git

**P1: Description frontmatter for all MDX pages:**
- Added `description` to all 92 pages missing it — 100% coverage (179/179)
- DA Build (15), DA API Reference (48), DA User Guides (16), DA Operate + bug-bounty (3), Nexus SDK Reference (11), Nexus misc (2)
- Patterns: action-oriented for guides, definition-style for concepts, endpoint-style for API refs, hub-style for index pages

**P2: X-Robots-Tag on agent API routes:**
- Added `X-Robots-Tag: noindex` to shared `AGENT_HEADERS` constant
- Consolidated `llms.txt`, `llms-full.txt`, and `reference.json` routes to use `AGENT_HEADERS` (previously only markdown API used it)
- Prevents search engines from indexing raw markdown/JSON endpoints

**Key discovery:** `getText("processed")` returns MDAST-serialized markdown including JSX component markup (`<Tabs>`, `<IconCard>`, etc.) as raw strings. This is functional for LLMs but not ideal. The v1.5.1 fix (raw → processed) works correctly on both dev and Vercel.

**Gotcha:** Robin added a Jest test suite (`__tests__/redirects-coverage.test.js`) alongside our Vitest suite. Two test runners now coexist — may want to consolidate.

---

## Nexus Content Polish + Source Code Tweaks — 2026-02-16

Committed and pushed to `v1.5.0` (16 files, +474 −85):

**Nexus content:**
- Added `PageFooter` navigation to all 7 Nexus concept pages (allowances, bridge-v-swap, chain-abstraction, intent-lifecycle, intent, solvers, xcs-swaps)
- Rewrote `build-your-first-liquid-app` tutorial with step-by-step structure (+316 lines)
- Improved Nexus landing page layout and copy
- Reordered Nexus sidebar (`cookbook-recipes` placement in meta.json)
- Updated Nexus SDK index page copy

**Source code:**
- Fixed `PageFooter` integration in docs page layout (`src/app/docs/[[...slug]]/page.tsx`)
- Minor CSS cleanup in `global.css`
- Feedback component UX tweaks (`feedback.tsx`)
- Fixed code-block command styling (`code-block-command.tsx`)
- Eliminated `noArrayIndexKey` Biome lint errors — rewrote `highlightCommand()` to use `.map()` with content-based keys instead of array index

---

## Codex Review Fixes (P1 + P2) — 2026-02-16

Three fixes from Codex PR review of v1.5.0:

1. **Markdown API case sensitivity** (`src/app/api/markdown/[...slug]/route.ts`): Normalized slug array to lowercase before `source.getPage()` — mixed-case URLs like `/docs/DA/build/networks` now resolve correctly instead of 404ing.

2. **Legacy Nexus redirects** (`next.config.mjs`): Added 7 permanent redirects for all deleted Nexus pages (`nexus-overview`, `nexus-examples`, `nexus-quickstart` and sub-paths). Preserves SEO and prevents 404s for anyone with old bookmarks.

3. **Dead link in llms.txt** (`src/lib/llms.ts`): Replaced broken `nexus-overview` link with `nexus/concepts` (better fit since line 130 already covers get-started).

Build verified: zero errors.

---

## Glossary Cleanup (H7) + Deprecated API Migration Guidance (H8) — 2026-02-16

Two content quality fixes from the content audit:

**H7 — Glossary cleanup** (`da/glossary/index.mdx`):
- **Removed** all 7 `[<ins>Text</ins>](url)` patterns — replaced with standard `[Text](url)` markdown links
- **Tightened** every entry to ≤3 sentences — cut filler phrases, redundant comparisons, and multi-paragraph definitions
- **Preserved** all technical accuracy, existing links, and glossary anchors
- Notable cuts: App-Chain (53→33 words), DAC (80→43 words), Execution (150→72 words), Settlement (130→43 words), Validium (130→48 words)
- 187→176 lines

**H8 — Deprecated API migration guidance:**
- **Gas Relay Deprecated** (`da/api-reference/gas-relay-deprecated/index.mdx`): expanded from 5-line callout stub to full migration page — what replaced it (Turbo DA), how to migrate (dashboard URLs, API key generation, integration update), links to Turbo DA guide and API reference
- **V1 Deprecated** (`da/api-reference/avail-lc-api/v1-deprecated/index.mdx`): expanded from 6-line callout stub to full migration page — what replaced it (V2 API), endpoint mapping table (6 routes), new V2 features (WebSocket, selective field queries), link to V2 reference

Build verified: zero errors.

---

## Hub Page Intros + IconCardGrid Upgrade (H3) — 2026-02-16

Upgraded 7 thin hub pages from bare `<Cards>`/`FileIcon` grids to full `<IconCardGrid>` with intros:

- **Added** `description` frontmatter to all 7 pages (SEO/meta)
- **Added** 1-2 sentence intros with wayfinding links (e.g. "Start with Node Types…", "Follow them in order from Basics through Monitoring")
- **Replaced** `<Cards>` + generic `<FileIcon />` with `<IconCardGrid>` + `<IconCard>` using meaningful icons and descriptions
- **Pages:** `da/build`, `da/operate`, `da/build/interact`, `da/operate/run-a-light-client`, `da/operate/run-a-full-node`, `da/operate/become-a-validator`, `da/user-guides/staking-governance`
- **Icons used:** CodeIcon, Cube, Gear, Bridge, Globe, Compass, ShieldCheck, Brain, Coins, IdentificationBadge, ArrowLeftRight, Key, UsersThree, RefreshCw
- Build verified: 371 pages, zero errors
- **Updated** `CONTENT_AUDIT.md` (H3 marked done, IA scores updated)
- **Updated** `plans/docs-redesign/README.md` (status, log, next section)

---

## DA Get-Started Code-First Rewrite (H1) — 2026-02-16

Full rewrite of the DA get-started page — the worst-scoring section in the content audit (1.7/5):

- **Replaced** theory dump (validity proofs, KZG, DAS bullets + blog card images + 14 flat link cards) with code-first layout
- **Added** "Quick Look — Submit & Read Data" section with TypeScript/Rust/Go SDK tabs — condensed from `read-write-on-avail`, ~14 lines per language showing submit + read-back loop
- **Added** prerequisites `<Callout>` after code (progressive disclosure) — links to faucet, App ID guide, install commands
- **Added** "Choose Your Path" `<IconCardGrid>` — 4 cards: Post Data, Deploy a Rollup, Run a Light Client, Run a Validator
- **Added** "Next Steps" `<IconCardGrid>` — 3 cards: Concepts, API Reference, Networks & Endpoints
- **Cut** cryptographic theory bullets, blog card images, "Some Quick Links" heading, Bug Bounty card, User Guides cards
- **Updated** frontmatter: title, description, sidebar_label
- 59 → 139 lines. Score improved from 1.7 → 3.7.
- **Updated** `CONTENT_AUDIT.md` (H1 marked done, DA get-started scores updated, 5 checklist items checked)
- **Updated** `plans/docs-redesign/README.md` (status, log, next section)

---

## Nexus Get-Started Code-First Reorder (H2) — 2026-02-16

Swapped two sections on the Nexus get-started page to match the code-first principle:

- **Moved** "Quick Look — How the SDK Works" (SDK pseudocode + scaffold tabs) above "What Changes for Your Users" (comparison table)
- Page now flows: intro → code → theory table → choose your path → ...
- No content changes — pure reorder
- **Updated** `CONTENT_AUDIT.md` (H2 marked done, progressive disclosure + time-to-HW checklist items checked)
- **Updated** `plans/docs-redesign/README.md` (status, log, next section)

---

## Content Quick Wins Q1-Q6, Q9 — 2026-02-16

Fixed 7 content issues across 6 files (all on v1.5.0 branch):

- **Fixed** "pice" → "piece" (3 occurrences in `read-write-on-avail`)
- **Fixed** "buiding" → "building" in FAQs
- **Fixed** broken bug-bounty link: `/docs/da/bug-bounty` → `/docs/da/build/bug-bounty`
- **Removed** stale "Clash of Nodes" callout from FAQs (ended campaign)
- **Removed** "under development" callout from Glossary (erodes trust)
- **Removed** hedging language from DA get-started ("While the Avail docs in their current state...")
- **Fixed** "ALl" → "All" in nexus-ops, "sourced form" → "sourced from" in source-chain-selection
- **Skipped** Q10 (won't-fix — TODO comments are valid user-facing config instructions)
- **Updated** `CONTENT_AUDIT.md` and `plans/docs-redesign/README.md`

---

## Unhide Nexus Content + Audit Corrections — 2026-02-16

Surfaced 3 hidden Nexus content folders into the sidebar and fixed all broken links:

- **Moved** `nexus-quickstart/nexus-core/` → `nexus-sdk/quickstart/` (5,978-line tutorial)
- **Moved** `nexus-examples/` → `nexus-sdk/examples/` (4 progressive tutorials: init basic, init rainbowkit, bridge, bridge-execute)
- **Deleted** `nexus-overview/` (content overlapped with get-started + nexus-sdk index)
- **Deleted** empty `bridge-and-transfer/` (4 lines, no content) and removed non-existent `nexus-porto-extension` from meta.json
- **Fixed** 15+ broken link references across get-started, cheat-sheet, cookbook, and all SDK bridge/swap method pages
- **Updated** `CONTENT_AUDIT.md`: corrected Nexus get-started score (2→3, already code-first), marked H4 + Q7 + Q8 as resolved, downgraded H2 (minor tweak vs full rewrite)
- **Updated** `plans/docs-redesign/README.md`: status → in-progress, added decision log entry, corrected next steps

Build verified: 371 static pages, zero old path references remaining.

---

## Content Audit Against Docs-Redesign Principles — 2026-02-16

Audited all 184 pages (134 DA, 50 Nexus) against the 7 principles from `plans/docs-redesign/README.md`. Overall score: **2.7/5**. Biggest gap: Time-to-Hello-World (1.5/5) — neither product has a sub-5-minute quickstart. Best pages: `read-write-on-avail` (DA), `build-your-first-liquid-app` (Nexus), `cookbook-recipes` (Nexus). Identified 10 quick wins (~30 min), 8 high-impact rewrites, 5 broken links. Rewrote `memory/CONTENT_AUDIT.md` as a principle-based audit (replaced the previous issue-tracker format). Nexus deep audit findings incorporated into the new structure.

---

## Nexus Content Audit — 2026-02-15

Completed deep audit of all ~50 Nexus MDX files. Found 17 issues across 4 severity tiers (1 Critical, 4 High, 7 Medium, 5 Low). Key findings: wrong API in get-started pseudocode, method naming confusion (`getUnifiedBalances` vs `getBalancesForBridge`), thin UI Elements docs, missing error recovery patterns. Saved to `memory/CONTENT_AUDIT.md` under "Nexus Deep Audit" section. No code changes — audit only.

---

## Nexus SDK Tutorial — 2026-02-15 (on v1.5.0)

### What shipped

**Nexus SDK — "Build Your First Liquid App" tutorial**

Rewrote the placeholder (8-line "coming soon" callout) into a complete 320-line narrative tutorial covering the full SDK flow:

- **7-step `<Steps>` walkthrough**: install → create instance → connect wallet → unified balances → simulate bridge → execute with events → error handling
- **Testnet/mainnet `<Tabs>`** for SDK instance creation (Arbitrum Sepolia 421614 as primary)
- **`simulateBridge()` coverage** — first tutorial to include fee simulation before execution (not in any existing example)
- **`onEvent` progress tracking** — `NEXUS_EVENTS.STEPS_LIST` + `STEP_COMPLETE` pattern for rendering step checklists
- **`NexusError` + `ERROR_CODES`** — structured error handling with `switch` on `INSUFFICIENT_BALANCE`, `USER_DENIED_INTENT`, `SDK_NOT_INITIALIZED`
- **Complete working example** in collapsed `CodeCollapsibleWrapper` — framework-agnostic TypeScript module with `initNexus()`, `getBalances()`, `bridgeUSDC()`, `safeBridge()`
- **Hooks epilogue** — `setOnIntentHook` and `setOnAllowanceHook` patterns (brief, links to reference)
- **What's Next** — `IconCardGrid` → Swap Methods, Bridge & Execute, UI Components
- **`PageFooter`** → Bridge Methods
- **11 cross-links** to concept pages (chain-abstraction, intent, solvers, allowances) and SDK reference pages (bridge-events, hooks-and-errors, api-reference, bridge-and-execute)
- **SDK index page** (`nexus-sdk/index.mdx`) — replaced generic description with narrative intro

### Decisions & context
- Framework-agnostic TypeScript for all code blocks (not 4 separate React button components like the orphaned `nexus-examples/`)
- `simulateBridge` is the key differentiator vs existing tutorials — shows fees before committing
- Hooks are an epilogue, not a main step — keeps the tutorial focused on the happy path
- All amounts use `bigint` with underscore separators (`1_000_000n`) and inline comments for clarity
- No `deinit()` in main flow, no swap (mentioned in What's Next), no duplicate type definitions

### Who benefits
- **New Nexus developers**: complete install-to-bridge tutorial instead of a "coming soon" placeholder
- **Existing dApp devs**: framework-agnostic patterns they can adapt to React, Vue, or vanilla JS
- **SDK landing page**: first card now leads to real content instead of an empty page

---

## Nexus Narrative Redesign — 2026-02-15 (on v1.5.0)

### What shipped

**Nexus docs narrative redesign — Get Started + Concepts**

Concepts section:
- Reorganized 9 concept pages into 3-tier progressive narrative: Foundation (chain-abstraction, intent, solvers) → Core Mechanics (intent-lifecycle, allowances) → Operations (nexus-ops, xcs-swaps, source-chain-selection, bridge-v-swap)
- Stripped SDK method references (`BridgeParams`, `ExactInSwapInput`, `setOnAllowanceHook`, etc.) from all concept pages — replaced with "See SDK reference" links
- Expanded `solvers` from ~15 lines to ~70: added how solvers work, what makes a good solver, fee breakdown, settlement mechanics, decentralization roadmap
- Expanded `source-chain-selection` from ~35 lines (half SDK code) to ~55: added auto vs manual routing, real-world scenarios table, conceptual descriptions
- Expanded `bridge-v-swap` from ~50 lines to ~70: added decision flowchart, when-to-use-which table, clearer bridge vs swap balance explanation
- Added concrete Alice NFT example to `chain-abstraction`
- Moved `ReadableIntent` type to collapsible in `intent` page
- Added `PageFooter` navigation to all 9 concept pages (previous/next links)
- Rewrote concepts index with narrative intro + 3 tiered card groups (Foundation, Core Mechanics, Operations)
- Updated `concepts/meta.json` to new order (moved allowances before nexus-ops)

Get Started page:
- Added before/after comparison table ("Without Nexus" vs "With Nexus")
- Added SDK pseudocode snippet in tabbed view (pseudocode + scaffold tabs)
- Restructured integration cards: 4 persona-driven paths (existing dApp devs, UI component users, greenfield projects, cookbook/agents)
- Added prerequisites Callout (Node.js 18+, package manager, EVM wallet, client-side only)
- Expanded "How Nexus Works" into 4-step `Steps` component with concept page links
- Added "Supported Chains & Tokens" section
- Added "Next Steps" card grid (Concepts, SDK Reference, Cookbook)

Cleanup:
- Renamed `nexus-quickstart/index.mdx` from "Get Started" to "Quickstart" to avoid duplication
- All links verified — no broken paths
- Build passes (377 pages, 0 errors)

### Decisions & context
- Kept all 9 concept pages (no merges) — expanded thin ones instead of absorbing them
- Key principle: concept pages explain "what" and "why", SDK pages explain "how" — all TypeScript interfaces and method signatures moved to SDK reference
- Page order follows progressive disclosure: what is this → how does it work → what can I do
- `PageFooter` provides explicit "Next" links creating a guided reading path through all 9 concepts

### Who benefits
- **Developers new to Nexus**: clear 5-minute path from "what is this?" to understanding the full system
- **Existing dApp devs**: persona-based cards on Get Started help them find the right integration path fast
- **AI agents**: structured content with clear relationships between concept pages, no leaked implementation details
- **All readers**: progressive narrative instead of flat encyclopedia entries

---

## Nexus IA Restructure — 2026-02-14 (on v1.5.0)

### What shipped

**Nexus docs IA restructure + get-started narrative rewrite**
- Rewrote `nexus/get-started/index.mdx`: developer-first narrative with concrete use cases, three integration paths (CLI scaffold, UI components, headless SDK), and a brief "how it works" teaser
- Reordered `nexus/meta.json`: SDK before UI Elements (core before shortcuts)
- Reordered `nexus/concepts/meta.json`: progressive learning flow — chain-abstraction → intent → solvers → lifecycle → ops → swaps → advanced topics (allowances, bridge-v-swap moved to end)
- Fixed `nexus/cookbook-recipes/meta.json`: removed empty `"pages": []` that was hiding the cookbook from sidebar navigation
- Updated `nexus/index.mdx`: cards reordered to match new sidebar, added descriptions to each card

### Why
Developers landing on Nexus docs couldn't find a clear path from understanding → building → reference. The get-started page was a flat feature list, concepts started with a technical detail (allowances) before explaining core primitives (intents), and the cookbook was invisible.

---

## [v1.5.0] - 2026-02-14 (PR #14, branch `v1.5.0`)

### What shipped

**Agent-friendly docs infrastructure**
- Content negotiation middleware (`src/middleware.ts`): rewrites `Accept: text/markdown` requests to `/api/markdown/` endpoint, sets `Vary: accept` for CDN caching
- Intent-based `llms.txt`: categorized "If you want to..." section with quick-reference links, structured for AI agent navigation
- Section-filtered `llms-full.txt`: `?section=da/build` returns only matching pages — reduces token cost for focused queries
- `/api/reference.json` endpoint: networks (RPC, WS, explorer), contract addresses, SDK versions, API URLs as structured JSON
- Sitemap generation (`src/app/sitemap.ts`): dynamic sitemap from source pages
- Agent headers on markdown API: `Content-Signal`, `x-markdown-tokens` (token estimate), `Vary: accept`
- Updated `robots.txt` with agent hints for `llms.txt`, `reference.json`, `text/markdown`
- Fixed stale `/docs` redirect → `/docs/da/get-started`

**DA content restructure (cont'd from unversioned commits)**
- Moved networks page under `build/`
- Added concept pages: What is Avail DA, How Avail DA works
- Created user guides explorer page
- Streamlined concepts (app-ids, explorer, tx-pricing)
- Updated rollups index with framework overview

**Nexus cleanup**
- Removed duplicate nexus-elements content (7 files)
- Replaced plain Cards with IconCards on Nexus get-started page

**Test suite**
- Set up vitest from scratch (first testing infrastructure in the project)
- 41 tests across 5 files: middleware, llms.txt generation, reference.json structure, markdown API headers, sitemap
- Added `pnpm test` and `pnpm test:watch` scripts

**Housekeeping**
- Fixed 4 spelling errors
- Updated code health audit

### Decisions & context
- Vitest chosen over Jest — standard for modern Next.js, zero-config with Vite, fast
- Tests mock `source` and `products` imports to avoid loading the full Fumadocs content pipeline
- Content negotiation uses `text/markdown` in Accept header (not `*/*`) to avoid intercepting normal browser requests
- `x-markdown-tokens` uses `ceil(content.length / 4)` as a rough token estimate

### Who benefits
- **AI agents/LLMs**: can fetch structured docs via content negotiation, llms.txt, or reference.json
- **Developers**: can point AI tools at the docs with predictable, token-efficient responses
- **Contributors**: first test suite — `pnpm test` catches regressions before deploy
- **SEO**: dynamic sitemap, corrected redirect

---

## [v1.4.0] - 2026-02-14

### What shipped

**Halftone animation performance** (`halftone-background.tsx`, `pixel-transition.ts`)
- Switched from assumed 60fps to real RAF delta time for frame-rate-independent animation
- Added MutationObserver guard against redundant palette updates on theme change
- Skip resize recalculation when canvas dimensions haven't actually changed
- Animation loop now pauses during pixel-transition theme changes to avoid visual conflict

**IconCard hover fix** (`icon-card.tsx`)
- `can-hover:` alone is a media query that matches all hover-capable devices — it doesn't mean the user is actually hovering
- Changed to `can-hover:hover:` so `bg-secondary` only applies on actual hover
- Switched default background from `bg-card` to `bg-background`

### Decisions & context
- This is a patch-level fix (should arguably be v1.3.1) but was versioned as v1.4.0 per convention
- The `can-hover:hover:` pattern composes the media query variant with the actual `:hover` pseudo-class — correct Tailwind v4 approach

### Who benefits
- **All users**: smoother halftone animation, no wasted frames
- **Touch device users**: IconCards no longer show stuck hover backgrounds
- **Theme switchers**: no animation glitch during pixel transition

---

## [v1.3.0] - 2026-02-13

### What shipped

**DA content restructure (150 files changed)**
- Flattened `build-with-avail/` → `build/`, `operate-a-node/` → `operate/`, `learn-about-avail/` → `concepts/`
- Flattened rollup guides from `deploy-rollup-on-avail/Optimium|Validium/...` → `build/rollups/{op-stack,arbitrum-nitro,cdk,madara,zkevm,zksync}/`
- Flattened `interact-with-avail-da/` → `build/interact/`
- Moved `bug-bounty` under `build/`
- New `concepts/` section with networks, app-ids, explorer, tx-pricing
- Updated all internal cross-references across the entire content tree
- DA sidebar now has 8 clean top-level items: get-started, concepts, build, operate, user-guides, api-reference, glossary, faqs

**Homepage redesign**
- Halftone dot animation background with simplex noise (`halftone-background.tsx`, `halftone-animations.ts`, `simplex-noise.ts`)
- New category cards with custom SVG icons (`card-icons.tsx`)
- Offset shadow card component (`offset-shadow.tsx`)
- Redesigned site footer
- Pixel transition effect for theme changes (`pixel-transition.ts`)
- Animation pauses during theme transitions to avoid visual glitches

**Theme & UI polish**
- Redesigned theme toggle component
- New slider component (`src/components/ui/slider.tsx`)
- Improved on-this-page sidebar
- Updated search bar and sidebar navigation styling

**Merge history**
- First landed as PR #11, reverted (PR #12), then re-landed cleanly as PR #10

### Decisions & context
- Flat URL structure chosen over nested — shorter paths, easier to remember, no more `Optimium/` vs `Validium/` split
- Product sections prefixed with "DA" (DA Build, DA Operate) while generic sections stay plain (Get Started, Concepts)
- Halftone animation uses simplex noise for organic patterns, pauses on theme change to prevent flash
- Old paths still need Next.js redirects (TODO for SEO preservation)

### Who benefits
- **Users**: cleaner URLs, consistent sidebar, faster navigation
- **SEO**: shorter, descriptive paths (redirects still TODO)
- **New visitors**: redesigned homepage with visual personality
- **Mobile users**: better hover/touch behavior on IconCards

---

## [v1.2.0] - 2026-02-11 (continued)

### What shipped

**llms.txt spec compliance**
- `/llms.txt` is now a lightweight ~220-line hierarchical navigation guide — product sections (`## Avail DA`, `## Avail Nexus`), folder headers (`###`), and bullet links with descriptions
- `/llms-full.txt` serves the full organized content (~25K lines) grouped by product and section with `####` page headers
- New shared module `src/lib/llms.ts` with `generateLlmsTxt()` (sync, tree-only) and `generateLlmsFullTxt()` (async, resolves page content)
- Removed unused `getLLMText` helper from `source.ts`

### Decisions & context
- Followed the [llms.txt spec](https://llmstxt.org/) — lightweight index + full-content companion file
- `generateLlmsTxt()` is synchronous since it only reads the page tree (no content resolution needed)
- Descriptions come from page-tree nodes (frontmatter), not from loading full pages — keeps the nav guide fast
- Both routes generate as static content at build time

### Who benefits
- **LLMs / AI tools**: structured, token-efficient navigation guide instead of a 27K-line flat dump
- **Developers**: can point AI assistants at `/llms.txt` for a quick overview or `/llms-full.txt` for deep context

---

## [v1.2.0] - 2026-02-11

### What shipped

**Design quality & interaction polish**
- Hover states no longer "stick" on touch devices — cards use a `can-hover:` guard so tapping a card on mobile doesn't leave it highlighted
- Tap feedback changed from an opacity flash to a subtle brightness dim — feels more intentional, less jarring
- Headings now wrap gracefully at narrow widths (`text-wrap: balance`)
- 300ms tap delay eliminated on all links and buttons (`touch-action: manipulation`)
- Sidebar chevrons and copy buttons have larger invisible touch targets (44px) on mobile — easier to tap without precision

**Accessibility**
- Skip-to-content link for keyboard and screen reader users — hidden by default, appears on Tab, jumps past navigation to the article
- Reduced-motion mode — users who prefer less animation get instant transitions (uses `0.01ms` so Radix UI events still fire correctly)
- Font preloading for Delight Regular + Medium — reduces layout shift on first load

**Design tokens**
- Shadow scale (`--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`) with dark mode variants — replaces 7 hardcoded `shadow-[...]` values across button, feedback, and popover components
- Shadows are now consistent site-wide and adjustable from one place

**SEO**
- Canonical URLs on every doc page — prevents duplicate content issues from trailing slashes or query params
- JSON-LD structured data (BreadcrumbList + TechArticle) — helps search engines understand page hierarchy and content type

**Tooling (from earlier in the session)**
- Product improvements tracker (IMPROVEMENTS.md) — personal file outside git
- `/audit` slash command for code health audits
- AUDIT_DETAILS.md — detailed audit breakdown
- This changelog

### Decisions & context
- `can-hover:` custom variant chosen over JS-based hover detection — zero runtime cost, works with Tailwind's variant system
- `0.01ms` for reduced-motion (not `0s`) because Radix UI relies on `onAnimationEnd` events that never fire at `0s`
- Shadow tokens defined as CSS custom properties in `:root` and `.dark`, mapped via `@theme inline` — same pattern as our color tokens
- Canonical URL reuses the existing `url` variable already computed in `generateMetadata`
- Kept `group-hover:` on link-card arrow (minor visual, no sticky issue) since `group-can-hover:` may not compose correctly in Tailwind v4

### Who benefits
- **Mobile users**: no more stuck hover states, better tap targets, faster taps
- **Keyboard users**: skip-to-content jumps past 30+ nav links
- **Screen reader users**: skip-to-content, semantic structured data
- **Users with motion sensitivity**: instant transitions, no distracting animations
- **Search engines**: canonical URLs, rich snippets from JSON-LD
- **Us (maintainers)**: shadow tokens mean one place to adjust, not 7 scattered values

---

## [v1.1.0] - 2026-02-09

### What shipped
- Phosphor icons integration
- Product switcher in topbar (DA / Nexus)
- Sidebar filtering by active product
- Code health audit system (CODE_HEALTH_AUDIT.md)
- Fixed broken links across content (5 patterns)

### Decisions & context
- Two-product architecture: DA and Nexus as separate doc trees
- Product config centralized in `src/lib/products.ts`
- Design tokens: two-layer system (primitives → semantic)
- Prev/next navigation scoped to active product

### Impact
- Users can switch between DA and Nexus docs cleanly
- Sidebar only shows relevant pages per product
- Established code health tracking as ongoing practice

---

## [v1.0.0] - Baseline (pre-PR #8)

### Starting point
- Fumadocs + Next.js site migrated from previous docs system
- All content in `content/docs/` with `da/` and `nexus/` sections
- Basic search, navigation, and PostHog analytics
- 387 static pages generated
