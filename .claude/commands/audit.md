---
description: Run a site health audit
allowed-tools: Bash(pnpm build:*), Bash(npx tsc:*), Bash(npx biome:*)
---

You are running a site health audit for the Avail docs project.

**Principles:**
- This is a **snapshot**, not a ledger. Generate `HEALTH.md` from scratch every time.
- Do NOT load any previous audit file. Start from zero — fresh eyes.
- Use **exact counts**, never estimates (~125). Get the real number.
- Do NOT auto-fix anything. Present findings only.
- Do NOT update `IMPROVEMENTS.md` or `CHANGELOG.md`. Those are separate workflows.

---

## Phase 1: Collect

Run each check and record exact numbers.

### 1. Build
```bash
cd docs-fumadocs && pnpm build 2>&1 | tail -30
```
Record: pass/fail, exact page count, any warnings.

### 2. Types
```bash
cd docs-fumadocs && npx tsc --noEmit 2>&1 | tail -20
```
Record: clean or exact error count.

### 3. Lint
```bash
cd docs-fumadocs && npx biome check . 2>&1 | tail -40
```
Record: exact errors, warnings, infos. Parse the per-rule breakdown from output. Note which rules are auto-fixable with `biome check --write`.

### 4. Internal links
Search all `.mdx` files for internal links and verify each target path exists in `content/docs/`.

**IMPORTANT: Only match actual internal links, not external URLs.**
- Internal link: `[text](/docs/da/...)` or `href="/docs/..."` — the href starts with `/docs/`
- NOT an internal link: `https://example.com/docs/...` — this is an external URL that happens to contain `/docs/`
- Match pattern: markdown links `](/docs/` or JSX `href="/docs/` — but exclude any preceded by `https://` or `http://`

Check for:
- Links to non-existent pages
- Links with `.mdx` extensions (should be bare paths)
- Self-referential links
- Missing `/da/` or `/nexus/` segments
- Old paths: `/docs/DA/`, `/docs/user-guides/`, `/docs/end-user-guide/`, `/docs/introduction-to-avail/`

### 5. Description coverage
Count all MDX files under `content/docs/`. Count how many have a `description` field in frontmatter. Report: N/M (X%).

### 6. Duplicate content
Check for near-duplicate MDX files, especially in `nexus/`. Compare file names, titles, and content similarity across directories.

### 7. Placeholder pages
Search MDX files for "coming soon" text. Report: N placeholder pages with file paths.

### 8. Spelling
Search MDX content for common misspelling patterns: "permisionless", "buiding", "forseeable", "seperate", "metedata", "nnote", and any other obvious typos you spot. Report: file, line, error, fix.

### 9. Dead code
Check for source files in `src/` that are not imported anywhere. Check for commented-out code blocks. Report: N dead files/imports.

### 10. File sizes
Count lines in `src/**/*.{ts,tsx}` files. Report any over 400 lines with exact line counts.

### 11. DRY violations
Check for duplicated logic patterns in source code — especially heading ID generation in `mdx-components.tsx` and `renderTopLevel`/`renderNode` in `sidebar-nav.tsx`.

---

## Phase 2: Analyze

Group all findings by severity and effort:

**Severity:**
- `critical` — readers hit broken experiences (broken links, build failure, duplicate content, placeholder pages)
- `warning` — degraded quality (missing descriptions, spelling, a11y violations, stale hardcoded values)
- `info` — contributor DX (lint, dead code, DRY violations, file size)

**Effort:**
- `auto` — a single command fixes it (e.g., `npx biome check --write`)
- `quick` — under 15 minutes of manual work (fix a typo, delete a dead file)
- `planned` — needs design decisions or multi-file changes

Identify patterns instead of listing individual files where possible. "All DA API reference files lack descriptions" is more useful than listing 23 files individually.

---

## Phase 3: Report

### Generate HEALTH.md

Write `docs-fumadocs/.claude/HEALTH.md` from scratch using this template. This is a **full replacement** — the file represents current state only.

```markdown
# Site Health Report

> Generated: YYYY-MM-DD
> N content files | N static pages | N source files

## Dashboard

| Category | Status | Count |
|----------|--------|-------|
| Build | pass/FAIL | N pages |
| Types | clean/N errors | — |
| Broken links | N | severity |
| Duplicate content | N sets | severity |
| Placeholder pages | N | severity |
| Missing descriptions | N/M (X%) | severity |
| Spelling errors | N | severity |
| A11y violations | N | severity |
| Lint errors | N (N auto-fix) | severity |
| Dead code | N files | severity |
| DRY violations | N | severity |
| Oversized files (>400 lines) | N | severity |

## Quick Wins

[Exact commands to run for auto-fixable issues, e.g.:]
- `npx biome check --write` — fixes N import/formatting issues

## Recommended Next Actions

1. [Highest impact action with specific scope]
2. [Second highest]
3. [Third]

---

## Findings

### Critical

[Broken links, duplicates, placeholders — with file paths and specific details]

### Warnings

[Missing descriptions grouped by pattern, spelling errors, a11y violations]
[Use <details> collapsibles for lists longer than 10 items]

### Info

[Lint breakdown by rule, dead code, DRY violations, oversized files]

---

## Raw Check Output

<details>
<summary>Build output</summary>

[last 20 lines]

</details>

<details>
<summary>Biome output</summary>

[last 30 lines]

</details>
```

### Fix memory contradictions

If `MEMORY.md` contains claims that contradict your findings (e.g., coverage percentages, resolved status), fix them.

### Present summary

Show the Dashboard table and Quick Wins to the user in chat. Highlight anything critical. Suggest the single highest-impact next action.
