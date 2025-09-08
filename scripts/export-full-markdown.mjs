// scripts/generate-llms-full.mjs
import fg from "fast-glob";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Where to scan for docs pages.
 * Keep using page.mdx/page.md so we only ingest real routes (not partial MDX fragments).
 */
const DOCS_BASE = "app";

/**
 * Output file name in /public.
 * Default is "llms-full.txt". If you really want it at /llms.txt, set:
 *   const OUTPUT_BASENAME = "llms.txt"
 */
const OUTPUT_BASENAME = process.env.LLMS_FULL_BASENAME || "llms-full.txt";
const OUT_PATH = path.join("public", OUTPUT_BASENAME);

/** Separator line between files */
const SEPARATOR = "\n-------------------------------------------------------------------------------\n\n";

/** 1) Collect all page MDX/MD files deterministically */
const patterns = [`${DOCS_BASE}/**/page.mdx`, `${DOCS_BASE}/**/page.md`];
const files = (await fg(patterns, { dot: false })).sort((a, b) => a.localeCompare(b));

/** 2) Read, clean lightly, and concatenate */
const chunks = [];
for (const file of files) {
  let src = await fs.readFile(file, "utf8");
  src = cleanMDX(src);
  chunks.push(src);
}

/** 3) Write the single big file to /public */
await fs.mkdir("public", { recursive: true });
const concatenated = (chunks.join(SEPARATOR)).trim() + "\n";
await fs.writeFile(OUT_PATH, concatenated, "utf8");
console.log(`wrote /${OUTPUT_BASENAME} with ${files.length} files, ${concatenated.length} bytes`);

/** Minimal MDX → MD cleanup so the output stays readable */
function cleanMDX(src) {
  return src
    // strip MDX imports/exports (noise for LLMs)
    .replace(/^\s*import\s.+$/gm, "")
    .replace(/^\s*export\s.+$/gm, "")
    // strip common MDX UI components if you use them
    .replace(/<\/?Tabs[^>]*>/g, "")
    .replace(/<\/?Tab[^>]*>/g, "")
    .trim();
}