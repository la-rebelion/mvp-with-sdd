## Context

Pre-sale MVP. It must start with one command on any machine with Node.js.

## Decisions

- `src/csv.js` parses the simple export (comma-separated, header row, no quoted commas). Good enough for the demo file; a real parser is a later change.
- `src/analytics.js` holds pure functions: `summary(rows)`, `monthly(rows)`, `programRanking(rows)`.
- A donor's status comes from their row; donors are keyed by trimmed name.
- `server.js` uses `node:http`, keeps rows in memory, and serves `public/index.html` plus JSON endpoints.
- The page draws the trend as plain CSS bars — no chart library.

## Risks / Trade-offs

- Same-name donors merge → acceptable for the demo; IDs come with the real export.
