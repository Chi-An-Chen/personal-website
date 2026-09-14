import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import config from '../astro.config.mjs';

// This contract deliberately needs no private sources, credentials, or QA artifacts.
const primary = ['', 'research', 'experience', 'about'];
const compatibility = { education: 'about/#education', skills: 'experience/#capabilities', honors: 'about/#recognition', certifications: 'about/#credentials' };
const localizedPrimary = [...primary, ...primary.map(route => `zh/${route}`.replace(/\/$/, ''))];
const routes = [...localizedPrimary, ...Object.keys(compatibility)];
const root = resolve('dist');
const base = `${config.base.replace(/\/$/, '')}/`;
const site = new URL(config.site);
const expectedPages = [...routes.map(route => route ? `${route}/index.html` : 'index.html'), '404.html'];
const fontFiles = ['SourceSerif4-Regular', 'SourceSans3-Regular', 'SourceSans3-Semibold'].map(name => `fonts/${name}.woff2`);
const publicFiles = ['favicon.svg', 'social-preview.png', 'sitemap.xml', 'robots.txt'];
const externalLinks = ['https://www.linkedin.com/in/chi-an-chen-993590315', 'https://github.com/Chi-An-Chen'];
const forbiddenContent = /reference_data|\/Users\/|\/home\/|(?:^|[\s"'=])work\/|\.pdf(?:["?#<\s]|$)|Coming soon|Private Repo|repo ownership|\bvisibility\s*[:=]|-----BEGIN .*PRIVATE KEY-----|(?:api[_-]?key|access[_-]?token|client[_-]?secret)\s*[=:]|\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]+|AIza[A-Za-z0-9_-]{30,}|AKIA[A-Z0-9]{16})\b|https?:\/\/(?:localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)|https?:\/\/[^\s"<>]+(?:run\.app|cloudfunctions\.net)|MidSchool_RAG|NIU_MS_VLM|UNews_commute|admissions_algorithm|Less-is-Verified|virginiakm1988|A\.LEAGUE_LLM/i;
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
async function listFiles(directory, relativeTo = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    assert(!entry.isSymbolicLink(), `Symlink not allowed in public source/output: ${entry.name}`);
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path, relativeTo));
    else files.push(relative(relativeTo, path).split(sep).join('/'));
  }
  return files;
}
const files = await listFiles(root);
assert.deepEqual(files.filter(file => file.endsWith('.html')).sort(), [...expectedPages].sort(), 'Expected eight bilingual primary pages, four compatibility pages, and 404');
for (const file of files) assert(
  expectedPages.includes(file) || fontFiles.includes(file) || publicFiles.includes(file) || /^_astro\/[\w.-]+\.css$/.test(file) || /^_astro\/chi-an-chen\.[\w.-]+\.webp$/.test(file),
  `Unexpected publishable file: ${file}`,
);
const htmlPages = new Map(await Promise.all(expectedPages.map(async file => [file, await readFile(resolve(root,file),'utf8')])));
let checkedLinks = 0;
async function checkReference(raw, from, allowExternal = false) {
  assert(raw && raw !== '#', `Empty reference: ${from}`);
  const sourcePath = from === 'index.html' ? base : `${base}${from.replace(/index\.html$/, '')}`;
  const url = new URL(decode(raw), new URL(sourcePath, site));
  if (url.origin !== site.origin) {
    assert(allowExternal && externalLinks.includes(url.href), `Unexpected external URL: ${from} / ${url.href}`);
    return;
  }
  assert(url.pathname.startsWith(base), `Missing project base: ${from} / ${url.pathname}`);
  const local = decodeURIComponent(url.pathname.slice(base.length));
  const target = resolve(root, local, url.pathname.endsWith('/') ? 'index.html' : '');
  assert(target.startsWith(`${root}${sep}`), `Reference escapes dist: ${from}`);
  assert((await stat(target)).isFile(), `Missing linked file: ${from} / ${local}`);
  if (url.hash) {
    const html = await readFile(target,'utf8');
    assert(html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor: ${from} / ${url.hash}`);
  }
  checkedLinks++;
}
const titles = new Set(), descriptions = new Set();
for (const [file,html] of htmlPages) {
  const isZh = file.startsWith('zh/');
  const locale = isZh ? 'zh-Hant' : 'en';
  const prefix = isZh ? 'zh/' : '';
  const localFile = isZh ? file.slice(3) : file;
  const route = localFile === 'index.html' ? '' : localFile.split('/')[0];
  const isPrimary = primary.includes(route);
  const localizedUrl = (route, langPrefix = prefix) => `${base}${langPrefix}${route ? `${route}/` : ''}`;
  const meta = (name, attribute='name') => decode(html.match(new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="([^"]+)"`))?.[1] ?? '');
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '');
  const description = meta('description');
  assert(title.length > 10 && description.length >= (isZh ? 30 : 70), `Missing/usefully short metadata: ${file}`);
  titles.add(title); descriptions.add(description);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length,1,`One h1 required: ${file}`);
  assert(html.includes(`<html lang="${locale}" data-design="editorial">`),`Language or design: ${file}`);
  assert(!/<script(?:\s|>)/i.test(html),`Unwanted runtime script: ${file}`);
  assert(!forbiddenContent.test(html),`Non-public content: ${file}`);
  assert(!/\b(?:Whisper|ASR|LoRA)\b|speech adaptation/i.test(html),`Out-of-scope research: ${file}`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`Duplicate IDs: ${file}`);
  assert.equal((html.match(/<main\b/g)||[]).length,1,`Main landmark: ${file}`);
  assert(html.includes('href="#main"') && html.includes('id="main"') && html.includes('tabindex="-1"'),`Skip target: ${file}`);
  const header=html.match(/<header\b[^>]*class="site-header[^]*?<\/header>/)?.[0];
  const footer=html.match(/<footer\b[^]*?<\/footer>/)?.[0];
  assert(header && footer,`Missing navigation: ${file}`);
  const headerPaths=[...header.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  const target = compatibility[route] ?? (isPrimary ? (route ? `${route}/` : '') : '');
  const languagePaths = [`${base}zh/${target}`, `${base}${target}`];
  assert.deepEqual(headerPaths,[localizedUrl(''),...primary.map(route=>localizedUrl(route)),...languagePaths],`Navigation and same-page language links: ${file}`);
  const switcher=header.match(/<nav class="language-switch"[^]*?<\/nav>/)?.[0] ?? '';
  assert.equal((switcher.match(/aria-current="true"/g)||[]).length,1,`Current language: ${file}`);
  assert(switcher.includes(`hreflang="${locale}"`),`Language attribute: ${file}`);
  assert(!/<details\b/.test(header),`Unwanted collapsed menu: ${file}`);
  const footerPaths=[...footer.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(footerPaths,[localizedUrl(''),...primary.slice(1).map(route=>localizedUrl(route)),...externalLinks],`Final footer: ${file}`);
  const canonicalPath = compatibility[route] ? compatibility[route].split('#')[0] : file==='404.html' ? '404.html' : route ? `${route}/` : '';
  const expectedCanonical=new URL(`${base}${prefix}${canonicalPath}`,site).href;
  const canonical=decode(html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? '');
  assert.equal(canonical,expectedCanonical,`Canonical: ${file}`);
  assert.equal(meta('robots'),isPrimary?'index, follow':'noindex, follow',`Index policy: ${file}`);
  for(const attribute of ['og:title','twitter:title']) assert.equal(meta(attribute,attribute.startsWith('og:')?'property':'name'),title,attribute);
  for(const attribute of ['og:description','twitter:description']) assert.equal(meta(attribute,attribute.startsWith('og:')?'property':'name'),description,attribute);
  assert.equal(meta('og:url','property'),canonical);
  assert.equal(meta('og:locale','property'),isZh ? 'zh_TW' : 'en_US');
  const alternates=[...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>[m[1],decode(m[2])]);
  assert.deepEqual(alternates,isPrimary ? [['en',new URL(localizedUrl(route,''),site).href],['zh-Hant',new URL(localizedUrl(route,'zh/'),site).href],['x-default',new URL(localizedUrl(route,''),site).href]] : [],`Bilingual alternates: ${file}`);
  assert.equal(meta('twitter:card'),'summary_large_image');
  for(const attribute of ['og:image','twitter:image']) {
    const image=meta(attribute,attribute.startsWith('og:')?'property':'name');
    assert.equal(image,new URL(`${base}social-preview.png`,site).href);
    await checkReference(image,file);
  }
  if(isPrimary) assert.equal((header.match(/aria-current="page"/g)||[]).length,1,`Current nav item: ${file}`);
  if(compatibility[route]) {
    assert(html.includes('data-compatibility-target') && html.includes(`href="${base}${compatibility[route]}"`),`Compatibility fallback: ${file}`);
    assert(!/http-equiv="refresh"|HTTP 301/i.test(html),`Compatibility pages must remain readable: ${file}`);
  }
  for(const [,attribute,raw] of html.matchAll(/\b(href|src)="([^"]*)"/g)) await checkReference(raw,file,attribute==='href');
  for(const [,value] of html.matchAll(/\bsrcset="([^"]+)"/g)) for(const candidate of value.split(',')) await checkReference(candidate.trim().split(/\s+/)[0],file);
}
assert.equal(titles.size,expectedPages.length,'Distinct titles');
assert.equal(descriptions.size,expectedPages.length,'Distinct descriptions');
for(const file of files.filter(file=>/\.(css|svg|xml|txt)$/.test(file))) {
  const content=await readFile(resolve(root,file),'utf8');
  assert(!forbiddenContent.test(content),`Private data in ${file}`);
  assert(!/profile-text-grow|animation-timeline|@keyframes/.test(content),`Obsolete motion in ${file}`);
  for(const match of content.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)|(?:href|src)=["']([^"']+)["']/g)) {
    const raw=match[1]||match[2];if(!raw.startsWith('#')) await checkReference(raw,file);
  }
}
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');
assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]),localizedPrimary.map(route=>new URL(`${base}${route ? `${route}/` : ''}`,site).href),'Sitemap includes only primary canonical URLs');
assert((await readFile(resolve(root,'robots.txt'),'utf8')).includes(`Sitemap: ${new URL(`${base}sitemap.xml`,site)}`),'Robots sitemap');
for(const file of fontFiles) assert.equal((await readFile(resolve(root,file))).subarray(0,4).toString(),'wOF2',`Font signature: ${file}`);
const social=await readFile(resolve(root,'social-preview.png'));
assert.equal(social.subarray(1,4).toString(),'PNG');assert.equal(social.readUInt32BE(16),1200);assert.equal(social.readUInt32BE(20),630);
const zhCopy=JSON.parse(await readFile('src/i18n/zh.json','utf8'));
assert(Object.values(zhCopy).every(value=>typeof value==='string'&&value.trim()),'Empty translation');
for(const prefix of ['', 'zh/']) {
const home=htmlPages.get(`${prefix}index.html`), research=htmlPages.get(`${prefix}research/index.html`), experience=htmlPages.get(`${prefix}experience/index.html`), about=htmlPages.get(`${prefix}about/index.html`);
function assertOrder(html,values,label) { let previous=-1;for(const value of values) { const position=html.indexOf(value);assert(position>previous,`${label}: ${value}`);previous=position; } }
assertOrder(home,['id="selected-agricultural-vlm"','id="selected-reasoning-verification"','id="selected-retrieval-applications"'],'Home sequence');
assertOrder(research,['id="agricultural-vlm"','id="reasoning-verification"','id="visual-research"','id="publications-title"'],'Research sequence');
assertOrder(experience,['id="roles"','id="engineering-work"','id="retrieval-applications"','id="predictive-modeling"','id="data-pipelines"','id="perception-inference"','id="capabilities"'],'Experience sequence');
assertOrder(about,['id="education"','id="recognition"','id="credentials"'],'About sequence');
assert(research.includes(prefix ? '最終實作採用 DoRA 進行參數高效率微調' : 'parameter-efficient fine-tuning with DoRA'),'DoRA wording');
const collaborative=prefix ? '在合作研究中' : 'In collaborative research';
assert(home.includes(collaborative)&&research.includes(collaborative),'Collaborative attribution');
assert(!research.includes('As the primary researcher'),'Unwanted role preface');
const publicationIds=['fahu-mamba','ssiu-net','transformer-mamba-unet','lvit-cb','lvit-cb-itaoi','virtual-try-on-itac'];
assert.equal((research.match(/data-publication-id=/g)||[]).length,6);
for(const [i,id] of publicationIds.entries()) assert(research.includes(`id="publication-${i+1}" data-publication-id="${id}"`),`Lost publication: ${id}`);
const source=await readFile('src/data/publications.ts','utf8');
const publications=JSON.parse(source.match(/export const publications = (\[[^]*?\]) as const/)[1]);
for(const paper of publications) for(const key of ['title','authors','venue','year','description']) {
  const value=prefix && key==='description' ? zhCopy[paper[key]] : paper[key];
  assert(value && (research.includes(escape(value)) || research.includes(value)),`Missing publication ${paper.id} ${key}`);
}
assert(research.includes('href="#publication-4"')&&research.includes('href="#publication-1"'),'Theme-publication links');
assert.equal((experience.match(/data-role-id=/g)||[]).length,4,'Verified role count');
assert.equal((experience.match(/data-engineering-id=/g)||[]).length,4,'Engineering case count');
assert.equal((about.match(/data-recognition-id=/g)||[]).length,7,'Recognition count');
assert.equal((about.match(/data-learning-id=/g)||[]).length,13,'Credentials, courses, participation');
for(const anchor of [3,4,5]) assert(about.includes(`href="${base}${prefix}research/#publication-${anchor}"`),'Award-publication relationship');
assert(/<section id="courses"/.test(about) && !/<details[^>]*id="courses"/.test(about),'Courses must remain expanded');
assert.equal((about.match(/data-learning-id="course-/g)||[]).length,7,'Seven visible courses');
if(prefix) assert(home.includes('陳麒安') && home.includes('Chi-An Chen'),'Bilingual name');
}
// Every primary-page anchor stays addressable in either language.
for(const route of primary) {
  const file=route ? `${route}/index.html` : 'index.html';
  const ids=html=>[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]).sort();
  assert.deepEqual(ids(htmlPages.get(`zh/${file}`)),ids(htmlPages.get(file)),`Bilingual anchor parity: ${route}`);
}
// Catch untranslated standalone English UI text while retaining formal names.
const readRecords=async file=>JSON.parse((await readFile(file,'utf8')).match(/= (\[[^]*?\])(?: as const[^]*?)?;/)[1]);
const originalPapers=await readRecords('src/data/publications.ts');
const learning=await readRecords('src/data/learning.ts');
const originalEnglish=new Set([
  'Chi-An Chen','EN','LinkedIn','GitHub','Getting Started with AI on Jetson Nano',
  'Best Creative Award · AVSS 2025','Best Conference Papers · IS3C 2025',
  ...originalPapers.flatMap(p=>[p.title,p.authors,p.venue]),
  ...learning.flatMap(item=>[item.name,item.issuer]),
]);
for(const file of expectedPages.filter(file=>file.startsWith('zh/'))) {
  const html=htmlPages.get(file).split('<body>')[1].split('</body>')[0];
  for(const [,raw] of html.matchAll(/>([^<>]+)</g)) {
    const text=decode(raw).trim();
    if(/[A-Za-z]/.test(text)&&!/[\u3400-\u9fff]/.test(text)) assert(originalEnglish.has(text),`Untranslated visible text in ${file}: ${text}`);
  }
}
// Public-facing source audit as well as built output; notes and local references are not inputs.
for(const directory of ['src','public']) for(const file of await listFiles(resolve(directory),resolve(directory))) {
  if(/\.(astro|ts|css|svg|json|txt)$/.test(file)) assert(!forbiddenContent.test(await readFile(resolve(directory,file),'utf8')),`Non-public source in ${directory}/${file}`);
}
console.log(`Validated 8 bilingual primary pages, 4 compatibility pages, 404, ${checkedLinks} local references, and ${files.length} allowed public files.`);
console.log('Passed bilingual metadata, hreflang, sitemap, navigation, content order, publication/recognition links, DoRA/collaboration, public-source/output safety, fonts, and stable-content checks.');
