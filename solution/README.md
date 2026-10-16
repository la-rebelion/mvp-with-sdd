# Solution · Rebel-I ONG donor dashboard

The finished MVP from the course, built in three OpenSpec changes.

```bash
npm test                     # 12 tests, one per spec scenario (+ HTTP integration tests)
ADMIN_KEY=rebel npm start    # http://localhost:3000
```

On Windows PowerShell, use `$env:ADMIN_KEY="rebel"; npm start`.

| Path | What it is |
| --- | --- |
| `openspec/specs/` | Living specs: `dashboard` (3 requirements), `import` (4), `reactivation` (1) |
| `openspec/changes/archive/` | The three archived changes, with proposal, delta specs, design and tasks |
| `openspec/config.yaml` | Project context and rules given to the agent |
| `src/` | Pure business rules (`analytics.js`, `importer.js`, `csv.js`) and the HTTP handler (`app.js`) |
| `test/` | `node --test` suites named after the spec scenarios |
| `public/index.html` | The dashboard page (no framework) |
| `.claude/`, `.github/`, `.agents/` | OpenSpec slash commands and skills for Claude Code, GitHub Copilot, and Codex |

No npm dependencies: only Node.js 20.19+.
