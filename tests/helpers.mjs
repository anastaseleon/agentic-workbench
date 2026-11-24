import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const read = rel => readFileSync(join(ROOT, rel), 'utf8');
export const exists = rel => existsSync(join(ROOT, rel));

const SKIP = new Set(['.git', 'node_modules', '.superpowers']);

export function listFiles(relDir = '.') {
  const out = [];
  const walk = abs => {
    for (const name of readdirSync(abs)) {
      if (SKIP.has(name)) continue;
      const p = join(abs, name);
      if (statSync(p).isDirectory()) walk(p);
      else out.push(relative(ROOT, p).split(sep).join('/'));
    }
  };
  walk(join(ROOT, relDir));
  return out.sort();
}

export function frontmatter(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

export const TASK_LINE = /^- \[( |x)\] T-\d{3,} .+? \| (task|ask|commitment|learn|someday)(\+waiting)? \| src:(teams|meeting|email|github|self) \| Due: (\d{4}-\d{2}-\d{2}|none) \| who: [^|]+ \| link: [^|]+ \| opened: \d{4}-\d{2}-\d{2}( \| touched: \d{4}-\d{2}-\d{2})?( \| closed: \d{4}-\d{2}-\d{2} — .+)?$/;

export const LABELS = [
  'task', 'ask', 'commitment', 'learn', 'someday',
  'waiting', 'capture', 'digest', 'stale',
  'src:teams', 'src:meeting', 'src:email', 'src:github', 'src:self',
];
