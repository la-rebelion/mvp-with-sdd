# Module 2 · Setup

## 1. Environment

| You need | Check |
| --- | --- |
| Node.js **20.19+** | `node -v` |
| git | `git --version` |
| An editor | VS Code, or any other |
| An AI coding agent | Claude Code, Codex, GitHub Copilot, Cursor… (OpenSpec supports 30+ tools) |

Clone the course repository and open the `starter/` folder. It contains only the client brief (`docs/`) and sample data (`data/`). There's no code yet, on purpose.

## 2. Install OpenSpec

```bash
npm install -g @fission-ai/openspec@latest
openspec --version        # the course was recorded with 1.14.2
```

Homebrew (`brew install openspec`), pnpm, yarn, bun, and Nix also work. See the [installation docs](https://openspec.dev/docs/installation).

## 3. Initialize the project

```bash
cd starter
openspec init                                   # interactive tool picker
# or non-interactive:
openspec init --tools claude,codex,github-copilot
```

What you get:

```text
openspec/
├── specs/          # source of truth: how the system behaves today
├── changes/        # one folder per proposed change (+ archive/)
└── config.yaml     # project context and rules
.claude/  .github/  .agents/   # slash commands and skills for your agents
```

**Restart your editor/agent** so it picks up the new commands.

## 4. Two places to type commands

| Starts with | Where | Example |
| --- | --- | --- |
| `openspec …` | your **terminal** | `openspec list` |
| `/opsx:…` | your **agent's chat** | `/opsx:propose add-donor-dashboard` |

Spelling depends on the tool: Claude Code uses `/opsx:propose`, GitHub Copilot and Cursor use `/opsx-propose`, and Codex uses `$openspec-propose`. `openspec init` prints the right form for the tools you picked.

## 5. Give OpenSpec your project context

Edit `openspec/config.yaml`:

```yaml
schema: spec-driven

context: |
  MVP for a pre-sale demo with the client Rebel-I ONG (see docs/web-app.plan.md and docs/web-app.spec.md).
  Node.js 20.19+ only: no frameworks, no database, no npm dependencies.
  Business rules are pure functions in src/ and every spec scenario gets a node --test unit test.

rules:
  proposal:
    - Always state what is out of scope
  tasks:
    - Keep each task small enough to review in a few minutes
```

Only add constraints the agent can't infer by reading the code.

## Telemetry

OpenSpec collects anonymous usage stats: command names and version only. To opt out, use `export OPENSPEC_TELEMETRY=0`, or run `openspec config set telemetry.enabled false`.
