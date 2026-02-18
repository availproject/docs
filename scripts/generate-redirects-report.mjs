import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const GENERATED_JSON_PATH = fileURLToPath(
  new URL("../data/redirects.generated.json", import.meta.url),
);
const REPORT_PATH = fileURLToPath(
  new URL("../reports/redirects-review.md", import.meta.url),
);

function sectionOf(path) {
  const seg = path.split("/").filter(Boolean)[0];
  return seg ?? "other";
}

async function main() {
  const mappings = JSON.parse(await readFile(GENERATED_JSON_PATH, "utf8"));

  const grouped = new Map();
  for (const m of mappings) {
    const section = sectionOf(m.source);
    const list = grouped.get(section) ?? [];
    list.push(m);
    grouped.set(section, list);
  }

  const sections = Array.from(grouped.keys()).sort((a, b) =>
    a.localeCompare(b),
  );

  const lines = [];
  lines.push("# Redirects review report");
  lines.push("");
  lines.push(
    "This report is generated from `data/redirects.generated.json` (lowest confidence first).",
  );
  lines.push("");
  lines.push(`Total explicit redirects: **${mappings.length}**`);
  lines.push("");

  for (const section of sections) {
    const list = grouped.get(section) ?? [];
    list.sort(
      (a, b) => a.confidence - b.confidence || a.source.localeCompare(b.source),
    );

    lines.push(`## ${section}`);
    lines.push("");
    lines.push("| old | new | confidence | reason |");
    lines.push("| --- | --- | ---------- | ------ |");
    for (const m of list) {
      const conf =
        typeof m.confidence === "number" ? m.confidence.toFixed(3) : "";
      const reason = m.reason ? String(m.reason).replaceAll("|", "\\|") : "";
      lines.push(
        `| \`${m.source}\` | \`${m.destination}\` | ${conf} | ${reason} |`,
      );
    }
    lines.push("");
  }

  await mkdir(dirname(REPORT_PATH), { recursive: true });
  await writeFile(REPORT_PATH, `${lines.join("\n")}\n`, "utf8");
  process.stdout.write(`Wrote ${REPORT_PATH}\n`);
}

await main();
