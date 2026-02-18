import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ROOT = fileURLToPath(new URL("../content/docs", import.meta.url));
const PROJECT_ROOT = fileURLToPath(new URL("..", import.meta.url));

function toPosixPath(p) {
  return p.split(sep).join("/");
}

function normalizePath(path) {
  if (!path) return "/";
  if (path === "/") return "/";
  const stripped = path.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

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

function extractInternalLinks(raw) {
  const results = [];

  // Markdown links: [text](/path)
  const mdLinkRe = /\]\((\/[^)\s]+)\)/g;
  for (let m = mdLinkRe.exec(raw); m; m = mdLinkRe.exec(raw)) {
    results.push({ href: m[1], kind: "md" });
  }

  // href="..." and href='...'
  const hrefAttrRe = /\bhref\s*=\s*["']([^"']+)["']/g;
  for (let m = hrefAttrRe.exec(raw); m; m = hrefAttrRe.exec(raw)) {
    results.push({ href: m[1], kind: "attr" });
  }

  // href={"/path"} / href={'/path'}
  const hrefExprRe = /\bhref\s*=\s*\{\s*["']([^"']+)["']\s*\}/g;
  for (let m = hrefExprRe.exec(raw); m; m = hrefExprRe.exec(raw)) {
    results.push({ href: m[1], kind: "expr" });
  }

  return results;
}

function resolveRedirectDestinationPath(pathname, rules) {
  const normalizedRules = rules
    .map((r) => ({ ...r, _src: normalizePath(r.source) }))
    .sort((a, b) => b._src.length - a._src.length);

  const pathsToCheck = [
    pathname,
    `/docs${pathname}`,
    normalizePath(pathname),
    normalizePath(`/docs${pathname}`),
  ];

  for (const candidate of pathsToCheck) {
    const path = normalizePath(candidate);
    const best = normalizedRules.find(
      ({ _src }) => path === _src || path.startsWith(`${_src}/`),
    );
    if (!best) continue;
    const suffix = path.slice(best._src.length);
    return normalizePath(best.destination) + suffix;
  }

  return null;
}

function parseDocsHrefToPath(href) {
  if (!href) return null;
  if (href.startsWith("#")) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return null;

  // Treat known static asset locations as non-route links.
  if (href.startsWith("/img/") || href.startsWith("/static/")) return null;

  if (href.startsWith("http://") || href.startsWith("https://")) {
    try {
      const url = new URL(href);
      if (url.hostname !== "docs.availproject.org") return null;
      return normalizePath(url.pathname);
    } catch {
      return null;
    }
  }

  if (!href.startsWith("/")) return null;
  return normalizePath(href.split("#")[0].split("?")[0]);
}

async function main() {
  const shouldFix = process.argv.includes("--fix");

  const newItems = JSON.parse(
    await readFile(join(PROJECT_ROOT, "data/new-docs-urls.json"), "utf8"),
  );
  const runtimeRules = JSON.parse(
    await readFile(join(PROJECT_ROOT, "data/redirects.runtime.json"), "utf8"),
  );

  const newPathSet = new Set(newItems.map((i) => normalizePath(i.path)));

  const mdxFiles = (await listFilesRecursive(DOCS_ROOT)).filter(
    (p) => extname(p).toLowerCase() === ".mdx",
  );

  const broken = [];
  const needsUpdate = [];

  for (const absPath of mdxFiles) {
    const before = await readFile(absPath, "utf8");
    const refs = extractInternalLinks(before);

    let after = before;
    for (const { href } of refs) {
      const path = parseDocsHrefToPath(href);
      if (!path) continue;

      if (newPathSet.has(path)) continue;

      const redirected = resolveRedirectDestinationPath(path, runtimeRules);
      if (redirected && newPathSet.has(redirected)) {
        needsUpdate.push({
          file: toPosixPath(relative(PROJECT_ROOT, absPath)),
          from: path,
          to: redirected,
        });
        if (shouldFix) {
          // Best-effort string replacement; we keep the original link syntax intact.
          after = after.split(href).join(href.replace(path, redirected));
        }
        continue;
      }

      broken.push({
        file: toPosixPath(relative(PROJECT_ROOT, absPath)),
        href,
      });
    }

    if (shouldFix && after !== before) {
      await writeFile(absPath, after, "utf8");
    }
  }

  process.stdout.write(
    `MDX link check: ${mdxFiles.length} files, ${needsUpdate.length} need update, ${broken.length} broken.\n`,
  );

  if (broken.length > 0) {
    process.stdout.write(
      `${broken
        .slice(0, 50)
        .map((b) => `- ${b.file}: ${b.href}`)
        .join("\n")}\n`,
    );
    process.exitCode = 1;
  }
}

await main();
