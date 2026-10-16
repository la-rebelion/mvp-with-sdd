## Why

Rebel-I ONG answers "how much did we raise?" by hand in a spreadsheet. A dashboard with the key numbers is the first thing the director wants to see in the pre-sale demo.

## What Changes

- Load the donations export (`data/donations.csv`) at startup.
- Show KPI cards: active donors, inactive donors, total donated.
- Show the monthly trend (total and count per month) and the program ranking.

## Capabilities

### New Capabilities
- `dashboard`: Donor KPIs, monthly trend, and program ranking.

### Modified Capabilities
<!-- none -->

## Impact

- New: `src/csv.js`, `src/analytics.js`, `server.js`, `public/index.html`, `data/donations.csv`.
- Out of scope: importing new files (next change), reactivation list, charts beyond the monthly bars.
