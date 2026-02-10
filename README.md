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
| `pnpm format` | Format with Biome |

## Project structure

```
docs-fumadocs/
├── content/docs/          # MDX content (see "Content structure" below)
├── public/                # Static assets (images, fonts, icons)
├── scripts/               # Utility scripts (e.g. migration helpers)
├── src/
│   ├── app/               # Next.js App Router pages and layouts
│   │   ├── (home)/        # Landing page
│   │   ├── docs/          # Documentation layout and pages
│   │   ├── api/           # API routes (search)
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
│   ├── learn-about-avail/
│   ├── build-with-avail/
│   ├── operate-a-node/
│   ├── api-reference/
│   ├── user-guides/
│   ├── networks/
│   ├── glossary/
│   ├── faqs/
│   └── bug-bounty/
├── nexus/                 # Avail Nexus
│   ├── index.mdx
│   ├── meta.json          # Controls sidebar order for Nexus
│   ├── get-started/
│   ├── concepts/
│   ├── nexus-sdk/
│   ├── nexus-ui-elements/
│   ├── cookbook-recipes/
│   └── cheat-sheet/
├── index.mdx              # Root docs page
└── meta.json              # Top-level navigation
```

### How `meta.json` works

Each `meta.json` file controls the **order** of pages and folders in the sidebar:

```json
{
  "pages": [
    "get-started",
    "concepts",
    "nexus-sdk",
    "cookbook-recipes",
    "cheat-sheet"
  ]
}
```

Items listed here appear in this order. Items not listed are excluded from the sidebar.

### Adding a new page

1. Create a `.mdx` file in the appropriate directory (e.g. `content/docs/da/learn-about-avail/my-page.mdx`)
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
| DA | `/docs/da/...` | `/docs/da/learn-about-avail/what-is-avail` |
| DA user guides | `/docs/da/user-guides/...` | `/docs/da/user-guides/bridge-avail` |
| DA API reference | `/docs/da/api-reference/...` | `/docs/da/api-reference/avail-node-api` |
| Nexus | `/docs/nexus/...` | `/docs/nexus/get-started` |
| Nexus SDK | `/docs/nexus/nexus-sdk/...` | `/docs/nexus/nexus-sdk/api-reference` |

### Common mistakes to avoid

- **No bare paths** — `/docs/operate-a-node` won't resolve. Use `/docs/da/operate-a-node`.
- **No uppercase** — `/docs/DA/...` will break. Always use `/docs/da/...`.
- **No `.mdx` extensions** — Link to `/docs/da/faqs`, not `/docs/da/faqs.mdx`.
- **No old paths** — `avail-nexus-sdk`, `introduction-to-nexus`, and `nexus-cheatsheet` have been renamed. Use `nexus-sdk`, `get-started`, and `cheat-sheet`.
- **No top-level user guides** — `/docs/user-guides/...` is incorrect. Use `/docs/da/user-guides/...`.

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
3. Run `pnpm lint` and `pnpm format` before committing
4. Run `pnpm build` to verify nothing is broken
5. Open a PR against `main`

### Code quality

- `pnpm lint` — Check for linting issues with Biome
- `pnpm format` — Auto-format with Biome
- `pnpm types:check` — Ensure TypeScript types are correct
- `pnpm build` — Full production build (catches broken links and missing pages)

## Further reading

- [Fumadocs documentation](https://fumadocs.dev/)
- [Next.js documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 documentation](https://tailwindcss.com/docs)
- [Design system docs](src/styles/DESIGN_SYSTEM.md) — Token architecture and usage
- [Analytics docs](src/lib/analytics/ANALYTICS.md) — PostHog event tracking implementation
