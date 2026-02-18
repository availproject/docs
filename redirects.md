## Redirects pipeline

This repo can automatically discover all existing `https://docs.availproject.org` URLs and map them to the new Fumadocs URLs. Redirects are enforced at the Next.js middleware layer and validated by tests.

### Data sources

- **Old docs URLs (current production site)**  
  - Generated from the public sitemap:  
    - `data/old-docs-urls.json`
  - Script:  
    - `scripts/crawl-old-docs.mjs`

- **New docs URLs (this repo)**  
  - Generated from the MDX filesystem:  
    - `data/new-docs-urls.json`
  - Script:  
    - `scripts/list-new-docs.mjs`

- **Redirect rules (this repo)**  
  - Manual overrides (hand‑curated):  
    - `data/redirects.override.json`
  - Generated mappings (with confidence + reason, for review):  
    - `data/redirects.generated.json`
  - Runtime rules used by middleware + tests (flat `{ source, destination }[]`):  
    - `data/redirects.runtime.json`

### Middleware integration

- File: `src/middleware.ts`
- Behavior:
  - **Step 1 – Markdown negotiation**  
    - If the request targets `/docs/**` and `Accept: text/markdown`, rewrite to `/api/markdown/**` (existing behavior preserved).
  - **Step 2 – Redirects**  
    - For all other requests (excluding assets and `/api/markdown/**`), apply redirect rules:
      - Normalizes paths (trailing slashes removed).
      - Checks 4 variants per request:  
        - `pathname`  
        - `/docs${pathname}`  
        - normalized versions of both
      - Longest‑prefix wins: the rule whose `source` is the longest prefix of the path is used.
      - Preserves suffix: `destination + (path.slice(source.length))`.
      - Uses rules from:
        - `data/redirects.override.json` (highest precedence)
        - `src/lib/redirects/generated.ts` (generated mappings)
        - `src/lib/redirects/static-rules.ts` (coarse prefix rules, e.g. `/da → /docs/da`)

### How to generate redirects

From the monorepo root:

- **1. Crawl the current production docs sitemap (old URLs)**  

```bash
pnpm -C anish-latest/docs-fumadocs redirects:crawl-old
```

Outputs: `anish-latest/docs-fumadocs/data/old-docs-urls.json`

- **2. Inventory all new docs routes from MDX (new URLs)**  

```bash
pnpm -C anish-latest/docs-fumadocs redirects:list-new
```

Outputs: `anish-latest/docs-fumadocs/data/new-docs-urls.json`

- **3. Generate mapping + runtime rules**  

```bash
pnpm -C anish-latest/docs-fumadocs redirects:generate
```

Outputs:
- `data/redirects.generated.json` – explicit mappings with `{ source, destination, confidence, reason }`
- `src/lib/redirects/generated.ts` – TypeScript export used at runtime
- `data/redirects.runtime.json` – flattened `{ source, destination }[]` for tests and tooling

You can edit `data/redirects.override.json` at any time and re‑run `redirects:generate` to apply overrides.

### How to test redirects coverage

We use Jest (in addition to Vitest) for a Node‑only coverage test that simulates the middleware resolution logic.

- Config: `jest.config.cjs`
- Test: `__tests__/redirects-coverage.test.js`

Run:

```bash
pnpm -C anish-latest/docs-fumadocs test -- --runTestsByPath __tests__/redirects-coverage.test.js
```

What it checks:
- Every entry in `data/old-docs-urls.json` resolves to **some** redirect rule in `data/redirects.runtime.json`.
- The final destination path is present in `data/new-docs-urls.json` (i.e. is a valid new route).
- Resolution logic exactly mirrors `src/middleware.ts`:
  - same normalization
  - same four `pathsToCheck` variants
  - same longest‑prefix matching and suffix preservation.

### How to validate internal links in MDX

The link validator ensures that internal links inside MDX either:
- point directly to valid new routes, or
- are at least covered by a redirect rule.

- Script: `scripts/validate-internal-links.mjs`

Check only (no writes):

```bash
pnpm -C anish-latest/docs-fumadocs links:validate
```

Auto‑fix where safe (best‑effort string replacement):

```bash
pnpm -C anish-latest/docs-fumadocs links:fix
```

Behavior:
- Scans `content/docs/**/*.mdx` for:
  - markdown links: `[text](/path)`
  - JSX/HTML `href="/path"` / `href={'/path'}` / `href={"/path"}`
- Ignores:
  - anchors (`#...`)
  - `mailto:`, `tel:`
  - static assets (e.g. `/img/...`, `/static/...`)
- For each internal link:
  - If `path` is in `data/new-docs-urls.json` → OK.
  - Else, tries to resolve via `data/redirects.runtime.json`.
    - If that destination is in `new-docs-urls.json`, it is **suggested/used as a fix**.
    - Otherwise it is reported as **broken**.

### How to generate a review report

Use the report script to inspect and hand‑review the generated mappings, sorted by **lowest confidence first**:

```bash
pnpm -C anish-latest/docs-fumadocs redirects:report
```

Output:
- `reports/redirects-review.md`

Sections:
- Grouped by top‑level segment (`da`, `nexus`, `user-guides`, etc.)
- Columns: `old`, `new`, `confidence`, `reason`
- Intended workflow:
  - Review low‑confidence mappings.
  - For any that look wrong, add an explicit entry to `data/redirects.override.json`.
  - Re‑run `pnpm redirects:generate` and, optionally, `redirects:report` + tests.

