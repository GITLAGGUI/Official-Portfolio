import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

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
const slugs = new Set(projects.map((project) => project.slug));
assert.equal(slugs.size, projects.length, 'Project slugs must be unique');
let imageCount = 0;
for (const project of projects) {
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
console.log(`PASS: 6 safe Markdown checks, ${projects.length} unique projects, ${imageCount} image references, legacy routes, and both TRON certificates.`);
