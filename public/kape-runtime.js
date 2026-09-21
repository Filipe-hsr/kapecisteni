(() => {
'use strict';
if (window.__KAPE_INIT) return;
window.__KAPE_INIT = true;

const IMAGE_KEYS = ['cladding','facade','flats','green','merc','office','pave_after','pave_before','pave_mid','pave_tool','roka','showroom','sky','vac'];
const IMAGES = Object.fromEntries(IMAGE_KEYS.map(k => [k, '/images/' + k + '.jpg']));

/* Recenze z Googlu: sem doplňte další skutečné recenze (text + jméno autora). */
const REVIEWS = [
  { text: 'Se službami jsme byli velice spokojeni. Velmi milý, osobní přístup.', who: 'recenze na Googlu' }
];

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOB = matchMedia('(max-width:820px)');
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
let VH = innerHeight, VW = innerWidth;

/* ---------- theme ---------- */
const theme = {};
const hex = v => { v = v.trim().replace('#', ''); return [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16) / 255); };
function readTheme() { const cs = getComputedStyle(document.documentElement);
  ['bg', 'p0', 'p1', 'p2', 'p3', 'p4', 'steam'].forEach(k => theme[k] = hex(cs.getPropertyValue('--' + k)));
  theme.dark = parseFloat(cs.getPropertyValue('--dark')) || 0; }
readTheme();
new MutationObserver(readTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readTheme);

/* ---------- text split + reveals ---------- */
$$('[data-split]').forEach(el => { let i = 0;
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w"><span class="wi" style="--i:${i++}">${w}</span></span>`).join(' '); });
$$('[data-scrub-words]').forEach(el => el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span>${w}</span>`).join(' '));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: .05 });
$$('[data-split],[data-reveal]').forEach(el => io.observe(el));
requestAnimationFrame(() => { $('.hero h1')?.classList.add('is-in'); $('.chips')?.classList.add('is-in'); $('.hero')?.classList.add('is-in'); $$('.hero [data-reveal]').forEach(el => el.classList.add('is-in')); });
$$('img[data-img]').forEach(im => { im.decoding = 'async'; im.src = IMAGES[im.dataset.img]; });
$$('img[data-src]').forEach(img => { img.addEventListener('error', () => img.remove()); img.loading = 'lazy'; img.src = img.dataset.src; });

/* ---------- nav ---------- */
const nav = $('#nav'), burger = $('.burger');
const closeNav = () => { nav?.classList.remove('is-open'); document.body.style.overflow = ''; burger?.setAttribute('aria-expanded', false); burger?.setAttribute('aria-label', 'Otevřít menu'); };
if (burger) burger.addEventListener('click', () => { if (nav.classList.contains('is-open')) return closeNav();
  nav.classList.add('is-open'); document.body.style.overflow = 'hidden'; burger.setAttribute('aria-expanded', true); burger.setAttribute('aria-label', 'Zavřít menu'); });
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); closeNav();
  const y = t.classList.contains('chap') && !MOB.matches ? t.getBoundingClientRect().top + scrollY + Math.max(0, (t.offsetHeight - innerHeight) / 2) : t.getBoundingClientRect().top + scrollY;
  scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' }); }));

/* ---------- cities marquee ---------- */
{ const c = ['Praha', 'Děčín', 'Rumburk', 'Liberec', 'Mělník', 'Roudnice', 'Litoměřice', 'Kladno', 'Karlovy Vary'].map(n => `<span>${n}</span>`).join(''); const citiesT = $('.cities__t'); if (citiesT) citiesT.innerHTML = c + c; }

/* ---------- services panel ---------- */
const PANEL = [
  { t: 'PuraQleen', p: 'showroom', n: 'Okna a výlohy', b: ['demineralizovaná voda', 'bez šmouh a leštění', 'za plného provozu'], i: '<rect x="30" y="12" width="100" height="76" rx="3" pathLength="1"/><path d="M80 12v76M30 50h100" pathLength="1"/><path d="M44 74 62 26M96 78l22-40" pathLength="1"/>' },
  { t: 'PuraQleen', p: 'roka', n: 'Skleněné a hladké fasády', b: ['sklo, plast i plech', 'do 18 m bez vysokozdvižné techniky', 'stačí přípojka vody'], i: '<path d="M52 92V8h56v84" pathLength="1"/><path d="M52 29h56M52 50h56M52 71h56M71 8v84M90 8v84" pathLength="1"/><path d="M22 92h116M128 92 100 22" pathLength="1"/>' },
  { t: 'Kränzle + Oertzen', p: 'cladding', n: 'Opláštění průmyslových budov', hot: 1, b: ['tlak 250 bar', 'voda až 120 °C', 'bez elektrické přípojky'], i: '<path d="M14 92V44l44-20 0 20 44-20v68z" pathLength="1"/><path d="M26 92V52M38 92V47M50 92V42M70 92V50M82 92V45M94 92V40" pathLength="1"/><path d="M150 92 116 58M112 50l-6-8M120 47l2-10M108 58l-10-2" pathLength="1"/>' },
  { t: 'SpaceVac', p: 'vac', n: 'Interiéry hal ve výškách', b: ['dosah až 15 m', 'karbonové tyče a nástavce', 'bez lešení a odstávky'], i: '<path d="M10 14h140M10 28h140M10 28l14-14 14 14 14-14 14 14 14-14 14 14 14-14 14 14 14-14 14 14" pathLength="1"/><path d="M80 92 98 42" pathLength="1"/><path d="M86 42h24l-4-8H90z" pathLength="1"/>' },
  { t: 'Vysokozdvižná plošina', n: 'Postavební úklidy', b: ['úklid po stavbě a rekonstrukci', 'výšky z vysokozdvižné plošiny', 'stadiony, lázně, obchodní domy'], i: '<path d="M30 88h100M44 88V78h72v10" pathLength="1"/><path d="M52 78l56-30M108 78 52 48M52 48l56-26M108 48 52 22" pathLength="1"/><path d="M40 22h80M46 22V8M114 22V8M46 8h68" pathLength="1"/>' },
  { t: 'Nově v nabídce', p: 'pave_tool', n: 'Dlažba, garáže a střechy', hot: 1, b: ['zámková dlažba', 'garážová stání', 'střechy'], i: '<path d="M16 60h128v32H16zM48 60v32M80 60v32M112 60v32M16 76h128" pathLength="1"/><path d="M30 46 80 12l50 34" pathLength="1"/><path d="M44 46h72" pathLength="1"/>' },
  { t: 'PuraQleen', n: 'Solární panely', b: ['demineralizovaná voda', 'bez vodního kamene', 'bez zbytků čisticích prostředků'], i: '<path d="M34 24h92l20 56H14z" pathLength="1"/><path d="M27.5 42h105M21 61h118M65 24 56 80M95 24l9 56" pathLength="1"/><path d="M80 80v12M62 92h36" pathLength="1"/>' }
];
const panel = $('#panel');
function setPanel(i) { const d = PANEL[i]; if (!d || !panel) return; panel.style.setProperty('--pc', d.hot ? 'var(--hot)' : 'var(--blue)');
  const ic = `<svg viewBox="0 0 160 100">${d.i}</svg>`;
  panel.innerHTML = `${d.p ? `<div class="panel__ph"><img src="${IMAGES[d.p]}" alt="">${ic}</div>` : ic}<p class="panel__tech">${d.t}</p><p class="panel__name">${d.n}</p><ul>${d.b.map(x => `<li>${x}</li>`).join('')}</ul>`; }
setPanel(0);

/* ---------- services accordion ---------- */
const rows = $$('.row');
rows.forEach(r => $('.row__btn', r).addEventListener('click', () => { const open = r.classList.contains('open');
  rows.forEach(o => { o.classList.remove('open'); $('.row__btn', o).setAttribute('aria-expanded', false); });
  if (!open) { r.classList.add('open'); $('.row__btn', r).setAttribute('aria-expanded', true); setPanel(rows.indexOf(r)); } }));

/* ---------- reference cards: 3D tilt ---------- */
let ptx = 0, pty = 0;
const rcards = $$('.rcard, .founder, .hero__frame');
const heroBg = $('.hero__bg img');
const hf = $('.hero__frame'); if (hf) hf.addEventListener('pointermove', e => { const r = hf.getBoundingClientRect(); hf.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1)); hf.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1)); });
/* lightbox */
const lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Zvětšená fotografie'); lb.innerHTML = '<img alt=""><button type="button" aria-label="Zavřít">×</button>'; document.body.append(lb);
const lbClose = () => lb.classList.remove('on'); lb.addEventListener('click', lbClose); addEventListener('keydown', e => { if (e.key === 'Escape') lbClose(); });
$$('[data-full]').forEach(b => b.addEventListener('click', () => { const im = $('img', lb), src = $('img', b); im.src = IMAGES[b.dataset.full]; im.alt = src ? src.alt : ''; lb.classList.add('on'); $('button', lb).focus(); }));
if (matchMedia('(hover:hover)').matches && !RM) rcards.forEach(c => {
  c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--rx', (((e.clientX - r.left) / r.width - .5) * 12).toFixed(2)); c.style.setProperty('--ry', ((.5 - (e.clientY - r.top) / r.height) * 10).toFixed(2)); c.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1)); c.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1)); });
  c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', 0); c.style.setProperty('--ry', 0); }); });
addEventListener('pointermove', e => { ptx = e.clientX; pty = e.clientY; mouse[0] = e.clientX / VW - .5; mouse[1] = e.clientY / VH - .5; }, { passive: true });

/* ---------- reviews ---------- */
if ($('.stars')) $('.stars').innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'.repeat(5);
const stage = $('#revStage'), dots = $('#revDots'); let revI = 0, revTimer;
if (stage) stage.innerHTML = '';
if (dots) dots.innerHTML = '';
REVIEWS.forEach((r, i) => { if (!stage) return; const f = document.createElement('figure'); f.className = 'rev__q' + (i ? '' : ' on');
  const q = document.createElement('blockquote'); q.textContent = '„' + r.text + '“'; const c = document.createElement('figcaption'); c.textContent = r.who; f.append(q, c); stage.append(f);
  if (REVIEWS.length > 1) { const b = document.createElement('button'); b.setAttribute('aria-label', 'Recenze ' + (i + 1)); if (!i) b.className = 'on'; b.addEventListener('click', () => showRev(i, true)); dots.append(b); } });
function showRev(i, user) { revI = i; $$('.rev__q', stage).forEach((f, k) => f.classList.toggle('on', k === i)); $$('button', dots).forEach((b, k) => b.classList.toggle('on', k === i)); if (user) clearInterval(revTimer); }
if (REVIEWS.length > 1 && !RM) revTimer = setInterval(() => showRev((revI + 1) % REVIEWS.length), 6500);
const score = $('#score'); let scoreDone = false;
if (score) new IntersectionObserver(es => { if (!es[0].isIntersecting || scoreDone || RM) return; scoreDone = true; const t0 = performance.now();
  (function tick(n) { const p = clamp((n - t0) / 1600), v = (1 - Math.pow(1 - p, 4)) * 4.9; score.textContent = v.toFixed(1).replace('.', ','); if (p < 1) requestAnimationFrame(tick); })(t0); }, { threshold: .4 }).observe(score);

/* ================= WebGL particle scene ================= */
const cv = $('#scene'), mouse = [0, 0], mS = [0, 0];
const N = MOB.matches ? 16000 : 44000;
let gl, U = {}, glOK = false;
const VS = `precision highp float;
attribute vec3 aT,aD;attribute vec4 aR;
uniform float uS,uT,uIn,uAsp,uDpr,uSc,uA,uDark;uniform vec2 uOff,uM;uniform vec3 c0,c1,c2,c3,c4,cSt;
varying vec4 vC;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float w(float s,float i){float x=clamp(1.-abs(s-i),0.,1.);return x*x*(3.-2.*x);}
void main(){
 float T=uT;
 vec3 p0=aT;p0.xz=rot(T*.14+uM.x*.7)*p0.xz;
 float fr=mix(-1.6,1.6,fract(T*.085));
 float b0=mix(.3,1.,smoothstep(fr+.05,fr-.3,aT.y))+1.2*smoothstep(.1,0.,abs(aT.y-fr));
 vec3 p1=aD;p1.x*=1.+.06*sin(T*1.6+aD.y*3.);p1.z*=1.+.06*cos(T*1.2+aD.y*3.);p1.xz=rot(T*.3+uM.x*.7)*p1.xz;p1.y+=.07*sin(T*.9);
 float tv=1.-fract(aR.y+T*.06);float arm=floor(aR.x*6.)/6.;float jit=(fract(aR.x*6.)-.5);float av=(arm+jit*jit*jit*.9)*6.2832+tv*8.+T*.7;float rv=.05+pow(tv,1.9)*1.3*(.7+.3*aR.z);
 vec3 p2=vec3(cos(av)*rv,-1.3+tv*2.6,sin(av)*rv);
 float tj=fract(aR.y+T*.3);float aj=aR.x*6.2832;float rj=tj*.4*sqrt(aR.z);
 vec3 ax=normalize(vec3(.26,.965,0.)),pa=vec3(-ax.y,ax.x,0.);
 vec3 p3=vec3(-.4,-1.55,0.)+ax*tj*3.1+pa*cos(aj)*rj+vec3(0.,0.,1.)*sin(aj)*rj;
 float stm=step(.72,aR.w);p3+=stm*vec3(sin(T*.8+aR.x*9.)*.35*tj+tj*tj*.5,tj*.25,0.);
 vec3 pw=vec3((aR.x-.5)*9.,-1.2+.14*sin((aR.x-.5)*9.+T*.8)+.1*sin((aR.y-.5)*12.+T*1.1),(aR.y-.5)*5.5);
 vec3 pf=vec3((aR.x-.5)*11.+.25*sin(T*.3+aR.y*20.),mod(aR.y*7.+T*(.05+.12*aR.z),7.)-3.5,(aR.w-.5)*5.);
 float fld=step(.45,fract(aR.w*7.31));vec3 p4=mix(pw,pf,fld);
 float s=clamp(uS+(aR.w-.5)*.34,0.,4.);
 float w0=w(s,0.),w1=w(s,1.),w2=w(s,2.),w3=w(s,3.),w4=w(s,4.);float ws=w0+w1+w2+w3+w4;
 vec3 p=(p0*w0+p1*w1+p2*w2+p3*w3+p4*w4)/ws;
 float tr=1.-max(max(max(w0,w1),max(w2,w3)),w4)/ws;
 p+=tr*1.6*vec3(sin(aR.x*40.+T),cos(aR.y*37.+T*1.2),sin(aR.z*33.+T*.7));
 float k=clamp(uIn*1.5-aR.w*.5,0.,1.);k=1.-pow(1.-k,4.);
 p=mix((aR.xyz-.5)*vec3(9.,6.,6.)+vec3(0.,0.,1.5),p,k);
 p*=uSc;p.xy+=uOff;p.y-=uM.y*.12;
 float z=4.8-p.z;float f=2.5;
 gl_Position=vec4(p.x*f/uAsp,p.y*f,0.,z);
 float size=(aR.z*aR.z*11.+3.)*mix(1.,.7+.6*tj,w3/ws)*(w0+w1*.7+w2*.62+w3*.75+w4*.9)/ws;
 gl_PointSize=uDpr*uSc*size*(4.8/z);
 vec3 jet=mix(c3,cSt,smoothstep(.15,.85,tj)+stm*.3);
 vec3 col=(c0*w0+c1*w1+c2*w2+jet*w3+c4*w4)/ws;
 float br=mix(1.,b0,w0/ws);
 col=mix(col,mix(col,vec3(1.),.6*uDark+.0),clamp(br-1.,0.,1.));
 float al=(.35+.65*aR.z)*min(br,1.)*uA*k*(1.-tr*1.3)*mix(1.,1.-tj*.75,w3/ws)*mix(1.,mix(.6,.4,fld),w4/ws);
 float dm=(w0+w1*mix(.75,.34,uDark)+w2*mix(.8,.36,uDark)+w3*mix(.8,.36,uDark)+w4*.8)/ws;vC=vec4(col,al*dm*mix(.85,.62,uDark));
}`;
const FS = `precision mediump float;varying vec4 vC;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.08,d);gl_FragColor=vec4(vC.rgb,vC.a*a);}`;

const BVS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const BFS = `precision highp float;
uniform vec2 R;uniform float T,D,Y;uniform vec3 B,C1,C2;
float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/R;float asp=R.x/R.y;
 vec2 p=vec2(uv.x*asp,uv.y+Y)*5.2-250.;vec2 i=p;float c=1.;
 for(int n=0;n<4;n++){float t=T*.22*(1.-3.5/float(n+1));i=p+vec2(cos(t-i.x)+sin(t+i.y),sin(t-i.y)+cos(t+i.x));c+=1./length(vec2(p.x/(sin(i.x+t)/.005),p.y/(cos(i.y+t)/.005)));}
 c=1.17-pow(c/4.,1.4);float k=pow(abs(c),7.);
 float b1=smoothstep(1.,0.,length((uv-vec2(.82+.08*sin(T*.11),.8+.1*cos(T*.13)+Y*.3))*vec2(asp*.7,1.)));
 float b2=smoothstep(.9,0.,length((uv-vec2(.08+.06*cos(T*.09),.12+.08*sin(T*.07)))*vec2(asp*.7,1.)));
 vec3 col=B;
 col=mix(col,C1,b1*mix(.16,.34,D));col=mix(col,C2,b2*mix(.12,.26,D));
 col=mix(col+C1*k*.5, mix(col,C1,k*.2), 1.-D);
 float g=smoothstep(.0,.004,abs(fract((uv.x*asp+Y*.0)*6.)-.5)-.496)+smoothstep(.0,.004,abs(fract((uv.y+Y)*6.)-.5)-.496);
 col=mix(col,mix(C1,vec3(1.),.3),g*mix(.05,.07,D)*smoothstep(1.2,.2,length(uv-.5)));
 col*=mix(1.,smoothstep(1.35,.4,length(uv-.5)),.5*D);
 col+=(h(gl_FragCoord.xy+fract(T)*37.)-.5)*.022;
 gl_FragColor=vec4(col,1.);}`;
let prP, prB, bufP, bufB;
function initGL() {
  try { gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' }); } catch (e) {}
  if (!gl) return false;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
  const mk = (v, f, names) => { const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, v)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, f));
    names.forEach((n, i) => gl.bindAttribLocation(pr, i, n)); gl.linkProgram(pr); if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr)); return pr; };
  let pr; try { pr = prP = mk(VS, FS, ['aT', 'aD', 'aR']); prB = mk(BVS, BFS, ['p']); } catch (e) { console.warn('GL', e); return false; }
  bufB = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufB); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  'R T D Y B C1 C2'.split(' ').forEach(n => U['b' + n] = gl.getUniformLocation(prB, n));
  gl.useProgram(pr);
  // geometry: tower + drop positions, random seeds
  const S = 10, buf = new Float32Array(N * S), R = Math.random;
  for (let i = 0; i < N; i++) { const o = i * S;
    const W = .95, H = 2.75, FL = 12, CO = 4, r = R(); let u, v, glass = 0;
    if (r < .4) { v = Math.round(R() * FL) / FL; u = R() - .5; } else if (r < .7) { u = Math.round(R() * CO) / CO - .5; v = R(); } else { u = R() - .5; v = R(); glass = 1; }
    const f = (R() * 4) | 0, x = f === 0 ? u * W : f === 1 ? W / 2 : f === 2 ? u * W : -W / 2, z = f === 0 ? W / 2 : f === 1 ? u * W : f === 2 ? -W / 2 : u * W;
    buf[o] = x; buf[o + 1] = (v - .5) * H; buf[o + 2] = z;
    const th = Math.acos(1 - 2 * Math.pow(R(), .85)), ph = R() * 6.2832; let rr = Math.sin(th) * Math.pow(Math.sin(th / 2), 1.5) * 1.12; if (R() < .1) rr *= Math.sqrt(R());
    buf[o + 3] = Math.cos(ph) * rr; buf[o + 4] = Math.cos(th) * 1.25 + .2; buf[o + 5] = Math.sin(ph) * rr;
    buf[o + 6] = R(); buf[o + 7] = R(); buf[o + 8] = glass ? R() * .4 : .35 + R() * .65; buf[o + 9] = R(); }
  bufP = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bufP); gl.bufferData(gl.ARRAY_BUFFER, buf, gl.STATIC_DRAW);
  'uS uT uIn uAsp uDpr uSc uA uDark uOff uM c0 c1 c2 c3 c4 cSt'.split(' ').forEach(n => U[n] = gl.getUniformLocation(pr, n));
  gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); return true;
}
function sizeGL() { const d = Math.min(devicePixelRatio || 1, MOB.matches ? 1.25 : 1.6); cv.width = Math.round(VW * d); cv.height = Math.round(VH * d); gl.viewport(0, 0, cv.width, cv.height); cv._d = d; }
glOK = cv ? initGL() : false; if (glOK) sizeGL(); else if (cv) cv.style.display = 'none';

/* scroll → shape: anchors are section centres; shapes hold while a chapter is being read */
const anchors = [{ el: $('.hero'), s: 0 }, ...$$('.chap').map(el => ({ el, s: +el.dataset.shape })), { el: $('#proc'), s: 4 }];
const OFF = { d: [[1.45, 0], [-1.45, .4], [1.45, .42], [-1.3, .5], [0, 0]], m: [[.5, 1.25], [0, .95], [0, .95], [0, .9], [0, -.2]] };
let shape = 0, shapeT = 0, offX = 1.45, offY = 0, alpha = 1, sc = 1;
const tech = $('.tech'), contact = $('.contact'), rail = $('.rail'), railLinks = $$('.rail a');
function sceneTargets() {
  const vc = VH / 2, cs = anchors.map(a => { const r = a.el.getBoundingClientRect(); return a.s === 0 ? Math.min(r.top + r.height / 2, r.top + VH / 2) : a.s === 4 ? r.top + VH * .2 : r.top + r.height / 2; });
  let s = 0;
  if (vc <= cs[0]) s = 0; else if (vc >= cs[cs.length - 1]) s = 4;
  else for (let i = 0; i < cs.length - 1; i++) if (vc >= cs[i] && vc < cs[i + 1]) { s = lerp(anchors[i].s, anchors[i + 1].s, sstep(.3, .78, (vc - cs[i]) / (cs[i + 1] - cs[i]))); break; }
  shapeT = s;
  const cr = contact.getBoundingClientRect(), inContact = cr.top < VH * .9;
  if (inContact) shapeT = 4;
  const tr = tech.getBoundingClientRect();
  rail.classList.toggle('on', tr.top < VH * .3 && tr.bottom > VH * .8);
  const act = Math.round(shape); railLinks.forEach((a, i) => a.classList.toggle('on', act === i + 1));
  return inContact ? .9 : (MOB.matches ? (scrollY < VH * .6 ? .4 : .85) : 1);
}

/* ---------- scrubbed DOM bits ---------- */
const scrubWords = $$('[data-scrub-words]').map(el => ({ el, ws: $$('span', el) }));
const eqLine = $('.eq__line'), eqParts = $$('.eq__line i, .eq__line em').map(el => ({ el, w: 0 }));
function measureEq() { eqParts.forEach(o => { o.el.style.width = ''; }); eqParts.forEach(o => { o.w = o.el.getBoundingClientRect().width; }); }
if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureEq); addEventListener('load', measureEq); addEventListener('resize', measureEq); measureEq();
const phs = $$('.founder__ph, .pave__ph, .hero__frame'), people = $('.people'), plus = $('.plus span');
if (people) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { people.classList.add('is-in'); o.disconnect(); } }, { rootMargin: '0px 0px -18% 0px' }).observe(people);
const chips = $$('.chips li'), pars = $$('[data-par]').map(el => ({ el, f: +el.dataset.par, v: 0 })), colCards = $$('.rcard[data-col]');
let lastY = scrollY, t0 = performance.now(), lastNow = t0;

function frame(now) {
  const y = scrollY, dy = y - lastY; lastY = y;
  nav.classList.toggle('is-solid', y > 40);
  if (!nav.classList.contains('is-open')) { if (dy > 4 && y > VH * .5) nav.classList.add('is-hidden'); else if (dy < -4 || y < 40) nav.classList.remove('is-hidden'); }

  if (!RM) {
    scrubWords.forEach(({ el, ws }) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > VH) return;
      const p = clamp((VH * .85 - r.top) / (r.height + VH * .3)) * (ws.length + 3); ws.forEach((w, i) => w.style.opacity = clamp(.13 + (p - i) * .45, .13, 1)); });
    if (heroBg && scrollY < VH * 1.1) { heroBg.style.setProperty('--py', (scrollY * .22).toFixed(1)); heroBg.style.setProperty('--mx', (mS[0] * -34).toFixed(1)); heroBg.style.setProperty('--my', (mS[1] * -22).toFixed(1)); }
    if (!MOB.matches && scrollY < VH) chips.forEach(c => { c.style.setProperty('--mx', (mS[0] * +c.dataset.depth * 2).toFixed(1)); c.style.setProperty('--my', (mS[1] * +c.dataset.depth * 2 - scrollY * .12 * Math.sign(+c.dataset.depth)).toFixed(1)); });
    pars.forEach(o => { const r = o.el.getBoundingClientRect(); if (r.bottom - o.v < -200 || r.top - o.v > VH + 200) return; o.v = (r.top - o.v + r.height / 2 - VH / 2) * o.f; o.el.style.transform = `translate3d(0,${o.v.toFixed(1)}px,0)`; });
    if (!MOB.matches && colCards.length) { const r = colCards[0].parentElement.getBoundingClientRect(); if (r.bottom > -100 && r.top < VH + 100) { const v = ((r.top + r.height / 2 - VH / 2) * -.07 + 30).toFixed(1); colCards.forEach(c => c.style.setProperty('--py', v)); } }
    phs.forEach(ph => { const r = ph.getBoundingClientRect(); if (r.bottom < 0 || r.top > VH) return; ph.style.setProperty('--py', (((r.top + r.height / 2) - VH / 2) * -.05).toFixed(1));
      ph.style.setProperty('--fill', sstep(VH * .95, VH * .1, r.top).toFixed(3) * .82 + .08); });
    { const r = eqLine.getBoundingClientRect(); if (r.bottom > -50 && r.top < VH + 50) { const k = sstep(VH * .72, VH * .3, r.top + r.height / 2); eqLine.style.setProperty('--k', k.toFixed(3)); eqParts.forEach(o => { if (o.w) o.el.style.width = (o.w * (1 - k)).toFixed(1) + 'px'; }); } }
    { const r = people.getBoundingClientRect(); if (r.top < VH && r.bottom > 0) plus.style.setProperty('--rot', ((VH - r.top) * .35).toFixed(1)); }
  }

  if (glOK) {
    const aT = sceneTargets();
    const hr = anchors[0].el.getBoundingClientRect(), cr = contact.getBoundingClientRect(), tr = tech.getBoundingClientRect(), pr = anchors[anchors.length - 1].el.getBoundingClientRect();
    const dtk = 1 - Math.pow(.93, clamp((now - lastNow) / 16.7, .2, 6)); lastNow = now;
    shape = RM ? shapeT : lerp(shape, shapeT, dtk);
    const O = MOB.matches ? OFF.m : OFF.d, i0 = Math.floor(clamp(shape, 0, 3.999)), f = shape - i0, e = f * f * (3 - 2 * f);
    offX = lerp(O[i0][0], O[i0 + 1][0], e); offY = lerp(O[i0][1], O[i0 + 1][1], e);
    alpha = lerp(alpha, aT, .08); const SCS = [1, .8, .8, .8, 1]; sc = (MOB.matches ? .58 : clamp(VW / 1500, .78, 1.05)) * (MOB.matches ? 1 : lerp(SCS[i0], SCS[i0 + 1], e));
    mS[0] = lerp(mS[0], mouse[0], .04); mS[1] = lerp(mS[1], mouse[1], .04);
    if (document.visibilityState === 'visible') {
      const hotK = clamp(1 - Math.abs(shape - 3)); const c1 = theme.p1.map((v, i) => lerp(v, theme.p3[i], hotK * .8));
      gl.disable(gl.BLEND); gl.useProgram(prB); gl.bindBuffer(gl.ARRAY_BUFFER, bufB); gl.enableVertexAttribArray(0); gl.disableVertexAttribArray(1); gl.disableVertexAttribArray(2);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(U.bR, cv.width, cv.height); gl.uniform1f(U.bT, RM ? 8 : now / 1000); gl.uniform1f(U.bD, theme.dark); gl.uniform1f(U.bY, scrollY / VH * .35);
      gl.uniform3fv(U.bB, theme.bg); gl.uniform3fv(U.bC1, c1); gl.uniform3fv(U.bC2, theme.p0); gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.enable(gl.BLEND); gl.useProgram(prP); gl.bindBuffer(gl.ARRAY_BUFFER, bufP); gl.enableVertexAttribArray(1); gl.enableVertexAttribArray(2);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 40, 0); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 40, 12); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 40, 24);
      if (theme.dark) gl.blendFunc(gl.SRC_ALPHA, gl.ONE); else gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform1f(U.uS, shape); gl.uniform1f(U.uT, RM ? 12 : now / 1000); gl.uniform1f(U.uIn, RM ? 1 : clamp((now - t0 - 200) / 2800));
      gl.uniform1f(U.uAsp, VW / VH); gl.uniform1f(U.uDpr, cv._d); gl.uniform1f(U.uSc, sc); gl.uniform1f(U.uA, alpha); gl.uniform1f(U.uDark, theme.dark);
      gl.uniform2f(U.uOff, offX * (MOB.matches ? 1 : clamp(VW / VH / 1.78, .6, 1.1)), offY); gl.uniform2f(U.uM, mS[0], mS[1]);
      gl.uniform3fv(U.c0, theme.p0); gl.uniform3fv(U.c1, theme.p1); gl.uniform3fv(U.c2, theme.p2); gl.uniform3fv(U.c3, theme.p3); gl.uniform3fv(U.c4, theme.p4); gl.uniform3fv(U.cSt, theme.steam);
      gl.drawArrays(gl.POINTS, 0, N);
    }
  }
  requestAnimationFrame(frame);
}

/* ---------- quote calculator + form ---------- */
/* SAZBY JSOU ZÁSTUPNÉ. Před spuštěním webu je nahraďte skutečným ceníkem klienta (Kč za m² bez DPH). */
const RATES = {
  okna:     { label: 'Okna a výlohy',      rate: 18 },
  fasada:   { label: 'Fasáda a opláštění', rate: 35 },
  interier: { label: 'Interiér haly',      rate: 22 },
  dlazba:   { label: 'Dlažba a garáže',    rate: 45, noHeight: true },
  solar:    { label: 'Solární panely',     rate: 14, noHeight: true },
  stavba:   { label: 'Postavební úklid',   rate: null }
};
const K = { height: [1, 1.2, 1.45], dirt: [1, 1.3], freq: [1, .95, .9, .85], min: 1900, spread: .12 };
const L = { h: ['do 6 m', '6–12 m', '12–18 m', 'nad 18 m, s plošinou'], dirt: ['běžné', 'silné'], freq: ['jednorázově', '2× ročně', 'čtvrtletně', 'měsíčně'] };
const form = $('#form'), fmsg = $('.form__msg'), quote = $('#quote'), sum = $('.sum'), areaIn = $('#area');
const steps = $$('.qs'), stepLis = $$('.quote__steps li:not(.quote__prog)'), qBack = $('#qBack'), qNext = $('#qNext'), qSend = $('#qSend');
if (!form || !quote || !areaIn || !qNext || !qSend) { console.warn('KAPE: form markup missing'); return; }
let step = 0, shown = [0, 0], calc = {};
const nice = a => a < 100 ? Math.round(a / 5) * 5 : a < 1000 ? Math.round(a / 10) * 10 : Math.round(a / 50) * 50;
const areaOf = v => nice(10 * Math.pow(300, v / 100));
const fmt = n => Math.round(n).toLocaleString('cs-CZ').replace(/\u00a0/g, ' ');
const val = n => { const c = form.querySelector(`input[name="${n}"]:checked`); return c ? c.value : '0'; };
function recalc() {
  const svc = val('svc') === '0' ? 'okna' : val('svc'), r = RATES[svc], area = areaOf(+areaIn.value), h = +val('h'), d = +val('dirt'), f = +val('freq');
  areaIn.style.setProperty('--v', areaIn.value); $('#areaOut').textContent = fmt(area) + ' m²';
  $('#rowH').hidden = $('#sHrow').hidden = !!r.noHeight;
  const custom = r.rate === null || (!r.noHeight && h === 3);
  let from = 0, to = 0;
  if (!custom) { const base = Math.max(K.min, area * r.rate * (r.noHeight ? 1 : K.height[h]) * K.dirt[d] * K.freq[f]);
    from = Math.round(base * (1 - K.spread) / 100) * 100; to = Math.round(base * (1 + K.spread) / 100) * 100; }
  sum.classList.toggle('custom', custom);
  $('.sum__bar i').style.setProperty('--w', clamp(Math.log10(Math.max(to, 1000)) / 5.3 - .45, .06, 1).toFixed(3));
  $('#sSvc').textContent = r.label; $('#sArea').textContent = fmt(area) + ' m²'; $('#sH').textContent = L.h[h]; $('#sDirt').textContent = L.dirt[d]; $('#sFreq').textContent = L.freq[f] + (f ? ', cena za jeden výjezd' : '');
  calc = { svc: r.label, area, h: r.noHeight ? null : L.h[h], dirt: L.dirt[d], freq: L.freq[f], from, to, custom };
  tween([from, to]);
}
let tw;
function tween(target) { cancelAnimationFrame(tw); const start = shown.slice(), t0 = performance.now(), els = [$('#pFrom'), $('#pTo')];
  (function tick(n) { const p = RM ? 1 : clamp((n - t0) / 600), e = 1 - Math.pow(1 - p, 3);
    shown = start.map((s, i) => s + (target[i] - s) * e); els.forEach((el, i) => el.textContent = fmt(Math.round(shown[i] / 100) * 100));
    if (p < 1) tw = requestAnimationFrame(tick); })(t0); }
function go(n) { quote.style.setProperty('--dir', n > step ? 1 : -1); step = n;
  steps.forEach((s, i) => s.classList.toggle('on', i === n)); stepLis.forEach((li, i) => { li.classList.toggle('on', i === n); li.classList.toggle('done', i < n); });
  $('.quote__prog span').style.setProperty('--p', ((n + 1) / 3).toFixed(3));
  qBack.hidden = n === 0; qNext.hidden = n === 2; qSend.hidden = n !== 2; fmsg.textContent = ''; }
function check(el, showErr) { const box = el.closest('.fl, .check'); if (!box) return true; const ok = el.checkValidity();
  box.classList.toggle('bad', showErr && !ok); if (box.classList.contains('fl')) box.classList.toggle('ok', ok && el.value.trim() !== '' && (el.required || el.type === 'tel')); return ok; }
form.addEventListener('input', e => { if (e.target.closest('[data-step="2"]')) check(e.target, false); else recalc(); });
form.addEventListener('change', e => { if (e.target.closest('[data-step="2"]')) check(e.target, e.target.value !== '' || e.target.type === 'checkbox'); else recalc(); });
let optPtr = 0; $$('.opt').forEach(o => { o.addEventListener('pointerdown', () => optPtr = performance.now()); $('input', o).addEventListener('change', () => { if (step === 0 && performance.now() - optPtr < 1500) setTimeout(() => { if (step === 0) go(1); }, 380); }); });
$$('[data-go]').forEach(b => b.addEventListener('click', () => go(+b.dataset.go)));
qBack.addEventListener('click', () => go(step - 1)); qNext.addEventListener('click', () => go(step + 1));
form.addEventListener('submit', e => { e.preventDefault();
  const req = $$('[data-step="2"] input, [data-step="2"] textarea', form), bad = req.filter(el => !check(el, true));
  if (bad.length) { fmsg.textContent = 'Ještě doplňte zvýrazněná pole.'; bad[0].focus(); return; }
  const d = new FormData(form), price = calc.custom ? 'na míru' : `${fmt(calc.from)} až ${fmt(calc.to)} Kč bez DPH`;
  const body = [`Jméno: ${d.get('name')}`, d.get('firm') ? `Firma: ${d.get('firm')}` : '', `E-mail: ${d.get('email')}`, d.get('tel') ? `Telefon: ${d.get('tel')}` : '', d.get('place') ? `Objekt: ${d.get('place')}` : '', '',
    'KALKULACE Z WEBU', `Služba: ${calc.svc}`, `Plocha: ${fmt(calc.area)} m²`, calc.h ? `Výška: ${calc.h}` : '', `Znečištění: ${calc.dirt}`, `Frekvence: ${calc.freq}`, `Orientační cena: ${price}`, '', d.get('msg') || ''].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
  const showDone = (title, copy) => {
    const h = $('.quote__done h3'); const p = $('.quote__done p');
    if (h) h.textContent = title; if (p) p.innerHTML = copy;
    $('.quote__steps').hidden = $('.quote__body').hidden = true; $('.quote__done').hidden = false;
    quote.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
  };
  const fallbackMailto = () => {
    const a = document.createElement('a'); a.target = '_blank';
    a.href = 'mailto:info@kapecisteni.cz?subject=' + encodeURIComponent('Poptávka z webu: ' + calc.svc) + '&body=' + encodeURIComponent(body);
    a.click();
    showDone('Poptávka je připravená', 'Otevřeli jsme váš e-mailový program s předvyplněnou zprávou včetně kalkulace. Stačí ji odeslat. Kdyby se nic neotevřelo, napište nám přímo na <a href="mailto:info@kapecisteni.cz">info@kapecisteni.cz</a>.');
  };
  qSend.disabled = true; fmsg.textContent = 'Odesílám…';
  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: String(d.get('name') || ''),
      email: String(d.get('email') || ''),
      firm: String(d.get('firm') || ''),
      tel: String(d.get('tel') || ''),
      place: String(d.get('place') || ''),
      msg: String(d.get('msg') || ''),
      need: body,
      quote: calc,
      company: String(d.get('company') || '')
    })
  }).then(r => r.json().then(p => ({ ok: r.ok && p.ok, mocked: p.mocked, error: p.error })).catch(() => ({ ok: false })))
    .then(p => {
      if (!p.ok) throw new Error(p.error || 'fail');
      showDone('Poptávku jsme přijali', p.mocked
        ? 'Děkujeme. Formulář je v tomto prostředí v testovacím režimu — naostro ho zapnete klíčem Web3Forms. Kdykoli pište na <a href="mailto:info@kapecisteni.cz">info@kapecisteni.cz</a>.'
        : 'Děkujeme. Ozveme se s nezávaznou kalkulací. Kdybyste chtěli urychlit, napište na <a href="mailto:info@kapecisteni.cz">info@kapecisteni.cz</a> nebo zavolejte na <a href="tel:+420732686010">+420 732 686 010</a>.');
    })
    .catch(fallbackMailto)
    .finally(() => { qSend.disabled = false; fmsg.textContent = ''; });
});
$('#qAgain').addEventListener('click', () => { $('.quote__steps').hidden = $('.quote__body').hidden = false; $('.quote__done').hidden = true; go(0); });
go(0); recalc();

addEventListener('resize', () => { VH = innerHeight; VW = innerWidth; if (glOK) sizeGL(); });
if (typeof frame === 'function') requestAnimationFrame(frame);
})();
