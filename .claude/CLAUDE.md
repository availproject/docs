# Claude Context

This is the Avail Nexus Elements documentation site built with Fumadocs and Next.js.

## Project Overview

- **Framework**: Next.js 16 with App Router
- **Documentation**: Fumadocs
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Components**: shadcn/ui

## NON-NEGOTIABLES
- Never push directly to main — always create a branch and open a PR
- Never run the dev server unless explicitly asked
- Keep all componenets less than 400 lines
- Don't define multiple components in one single file
- Create reusable components wherever possible

## Design System

We use a **two-layer token architecture**:

```
Layer 1: Primitives (--blue-500, --grey-light-700)
              ↓
Layer 2: Semantic Tokens (--primary, --sidebar-background)
```

### Token Naming Convention

- **Global tokens**: `--[property]` (e.g., `--primary`, `--background`, `--border`)
- **Component tokens**: `--[component]-[property]` (e.g., `--sidebar-background`, `--navbar-border`)

### Key Token Categories

| Category | Example Tokens |
|----------|---------------|
| Global | `background`, `foreground`, `border`, `primary`, `brand` |
| Sidebar | `sidebar-background`, `sidebar-item-foreground-active` |
| Navbar | `navbar-background`, `navbar-border` |
| Search | `search-background`, `search-foreground`, `search-border` |
| Cards | `card`, `card-foreground`, `card-border` |
| Page Nav | `page-nav-foreground`, `page-nav-foreground-active` |

### Usage in Tailwind

```tsx
// Correct - use semantic tokens directly
<div className="bg-sidebar-background text-sidebar-item-foreground">
<div className="bg-card border border-card-border">
<div className="text-foreground bg-background">

// Incorrect - don't use var() wrapper or docs- prefix
<div className="bg-[var(--sidebar-background)]">  // Wrong
<div className="bg-docs-sidebar-bg">              // Wrong (old naming)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/global.css` | All token definitions (primitives + semantic) |
| `src/styles/DESIGN_SYSTEM.md` | Design system documentation |
| `src/components/ui/` | shadcn components |
| `src/components/layout/` | Layout components (sidebar, navbar) |
| `src/components/mdx/` | MDX components for docs content |
| `src/lib/source.ts` | Fumadocs content source configuration |

## Adding New Tokens

1. Add to `:root` in `global.css`:
   ```css
   --new-token: var(--blue-300);
   ```

2. Add dark mode in `.dark`:
   ```css
   --new-token: var(--blue-400);
   ```

3. Add Tailwind mapping in `@theme inline`:
   ```css
   --color-new-token: var(--new-token);
   ```

4. Use in components:
   ```tsx
   <div className="bg-new-token">
   ```

## Important Notes

- **No `docs-` prefix**: We removed the `docs-` prefix from all tokens for simplicity
- **Two layers only**: Primitives → Semantic tokens (no intermediate layer)
- **shadcn compatible**: Standard shadcn tokens (`--primary`, `--card`, etc.) work out of the box
- **Dark mode**: All tokens have light/dark variants defined in `:root` and `.dark`

## Common Tasks

### Install new shadcn component
```bash
pnpm dlx shadcn@latest add [component-name]
```
Components automatically use your theme tokens.

### Run development server
```bash
pnpm dev
```

### Build for production
```bash
pnpm build
```

### Clear cache (if CSS issues)
```bash
rm -rf .next && pnpm build
```

## Analytics (PostHog)

We use PostHog for comprehensive user behavior tracking. See `src/lib/analytics/ANALYTICS.md` for full documentation.

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/analytics/types.ts` | TypeScript types for all events |
| `src/lib/analytics/posthog.ts` | PostHog initialization and track function |
| `src/hooks/use-analytics.ts` | React hooks for tracking |
| `src/providers/PostHogProvider.tsx` | Provider component |

### Environment Variables

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Using Analytics in Components

```tsx
import { useAnalytics } from "@/hooks/use-analytics";

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent("nav_card_clicked", {
      card_title: "My Card",
      card_type: "concept",
      destination_path: "/docs/example",
    });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```
