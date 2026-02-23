# Claude Context

This is the Avail documentation site built with Fumadocs and Next.js. It covers two products: **Avail DA** and **Avail Nexus**.

## Project Overview

- **Framework**: Next.js 16 with App Router
- **Documentation**: Fumadocs
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Components**: shadcn/ui
- **Product config**: `src/lib/products.ts` — single source of truth for product slugs, labels, and paths

## NON-NEGOTIABLES
- Never push directly to main — always create a branch and open a PR
- Never run the dev server unless explicitly asked
- Keep all components less than 400 lines — split if needed
- Don't define multiple components in one single file
- Create reusable components wherever possible
- Act autonomously on code changes and bug fixes. Ask before running servers, pushing code, or destructive operations.

## Working Principles

### Self-Improvement Loop
- After ANY correction from the user, update `memory/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake from recurring
- Review lessons at session start for the active project

### Verification Before Done
- Never mark a task complete without proving it works
- Run `pnpm build` or `pnpm validate:precommit` to verify changes
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"

### Autonomous Bug Fixing
- When given a bug report: investigate and fix it directly
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user

### Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

## Session Start
1. Read `memory/lessons.md`
2. Ask which project (or if ad-hoc)
3. If project: read its `plans/<project>/README.md`

## Versioning & PRs
- Branch and PR names use version numbers: `v1.1.0`, `v1.2.0`, etc.
- **Minor bump** (`v1.X.0`) for each PR with features, docs, or refactors
- **Patch bump** (`v1.X.Y`) for hotfixes
- Baseline: `main` as of PR #8 = `v1.0.0`

## Code Conventions

- **Products as data, not literals**: Use `products` from `src/lib/products.ts` for product names, paths, and slugs. Never hardcode product links or labels in components.
- **Internal links**: Always use `/docs/da/...` or `/docs/nexus/...` prefixes. Never use bare paths or old paths. See `memory/reference.md` for the full link pattern map.
- **No magic numbers**: Extract repeated constants into named variables.
- **DRY heading utilities**: Use shared utilities rather than inlining `.replace()` chains.
- **Content files**: No `.mdx` extensions in links. Spell-check content before committing.

## Design System

Two-layer token architecture: Primitives (`--blue-500`) → Semantic tokens (`--primary`, `--sidebar-background`). For full reference on token naming, categories, and usage, see `src/styles/DESIGN_SYSTEM.md`.

## Analytics

PostHog for user behavior tracking. For setup, types, hooks, and usage, see `src/lib/analytics/ANALYTICS.md`.

## Key Files

| File | Purpose |
|------|---------|
| `src/app/global.css` | All token definitions (primitives + semantic) |
| `src/styles/DESIGN_SYSTEM.md` | Design system documentation |
| `src/components/ui/` | shadcn components |
| `src/components/layout/` | Layout components (sidebar, navbar) |
| `src/components/mdx/` | MDX components for docs content |
| `src/lib/source.ts` | Fumadocs content source configuration |

## Guardrails

```bash
pnpm validate:precommit   # lint-staged + typecheck
rm -rf .next && pnpm build # clear cache if CSS issues
```

## Code Health

For current site health (build, lint, content quality, dead code), see [HEALTH.md](./HEALTH.md). Run `/audit` to regenerate from scratch.
