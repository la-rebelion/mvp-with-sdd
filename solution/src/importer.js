// Import rules — see openspec/specs/import/spec.md
import { parseCsv } from './csv.js';

/** Parses the donations export. Returns the valid rows and the import stats; bad rows are skipped, never thrown. */
export function importDonations(csvText) {
  const rows = [];
  let skipped = 0;
  for (const raw of parseCsv(csvText)) {
    const amount = Number(raw.amount);
    if (!raw.donor || raw.amount === '' || Number.isNaN(amount)) { skipped += 1; continue; }
    rows.push({ ...raw, amount });
  }
  const stats = { donors: new Set(rows.map((r) => r.donor)).size, donations: rows.length, skipped };
  return { rows, stats };
}
