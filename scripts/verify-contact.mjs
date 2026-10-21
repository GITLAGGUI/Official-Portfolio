import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const source = fs.readFileSync('src/utils/sendEmail.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const values = { name: 'QA visitor', email: 'qa@example.com', subject: 'Portfolio behavior check', message: 'Local test, never sent externally.' };
let request;
function load(fetcher) { const exports = {}; new Function('exports', 'fetch', js)(exports, fetcher); return exports.sendEmail; }
await load(async (url, init) => { request = { url, ...init }; return { ok: true }; })(values);
const sent = JSON.parse(request.body);
assert.equal(sent.template_params.reply_to, values.email);
assert.equal(sent.template_params.user_message, values.message);
assert.ok(request.signal, 'Contact requests must have a timeout');
await assert.rejects(() => load(async () => ({ ok: false, status: 429 }))(values), /429/);
await assert.rejects(() => load(async () => { throw new Error('offline'); })(values), /offline/);

// Exercise the real form handler and its rendered success dialog state without sending email.
const page = ts.transpileModule(fs.readFileSync('src/pages/ContactPage.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
async function formCase(accept) {
  const states = []; let cursor = 0; let reset = false;
  const react = { useState: (initial) => { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], (value) => { states[index] = value; }]; } };
  const dependencies = (name) => name === 'react' ? react : name === 'react-router-dom' ? { useSearchParams: () => [new URLSearchParams()] } : name.includes('sendEmail') ? { sendEmail: async () => { if (!accept) throw new Error('provider rejected'); } } : name.includes('Dialog') ? { default: 'dialog' } : require(name);
  const exports = {};
  const Form = class { get(key) { return ({ name: values.name, email: values.email, project: values.subject, details: values.message })[key] ?? ''; } };
  new Function('require', 'exports', 'FormData', page)(dependencies, exports, Form);
  const find = (element, predicate) => { if (!element || typeof element !== 'object') return; if (predicate(element)) return element; for (const child of [element.props?.children].flat(Infinity)) { const match = find(child, predicate); if (match) return match; } };
  const tree = exports.default(); const form = find(tree, (node) => node.type === 'form');
  await form.props.onSubmit({ preventDefault() {}, currentTarget: { reset() { reset = true; } } });
  cursor = 0; const updated = exports.default(); const dialog = find(updated, (node) => node.props?.title === 'Message sent');
  assert.equal(dialog.props.open, accept); assert.equal(reset, accept);
  assert.equal(states[1], accept ? 'success' : 'error');
}
await formCase(true); await formCase(false);
console.log('PASS: provider acceptance, rejection, offline failure, reply-to mapping, timeout, and real form success/error dialog states. No emails sent.');
