# Module 4 · Next level

## Expanded OpenSpec workflow

The default (`core`) profile includes `explore`, `propose`, `apply`, `update`, `sync`, and `archive`. To enable more:

```bash
openspec config profile     # select the extra workflows
openspec update             # inside your project
```

| Command | Use it to |
| --- | --- |
| `/opsx:new` | Scaffold a change |
| `/opsx:continue` | Create the next artifact, one step at a time |
| `/opsx:ff` | Fast-forward: create all planning artifacts at once |
| `/opsx:verify` | Check the implementation against the change (completeness, correctness, coherence) |
| `/opsx:bulk-archive` | Archive several changes |
| `/opsx:onboard` | Get a guided tutorial of the whole workflow |

## Skills

A skill is packaged know-how that your agent loads when it needs it. `openspec init` already installed some: look in `.claude/skills/openspec-propose/SKILL.md` (or `.github/skills/`, `.agents/skills/`). You can write your own for your team's conventions, for example "how we write migrations".

## Subagents

Hand focused jobs to helper agents that run in parallel and report back:

- a **reviewer** that checks code against `openspec/specs/`,
- a **tester** that writes the missing scenario tests.

## MCP servers

The Model Context Protocol gives your agent real tools and data: your APIs, your database, your tickets. With MCP, the agent can verify specs against real systems, not just read them.

## Stores (beta)

Planning that spans several repos or teams can live in its own OpenSpec repo, a **store**. See the [Stores guide](https://openspec.dev/docs/stores).
