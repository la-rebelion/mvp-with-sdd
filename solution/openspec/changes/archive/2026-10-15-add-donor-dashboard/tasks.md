## 1. Data

- [x] 1.1 Create `data/donations.csv` with 12+ sample rows across 3 months and 3 programs
- [x] 1.2 Create `src/csv.js` with `parseCsv(text)` returning objects keyed by header

## 2. Analytics

- [x] 2.1 Create `src/analytics.js` with `summary(rows)` (active, inactive, total)
- [x] 2.2 Add `monthly(rows)` (total + count per month, oldest first)
- [x] 2.3 Add `programRanking(rows)` (highest total first)
- [x] 2.4 Unit tests in `test/analytics.test.js` for every scenario in the spec

## 3. API

- [x] 3.1 Create `server.js` serving `GET /api/summary` and `GET /api/donations-monthly`
- [x] 3.2 Add `GET /api/programs` and serve `public/index.html` at `/`

## 4. Page

- [x] 4.1 Create `public/index.html` with KPI cards, monthly bars, and program ranking
