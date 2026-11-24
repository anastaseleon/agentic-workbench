import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, exists, listFiles } from './helpers.mjs';

const files = () => listFiles('.').filter(f => f !== '.scrub-terms');
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('no scrub terms', (t) => {
  if (!exists('.scrub-terms')) return t.skip('no local .scrub-terms file (expected in CI)');
  const terms = read('.scrub-terms').split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#'));
  const hits = [];
  for (const f of files()) {
    const text = read(f);
    for (const term of terms)
      if (new RegExp(`(^|[^\\p{L}\\p{N}])${escape(term)}($|[^\\p{L}\\p{N}])`, 'iu').test(text)) hits.push(`${f}: ${term}`);
  }
  assert.deepEqual(hits, []);
});

test('no email addresses', () => {
  const hits = [];
  for (const f of files())
    for (const [m] of read(f).matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g))
      if (!/noreply/i.test(m)) hits.push(`${f}: ${m}`);
  assert.deepEqual(hits, []);
});

test('rename safe: the repo name appears only in the README title', () => {
  const hits = files().filter(f => f !== 'tests/privacy.test.mjs').filter(f => {
    const text = read(f);
    if (f === 'README.md') return text.split('\n').slice(1).join('\n').includes('agentic-workbench');
    return text.includes('agentic-workbench');
  });
  assert.deepEqual(hits, []);
});
