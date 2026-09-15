/*!
 * app.js —— 高中数学学习资源库 前端主程序
 * 纯静态、零依赖、可离线运行。
 *
 * 数据结构（由 js/data/*.js 注册到 DSHData）：
 *   DSHData.registerKnowledge({
 *     id: 1, name: '集合', group: '必修·代数基础',
 *     brief: '一句话概括',
 *     sections: [ { title, html } ],                       // 概念讲解（html 内可用 \(..\) 公式与 DSHFig.use('id') 简图）
 *     proofs:   [ { title, claim, steps: [..], note } ],   // 证明 / 推导
 *     figures:  [ 'fig-id', ... ],                         // 本页重点简图（可省略）
 *     types:    [ '元素互异性求参数', ... ]                 // 本页关联题型（可省略）
 *   });
 *   DSHData.registerTypes({
 *     id: 1, name: '集合', brief: '题型综述',
 *     types: [ { id:'1-1', name:'题型名', desc:'考察点',
 *                questions:[ { id, kind:'choice'|'blank'|'short', stem, options?, blanks?, answer, solution } ],
 *                examples:[ { id, title, problem, solution, note? } ] } ],
 *     answers: [ { ref:'1-1-1', key:'答', solution:'解析' } ]   // 选填题速查表（可省略）
 *   });
 */
(function (root) {
  'use strict';

  var DSHData = root.DSHData || (root.DSHData = {
    knowledge: {},
    types: {},
    order: [],
    files: {},
    registered: { knowledge: {}, types: {} },
    registerKnowledge: function (d) {
      if (!d || d.id == null) { return false; }
      if (this.registered.knowledge[d.id]) {
        warn('基础知识第 ' + d.id + ' 章重复注册（已忽略后一次）');
        return false;
      }
      this.registered.knowledge[d.id] = true;
      this.knowledge[d.id] = d;
      if (this.order.indexOf(d.id) < 0) { this.order.push(d.id); }
      return true;
    },
    registerTypes: function (d) {
      if (!d || d.id == null) { return false; }
      if (this.registered.types[d.id]) {
        warn('题型第 ' + d.id + ' 章重复注册（已忽略后一次）');
        return false;
      }
      this.registered.types[d.id] = true;
      this.types[d.id] = d;
      return true;
    },
    setManifest: function (m) { this.files = m || {}; }
  });

  function warn(msg) {
    if (root.console && console.warn) { console.warn('[DSHData] ' + msg); }
  }

  /* ============================================================
     1. 全局状态
     ============================================================ */
  var App = root.DSHApp || (root.DSHApp = {});
  var STORE_KEY = 'dsh-math-progress-v1';

  var state = {
    progress: load(),
    route: null,
    loaded: {},
    loadErrors: {}
  };

  function load() {
    try {
      var raw = root.localStorage && localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state.progress)); } catch (e) {}
  }

  function markDone(key, done) {
    if (done) { state.progress[key] = 1; } else { delete state.progress[key]; }
    save();
  }
  function isDone(key) { return !!state.progress[key]; }
  function doneCount(prefix) {
    var c = 0, k;
    for (k in state.progress) {
      if (state.progress[k] && k.indexOf(prefix) === 0) { c++; }
    }
    return c;
  }

  /* ============================================================
     2. 工具
     ============================================================ */
  function h(tag, attrs, kids) {
    var e = document.createElement(tag), k, i;
    if (attrs) {
      for (k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) { continue; }
        if (attrs[k] == null) { continue; }
        if (k === 'class') { e.className = attrs[k]; }
        else if (k === 'html') { e.innerHTML = attrs[k]; }
        else if (k === 'text') { e.textContent = attrs[k]; }
        else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') { e.addEventListener(k.slice(2), attrs[k]); }
        else { e.setAttribute(k, attrs[k]); }
      }
    }
    if (kids != null) {
      if (!(kids instanceof Array)) { kids = [kids]; }
      for (i = 0; i < kids.length; i++) {
        var c = kids[i];
        if (c == null || c === false) { continue; }
        e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      }
    }
    return e;
  }

  var CN = '一|二|三|四|五|六|七|八|九|十'.split('|');
  function cnNum(k) {
    var s = String(k);
    if (s.length === 1) { return CN[Number(s) - 1] || s; }
    if (s.length === 2 && s.charAt(0) === '1') { return '十' + (s.charAt(1) === '0' ? '' : CN[Number(s.charAt(1)) - 1]); }
    if (s.length === 2 && s.charAt(0) === '2') { return '二十' + (s.charAt(1) === '0' ? '' : CN[Number(s.charAt(1)) - 1]); }
    return s;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /**
   * 文本片段容错渲染：
   *  - 含真实 HTML 标签 → 按 HTML 渲染；
   *  - 含 &lt; &gt; 等实体 → 用 innerHTML，让实体（含公式里的 \(a&gt;1\)）正确显示；
   *  - 其余 → 纯文本，避免公式外的尖括号被误当标签。
   */
  function textArg(s) {
    var t = String(s == null ? '' : s);
    if (/<[a-zA-Z/][^>]*>/.test(t)) { return { html: t }; }
    if (/&(?:lt|gt|amp|quot|#\d+);/.test(t)) { return { html: t }; }
    return { text: t };
  }
  var titleText = textArg;

  /** 归一化作答：全角转半角、去空白、统一符号，便于比对 */
  function norm(s) {
    var t = String(s == null ? '' : s);
    t = t.replace(/[\uFF01-\uFF5E]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); });
    t = t.replace(/[\s\u3000]+/g, '');
    t = t.replace(/[（]/g, '(').replace(/[）]/g, ')');
    t = t.replace(/[，]/g, ',').replace(/[；]/g, ';').replace(/[：]/g, ':');
    t = t.replace(/≤|≦/g, '<=').replace(/≥|≧/g, '>=').replace(/≠/g, '!=');
    t = t.replace(/√/g, 'sqrt').replace(/∞/g, 'inf');
    t = t.replace(/－|—|–/g, '-');
    t = t.toLowerCase();
    t = t.replace(/^\{|\}$/g, '');
    return t;
  }

  function eqAnswer(input, accepted) {
    var got = norm(input);
    if (!got) { return false; }
    var list = accepted instanceof Array ? accepted : [accepted];
    for (var i = 0; i < list.length; i++) {
      var a = norm(list[i]);
      if (a && a === got) { return true; }
      // 集合写法 {1,2} 与 1,2 等价
      var aNo = a.replace(/[,;]/g, ''), gNo = got.replace(/[,;]/g, '');
      if (aNo && aNo === gNo) { return true; }
    }
    return false;
  }

  /* ============================================================
     3. 动态加载数据文件
     ============================================================ */
  function dataPath(prefix, id, name) {
    var m = DSHData.files || {};
    if (m[prefix + id]) { return m[prefix + id]; }
    return 'js/data/' + prefix + '-' + id + '-' + (name || '') + '.js';
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (state.loaded[src]) { return resolve(state.loaded[src]); }
      var s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = function () { state.loaded[src] = 'ok'; resolve('ok'); };
      s.onerror = function () {
        state.loaded[src] = 'fail';
        state.loadErrors[src] = true;
        warn('数据文件加载失败：' + src);
        reject(new Error('加载失败：' + src));
      };
      document.head.appendChild(s);
    });
  }

  function ensureKnowledge(id) {
    if (DSHData.knowledge[id]) { normalizeChapter(id); return Promise.resolve(DSHData.knowledge[id]); }
    var meta = (DSHData.index || {})[String(id)] || {};
    return loadScript(dataPath('k', id, meta.slug || meta.name)).then(function () {
      normalizeChapter(id);
      return DSHData.knowledge[id] || null;
    }).catch(function () { return null; });
  }
  function ensureTypes(id) {
    if (DSHData.types[id]) { normalizeChapter(id); return Promise.resolve(DSHData.types[id]); }
    var meta = (DSHData.index || {})[String(id)] || {};
    return loadScript(dataPath('t', id, meta.slug || meta.name)).then(function () {
      normalizeChapter(id);
      return DSHData.types[id] || null;
    }).catch(function () { return null; });
  }
  function ensureIllustrations(id) {
    var meta = (DSHData.index || {})[String(id)] || {};
    if (!meta.figFile) { return Promise.resolve('skip'); }
    return loadScript(meta.figFile).catch(function () { return 'fail'; });
  }

  /* ============================================================
     3.5 答案字段容错：把裸露的 LaTeX（如 \sqrt{3}）补上 \( \)，使其能正常渲染
     ------------------------------------------------------------
     部分作者在 answer / answerText / blanks[].answer 里只写了公式本体。
     这里在渲染前统一补定界符；答案比对用的 norm() 会去掉 \( \) 与命令名，
     因此“A 卷显示的好看”和“用户输入可判分”两不误。
     ============================================================ */
  var MATHY = /\\(frac|dfrac|tfrac|sqrt|pm|times|div|cdot|le|ge|ne|cup|cap|subseteq|subset|supset|varnothing|emptyset|complement|notin|in|Rightarrow|Leftrightarrow|iff|sin|cos|tan|log|ln|lim|sum|int|pi|alpha|beta|gamma|theta|Delta|infty|parallel|perp|angle|vec|overline|overrightarrow|circ|to)/;

  function wrapMath(v) {
    if (typeof v === 'string') {
      var s = v;
      if (s.indexOf('\\(') >= 0 || s.indexOf('\\[') >= 0 || s.indexOf('$$') >= 0) { return s; }
      if (s.length > 40 || !MATHY.test(s)) { return s; }
      if (/[。；：，]/.test(s)) { return s; }        // 明显是句子时不动
      return '\\(' + s + '\\)';
    }
    if (v instanceof Array) { return v.map(wrapMath); }
    return v;
  }

  var normalizedChapters = {};
  function normalizeChapter(id) {
    if (normalizedChapters[id]) { return; }
    normalizedChapters[id] = true;
    var t = DSHData.types[id];
    if (!t) { return; }
    (t.types || []).forEach(function (ty) {
      (ty.questions || []).forEach(function (q) {
        ['answer', 'answerText'].forEach(function (k) {
          if (q[k] != null) { q[k] = wrapMath(q[k]); }
        });
        (q.blanks || []).forEach(function (b) {
          if (b && typeof b === 'object' && b.answer != null) { b.answer = wrapMath(b.answer); }
        });
      });
    });
  }

  /* ============================================================
     4. 路由
     ============================================================ */
  function parseHash() {
    var raw = (location.hash || '').replace(/^#\/?/, '');
    var parts = raw.split('/').filter(function (x) { return x !== ''; });
    if (!parts.length) { return { name: 'home' }; }
    if (parts[0] === 'knowledge' || parts[0] === 'basic') {
      return { name: 'knowledge', id: parts[1] ? parseInt(parts[1], 10) : null };
    }
    if (parts[0] === 'types' || parts[0] === 'problems') {
      var sub = parts[2] || 'main';
      return { name: 'types', id: parts[1] ? parseInt(parts[1], 10) : null, sub: sub };
    }
    if (parts[0] === 'search') { return { name: 'search', q: decodeURIComponent(parts.slice(1).join('/')) }; }
    return { name: 'home' };
  }

  function go(hash) {
    if (location.hash === hash) { render(); } else { location.hash = hash; }
  }

  function href(route) {
    if (route === 'knowledge') { return '#/knowledge'; }
    if (route === 'types') { return '#/types'; }
    if (route === 'home') { return '#/'; }
    return '#/';
  }

  /* ============================================================
     5. 侧栏
     ============================================================ */
  function renderSidebar(route) {
    var aside = document.getElementById('sidebar');
    if (!aside) { return; }
    var isK = route.name === 'knowledge';
    var isT = route.name === 'types';
    aside.hidden = !(isK || isT);
    if (aside.hidden) { return; }

    var list = DSHData.order.slice();
    var frag = document.createDocumentFragment();
    var title = h('div', { class: 'sidebar__title' }, isK ? '基础知识 · 目录' : '题型 · 目录');
    frag.appendChild(title);
    var ul = h('ul', { class: 'sidebar__list' });
    var lastGroup = null;
    list.forEach(function (id) {
      var k = DSHData.knowledge[id];
      var t = DSHData.types[id];
      var meta = (DSHData.index || {})[String(id)] || {};
      var name = (k && k.name) || meta.name || (t && t.name) || ('第 ' + id + ' 章');
      var group = (k && k.group) || meta.group || '';
      if (group && group !== lastGroup) {
        var li = h('li', { class: 'sidebar__group' }, group);
        ul.appendChild(li);
        lastGroup = group;
      }
      var a = h('a', {
        href: (isK ? '#/knowledge/' : '#/types/') + id,
        class: (route.id === id ? 'is-active' : '')
      }, [
        h('span', { class: 'sidebar__num' }, String(id)),
        h('span', { class: 'sidebar__name', html: titleText(name).html, text: titleText(name).text })
      ]);
      ul.appendChild(h('li', null, a));
    });
    frag.appendChild(ul);
    aside.innerHTML = '';
    aside.appendChild(frag);
  }

  /* ============================================================
     6. 首页
     ============================================================ */
  function viewHome() {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('div', { class: 'page-head' }, [
      h('h1', null, '高中数学学习资源库'),
      h('p', null, '基础知识与题型训练双栏结构：先读图与证明理解概念，再按题型自测。全部内容离线可用。')
    ]));

    var total = DSHData.order.length;
    var totalQ = 0, totalEx = 0, typeCount = 0;
    DSHData.order.forEach(function (id) {
      var t = DSHData.types[id];
      if (t && t.types) {
        typeCount += t.types.length;
        t.types.forEach(function (ty) {
          totalQ += (ty.questions || []).length;
          totalEx += (ty.examples || []).length;
        });
      }
    });

    frag.appendChild(h('div', { class: 'card' }, [
      h('div', { class: 'card__head' }, [h('h2', null, '开始学习')]),
      h('div', { class: 'toc-grid' }, [
        h('a', { href: '#/knowledge' }, [
          h('span', { class: 'sidebar__num' }, 'Ⅰ'),
          h('span', null, '基础知识（18 章 · 概念 + 简图 + 证明）')
        ]),
        h('a', { href: '#/types' }, [
          h('span', { class: 'sidebar__num' }, 'Ⅱ'),
          h('span', null, '题型训练（题型 + 例题 + 答案）')
        ])
      ]),
      h('div', { class: 'small muted', style: 'margin-top:12px' },
        '共 ' + total + ' 章，' + typeCount + ' 个题型，' + totalQ + ' 道配套题目，' + totalEx + ' 道例题。')
    ]));

    var grid = h('div', { class: 'toc-grid' });
    DSHData.order.forEach(function (id) {
      var k = DSHData.knowledge[id] || {};
      var meta = (DSHData.index || {})[String(id)] || {};
      var name = k.name || meta.name || ('第 ' + id + ' 章');
      grid.appendChild(h('a', { href: '#/knowledge/' + id }, [
        h('span', { class: 'sidebar__num' }, String(id)),
        h('span', null, name)
      ]));
    });
    frag.appendChild(h('div', { class: 'card' }, [
      h('div', { class: 'card__head' }, [h('h2', null, '基础知识目录')]),
      grid
    ]));

    var grid2 = h('div', { class: 'toc-grid' });
    DSHData.order.forEach(function (id) {
      var t = DSHData.types[id] || {};
      var meta = (DSHData.index || {})[String(id)] || {};
      var name = t.name || meta.name || ('第 ' + id + ' 章');
      grid2.appendChild(h('a', { href: '#/types/' + id }, [
        h('span', { class: 'sidebar__num' }, String(id)),
        h('span', null, name)
      ]));
    });
    frag.appendChild(h('div', { class: 'card' }, [
      h('div', { class: 'card__head' }, [h('h2', null, '题型目录')]),
      grid2
    ]));

    return frag;
  }

  /* ============================================================
     7. 基础知识界面
     ============================================================ */
  function viewKnowledgeList() {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('div', { class: 'page-head' }, [
      h('h1', null, '基础知识'),
      h('p', null, '每章包含：概念梳理、辅助理解简图、证明与推导、关联题型入口。')
    ]));
    var grid = h('div', { class: 'toc-grid' });
    DSHData.order.forEach(function (id) {
      var k = DSHData.knowledge[id];
      var meta = (DSHData.index || {})[String(id)] || {};
      var name = (k && k.name) || meta.name || ('第 ' + id + ' 章');
      grid.appendChild(h('a', { href: '#/knowledge/' + id }, [
        h('span', { class: 'sidebar__num' }, String(id)),
        h('span', null, name)
      ]));
    });
    frag.appendChild(h('div', { class: 'card' }, [grid]));
    return frag;
  }

  function renderKnowledge(id) {
    var main = document.getElementById('main');
    main.innerHTML = '';
    main.appendChild(h('div', { class: 'notice' }, '正在载入第 ' + id + ' 章…'));

    Promise.all([ensureIllustrations(id), ensureKnowledge(id)]).then(function (res) {
      var k = res[1];
      if (!k) {
        main.innerHTML = '';
        main.appendChild(errorCard(id, '基础知识'));
        return;
      }
      var frag = document.createDocumentFragment();
      frag.appendChild(h('div', { class: 'page-head' }, [
        h('h1', null, [h('span', null, '第 ' + id + ' 章　'), h('span', titleText(k.name || ''))]),
        h('p', null, k.brief || (DSHData.index[String(id)] || {}).brief || '')
      ]));

      // 简图速览
      var figIds = k.figures || [];
      if (!figIds.length && k.sections) {
        k.sections.forEach(function (s) {
          var m = String(s.html || '').match(/DSHFig\.use\('([^']+)'/g) || [];
          m.forEach(function (x) {
            var g = /DSHFig\.use\('([^']+)'/.exec(x);
            if (g && figIds.indexOf(g[1]) < 0) { figIds.push(g[1]); }
          });
        });
      }
      if (figIds.length) {
        var figs = figIds.filter(function (f) { return root.DSHFig && DSHFig.has(f); });
        if (figs.length) {
          frag.appendChild(h('div', { class: 'card' }, [
            h('div', { class: 'card__head' }, [
              h('h2', null, '本章简图'),
              h('span', { class: 'tag' }, figs.length + ' 幅')
            ]),
            h('div', { class: 'fig-grid', html: figs.map(function (f) { return DSHFig.use(f); }).join('') })
          ]));
        }
      }

      // 概念讲解
      var secFrag = document.createDocumentFragment();
      (k.sections || []).forEach(function (s, i) {
        var card = h('div', { class: 'card' }, [
          h('div', { class: 'card__head' }, [
            h('h2', titleText(s.title || ('要点 ' + (i + 1)))),
            s.tag ? h('span', { class: 'tag' }, s.tag) : null
          ]),
          h('div', { class: 'content', html: s.html || '' })
        ]);
        secFrag.appendChild(card);
      });
      frag.appendChild(secFrag);

      // 证明与推导
      if (k.proofs && k.proofs.length) {
        var pc = h('div', { class: 'card' }, [
          h('div', { class: 'card__head' }, [
            h('h2', null, '证明与推导'),
            h('span', { class: 'tag' }, k.proofs.length + ' 条')
          ])
        ]);
        k.proofs.forEach(function (p, i) {
          var body = h('div', { class: 'block__body' });
          if (p.claim) { body.appendChild(h('p', { class: 'small muted', html: p.claim })); }
          var ol = h('ol', { class: 'proof__steps' });
          (p.steps || []).forEach(function (st) { ol.appendChild(h('li', { html: st })); });
          body.appendChild(ol);
          if (p.note) { body.appendChild(h('p', { class: 'small muted', html: '注：' + p.note })); }
          body.appendChild(h('div', { class: 'proof__qed' }, '∎'));
          pc.appendChild(h('details', { class: 'block', open: i === 0 ? 'open' : null }, [
            h('summary', titleText(p.title || ('证明 ' + (i + 1)))),
            body
          ]));
        });
        frag.appendChild(pc);
      }

      // 关联题型
      var t = DSHData.types[id];
      var typeNames = (t && t.types ? t.types.map(function (x) { return x.name; }) : (k.types || []));
      if (typeNames.length) {
        var links = h('div', { class: 'chip-row' });
        typeNames.forEach(function (nm, i) {
          var tid = (t && t.types && t.types[i]) ? t.types[i].id : null;
          var a = h('a', {
            class: 'chip',
            href: '#/types/' + id + '#' + (tid || '')
          }, nm);
          links.appendChild(a);
        });
        frag.appendChild(h('div', { class: 'card' }, [
          h('div', { class: 'card__head' }, [h('h2', null, '关联题型')]),
          h('p', { class: 'small muted' }, '点击进入题型训练（含例题与答案）。'),
          links,
          h('div', { class: 'btn-row' }, [
            h('a', { class: 'btn btn--primary', href: '#/types/' + id }, '前往题型训练 →'),
            h('a', { class: 'btn', href: '#/knowledge' }, '← 返回目录')
          ])
        ]));
      }

      main.innerHTML = '';
      main.appendChild(frag);
      if (root.DSHMath) { DSHMath.render(main); }
      bindInternalLinks(main, id);
    });
  }

  /** 让章节内 "#/types/1#1-2" 这类链接在点击后定位到指定题型 */
  function bindInternalLinks(host, chapterId) {
    host.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.chip');
      if (!a) { return; }
      var m = /#\/types\/(\d+)#(.+)$/.exec(a.getAttribute('href') || '');
      if (!m) { return; }
      e.preventDefault();
      pendingFocus = m[2];
      go('#/types/' + m[1]);
    });
  }

  var pendingFocus = null;

  /* ============================================================
     8. 题型界面
     ============================================================ */
  function viewTypesList() {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('div', { class: 'page-head' }, [
      h('h1', null, '题型'),
      h('p', null, '每个题型包含：题型要点、3–4 道方向各异的配套练习（选择/填空/简答）、例题与答案两个副界面。')
    ]));
    var grid = h('div', { class: 'toc-grid' });
    DSHData.order.forEach(function (id) {
      var meta = (DSHData.index || {})[String(id)] || {};
      grid.appendChild(h('a', { href: '#/types/' + id }, [
        h('span', { class: 'sidebar__num' }, String(id)),
        h('span', null, meta.name || ('第 ' + id + ' 章'))
      ]));
    });
    frag.appendChild(h('div', { class: 'card' }, [grid]));
    return frag;
  }

  function typeCounts(t, id) {
    var nType = (t.types || []).length, nQ = 0, nEx = 0;
    (t.types || []).forEach(function (x) {
      nQ += (x.questions || []).length;
      nEx += (x.examples || []).length;
    });
    var dn = doneCount('t:' + id + ':');
    return { nType: nType, nQ: nQ, nEx: nEx, done: dn };
  }

  function renderTypes(id, sub) {
    var main = document.getElementById('main');
    main.innerHTML = '';
    main.appendChild(h('div', { class: 'notice' }, '正在载入第 ' + id + ' 章题型…'));

    Promise.all([ensureIllustrations(id), ensureTypes(id)]).then(function (res) {
      var t = res[1];
      if (!t) {
        main.innerHTML = '';
        main.appendChild(errorCard(id, '题型'));
        return;
      }
      var c = typeCounts(t, id);
      var frag = document.createDocumentFragment();
      frag.appendChild(h('div', { class: 'page-head' }, [
        h('h1', null, [h('span', null, '第 ' + id + ' 章　'), h('span', titleText(t.name || '')), h('span', null, ' · 题型')]),
        h('p', null, t.brief || '')
      ]));

      // 副界面切换
      var tabs = h('div', { class: 'subtabs' }, [
        h('a', { href: '#/types/' + id, class: sub === 'main' ? 'is-active' : '' }, '题型主界面'),
        h('a', { href: '#/types/' + id + '/examples', class: sub === 'examples' ? 'is-active' : '' }, '例题'),
        h('a', { href: '#/types/' + id + '/answers', class: sub === 'answers' ? 'is-active' : '' }, '答案')
      ]);
      frag.appendChild(tabs);

      var total = c.nQ + c.nEx;
      frag.appendChild(h('div', { class: 'card' }, [
        h('div', { class: 'card__head' }, [
          h('h2', null, '本章概览'),
          h('span', { class: 'tag' }, c.nType + ' 个题型'),
          h('span', { class: 'tag' }, c.nQ + ' 道练习'),
          h('span', { class: 'tag' }, c.nEx + ' 道例题')
        ]),
        h('div', { class: 'progress' }, [
          h('span', null, '已完成 ' + c.done + ' / ' + total),
          h('span', { class: 'progress__bar' }, h('i', { style: 'width:' + (total ? Math.round(c.done / total * 100) : 0) + '%' }))
        ]),
        h('div', { class: 'btn-row' }, [
          h('a', { class: 'btn', href: '#/knowledge/' + id }, '← 查看本章基础知识'),
          resetButton(id)
        ])
      ]));

      if (sub === 'main') { frag.appendChild(viewTypeMain(t, id)); }
      else if (sub === 'examples') { frag.appendChild(viewTypeExamples(t, id)); }
      else { frag.appendChild(viewTypeAnswers(t, id)); }

      main.innerHTML = '';
      main.appendChild(frag);
      if (root.DSHMath) { DSHMath.render(main); }
      wireQuestions(main, id);
      focusPending(main);
    });
  }

  function resetButton(id) {
    return h('button', {
      class: 'btn', type: 'button',
      onclick: function () {
        var n = 0, k;
        for (k in state.progress) {
          if (k.indexOf('t:' + id + ':') === 0) { delete state.progress[k]; n++; }
        }
        save();
        if (n) { render(); }
      }
    }, '重置本章作答');
  }

  function kindLabel(kind) {
    return kind === 'choice' ? '选择题' : kind === 'blank' ? '填空题' : '简答题';
  }
  function kindTag(kind) {
    var cls = kind === 'choice' ? 'tag' : (kind === 'blank' ? 'tag tag--warn' : 'tag tag--ok');
    return h('span', { class: cls }, kindLabel(kind));
  }

  /* ---------- 主界面：题型要点 + 配套练习 ---------- */
  function viewTypeMain(t, chapId) {
    var frag = document.createDocumentFragment();
    (t.types || []).forEach(function (ty, i) {
      var qs = ty.questions || [];
      var dn = 0;
      qs.forEach(function (q) { if (isDone('t:' + chapId + ':' + (q.id || ''))) { dn++; } });
      var card = h('div', { class: 'card', id: 'type-' + ty.id }, [
        h('div', { class: 'card__head' }, [
          h('h2', null, [h('span', null, '题型 ' + (i + 1) + '　'), h('span', titleText(ty.name || ''))]),
          h('span', { class: 'tag' }, qs.length + ' 题'),
          h('span', { class: 'tag' }, '已完成 ' + dn + '/' + qs.length)
        ]),
        ty.desc ? h('p', { class: 'content', html: ty.desc }) : null,
        ty.points && ty.points.length ? h('div', { class: 'content' }, [
          h('div', { class: 'sub-title' }, '解题要点'),
          h('ul', { html: ty.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') })
        ]) : null
      ]);

      var list = h('div', { class: 'q-list' });
      qs.forEach(function (q, qi) {
        list.appendChild(buildQuestion(q, chapId, ty.id, qi));
      });
      card.appendChild(h('div', { class: 'sub-title' }, '配套练习'));
      card.appendChild(list);
      card.appendChild(h('div', { class: 'btn-row' }, [
        h('a', { class: 'btn', href: '#/types/' + chapId + '/examples' }, '查看例题 →'),
        h('a', { class: 'btn', href: '#/types/' + chapId + '/answers' }, '查看答案 →')
      ]));
      frag.appendChild(card);
    });
    return frag;
  }

  function buildQuestion(q, chapId, typeId, qi) {
    var key = q.id || (typeId + '-' + (qi + 1));
    var pkey = 't:' + chapId + ':' + key;
    var wrap = h('div', { class: 'q' + (isDone(pkey) ? ' is-done' : ''), 'data-qkey': pkey });
    var head = h('div', { class: 'q__head' }, [
      h('span', { class: 'q__no' }, cnNum(qi + 1) + '、'),
      kindTag(q.kind),
      h('span', { class: 'q__status' }, '')
    ]);
    wrap.appendChild(head);
    wrap.appendChild(h('div', { class: 'q__stem content', html: q.stem || '' }));

    var inputs = [];

    if (q.kind === 'choice') {
      var ul = h('ul', { class: 'q__opts' });
      (q.options || []).forEach(function (o, oi) {
        var letter = String.fromCharCode(65 + oi);
        var label = h('label', { class: 'q__opt' });
        var input = h('input', { type: 'radio', name: 'r-' + chapId + '-' + key, value: letter });
        inputs.push({ el: input, type: 'choice' });
        label.appendChild(input);
        label.appendChild(h('span', { class: 'opt-key' }, letter + '.'));
        label.appendChild(h('span', { class: 'content', html: o }));
        ul.appendChild(h('li', null, label));
      });
      wrap.appendChild(ul);
    } else if (q.kind === 'blank') {
      var blanks = q.blanks || [];
      var box = h('div', { class: 'q__blanks' });
      blanks.forEach(function (b, bi) {
        if (b && typeof b === 'object' && (b.before != null || b.after != null)) {
          if (b.before != null) { box.appendChild(h('span', { class: 'content', html: b.before })); }
          var inp = h('input', { class: 'blank', type: 'text', 'data-idx': bi, autocomplete: 'off', placeholder: b.placeholder || '填答案' });
          inputs.push({ el: inp, type: 'blank', answer: b.answer });
          if (b.after != null) { box.appendChild(h('span', { class: 'content', html: b.after })); }
        } else {
          var bd = typeof b === 'object' ? b : { answer: b };
          box.appendChild(h('span', { class: 'small muted' }, '第 ' + (bi + 1) + ' 空：'));
          var inp2 = h('input', { class: 'blank', type: 'text', 'data-idx': bi, autocomplete: 'off', placeholder: '填答案' });
          inputs.push({ el: inp2, type: 'blank', answer: bd.answer });
          box.appendChild(inp2);
        }
        box.appendChild(document.createTextNode('　'));
      });
      if (!blanks.length) {
        box.appendChild(h('div', { class: 'content', html: q.stem || '' }));
      }
      wrap.appendChild(box);
    } else {
      var ta = h('textarea', { class: 'answer-input', placeholder: '在此写出你的解答思路（可留空直接看答案）' });
      inputs.push({ el: ta, type: 'short' });
      wrap.appendChild(ta);
    }

    var fb = h('div', { class: 'feedback' });
    var tools = h('div', { class: 'q__tools' });

    if (q.kind !== 'short') {
      tools.appendChild(h('button', {
        class: 'btn btn--primary', type: 'button',
        onclick: function () {
          var ok = true, allFilled = true;
          if (q.kind === 'choice') {
            var picked = null;
            inputs.forEach(function (x) { if (x.el.checked) { picked = x.el.value; } });
            if (!picked) { allFilled = false; }
            ok = picked && eqAnswer(picked, q.answer);
          } else {
            inputs.forEach(function (x) {
              var v = x.el.value;
              if (!String(v).trim()) { allFilled = false; }
              var good = eqAnswer(v, x.answer);
              x.el.classList.toggle('is-ok', !!String(v).trim() && good);
              x.el.classList.toggle('is-bad', !!String(v).trim() && !good);
              if (!good) { ok = false; }
            });
          }
          if (!allFilled) {
            fb.className = 'feedback is-bad';
            fb.textContent = '还有未作答的部分，请先填写再提交。';
            return;
          }
          fb.className = 'feedback ' + (ok ? 'is-ok' : 'is-bad');
          fb.textContent = ok ? '✓ 正确' : '✗ 再想一想（可展开“答案与解析”核对）';
          if (ok) {
            markDone(pkey, true);
            wrap.classList.add('is-done');
            var st = wrap.querySelector('.q__status');
            if (st) { st.textContent = '已完成'; }
          } else {
            markDone(pkey, false);
            wrap.classList.remove('is-done');
            var st2 = wrap.querySelector('.q__status');
            if (st2) { st2.textContent = ''; }
          }
          updateProgressLine(chapId);
        }
      }, '提交判分'));
    }
    tools.appendChild(h('button', {
      class: 'btn', type: 'button',
      onclick: function () {
        var d = wrap.querySelector('details.solution');
        if (d) { d.open = !d.open; }
      }
    }, '答案与解析'));
    tools.appendChild(h('button', {
      class: 'btn', type: 'button',
      onclick: function () {
        markDone(pkey, true);
        wrap.classList.add('is-done');
        var st = wrap.querySelector('.q__status');
        if (st) { st.textContent = '已标记'; }
        updateProgressLine(chapId);
      }
    }, '标记掌握'));
    if (q.kind === 'short') {
      tools.appendChild(h('span', { class: 'small muted' }, '简答题请自行书写后对照解析'));
    }
    wrap.appendChild(tools);
    wrap.appendChild(fb);

    var sol = h('div', { class: 'solution__body' });
    sol.appendChild(h('p', { class: 'answer-line' }, [
      h('span', { class: 'k' }, '答案：'),
      h('span', { class: 'content', html: (q.answerText || (q.answer instanceof Array ? q.answer.join('，') : q.answer) || '见解析') })
    ]));
    sol.appendChild(h('div', { class: 'content', html: q.solution || '' }));
    wrap.appendChild(h('details', { class: 'solution' }, [
      h('summary', null, '答案与解析'),
      sol
    ]));

    return wrap;
  }

  function updateProgressLine(chapId) {
    var bar = document.querySelector('.progress__bar i');
    var label = document.querySelector('.progress span');
    var t = DSHData.types[chapId];
    if (!t || !bar || !label) { return; }
    var c = typeCounts(t, chapId);
    var total = c.nQ + c.nEx;
    label.textContent = '已完成 ' + c.done + ' / ' + total;
    bar.style.width = (total ? Math.round(c.done / total * 100) : 0) + '%';
  }

  /* ---------- 副界面：例题 ---------- */
  function viewTypeExamples(t, chapId) {
    var frag = document.createDocumentFragment();
    var any = 0;
    (t.types || []).forEach(function (ty, i) {
      var exs = ty.examples || [];
      if (!exs.length) { return; }
      var card = h('div', { class: 'card' }, [
        h('div', { class: 'card__head' }, [
          h('h2', null, [h('span', null, '题型 ' + (i + 1) + '　'), h('span', titleText(ty.name || ''))]),
          h('span', { class: 'tag' }, exs.length + ' 道例题')
        ])
      ]);
      exs.forEach(function (ex, ei) {
        any++;
        var key = ex.id || ((ty.id || i) + '-ex-' + (ei + 1));
        var pkey = 't:' + chapId + ':ex:' + key;
        var body = h('div', { class: 'ex__body' });
        body.appendChild(h('div', { class: 'content', html: ex.problem || '' }));
        var answer = h('div', { class: 'block__body' });
        answer.appendChild(h('div', { class: 'content', html: ex.solution || '' }));
        if (ex.note) { answer.appendChild(h('p', { class: 'small muted', html: '注：' + ex.note })); }
        body.appendChild(h('details', { class: 'block', 'data-ex': key }, [
          h('summary', null, '查看解答'),
          answer
        ]));
        body.appendChild(h('div', { class: 'btn-row' }, [
          h('button', {
            class: 'btn', type: 'button',
            onclick: function (e) {
              var on = !isDone(pkey);
              markDone(pkey, on);
              var ex1 = e.target.closest('.ex');
              if (ex1) { ex1.classList.toggle('is-done', on); }
              e.target.textContent = on ? '✓ 已掌握' : '标记为已掌握';
              updateProgressLine(chapId);
            }
          }, isDone(pkey) ? '✓ 已掌握' : '标记为已掌握')
        ]));
        var wrap = h('div', { class: 'ex' + (isDone(pkey) ? ' is-done' : '') }, [
          h('div', { class: 'ex__head' }, [
            h('span', { class: 'ex__no' }, '例 ' + (i + 1) + '-' + (ei + 1)),
            h('span', { class: 'small muted', html: titleText(ex.title || '').html, text: titleText(ex.title || '').text })
          ]),
          body
        ]);
        card.appendChild(wrap);
      });
      frag.appendChild(card);
    });
    if (!any) {
      frag.appendChild(h('div', { class: 'card' }, [h('p', { class: 'muted' }, '本章暂无例题数据。')]));
    }
    frag.appendChild(h('div', { class: 'btn-row' }, [
      h('a', { class: 'btn', href: '#/types/' + chapId }, '← 返回题型主界面'),
      h('a', { class: 'btn', href: '#/types/' + chapId + '/answers' }, '前往答案 →')
    ]));
    return frag;
  }

  /* ---------- 副界面：答案 ---------- */
  function viewTypeAnswers(t, chapId) {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('div', { class: 'notice' }, '建议先完成主界面的配套练习，再对照此处解析；例题解答在“例题”副界面。'));

    // 速查表
    var rows = [];
    (t.types || []).forEach(function (ty, i) {
      (ty.questions || []).forEach(function (q, qi) {
        rows.push({
          ref: cnNum(i + 1) + '-' + (qi + 1) + '（' + kindLabel(q.kind) + '）',
          key: q.answerText || (q.answer instanceof Array ? q.answer.join('，') : q.answer) || '见解析',
          type: ty.name || ''
        });
      });
    });
    if (rows.length) {
      var tb = h('tbody');
      rows.forEach(function (r) {
        tb.appendChild(h('tr', null, [
          h('td', { class: 'mono small' }, r.ref),
          h('td', { class: 'small muted' }, r.type),
          h('td', { class: 'content', html: r.key })
        ]));
      });
      frag.appendChild(h('div', { class: 'card' }, [
        h('div', { class: 'card__head' }, [h('h2', null, '选填题答案速查')]),
        h('table', { class: 'tbl' }, [
          h('thead', null, h('tr', null, [h('th', null, '题号'), h('th', null, '题型'), h('th', null, '答案')])),
          tb
        ])
      ]));
    }

    // 详细解析
    (t.types || []).forEach(function (ty, i) {
      var qs = ty.questions || [];
      if (!qs.length) { return; }
      var card = h('div', { class: 'card' }, [
        h('div', { class: 'card__head' }, [
          h('h2', null, [h('span', null, '题型 ' + (i + 1) + '　'), h('span', titleText(ty.name || ''))]),
          h('span', { class: 'tag' }, qs.length + ' 题解析')
        ])
      ]);
      qs.forEach(function (q, qi) {
        var body = h('div', { class: 'block__body' });
        body.appendChild(h('p', { class: 'q__stem content', html: q.stem || '' }));
        if (q.kind === 'choice' && q.options) {
          body.appendChild(h('ul', { class: 'q__opts' }, q.options.map(function (o, oi) {
            return h('li', null, [
              h('span', { class: 'opt-key' }, String.fromCharCode(65 + oi) + '.'),
              h('span', { class: 'content', html: o })
            ]);
          })));
        }
        body.appendChild(h('p', { class: 'answer-line' }, [
          h('span', { class: 'k' }, '答案：'),
          h('span', { class: 'content', html: q.answerText || (q.answer instanceof Array ? q.answer.join('，') : q.answer) || '见解析' })
        ]));
        body.appendChild(h('div', { class: 'content', html: q.solution || '' }));
        card.appendChild(h('details', { class: 'block', open: qi === 0 ? 'open' : null }, [
          h('summary', null, cnNum(qi + 1) + '、' + kindLabel(q.kind) + '（' + (q.id || '') + '）'),
          body
        ]));
      });
      frag.appendChild(card);
    });

    frag.appendChild(h('div', { class: 'btn-row' }, [
      h('a', { class: 'btn', href: '#/types/' + chapId }, '← 返回题型主界面'),
      h('a', { class: 'btn', href: '#/types/' + chapId + '/examples' }, '前往例题 →')
    ]));
    return frag;
  }

  function focusPending(host) {
    if (!pendingFocus || !host) { return; }
    var el = host.querySelector('#type-' + pendingFocus) || host.querySelector('[data-type-id="' + pendingFocus + '"]');
    pendingFocus = null;
    if (el && el.scrollIntoView) { el.scrollIntoView({ block: 'start' }); }
  }

  /* ============================================================
     9. 交互：题目提交 / 空格输入
     ============================================================ */
  function wireQuestions(host, chapId) {
    host.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') { return; }
      var t = e.target;
      if (t && t.classList && t.classList.contains('blank')) {
        var wrap = t.closest('.q');
        if (wrap) {
          var btn = wrap.querySelector('.btn--primary');
          if (btn) { btn.click(); }
        }
      }
    });
  }

  /* ============================================================
     10. 错误卡片
     ============================================================ */
  function errorCard(id, what) {
    var meta = (DSHData.index || {})[String(id)] || {};
    return h('div', { class: 'card' }, [
      h('div', { class: 'card__head' }, [h('h2', null, '第 ' + id + ' 章　' + (meta.name || '') + ' · ' + what)]),
      h('div', { class: 'notice notice--err' }, '数据文件缺失或加载失败（可能因为直接双击打开了 index.html 而未通过本地服务器访问）。'),
      h('p', { class: 'small muted' }, '请用本地静态服务器打开本页，例如在本目录执行：python -m http.server 8000，然后访问 http://localhost:8000/'),
      h('div', { class: 'btn-row' }, [
        h('a', { class: 'btn', href: '#/knowledge' }, '← 返回目录')
      ])
    ]);
  }

  /* ============================================================
     11. 渲染与启动
     ============================================================ */
  function render() {
    var route = parseHash();
    state.route = route;
    renderSidebar(route);
    var layout = document.getElementById('layout');
    if (layout) {
      var full = !(route.name === 'knowledge' || route.name === 'types');
      layout.classList.toggle('layout--full', full);
    }
    var main = document.getElementById('main');
    if (!main) { return; }

    // 顶部导航高亮
    var navK = document.getElementById('nav-knowledge');
    var navT = document.getElementById('nav-types');
    if (navK) { navK.className = route.name === 'knowledge' ? 'is-active' : ''; }
    if (navT) { navT.className = route.name === 'types' ? 'is-active' : ''; }

    window.scrollTo(0, 0);

    if (route.name === 'home') { main.innerHTML = ''; main.appendChild(viewHome()); }
    else if (route.name === 'knowledge') {
      if (route.id) { renderKnowledge(route.id); }
      else { main.innerHTML = ''; main.appendChild(viewKnowledgeList()); }
    } else if (route.name === 'types') {
      if (route.id) { renderTypes(route.id, route.sub || 'main'); }
      else { main.innerHTML = ''; main.appendChild(viewTypesList()); }
    } else {
      main.innerHTML = '';
      main.appendChild(viewHome());
    }
    var foot = document.getElementById('footer-note');
    if (foot) {
      foot.textContent = '共 ' + DSHData.order.length + ' 章 · 灰白简约 · 离线可用 · ' + new Date().getFullYear();
    }
  }

  function boot() {
    // 建立章节目录（若数据文件未提供 index，则使用默认 18 章）
    if (!DSHData.index || !Object.keys(DSHData.index).length) {
      DSHData.index = {};
      for (var i = 1; i <= 18; i++) { DSHData.index[String(i)] = {}; }
    }
    if (!DSHData.order.length) {
      DSHData.order = Object.keys(DSHData.index).map(Number).sort(function (a, b) { return a - b; });
    }
    window.addEventListener('hashchange', render);
    render();
  }

  App.render = render;
  App.boot = boot;
  App.go = go;
  App.state = state;
  App.utils = { cnNum: cnNum, norm: norm, eqAnswer: eqAnswer, esc: esc };
  App.internals = { wrapMath: wrapMath, normalizeChapter: normalizeChapter, expand: textArg };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(typeof window !== 'undefined' ? window : globalThis);
