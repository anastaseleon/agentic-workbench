---
description: Create a new desk (project or practice) from its template
agent: agent
---
Use the Clerk agent. Input: a name and a kind (`project` or `practice`).

1. Turn the name into a kebab-case folder name: lowercase, spaces and underscores become
   hyphens, no accents or punctuation ("Data Platform Migration" becomes `data-platform-migration`).
   Show it.
2. Refuse if `projects/<name>` exists, or if the name starts with `_template-` or `example-`.
3. Copy `projects/_template-project` (kind project) or `projects/_template-practice`
   (kind practice) to `projects/<name>`.
4. Ask me: tracker issues or files (default issues), then a few short questions to fill the
   README (goal or mandate, scope, stakeholders by role, done-when for projects).
5. Write the README, keeping the `kind:` and `tracker:` lines first.
6. If the tracker is issues, tell me to run **Actions > bootstrap-labels > Run workflow** so
   the `desk:<name>` label exists. Until it does, do not create issues for this desk.
