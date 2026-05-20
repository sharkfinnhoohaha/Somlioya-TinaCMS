#!/usr/bin/env node
// Validates that every /images/... or /uploads/... path referenced in
// content/pages/*.json actually exists under public/. Run as part of the
// build to catch content/asset drift before it ships.

import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const contentDir = join(root, "content", "pages");
const publicDir = join(root, "public");

const PATH_RE = /"(\/(?:images|uploads)\/[^"]+)"/g;

async function collectRefs() {
  const refs = new Map(); // path -> Set<sourceFile>
  let entries;
  try {
    entries = await readdir(contentDir);
  } catch (err) {
    if (err.code === "ENOENT") return refs;
    throw err;
  }

  for (const name of entries) {
    if (!name.endsWith(".json")) continue;
    const file = join(contentDir, name);
    const text = await readFile(file, "utf8");
    let m;
    while ((m = PATH_RE.exec(text))) {
      const p = m[1];
      if (!refs.has(p)) refs.set(p, new Set());
      refs.get(p).add(name);
    }
  }
  return refs;
}

const refs = await collectRefs();
const missing = [];

for (const [p, sources] of refs) {
  const onDisk = join(publicDir, p);
  if (!existsSync(onDisk)) {
    missing.push({ path: p, sources: [...sources] });
    continue;
  }
  const s = await stat(onDisk);
  if (!s.isFile()) missing.push({ path: p, sources: [...sources] });
}

if (missing.length === 0) {
  console.log(`✓ content image check: ${refs.size} reference(s), all present`);
  process.exit(0);
}

console.error(`✗ content image check: ${missing.length} missing reference(s):`);
for (const { path, sources } of missing) {
  console.error(`  - ${path}  (referenced by: ${sources.join(", ")})`);
}
console.error(
  "\nFix by restoring the missing file under public/, or updating the content reference."
);
process.exit(1);
