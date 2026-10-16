// HTTP handler for the dashboard. server.js starts it; tests call it on a random port.
import { readFile } from 'node:fs/promises';
import { summary, monthly, programRanking, reactivation } from './analytics.js';
import { importDonations } from './importer.js';

const send = (res, status, body, type = 'application/json') => {
  res.writeHead(status, { 'Content-Type': type });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
};

const readBody = async (req) => {
  let body = '';
  for await (const chunk of req) body += chunk;
  return body;
};

/** state = { rows, adminKey } — rows are swapped in one assignment on import. */
export function createHandler(state) {
  const routes = {
    'GET /': async (req, res) => send(res, 200, await readFile(new URL('../public/index.html', import.meta.url)), 'text/html; charset=utf-8'),
    'GET /api/summary': (req, res) => send(res, 200, summary(state.rows)),
    'GET /api/donations-monthly': (req, res) => send(res, 200, monthly(state.rows)),
    'GET /api/programs': (req, res) => send(res, 200, programRanking(state.rows)),
    'GET /api/reactivation': (req, res) => send(res, 200, reactivation(state.rows)),
    'POST /api/import': async (req, res) => {
      if (!state.adminKey || req.headers['x-admin-key'] !== state.adminKey) return send(res, 401, { error: 'Admin key required' });
      const { rows, stats } = importDonations(await readBody(req));
      state.rows = rows;
      return send(res, 200, stats);
    },
  };
  return (req, res) => {
    const route = routes[`${req.method} ${req.url.split('?')[0]}`];
    return route ? route(req, res) : send(res, 404, { error: 'Not found' });
  };
}
