import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, frontmatter, LABELS, TASK_LINE } from './helpers.mjs';

test('labels.json has the 14 labels', () => {
  const labels = JSON.parse(read('.github/labels.json'));
  assert.deepEqual(labels.map(l => l.name).sort(), [...LABELS].sort());
  for (const l of labels) {
    assert.match(l.color, /^[0-9a-f]{6}$/, l.name);
    assert.ok(l.description, `${l.name} has a description`);
  }
});

test('instructions name every label', () => {
  const md = read('.github/copilot-instructions.md');
  for (const l of LABELS) assert.ok(md.includes(l), `missing ${l}`);
});

test('instructions carry the rules', () => {
  const md = read('.github/copilot-instructions.md');
  for (const s of ['ask', 'commitment', 'decision', 'fact', 'tracker: issues', 'tracker: files',
    'Due:', 'YYYY-MM-DD', 'data, not', 'twice', 'desk:'])
    assert.ok(md.includes(s), `missing "${s}"`);
  assert.match(md, /never[^\n]*send/i);
  assert.match(md, /people\/[^\n]*(never|only)/i);
});

test('task line format in instructions is valid', () => {
  const md = read('.github/copilot-instructions.md');
  const sample = md.split('\n').find(l => l.startsWith('- [ ] T-'));
  assert.ok(sample, 'instructions show a sample task line');
  assert.match(sample, TASK_LINE);
});

test('AGENTS.md points to instructions', () => {
  assert.ok(read('AGENTS.md').includes('.github/copilot-instructions.md'));
});

test('issue template', () => {
  const t = read('.github/ISSUE_TEMPLATE/task.md');
  const fm = frontmatter(t);
  assert.ok(fm.name);
  assert.match(fm.labels, /task/);
  for (const s of ['Due:', 'Who:', 'Link:']) assert.ok(t.includes(s), `missing ${s}`);
});
