import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, listFiles, TASK_LINE } from './helpers.mjs';

const P = 'projects/_template-project/', R = 'projects/_template-practice/', E = 'projects/example-atlas/';

test('templates declare kind and tracker', () => {
  const p = read(P + 'README.md'), r = read(R + 'README.md');
  assert.match(p, /^kind: project$/m);
  assert.match(r, /^kind: practice$/m);
  for (const t of [p, r]) assert.match(t, /^tracker: (issues|files)$/m);
  assert.match(p, /^## Goal$/m);
  assert.match(p, /^## Done when$/m);
  assert.match(r, /^## Mandate$/m);
  for (const t of [p, r]) assert.match(t, /^## Stakeholders$/m);
});

test('template task files have Open and Done', () => {
  for (const f of [P + 'tasks.md', R + 'tasks.md']) {
    const t = read(f);
    assert.match(t, /^## Open$/m, f);
    assert.match(t, /^## Done$/m, f);
  }
});

test('example task lines are valid', () => {
  const lines = read(E + 'tasks.md').split('\n').filter(l => l.startsWith('- ['));
  assert.ok(lines.length >= 5);
  for (const l of lines) assert.match(l, TASK_LINE);
  const ids = lines.map(l => l.match(/T-\d+/)[0]);
  assert.equal(new Set(ids).size, ids.length, 'IDs unique');
  assert.ok(lines.some(l => / \| ask(\+waiting)? \| /.test(l)), 'has an ask');
  assert.ok(lines.some(l => / \| commitment \| /.test(l)), 'has a commitment');
  assert.ok(lines.some(l => /\+waiting/.test(l)), 'has a waiting item');
  assert.ok(lines.some(l => l.startsWith('- [x]') && / \| closed: /.test(l)), 'has a done item');
});

test('example declares a files-mode project desk', () => {
  const t = read(E + 'README.md');
  assert.match(t, /^kind: project$/m);
  assert.match(t, /^tracker: files$/m);
});

test('risks and inventory are tables', () => {
  assert.match(read(P + 'risks.md'), /Risk \| Impact \| Owner \| Mitigation \| Status/);
  assert.match(read(P + 'inventory.md'), /^\|.+\|$/m);
});

test('people README states the visibility rule', () => {
  const t = read('people/README.md');
  assert.match(t, /never/i);
  assert.match(t, /opinion/i);
});

test('example is fictional and neutral', () => {
  const all = listFiles(E).map(read).join('\n');
  assert.ok(all.includes('Atlas'));
});
