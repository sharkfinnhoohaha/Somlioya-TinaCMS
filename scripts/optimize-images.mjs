#!/usr/bin/env node
// Image pipeline for the public media library.
//
// 1. Recompresses oversized JPEGs in place (bounded to MAX_DIMENSION on the
//    long edge, mozjpeg quality RECOMPRESS_QUALITY). Only rewrites a file when
//    it saves at least MIN_SAVINGS — originals stay in git history.
// 2. Regenerates lib/blur-data.json: a tiny base64 preview for every image,
//    used by SafeImage as a next/image blurDataURL so heroes fade in from a
//    soft preview instead of a hard pop.
//
// Run manually after adding new images:  npm run optimize:images

import { readdir, readFile, writeFile, stat, rename } from "node:fs/promises";
import { join, resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = join(root, "public");
const blurMapPath = join(root, "lib", "blur-data.json");

const IMAGE_DIRS = ["images", "uploads"];
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;
const MAX_DIMENSION = 2560;
const RECOMPRESS_QUALITY = 82;
const RECOMPRESS_MIN_BYTES = 300 * 1024;
const MIN_SAVINGS = 0.2;
const BLUR_WIDTH = 16;

async function* walkImages() {
  for (const dir of IMAGE_DIRS) {
    let entries;
    try {
      entries = await readdir(join(publicDir, dir));
    } catch {
      continue;
    }
    for (const name of entries) {
      if (IMAGE_EXT.test(name)) yield { webPath: `/${dir}/${name}`, diskPath: join(publicDir, dir, name) };
    }
  }
}

async function recompress(diskPath) {
  const before = (await stat(diskPath)).size;
  if (before < RECOMPRESS_MIN_BYTES || !/\.jpe?g$/i.test(extname(diskPath))) return null;

  const image = sharp(await readFile(diskPath)).rotate(); // bake in EXIF orientation
  const meta = await image.metadata();
  const buf = await image
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: RECOMPRESS_QUALITY, mozjpeg: true })
    .toBuffer();

  if (buf.length > before * (1 - MIN_SAVINGS)) return null;

  const tmp = `${diskPath}.tmp`;
  await writeFile(tmp, buf);
  await rename(tmp, diskPath);
  return { before, after: buf.length, wasWidth: meta.width, wasHeight: meta.height };
}

async function blurDataURL(diskPath) {
  const buf = await sharp(await readFile(diskPath))
    .rotate()
    .resize(BLUR_WIDTH)
    .webp({ quality: 30 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

const blurMap = {};
let savedTotal = 0;

for await (const { webPath, diskPath } of walkImages()) {
  const result = await recompress(diskPath).catch((err) => {
    console.warn(`  ! could not recompress ${webPath}: ${err.message}`);
    return null;
  });
  if (result) {
    savedTotal += result.before - result.after;
    console.log(
      `  ✓ ${webPath}: ${(result.before / 1024 / 1024).toFixed(1)}MB → ${(result.after / 1024 / 1024).toFixed(1)}MB`
    );
  }
  try {
    blurMap[webPath] = await blurDataURL(diskPath);
  } catch (err) {
    console.warn(`  ! could not generate blur for ${webPath}: ${err.message}`);
  }
}

await writeFile(blurMapPath, JSON.stringify(blurMap, null, 2) + "\n");
console.log(
  `✓ blur placeholders for ${Object.keys(blurMap).length} image(s); ` +
    `recompression saved ${(savedTotal / 1024 / 1024).toFixed(1)}MB`
);
