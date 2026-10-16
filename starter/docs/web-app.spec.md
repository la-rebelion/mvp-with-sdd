# Rebel-I ONG — Donor Dashboard: Product Spec (brief)

> Course note: this is the client-facing brief we bring into OpenSpec. It is
> written in plain language. OpenSpec turns each feature into a change with
> testable requirements and scenarios.

## Who uses it

- **Coordinator** — uploads the monthly donations export.
- **Director** — opens the dashboard before board meetings.

## Features

### 1. Donor dashboard

- Shows how many donors are **active** and **inactive**.
- Shows the **total donated**.
- Shows a **monthly trend**: total amount and number of donations per month,
  oldest month first.
- Shows the **program ranking**: total per program, highest first.

### 2. Donations import

- The coordinator uploads the CSV export.
- The upload requires the **admin key**; without it nothing changes.
- Every import **replaces** the previous data.
- Bad rows (missing donor, amount that is not a number) are **skipped and
  counted**; the import still succeeds.
- The result shows: donors loaded, donations loaded, rows skipped.

### 3. Reactivation list (stretch)

- Lists **inactive** donors, the ones who gave the most first.
- Shows each donor's lifetime total and last donation date.
- The dashboard also shows the **average gift**.

## Success for the demo

The director uploads last year's export and, in under a minute, sees the totals,
the trend, and who to call first.
