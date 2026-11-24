# Runbook

Seven one-time steps, then five that repeat. Each has an exit check: you're done with the
step when the check holds.

## Step 1: Draw the boundary

Decide where the workbench lives. Work goes in an Internal or Private repo in your
employer's organisation; learning and side projects go somewhere else. Nothing is copied
between them.

**Exit:** for a manager's ask from Teams, a study note and a side-project idea, you can say
which repo each goes in.

## Step 2: Create the repo and its labels

**Use this template**, owner = your organisation, visibility Internal or Private. Then
**Actions > bootstrap-labels > Run workflow**.

**Exit:** the Labels page shows the five types, four modifiers and five `src:` labels.

## Step 3: Create the Project views

**Projects > New project**, link the repo, add a `Due` date field and three views:

- *Today*: board, `is:open -label:waiting,someday`, sorted by Due
- *Waiting on*: table, `is:open label:ask,waiting`, oldest first
- *Closed 7 days*: table, `is:closed closed:>@today-7d`

Turn on the project workflow **Auto-add to project** for the repo.

**Exit:** a new issue appears in the project on its own.

## Step 4: Read and adjust the rules

Open [.github/copilot-instructions.md](../.github/copilot-instructions.md). Change formats or
categories to match how you work. Keep the Never list.

**Exit:** in Copilot Chat, "what are my label rules?" is answered from the file without you
pasting it.

## Step 5: Create your desks

Run `/new-project` once per desk: projects that end, practices that don't. Run
bootstrap-labels again afterwards.

**Exit:** each desk has a README with `kind:` and `tracker:`, and a `desk:` label.

## Step 6: Check the automations

Run **Actions > daily-digest > Run workflow** once. Change the cron line to your morning in
UTC.

**Exit:** a digest issue appears, or the run summary tells you to use `/digest` because
Models is unavailable.

## Step 7: Connect what your admin allows

Read [bridges.md](bridges.md). Use the best bridge your tenant permits, and nothing beyond it.

**Exit:** one real ask from Teams is in a desk, with a link back to the message.

## Step 8: Morning, 5 minutes

Read the digest (or run `/digest`). Do or re-date overdue commitments first, and tell the
waiting person. Edit and send the follow-up drafts yourself. Pick today's 3 outcomes.

**Exit:** every overdue commitment is done or has a message giving its new date.

## Step 9: After each meeting or chat, capture

Paste the recap into `inbox.md`, run `/triage` with the Clerk agent, check the proposed
table, say OK.

**Exit:** within 15 minutes of the meeting, every commitment you made is filed.

## Step 10: Ask well, and log the ask

`/ask` with what you need and from whom. It searches for an existing answer first, drafts
the question, and logs it once you say "sent".

**Exit:** the ask exists with a person and a date, and shows in *Waiting on*.

## Step 11: Delegate one long-tail task

`/delegate` writes the five-part brief. For the cloud agent, open it as an issue in the code
repo and assign Copilot. Review the pull request against the acceptance list.

**Exit:** the pull request is merged by a person after review, or closed with a note saying
what was ambiguous.

## Step 12: Weekly review, 30 minutes

`/weekly` on Friday: clear stale items, draft the status, pick next week's 3 outcomes, and
turn the week's agent mistakes into rules.

**Exit:** at least one change to `.github/` this week, or a note that nothing needed one.

After a month: compare your morning start time and how many follow-ups you send against
before. If nothing improved, simplify.
