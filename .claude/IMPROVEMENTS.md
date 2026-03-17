# Product Improvements Tracker

> This file lives outside git — ideas stay private until approved and built.
> Run `/audit` to surface new ideas from audits. Write entries manually for product thinking.

### Workflow for agents

When working on an item from this file, **move it** between sections to reflect its current status:

1. **Starting work** → Move the item from its current section to **Working**.
2. **Finished & shipped** → Move it from Working to **Shipped**, and note the version (e.g. `(v1.3.0)`).
3. **Decided not to pursue** → Move it from any section to **De-prioritized** with a short reason in parentheses.
4. **Approved but not started yet** → Move it to **Approved (ready to build)**.

Keep the original checkbox and text intact when moving. Don't leave duplicates across sections.

---

## Users & Personas

| Persona | Who they are | What they need |
|---------|-------------|----------------|
| **Human developers** | Building on Avail DA or Nexus | Clear guides, working code samples, fast search, API reference that matches reality |
| **AI agents** | Claude, ChatGPT, Cursor, Copilot consuming docs | Structured content, consistent metadata, `llms.txt`, parseable API responses |
| **Internal team** | Maintaining and writing docs | Fast feedback loops, DX tooling, low tech debt, clear content standards |

---

## Improvement Ideas (to review together)

### For Human Developers

- [ ] **Landing page is too bare** — no hero section, value proposition, feature highlights, or quick links to popular pages (API reference, quickstart). First impression is weak.
- [ ] **Search lacks suggestions** — no autocomplete, no trending searches, no recently viewed pages. Current search is functional but bare.
- [ ] **Feedback has no backend** — the feedback component simulates a 500ms delay with no actual API. Users click thumbs up/down and nothing is recorded.
- [ ] **No guide completion tracking** — multi-part guides (deploy rollup, staking setup) have no progress indicator or "you are here" state.
- [ ] **No related articles** — page footers have prev/next but no "See also" or related content suggestions.
- [ ] **No save/bookmark feature** — developers can't bookmark important pages within the docs.
- [ ] **No personalization** — doesn't remember which product (DA/Nexus) the user last visited. Always starts from root.
- [ ] **No print-friendly mode** — TOC and navigation don't collapse for print/PDF export.

### For AI Agents

- [x] **Better `llms.txt` structure** — ~~currently a flat dump of all pages. Should be hierarchical with section headers and content summaries.~~ Shipped in v1.2.0.
- [ ] **Per-section API** — `/api/markdown` returns everything. Add `/api/markdown/da`, `/api/markdown/nexus` for targeted retrieval.
- [ ] **AI service URL generation is simplistic** — "Ask AI" button sends first 4000 chars with no smart content selection. Should prioritize code examples and key concepts.
- [ ] **No structured metadata in API responses** — markdown API doesn't include frontmatter, section hierarchy, or related pages.
- [ ] **No error tracking for broken content** — no monitoring for 404s, broken links, or API failures that affect agent consumption.

### For Internal Team (DX)

- [ ] **Search filter options hardcoded** — `search-dialog.tsx` has product filters inline instead of referencing `products.ts`.
- [ ] **Component preview system limited** — only covers 6 Nexus UI Elements. No live editor, no interaction tracking.
- [ ] **GitHub edit link assumptions** — path generation has hardcoded assumptions that may break with restructuring.
- [ ] **Case-sensitive directories** — `Optimium/`, `Validium/`, `Overview/` work on macOS but are risky on Linux CI/deploy.
- [ ] **Image with spaces in filename** — `/public/img/Screenshot 2024-04-23 at 15.35.55.png` will cause issues in some build/deploy pipelines.
- [ ] **TODO comments in content** — CDK deployment guide has 3 TODO comments (lines 181/183/185) in code blocks.


---

## Working

_Ideas currently being built._

---

## De-prioritized

_Reviewed and shelved — not worth pursuing right now._

---

## Approved (ready to build)

_Nothing yet — review ideas above together first._

---

## Shipped

- **Better `llms.txt` structure** (v1.2.0) — Split into `/llms.txt` (hierarchical nav guide, ~220 lines) and `/llms-full.txt` (full organized content, ~25K lines) following the llms.txt spec.
- **External self-links** (v1.3.0) — Replaced 11 `docs.availproject.org` links in DA content with internal `/docs/da/...` paths across 4 files (faqs, cosmos, zksync, cdk).
