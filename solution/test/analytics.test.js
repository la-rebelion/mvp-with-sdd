import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summary, monthly, programRanking, reactivation } from '../src/analytics.js';

const row = (donor, status, date, amount, program = 'Food Bank') => ({ donor, status, date, amount, type: 'cash', program });

test('Donors are counted once', () => {
  const rows = [row('Ana', 'active', '2026-01-01', 1), row('Ana', 'active', '2026-01-02', 1), row('Ana', 'active', '2026-01-03', 1), row('Luis', 'inactive', '2026-01-04', 1)];
  const s = summary(rows);
  assert.equal(s.activeDonors, 1);
  assert.equal(s.inactiveDonors, 1);
});

test('Total donated', () => {
  const rows = [row('A', 'active', '2026-01-01', 100), row('B', 'active', '2026-01-01', 250.5), row('C', 'active', '2026-01-01', 49.5)];
  assert.equal(summary(rows).totalDonated, 400);
});

test('Two months of donations, oldest first', () => {
  const rows = [row('A', 'active', '2026-02-01', 100), row('B', 'active', '2026-02-10', 50), row('C', 'active', '2026-01-15', 20)];
  assert.deepEqual(monthly(rows), [{ month: '2026-01', total: 20, count: 1 }, { month: '2026-02', total: 150, count: 2 }]);
});

test('Program ranking order', () => {
  const rows = [row('A', 'active', '2026-01-01', 300, 'Education'), row('B', 'active', '2026-01-01', 500, 'Food Bank'), row('C', 'active', '2026-01-01', 100, 'Health')];
  assert.deepEqual(programRanking(rows).map((p) => p.program), ['Food Bank', 'Education', 'Health']);
});

test('Average gift', () => {
  const rows = [row('A', 'active', '2026-01-01', 100), row('B', 'active', '2026-01-01', 250.5), row('C', 'active', '2026-01-01', 49.5)];
  assert.equal(summary(rows).averageGift, 133.33);
});

test('Reactivation: highest lifetime value first', () => {
  const rows = [row('Luis', 'inactive', '2026-01-01', 1200), row('Jorge', 'inactive', '2026-01-01', 2000), row('Jorge', 'inactive', '2026-03-01', 500)];
  assert.deepEqual(reactivation(rows), [{ donor: 'Jorge', total: 2500, lastDonation: '2026-03-01' }, { donor: 'Luis', total: 1200, lastDonation: '2026-01-01' }]);
});

test('Reactivation: active donors are excluded', () => {
  assert.deepEqual(reactivation([row('Ana', 'active', '2026-01-01', 9000)]), []);
});
