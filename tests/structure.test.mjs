import { test } from 'node:test';
import assert from 'node:assert/strict';
import { exists } from './helpers.mjs';

const REQUIRED = [
  'README.md', 'AGENTS.md', 'LICENSE',
  '.github/copilot-instructions.md', '.github/labels.json',
  '.github/ISSUE_TEMPLATE/task.md',
  'inbox.md', 'today.md', 'people/README.md', 'reference/README.md',
  ...['README.md', 'tasks.md', 'decisions.md', 'risks.md', 'inventory.md', 'meetings/README.md']
    .map(f => `projects/_template-project/${f}`),
  ...['README.md', 'tasks.md', 'decisions.md', 'requests.md', 'standards.md', 'learn.md']
    .map(f => `projects/_template-practice/${f}`),
  'projects/example-atlas/README.md',
  ...['triage', 'digest', 'ask', 'status', 'prep', 'weekly', 'new-project', 'delegate']
    .map(p => `.github/prompts/${p}.prompt.md`),
  ...['clerk', 'tutor', 'reviewer'].map(a => `.github/agents/${a}.agent.md`),
  ...['bootstrap-labels', 'digest', 'stale', 'ci'].map(w => `.github/workflows/${w}.yml`),
  'docs/runbook.md', 'docs/bridges.md',
];

test('required layout exists', () => {
  const missing = REQUIRED.filter(p => !exists(p));
  assert.deepEqual(missing, []);
});
