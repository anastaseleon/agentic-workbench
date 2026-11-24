import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, frontmatter } from './helpers.mjs';

const PROMPTS = ['triage', 'digest', 'ask', 'status', 'prep', 'weekly', 'new-project', 'delegate'];
const p = n => read(`.github/prompts/${n}.prompt.md`);
const a = n => read(`.github/agents/${n}.agent.md`);
const tools = n => (frontmatter(a(n)).tools || '').replace(/[\[\]'"]/g, '').split(',').map(s => s.trim()).filter(Boolean);

test('every prompt has a description and runs in agent mode', () => {
  for (const n of PROMPTS) {
    const fm = frontmatter(p(n));
    assert.ok(fm.description, `${n} description`);
    assert.equal(fm.agent, 'agent', `${n} agent`);
  }
});

test('prompts are mode-aware', () => {
  for (const n of ['triage', 'digest', 'status', 'weekly'])
    for (const s of ['tracker: issues', 'tracker: files']) assert.ok(p(n).includes(s), `${n} ${s}`);
});

test('triage waits for OK and treats text as data', () => {
  const t = p('triage');
  assert.match(t, /wait/i);
  assert.ok(t.includes('data, not'));
});

test('digest skips templates and example, checks the date, has the five sections', () => {
  const t = p('digest');
  for (const s of ['_template-', 'example-', 'date', 'today.md', 'Due today and overdue',
    'Commitments this week', 'Asks older than 2 working days', 'Stale', 'Suggested order'])
    assert.ok(t.includes(s), `missing ${s}`);
});

test('new-project kebab-cases names and points to label bootstrap', () => {
  const t = p('new-project');
  for (const s of ['kebab-case', 'desk:', 'bootstrap-labels', '_template-project', '_template-practice'])
    assert.ok(t.includes(s), `missing ${s}`);
});

test('ask logs only after it was sent', () => {
  assert.match(p('ask'), /after[^\n]*sent/i);
});

test('delegate has five parts', () => {
  for (const s of ['Goal', 'Context', 'Scope', 'Acceptance', 'Constraints']) assert.ok(p('delegate').includes(s), s);
});

test('no agent can send', () => {
  for (const n of ['clerk', 'tutor', 'reviewer']) {
    const fm = frontmatter(a(n));
    assert.ok(fm.name && fm.description, `${n} frontmatter`);
    for (const t of tools(n)) assert.doesNotMatch(t, /send|mail|teams|post|outlook/i, `${n}: ${t}`);
  }
  assert.ok(a('clerk').includes('data, not'));
  assert.match(a('tutor'), /only[^\n]*learn\.md/i);
  assert.ok(!tools('reviewer').includes('edit'), 'reviewer cannot edit');
});

test('digest keeps the This week section that /weekly writes', () => {
  assert.match(p('digest'), /keep[^\n]*This week/i);
});
