import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import fm from "front-matter";

const DOCS_ROOT = fileURLToPath(new URL("../content/docs", import.meta.url));
const OUTPUT_PATH = fileURLToPath(
  new URL("../data/new-docs-urls.json", import.meta.url),
);
const BASE_ROUTE = "/docs";

async function listFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(abs)));
      continue;
    }
    files.push(abs);
  }
  return files;
}

function toPosixPath(p) {
  return p.split(sep).join("/");
}

function toRoutePathFromMdx(absFilePath) {
  const rel = toPosixPath(relative(DOCS_ROOT, absFilePath));
  const withoutExt = rel.replace(/\.mdx$/i, "");

  const segments = withoutExt.split("/").filter(Boolean);
  if (segments.length === 0) return BASE_ROUTE;

  const last = segments[segments.length - 1];
  const routeSegments =
    last?.toLowerCase() === "index" ? segments.slice(0, -1) : segments;

  if (routeSegments.length === 0) return BASE_ROUTE;
  return `${BASE_ROUTE}/${routeSegments.join("/")}`;
}

function pickDocMetadata(raw) {
  try {
    const { attributes } = fm(raw);
    const title =
      typeof attributes?.title === "string"
        ? attributes.title.trim()
        : undefined;
    const description =
      typeof attributes?.description === "string"
        ? attributes.description.trim()
        : undefined;
    return { title, description };
  } catch {
    return { title: undefined, description: undefined };
  }
}

async function main() {
  const files = (await listFilesRecursive(DOCS_ROOT)).filter(
    (p) => extname(p).toLowerCase() === ".mdx",
  );

  const items = [];
  for (const filePath of files) {
    const raw = await readFile(filePath, "utf8");
    const { title, description } = pickDocMetadata(raw);

    items.push({
      path: toRoutePathFromMdx(filePath),
      title,
      description,
      filePath: toPosixPath(
        relative(fileURLToPath(new URL("..", import.meta.url)), filePath),
      ),
    });
  }

  const uniqueByPath = new Map();
  for (const item of items) {
    // Keep the first occurrence deterministically.
    if (!uniqueByPath.has(item.path)) uniqueByPath.set(item.path, item);
  }

  const out = Array.from(uniqueByPath.values()).sort((a, b) =>
    a.path.localeCompare(b.path),
  );

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(out, null, 2)}\n`, "utf8");

  process.stdout.write(`Wrote ${out.length} docs routes to ${OUTPUT_PATH}\n`);
}

await main();
