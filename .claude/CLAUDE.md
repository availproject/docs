# Claude Context

This is the Avail documentation site built with Fumadocs and Next.js. It covers two products: **Avail DA** and **Avail Nexus**.

## Project Overview

- **Framework**: Next.js 16 with App Router
- **Documentation**: Fumadocs
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Components**: shadcn/ui
- **Linter/Formatter**: Biome (`biome.json`)
- **Testing**: Vitest (`pnpm test`) + Jest (`__tests__/`) — two runners coexist, consolidation pending
- **Product config**: `src/lib/products.ts` — single source of truth for product slugs, labels, and paths

## NON-NEGOTIABLES
- Never push directly to main — always create a branch and open a PR
- Never run the dev server unless explicitly asked
- Keep all components less than 400 lines — split if needed
- Prefer one component per file. Exceptions: compound components (Tabs/TabsList, etc.) and small private helpers.
- Create reusable components wherever possible
- Act autonomously on code changes and bug fixes. Ask before running servers, pushing code, or destructive operations.

## Working Principles

### Verification Before Done
- Never mark a task complete without proving it works
- Run `pnpm build` or `pnpm validate:precommit` to verify changes
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"

### Autonomous Bug Fixing
- When given a bug report: investigate and fix it directly
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user

## Versioning & PRs
- Branch and PR names use version numbers: `v2.1.0`, `v2.2.0`, etc.
- **Minor bump** (`v2.X.0`) for each PR with features, docs, or refactors
- **Patch bump** (`v2.X.Y`) for hotfixes

## Code Conventions

- **Products as data, not literals**: Use `products` from `src/lib/products.ts` for product names, paths, and slugs. Never hardcode product links or labels in components.
- **Internal links**: Always use `/docs/da/...` or `/docs/nexus/...` prefixes. Never use bare paths or old paths. See `memory/reference.md` for the full link pattern map.
- **No magic numbers**: Extract repeated constants into named variables.
- **DRY heading utilities**: Use shared utilities rather than inlining `.replace()` chains.
- **Content files**: No `.mdx` extensions in links. Spell-check content before committing.

## Linting & Formatting

Biome handles both linting and formatting. ESLint is not used.

```bash
npx biome check .            # lint + format check
npx biome check --write      # auto-fix
pnpm validate:precommit      # lint-staged + typecheck
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/global.css` | All token definitions (primitives + semantic) |
| `src/styles/DESIGN_SYSTEM.md` | Design system documentation |
| `src/lib/analytics/ANALYTICS.md` | Analytics setup and hooks |
| `src/components/ui/` | shadcn components |
| `src/components/layout/` | Layout components (sidebar, navbar) |
| `src/components/mdx/` | MDX components for docs content |
| `src/lib/source.ts` | Fumadocs content source configuration |
| `biome.json` | Linter/formatter configuration |

## Guardrails

```bash
pnpm validate:precommit   # lint-staged + typecheck
rm -rf .next && pnpm build # clear cache if CSS issues
```

## Code Health

For current site health (build, lint, content quality, dead code), see [HEALTH.md](./HEALTH.md). Run `/audit` to regenerate from scratch.
