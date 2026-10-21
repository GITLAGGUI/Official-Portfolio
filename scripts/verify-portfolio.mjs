import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { inflateRawSync } from 'node:zlib';

const require = createRequire(import.meta.url);
const compile = (source) => {
  const exports = {};
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } });
  new Function('require', 'exports', output.outputText)(require, exports);
  return exports;
};

// Compile the actual renderer helpers rather than maintaining a test-only copy.
const assistant = fs.readFileSync('src/components/JoelAssistant.tsx', 'utf8');
const renderer = assistant.slice(assistant.indexOf('function renderInlineMarkdown'), assistant.indexOf('export default function JoelAssistant'));
const { MarkdownMessage } = compile(`import { Fragment, ReactNode } from 'react';\n${renderer}\nexport { MarkdownMessage };`);
const render = (text) => renderToStaticMarkup(React.createElement(MarkdownMessage, { text }));
assert.match(render('Joel builds **websites** and *automations*.'), /<strong>websites<\/strong>/);
assert.match(render('Joel builds **websites** and *automations*.'), /<em>automations<\/em>/);
assert.equal(render('- **Web**\n- AI'), '<ul><li><strong>Web</strong></li><li>AI</li></ul>');
assert.equal(render('1. First\n2. Second'), '<ul><li>First</li><li>Second</li></ul>');
assert.ok(!render('<img src=x onerror=alert(1)>').includes('<img'));
assert.match(render('A\n\nB'), /<p>A<\/p><p>B<\/p>/);

const { projects, legacyProjectRoutes } = compile(fs.readFileSync('src/data/projects.ts', 'utf8'));
const { tools, capabilities } = compile(fs.readFileSync('src/data/capabilities.ts', 'utf8'));
const workflowSkills = JSON.parse(fs.readFileSync('src/data/workflowSkills.json', 'utf8'));
const knownTools = new Set(tools.map((tool) => tool.name));
for (const item of [...capabilities, ...workflowSkills]) for (const name of item.logos ?? item.tools) assert.ok(knownTools.has(name), `Unknown logo tool: ${name}`);
for (const skill of workflowSkills) {
  assert.match(skill.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  const archive = fs.readFileSync(`public/skills/${skill.id}.zip`); const entries = new Map(); let offset = 0;
  while (offset + 30 <= archive.length && archive.readUInt32LE(offset) === 0x04034b50) {
    const method = archive.readUInt16LE(offset + 8), bytes = archive.readUInt32LE(offset + 18);
    const nameLength = archive.readUInt16LE(offset + 26), extraLength = archive.readUInt16LE(offset + 28);
    const name = archive.subarray(offset + 30, offset + 30 + nameLength).toString(); const dataStart = offset + 30 + nameLength + extraLength;
    const payload = archive.subarray(dataStart, dataStart + bytes); entries.set(name, (method === 8 ? inflateRawSync(payload) : payload).toString()); offset = dataStart + bytes;
  }
  assert.deepEqual([...entries.keys()].sort(), [`${skill.id}/LICENSE`, `${skill.id}/SKILL.md`].sort(), 'ZIP contains only the portable skill and license');
  const source = fs.readFileSync(`public/skills/${skill.id}/SKILL.md`, 'utf8');
  assert.equal(entries.get(`${skill.id}/SKILL.md`), source.replace(/\r\n/g, '\n'), `Stale ZIP for ${skill.id}`);
  assert.equal(entries.get(`${skill.id}/LICENSE`), fs.readFileSync('LICENSE', 'utf8').replace(/\r\n/g, '\n'));
  assert.ok(source.replace(/\r\n/g, '\n').startsWith(`---\nname: ${skill.id}\n`));
  assert.doesNotMatch(source, /C:\\Users\\|[A-Z_]+_API_KEY\s*=|BEGIN PRIVATE KEY/);
}
const iconSource = fs.readFileSync('src/components/ToolsStrip.tsx', 'utf8')
  .replace(/import \{ tools, type Tool \} from [^;]+;/, `const tools = ${JSON.stringify(tools)};`)
  .replace(/import \{ Link \} from [^;]+;/, 'const Link = () => null;')
  .replace(/import useMotionVisibility from [^;]+;/, 'const useMotionVisibility = () => false;');
const { ToolIcon } = compile(iconSource);
for (const tool of tools) {
  const html = renderToStaticMarkup(React.createElement(ToolIcon, { tool }));
  for (const [, src] of html.matchAll(/src="([^"]+)"/g)) assert.ok(fs.existsSync(path.join('public', src)), `Missing ${tool.name} logo: ${src}`);
}
const slugs = new Set(projects.map((project) => project.slug));
assert.equal(slugs.size, projects.length, 'Project slugs must be unique');
let imageCount = 0;
for (const project of projects) {
  if (project.previewVideo) assert.ok(fs.existsSync(path.join('public', project.previewVideo)), `Missing motion preview: ${project.slug}`);
  for (const src of [project.hero, ...(project.gallery ?? []).map((image) => image.src)]) {
    assert.ok(src.startsWith('/assets/'), `Unexpected project asset: ${src}`);
    assert.ok(fs.existsSync(path.join('public', decodeURIComponent(src))), `Missing image for ${project.slug}: ${src}`);
    imageCount += 1;
  }
}
for (const route of Object.values(legacyProjectRoutes)) {
  assert.ok(route === '/about#achievements' || slugs.has(route.replace(/^\/projects\//, '')), `Broken legacy route: ${route}`);
}
for (const certificate of ['tron-team-leader-2026.webp', 'tron-third-place-team.webp']) {
  assert.ok(fs.existsSync(path.join('public/assets/certificates', certificate)));
}

const aboutPage = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');
const { evidenceItems } = compile(fs.readFileSync('src/data/achievements.ts', 'utf8'));
assert.doesNotMatch(aboutPage, /working-style|How I work|Evidence & moments|Certificates, competition results/);
assert.match(aboutPage, /Certificates & gallery/);
assert.equal(evidenceItems.filter((item) => item.kind === 'certificate').length, 8);
assert.equal(evidenceItems.filter((item) => item.kind === 'gallery').length, 5);
for (const item of evidenceItems) assert.ok(fs.existsSync(path.join('public', item.image)), `Missing certificate/gallery image: ${item.image}`);
for (const project of projects) for (const video of project.videos ?? []) {
  assert.ok(fs.existsSync(path.join('public', video.src)));
  assert.ok(fs.existsSync(path.join('public', video.poster)));
}

// Render the real detail component for every project, including gallery edge cases.
const detailSource = fs.readFileSync('src/pages/CaseStudyPage.tsx', 'utf8');
const detailBody = detailSource.slice(detailSource.indexOf('export default function'));
const makeDetail = (records, slug) => compile(`
  import { useState } from 'react';
  import { FiArrowLeft, FiArrowRight, FiExternalLink, FiCode, FiFolder } from 'react-icons/fi';
  import { SiMarkdown } from 'react-icons/si';
  const projects = ${JSON.stringify(records)};
  const useParams = () => ({ slug: ${JSON.stringify(slug)} });
  const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);
  const Navigate = () => null;
  const LanguageBar = () => null;
  const Link = ({to, ...props}) => <a href={to} {...props} />;
  ${detailBody}
`).default;

for (const project of projects) {
  const html = renderToStaticMarkup(React.createElement(makeDetail(projects, project.slug)));
  assert.match(html, /id="readme-title">README\.md<\/h2>/);
  assert.doesNotMatch(html, /The challenge|How I approached it|Outcome and proof|section-number/);
  assert.ok(`${project.challenge} ${project.approach[0]}`.split(/\s+/).length <= 85, `${project.slug}: README should stay short`);
}

for (const count of [1, 2, 3, 4, 5]) {
  const fixture = { ...projects[0], videos: undefined, gallery: [
    { src: projects[0].hero, alt: 'Duplicate hero' },
    ...Array.from({ length: count - 1 }, (_, index) => ({ src: `/assets/fixture-${index}.webp`, alt: `Sample ${index}` })),
  ] };
  const html = renderToStaticMarkup(React.createElement(makeDetail([fixture], fixture.slug)));
  assert.equal((html.match(/aria-label="View full-size image:/g) ?? []).length, 1, 'Show one selected full-size image');
  assert.equal((html.match(/aria-label="Show /g) ?? []).length, count > 1 ? count : 0, 'Keep a thumbnail for every unique image');
  assert.doesNotMatch(html, /figcaption/);
}

const leadmaps = projects.find((project) => project.slug === 'leadmaps');
const motionWork = projects.find((project) => project.slug === 'video-editing');
assert.equal(leadmaps.previewVideo, motionWork.previewVideo, 'Use the new film for both product and editing previews');
assert.equal(leadmaps.videos[0].src, motionWork.videos[0].src, 'Use the full new film in both detail pages');
const leadmapsDetail = renderToStaticMarkup(React.createElement(makeDetail(projects, 'leadmaps')));
assert.match(leadmapsDetail, /leadmaps-v11\.mp4/);
assert.match(leadmapsDetail, /aria-label="Project evidence"/);
assert.match(leadmapsDetail, /seo\/search-console\.jpg/);
assert.match(leadmapsDetail, /seo\/openseo-audit\.jpg/);
assert.doesNotMatch(JSON.stringify(projects), /video-editing\/(cinematic|preview)\.(mp4|webp)|leadmaps\/demo\.mp4/);

const languages = JSON.parse(fs.readFileSync('src/data/projectLanguages.json', 'utf8'));
const barSource = fs.readFileSync('src/components/LanguageBar.tsx', 'utf8').replace(/import records from [^;]+;/, `const records = ${JSON.stringify(languages)};`);
const LanguageBar = compile(barSource).default;
for (const [slug, record] of Object.entries(languages)) {
  assert.ok(slugs.has(slug));
  assert.equal(Math.round(record.languages.reduce((sum, item) => sum + item.percent, 0) * 10), 1000);
  assert.equal(record.languages.reduce((sum, item) => sum + item.bytes, 0), record.totalBytes);
  const html = renderToStaticMarkup(React.createElement(LanguageBar, { slug }));
  assert.match(html, /Programming language distribution/);
  for (const language of record.languages) assert.ok(html.includes(`${language.percent.toFixed(1)}%`));
}
console.log(`PASS: safe Markdown, ${projects.length} repository views, ${imageCount} image references, gallery fixtures, 13 evidence records, ${Object.keys(languages).length} language bars, ${tools.length} tool logos, ${workflowSkills.length} portable skill ZIPs, and legacy routes.`);
