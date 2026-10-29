import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync('src/components/PortfolioAnalytics.tsx', 'utf8');
const helper = source.slice(source.indexOf('function cleanAnalyticsEvent'), source.indexOf('export default function'));
const js = ts.transpileModule(helper, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
const clean = new Function(`${js}; return cleanAnalyticsEvent;`)();
const event = { type:'pageview', url:'https://joellaggui.vercel.app/projects?q=private-search&email=private@example.com#message' };
assert.deepEqual(clean(event), { type:'pageview', url:'https://joellaggui.vercel.app/projects' });
assert.equal(clean({url:'http://127.0.0.1:5173/'}), null);
assert.equal(clean({url:'https://preview-example.vercel.app/'}), null);
assert.equal(clean({url:'invalid'}), null);
assert.equal(clean({url:'https://joellaggui.vercel.app/projects/leadmaps'}).url, 'https://joellaggui.vercel.app/projects/leadmaps');
assert.ok(event.url.includes('private-search'), 'Sanitizing an event must not mutate router state');
console.log('PASS: production-only analytics URLs; search/hash data stripped; invalid/local/preview URLs excluded. No events sent.');
