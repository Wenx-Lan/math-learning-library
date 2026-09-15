/*!
 * fig-1.js —— 第 1 章「集合」简图定义
 * 图 id：c1-set-represent、c1-venn-ops、c1-subset-count、c1-sufficient
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 1. 集合的表示法对照 ---------- */
  add('c1-set-represent', {
    title: '集合的四种表示法',
    caption: '描述法 \\(A=\\{x\\mid x^2&lt;4\\}\\)、列举法 \\(B=\\{-1,0,1\\}\\) 与区间法 \\(C=(-2,2)\\) 表示的是同一个集合；韦恩图则给出它的直观图像。',
    viewBox: '-6.6 -3.0 13.2 6.0',
    draw: function (h) {
      return [
        /* 左：韦恩图 */
        n('circle', { class: 'shape', cx: '-3.9', cy: '0.35', r: '1.55' }),
        h.text(-3.9, -1.75, 'A：\\(x^2&lt;4\\)', 'lbl--sm'),
        n('circle', { class: 'pt--solid', cx: '-4.65', cy: '0.95', r: '0.1' }),
        n('circle', { class: 'pt--solid', cx: '-3.9', cy: '0.35', r: '0.1' }),
        n('circle', { class: 'pt--solid', cx: '-3.15', cy: '-0.25', r: '0.1' }),
        h.text(-4.95, '1.45', '-1', 'lbl--sm'),
        h.text(-3.9, '0.85', '0', 'lbl--sm'),
        h.text(-2.85, '0.25', '1', 'lbl--sm'),
        /* 右：数轴 */
        n('line', { class: 'ax', x1: '-1.7', y1: '0.4', x2: '5.6', y2: '0.4' }),
        n('path', { class: 'ax', d: 'M5.6 0.4 L5.15 0.58 M5.6 0.4 L5.15 0.22', fill: 'none' }),
        n('path', { class: 'shape', d: 'M2.6 0.4 L4.1 0.4 L4.1 -0.72 L2.6 -0.72 Z' }),
        n('circle', { class: 'pt', cx: '2.6', cy: '0.4', r: '0.11' }),
        n('circle', { class: 'pt', cx: '4.1', cy: '0.4', r: '0.11' }),
        h.text('2.6', '-0.12', '-2', 'lbl--sm'),
        h.text('4.1', '-0.12', '2', 'lbl--sm'),
        h.text('5.15', '0.85', 'x', 'lbl--sm'),
        h.text('3.35', '-1.15', '区间法 \\((-2,2)\\)', 'lbl--sm'),
        h.text('3.35', '1.25', '列举法 \\(\\{-1,0,1\\}\\)', 'lbl--sm')
      ];
    }
  });

  /* ---------- 2. 集合的三种运算（韦恩图） ---------- */
  add('c1-venn-ops', {
    title: '并集、交集、补集',
    caption: '左：\\(A\\cup B\\)（两圆覆盖的全部）；中：\\(A\\cap B\\)（公共部分，也是 \\(A\\cap B=B\\cap A\\) 的体现）；右：\\(\\complement_{U}A\\)（矩形内圆外的部分）。',
    viewBox: '-8.0 -2.6 16.0 5.2',
    draw: function (h) {
      var cx1 = -3.0, cx2 = -1.3, cy = 0, R = 1.6;
      var mid1 = 2.1, mid2 = 3.8, midC = 2.95;
      return [
        /* 左：并集 */
        n('circle', { class: 'shape', cx: String(cx1), cy: String(cy), r: String(R) }),
        n('circle', { class: 'shape', cx: String(cx2), cy: String(cy), r: String(R) }),
        h.text('-3.85', '1.9', 'A', 'lbl'),
        h.text('-0.45', '1.9', 'B', 'lbl'),
        h.text('-2.15', '-2.2', '\\(A\\cup B\\)', 'lbl--sm'),
        /* 中：交集 */
        n('circle', { class: 'shape', cx: String(mid1), cy: String(cy), r: String(R) }),
        n('circle', { class: 'shape', cx: String(mid2), cy: String(cy), r: String(R) }),
        h.text(String(midC), '0', '公共部分', 'lbl--sm'),
        h.text('2.95', '-2.2', '\\(A\\cap B\\)', 'lbl--sm'),
        /* 右：补集 */
        n('rect', { class: 'shape', x: '4.9', y: '-1.9', width: '3.0', height: '3.8', rx: '0.12' }),
        n('circle', { class: 'shape--dark', cx: '6.4', cy: '0', r: '1.15' }),
        h.text('5.2', '-1.6', 'U', 'lbl'),
        h.text('6.4', '0', 'A', 'lbl'),
        h.text('6.4', '-2.2', '\\(\\complement_{U}A\\)', 'lbl--sm')
      ];
    }
  });

  /* ---------- 3. 子集个数的幂集结构 ---------- */
  add('c1-subset-count', {
    title: '子集个数 \\(2^n\\) 的来源',
    caption: '把 \\(\{a,b,c\}\\) 的子集按元素多少分层：每往上一层就多决定一个元素“要还是不要”，所以每层个数依次为 1、3、3、1，合计 \\(1+3+3+1=2^3=8\\) 个。',
    viewBox: '-3.75 -0.45 7.5 3.45',
    draw: function (h) {
      var lv = [3.05, 2.05, 1.05, 0.05];
      var xs = [[0], [-1.7, 0, 1.7], [-1.7, 0, 1.7], [0]];
      var labels = [
        ['{a,b,c}'],
        ['{a,b}', '{a,c}', '{b,c}'],
        ['{a}', '{b}', '{c}'],
        ['\\(\\varnothing\\)']
      ];
      var nodes = [];
      var i, j;
      for (i = 0; i < lv.length; i++) {
        for (j = 0; j < xs[i].length; j++) {
          nodes.push(h.text(String(xs[i][j]), String(lv[i]), labels[i][j], 'lbl--sm'));
        }
      }
      var edges = [
        [0, lv[0], -1.7, lv[1]], [0, lv[0], 0, lv[1]], [0, lv[0], 1.7, lv[1]],
        [-1.7, lv[1], -1.7, lv[2]], [0, lv[1], 0, lv[2]], [1.7, lv[1], 1.7, lv[2]],
        [-1.7, lv[2], 0, lv[3]], [0, lv[2], 0, lv[3]], [1.7, lv[2], 0, lv[3]]
      ];
      var lines = [];
      for (i = 0; i < edges.length; i++) {
        lines.push(n('line', {
          class: 'ax',
          x1: String(edges[i][0]), y1: String(edges[i][1]),
          x2: String(edges[i][2]), y2: String(edges[i][3])
        }));
      }
      return lines.concat(nodes, [
        h.text('2.75', String(lv[0]), '1 个', 'lbl--sm'),
        h.text('2.75', String(lv[1]), '3 个', 'lbl--sm'),
        h.text('2.75', String(lv[2]), '3 个', 'lbl--sm'),
        h.text('2.75', String(lv[3]), '1 个', 'lbl--sm')
      ]);
    }
  });

  /* ---------- 4. 充分条件与必要条件 ---------- */
  add('c1-sufficient', {
    title: '充分不必要条件的集合刻画',
    caption: '设 \\(P=\\{x\\mid p(x)\\}\\)、\\(Q=\\{x\\mid q(x)\\}\\)。\\(p\\Rightarrow q\\) 就是 \\(P\\subseteq Q\\)：\\(P\\) 小、\\(Q\\) 大，小的“够用”去推出大的，故 \\(p\\) 充分；大的 \\(Q\\) 是小的 \\(P\\) 成立所必需的范围，故 \\(q\\) 必要。',
    viewBox: '-3.75 -2.75 7.5 5.5',
    draw: function (h) {
      return [
        n('circle', { class: 'shape', cx: '0', cy: '-0.1', r: '2.15' }),
        n('circle', { class: 'shape--dark', cx: '0', cy: '-0.15', r: '1.05' }),
        h.text('0', '1.75', '\\(Q\\)：\\(q(x)\\)', 'lbl'),
        h.text('0', '-0.15', '\\(P\\)', 'lbl'),
        h.text('0', '-2.5', '\\(P\\subseteq Q\\)，即 \\(p\\Rightarrow q\\)', 'lbl--sm'),
        h.text('1.15', '-1.65', '\\(P\\subsetneq Q\\)', 'lbl--sm', 'start'),
        n('circle', { class: 'pt--solid', cx: '0', cy: '-0.15', r: '0.08' })
      ];
    }
  });
})();
