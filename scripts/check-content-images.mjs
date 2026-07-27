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
  const contentDirs = [contentDir, join(contentDir, "no")];

  for (const dir of contentDirs) {
    let entries;
    try {
      entries = await readdir(dir);
    } catch (err) {
      if (err.code === "ENOENT") continue;
      throw err;
    }

    for (const name of entries) {
      if (!name.endsWith(".json")) continue;
      const file = join(dir, name);
      const text = await readFile(file, "utf8");
      let m;
      while ((m = PATH_RE.exec(text))) {
        const p = m[1];
        if (!refs.has(p)) refs.set(p, new Set());
        refs.get(p).add(name);
      }
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

// A missing path whose file exists elsewhere under public/ almost always means
// the content references the wrong folder rather than a genuinely lost asset —
// most often because tina/config.ts `media.tina.mediaRoot` points at a folder
// the photo library doesn't live in, so Tina re-prefixed every image field on
// save. Surface the real file so the cause is obvious from the build log.
async function findByBasename(basename) {
  const found = [];
  async function walk(dir, rel) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name === "admin" || e.name.startsWith(".")) continue;
      const abs = join(dir, e.name);
      if (e.isDirectory()) await walk(abs, `${rel}/${e.name}`);
      else if (e.name === basename) found.push(`${rel}/${e.name}`);
    }
  }
  await walk(publicDir, "");
  return found;
}

console.error(`✗ content image check: ${missing.length} missing reference(s):`);
let anyRelocated = false;
for (const { path, sources } of missing) {
  console.error(`  - ${path}  (referenced by: ${sources.join(", ")})`);
  const basename = path.split("/").pop();
  const elsewhere = await findByBasename(basename);
  if (elsewhere.length > 0) {
    anyRelocated = true;
    console.error(`      ↳ but this file exists at: ${elsewhere.join(", ")}`);
  }
}
if (anyRelocated) {
  console.error(
    "\nThe files above exist under a different folder than the content points at.\n" +
      "Check that `media.tina.mediaRoot` in tina/config.ts matches the folder the\n" +
      "photo library actually lives in — a mismatch makes TinaCMS rewrite every\n" +
      "image path on save, which fails this check and blocks all later deploys."
  );
}
console.error(
  "\nFix by restoring the missing file under public/, or updating the content reference."
);
process.exit(1);
