# Module 3 · Hands-on: the Rebel-I ONG donor dashboard

You start in `starter/` with only the client brief. You finish with the app in `solution/`, built in three OpenSpec changes.

> The `/opsx:` commands below use Claude Code spelling. In Copilot or Cursor, use `/opsx-propose`; in Codex, use `$openspec-propose`.

## 0. Read the brief

- `docs/web-app.plan.md`: scope, API, screens, test plan, assumptions.
- `docs/web-app.spec.md`: the client-facing brief (who uses it, the three features).

These are **not** specs yet. They are the conversation, written down.

## 1. Explore

```text
/opsx:explore Read docs/web-app.plan.md and docs/web-app.spec.md.
What is the smallest first slice we can demo? Suggest how to split the work into changes.
```

The target split, one intent per change:

1. `add-donor-dashboard`
2. `add-donation-import`
3. `add-reactivation-list` (stretch)

## 2. Change 1 · `add-donor-dashboard`

### Propose

```text
/opsx:propose add-donor-dashboard — KPI cards (active, inactive, total donated),
monthly trend and program ranking, loaded from data/donations.csv. Out of scope: import.
```

Review **before any code**:

- [ ] `proposal.md` states why, what, and **what is out of scope**.
- [ ] `specs/dashboard/spec.md`: each requirement is one observable behavior with `SHALL`/`MUST`, and each has at least one scenario.
- [ ] The edge case is covered: "Donors are counted once" (3 donations from Ana = 1 donor).
- [ ] No implementation details hide inside requirements. Move them to `design.md`.
- [ ] `tasks.md` has small tasks and includes the unit tests.

Compare with the reference: `solution/openspec/changes/archive/*-add-donor-dashboard/`.

### Validate the plan

```bash
openspec validate add-donor-dashboard     # Change 'add-donor-dashboard' is valid
openspec status --change add-donor-dashboard
openspec list                             # add-donor-dashboard   0/9 tasks
```

### Apply in chunks (bonus tip)

Don't ask for all nine tasks at once. This is especially worth it on a basic agent plan:

```text
/opsx:apply add-donor-dashboard — implement only tasks 1.1 to 2.1, then stop so I can review.
```

Review the diff, run the tests, then continue:

```text
/opsx:apply add-donor-dashboard — continue with tasks 2.2 to 2.4, then stop.
/opsx:apply add-donor-dashboard — finish tasks 3.1 to 4.1.
```

The benefits: you don't burn your tokens in one run, you review small diffs, and mistakes surface early.

### Test

```bash
npm test          # 4 tests: one per spec scenario
npm start         # http://localhost:3000
curl localhost:3000/api/summary
# {"activeDonors":6,"inactiveDonors":3,"totalDonated":13200}
```

(The `averageGift` field arrives in change 3.)

### Archive

```text
/opsx:archive
```

or, from the terminal:

```bash
openspec archive add-donor-dashboard --yes
# Applying changes to openspec/specs/dashboard/spec.md: + 3 added
# Change 'add-donor-dashboard' archived as '<date>-add-donor-dashboard'.
```

`openspec/specs/dashboard/spec.md` now describes the real system.

## 3. Change 2 · `add-donation-import`

```text
/opsx:propose add-donation-import — POST /api/import with a CSV body, protected by the X-Admin-Key header.
Each import replaces all data. Skip and count rows with an empty donor or a non-numeric amount. Report donors, donations, skipped.
```

Things to check in the spec:

- `Admin key required` uses **MUST**: missing (or wrong) key → **401**, data unchanged.
- `Skip invalid rows`: 4 rows with one `abc` amount → 3 loaded, 1 skipped.
- In the design: if `ADMIN_KEY` isn't set, imports are **disabled**, not open.

Apply in chunks, then test:

```bash
npm test                                  # 9 tests, including an HTTP integration test for the 401
ADMIN_KEY=rebel npm start
curl -X POST -H 'X-Admin-Key: rebel' --data-binary @data/donations-with-errors.csv localhost:3000/api/import
# {"donors":2,"donations":2,"skipped":2}
openspec archive add-donation-import --yes   # + 4 added
```

## 4. Change 3 · feedback from the demo: `add-reactivation-list`

The director asks: "Who should we call first?" and "Can I see the average gift?"

```text
/opsx:propose add-reactivation-list — list inactive donors by lifetime total with last donation date,
and add the average gift to the donor KPIs.
```

This delta has **two sections**:

- `## ADDED Requirements` → `Reactivation list` (new `reactivation` capability).
- `## MODIFIED Requirements` → `Donor KPIs`, written out in **full**, now including the average gift (100, 250.50, 49.50 → 133.33).

```bash
npm test                                      # 12 tests
openspec archive add-reactivation-list --yes  # dashboard: ~ 1 modified · reactivation: + 1 added
openspec list --specs                         # dashboard 3 · import 4 · reactivation 1
```

## 5. Release

```bash
npm test                         # 12/12
openspec validate --all          # 3 passed
git add -A && git commit -m "feat: donor dashboard MVP (dashboard, import, reactivation)"
git tag v0.1.0 && git push --follow-tags
```

Set `ADMIN_KEY` as an environment variable where you deploy. **Never commit it.**

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| You typed `/opsx:…` in the terminal | Slash commands go in the agent's chat; `openspec …` goes in the terminal |
| Slash commands don't appear | Restart the editor/agent after `openspec init` |
| `validate` fails | Each requirement needs at least one `#### Scenario:` block (four `#`), under `## ADDED/MODIFIED/REMOVED Requirements` |
| The change is too big to review | Split it: one intent per change |
| The agent drifts from the plan | Clear your context before `/opsx:apply`; keep the change folder as the source of truth |
