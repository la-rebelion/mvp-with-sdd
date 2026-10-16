## Why

In the demo, the director asked: "who should we call first?" Inactive donors who gave the most are the best reactivation targets. The director also wants the average gift next to the totals.

## What Changes

- Add `GET /api/reactivation`: inactive donors sorted by lifetime total, with their last donation date.
- Show the reactivation list on the dashboard.
- Add an **average gift** KPI (modifies the existing KPIs requirement).

## Capabilities

### New Capabilities
- `reactivation`: Ranking inactive donors to contact first.

### Modified Capabilities
- `dashboard`: The Donor KPIs requirement gains the average gift.

## Impact

- `src/analytics.js` (new `reactivation`, `summary` gains `averageGift`), `src/app.js`, `public/index.html`.
- Out of scope: contacting donors from the app, notes, export.
