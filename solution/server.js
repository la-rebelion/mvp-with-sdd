// Rebel-I ONG donor dashboard — tiny Node.js server, no dependencies.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createHandler } from './src/app.js';
import { importDonations } from './src/importer.js';

const seed = await readFile(new URL('./data/donations.csv', import.meta.url), 'utf8');
const state = { rows: importDonations(seed).rows, adminKey: process.env.ADMIN_KEY };

const port = Number(process.env.PORT) || 3000;
createServer(createHandler(state)).listen(port, () => {
  console.log(`Rebel-I ONG dashboard → http://localhost:${port}`);
  if (!state.adminKey) console.log('Imports are disabled until you set ADMIN_KEY.');
});
