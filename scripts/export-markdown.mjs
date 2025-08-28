// scripts/export-md.mjs
import fg from "fast-glob";
import { promises as fs } from "node:fs";
import path from "node:path";

const DOCS_BASE  = "app";
const ROUTE_BASE = "";

const files = await fg([`${DOCS_BASE}/**/page.mdx`, `${DOCS_BASE}/**/page.md`], {
  dot: false
});

for (const file of files) {
  // app/foo/bar/page.mdx  -> foo/bar
  // app/page.mdx          -> "" (root)
  const rel = path.relative(DOCS_BASE, file).replace(/\/page\.(mdx?|md)$/i, "");
  const isRoot = rel === "" || rel === ".";

  // Build the public URL path that should serve the markdown
  // - If docs are at /docs and this is the index page, export /docs.md
  // - If docs are at root and this is the index page, export /index.md
  const filenameForIndex = ROUTE_BASE ? `${ROUTE_BASE}.md` : "index.md";
  const outRoute = isRoot
    ? `/${filenameForIndex}`
    : (ROUTE_BASE ? `/${ROUTE_BASE}/${rel}.md` : `/${rel}.md`);

  const outPath = path.join("public", outRoute);

  await fs.mkdir(path.dirname(outPath), { recursive: true });

  // Read & lightly clean the MDX so it’s friendlier to crawlers/LLMs
  let src = await fs.readFile(file, "utf8");
  src = src
    .replace(/^\s*import\s.+$/gm, "")
    .replace(/^\s*export\s.+$/gm, "")
    .replace(/<\/?Tabs[^>]*>/g, "")
    .replace(/<\/?Tab[^>]*>/g, "")
    .trim();

  await fs.writeFile(outPath, src, "utf8");
  console.log("wrote", outRoute);
}
