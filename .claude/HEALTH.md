# Site Health Report

> Generated: 2026-02-25
> 182 content files | 182 static doc pages | 294 checked source files

## Dashboard

| Category | Status | Count | Severity |
|----------|--------|-------|----------|
| Build | Pass | 182 doc pages | — |
| Types | Clean | 0 errors | — |
| Broken links | 0 | — | — |
| Duplicate content | 0 | — | — |
| Placeholder pages | 0 | — | — |
| Missing descriptions | 0/182 | 100% coverage | — |
| A11y violations | 47 | across src/ | warning |
| Lint issues | 322 errors, 154 warnings | 22 infos | info |
| Dead code | 1 | file | info |
| DRY violations | 1 | location | info |
| Oversized files (>400 lines) | 9 | in src/ | info |

## Quick Wins

- `npx biome check --write` — auto-fixes ~190 issues (104 organizeImports + 70 useImportType + 16 noUnusedImports)

## Recommended Next Actions

1. **Run `npx biome check --write`** (info, auto) — clears ~190 lint errors in one command.
2. **Delete dead code** (info, quick) — remove `src/lib/layout.shared.tsx` (not imported anywhere).
3. **Fix a11y violations** (warning, moderate) — 30 `noSvgWithoutTitle`, 8 `useButtonType`, 4 `useKeyWithClickEvents`.

---

## Changes Since Last Audit (2026-02-23)

- **Fixed:** Logo alt text "Nexus Elements" in mobile-nav — no longer present
- **Fixed:** Commented import in mobile-nav — no longer present
- **Fixed:** Simulated API call in feedback.tsx — no longer present
- **Fixed:** Heading ID duplication in mdx-components.tsx — no longer present
- **New route:** `/api/feedback` (dynamic) added to build
- **Lint improved:** 339→322 errors, 163→154 warnings (net -26 issues)

---

## Findings

### Critical

No critical issues found. All internal links are valid, build passes, no duplicate content.

### Warnings

#### A11y Violations (47 issues)

| Rule | Count | Auto-fixable | Notes |
|------|-------|-------------|-------|
| `noSvgWithoutTitle` | 30 | No | Add `<title>` to SVG elements |
| `useButtonType` | 8 | No | Add `type="button"` |
| `useKeyWithClickEvents` | 4 | No | Add keyboard handler alongside onClick |
| `noStaticElementInteractions` | 3 | No | Add role attribute or use semantic element |
| `useAltText` | 1 | No | Add alt text to image |
| `noAutofocus` | 1 | No | Review if autofocus is needed |

### Info

#### Lint (322 errors, 154 warnings, 22 infos)

| Rule | Count | Severity | Fix |
|------|-------|----------|-----|
| format issues | 96 files | error | `biome check --write` |
| `organizeImports` | 104 | error | `biome check --write` |
| `useImportType` | 70 | warning | `biome check --write` |
| `useExhaustiveDependencies` | 54 | error | Manual — review each hook |
| `noImgElement` | 34 | warning | Replace `<img>` with `next/image` |
| `noUnusedImports` | 16 | warning | `biome check --write` |
| `noNonNullAssertion` | 12 | warning | Add null checks |
| `useLiteralKeys` | 11 | info | `biome check --write` |
| `noExplicitAny` | 9 | warning | Type properly |
| `noUnusedVariables` | 7 | warning | Remove or use |
| `useIterableCallbackReturn` | 6 | error | Add return value |
| `useNodejsImportProtocol` | 4 | info | Use `node:` prefix |
| `noArrayIndexKey` | 4 | error | Use stable key |
| `noUnusedFunctionParameters` | 3 | warning | Remove or prefix with `_` |
| `noDangerouslySetInnerHtml` | 3 | error | Review necessity |
| `noGlobalIsNan` | 3 | warning | Use `Number.isNaN()` |
| `useParseIntRadix` | 3 | info | Add radix parameter |
| `useTemplate` | 2 | info | Use template literals |
| `useExponentiationOperator` | 1 | info | Use `**` operator |
| `noUselessFragments` | 1 | info | Remove unnecessary fragment |

**Auto-fixable:** ~190 (organizeImports + useImportType + noUnusedImports + format)
**Manual review:** ~308 (exhaustive deps, img elements, a11y, etc.)

#### Dead Code

| File | Issue |
|------|-------|
| `src/lib/layout.shared.tsx` | Entire file (9 lines) — exports `baseOptions()`, not imported anywhere |

#### DRY Violations

| Location | Issue | Fix |
|----------|-------|-----|
| `src/components/layout/sidebar-nav.tsx` | `renderTopLevel()` is near-copy of `renderNode()` | Eliminate `renderTopLevel()`, use single function |

#### Oversized Files (>400 lines)

| File | Lines |
|------|-------|
| `src/components/ui/sidebar.tsx` | 729 |
| `src/app/api/reference.json/route.ts` | 593 |
| `src/components/deposit/hooks/use-deposit-widget.ts` | 586 |
| `src/lib/markdown-clean.test.ts` | 533 |
| `src/components/deposit/components/icons.tsx` | 505 |
| `src/components/deposit/components/asset-selection-container.tsx` | 504 |
| `src/components/mdx/mdx-components.tsx` | 494 |
| `src/components/swaps/hooks/useSwaps.ts` | 457 |
| `src/components/home/card-icons.tsx` | 438 |

---

## Raw Check Output

<details>
<summary>Build output</summary>

```
Route (app)
├ ○ /
├ ○ /_not-found
├ ƒ /api/feedback
├ ƒ /api/markdown, /api/markdown/[...slug]
├ ƒ /api/reference.json
├ ƒ /api/search
├ ● /docs/[[...slug]] (+179 more paths)
├ ○ /icon.svg
├ ƒ /llms-full.txt
├ ƒ /llms.txt
├ ● /og/docs/[...slug] (+179 more paths)
└ ○ /sitemap.xml

○ Static | ● SSG | ƒ Dynamic
```

</details>

<details>
<summary>Biome summary</summary>

```
Checked 294 files in 104ms.
Found 322 errors.
Found 154 warnings.
Found 22 infos.
```

</details>
