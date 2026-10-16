## Decisions

- `src/importer.js` exports `importDonations(csvText)` → `{ rows, stats }`; it is pure and never throws for bad rows.
- The key check lives in `server.js` (HTTP concern): compare `X-Admin-Key` with `process.env.ADMIN_KEY`; if `ADMIN_KEY` is unset, imports are disabled (401) rather than open.
- The request body is the raw CSV text (`Content-Type: text/csv`).
- On success the server swaps the in-memory `rows` in one assignment, so readers never see a half-imported state.
