/*!
 * tools/check.js —— 离线语法与数据体检脚本（需要 Node.js）
 * 用法： node tools/check.js
 *
 * 作用：
 *   1) 对 js/**\/*.js 执行语法检查（不执行文件，只编译）；
 *   2) 在受控的伪浏览器环境中实际加载数据脚本，校验数据结构；
 *   3) 汇总错误 / 警告，退出码非 0 表示存在错误。
 */
'use strict';

const fs = require('fs');
const path = require('path');
let vm = null;
try { vm = require('vm'); } catch (e) { vm = null; }

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const warns = [];
const info = [];

function rel(p) { return path.relative(ROOT, p).replace(/\\/g, '/'); }
function err(m) { errors.push(m); }
function warn(m) { warns.push(m); }

/* ---------- 1. 递归收集 js 文件 ---------- */
function walk(dir, out) {
  out = out || [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p, out); }
    else if (/\.js$/i.test(e.name)) { out.push(p); }
  }
  return out;
}

const jsFiles = walk(path.join(ROOT, 'js'));
info.push('发现 JavaScript 文件 ' + jsFiles.length + ' 个');

/* ---------- 2. 语法检查 ---------- */
for (const f of jsFiles) {
  const src = fs.readFileSync(f, 'utf8');
  try {
    // eslint-disable-next-line no-new-func
    new Function(src);
  } catch (e) {
    err('语法错误 ' + rel(f) + ' → ' + e.message);
  }
}

/* ---------- 3. 伪浏览器环境 ---------- */
function makeCtx() {
  const noop = function () {};
  const ctx = {};
  function makeEl(tag) {
    const el = {
      tagName: tag,
      nodeName: tag,
      children: [],
      childNodes: [],
      attrs: {},
      style: {},
      classList: { add: noop, remove: noop, toggle: noop, contains: function () { return false; } },
      dataset: {},
      setAttribute: function (k, v) { this.attrs[k] = v; },
      getAttribute: function (k) { return this.attrs[k]; },
      appendChild: function (c) { this.children.push(c); this.childNodes.push(c); return c; },
      removeChild: function (c) { return c; },
      insertBefore: function (c) { this.children.push(c); return c; },
      addEventListener: noop,
      removeEventListener: noop,
      querySelector: function () { return null; },
      querySelectorAll: function () { return []; },
      getElementsByTagName: function () { return []; },
      set textContent(v) { this._text = v; },
      get textContent() { return this._text || ''; },
      set innerHTML(v) { this._html = v; },
      get innerHTML() { return this._html || ''; },
      cloneNode: function () { return makeEl(tag); }
    };
    return el;
  }
  const doc = {
    createElement: makeEl,
    createElementNS: function (ns, tag) { return makeEl(tag); },
    createTextNode: function (t) { return { nodeType: 3, nodeValue: t, textContent: t }; },
    createDocumentFragment: function () { return makeEl('#fragment'); },
    head: makeEl('head'),
    body: makeEl('body'),
    documentElement: makeEl('html'),
    addEventListener: noop,
    querySelector: function () { return null; },
    querySelectorAll: function () { return []; },
    getElementById: function () { return null; },
    readyState: 'complete'
  };
  Object.assign(ctx, {
    console: console,
    document: doc,
    localStorage: { getItem: function () { return null; }, setItem: noop, removeItem: noop },
    navigator: { userAgent: 'node' },
    location: { hash: '', href: 'http://localhost/' },
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    addEventListener: noop,
    removeEventListener: noop,
    NodeFilter: { SHOW_TEXT: 4 },
    Promise: Promise,
    Math: Math,
    JSON: JSON,
    Date: Date,
    Object: Object,
    Array: Array,
    String: String,
    Number: Number,
    Boolean: Boolean,
    RegExp: RegExp,
    Error: Error,
    isFinite: isFinite,
    parseInt: parseInt,
    parseFloat: parseFloat
  });
  ctx.window = ctx;
  ctx.globalThis = ctx;
  return ctx;
}

function loadInCtx(ctx, file) {
  const src = fs.readFileSync(file, 'utf8') + '\n//# sourceURL=' + rel(file);
  if (vm && typeof vm.runInNewContext === 'function') {
    // 在真正的全局作用域中运行：脚本里的 window / DSHData / DSHFig 等裸标识符都能解析
    vm.runInNewContext(src, ctx, { filename: rel(file) });
  } else {
    const names = ['window', 'document', 'localStorage', 'navigator', 'location', 'console',
      'setTimeout', 'clearTimeout', 'addEventListener', 'removeEventListener', 'NodeFilter', 'globalThis'];
    const fn = new Function(names.join(','), src);
    fn.apply(ctx.window, names.map(function (k) { return ctx[k]; }));
  }
}

/* ---------- 4. 加载核心 + 数据 ---------- */
const ctx = makeCtx();
const coreFiles = [
  'js/data/manifest.js',
  'js/math.js',
  'js/illustrations.js',
  'js/illustrations-data.js'
];
for (const f of coreFiles) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { err('缺少核心文件 ' + f); continue; }
  try { loadInCtx(ctx, p); info.push('已加载 ' + f); }
  catch (e) { err('加载失败 ' + f + ' → ' + e.message); }
}

const DSHData = ctx.DSHData;
const DSHFig = ctx.DSHFig;
const DSHMath = ctx.DSHMath;

if (!DSHData) { err('DSHData 未定义（manifest.js 有问题）'); }
if (!DSHFig) { err('DSHFig 未定义（illustrations.js 有问题）'); }
if (!DSHMath) { err('DSHMath 未定义（math.js 有问题）'); }

const order = (DSHData && DSHData.order && DSHData.order.length) ? DSHData.order : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const index = (DSHData && DSHData.index) || {};
const files = (DSHData && DSHData.files) || {};

function slugOf(n) {
  const m = files[String(n)] || index[String(n)] || {};
  return m.slug || m.name || '';
}

const loadedData = [];
for (const n of order) {
  const slug = slugOf(n);
  const trio = [
    'js/data/fig-' + n + '.js',
    'js/data/k-' + n + '-' + slug + '.js',
    'js/data/t-' + n + '-' + slug + '.js'
  ];
  for (const f of trio) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) {
      if (/fig-/.test(f)) { warn('缺少简图文件 ' + f); }
      else { err('缺少数据文件 ' + f); }
      continue;
    }
    try {
      loadInCtx(ctx, p);
      loadedData.push(f);
    } catch (e) {
      err('加载失败 ' + f + ' → ' + e.message);
    }
  }
}
info.push('已加载数据文件 ' + loadedData.length + ' 个');

/* ---------- 5. 数据校验 ---------- */
function textLen(html) {
  return String(html || '').replace(/<[^>]*>/g, '').replace(/\s+/g, '').length;
}

/** 收集一棵数据里的全部字符串 */
function collectStrings(v, out) {
  out = out || [];
  if (typeof v === 'string') { out.push(v); }
  else if (v && typeof v === 'object') {
    Object.keys(v).forEach(function (k) { collectStrings(v[k], out); });
  }
  return out;
}

/** 统计形如 \( \) \[ \] 的定界符（跳过 \\ 转义，避免把 \\) 也算成 \） */
function delimCount(value, kind) {
  const texts = collectStrings(value);
  let c = 0;
  for (let i = 0; i < texts.length; i++) {
    const s = texts[i];
    let j = 0;
    while (j < s.length) {
      if (s.charAt(j) === '\\') {
        if (s.charAt(j + 1) === kind) { c++; }
        j += 2;
        continue;
      }
      j++;
    }
  }
  return c;
}
function countQ(t) {
  let q = 0, ex = 0;
  (t.types || []).forEach(function (x) {
    q += (x.questions || []).length;
    ex += (x.examples || []).length;
  });
  return { q: q, ex: ex };
}

const stats = [];
for (const n of order) {
  const k = DSHData.knowledge[n];
  const t = DSHData.types[n];
  const name = slugOf(n);

  if (!k) { err('第 ' + n + ' 章缺少基础知识数据（k-*.js）'); }
  else {
    if (k.id !== n) { err('k-' + n + ' 的 id 与章号不一致：' + k.id); }
    if (!k.name) { err('k-' + n + ' 缺少 name'); }
    if (!(k.sections || []).length || k.sections.length < 4) {
      warn('k-' + n + ' sections 少于 4 节（当前 ' + (k.sections || []).length + '）');
    }
    (k.sections || []).forEach(function (s, i) {
      if (!s.title) { err('k-' + n + ' 第 ' + (i + 1) + ' 节缺 title'); }
      if (textLen(s.html) < 40) { warn('k-' + n + ' 第 ' + (i + 1) + ' 节内容过短'); }
    });
    if (!(k.proofs || []).length || k.proofs.length < 2) {
      err('k-' + n + ' 证明少于 2 条（当前 ' + (k.proofs || []).length + '）');
    }
    (k.proofs || []).forEach(function (p, i) {
      if (!p.title) { err('k-' + n + ' 第 ' + (i + 1) + ' 条证明缺 title'); }
      if (!(p.steps || []).length || p.steps.length < 2) { err('k-' + n + ' 证明「' + (p.title || i) + '」步骤少于 2 步'); }
    });
    // 公式定界符配对（按源码字符串字面统计）
    const c1 = delimCount(k, '('), c2 = delimCount(k, ')');
    if (c1 !== c2) { err('k-' + n + ' 中 \\( 与 \\) 数量不等：' + c1 + ' / ' + c2); }
    // 简图引用
    (k.sections || []).forEach(function (s) {
      const html = String(s.html || '');
      let m;
      const re = /DSHFig\.use\('([^']+)'\)/g;
      while ((m = re.exec(html)) !== null) {
        if (DSHFig && !DSHFig.has(m[1])) { err('k-' + n + ' 引用了不存在的简图：' + m[1]); }
      }
      const re2 = /DSHFig\.row\(\[([\s\S]*?)\]\)/g;
      while ((m = re2.exec(html)) !== null) {
        const ids = m[1].match(/id\s*:\s*'([^']+)'/g) || [];
        ids.forEach(function (x) {
          const id = /'([^']+)'/.exec(x)[1];
          if (DSHFig && !DSHFig.has(id)) { err('k-' + n + ' 引用了不存在的简图：' + id); }
        });
      }
    });
    (k.figures || []).forEach(function (f) {
      if (DSHFig && !DSHFig.has(f)) { err('k-' + n + ' figures 中的简图不存在：' + f); }
    });
  }

  if (!t) { err('第 ' + n + ' 章缺少题型数据（t-*.js）'); }
  else {
    if (t.id !== n) { err('t-' + n + ' 的 id 与章号不一致：' + t.id); }
    if (!(t.types || []).length) { err('t-' + n + ' 没有题型'); }
    const seenIds = {};
    (t.types || []).forEach(function (ty, ti) {
      const label = 't-' + n + ' 题型' + (ti + 1) + '（' + (ty.name || '未命名') + '）';
      if (!ty.name) { err(label + ' 缺 name'); }
      if (!ty.id) { err(label + ' 缺 id'); }
      const qs = ty.questions || [];
      if (qs.length < 3 || qs.length > 4) { err(label + ' 题目数应为 3~4，当前 ' + qs.length); }
      const kinds = {};
      qs.forEach(function (q, qi) {
        const ql = label + ' 第' + (qi + 1) + '题';
        kinds[q.kind] = 1;
        if (['choice', 'blank', 'short'].indexOf(q.kind) < 0) { err(ql + ' kind 非法：' + q.kind); }
        if (!q.id) { err(ql + ' 缺 id'); } else {
          if (seenIds[q.id]) { err(ql + ' id 重复：' + q.id); }
          seenIds[q.id] = 1;
        }
        if (!q.stem) { err(ql + ' 缺 stem'); }
        // 选择题与填空题必须有可判分的 answer；简答题用 answerText + solution 供对照
        if (q.kind === 'choice' || q.kind === 'blank') {
          if (q.answer == null || q.answer === '') { err(ql + ' 缺 answer'); }
        }
        if ((q.answerText == null || q.answerText === '') && (q.answer == null || q.answer === '')) {
          err(ql + ' 既缺 answerText 又缺 answer');
        }
        if (textLen(q.solution) < 15) { err(ql + ' solution 过短或缺失'); }
        if (q.kind === 'choice') {
          if (!(q.options || []).length || q.options.length !== 4) { err(ql + ' 选项数应为 4'); }
          if (!/^[A-D]$/.test(String(q.answer))) { err(ql + ' 选择题答案应为 A~D，当前 ' + q.answer); }
          (q.options || []).forEach(function (o, oi) { if (textLen(o) < 1) { err(ql + ' 第' + (oi + 1) + '个选项为空'); } });
        }
        if (q.kind === 'blank') {
          if (!(q.blanks || []).length) { err(ql + ' 填空题缺 blanks'); }
          (q.blanks || []).forEach(function (b, bi) {
            if (b && typeof b === 'object') {
              if (b.answer == null || b.answer === '') { err(ql + ' 第' + (bi + 1) + '空缺 answer'); }
            } else if (b == null || b === '') { err(ql + ' 第' + (bi + 1) + '空缺 answer'); }
          });
        }
        const c1 = delimCount(q, '(');
        const c2 = delimCount(q, ')');
        if (c1 !== c2) { err(ql + ' 中 \\( 与 \\) 数量不等：' + c1 + ' / ' + c2); }
      });
      if (Object.keys(kinds).length < 2) { warn(label + ' 的题型种类单一（只有 ' + Object.keys(kinds).join('/') + '）'); }
      const exs = ty.examples || [];
      if (exs.length < 1 || exs.length > 2) { err(label + ' 例题数应为 1~2，当前 ' + exs.length); }
      exs.forEach(function (ex, ei) {
        const el2 = label + ' 例' + (ei + 1);
        if (!ex.id) { err(el2 + ' 缺 id'); } else if (seenIds[ex.id]) { err(el2 + ' id 重复：' + ex.id); } else { seenIds[ex.id] = 1; }
        if (!ex.problem) { err(el2 + ' 缺 problem'); }
        if (textLen(ex.solution) < 15) { err(el2 + ' solution 过短或缺失'); }
      });
    });
    const c = countQ(t);
    stats.push({ n: n, name: (k && k.name) || name, types: (t.types || []).length, q: c.q, ex: c.ex });
  }
}

/* ---------- 6. 输出 ---------- */
console.log('==============================================');
console.log(' 高中数学学习资源库 · 离线体检报告');
console.log('==============================================');
info.forEach(function (s) { console.log('  · ' + s); });
console.log('');
console.log('章节统计：');
console.log('  章号  章节            题型数  练习题  例题数');
stats.forEach(function (s) {
  console.log('  ' + String(s.n).padEnd(5) + String(s.name).padEnd(16) + String(s.types).padEnd(8) + String(s.q).padEnd(8) + s.ex);
});
console.log('');
if (warns.length) {
  console.log('警告（' + warns.length + '）：');
  warns.forEach(function (w) { console.log('  [警告] ' + w); });
  console.log('');
}
if (errors.length) {
  console.log('错误（' + errors.length + '）：');
  errors.forEach(function (e) { console.log('  [错误] ' + e); });
  console.log('');
  console.log('结果：存在 ' + errors.length + ' 个错误，' + warns.length + ' 个警告。');
  process.exitCode = 1;
} else {
  console.log('结果：全部检查通过（' + warns.length + ' 个警告）。');
}

/* ---------- 7. 可选：公式渲染冒烟测试 ---------- */
if (DSHMath && typeof DSHMath.toHTML === 'function') {
  const samples = [
    '\\(A\\cap B\\)', '\\(x^2-3x+2>0\\)', '\\(\\frac{a+b}{2}\\ge\\sqrt{ab}\\)',
    '\\(\\sum_{k=0}^{n}C_n^k a^{n-k}b^k\\)', '\\(\\lim_{\\Delta x\\to0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}\\)',
    '\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\)', '\\(\\complement_U A\\)'
  ];
  let ok = 0;
  samples.forEach(function (s) {
    try { DSHMath.toHTML(s.slice(2, -2), false); ok++; } catch (e) { err('公式渲染失败：' + s + ' → ' + e.message); }
  });
  console.log('公式渲染冒烟测试：' + ok + '/' + samples.length + ' 通过');
}
