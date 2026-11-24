---
description: Draft a 5-bullet status update for one desk or all desks
agent: agent
---
Input: a desk name, or "all". Default period: the last 7 days.

1. Collect what closed in the period:
   - `tracker: issues`: issues labelled `desk:<desk>` closed in the period, with their
     closing comments.
   - `tracker: files`: lines under `## Done` with a `closed:` date in the period.
2. Add new decisions from `decisions.md` in the period, and open risks from `risks.md`
   (project desks).
3. Write 5 bullets, outcome first, no adjectives: done, decided, next, blocked or at risk,
   what I need from the reader. Then list the sources you used.
4. Show it. I edit and send it myself.
