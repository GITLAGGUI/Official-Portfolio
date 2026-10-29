import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const compile = (file) => ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const readModule = (file) => { const exports = {}; new Function('exports', compile(file))(exports); return exports; };
const { themes } = readModule('src/data/themes.ts');
const { projects } = readModule('src/data/projects.ts');
const deferred = () => { let resolve; const promise = new Promise((done) => { resolve = done; }); return { promise, resolve }; };
const flush = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };

// Source helpers: success, failed decode, failed image, and cancellation all settle.
let image;
class ImageStub {
  constructor() { image = this; }
  set src(value) { this.url = value; }
  decode() { return Promise.reject(new Error('unsupported image')); }
}
const helpers = {};
new Function('exports', 'Image', compile('src/utils/startup.ts'))(helpers, ImageStub);
const controller = new AbortController();
let pending = helpers.preloadImage('/portrait.webp', controller.signal);
image.onload(); await pending;
pending = helpers.preloadImage('/missing.webp', controller.signal); image.onerror(); await pending;
pending = helpers.preloadImage('/slow.webp', controller.signal); controller.abort(); await pending;
let sceneSettled = false;
const sceneController = new AbortController();
pending = helpers.waitForScene(sceneController.signal).then(() => { sceneSettled = true; });
await flush(); assert.equal(sceneSettled, false);
helpers.markSceneReady(); await pending; assert.equal(sceneSettled, true);
await helpers.waitForScene(new AbortController().signal);

function harness({ home = true, reduced = false, failed = false } = {}) {
  let now = 0, nextTimer = 0, cursor = 0, completed = 0;
  const timers = new Map(), states = [], effects = [], queued = [];
  const route = deferred(), scene = deferred(), assets = deferred(), fonts = deferred();
  const urls = []; let activeSignal;
  const setTimer = (fn, delay) => { timers.set(++nextTimer, { fn, time: now + delay }); return nextTimer; };
  const react = {
    useState(initial) { const index = cursor++; if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial; return [states[index], (value) => { states[index] = typeof value === 'function' ? value(states[index]) : value; }]; },
    useEffect(fn, deps) { const index = cursor++; const old = effects[index]; if (!old || deps.some((value, i) => value !== old.deps[i])) queued.push(() => { old?.cleanup?.(); effects[index] = { deps, cleanup: fn() }; }); },
  };
  const dependencies = (name) => name === 'react' ? react : name.includes('/themes') ? { themes } : name.includes('/projects') ? { getProjectBySlug: (slug) => projects.find((project) => project.slug === slug) } : name.includes('/startup') ? {
    preloadImage(src, signal) { urls.push(src); activeSignal = signal; return failed ? Promise.reject(new Error('offline')) : assets.promise; },
    waitForScene: () => scene.promise,
  } : require(name);
  const exports = {};
  new Function('require', 'exports', 'setTimeout', 'clearTimeout', 'performance', 'document', 'matchMedia', compile('src/components/StudioLoader.tsx'))(dependencies, exports, setTimer, (id) => timers.delete(id), { now: () => now }, { fonts: { load: () => fonts.promise }, documentElement: { dataset: {} } }, () => ({ matches: reduced }));
  const props = { theme: 'studio', path: home ? '/' : '/contact', preparePage: () => route.promise, onComplete: () => { completed++; } };
  const render = () => { cursor = 0; const tree = exports.default(props); queued.splice(0).forEach((run) => run()); return tree; };
  const advance = async (duration) => { const end = now + duration; while (true) { const next = [...timers.entries()].filter(([,timer]) => timer.time <= end).sort((a,b) => a[1].time-b[1].time)[0]; if (!next) break; now = next[1].time; timers.delete(next[0]); next[1].fn(); await flush(); render(); } now = end; await flush(); return render(); };
  const find = (tree, predicate) => { if (!tree || typeof tree !== 'object') return; if (predicate(tree)) return tree; for (const child of [tree.props?.children].flat(Infinity)) { const match = find(child, predicate); if (match) return match; } };
  const cleanup = () => effects.forEach((effect) => effect?.cleanup?.());
  render();
  return { render, advance, route, scene, assets, fonts, urls, find, cleanup, signal: () => activeSignal, completed: () => completed, timers };
}

const ready = harness();
ready.route.resolve(); ready.assets.resolve(); ready.fonts.resolve(); await flush();
let tree = ready.render();
assert.equal(ready.find(tree, (node) => node.props.role === 'progressbar').props['aria-valuenow'], 100, 'The Home gallery must open independently of the 3D scene');
ready.scene.resolve(); await flush();
tree = await ready.advance(299); assert.ok(!tree.props.className.includes('--leaving'));
tree = await ready.advance(1); assert.ok(tree.props.className.includes('--leaving'));
await ready.advance(350); assert.equal(ready.completed(), 1);
assert.equal(ready.urls.length, 3, 'Only the small avatar and two first-screen project posters are preloaded');
assert.ok(ready.urls.every((url) => !url.endsWith('.mp4')), 'Videos must not block entry');
ready.cleanup();

const slow = harness();
tree = await slow.advance(2200); assert.ok(tree.props.className.includes('--leaving')); assert.equal(slow.signal().aborted, true);
assert.equal(slow.find(tree, (node) => node.props.role === 'progressbar').props['aria-valuenow'], 0, 'A timeout must not invent completed progress');
await slow.advance(350); assert.equal(slow.completed(), 1); slow.cleanup();

const skip = harness();
skip.find(skip.render(), (node) => node.type === 'button').props.onClick(); skip.render();
await skip.advance(350); assert.equal(skip.completed(), 1); skip.cleanup(); assert.equal(skip.timers.size, 0);

const direct = harness({ home: false, reduced: true, failed: true });
direct.route.resolve(); direct.fonts.resolve(); await flush();
tree = await direct.advance(300); assert.ok(tree.props.className.includes('--leaving'), 'Image errors must not trap the visitor');
await direct.advance(100); assert.equal(direct.completed(), 1); assert.equal(direct.urls.length, 1, 'Contact entry must not fetch the Home scene or portraits'); direct.cleanup();

const unmounted = harness(); unmounted.cleanup();
unmounted.route.resolve(); unmounted.assets.resolve(); unmounted.scene.resolve(); unmounted.fonts.resolve();
await unmounted.advance(6000); assert.equal(unmounted.completed(), 0); assert.equal(unmounted.timers.size, 0);
console.log('PASS: real startup readiness, nonblocking 3D scene, image failures, timeout, skip, reduced motion, direct routes, cancellation, and no blocking video downloads.');
