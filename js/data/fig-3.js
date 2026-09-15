/*!
 * fig-3.js —— 第 3 章「基本不等式」简图定义
 * 图 id：c3-semicircle-proof、c3-sum-product、c3-one-substitution、c3-mistake-equal
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 1. 半圆中的几何证明（圆心 O(0.5,0)，A(-2)、D(0)、B(3)） ---------- */
  add('c3-semicircle-proof', {
    title: '半圆中 \\(\\frac{a+b}{2}\\ge\\sqrt{ab}\\) 的几何证明',
    caption: '以 \\(a+b\\) 为直径作半圆，圆心 \\(O\\) 到端点距离为半径 \\(\\frac{a+b}{2}\\)；在分点 \\(D\\) 处作垂线与半圆交于 \\(C\\)，则 \\(CD=\\sqrt{ab}\\)。半径不小于垂线段，故 \\(\\frac{a+b}{2}\\ge\\sqrt{ab}\\)；当且仅当 \\(D\\) 与 \\(O\\) 重合（\\(a=b\\)）时取等号。',
    coord: { x: [-3.0, 4.2], y: [-2.0, 3.6], grid: 1, pad: 0.3 },
    draw: function (h) {
      var cx = 0.5, R = 2.5, i, t;
      var arc = [];
      for (i = 0; i <= 70; i++) {
        t = Math.PI - Math.PI * i / 70;
        arc.push([cx + R * Math.cos(t), R * Math.sin(t)]);
      }
      var hC = Math.sqrt(6); // sqrt(ab) = sqrt(2*3)
      return [].concat(
        h.axes({ origin: false, ticks: true, xlabel: 'x', ylabel: 'y' }),
        [h.poly(arc, { cls: 'curve' })],
        h.seg(-2, 0, 3, 0, { cls: 'ax' }),
        h.seg(0, 0, 0, hC, { cls: 'ax' }),
        h.seg(cx, 0, 0, hC, { cls: 'hl' }),
        h.rightAngle(0, 0, 'right', { size: 0.24 }),
        h.dot(-2, 0, { label: 'A', dx: -0.3, dy: -0.42 }),
        h.dot(3, 0, { label: 'B', dx: 0.3, dy: -0.42 }),
        h.dot(0, 0, { label: 'D', dx: -0.3, dy: -0.42 }),
        h.dot(cx, 0, { label: 'O', dx: 0.28, dy: -0.42 }),
        h.dot(0, hC, { label: 'C', dx: 0.28, dy: 0.32 }),
        h.text(-1.0, 0.42, '\\(a=2\\)', 'lbl--sm'),
        h.text(1.6, 0.42, '\\(b=3\\)', 'lbl--sm'),
        h.text(0.15, 1.35, '\\(CD=\\sqrt{ab}\\)', 'lbl--sm', 'start'),
        h.text(1.1, 2.6, '\\(OC=\\frac{a+b}{2}\\)', 'lbl--sm', 'start'),
        h.text(0.4, -1.55, '\\(OC\\ge CD\\Rightarrow\\frac{a+b}{2}\\ge\\sqrt{ab}\\)', 'lbl--sm')
      );
    }
  });

  /* ---------- 2. 和定积最大、积定和最小 ---------- */
  add('c3-sum-product', {
    title: '和定积最大、积定和最小',
    caption: '周长相同（\\(a+b\\) 固定）的矩形中，正方形面积最大：\\(a+b=10\\) 时 \\(ab\\le25\\)，只有 \\(a=b=5\\) 时才达到 25。反过来，面积固定时正方形周长最小。',
    viewBox: '-0.6 -6.4 11.6 7.8',
    draw: function (h) {
      return [
        n('rect', { class: 'shape', x: '0.2', y: '-4.2', width: '6', height: '4', rx: '0.05' }),
        h.text('3.2', '-0.5', '\\(a=6\\)', 'lbl--sm'),
        h.text('-0.35', '-2.1', '\\(b=4\\)', 'lbl--sm', 'end'),
        h.text('3.2', '-2.1', '面积 \\(ab=24\\)', 'lbl--sm'),
        h.text('3.2', '-4.9', '周长 20（\\(a+b=10\\)）', 'lbl--sm'),

        n('rect', { class: 'shape--dark', x: '6.6', y: '-5.2', width: '5', height: '5', rx: '0.05' }),
        h.text('9.1', '-0.4', '\\(a=b=5\\)', 'lbl--sm'),
        h.text('9.1', '-2.6', '面积 \\(25\\)', 'lbl--sm'),

        h.text('0.2', '-5.9', '和定积最大：\\(ab\\le\\left(\\frac{a+b}{2}\\right)^{2}\\)', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 3. “1”的代换 ---------- */
  add('c3-one-substitution', {
    title: '“1”的代换：把条件乘进去',
    caption: '已知 \\(x&gt;0,y&gt;0\\) 且 \\(x+y=1\\)，求 \\(\\frac{2}{x}+\\frac{1}{y}\\) 的最小值。把“1”替换成 \\(x+y\\) 后展开，再用基本不等式。',
    viewBox: '-3.7 -3.4 7.4 6.8',
    draw: function (h) {
      return [
        h.text('-3.3', '2.9', '① 条件：\\(x&gt;0,\\ y&gt;0,\\ x+y=1\\)', 'lbl--sm', 'start'),
        h.text('-3.3', '1.9', '② 代换：\\(\\frac{2}{x}+\\frac{1}{y}=(x+y)\\left(\\frac{2}{x}+\\frac{1}{y}\\right)\\)', 'lbl--sm', 'start'),
        h.text('-3.3', '0.9', '③ 展开：\\(=3+\\frac{2y}{x}+\\frac{x}{y}\\ge3+2\\sqrt{2}\\)', 'lbl--sm', 'start'),
        h.text('-3.3', '-0.1', '④ 取等：\\(\\frac{2y}{x}=\\frac{x}{y}\\iff x=\\sqrt{2}y\\)', 'lbl--sm', 'start'),
        h.text('-3.3', '-1.1', '⑤ 联立：\\(x=2-\\sqrt{2},\\ y=\\sqrt{2}-1\\)', 'lbl--sm', 'start'),
        h.text('-3.3', '-2.1', '⑥ 结论：最小值 \\(3+2\\sqrt{2}\\approx5.83\\)', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 4. 两类高频错误（左右两栏，加宽行距） ---------- */
  add('c3-mistake-equal', {
    title: '两类高频错误：取等条件落空与非正值',
    caption: '左：\\(x+\\frac{1}{x}\\ge2\\) 的等号要求 \\(x=1\\)，在 \\(x\\ge2\\) 上取不到，故“最小值 2”是错的，正确为 \\(f(2)=2.5\\)。右：\\(y=-2x+\\frac{1}{x}\\) 中两项一正一负，不能直接用基本不等式，应先换元 \\(t=-x&gt;0\\)。',
    viewBox: '-8.4 -4.6 16.8 9.2',
    draw: function (h) {
      return [
        /* 左栏标题 */
        h.text('-8.0', '4.0', '错误一：等号取不到（\\(x\\ge2\\)）', 'lbl', 'start'),
        /* 数轴（左栏内） */
        n('line', { class: 'ax', x1: '-7.4', y1: '2.6', x2: '-0.6', y2: '2.6' }),
        n('path', { class: 'ax', d: 'M-0.6 2.6 L-1.05 2.78 M-0.6 2.6 L-1.05 2.42', fill: 'none' }),
        n('rect', { class: 'fill-soft', x: '-3.2', y: '2.32', width: '2.6', height: '0.56' }),
        n('circle', { class: 'pt', cx: '-5.2', cy: '2.6', r: '0.1' }),
        n('circle', { class: 'pt--solid', cx: '-3.2', cy: '2.6', r: '0.1' }),
        h.text('-5.2', '3.15', '\\(x=1\\)', 'lbl--sm'),
        h.text('-3.2', '3.15', '\\(x=2\\)', 'lbl--sm'),
        h.text('-7.2', '1.8', '研究范围 \\(x\\ge2\\)（阴影）', 'lbl--sm', 'start'),
        h.text('-8.0', '0.85', '误：最小值为 2', 'lbl--sm', 'start'),
        h.text('-8.0', '-0.05', '正：\\(f(x)=x+\\frac{1}{x}\\) 递增，', 'lbl--sm', 'start'),
        h.text('-8.0', '-0.95', '故最小 \\(f(2)=\\frac{5}{2}\\)', 'lbl--sm', 'start'),

        /* 分隔线 */
        n('line', { class: 'hl', x1: '-0.05', y1: '4.3', x2: '-0.05', y2: '-4.2' }),

        /* 右栏 */
        h.text('0.3', '4.0', '错误二：“一正”失效（\\(x&gt;0\\)）', 'lbl', 'start'),
        h.text('0.3', '3.05', '\\(y=-2x+\\frac{1}{x}\\)：一正一负', 'lbl--sm', 'start'),
        h.text('0.3', '2.15', '误：\\(\\ge-2\\sqrt{2}\\)', 'lbl--sm', 'start'),
        h.text('0.3', '1.25', '正：设 \\(t=-x&gt;0\\)，', 'lbl--sm', 'start'),
        h.text('0.3', '0.35', '则 \\(y=-(2t+\\frac{1}{t})\\)，', 'lbl--sm', 'start'),
        h.text('0.3', '-0.55', '由 \\(2t+\\frac{1}{t}\\ge2\\sqrt{2}\\) 得', 'lbl--sm', 'start'),
        h.text('0.3', '-1.45', '\\(y\\le-2\\sqrt{2}\\)（最大值）', 'lbl--sm', 'start')
      ];
    }
  });
})();
