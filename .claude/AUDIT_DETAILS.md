# Audit Details

> Generated: 2026-02-14
>
> Detailed breakdowns from the code health audit. Referenced by [CODE_HEALTH_AUDIT.md](./CODE_HEALTH_AUDIT.md).
> Run `/audit` to regenerate.

---

## Build & Type Safety

| Check | Status |
|-------|--------|
| `next build` | **Passes** — 384 static pages generated (Next.js 16, Turbopack) |
| `tsc --noEmit` | **Clean** — no TypeScript errors |
| Build warnings | `Failed to fetch registry item: 404` (2 occurrences — shadcn registry fetch) |

---

## Biome Lint Breakdown

**Total: 383 errors, 166 warnings, 23 infos** _(down from 455 errors, 185 warnings)_

| Rule | Count | Severity | Auto-fixable |
|------|-------|----------|-------------|
| `assist/source/organizeImports` | ~125 | Error | Yes (`biome check --write`) |
| `lint/style/useImportType` | ~76 | Warning | Yes |
| `lint/performance/noImgElement` | ~34 | Warning | Use `next/image` |
| `lint/a11y/noSvgWithoutTitle` | ~34 | Error | Add `<title>` to SVGs |
| `lint/suspicious/noExplicitAny` | ~9 | Warning | Type properly |
| `lint/a11y/useButtonType` | ~8 | Error | Add `type="button"` |
| `lint/style/noNonNullAssertion` | ~7 | Warning | Add null checks |
| `lint/style/useTemplate` | ~3 | Info | Yes |
| `lint/a11y/noAutofocus` | ~1 | Error | Needs review |
| `lint/a11y/useAltText` | ~1 | Error | Add alt text |

**Changes since last audit:**
- Format/parse errors: ~190 → 0 _(resolved)_
- `useExhaustiveDependencies`: ~56 → 0 _(resolved or suppressed)_
- `noUnusedImports`: ~20 → 0 _(resolved)_
- `noUnusedVariables`: ~10 → 0 _(resolved)_
- `noUnusedFunctionParameters`: ~8 → 0 _(resolved)_
- `organizeImports`: NEW — 125 errors (auto-fixable)
- `noSvgWithoutTitle`: NEW — 34 errors
- `useButtonType`: NEW — 8 errors

**Quick win:** `npx biome check --write` auto-fixes ~200+ issues (import organization, import types, template strings).

---

## Broken Links in Content

### All previously tracked broken links: RESOLVED

The v1.3.0 restructure fixed all 7 broken internal links and all 11 external-to-internal link conversions that were tracked in the previous audit.

No broken internal links or stale `docs.availproject.org` references remain in content files.

---

## Duplicate Content

### Exact duplicates (6 files — HIGH)

`nexus/nexus-quickstart/nexus-elements/` contains 6 files with similar content to `nexus/nexus-ui-elements/components/`:

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

**All resolved.** No quadruple-backtick issues remain in any MDX files.

---

## Missing Frontmatter Descriptions

**117 out of 188 files (62%) lack a `description` field.** _(Was 122/191 — marginal improvement from file removal, not new descriptions.)_

Coverage: 71/188 = 37.8%

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

Previous 7 errors all resolved. 4 new errors found:

| File | Line | Error | Fix |
|------|------|-------|-----|
| `content/docs/da/build/interact/faucet/index.mdx` | 15 | "forseeable" | "foreseeable" |
| `content/docs/da/user-guides/accounts/index.mdx` | 60 | "tour Avail account" | "your Avail account" |
| `content/docs/da/user-guides/accounts/index.mdx` | 79 | "nnote" | "note" |
| `content/docs/da/user-guides/accounts/index.mdx` | 247 | "metedata" | "metadata" |

---

## Placeholder / Coming Soon Pages

2 remaining "coming soon" pages in the Nexus section:

| File | Detail |
|------|--------|
| `nexus/nexus-sdk/build-your-first-liquid-app/index.mdx` | "coming soon" callout |
| `nexus/nexus-ui-elements/mcp-documentation/index.mdx` | "coming soon" callout |

See `memory/CONTENT_AUDIT.md` § 3 for tracking.

---

## Dependency Issues

| Issue | Detail |
|-------|--------|
| ~~Unused devDependency~~ | ~~`tw-animate-css`~~ — Resolved: now imported in `global.css` |

No dependency issues found.

---

## Priority Summary

| Priority | Category | Items | Action |
|----------|----------|-------|--------|
| **HIGH** | Duplicate content | 6 files | Remove `nexus-quickstart/nexus-elements/` or `nexus-ui-elements/components/` |
| **HIGH** | Biome quick-fix | ~200+ | Run `npx biome check --write` (organizeImports, useImportType) |
| **MEDIUM** | Accessibility | ~43 | Add SVG titles, button types, alt text |
| **MEDIUM** | `next/image` | ~34 | Replace `<img>` with `<Image>` |
| **MEDIUM** | DRY violations | 3 | Extract shared utilities, remove duplication |
| **MEDIUM** | File size violations | 2 files | Split `on-this-page.tsx` (460) and `mdx-components.tsx` (415) |
| **LOW** | Missing descriptions | 117 files | Add frontmatter `description` |
| **LOW** | Dead code | 4 files | Remove unused code |
| **LOW** | Spelling errors | 4 | Fix typos |
| **LOW** | Stale hardcoded values | 3 | Fix `/docs/components` link, feedback mock, magic numbers |
| **LOW** | Minor quality | 2 | Fix alt text, remove eslint-disable |
