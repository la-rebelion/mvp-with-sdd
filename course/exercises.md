# Practice

These are the exercises from the video, in order. Pause, do them, then compare with `solution/`.

## 1 · Set up the starter

Clone the repo, `cd starter`, then run `openspec init` with your agent. Restart the editor, open the chat, and type `/opsx`. The OpenSpec commands should appear.

## 2 · Sharpen a scenario

In `add-donor-dashboard`, add the case you'd hate to see broken: **no donations at all**.

```markdown
#### Scenario: No donations
- **WHEN** there are no donations
- **THEN** all KPIs show 0 and the monthly trend is empty
```

Then ask the agent to bring `design.md` and `tasks.md` in line with the new scenario.

## 3 · Break it on purpose

In `test/analytics.test.js`, change the expected `activeDonors` in "Donors are counted once" from `1` to `3`. Run `npm test`: one test fails, and its name points to the broken scenario. Revert the change and you're green again.

## 4 · The wrong key

The import spec says the key may be **missing or wrong**, but only the missing case has a scenario. Add:

```markdown
#### Scenario: Wrong key
- **WHEN** a CSV is uploaded with the header `X-Admin-Key: nope`
- **THEN** the response status is 401 and the dashboard numbers do not change
```

Add a matching test, then try it by hand:

```bash
ADMIN_KEY=rebel npm start
curl -i -X POST -H 'X-Admin-Key: nope' --data-binary @data/donations.csv localhost:3000/api/import   # 401
```

## 5 · Homework: your fourth change, `add-upcoming-birthdays`

The client wants to send birthday greetings.

- The export gets a `birthday` column (`MM-DD`), so the import requirement changes: that's a **MODIFIED** section.
- Donors with a birthday in the next 30 days are a new capability: that's **ADDED**.
- Edge cases: late December (the 30-day window crosses into January), and a donor with no birthday.

Run the full loop: explore → propose → review → apply in chunks → test → archive. Share your solution with us. Open a PR or tag La Rebelion Labs.
