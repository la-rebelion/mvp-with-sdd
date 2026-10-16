// Dashboard rules — see openspec/specs/dashboard/spec.md
// Rows look like { donor, status, date: 'YYYY-MM-DD', amount: number, type, program }.

const round = (n) => Math.round(n * 100) / 100;

/** Active and inactive donors (each donor counted once by name), total donated, and average gift. */
export function summary(rows) {
  const status = new Map(rows.map((row) => [row.donor, row.status]));
  const statuses = [...status.values()];
  return {
    activeDonors: statuses.filter((s) => s === 'active').length,
    inactiveDonors: statuses.filter((s) => s === 'inactive').length,
    totalDonated: round(rows.reduce((sum, row) => sum + row.amount, 0)),
    averageGift: rows.length ? round(rows.reduce((sum, row) => sum + row.amount, 0) / rows.length) : 0,
  };
}

/** Total and count per month (YYYY-MM), oldest month first. */
export function monthly(rows) {
  const months = new Map();
  for (const row of rows) {
    const month = row.date.slice(0, 7);
    const m = months.get(month) ?? { month, total: 0, count: 0 };
    m.total = round(m.total + row.amount);
    m.count += 1;
    months.set(month, m);
  }
  return [...months.values()].sort((a, b) => a.month.localeCompare(b.month));
}

/** Programs ranked by total donated, highest first. */
export function programRanking(rows) {
  const totals = new Map();
  for (const row of rows) totals.set(row.program, round((totals.get(row.program) ?? 0) + row.amount));
  return [...totals].map(([program, total]) => ({ program, total })).sort((a, b) => b.total - a.total);
}

// Reactivation rules — see openspec/specs/reactivation/spec.md
/** Inactive donors with their lifetime total and last donation date, highest total first. */
export function reactivation(rows) {
  const donors = new Map();
  for (const row of rows.filter((r) => r.status === 'inactive')) {
    const d = donors.get(row.donor) ?? { donor: row.donor, total: 0, lastDonation: row.date };
    d.total = round(d.total + row.amount);
    if (row.date > d.lastDonation) d.lastDonation = row.date;
    donors.set(row.donor, d);
  }
  return [...donors.values()].sort((a, b) => b.total - a.total);
}
