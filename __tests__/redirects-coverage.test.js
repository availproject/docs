const { readFileSync } = require("node:fs");
const { join } = require("node:path");

function normalizePath(path) {
  if (!path) return "/";
  if (path === "/") return "/";
  const stripped = path.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
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

function readJson(relPath) {
  return JSON.parse(
    readFileSync(join(__dirname, "..", relPath), { encoding: "utf8" }),
  );
}

describe("redirect coverage", () => {
  test("every old sitemap path resolves to a valid new docs route", () => {
    const oldPaths = readJson("data/old-docs-urls.json");
    const newItems = readJson("data/new-docs-urls.json");
    const runtimeRules = readJson("data/redirects.runtime.json");

    const newPathSet = new Set(newItems.map((i) => normalizePath(i.path)));

    const failures = [];
    for (const oldPath of oldPaths) {
      const destinationPath = resolveRedirectDestinationPath(
        oldPath,
        runtimeRules,
      );
      if (!destinationPath) {
        failures.push({ oldPath, reason: "no-redirect-rule" });
        continue;
      }

      if (!newPathSet.has(normalizePath(destinationPath))) {
        failures.push({
          oldPath,
          destinationPath,
          reason: "destination-not-a-known-route",
        });
      }
    }

    expect(failures).toEqual([]);
  });
});
