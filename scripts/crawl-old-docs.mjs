import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

function extractLocsFromXml(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  for (let match = re.exec(xml); match; match = re.exec(xml)) {
    locs.push(match[1] ?? "");
  }
  return locs.map((s) => s.trim()).filter(Boolean);
}

function isSitemapIndex(xml) {
  return /<sitemapindex[\s>]/i.test(xml);
}

function normalizeToPath(urlOrPath) {
  try {
    const url = urlOrPath.startsWith("http")
      ? new URL(urlOrPath)
      : new URL(urlOrPath, "https://docs.availproject.org");
    const path = url.pathname.replace(/\/+$/, "");
    return path === "" ? "/" : path;
  } catch {
    return null;
  }
}

function isProbablyAssetPath(path) {
  return (
    path.startsWith("/_next/") ||
    /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|mjs|map|txt|xml)$/i.test(path)
  );
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "avail-docs-redirects-crawler/1.0" },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

async function crawlSitemaps(rootSitemapUrl) {
  const seenSitemaps = new Set();
  const sitemapQueue = [rootSitemapUrl];
  const discoveredPageUrls = [];

  while (sitemapQueue.length > 0) {
    const current = sitemapQueue.shift();
    if (!current || seenSitemaps.has(current)) continue;
    seenSitemaps.add(current);

    const xml = await fetchText(current);
    const locs = extractLocsFromXml(xml);

    if (isSitemapIndex(xml)) {
      for (const loc of locs) {
        if (!loc.startsWith("https://docs.availproject.org/")) continue;
        sitemapQueue.push(loc);
      }
      continue;
    }

    for (const loc of locs) {
      if (!loc.startsWith("https://docs.availproject.org/")) continue;
      discoveredPageUrls.push(loc);
    }
  }

  return discoveredPageUrls;
}

async function main() {
  const rootSitemapUrl =
    process.env.OLD_DOCS_SITEMAP_URL ??
    "https://docs.availproject.org/sitemap.xml";

  const outputPath =
    process.env.OLD_DOCS_URLS_OUTPUT ??
    fileURLToPath(new URL("../data/old-docs-urls.json", import.meta.url));

  const pageUrls = await crawlSitemaps(rootSitemapUrl);
  const normalizedPaths = pageUrls
    .map(normalizeToPath)
    .filter(Boolean)
    .filter((p) => !isProbablyAssetPath(p));

  const uniqueSorted = Array.from(new Set(normalizedPaths)).sort((a, b) =>
    a.localeCompare(b),
  );

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(uniqueSorted, null, 2)}\n`, {
    encoding: "utf8",
  });

  process.stdout.write(
    `Wrote ${uniqueSorted.length} paths to ${outputPath} (from ${pageUrls.length} sitemap URLs)\n`,
  );
}

await main();
