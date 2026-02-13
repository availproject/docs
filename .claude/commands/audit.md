---
description: Run a full code health and product improvement audit
allowed-tools: Bash(pnpm build:*), Bash(npx tsc:*), Bash(npx biome:*)
---

You are running a full code health and product improvement audit for the Avail docs project.

## What to do

### 0. Load baseline
Read the existing audit files first so you can compare current findings against the last audit:
- `docs-fumadocs/.claude/CODE_HEALTH_AUDIT.md` — tracked source code issues (dead code, DRY, broken links, spelling, etc.)
- `docs-fumadocs/.claude/AUDIT_DETAILS.md` — detailed breakdowns (lint counts, duplicate content, missing descriptions, priorities)

Use these as your baseline. When running the checks below, note what's **new**, what's **resolved**, and what's **unchanged**.

### 1. Build check
```bash
cd docs-fumadocs && pnpm build 2>&1 | tail -20
```
Note: pass/fail, page count, any new warnings.

### 2. Type check
```bash
cd docs-fumadocs && npx tsc --noEmit 2>&1 | tail -20
```

### 3. Lint summary
```bash
cd docs-fumadocs && npx biome check . 2>&1 | tail -30
```
Count errors and warnings. Compare against the last known totals in AUDIT_DETAILS.md.

### 4. Broken link scan
Search all `.mdx` files for internal links (`/docs/...`) and verify the target path exists as a file in `content/docs/`. Check for:
- Links to non-existent pages
- Links with `.mdx` extensions (should be bare paths)
- Self-referential links (page linking to itself)
- Missing `/da/` or `/nexus/` segments
- Old paths: `/docs/DA/`, `/docs/user-guides/`, `/docs/end-user-guide/`, `/docs/introduction-to-avail/`, `avail-nexus-sdk`, `introduction-to-nexus`, `nexus-cheatsheet`

### 5. Content quality scan
- Files missing frontmatter `description` (count and compare)
- Duplicate content (identical or near-identical files)
- Stray code fences (quadruple backticks)
- Spelling errors (common patterns: "permisionless", "buiding", etc.)
- Placeholder/coming-soon pages

## How to update the files

### CODE_HEALTH_AUDIT.md (`docs-fumadocs/.claude/CODE_HEALTH_AUDIT.md`)
- Source code issues only: dead code, DRY violations, file sizes, lint, hardcoded values, dependencies
- Update the "Last reviewed" date
- Mark resolved items with ~~strikethrough~~
- Add new findings in the appropriate section

### AUDIT_DETAILS.md (`docs-fumadocs/.claude/AUDIT_DETAILS.md`)
- Full detailed breakdowns: lint rules, broken links, duplicates, missing descriptions, build status, priorities
- Update the "Generated" date
- Refresh all tables with current counts
- Move resolved items out, add new findings

### IMPROVEMENTS.md (memory file — `memory/IMPROVEMENTS.md`)
- Think like a PM: what would improve the experience for each persona?
- Add new ideas surfaced by the audit under the right persona section
- Follow the file's workflow: move items between **Working**, **Approved (ready to build)**, **Shipped**, and **De-prioritized** sections
- When something ships, move it to **Shipped** with the version (e.g. `(v1.3.0)`)
- Do NOT auto-implement — present ideas for discussion

### CHANGELOG.md (memory file — `memory/CHANGELOG.md`)
- If items have been shipped since the last entry, suggest a new changelog entry
- Include: what shipped, decisions & context, who benefits
- Present the draft entry — don't write it without approval

## How to present results

After running all checks and updating files, present a summary:

```
## Audit Summary — [date]

### Build & Types
- Build: [pass/fail] ([N] pages)
- Types: [clean/N errors]

### Lint
- Errors: [N] (was [N]) — [↑/↓/=]
- Warnings: [N] (was [N]) — [↑/↓/=]

### Content
- Broken links: [N] (was [N])
- Missing descriptions: [N]/[total]
- Duplicates: [N] files

### Changes made
- [list of updates to each file]

### Suggested next actions
- [prioritized list of what to tackle]
```

Think like a PM for improvements (user impact, effort, priority).
Think like an engineer for code health (severity, auto-fixability).
Present ideas for discussion — don't auto-implement anything.
