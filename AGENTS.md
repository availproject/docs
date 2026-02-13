# AI Agents Guide

Guidelines for AI agents working on this documentation codebase.

## Quick Reference

### Design Token Architecture

```
Primitives (Layer 1)          Semantic Tokens (Layer 2)
─────────────────────────────────────────────────────────
--blue-500                →   --primary, --brand
--grey-light-700          →   --sidebar-item-foreground
--white-0                 →   --background, --card
--grey-light-200          →   --border
```

**Rule**: Always use Layer 2 (semantic tokens) in components. Never use primitives directly.

### Token Naming Patterns

```
Global:     bg-{property}              → bg-background, bg-primary
Component:  bg-{component}-{property}  → bg-sidebar-background
State:      bg-{component}-{property}-{state} → bg-sidebar-item-background-hover
```

### File Locations

```
src/
├── app/
│   ├── global.css          # Token definitions - EDIT HERE for new tokens
│   └── docs/               # Documentation pages
├── components/
│   ├── ui/                 # shadcn components - generally don't modify
│   ├── layout/             # Sidebar, navbar, etc.
│   ├── mdx/                # MDX components for content
│   └── helpers/            # Utility components
├── styles/
│   └── DESIGN_SYSTEM.md    # Token reference documentation
└── lib/
    └── source.ts           # Fumadocs configuration
```

## Working with Tokens

### Adding a New Token

```css
/* 1. In :root (light mode) */
--new-token: var(--blue-300);
--new-token-foreground: var(--white-0);

/* 2. In .dark (dark mode) */
--new-token: var(--blue-400);
--new-token-foreground: var(--white-0);

/* 3. In @theme inline (Tailwind mapping) */
--color-new-token: var(--new-token);
--color-new-token-foreground: var(--new-token-foreground);
```

### Using Tokens in Components

```tsx
// ✅ Correct
className="bg-sidebar-background text-sidebar-item-foreground"
className="bg-card border border-card-border"
className="text-page-nav-foreground-active"

// ❌ Wrong - using var() wrapper
className="bg-[var(--sidebar-background)]"

// ❌ Wrong - using old docs- prefix
className="bg-docs-sidebar-bg"

// ❌ Wrong - using primitives
className="bg-[var(--blue-500)]"
```

## Component Categories

### Layout Components (`src/components/layout/`)
Use these tokens:
- `sidebar-*` for sidebar
- `navbar-*` for top navigation
- `border` for dividers

### MDX Components (`src/components/mdx/`)
Use these tokens:
- `card-*` for cards
- `foreground` for text
- `brand` for headings/accents
- `border` for dividers

### UI Components (`src/components/ui/`)
These are shadcn components. They use:
- `primary`, `secondary`, `destructive` for buttons
- `card`, `popover` for containers
- `muted`, `accent` for states

## Available Token Groups

### Global
`background`, `foreground`, `border`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `brand`

### Sidebar
`sidebar-background`, `sidebar-item-background`, `sidebar-item-background-hover`, `sidebar-item-background-active`, `sidebar-item-foreground`, `sidebar-item-foreground-hover`, `sidebar-item-foreground-active`, `sidebar-border`

### Navbar
`navbar-background`, `navbar-border`

### Search
`search-background`, `search-background-hover`, `search-foreground`, `search-foreground-active`, `search-border`, `search-results-background-hover`, `search-results-foreground`, `search-results-foreground-primary`

### Keys (Keyboard Shortcuts)
`key-background`, `key-foreground`, `key-underline`

### Menu Items
`menu-item-background`, `menu-item-background-hover`, `menu-item-foreground`, `menu-item-border`

### Page Navigation (TOC)
`page-nav-foreground`, `page-nav-foreground-hover`, `page-nav-foreground-active`

### Cards
`card`, `card-foreground`, `card-border`, `card-header-background`

### Breadcrumbs
`breadcrumb-current`, `breadcrumb-previous`

### Links
`link-foreground`, `link-underline`

### Feedback
`feedback-success-background`, `feedback-success-foreground`, `feedback-warning-background`, `feedback-warning-foreground`, `feedback-error-background`, `feedback-error-foreground`, `feedback-info-background`, `feedback-info-foreground`

## Common Mistakes to Avoid

1. **Don't use `docs-` prefix** - We removed this for simplicity
2. **Don't wrap in `var()`** - Tailwind v4 handles this automatically
3. **Don't use primitives directly** - Always use semantic tokens
4. **Don't hardcode colors** - Use tokens for theming support
5. **Don't forget dark mode** - Add both `:root` and `.dark` variants

## Testing Changes

```bash
# Pre-commit guardrail (runs lint-staged + typecheck)
pnpm validate:precommit

# Type check
pnpm types:check

# Build (catches CSS errors)
pnpm build

# If CSS parsing errors occur, clear cache
rm -rf .next && pnpm build
```

## Fumadocs Specifics

- Content lives in `docs/` directory as MDX files
- `source.ts` configures the content source
- Page tree is auto-generated from file structure
- Use `meta.json` files to customize navigation order
