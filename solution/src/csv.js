// Minimal CSV parser for the demo export: header row, comma-separated, no quoted commas.

/** Parses CSV text into objects keyed by the header names. Blank lines are ignored. */
export function parseCsv(text) {
  const [header, ...lines] = text.trim().split(/\r?\n/).filter((line) => line.trim());
  const keys = header.split(',').map((key) => key.trim());
  return lines.map((line) => {
    const values = line.split(',').map((value) => value.trim());
    return Object.fromEntries(keys.map((key, i) => [key, values[i] ?? '']));
  });
}
