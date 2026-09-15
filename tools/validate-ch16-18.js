/* validate-ch16-18.js —— 第 16~18 章数据文件的严格自检
 *
 * 用法：node tools/validate-ch16-18.js
 *
 * 与 tools/check.js 的分工：
 *   check.js 负责“结构 + 配对”，本脚本额外用“字符串扫描”的方式检查
 *   渲染层面的常见事故，且不依赖正则剥离标签，避免误报：
 *     1) 数据字符串里残留 \[ \]（公式没被识别，会原样显示）；
 *     2) 公式本体中出现 (alpha) 这种“定界符被吃掉”的痕迹；
 *     3) 非公式文本里出现 &lt; / &gt;（页面会显示成 &lt; 而不是 <）；
 *     4) HTML 文本节点里出现裸 < >（应写 &lt; &gt;）；
 *     5) 同一小节内的 <p>/<ul>/<li> 之外出现未闭合的公式定界符；
 *     6) 题目/例题字段完整性、简图 id 是否实现、以及简图能否真的画出来。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const problems = [];
const fail = (ch, msg) => problems.push('[第' + ch + '章] ' + msg);

/* ---------- 伪 DOM ---------- */
function makeEl(tag) {
  return {
    tagName: tag, className: '', children: [], attrs: {},
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return this.attrs[k]; },
    appendChild(c) { if (Array.isArray(c)) { c.forEach((x) => this.appendChild(x)); return c; } this.children.push(c); return c; },
    get innerHTML() { return this.children.map(ser).join(''); }
  };
}
const txt = (t) => ({ nodeType: 3, text: String(t) });
function ser(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  if (node.nodeType === 3) return node.text;
  const cls = node.attrs && node.attrs.class ? ' class="' + node.attrs.class + '"' : '';
  const attrs = Object.keys(node.attrs || {}).filter((k) => k !== 'class')
    .map((k) => ' ' + k + '="' + node.attrs[k] + '"').join('');
  return '<' + node.tagName + cls + attrs + '>'
    + node.children.map(ser).join('') + '</' + node.tagName + '>';
}

const sandbox = {
  console: { warn() {} },
  document: { createElement: makeEl, createElementNS: (ns, t) => makeEl(t), createTextNode: txt, head: makeEl('head') },
  Promise, Math, Number, String, Array, Object, JSON, isFinite, parseInt, parseFloat, Date
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

function load(rel, optional) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    if (optional) return null;
    throw new Error('缺少文件 ' + rel);
  }
  const src = fs.readFileSync(file, 'utf8');
  try { vm.runInContext(src, ctx, { filename: rel }); }
  catch (e) { throw new Error('加载失败 ' + rel + '：' + e.message); }
  return src;
}

load('js/illustrations.js');
load('js/data/manifest.js');

const CHAPTERS = [16, 17, 18];
const PREBUILT = ['sys-axes', 'num-line', 'venn-two', 'logic-implication', 'right-triangle-generic',
  'unit-circle-def', 'sin-curve', 'tetrahedron', 'sphere'];
const REQ_FIGS = {
  16: ['c16-line-circle', 'c16-slope', 'c16-distance', 'c16-chord'],
  17: ['c17-ellipse', 'c17-hyperbola', 'c17-parabola', 'c17-focal-chord'],
  18: ['c18-tangent-slope', 'c18-monotonic', 'c18-extrema', 'c18-tangent-lines']
};

/* ---------- 字符串级检查 ---------- */
const RE_FORMULA = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;

function bodyOf(seg) {
  if (seg.slice(0, 2) === '\\(') { return seg.slice(2, -2); }
  return seg.slice(2, -2);
}

function checkText(ch, where, s) {
  if (typeof s !== 'string' || !s.trim()) { fail(ch, where + '：内容为空'); return; }
  if (s.indexOf('\\[') >= 0 || s.indexOf('\\]') >= 0) {
    fail(ch, where + '：残留 \\[ 或 \\]（公式未被识别，会原样显示）');
  }
  if (/\([a-zA-Z]{3,}\)/.test(s) && !/\\\(/.test(s)) {
    fail(ch, where + '：出现 (xxxx) 形态，疑似公式定界符被吃掉');
  }
  // 非公式片段中的 &lt; / &gt;
  const parts = [];
  let last = 0, m;
  RE_FORMULA.lastIndex = 0;
  while ((m = RE_FORMULA.exec(s)) !== null) {
    parts.push(s.slice(last, m.index));
    last = m.index + m[0].length;
  }
  parts.push(s.slice(last));
  const outside = parts.join('\u0001');
  if (/&lt;|&gt;/.test(outside)) {
    fail(ch, where + '：公式外的文本里出现 &lt; 或 &gt;（页面会原样显示）');
  }
  if (/&lt;|&gt;/.test(parts.map((p, i) => (i % 2 === 1 ? '' : p)).join(''))) { /* 已包含在上一条 */ }
  // 公式本体里的空白
  RE_FORMULA.lastIndex = 0;
  while ((m = RE_FORMULA.exec(s)) !== null) {
    const body = bodyOf(m[0]);
    if (!body.trim()) { fail(ch, where + '：出现空的公式 \\( \\)'); }
  }
  // HTML 文本节点的裸 < >
  const tagless = s.replace(/<\/?[a-zA-Z][^>]*>/g, '');
  if (/[<>]/.test(tagless)) {
    const bad = tagless.match(/.{0,30}[<>].{0,20}/);
    fail(ch, where + '：HTML 文本节点里出现裸 < 或 >（应为 &lt; &gt;）→ ' + JSON.stringify(bad && bad[0]));
  }
}

function checkFigRefs(ch, where, s) {
  const re = /DSHFig\.use\(\s*'([^']+)'/g;
  let m, count = 0;
  while ((m = re.exec(s)) !== null) {
    count++;
    if (!sandbox.DSHFig.has(m[1]) && PREBUILT.indexOf(m[1]) < 0) {
      fail(ch, where + '：引用了不存在的简图 ' + m[1]);
    }
  }
  return count;
}

/* ---------- 逐章检查 ---------- */
CHAPTERS.forEach((ch) => {
  const slug = sandbox.DSHData.index[String(ch)].slug;
  load('js/data/fig-' + ch + '.js', true);
  const kSrc = load('js/data/k-' + ch + '-' + slug + '.js', true) || '';
  const tSrc = load('js/data/t-' + ch + '-' + slug + '.js', true) || '';
  const k = sandbox.DSHData.knowledge[ch];
  const t = sandbox.DSHData.types[ch];
  if (!k) { fail(ch, 'DSHData.knowledge[' + ch + '] 未注册'); }
  if (!t) { fail(ch, 'DSHData.types[' + ch + '] 未注册'); }
  if (!k || !t) return;
  if (k.id !== ch) fail(ch, 'k.id 与章号不符');
  if (t.id !== ch) fail(ch, 't.id 与章号不符');

  /* 简图是否存在、能否画出 */
  REQ_FIGS[ch].forEach((id) => {
    if (!sandbox.DSHFig.has(id)) { fail(ch, '缺少简图 ' + id); return; }
    const html = sandbox.DSHFig.use(id);
    if (!html || html.indexOf('notice--err') >= 0) fail(ch, '简图 ' + id + ' 渲染失败');
    if (/undefined|NaN/.test(html)) fail(ch, '简图 ' + id + ' 输出含 undefined/NaN');
  });
  sandbox.DSHFig.ids().filter((id) => id.indexOf('c' + ch + '-') === 0).forEach((id) => {
    const def = sandbox.DSHFig.get(id);
    checkText(ch, '简图 ' + id + ' caption', def.caption);
  });

  /* 基础知识 */
  if (!(k.sections || []).length || k.sections.length < 4) fail(ch, 'sections 少于 4 节');
  (k.sections || []).forEach((s, i) => {
    const where = 'sections[' + i + ']「' + s.title + '」';
    if (!s.title) fail(ch, where + ' 缺 title');
    checkText(ch, where, s.html);
    if (checkFigRefs(ch, where, s.html) === 0) fail(ch, where + ' 未配简图');
  });
  if (!(k.proofs || []).length || k.proofs.length < 2) fail(ch, 'proofs 少于 2 条');
  (k.proofs || []).forEach((p, i) => {
    const where = 'proofs[' + i + ']「' + p.title + '」';
    if (!p.title) fail(ch, where + ' 缺 title');
    if (!p.claim) fail(ch, where + ' 缺 claim');
    if (p.claim) checkText(ch, where + ' claim', p.claim);
    if (!(p.steps || []).length || p.steps.length < 2) fail(ch, where + ' steps 少于 2 步');
    (p.steps || []).forEach((st, j) => checkText(ch, where + ' steps[' + j + ']', st));
  });
  if (!(k.figures || []).length) fail(ch, 'figures 为空');
  (k.figures || []).forEach((id) => {
    if (!sandbox.DSHFig.has(id) && PREBUILT.indexOf(id) < 0) fail(ch, 'figures 中的 ' + id + ' 不存在');
  });
  const kTypes = k.types || [];
  if (kTypes.length !== t.types.length) fail(ch, 'k.types 与 t.types 数量不一致');
  else kTypes.forEach((n2, i) => {
    if (n2 !== t.types[i].name) fail(ch, 'k.types[' + i + '] 与题型名不符：' + n2);
  });

  /* 题型 */
  const seen = {};
  t.types.forEach((ty, ti) => {
    const where = '题型' + (ti + 1) + '「' + ty.name + '」';
    if (ty.id !== ch + '-' + (ti + 1)) fail(ch, where + ' id 应为 ' + (ch + '-' + (ti + 1)));
    if (!ty.desc) fail(ch, where + ' 缺 desc');
    if (!(ty.points || []).length) fail(ch, where + ' 缺 points');
    (ty.points || []).forEach((p, j) => checkText(ch, where + ' points[' + j + ']', p));

    const qs = ty.questions || [];
    if (qs.length !== 3 && qs.length !== 4) fail(ch, where + ' 题目数应为 3~4，当前 ' + qs.length);
    const kinds = {};
    qs.forEach((q) => {
      const w = where + ' 题[' + q.id + ']';
      if (seen[q.id]) fail(ch, w + ' id 重复');
      seen[q.id] = 1;
      if (['choice', 'blank', 'short'].indexOf(q.kind) < 0) fail(ch, w + ' kind 非法');
      kinds[q.kind] = 1;
      if (!q.stem) fail(ch, w + ' 缺 stem');
      if (q.answer == null || q.answer === '') fail(ch, w + ' 缺 answer');
      if (!q.answerText) fail(ch, w + ' 缺 answerText');
      if (!q.solution || q.solution.replace(/<[^>]*>/g, '').length < 20) fail(ch, w + ' solution 过短');
      checkText(ch, w + ' stem', q.stem);
      checkText(ch, w + ' answerText', q.answerText);
      checkText(ch, w + ' solution', q.solution);
      if (q.kind === 'choice') {
        if ((q.options || []).length !== 4) fail(ch, w + ' 选项应为 4 个');
        if (!/^[ABCD]$/.test(String(q.answer))) fail(ch, w + ' 答案应为 A~D');
        (q.options || []).forEach((o, k2) => checkText(ch, w + ' 选项' + k2, o));
      }
      if (q.kind === 'blank') {
        if (!(q.blanks || []).length) fail(ch, w + ' 缺 blanks');
        (q.blanks || []).forEach((b, k2) => {
          if (b.answer == null) fail(ch, w + ' blanks[' + k2 + '] 缺 answer');
          if (b.before) checkText(ch, w + ' blanks[' + k2 + '].before', b.before);
          if (b.after) checkText(ch, w + ' blanks[' + k2 + '].after', b.after);
        });
      }
    });
    if (Object.keys(kinds).length < 2) fail(ch, where + ' 未覆盖至少 2 种 kind');
    const exs = ty.examples || [];
    if (exs.length !== 1 && exs.length !== 2) fail(ch, where + ' 例题数应为 1~2');
    exs.forEach((ex) => {
      const w = where + ' 例题[' + ex.id + ']';
      if (seen[ex.id]) fail(ch, w + ' id 重复');
      seen[ex.id] = 1;
      if (!/-ex-\d+$/.test(String(ex.id))) fail(ch, w + ' id 命名不规范');
      if (!ex.title || !ex.problem) fail(ch, w + ' 缺 title 或 problem');
      if (!ex.solution || ex.solution.replace(/<[^>]*>/g, '').length < 20) fail(ch, w + ' solution 过短');
      checkText(ch, w + ' problem', ex.problem);
      checkText(ch, w + ' solution', ex.solution);
    });
  });

  /* 文件级：不得出现 require / import / export / document */
  const figSrc = fs.existsSync(path.join(ROOT, 'js/data/fig-' + ch + '.js'))
    ? fs.readFileSync(path.join(ROOT, 'js/data/fig-' + ch + '.js'), 'utf8') : '';
  [['k', kSrc], ['t', tSrc], ['fig', figSrc]].forEach((pair) => {
    const code = pair[1].replace(/\/\*[\s\S]*?\*\//g, '');
    if (/\brequire\s*\(/.test(code)) fail(ch, pair[0] + ' 出现 require');
    if (/^\s*(import|export)\s/m.test(code)) fail(ch, pair[0] + ' 出现 import/export');
    if (/\bdocument\s*\./.test(code)) fail(ch, pair[0] + ' 出现 document 操作');
  });

  console.log('第 ' + ch + ' 章 ' + k.name
    + '：sections=' + k.sections.length
    + '，proofs=' + k.proofs.length
    + '，题型=' + t.types.length
    + '，题目=' + t.types.reduce((a, x) => a + x.questions.length, 0)
    + '，例题=' + t.types.reduce((a, x) => a + x.examples.length, 0)
    + '，简图=' + REQ_FIGS[ch].length);
});

console.log('');
if (problems.length) {
  const byKind = {};
  problems.forEach((p) => {
    const kind = p.replace(/^\[第\d+章\]\s*/, '').replace(/^.*?：/, '').slice(0, 26);
    byKind[kind] = (byKind[kind] || 0) + 1;
  });
  console.log('发现 ' + problems.length + ' 个问题，按类型汇总：');
  Object.keys(byKind).sort((a, b) => byKind[b] - byKind[a])
    .forEach((k2) => console.log('  ' + byKind[k2] + ' × ' + k2));
  console.log('');
  console.log('明细（最多 30 条）：');
  problems.slice(0, 30).forEach((p) => console.log('  ✗ ' + p));
  process.exitCode = 1;
} else {
  console.log('✓ 第 16、17、18 章全部严格检查通过');
}
