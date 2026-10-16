## Decisions

- `reactivation(rows)` groups by donor, keeps inactive ones, sums totals, keeps the latest date, sorts by total descending.
- `summary(rows)` adds `averageGift` (0 when there are no donations).
- The dashboard gets a fourth KPI card and a "Call first" table under the trend.
