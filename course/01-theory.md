# Module 1 · Theory

## What Spec-Driven Development is

Spec-Driven Development (SDD) means you write a **specification before you write code with AI**. The spec describes what the software must do, in plain language and with concrete examples. It becomes the **source of truth** for you, your team, your client, and your AI agent.

A spec is not a prompt. A prompt is a message: you send it, the agent reacts, and it disappears into chat history. A spec is a **file in your repository**. It is reviewed, versioned, and still true after the conversation ends. In this course, a spec is always:

1. written down,
2. testable, and
3. kept next to the code.

## The classic flow, and drift

The classic flow runs requirements → design → code → test → deploy, with a handoff between each stage. Requirements documents get written once and abandoned, and every handoff loses context. The spec and the code **drift** apart. SDD keeps specs alive and close to the code, so they don't drift.

## Vibe coding

Vibe coding means prompting an AI agent until the result *feels* right. It is great for prototypes and throwaway scripts, but it breaks down for serious work:

- Requirements live only in chat history.
- Nobody reviews a plan, so the agent confidently builds the wrong thing.
- Each prompt nudges the code somewhere new, and features break other features.
- Teammates can't onboard, because there's nothing to read except the code.
- The same prompt can produce a different result tomorrow.

The problem is not the AI. **The contract is missing.**

## Three levels of SDD

From Birgitta Böckeler's article on martinfowler.com:

| Level | What it means |
| --- | --- |
| **Spec-first** | A careful spec guides the AI on the current task. It may be discarded afterward. |
| **Spec-anchored** | The spec is kept and used to evolve and maintain the feature. ← **this course** |
| **Spec-as-source** | The spec is the main artifact. Humans edit only the spec, never the generated code. |

The article warns that spec-as-source resembles model-driven development, which never took off for business apps. Combine that rigidity with LLM non-determinism and you can make things worse. It also flags three risks with SDD tools: **one workflow for every problem size**, **review overload**, and a **false sense of control**. Our answers are small changes, short specs, and tests for every scenario.

## Markdown specs

Specs are plain Markdown, which humans read easily, LLMs read natively, and git diffs line by line.

```markdown
### Requirement: Donor KPIs
The system SHALL show the number of active donors, the number of inactive donors,
and the total donated, where each donor is counted once by name.

#### Scenario: Donors are counted once
- **WHEN** the data has three donations from "Ana" (active) and one from "Luis" (inactive)
- **THEN** the dashboard shows 1 active donor and 1 inactive donor
```

- **Requirement** = one observable behavior (the *what*).
- **Scenario** = a concrete example that proves it. Every good scenario can become a test.
- **RFC 2119 keywords**: `MUST`/`SHALL` are hard rules, `SHOULD` is recommended, and `MAY` is optional.
- Behavior goes in specs. Implementation (libraries, tables, folders) goes in `design.md`.

## Delta specs

`openspec/specs/` describes how the system works **today**. A change only describes the **difference**:

- `## ADDED Requirements`: new behavior.
- `## MODIFIED Requirements`: the full new version of an existing requirement. It replaces the old one on archive.
- `## REMOVED Requirements`: behavior going away, with a reason.

When you archive a change, OpenSpec merges the delta into the main specs. This is why OpenSpec works on existing codebases: you document what you change, one change at a time.

## Right-size every change

One change = **one intent you can say in a sentence**. If you need "and also", split it. If a review would take an afternoon, nobody will do it. Match the ceremony to the stakes: a typo fix doesn't need a design doc.

## How we work (La Rebelion loop)

| Step | Who (crew) | OpenSpec |
| --- | --- | --- |
| Brief from the client | Roby | `docs/` |
| Explore, then propose | Hapi | `/opsx:explore`, `/opsx:propose` |
| Review the plan before code | everyone | read `proposal.md`, `specs/`, `design.md`, `tasks.md` |
| Apply in chunks | Cody | `/opsx:apply` (2–3 tasks at a time) |
| Test every scenario | OrcA | `npm test` |
| Archive and release | Clooney | `/opsx:archive`, tag, push |
| Demo and feedback | Roby | the next change |

We use this loop in pre-sale: an MVP the client can click, early feedback, fast iteration.
