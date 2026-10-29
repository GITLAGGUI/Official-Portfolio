import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const source = (file) => fs.readFileSync(file, 'utf8');
const compile = (text) => ts.transpileModule(text, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const find = (tree, type) => { if (!tree || typeof tree !== 'object') return []; return [...(tree.type === type ? [tree] : []), ...[tree.props?.children].flat(Infinity).flatMap((child) => find(child, type))]; };

function preview({ clip = true, saveData = false, wide = true, intent = true } = {}) {
  const slots = [], effects = [], pending = [], frames = new Map(), intervals = new Map();
  let cursor = 0, sequence = 0, active = true, reads = 0, plays = 0, pauses = 0;
  const react = {
    useRef(value) { const i = cursor++; return slots[i] ??= { current: value }; },
    useState(value) { const i = cursor++; if (!(i in slots)) slots[i] = value; return [slots[i], (next) => { slots[i] = next; }]; },
    useEffect(fn, deps) { const i = cursor++; const old = effects[i]; if (!old || deps.some((v,j) => v !== old.deps[j])) pending.push(() => { old?.cleanup?.(); effects[i] = { deps, cleanup: fn() }; }); },
  };
  const element = { style: {}, parentElement: { getBoundingClientRect() { reads++; return { left:0, top:0, width:100, height:100 }; } } };
  const player = { src:'', getAttribute: () => player.src, play: () => { plays++; return Promise.resolve(); }, pause: () => { pauses++; } };
  const dependencies = (name) => name === 'react' ? react : name.includes('useMediaQuery') ? { default: () => wide } : name.includes('useMotionVisibility') ? { default: () => active } : require(name);
  const exports = {};
  new Function('require','exports','navigator','requestAnimationFrame','cancelAnimationFrame','setInterval','clearInterval', compile(source('src/components/ProjectPreview.tsx')))(dependencies, exports, { connection:{saveData} }, (fn) => { frames.set(++sequence,fn); return sequence; }, (id) => frames.delete(id), (fn) => { intervals.set(++sequence,fn); return sequence; }, (id) => intervals.delete(id));
  const project = { hero:'/hero.webp', heroAlt:'Project', title:'Project', gallery:[{src:'/one.webp'},{src:'/two.webp'}], ...(clip ? {previewVideo:'/demo.mp4'} : {}) };
  const render = () => { cursor = 0; const tree = exports.default({project,intent}); tree.ref.current = element; find(tree,'video').forEach((node) => { node.ref.current = player; }); pending.splice(0).forEach((run) => run()); return tree; };
  return { render, setActive: (value) => { active=value; }, frames, intervals, element, player, reads:()=>reads, plays:()=>plays, pauses:()=>pauses, cleanup:()=>effects.forEach((effect)=>effect?.cleanup?.()) };
}
const video = preview(); let tree = video.render();
assert.equal(find(tree,'img').length,1, 'A video card needs only its poster, not hidden gallery images');
assert.equal(video.plays(),1); assert.equal(video.player.src,'/demo.mp4');
for (let i=0;i<100;i++) tree.props.onPointerMove({pointerType:'mouse',clientX:i,clientY:50,currentTarget:video.element});
assert.equal(video.frames.size,1); assert.equal(video.reads(),0);
const callback=[...video.frames.values()][0]; video.frames.clear(); callback();
assert.equal(video.reads(),1); assert.match(video.element.style.transform,/rotateY\(2.45deg\)/);
tree.props.onPointerMove({pointerType:'mouse',clientX:0,clientY:0,currentTarget:video.element});
tree.props.onPointerLeave({currentTarget:video.element}); assert.equal(video.frames.size,0);
video.setActive(false); tree=video.render(); assert.ok(video.pauses()>=1);
tree.props.onPointerMove({pointerType:'mouse',clientX:50,clientY:50,currentTarget:video.element}); assert.equal(video.frames.size,0); video.cleanup();
const saver=preview({saveData:true}); saver.render(); assert.equal(saver.plays(),0); assert.equal(saver.player.src,''); saver.cleanup();
const resting=preview({intent:false}); resting.render(); assert.equal(resting.plays(),0); assert.equal(resting.player.src,'','Desktop cards wait for hover or focus'); resting.cleanup();
const mobile=preview({wide:false}); mobile.render(); assert.equal(mobile.plays(),0); assert.equal(mobile.player.src,'','Mobile cards must not download videos'); mobile.cleanup();
const gallery=preview({clip:false}); assert.equal(find(gallery.render(),'img').length,3); assert.equal(gallery.intervals.size,1); gallery.setActive(false); gallery.render(); assert.equal(gallery.intervals.size,0); gallery.cleanup();

// Execute the real adaptive renderer callback with synthetic frame timings.
const hero=source('src/components/HeroScene.tsx');
const budgetCode=hero.slice(hero.indexOf('function FrameBudget('),hero.indexOf('export default function HeroScene'));
function budget(active=true) {
  let frame;
  const run=new Function('useRef','useEffect','useFrame',`${compile(budgetCode)}; return FrameBudget;`)((current)=>({current}), (effect)=>effect(), (fn)=>{frame=fn;});
  const changes=[]; const state={viewport:{dpr:1.5},setDpr(value){changes.push(value);state.viewport.dpr=value;}};
  run({active}); return { step:(delta,count)=>{for(let i=0;i<count;i++)frame(state,delta);},changes };
}
const steady=budget(); steady.step(1/60,180); steady.step(.3,1); assert.equal(steady.changes.length,0);
const slow=budget(); slow.step(1/30,180); assert.deepEqual(slow.changes,[1.25,1]);
const stopped=budget(false); stopped.step(1/30,180); assert.equal(stopped.changes.length,0);

// Execute App's scroll update and verify all layout reads precede style writes.
const app=source('src/App.tsx');
const scrollCode=app.slice(app.indexOf('    let frame = 0;'),app.indexOf("    const media = matchMedia('(prefers-reduced-motion: reduce)');",app.indexOf('    let frame = 0;')));
const log=[], scrollFrames=new Map(); let scrollID=0;
const elements=[10,60,140].map((top)=>({getBoundingClientRect(){log.push('read');return {top};},style:{get transform(){return this.value??'';},set transform(value){log.push('write');this.value=value;}}}));
const region={getBoundingClientRect(){log.push('read');return {top:0};},clientHeight:400,querySelectorAll:()=>elements};
const update=new Function('region','paused','matchMedia','requestAnimationFrame',`${compile(scrollCode)};return update;`)(region,false,()=>({matches:false}),(fn)=>{scrollFrames.set(++scrollID,fn);return scrollID;});
for(let i=0;i<100;i++)update(); assert.equal(scrollFrames.size,1);
[...scrollFrames.values()][0]();
assert.deepEqual(log,['read','read','read','read','write','write','write']);

// The ambient buffer and gradient cache run through the actual canvas component.
let gradients=0, resized, cleanup, backgroundFrame=0; const backgroundFrames=new Map();
const ctx=new Proxy({createRadialGradient(){gradients++;return {addColorStop(){}};}},{get(target,key){return target[key]??(()=>{});}});
const canvas={width:0,height:0,getContext:()=>ctx};
const host={getBoundingClientRect:()=>({width:1920,height:1080})}; let reference=0;
const exports={};
new Function('require','exports','ResizeObserver','getComputedStyle','devicePixelRatio','matchMedia','window','requestAnimationFrame','cancelAnimationFrame',compile(source('src/components/LandingBackdrop.tsx')))((name)=>name==='react'?{useRef:()=>({current:reference++===0?host:canvas}),useEffect:(fn)=>{cleanup=fn();}}:name.includes('useMotionVisibility')?{default:()=>true}:require(name),exports,class{constructor(fn){resized=fn;}observe(){}disconnect(){}},()=>({getPropertyValue:()=> '#c1d9e8'}),2,()=>({matches:false}),{addEventListener(){},removeEventListener(){}},(fn)=>{backgroundFrames.set(++backgroundFrame,fn);return backgroundFrame;},(id)=>backgroundFrames.delete(id));
exports.default({theme:'studio'});
assert.equal(canvas.width*canvas.height,1920*1080); assert.equal(gradients,1);
for(let i=1;i<=120;i++){const [id,fn]=[...backgroundFrames.entries()][0];backgroundFrames.delete(id);fn(i*1000/60);}
assert.equal(gradients,1,'The static studio glow must not allocate a new gradient each frame');
resized(); assert.equal(gradients,2); cleanup(); assert.equal(backgroundFrames.size,0);

const data={};new Function('exports',compile(source('src/data/projects.ts')))(data);
const featured=data.projects.filter((project)=>['riceguardai','leadmaps','video-editing'].includes(project.slug));
const oldImages=featured.reduce((count,project)=>count+Math.min(3,1+(project.gallery?.length??0)),0);
console.log(`PASS: video posters ${oldImages} -> ${featured.length} Home image layers; 100 pointer events -> 1 scheduled layout read; Data Saver blocks preview downloads; offscreen playback/slideshows pause.`);
console.log('PASS: batched parallax reads, sustained-frame DPR adaptation, inactive renderer, 1x ambient buffer, cached gradient and animation cleanup. Synthetic timings, not measured device FPS.');
