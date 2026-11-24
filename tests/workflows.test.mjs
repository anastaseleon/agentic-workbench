import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read } from './helpers.mjs';

const W = n => read(`.github/workflows/${n}.yml`);

test('bootstrap is manual, idempotent, vocabulary-driven', () => {
  const t = W('bootstrap-labels');
  for (const s of ['workflow_dispatch', 'jq', '.github/labels.json', '--force', 'desk:', '_template-', 'example-', 'issues: write'])
    assert.ok(t.includes(s), `missing ${s}`);
  assert.doesNotMatch(t, /^\s*push:/m);
  assert.doesNotMatch(t, /^on:\s*\[?\s*push/m);
});

test('digest guards Models and falls back to /digest', () => {
  const t = W('digest');
  for (const s of ['schedule', 'workflow_dispatch', 'models: read', 'actions/ai-inference@v1',
    'continue-on-error: true', 'GITHUB_STEP_SUMMARY', '/digest', '--label digest'])
    assert.ok(t.includes(s), `missing ${s}`);
  assert.match(t, /steps\.ai\.outcome\s*!=\s*'success'/);
  assert.match(t, /steps\.ai\.outcome\s*==\s*'success'/);
});

test('digest reads the action prompt file', () => {
  const t = W('digest');
  assert.ok(t.includes('.github/prompts/digest-action.md'));
  const p = read('.github/prompts/digest-action.md');
  for (const s of ['Due today and overdue', 'Commitments this week', 'Asks older than 2 working days', 'Suggested order'])
    assert.ok(p.includes(s), `missing ${s}`);
});

test('stale never closes', () => {
  const t = W('stale');
  for (const s of ['actions/stale@v9', 'days-before-stale: 10', 'days-before-close: -1', 'someday,waiting,digest'])
    assert.ok(t.includes(s), `missing ${s}`);
});

test('minimal permissions', () => {
  for (const n of ['bootstrap-labels', 'digest', 'stale', 'ci']) {
    const t = W(n);
    assert.match(t, /^permissions:/m, `${n} top-level permissions`);
    assert.ok(!t.includes('write-all') && !t.includes('contents: write'), n);
  }
});

test('digest does nothing in the template repo itself', () => {
  const t = W('digest');
  assert.ok(t.includes('is_template'), 'checks is_template');
  assert.match(t, /steps\.repo\.outputs\.template\s*!=\s*'true'/);
});

test('ci runs only in the template repo, not in filled copies', () => {
  assert.ok(W('ci').includes('github.event.repository.is_template'));
});
