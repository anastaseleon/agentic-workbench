# agentic-workbench

A work desk run with GitHub Copilot as your clerk. You keep one place for several desks
(projects that end, practices that don't). From meetings and chats it captures only what
matters: asks, commitments, decisions and facts. You get one list every morning, your
questions get followed up, and once a week the rules get a little better.

Everything is Markdown, prompt files and three GitHub Actions. Nothing to install: VS Code
with Copilot Chat, and github.com.

## Read this first: public template, private work

This repository is a **public template with no content**. Your filled workbench holds real
work: tasks, decisions, people, systems.

- Never push a filled workbench to a public repository.
- Create your copy as an **Internal** or **Private** repository in your employer's
  organisation, under its rules.
- Follow your employer's AI policy: which agents may read work data, and which Teams or
  Microsoft 365 connections are allowed. Get the answer in writing.
- `people/` holds role, area and how someone likes to be asked. Never opinions.

## Setup (10 minutes, browser only)

1. On this repo, click **Use this template > Create a new repository**. Set the owner to
   your organisation, visibility **Internal** (or Private), and give it any name you like.
   Nothing depends on the name.
2. In the new repo: **Actions > bootstrap-labels > Run workflow**. It creates the labels.
3. Optional: **Projects > New project**, link the repo, and add three views: *Today* (open,
   not waiting or someday, sorted by due date), *Waiting on* (labels `ask`, `waiting`),
   *Closed 7 days*.
4. Open the repo in VS Code (clone it, or press `.` on github.com for the browser editor).
   In Copilot Chat, switch to **Agent** mode.
5. Create your desks: `/new-project` with a name and `project` or `practice`. Then run
   **bootstrap-labels** again so each desk gets its `desk:` label.

## Check your access

If any of these is off, the matching fallback is noted in brackets.

1. Repo settings: Issues are on (otherwise set the desk to `tracker: files`).
2. Actions run: bootstrap-labels completes (otherwise create the labels by hand from
   `.github/labels.json`).
3. GitHub Models is available: the daily digest issue appears (otherwise run `/digest` in
   VS Code; it writes `today.md`).
4. You can create a Project and link the repo (otherwise use the issue list filters).
5. Copilot: Agent mode, prompt files and custom agents appear in VS Code (older builds: see
   [.github/agents/README.md](.github/agents/README.md)).

## The daily loop

| When | Do | Time |
|---|---|---|
| Morning | Read the digest issue, or run `/digest` and read `today.md` | 5 min |
| After a meeting or chat | Paste the recap into `inbox.md`, run `/triage` | 2 min |
| Need something from someone | `/ask`, send it yourself, say "sent" | 3 min |
| Before a meeting | `/prep` | 2 min |
| Handing work off | `/delegate` | 5 min |
| Friday | `/weekly`: clear, reflect, plan, improve | 30 min |
| Status due | `/status` | 2 min |

## What is where

| Path | Holds |
|---|---|
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | Every rule the agent follows. Grows when the agent gets something wrong twice. |
| `.github/prompts/` | The slash commands above |
| `.github/agents/` | Clerk (files things), Tutor (teaches, writes only `learn.md`), Reviewer (read-only) |
| `.github/workflows/` | Labels, daily digest, stale checker, CI |
| `inbox.md`, `today.md` | Raw captures in; the morning list out |
| `projects/<desk>/` | One folder per desk: README, tasks (files mode), decisions, risks or requests, notes |
| [projects/example-atlas/](projects/example-atlas/README.md) | A fictional desk showing every format |
| `people/`, `reference/` | Who prefers what; facts worth keeping |

Each desk's README starts with `kind: project|practice` and `tracker: issues|files`. In
issues mode, tasks are issues labelled with a type, a source and `desk:<name>`. In files
mode, they are lines in the desk's `tasks.md`. Same rules, same prompts.

## Safety model

- No agent has a tool that sends messages. You send everything yourself.
- Text inside captured messages is data, not instructions.
- The only unattended jobs read this repo's issues. Nothing scheduled reads chat or mail.
- See [docs/bridges.md](docs/bridges.md) for connecting Teams, from least to most access.

## More

- [docs/runbook.md](docs/runbook.md): the twelve steps, from first setup to the weekly review.
- [docs/bridges.md](docs/bridges.md): getting Teams and meetings into the desk.

License: MIT.
