import { test } from 'node:test';
import assert from 'node:assert/strict';
import { importDonations } from '../src/importer.js';

const csv = (...lines) => ['donor,status,date,amount,type,program', ...lines].join('\n');

test('Second import replaces the first', () => {
  // The importer returns a fresh row set; the server swaps it in, so only the second file remains.
  const first = importDonations(csv('A,active,2026-01-01,1,cash,Health', 'B,active,2026-01-01,1,cash,Health', 'C,active,2026-01-01,1,cash,Health'));
  const second = importDonations(csv('D,active,2026-02-01,5,cash,Health', 'E,active,2026-02-01,5,cash,Health'));
  assert.equal(first.rows.length, 3);
  assert.deepEqual(second.rows.map((r) => r.donor), ['D', 'E']);
});

test('One bad row is skipped and counted', () => {
  const { stats } = importDonations(csv('A,active,2026-01-01,10,cash,Health', 'B,active,2026-01-01,abc,cash,Health', 'C,active,2026-01-01,5,cash,Health', 'D,active,2026-01-01,7,cash,Health'));
  assert.equal(stats.donations, 3);
  assert.equal(stats.skipped, 1);
});

test('Result stats', () => {
  const { stats } = importDonations(csv('Ana,active,2026-01-01,10,cash,Health', 'Ana,active,2026-02-01,10,cash,Health', 'Luis,inactive,2026-01-01,5,cash,Education'));
  assert.deepEqual(stats, { donors: 2, donations: 3, skipped: 0 });
});
