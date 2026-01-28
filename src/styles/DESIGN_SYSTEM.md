# Design System

## Architecture

This project uses a **two-layer token architecture** for maximum simplicity and maintainability.

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: PRIMITIVES                                        │
│  Raw color values - DO NOT use directly in components       │
│                                                             │
│  --blue-50, --blue-500, --grey-light-700, --white-0, etc.  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: SEMANTIC TOKENS                                   │
│  Use these in components - they handle light/dark mode      │
│                                                             │
│  --primary, --sidebar-background, --card, --border, etc.   │
└─────────────────────────────────────────────────────────────┘
```

## Naming Convention

### Global Tokens
Format: `--{property}`

```css
--background
--foreground
--border
--primary
--secondary
--brand
```

### Component-Specific Tokens
Format: `--{component}-{property}` or `--{component}-{element}-{property}`

```css
--sidebar-background
--sidebar-item-foreground
--sidebar-item-foreground-active
--navbar-background
--search-results-foreground-primary
```

### State Variants
Format: `--{component}-{element}-{property}-{state}`

```css
--sidebar-item-background-hover
--sidebar-item-background-active
--search-background-hover
```

## Token Reference

### Global

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `background` | Page background | `bg-background` |
| `foreground` | Primary text | `text-foreground` |
| `border` | Default border | `border-border` |
| `brand` | Brand accent | `text-brand`, `bg-brand` |
| `primary` | Primary actions | `bg-primary` |
| `secondary` | Secondary actions | `bg-secondary` |
| `muted` | Muted backgrounds | `bg-muted` |
| `accent` | Accent highlights | `bg-accent` |

### Sidebar

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `sidebar-background` | Sidebar bg | `bg-sidebar-background` |
| `sidebar-item-background` | Item bg (default) | `bg-sidebar-item-background` |
| `sidebar-item-background-hover` | Item bg (hover) | `hover:bg-sidebar-item-background-hover` |
| `sidebar-item-background-active` | Item bg (active) | `bg-sidebar-item-background-active` |
| `sidebar-item-foreground` | Item text | `text-sidebar-item-foreground` |
| `sidebar-item-foreground-hover` | Item text (hover) | `hover:text-sidebar-item-foreground-hover` |
| `sidebar-item-foreground-active` | Item text (active) | `text-sidebar-item-foreground-active` |
| `sidebar-border` | Sidebar border | `border-sidebar-border` |

### Navbar

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `navbar-background` | Navbar bg | `bg-navbar-background` |
| `navbar-border` | Navbar border | `border-navbar-border` |

### Search

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `search-background` | Input bg | `bg-search-background` |
| `search-background-hover` | Input bg (hover) | `hover:bg-search-background-hover` |
| `search-foreground` | Placeholder text | `text-search-foreground` |
| `search-foreground-active` | Active text | `text-search-foreground-active` |
| `search-border` | Input border | `border-search-border` |
| `search-results-background-hover` | Result hover | `hover:bg-search-results-background-hover` |
| `search-results-foreground` | Result text | `text-search-results-foreground` |
| `search-results-foreground-primary` | Result title | `text-search-results-foreground-primary` |

### Keyboard Shortcuts

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `key-background` | Key bg | `bg-key-background` |
| `key-foreground` | Key text | `text-key-foreground` |
| `key-underline` | Key underline | `bg-key-underline` |

### Menu Items

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `menu-item-background` | Menu bg | `bg-menu-item-background` |
| `menu-item-background-hover` | Menu hover | `hover:bg-menu-item-background-hover` |
| `menu-item-foreground` | Menu text | `text-menu-item-foreground` |
| `menu-item-border` | Menu border | `border-menu-item-border` |

### Cards

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `card` | Card bg | `bg-card` |
| `card-foreground` | Card text | `text-card-foreground` |
| `card-border` | Card border | `border-card-border` |
| `card-header-background` | Card header/hover | `bg-card-header-background` |

### Page Navigation (TOC)

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `page-nav-foreground` | TOC text | `text-page-nav-foreground` |
| `page-nav-foreground-hover` | TOC hover | `hover:text-page-nav-foreground-hover` |
| `page-nav-foreground-active` | TOC active | `text-page-nav-foreground-active` |

### Breadcrumbs

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `breadcrumb-current` | Current page | `text-breadcrumb-current` |
| `breadcrumb-previous` | Parent pages | `text-breadcrumb-previous` |

### Links

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `link-foreground` | Link text | `text-link-foreground` |
| `link-underline` | Link underline | `border-link-underline` |

### Feedback

| Token | Description | Tailwind Class |
|-------|-------------|----------------|
| `feedback-success-background` | Success bg | `bg-feedback-success-background` |
| `feedback-success-foreground` | Success text | `text-feedback-success-foreground` |
| `feedback-warning-background` | Warning bg | `bg-feedback-warning-background` |
| `feedback-warning-foreground` | Warning text | `text-feedback-warning-foreground` |
| `feedback-error-background` | Error bg | `bg-feedback-error-background` |
| `feedback-error-foreground` | Error text | `text-feedback-error-foreground` |
| `feedback-info-background` | Info bg | `bg-feedback-info-background` |
| `feedback-info-foreground` | Info text | `text-feedback-info-foreground` |

## Usage Examples

### Sidebar Item
```tsx
<Link
  className={cn(
    "flex h-10 items-center px-4 text-base transition-colors",
    isActive
      ? "bg-sidebar-item-background-active text-sidebar-item-foreground-active"
      : "text-sidebar-item-foreground hover:bg-sidebar-item-background-hover"
  )}
>
```

### Card
```tsx
<div className="bg-card border border-card-border p-4 hover:bg-card-header-background">
  <h3 className="text-card-foreground">{title}</h3>
</div>
```

### Search Input
```tsx
<button className="bg-search-background border border-search-border text-search-foreground hover:bg-search-background-hover">
  <Search className="size-5" />
  <span>Search...</span>
  <kbd className="bg-key-background text-key-foreground">S</kbd>
</button>
```

## Adding New Tokens

### Step 1: Define in `:root` (light mode)
```css
:root {
  --new-component-background: var(--blue-50);
  --new-component-foreground: var(--blue-800);
}
```

### Step 2: Define in `.dark` (dark mode)
```css
.dark {
  --new-component-background: var(--grey-dark-300);
  --new-component-foreground: var(--grey-dark-900);
}
```

### Step 3: Add Tailwind mapping in `@theme inline`
```css
@theme inline {
  --color-new-component-background: var(--new-component-background);
  --color-new-component-foreground: var(--new-component-foreground);
}
```

### Step 4: Use in components
```tsx
<div className="bg-new-component-background text-new-component-foreground">
```

## Primitives Reference

### Blues
```
--blue-50   → Lightest (backgrounds, accents)
--blue-100  → Light
--blue-150  → Light-medium
--blue-200  → Medium-light
--blue-300  → Medium
--blue-400  → Medium-dark
--blue-500  → Primary blue (brand color)
--blue-600  → Dark
--blue-700  → Darker
--blue-800  → Very dark
--blue-850  → Almost black
--blue-900  → Near black
--blue-950  → Darkest
```

### Greys (Light Mode)
```
--grey-light-100  → Lightest
--grey-light-200  → Light borders
--grey-light-300  → Medium light
...
--grey-light-1000 → Darkest (text)
```

### Greys (Dark Mode)
```
--grey-dark-100  → Darkest (backgrounds)
--grey-dark-200  → Dark backgrounds
--grey-dark-300  → Medium dark
...
--grey-dark-1000 → Lightest (text)
```

### Neutrals
```
--white-0   → Pure white
--white-50  → Off-white
--black-0   → Near black
--black-50  → Dark background
```

### Semantic Colors
```
--red-50, --red-500, --red-800     → Error/destructive
--green-50, --green-500, --green-800 → Success
```
