import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import config from '../astro.config.mjs';

// Deliberately independent of local reference material and editorial notes.
const routes = ['', 'education', 'experience', 'skills', 'research', 'honors', 'certifications'];
const root = resolve('dist');
const base = `${config.base.replace(/\/$/, '')}/`;
const site = new URL(config.site);
const expectedPages = routes.map(route => route ? `${route}/index.html` : 'index.html');

async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), `Symlink is not a publishable asset: ${entry.name}`);
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path));
    else files.push(relative(root, path).split(sep).join('/'));
  }
  return files;
}

const files = await listFiles(root);
assert.deepEqual(files.filter(file => file.endsWith('.html')).sort(), [...expectedPages].sort());
for (const file of files) {
  assert(
    expectedPages.includes(file) || file === 'favicon.svg' ||
    /^_astro\/[\w.-]+\.css$/.test(file) || /^_astro\/chi-an-chen\.[\w.-]+\.webp$/.test(file),
    `Unexpected file in publish directory: ${file}`,
  );
}

const titles = new Set();
const descriptions = new Set();
let checkedLinks = 0;
for (const file of expectedPages) {
  const html = await readFile(resolve(root, file), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1];
  assert(title && description, `Missing title or description: ${file}`);
  titles.add(title);
  descriptions.add(description);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one h1: ${file}`);
  assert(!/<script(?:\s|>)/i.test(html), `Unexpected client script: ${file}`);
  assert(!/reference_data|\/Users\/|work\/|\.pdf(?:["?#<\s]|$)|Coming soon|View code|repo ownership|-----BEGIN .*PRIVATE KEY-----/i.test(html), `Local source or placeholder content: ${file}`);

  const pagePath = file === 'index.html' ? base : `${base}${file.replace(/index\.html$/, '')}`;
  for (const [, attribute, raw] of html.matchAll(/\b(href|src)="([^"]*)"/g)) {
    assert(raw && raw !== '#', `Empty ${attribute}: ${file}`);
    const url = new URL(raw.replaceAll('&amp;', '&'), new URL(pagePath, site));
    if (url.origin !== site.origin) {
      assert(attribute === 'href' && [
        'https://www.linkedin.com/in/chi-an-chen-993590315',
        'https://github.com/Chi-An-Chen',
      ].includes(url.href), `Unexpected external resource: ${file}`);
      continue;
    }
    assert(url.pathname.startsWith(base), `Link missing base path in ${file}: ${url.pathname}`);
    const local = decodeURIComponent(url.pathname.slice(base.length));
    const target = resolve(root, local, url.pathname.endsWith('/') ? 'index.html' : '');
    assert(target.startsWith(`${root}${sep}`), `Link escapes dist: ${file}`);
    assert((await stat(target)).isFile(), `Missing linked file: ${target}`);
    if (url.hash) {
      const linkedHtml = await readFile(target, 'utf8');
      assert(linkedHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor in ${file}`);
    }
    checkedLinks++;
  }
  for (const route of routes) {
    const href = route ? `${base}${route}/` : base;
    assert(html.includes(`href="${href}"`), `Missing page navigation: ${route || 'home'} in ${file}`);
  }
}
assert.equal(titles.size, routes.length, 'Page titles must be distinct');
assert.equal(descriptions.size, routes.length, 'Page descriptions must be distinct');
console.log(`Validated ${routes.length} pages, ${checkedLinks} local references, and ${files.length} publishable files under ${base}.`);
