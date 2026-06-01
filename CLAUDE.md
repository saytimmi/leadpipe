# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

LeadPipe is a single-page marketing landing (in Russian) for a WhatsApp lead-handling bot, plus a self-built analytics + reporting layer. The site tracks visitor behavior into Neon Postgres and pushes both lead submissions and aggregated reports into Telegram.

## Commands

```bash
npm run dev      # next dev (defaults to port 3000)
npm run build    # next build — run before considering a change done; catches type errors
npm run start    # serve production build
npm run lint     # eslint (next core-web-vitals + typescript configs)
node test-mobile.mjs   # Playwright screenshot walkthrough on iPhone 14 viewport
```

There is no unit test suite. `test-mobile.mjs` is a manual Playwright script that drives an iPhone-14 viewport and dumps screenshots to `/tmp`. **It expects the app on `http://localhost:3999`**, not the default dev port — start the dev server on that port (e.g. `next dev -p 3999`) before running it.

## Architecture

Next.js 16 App Router, React 19, Tailwind CSS 4, deployed on Vercel. Path alias `@/*` → `src/*`.

### The landing page
`src/app/page.tsx` composes the page from section components in `src/components/`. Each visual section is wrapped in `<SectionTracker name="...">`, which is what feeds the analytics funnel. The section `name` strings (`hero`, `story`, `problem`, `solution`, `visibility`, `proof`, `form`) are the canonical section identifiers — they flow through to the DB and into the Telegram reports, so keep them consistent if you rename or reorder sections. Lead capture is a multi-step form in `FormModal` / `FormSection`.

### Analytics pipeline (the core non-obvious system)
Three layers, all custom (Vercel Analytics is also loaded in `layout.tsx`, but the homegrown pipeline below is separate and drives the reports):

1. **Client tracking** — `src/lib/analytics.ts`. A per-tab session id is stored in `sessionStorage` (`lp_sid`). All four `track*` helpers POST through one `send()` wrapper that swallows every error: **analytics must never break the site**, so failures are silently ignored by design. UTM params are read from the URL.
2. **Ingest API** — `src/app/api/analytics/{pageview,section,section-time,form}/route.ts`. Thin POST handlers that insert directly into Postgres. `pageview` enriches with `x-vercel-ip-country` from request headers.
3. **Reporting** — `src/lib/digest.ts` is the heavy lifter: it queries the three tables, computes unique-session reach per section, the form funnel, and renders text reports with Unicode bar charts (`▓`/`░`) for Telegram. `stats/route.ts` returns the same kind of aggregation as JSON for the `/stats` page.

### Database
`src/lib/db.ts` exports a single `sql` tag backed by `@neondatabase/serverless` (`neon(process.env.DATABASE_URL!)`). All queries are written inline as tagged-template literals — there is no ORM and no migrations folder; the schema lives only in Neon. Three tables, all prefixed `lp_`:
- `lp_page_views` — `session_id, referrer, utm_source/medium/campaign, user_agent, country, created_at`
- `lp_section_views` — `session_id, section, time_spent_ms, created_at` (section reach AND dwell time both land here)
- `lp_form_events` — `session_id, event, step_name, value, created_at` (funnel steps `open` → `step_1..8` → `submit`/`disqualified`)

### Telegram integration
- `src/lib/telegram.ts` — formats and sends a lead submission. `src/app/api/submit/route.ts` is the form's POST target.
- `src/app/api/telegram/webhook/route.ts` — the bot's command handler (`/today`, `/stats [7|30]`, `/leads [N]`, `/funnel`). Commands are matched both bare and with the bot suffix (`@zayavkidlzLeadbot`); all report text comes from `digest.ts`.
- `src/app/api/analytics/digest/route.ts` — a Vercel cron endpoint (`vercel.json`, daily `0 9 * * *`) that sends the daily digest. Authenticated via `Authorization: Bearer ${CRON_SECRET}`.

### Timezone convention
Reports are computed in **Shenzhen time (UTC+8)** — `digest.ts` does manual offset math (`TZ_OFFSET_HOURS = 8`) because `created_at` is stored in UTC. Reuse those helpers rather than re-deriving "today" boundaries.

### Auth on read endpoints
- `/api/analytics/stats` requires header `x-stats-key` matching `STATS_SECRET` (falls back to a hardcoded default if unset).
- `/api/analytics/digest` requires the `CRON_SECRET` bearer token.

## Conventions

- New analytics events: add a `track*` helper in `lib/analytics.ts`, a matching `route.ts` under `api/analytics/`, and surface it in `digest.ts`/`stats` if it should appear in reports — the pipeline is only useful end-to-end.
- API routes return `NextResponse.json({ ok: true })` on success and `{ error }` with an explicit status on failure.
- UI text and report labels are in Russian; match the existing tone.

## Environment

Copy `.env.example`. Required: `DATABASE_URL` (Neon), `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `STATS_SECRET`, `CRON_SECRET`.

## Docs

`docs/superpowers/` holds the original design specs and build plans for the landing (Markdown). Useful background for intent behind the page structure; not load-bearing for the code.
