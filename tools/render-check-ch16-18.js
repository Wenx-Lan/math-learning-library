/* 地面真值检查：把第 16~18 章里所有公式交给真正的 js/math.js 渲染，
 * 并统计每一节/每道题的公式数量、公式外是否残留 &lt;/&gt;、简图调用是否成功。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');

/* ---- 伪 DOM（math.js 需要 document.createElement/createTextNode 等） ---- */
function makeEl(tag) {
  return {
    tagName: tag, className: '', children: [], attrs: {}, style: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return this.attrs[k]; },
    appendChild(c) { if (Array.isArray(c)) { c.forEach((x) => this.appendChild(x)); return c; } this.children.push(c); return c; },
    set innerHTML(v) { this._html = v; },
    get innerHTML() { return this._html || this.children.map(ser).join(''); },
    set textContent(v) { this._text = v; },
    get textContent() { return this._text || ''; }
  };
}
const txt = (t) => ({ nodeType: 3, text: String(t), nodeValue: String(t) });
function ser(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (node.nodeType === 3) return node.text;
  const cls = node.attrs && node.attrs.class ? ' class="' + node.attrs.class + '"' : '';
  const attrs = Object.keys(node.attrs || {}).filter((k) => k !== 'class')
    .map((k) => ' ' + k + '="' + node.attrs[k] + '"').join('');
  return '<' + node.tagName + cls + attrs + '>' + node.children.map(ser).join('') + '</' + node.tagName + '>';
}
const sandbox = {
  console: { warn() {} },
  document: {
    createElement: makeEl, createElementNS: (ns, t) => makeEl(t), createTextNode: txt,
    head: makeEl('head'), body: makeEl('body'),
    querySelectorAll() { return []; }, querySelector() { return null; }
  },
  Promise, Math, Number, String, Array, Object, JSON, isFinite, parseInt, parseFloat, Date, RegExp, Error
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);
sandbox.DSHData = {
  knowledge: {}, types: {},
  registerKnowledge(d) { this.knowledge[d.id] = d; },
  registerTypes(d) { this.types[d.id] = d; },
  setManifest() {}
};

const files = ['js/data/manifest.js', 'js/math.js', 'js/illustrations.js',
  'js/data/fig-16.js', 'js/data/fig-17.js', 'js/data/fig-18.js',
  'js/data/k-16-直线与圆.js', 'js/data/t-16-直线与圆.js',
  'js/data/k-17-解析几何.js', 'js/data/t-17-解析几何.js',
  'js/data/k-18-导数.js', 'js/data/t-18-导数.js'];
files.forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }));

const DSHMath = sandbox.DSHMath;
console.log('DSHMath 可用:', !!(DSHMath && typeof DSHMath.toHTML === 'function'));
console.log('');

/* 公式抽取：与 js/math.js 第 505 行一致 */
const RE = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;

const stats = { formulas: 0, renderFail: 0, rawLeftover: 0, entityOutside: 0, badFrag: [] };

function scan(label, s) {
  if (typeof s !== 'string' || !s) return;
  /* 按出现顺序逐个取“非贪婪”的公式片段：找到 \( 后寻找最近的 \)，
     这样夹在两个公式之间的普通文本（如 \(d<r\) 与 \(d=r\)）不会被误并入公式。 */
  const spans = [];
  let i = 0;
  while (i < s.length) {
    const a = s.indexOf('\\(' , i);
    const b = s.indexOf('\\[', i);
    let open = -1, close = null, isDisplay = false;
    if (a >= 0 && (b < 0 || a < b)) { open = a; close = '\\)'; isDisplay = false; }
    else if (b >= 0) { open = b; close = '\\]'; isDisplay = true; }
    if (open < 0) break;
    const end = s.indexOf(close, open + 2);
    if (end < 0) break;                       // 未闭合，交给结构检查报错
    spans.push([open, end + close.length, isDisplay]);
    i = end + close.length;
  }

  spans.forEach((sp) => {
    const seg = s.slice(sp[0], sp[1]);
    const body = seg.slice(2, -2);
    stats.formulas++;
    try {
      const out = DSHMath.toHTML(body, sp[2]);
      if (!out || out.indexOf('tex-error') >= 0) {
        stats.renderFail++;
        stats.badFrag.push(label + ' → 渲染失败 ' + JSON.stringify(seg));
      }
    } catch (e) {
      stats.renderFail++;
      stats.badFrag.push(label + ' → 渲染异常 ' + JSON.stringify(seg) + ' :: ' + e.message);
    }
  });

  // 公式之外的普通文本（真正会原样显示的部分）
  let outside = '', last = 0;
  spans.forEach((sp) => { outside += s.slice(last, sp[0]); last = sp[1]; });
  outside += s.slice(last);

  if (outside.indexOf('\\[') >= 0 || outside.indexOf('\\]') >= 0) {
    stats.rawLeftover++;
    stats.badFrag.push(label + ' → 公式外残留 \\[ 或 \\]');
  }
  /* 注意：项目约定“HTML 文本里的 < > 写成 &lt; &gt;”，
     因此普通文本中出现 &lt; / &gt; 是正确写法，不算问题；
     反之，普通文本里出现“裸 < >”才是错误（会被当成标签）。 */
  const tagless = outside.replace(/<\/?[a-zA-Z][^>]*>/g, '');
  const bare = tagless.match(/.{0,30}[<>].{0,20}/);
  if (bare) {
    stats.entityOutside++;
    stats.badFrag.push(label + ' → 文本中出现裸 < 或 > :: ' + JSON.stringify(bare[0]));
  }
}

let figOk = 0, figBad = 0;
[16, 17, 18].forEach((ch) => {
  const k = sandbox.DSHData.knowledge[ch];
  const t = sandbox.DSHData.types[ch];

  sandbox.DSHFig.ids().filter((id) => id.indexOf('c' + ch + '-') === 0).forEach((id) => {
    const html = sandbox.DSHFig.use(id);
    if (!html || html.indexOf('notice--err') >= 0 || /undefined|NaN/.test(html)) { figBad++; stats.badFrag.push('ch' + ch + ' 简图 ' + id + ' 渲染异常'); }
    else { figOk++; }
    scan('ch' + ch + ' 简图 ' + id + ' caption', sandbox.DSHFig.get(id).caption);
  });

  let secWithFig = 0;
  k.sections.forEach((s, i) => {
    scan('ch' + ch + ' sec' + i + ' ' + s.title, s.html);
    const html = String(s.html);
    // 简图是否真的被内联进去（用渲染产物里的 data-fig 判断）
    if (html.indexOf('data-fig=') >= 0) secWithFig++;
  });
  k.proofs.forEach((p, i) => {
    scan('ch' + ch + ' proof' + i + ' claim', p.claim);
    (p.steps || []).forEach((st, j) => scan('ch' + ch + ' proof' + i + ' step' + j, st));
  });
  t.types.forEach((ty, i) => {
    (ty.points || []).forEach((p, j) => scan('ch' + ch + ' type' + (i + 1) + ' point' + j, p));
    ty.questions.forEach((q) => {
      scan('ch' + ch + ' ' + q.id + ' stem', q.stem);
      scan('ch' + ch + ' ' + q.id + ' answerText', q.answerText);
      scan('ch' + ch + ' ' + q.id + ' solution', q.solution);
      (q.options || []).forEach((o, j) => scan('ch' + ch + ' ' + q.id + ' opt' + j, o));
      (q.blanks || []).forEach((b, j) => {
        scan('ch' + ch + ' ' + q.id + ' blank' + j + '.before', b.before);
        scan('ch' + ch + ' ' + q.id + ' blank' + j + '.after', b.after);
      });
    });
    ty.examples.forEach((ex) => {
      scan('ch' + ch + ' ' + ex.id + ' problem', ex.problem);
      scan('ch' + ch + ' ' + ex.id + ' solution', ex.solution);
    });
  });
  console.log('第' + ch + '章：含简图的小节 = ' + secWithFig + '/' + k.sections.length);
});

console.log('');
console.log('公式总数        :', stats.formulas);
console.log('渲染失败公式数  :', stats.renderFail);
console.log('公式外残留 \\[ \\] :', stats.rawLeftover);
console.log('文本中裸 < > 处数 :', stats.entityOutside);
console.log('简图渲染正常/异常:', figOk + ' / ' + figBad);
console.log('');
if (stats.badFrag.length) {
  console.log('问题明细（最多 25 条）：');
  stats.badFrag.slice(0, 25).forEach((b) => console.log('  ✗ ' + b));
  process.exitCode = 1;
} else {
  console.log('✓ 全部公式可渲染、无残留定界符、简图正常');
}
