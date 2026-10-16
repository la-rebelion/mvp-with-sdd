import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHandler } from '../src/app.js';

async function withServer(state, fn) {
  const server = createServer(createHandler(state)).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  try { return await fn(`http://localhost:${server.address().port}`); } finally { server.close(); }
}

test('Missing key: 401 and data unchanged', async () => {
  const state = { rows: [{ donor: 'Ana', status: 'active', date: '2026-01-01', amount: 10, program: 'Health' }], adminKey: 'secret' };
  await withServer(state, async (base) => {
    const res = await fetch(`${base}/api/import`, { method: 'POST', body: 'donor,status,date,amount,type,program\nX,active,2026-01-01,1,cash,Health' });
    assert.equal(res.status, 401);
    const summary = await (await fetch(`${base}/api/summary`)).json();
    assert.equal(summary.totalDonated, 10);
  });
});

test('Valid key replaces the data', async () => {
  const state = { rows: [], adminKey: 'secret' };
  await withServer(state, async (base) => {
    const res = await fetch(`${base}/api/import`, { method: 'POST', headers: { 'X-Admin-Key': 'secret' }, body: 'donor,status,date,amount,type,program\nX,active,2026-01-01,7,cash,Health' });
    assert.deepEqual(await res.json(), { donors: 1, donations: 1, skipped: 0 });
    assert.equal((await (await fetch(`${base}/api/summary`)).json()).totalDonated, 7);
  });
});
