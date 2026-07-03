# TinaCMS Admin Login Fix — Diagnosis & Instructions

## Summary

The `/admin` panel is **not broken in the code**. The TinaCMS config, admin route,
proxy.ts, and build pipeline are all correctly configured. The issue is that
**Vercel Deployment Protection (SSO) is enabled** on the project, which intercepts
every route — including `/admin` — with a `302 → vercel.com/sso-api` redirect
before Next.js ever runs.

## What I Found

### 1. Vercel SSO is blocking everything (root cause)

```
$ curl -D - https://...vercel.app/admin
HTTP/2 302
location: https://vercel.com/sso-api?url=...%2Fadmin&nonce=...
```

The **entire site** (not just `/admin`) returns a 302 to `vercel.com/sso-api → vercel.com/login`.
This is Vercel's "Deployment Protection" / SSO feature, enabled at the **project level**
in the Vercel dashboard. It is not a code issue and cannot be fixed by pushing code.

### 2. TinaCMS config is correct

- `tina/config.ts` — properly defines 14 collections (7 EN + 7 NO), correct `build.outputFolder: "admin"`, `publicFolder: "public"`
- `proxy.ts` — correctly uses Next.js 16 `proxy` convention (replaces deprecated `middleware.ts`), protects `/admin` with HTTP Basic auth when `ADMIN_PASSWORD` is set
- `public/admin/.gitignore` — correctly ignores generated `index.html` and `assets/` (regenerated at build time)
- `scripts/build.mjs` — correctly falls back to `--local` build when Tina Cloud creds are absent

### 3. Build was hanging (fixed)

The `tinacms build --local` command was hanging because the local file-indexing step
spins up a datalayer server on port 9000 that never exits in CI/serverless environments.
**Fixed** by adding `--skip-indexing` to the local build path. The admin HTML, GraphQL
client, and TypeScript types are still generated — only the long-running file index
is skipped (content is served from JSON files at runtime anyway).

### 4. Tina Cloud credentials are NOT set in Vercel env vars

The `.env.example` documents the required vars:
- `NEXT_PUBLIC_TINA_CLIENT_ID` — public, sent to browser
- `TINA_TOKEN` — secret read/write token

Without these, the admin UI loads but **cannot connect to Tina Cloud** for
editing. The build falls back to `--local` mode, which generates the admin
HTML but the editor won't be able to save changes.

### 5. GraphQL error from before

The "Unexpected error querying context. Syntax error: unexpected <eof>" error
was a symptom of the build hanging/timing out during `tinacms build --local`
without `--skip-indexing`. The datalayer server would start but never complete
indexing, producing empty/malformed GraphQL responses. The `--skip-indexing`
fix resolves this.

## What I Fixed (pushed to main)

- **`scripts/build.mjs`** — Added `--skip-indexing` flag to the local TinaCMS
  build path to prevent the datalayer server from hanging in CI/Vercel builds.

## What Finn Needs to Do (manual — cannot be done from code)

### Step 1: Disable Vercel Deployment Protection (fixes the immediate login issue)

This is what's blocking `/admin` — and the entire site:

1. Go to **https://vercel.com/sharkfinnhoohahas-projects/somlioya-tinacms**
2. Click **Settings** → **Deployment Protection**
3. Set **Vercel Authentication** to **"Disabled"** (or "Production Deployment" if you want protection on preview deployments only)
4. Redeploy (push any commit or click "Redeploy" in the Deployments tab)

After this, `https://...vercel.app/admin` will serve the TinaCMS admin HTML
instead of redirecting to Vercel's SSO login.

### Step 2: Set Tina Cloud environment variables (enables editing in admin)

1. Go to **https://app.tina.io** → your project → **Settings**
2. Find your **Client ID** and generate a **Read/Write Token**
3. Go to **Vercel** → your project → **Settings** → **Environment Variables**
4. Add these two variables (for **Production** environment):

   | Name | Value | Environment |
   |------|-------|------------|
   | `NEXT_PUBLIC_TINA_CLIENT_ID` | `your-client-id-from-tina` | Production |
   | `TINA_TOKEN` | `your-read-write-token-from-tina` | Production |

5. **Redeploy** the project (the build will pick up the new env vars and build
   with Tina Cloud mode instead of `--local`)

### Step 3 (optional): Set ADMIN_PASSWORD for Basic Auth protection

Once Vercel SSO is disabled, the admin is open by default. To protect it:

1. In Vercel → Settings → Environment Variables, add:

   | Name | Value | Environment |
   |------|-------|------------|
   | `ADMIN_PASSWORD` | `your-chosen-password` | Production |

2. Redeploy. The admin will then require HTTP Basic auth (username: `admin`).

### Step 4: Verify

After redeploying:
- `https://...vercel.app/` should show the Sømliøya homepage
- `https://...vercel.app/admin` should show the TinaCMS editor UI
- If Tina Cloud creds are set, you can log in and edit content
- If Tina Cloud creds are NOT set, the admin loads but shows an error when trying to edit — content is still served correctly from JSON files

## Architecture Notes

- Content lives in `content/pages/*.json` (EN) and `content/pages/no/*.json` (NO)
- Pages read content via filesystem (`tina/lib/client.ts`) with a GraphQL client fallback
- The admin UI is a static SPA generated by `tinacms build` into `public/admin/`
- `proxy.ts` (Next.js 16 replacement for `middleware.ts`) optionally guards `/admin` with Basic auth