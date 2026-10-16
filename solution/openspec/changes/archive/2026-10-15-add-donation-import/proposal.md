## Why

The dashboard only shows the sample file. The coordinator needs to upload the real monthly export so the numbers are live for the client demo.

## What Changes

- Add `POST /api/import`: accepts the donations CSV, protected by a shared admin key.
- Every import replaces all previous data.
- Bad rows are skipped and counted; the import still succeeds.
- Add an import panel to the dashboard showing the result.

## Capabilities

### New Capabilities
- `import`: Uploading the donations export with an admin key.

### Modified Capabilities
<!-- none -->

## Impact

- New: `src/importer.js`, import route in `server.js`, import panel in `public/index.html`.
- Config: `ADMIN_KEY` environment variable.
- Out of scope: Excel files, import history, multiple users.
