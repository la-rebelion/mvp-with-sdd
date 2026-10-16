# Rebel-I ONG — Donor Dashboard MVP Plan

> Course note: this is the anonymized, trimmed-down plan used in the hands-on project.
> It keeps the shape of a real pre-sale plan (summary, scope, API, screens, tests,
> assumptions) without client details.

## Summary

Rebel-I ONG tracks its donors and donations in a spreadsheet that one person
updates by hand. Nobody can answer "how much did we raise this month?" or "who
stopped giving?" without an afternoon of copy-paste.

The MVP replaces that with a small web app: upload the donations export, see the
dashboard. We will demo it to the client in the pre-sale meeting and iterate on
their feedback.

## Scope (MVP)

- **Dashboard**: KPI strip (active donors, inactive donors, total donated) and a
  month-by-month donations trend.
- **Import**: upload a CSV export of donations. Each import **replaces** all data
  (versioning comes later). A shared admin key protects the upload.
- **Reactivation list** (stretch): inactive donors sorted by how much they gave.

Out of scope for the MVP: user accounts, editing donors in the app, emails,
multi-currency, charts beyond the monthly trend.

## API

- `GET /api/summary` — KPI totals.
- `GET /api/donations-monthly` — totals and counts per month (`YYYY-MM`).
- `POST /api/import` — CSV body, requires header `X-Admin-Key`; returns import stats.
- `GET /api/reactivation` — (stretch) inactive donors by lifetime value.

## Screens

- **Dashboard `/`** — KPI cards, monthly trend bars, program ranking.
- **Import panel** (same page) — file picker, admin key field, result stats.

## Data (CSV export, one row per donation)

`donor, status, date, amount, type, program`

- `status`: `active` | `inactive`
- `type`: `cash` | `transfer` | `card` | `in-kind`
- `program`: `Food Bank` | `Education` | `Health`

## Tech choices (kept tiny on purpose)

- Node.js 20.19+ only, no frameworks, no database: data lives in memory and is
  seeded from `data/donations.csv`.
- Business rules are pure functions in `src/`, tested with `node --test`.

## Test plan

- Unit tests for every scenario in the specs.
- `POST /api/import` without a valid key answers 401.
- After an import, `/api/summary` reflects the uploaded file; a second import
  replaces the first (no duplicates).
- Manual smoke test: start the server, open the dashboard, import the sample CSV.

## Assumptions

- One shared admin key is enough for the demo.
- Amounts are in a single currency.
- Rows with a missing donor or a non-numeric amount are skipped and counted, never
  abort the import.
