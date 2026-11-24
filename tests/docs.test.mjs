import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, normalize } from 'node:path';
import { read, exists, listFiles } from './helpers.mjs';

test('README opens with the privacy rule', () => {
  const first = read('README.md').split(/^## /m)[1] || '';
  for (const s of [/public/i, /never/i, /employer/i]) assert.match(first, s);
});

test('README covers setup without a CLI', () => {
  const t = read('README.md');
  for (const s of ['Use this template', 'Internal', 'bootstrap-labels', '/new-project', '/triage', '/digest', '/weekly'])
    assert.ok(t.includes(s), `missing ${s}`);
  const checklist = t.split(/^## /m).find(s => /^Check your access/.test(s)) || '';
  assert.equal((checklist.match(/^\d\. /gm) || []).length, 5, 'five-item access checklist');
});

test('relative links resolve', () => {
  const docs = ['README.md', ...listFiles('docs')];
  for (const f of docs) {
    for (const [, href] of read(f).matchAll(/\]\(([^)#\s]+)(#[^)]*)?\)/g)) {
      if (/^[a-z]+:/i.test(href)) continue;
      const target = normalize(join(dirname(f), href)).split('\\').join('/');
      assert.ok(exists(target), `${f} -> ${href}`);
    }
  }
});

test('runbook has 12 steps and no CLI', () => {
  const t = read('docs/runbook.md');
  for (let i = 1; i <= 12; i++) assert.match(t, new RegExp(`^## Step ${i}\\b`, 'm'), `Step ${i}`);
  assert.doesNotMatch(t, /\bgh (repo|label|project|issue)\b/);
});

test('bridges keep the no-send rule', () => {
  const t = read('docs/bridges.md');
  for (const s of ['Bridge 1', 'Bridge 2', 'Bridge 3', 'Bridge 4', 'Fallback', 'admin']) assert.ok(t.includes(s), s);
  assert.match(t, /no tool that sends|never send/i);
});
