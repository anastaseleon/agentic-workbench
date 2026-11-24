---
description: Write a five-part brief to hand a task to the cloud agent or a colleague
agent: agent
---
Input: the task, and the repo or person it goes to.

Write the brief with these headings, asking me for anything missing:

## Goal
What is true when done, in one or two sentences.

## Context
Why it matters; background that is not in the code or the files.

## Scope
Files or areas in play, and what is out of bounds.

## Acceptance
- [ ] Observable checks, testable where possible.

## Constraints
Conventions to follow, things not to change, approaches already rejected.

Then: for the cloud agent, open it as an issue in the target repo and assign Copilot; that
repo needs `copilot-instructions.md`, tests and branch protection. Log the hand-off as a
`waiting` task in the right desk.
