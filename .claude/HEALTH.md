# Site Health Report

> Generated: 2026-02-23
> 182 content files | 182 static doc pages | 289 checked source files

## Dashboard

| Category | Status | Count | Severity |
|----------|--------|-------|----------|
| Build | Pass | 182 doc pages | — |
| Types | Clean | 0 errors | — |
| Broken links | 0 | — | — |
| Duplicate content | 0 | — | — |
| Placeholder pages | 0 | — | — |
| Missing descriptions | 0/182 | 100% coverage | — |
| Spelling errors | 0 | — | — |
| A11y violations | 48 | across src/ | warning |
| Lint issues | 339 errors, 163 warnings | 22 infos | info |
| Dead code | 2 | files/imports | info |
| DRY violations | 3 | locations | info |
| Oversized files (>400 lines) | 9 | in src/ | info |

## Quick Wins

- `npx biome check --write` — auto-fixes ~185 issues (112 organizeImports + 73 useImportType)

## Recommended Next Actions

1. **Run `npx biome check --write`** (info, auto) — clears 185 lint errors in one command.
2. **Fix logo alt text** in `mobile-nav.tsx` (warning, quick) — says "Nexus Elements" instead of "Avail".
3. **Delete dead code** (info, quick) — remove `layout.shared.tsx` and commented import in `mobile-nav.tsx`.

---

## Findings

### Critical

No critical issues found. All internal links are valid, build passes, no duplicate content.

### Warnings

#### A11y Violations (48 issues)

| Rule | Count | Auto-fixable | Notes |
|------|-------|-------------|-------|
| `noSvgWithoutTitle` | 31 | No | Add `<title>` to SVG elements |
| `useButtonType` | 8 | No | Add `type="button"` |
| `useKeyWithClickEvents` | 4 | No | Add keyboard handler alongside onClick |
| `noStaticElementInteractions` | 3 | No | Add role attribute or use semantic element |
| `useAltText` | 1 | No | Add alt text to image |
| `noAutofocus` | 1 | No | Review if autofocus is needed |

#### Stale Hardcoded Values

| File | Issue |
|------|-------|
| `src/components/layout/mobile-nav.tsx:95,102` | Logo alt text says "Nexus Elements" — should be "Avail" |
| `src/components/layout/mobile-nav.tsx:136-141` | Product links hardcoded instead of importing from `products.ts` |
| `src/components/mdx/feedback.tsx:37` | `setTimeout(resolve, 500)` — simulated API call, no real endpoint |

### Info

#### Lint (339 errors, 163 warnings, 22 infos)

| Rule | Count | Severity | Fix |
|------|-------|----------|-----|
| `organizeImports` | 112 | error | `biome check --write` |
| format issues | 134 | error | `biome check --write` |
| `useImportType` | 73 | warning | `biome check --write` |
| `useExhaustiveDependencies` | 56 | error | Manual — review each hook |
| `noImgElement` | 34 | warning | Replace `<img>` with `next/image` |
| `noUnusedImports` | 18 | error | `biome check --write` |
| `noNonNullAssertion` | 12 | warning | Add null checks |
| `useLiteralKeys` | 11 | info | `biome check --write` |
| `noExplicitAny` | 9 | warning | Type properly |
| `noUnusedVariables` | 8 | error | Remove or use |
| `useIterableCallbackReturn` | 6 | warning | Add return value |
| `noUnusedFunctionParameters` | 5 | error | Remove or prefix with `_` |
| `useNodejsImportProtocol` | 4 | warning | Use `node:` prefix |
| `noArrayIndexKey` | 4 | warning | Use stable key |
| `noDangerouslySetInnerHtml` | 3 | warning | Review necessity |
| `noGlobalIsNan` | 3 | warning | Use `Number.isNaN()` |
| `useParseIntRadix` | 3 | error | Add radix parameter |
| `useTemplate` | 2 | info | Use template literals |
| Others | 3 | mixed | Various |

**Auto-fixable:** ~185 (organizeImports + useImportType + noUnusedImports + format)
**Manual review:** ~339 (exhaustive deps, img elements, a11y, etc.)

#### Dead Code

| File | Issue |
|------|-------|
| `src/lib/layout.shared.tsx` | Entire file — exports `baseOptions()`, not imported anywhere |
| `src/components/layout/mobile-nav.tsx:8` | Commented import: `// import ConnectWalletButton` |

#### DRY Violations

| Location | Issue | Fix |
|----------|-------|-----|
| `src/components/mdx/mdx-components.tsx:82-150` | Heading ID generation duplicated 4x (h2, h3, h4, h5) | Extract `generateHeadingId()` utility |
| `src/components/layout/sidebar-nav.tsx:213-347` | `renderTopLevel()` (64 lines) is near-copy of `renderNode()` (67 lines) | Eliminate `renderTopLevel()`, use single function |
| `src/components/layout/mobile-nav.tsx:136-141` | Product links hardcoded instead of using `products.ts` | Import and map over `products` array |

#### Oversized Files (>400 lines)

| File | Lines |
|------|-------|
| `src/components/ui/sidebar.tsx` | 726 |
| `src/components/deposit/hooks/use-deposit-widget.ts` | 586 |
| `src/app/api/reference.json/route.ts` | 586 |
| `src/lib/markdown-clean.test.ts` | 533 |
| `src/components/deposit/components/icons.tsx` | 505 |
| `src/components/deposit/components/asset-selection-container.tsx` | 504 |
| `src/components/mdx/mdx-components.tsx` | 478 |
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
├ ƒ /api/markdown, /api/markdown/[...slug]
├ ○ /api/reference.json
├ ƒ /api/search
├ ● /docs/[[...slug]] (+179 more paths)
├ ○ /icon.svg
├ ƒ /llms-full.txt
├ ○ /llms.txt
├ ● /og/docs/[...slug] (+179 more paths)
└ ○ /sitemap.xml

○ Static | ● SSG | ƒ Dynamic
```

</details>

<details>
<summary>Biome summary</summary>

```
Checked 289 files in 96ms.
Found 339 errors.
Found 163 warnings.
Found 22 infos.
```

</details>
