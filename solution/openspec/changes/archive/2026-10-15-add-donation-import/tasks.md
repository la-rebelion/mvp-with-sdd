## 1. Importer

- [x] 1.1 Create `src/importer.js` with `importDonations(csvText)` returning rows and stats
- [x] 1.2 Skip and count rows with an empty donor or non-numeric amount
- [x] 1.3 Unit tests in `test/importer.test.js` for the replace, skip, and stats scenarios

## 2. API

- [x] 2.1 Add `POST /api/import` with the `X-Admin-Key` check (401) and the data swap
- [x] 2.2 Test the 401 path with a small integration test

## 3. Page

- [x] 3.1 Add the import panel (file picker, admin key, result) and refresh the dashboard after success
