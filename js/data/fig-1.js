/*!
 * fig-1.js —— 第 1 章「集合」简图
 * 图 id：c1-set-represent、c1-venn-ops、c1-subset-count、c1-sufficient
 * 说明：本文件全部用「自由场景」（SVG 原始坐标，y 轴向下），
 *       坐标系与 viewBox 一致，文字无需翻转。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* 两圆交叠形成的“透镜”区域路径（用于交集/并集阴影） */
  function lensPath(cx1, cx2, cy, r) {
    var d = Math.abs(cx2 - cx1), h = Math.sqrt(Math.max(0, r * r - (d / 2) * (d / 2)));
    var xm = (cx1 + cx2) / 2;
    var yTop = cy - h, yBot = cy + h;
    // 从上方交点沿右侧圆到下方交点，再沿左侧圆返回
    return 'M ' + xm + ' ' + yTop +
      ' A ' + r + ' ' + r + ' 0 0 ' + (cx2 > cx1 ? 1 : 0) + ' ' + xm + ' ' + yBot +
      ' A ' + r + ' ' + r + ' 0 0 ' + (cx2 > cx1 ? 0 : 1) + ' ' + xm + ' ' + yTop + ' Z';
  }

  /* ---------- 1. 集合的四种表示法 ---------- */
  add('c1-set-represent', {
    title: '集合的四种表示法',
    caption: '描述法 \\(A=\\{x\\mid x^2&lt;4\\}\\)、列举法 \\(B=\\{-1,0,1\\}\\) 与区间法 \\(C=(-2,2)\\) 表示的是同一个集合；韦恩图与数轴给出它的两种图像。',
    viewBox: '-0.6 -2.6 12.6 5.2',
    draw: function (h) {
      var Y = 0; // 数轴所在水平线（SVG y）
      return [
        /* 数轴：从 -2 到 2 的区间，空心端点 */
        n('rect', { class: 'fill-soft', x: '-2', y: '-0.28', width: '4', height: '0.56' }),
        n('line', { class: 'ax', x1: '-2.8', y1: Y, x2: '4.4', y2: Y }),
        n('path', { class: 'ax', d: 'M4.4 ' + Y + ' L4.0 ' + (Y - 0.18) + ' M4.4 ' + Y + ' L4.0 ' + (Y + 0.18), fill: 'none' }),
        n('path', { class: 'ax', d: 'M-2.8 ' + Y + ' L-2.4 ' + (Y - 0.18) + ' M-2.8 ' + Y + ' L-2.4 ' + (Y + 0.18), fill: 'none' }),
        [-2, -1, 0, 1, 2].map(function (k) {
          return n('line', { class: 'ax', x1: String(k), y1: String(Y - 0.18), x2: String(k), y2: String(Y + 0.18) });
        }),
        n('circle', { class: 'pt', cx: '-2', cy: String(Y), r: '0.14' }),
        n('circle', { class: 'pt', cx: '2', cy: String(Y), r: '0.14' }),
        h.text('-2', Y + 0.55, '-2', 'lbl--sm'),
        h.text('-1', Y + 0.55, '-1', 'lbl--sm'),
        h.text('0', Y + 0.55, '0', 'lbl--sm'),
        h.text('1', Y + 0.55, '1', 'lbl--sm'),
        h.text('2', Y + 0.55, '2', 'lbl--sm'),
        h.text('4.1', Y + 0.55, 'x', 'lbl--sm'),
        h.text('0', Y - 0.78, '区间法 \\((-2,2)\\)', 'lbl--sm'),

        /* 右侧韦恩图：列举法 {-1,0,1} */
        n('circle', { class: 'shape', cx: '9.2', cy: '0', r: '1.7' }),
        h.text('9.2', '-2.05', '列举法 \\(\\{-1,0,1\\}\\)', 'lbl--sm'),
        n('circle', { class: 'pt--solid', cx: '8.55', cy: '0.25', r: '0.09' }),
        n('circle', { class: 'pt--solid', cx: '9.2', cy: '0.25', r: '0.09' }),
        n('circle', { class: 'pt--solid', cx: '9.85', cy: '0.25', r: '0.09' }),
        h.text('8.55', '0.85', '-1', 'lbl--sm'),
        h.text('9.2', '0.85', '0', 'lbl--sm'),
        h.text('9.85', '0.85', '1', 'lbl--sm')
      ];
    }
  });

  /* ---------- 2. 集合的三种运算（韦恩图，含阴影） ---------- */
  add('c1-venn-ops', {
    title: '并集、交集、补集',
    caption: '左：\\(A\\cup B\\)（两圆覆盖的全部）；中：\\(A\\cap B\\)（公共部分）；右：\\(\\complement_{U}A\\)（矩形内圆外的部分）。',
    viewBox: '-9.6 -2.8 19.2 5.6',
    draw: function (h) {
      var cy = 0, R = 1.7;
      var xA = -6.3, xB = -4.6;   // 左：并集
      var mA = -1.0, mB = 0.7;    // 中：交集
      var ux = 4.6;               // 右：补集矩形
      return [
        /* 左：并集（两圆都填充） */
        n('circle', { class: 'fill-soft', cx: String(xA), cy: String(cy), r: String(R) }),
        n('circle', { class: 'fill-soft', cx: String(xB), cy: String(cy), r: String(R) }),
        n('circle', { class: 'shape', cx: String(xA), cy: String(cy), r: String(R) }),
        n('circle', { class: 'shape', cx: String(xB), cy: String(cy), r: String(R) }),
        h.text(String((xA + xB) / 2), String(cy), 'A', 'lbl'),
        h.text(String((xA + xB) / 2), String(cy + 1.1), 'B', 'lbl'),
        h.text(String((xA + xB) / 2), '-2.3', '\\(A\\cup B\\)', 'lbl--sm'),

        /* 中：交集（仅重叠区域填充） */
        n('path', { class: 'fill-soft', d: lensPath(mA, mB, cy, R) }),
        n('circle', { class: 'shape', cx: String(mA), cy: String(cy), r: String(R) }),
        n('circle', { class: 'shape', cx: String(mB), cy: String(cy), r: String(R) }),
        h.text(String((mA + mB) / 2), String(cy), 'A∩B', 'lbl--sm'),
        h.text(String((mA + mB) / 2), '-2.3', '\\(A\\cap B\\)', 'lbl--sm'),

        /* 右：补集（矩形填充，圆留白） */
        n('rect', { class: 'fill-soft', x: String(ux - 2.1), y: String(cy - 2.1), width: '4.2', height: '4.2', rx: '0.15' }),
        n('circle', { class: 'pt', cx: String(ux), cy: String(cy), r: String(R), fill: '#ffffff' }),
        n('circle', { class: 'shape', cx: String(ux), cy: String(cy), r: String(R) }),
        n('rect', { class: 'shape', x: String(ux - 2.1), y: String(cy - 2.1), width: '4.2', height: '4.2', rx: '0.15', fill: 'none' }),
        h.text(String(ux - 1.7), String(cy - 1.75), 'U', 'lbl'),
        h.text(String(ux), String(cy), 'A', 'lbl'),
        h.text(String(ux), '-2.5', '\\(\\complement_{U}A\\)', 'lbl--sm')
      ];
    }
  });

  /* ---------- 3. 子集个数的幂集结构 ---------- */
  add('c1-subset-count', {
    title: '子集个数 \\(2^n\\) 的来源',
    caption: '把 \\(\\{a,b,c\\}\\) 的子集按元素多少分层：每往上一层就多决定一个元素“要还是不要”，所以每层个数依次为 1、3、3、1，合计 \\(2^3=8\\) 个。',
    viewBox: '-3.9 -0.5 7.8 3.9',
    draw: function (h) {
      var lv = [3.0, 2.0, 1.0, 0.0];
      var xs = [[0], [-1.7, 0, 1.7], [-1.7, 0, 1.7], [0]];
      var labels = [['{a,b,c}'], ['{a,b}', '{a,c}', '{b,c}'], ['{a}', '{b}', '{c}'], ['\\(\\varnothing\\)']];
      var edges = [
        [0, lv[0], -1.7, lv[1]], [0, lv[0], 0, lv[1]], [0, lv[0], 1.7, lv[1]],
        [-1.7, lv[1], -1.7, lv[2]], [0, lv[1], 0, lv[2]], [1.7, lv[1], 1.7, lv[2]],
        [-1.7, lv[2], 0, lv[3]], [0, lv[2], 0, lv[3]], [1.7, lv[2], 0, lv[3]]
      ];
      var nodes = [];
      var i, j;
      for (i = 0; i < edges.length; i++) {
        nodes.push(n('line', {
          class: 'ax', stroke: '#b9b9b4',
          x1: String(edges[i][0]), y1: String(edges[i][1]),
          x2: String(edges[i][2]), y2: String(edges[i][3])
        }));
      }
      for (i = 0; i < lv.length; i++) {
        for (j = 0; j < xs[i].length; j++) {
          nodes.push(n('circle', { class: 'pt--solid', cx: String(xs[i][j]), cy: String(lv[i]), r: '0.09' }));
          nodes.push(h.text(String(xs[i][j]), String(lv[i] + 0.34), labels[i][j], 'lbl--sm'));
        }
      }
      nodes.push(h.text('2.95', String(lv[0]), '1 个', 'lbl--sm', 'start'));
      nodes.push(h.text('2.95', String(lv[1]), '3 个', 'lbl--sm', 'start'));
      nodes.push(h.text('2.95', String(lv[2]), '3 个', 'lbl--sm', 'start'));
      nodes.push(h.text('2.95', String(lv[3]), '1 个', 'lbl--sm', 'start'));
      return nodes;
    }
  });

  /* ---------- 4. 充分不必要条件的集合刻画 ---------- */
  add('c1-sufficient', {
    title: '充分不必要条件的集合刻画',
    caption: '\\(p\\Rightarrow q\\) 就是 \\(P\\subseteq Q\\)：\\(P\\) 小、\\(Q\\) 大，小的“够用”去推出大的，故 \\(p\\) 充分；大的 \\(Q\\) 是小的 \\(P\\) 成立所必需的范围，故 \\(q\\) 必要。',
    viewBox: '-3.9 -2.9 7.8 5.6',
    draw: function (h) {
      return [
        n('circle', { class: 'fill-soft', cx: '0', cy: '-0.1', r: '2.25' }),
        n('circle', { class: 'shape', cx: '0', cy: '-0.1', r: '2.25' }),
        n('circle', { class: 'shape--dark', cx: '0', cy: '-0.1', r: '1.1' }),
        h.text('0', '-2.75', '\\(Q\\)', 'lbl'),
        h.text('0', '-0.1', '\\(P\\)', 'lbl'),
        h.text('1.45', '-1.75', '\\(P\\subsetneq Q\\)', 'lbl--sm', 'start'),
        h.text('0', '2.4', '\\(P\\subseteq Q\\)，即 \\(p\\Rightarrow q\\)', 'lbl--sm')
      ];
    }
  });
})();
