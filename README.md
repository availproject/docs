# Avail Documentation

The official documentation site for [Avail](https://www.availproject.org/) — a modular data availability layer designed to power the next generation of trust-minimized applications and sovereign rollups.

The site covers two products:

- **Avail DA** — The data availability layer: learn, build, operate nodes, and explore API references.
- **Avail Nexus** — The unification layer: SDK, UI elements, quickstart guides, and cookbook recipes.

## Tech stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [Fumadocs](https://fumadocs.dev/) | Documentation framework |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [shadcn/ui](https://ui.shadcn.com/) | UI component primitives |
| [Radix UI](https://www.radix-ui.com/) | Accessible headless components |
| [Biome](https://biomejs.dev/) | Linting and formatting |
| [Vitest](https://vitest.dev/) | Unit testing (`pnpm test`) |
| [Jest](https://jestjs.io/) | Legacy test suite (`__tests__/`) |
| [PostHog](https://posthog.com/) | Analytics |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) (recommended package manager)

### Install and run

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Other commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Serve the production build |
| `pnpm types:check` | Run Fumadocs MDX codegen + type checking |
| `pnpm lint` | Lint with Biome |
| `pnpm lint:staged` | Run Biome on staged files only |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm validate:precommit` | Run the same checks as the Husky pre-commit hook |
| `pnpm format` | Format with Biome |
| `pnpm links:validate` | Validate internal links across all MDX content |
| `pnpm links:fix` | Auto-fix broken internal links |
| `pnpm redirects:generate` | Generate redirect mappings from old → new paths |
| `pnpm redirects:report` | Report on redirect coverage |

## Project structure

```
docs-fumadocs/
├── content/docs/          # MDX content (see "Content structure" below)
├── data/                  # Static data (JSON)
├── public/                # Static assets (images, fonts, icons)
├── scripts/               # Redirect generators, link validators, and migration helpers
├── src/
│   ├── app/               # Next.js App Router pages and layouts
│   │   ├── (home)/        # Landing page
│   │   ├── docs/          # Documentation layout and pages
│   │   ├── api/           # API routes (search, markdown, reference.json)
│   │   └── og/            # Open Graph image generation
│   ├── components/
│   │   ├── layout/        # Sidebar, navbar, product switcher
│   │   ├── mdx/           # Custom MDX components for docs
│   │   ├── ui/            # shadcn/ui primitives
│   │   ├── logos/         # Brand logo components
│   │   └── ...            # Feature-specific components
│   ├── hooks/             # React hooks (analytics, etc.)
│   ├── lib/               # Utilities, content source, product config
│   ├── providers/         # Context providers (PostHog, themes)
│   └── styles/            # Design system documentation
├── source.config.ts       # Fumadocs MDX configuration
├── next.config.mjs        # Next.js configuration
├── AGENTS.md              # AI agent conventions (design tokens, file locations)
├── biome.json             # Biome linter/formatter configuration
└── components.json        # shadcn/ui configuration
```

## Content structure

All documentation content lives in `content/docs/` and is organized by product:

```
content/docs/
├── da/                    # Avail DA
│   ├── index.mdx
│   ├── meta.json          # Controls sidebar order for DA
│   ├── get-started/
│   ├── networks/          # Network endpoints and configuration
│   ├── concepts/          # What is Avail DA, how it works, app IDs, explorer, tx pricing
│   ├── build/             # Interact, rollups, Turbo DA, VectorX
│   ├── operate/           # Node types, full nodes, light clients, validators
│   ├── user-guides/
│   ├── api-reference/
│   ├── glossary/
│   ├── faqs/
│   └── bug-bounty/
├── nexus/                 # Avail Nexus
│   ├── index.mdx
│   ├── meta.json          # Controls sidebar order for Nexus
│   ├── get-started/
│   ├── supported-chains-and-tokens/
│   ├── nexus-ui-elements/ # Quickstart, get-started guides, components, MCP docs
│   ├── nexus-sdk/         # Quickstart, get-started guides, reference (bridge/swap methods), cookbook
│   ├── concepts/
│   ├── cookbook-recipes/
│   └── contracts/
├── index.mdx              # Root docs page
└── meta.json              # Top-level navigation
```

### How `meta.json` works

Each `meta.json` file controls the **order** of pages and folders in the sidebar:

```json
{
  "pages": [
    "get-started",
    "supported-chains-and-tokens",
    "nexus-ui-elements",
    "nexus-sdk",
    "concepts",
    "cookbook-recipes",
    "contracts"
  ]
}
```

Items listed here appear in this order. Items not listed are excluded from the sidebar.

### Adding a new page

1. Create a `.mdx` file in the appropriate directory (e.g. `content/docs/da/concepts/my-page.mdx`)
2. Add frontmatter at the top:
   ```mdx
   ---
   title: My Page Title
   description: Brief description for SEO and link previews.
   ---

   Your content here.
   ```
3. Add the filename (without `.mdx`) to the nearest `meta.json` `pages` array to control its sidebar position

## Link conventions

All routes are prefixed with `/docs`. Internal links **must** follow these patterns:

| Product | Link pattern | Example |
|---|---|---|
| DA | `/docs/da/...` | `/docs/da/get-started` |
| DA build | `/docs/da/build/...` | `/docs/da/build/interact/app-id` |
| DA operate | `/docs/da/operate/...` | `/docs/da/operate/run-a-full-node` |
| DA user guides | `/docs/da/user-guides/...` | `/docs/da/user-guides/bridge-avail` |
| DA API reference | `/docs/da/api-reference/...` | `/docs/da/api-reference/avail-node-api` |
| Nexus | `/docs/nexus/...` | `/docs/nexus/get-started` |
| Nexus SDK | `/docs/nexus/nexus-sdk/...` | `/docs/nexus/nexus-sdk/reference` |

### Common mistakes to avoid

- **No bare paths** — `/docs/operate` won't resolve. Use `/docs/da/operate`.
- **No uppercase** — `/docs/DA/...` will break. Always use `/docs/da/...`.
- **No `.mdx` extensions** — Link to `/docs/da/faqs`, not `/docs/da/faqs.mdx`.
- **No old DA paths** — `build-with-avail`, `operate-a-node`, `learn-about-avail`, `welcome-to-avail-docs`, `interact-with-avail-da`, and `deploy-rollup-on-avail` have been renamed to `build`, `operate`, `concepts`, `get-started`, `build/interact`, and `build/rollups`.
- **No old Nexus paths** — `avail-nexus-sdk`, `introduction-to-nexus`, `nexus-cheatsheet`, and `cheat-sheet` have been renamed to `nexus-sdk`, `get-started`, and `contracts`. The old `nexus-sdk/api-reference` is now `nexus-sdk/reference`.
- **No top-level user guides** — `/docs/user-guides/...` is incorrect. Use `/docs/da/user-guides/...`.

### Redirects

Legacy paths from the old docs site are handled via redirects in `next.config.mjs`. The `redirects:*` scripts manage these mappings — use `pnpm redirects:report` to check coverage and `pnpm redirects:generate` to rebuild them from crawl data.

## Deployment

The site is deployed on [Vercel](https://vercel.com/) via Git integration. Pushing to `main` triggers a production deploy.

## Environment variables

Create a `.env.local` file in the project root with:

```bash
# PostHog analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

The site builds and runs without these variables — analytics will simply be disabled.

## Contributing

### Branch naming

We use **version-based** branch names:

- `v1.X.0` — Each PR with features, docs, or refactors gets a minor bump
- `v1.X.Y` — Hotfixes get a patch bump

### Workflow

1. Create a branch from `main` with the next version number
2. Make your changes
3. Run `pnpm validate:precommit` before committing (or rely on Husky pre-commit)
4. Run `pnpm build` to verify nothing is broken
5. Open a PR against `main`

> Husky is configured via `prepare` and installs on `pnpm install`.
> Pre-commit runs `pnpm validate:precommit` (lint-staged + typecheck).


### Code quality

- `pnpm lint` — Check for linting issues with Biome
- `pnpm format` — Auto-format with Biome
- `pnpm types:check` — Ensure TypeScript types are correct
- `pnpm build` — Full production build (catches broken links and missing pages)

## Agent-friendly endpoints

The site exposes several endpoints designed for AI agents, LLMs, and programmatic access:

| Endpoint | Description |
|---|---|
| `/llms.txt` | Intent-based quick-reference with categorized links ("If you want to...") |
| `/llms-full.txt` | Full concatenated markdown of all pages. Supports `?section=` filtering (e.g. `?section=da/build`) |
| `/api/markdown/{slug}` | Raw markdown for any page. Also accessible via `Accept: text/markdown` content negotiation on any docs page |
| `/api/reference.json` | Structured JSON with networks, contracts, SDK versions, and API endpoints |

### Content negotiation

Any docs page returns raw markdown instead of HTML when requested with `Accept: text/markdown`:

```bash
curl -H "Accept: text/markdown" https://docs.availproject.org/docs/da/get-started
```

### Filtering llms-full.txt

Retrieve only a specific section to reduce token usage:

```bash
# All DA build docs
curl https://docs.availproject.org/llms-full.txt?section=da/build

# All Nexus docs
curl https://docs.availproject.org/llms-full.txt?section=nexus
```

## Further reading

- [Fumadocs documentation](https://fumadocs.dev/)
- [Next.js documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 documentation](https://tailwindcss.com/docs)
- [Design system docs](src/styles/DESIGN_SYSTEM.md) — Token architecture and usage
- [Analytics docs](src/lib/analytics/ANALYTICS.md) — PostHog event tracking implementation
- [AI agents guide](AGENTS.md) — Design tokens and conventions for AI agents
