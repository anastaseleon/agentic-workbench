---
description: Write today.md, the morning list across every desk
agent: agent
---
1. Get today's date (run a terminal command such as `date +%F` or
   `Get-Date -Format yyyy-MM-dd`; if you cannot, ask me). Use it for every comparison below.
2. Read every desk in `projects/`. Skip folders starting with `_template-` or `example-`.
   For each desk, read its README:
   - `tracker: issues`: open issues labelled `desk:<desk>`; read `Due:` from the body and
     the last update date.
   - `tracker: files`: open lines in its `tasks.md`; use `Due:`, `opened:` and `touched:`.
3. Rewrite `today.md`, but keep its "This week" section (written by `/weekly`) unchanged
   at the top. Below it, write these sections, in order, each item as
   `[desk] title — due — link`:
   - **Due today and overdue**
   - **Commitments this week** (type `commitment`, due within 7 days)
   - **Asks older than 2 working days** (type `ask`), each with a two-line follow-up draft
     I can send myself
   - **Stale** (no update for 10 working days, excluding `someday` and `waiting`)
   - **Suggested order**: the top 3 for today with a one-line reason each
4. Leave out anything that needs no decision today. It must take under 5 minutes to read.
5. Do not change any task, issue or label: read everything, write only `today.md`.
