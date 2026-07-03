#!/usr/bin/env node
// Production build orchestrator.
//
// Runs `tinacms build` and `next build` as two sequential steps instead of
// letting tinacms wrap next via `-c`. Two reasons:
//
// 1. Credentials — with no Tina Cloud clientId/token configured (e.g. a fresh
//    Vercel project before env vars are set), `tinacms build` fails during
//    client codegen even with --skip-cloud-checks. Falling back to --local
//    builds the local client; the pages already fall back to reading the
//    content JSON from disk, so the site still ships with full content.
//
// 2. NODE_ENV — `tinacms build` sets NODE_ENV=development in its own process,
//    which a `-c "next build"` subprocess inherits. Next 16 then builds React
//    in an inconsistent dev/prod mix and crashes while prerendering its
//    internal error pages. Running next in a separate step with
//    NODE_ENV=production avoids this entirely.

import { spawnSync } from "node:child_process";

const hasTinaCloudCreds = Boolean(
  process.env.TINA_CLOUD_ACTIVE === "true" &&
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN
);

function run(label, command, args, env = {}) {
  console.log(`\n▸ ${label}: ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    console.error(`✗ ${label} failed (exit code ${result.status ?? "unknown"})`);
    process.exit(result.status ?? 1);
  }
}

const tinaArgs = ["tinacms", "build", "--skip-cloud-checks"];
if (!hasTinaCloudCreds) {
  console.log(
    "ℹ NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN not set — building the local " +
      "Tina client. Content is served from content/pages/*.json; the /admin " +
      "UI requires Tina Cloud credentials to edit in production."
  );
  tinaArgs.push("--local");
}

run("TinaCMS build", "npx", tinaArgs);
run("Next.js build", "npx", ["next", "build"], { NODE_ENV: "production" });
