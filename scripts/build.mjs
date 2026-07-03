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

// Tina Cloud is active when both credentials are present. On Vercel production
// these are set as env vars (NEXT_PUBLIC_TINA_CLIENT_ID + TINA_TOKEN), which
// makes `tinacms build` generate an admin client that points at Tina Cloud so
// the client can log in and save edits. With no creds (local dev / a fresh
// project) we fall back to a local build so the site still ships with content.
const hasTinaCloudCreds = Boolean(
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN
);

// Run a command. Returns its exit status; only exits the process itself when
// `fatal` is true (default). A non-fatal run lets the caller recover.
function run(label, command, args, { env = {}, fatal = true } = {}) {
  console.log(`\n▸ ${label}: ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...env },
  });
  const status = result.status ?? 1;
  if (status !== 0) {
    console.error(`✗ ${label} failed (exit code ${result.status ?? "unknown"})`);
    if (fatal) process.exit(status);
  }
  return status;
}

// --skip-indexing avoids the long-running local file-indexing step that spins
// up a datalayer server and can hang in CI/serverless build environments with
// limited wall-clock time. The generated client and admin assets are still
// produced; content is served from content/pages/*.json at runtime anyway.
const localTinaArgs = ["tinacms", "build", "--local", "--skip-cloud-checks", "--skip-indexing"];

if (hasTinaCloudCreds) {
  console.log(
    "✔ Tina Cloud credentials detected — building the admin against Tina " +
      "Cloud so /admin can log in and save edits in production."
  );
  // Cloud checks stay ON so an invalid or expired project is caught here. If
  // the cloud build fails (e.g. the Tina Cloud project was deleted or the
  // token is stale) we DON'T fail the whole deployment — we fall back to a
  // local build so the public site still ships. Editing won't work until
  // valid credentials are set, but the warning below makes that obvious.
  const status = run("TinaCMS build (Tina Cloud)", "npx", ["tinacms", "build"], { fatal: false });
  if (status !== 0) {
    console.warn(
      "\n⚠ Tina Cloud build failed with the configured NEXT_PUBLIC_TINA_CLIENT_ID / " +
        "TINA_TOKEN. This usually means the project id/token is wrong or the Tina " +
        "Cloud project no longer exists. Falling back to a LOCAL build so the site " +
        "still deploys — but the /admin editor will NOT be able to save until valid " +
        "Tina Cloud credentials are set in the environment. See ADMIN_FIX.md."
    );
    run("TinaCMS build (local fallback)", "npx", localTinaArgs);
  }
} else {
  console.log(
    "ℹ NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN not set — building the local " +
      "Tina client. Content is served from content/pages/*.json; the /admin " +
      "UI requires Tina Cloud credentials to edit in production."
  );
  run("TinaCMS build", "npx", localTinaArgs);
}

run("Next.js build", "npx", ["next", "build"], { env: { NODE_ENV: "production" } });
