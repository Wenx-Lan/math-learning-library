/*!
 * fig-3.js —— 第 3 章「基本不等式」简图定义
 * 图 id：c3-semicircle-proof、c3-sum-product、c3-one-substitution、c3-mistake-equal
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 1. 半圆中的几何证明 ---------- */
  add('c3-semicircle-proof', {
    title: '半圆中 \\(\\frac{a+b}{2}\\ge\\sqrt{ab}\\) 的几何证明',
    caption: '以 \\(a+b\\) 为直径作半圆，圆心 \\(O\\) 到端点距离为半径 \\(\\frac{a+b}{2}\\)；在分点 \\(D\\) 处作垂线与半圆交于 \\(C\\)，则 \\(CD=\\sqrt{ab}\\)。半径不小于垂线段（直角三角形中斜边最长，且 \\(OC\\) 就是半径），故 \\(\\frac{a+b}{2}\\ge\\sqrt{ab}\\)；当且仅当 \\(D\\) 与 \\(O\\) 重合（即 \\(a=b\\)）时取等号。',
    coord: { x: [-2.4, 3.4], y: [-1.7, 3.7], grid: 1, pad: 0.3 },
    draw: function (h) {
      /* 半圆：圆心 O(0,0)，半径 2.5，取自 A(-2.5,0) 到 B(2.5,0) */
      var arc = [], i, t;
      for (i = 0; i <= 60; i++) {
        t = Math.PI - Math.PI * i / 60;
        arc.push([2.5 * Math.cos(t), 2.5 * Math.sin(t)]);
      }
      return [].concat(
        h.axes({ origin: true, ticks: true }),
        [h.poly(arc, { cls: 'curve' })],
        /* 分点取 a=2、b=3：A(-2,0)、D(0,0)、B(3,0) */
        h.seg(-2, 0, 0, 0, { cls: 'ax' }),
        h.seg(0, 0, 3, 0, { cls: 'ax' }),
        /* 垂线段：D 处的高 */
        h.seg(0, 0, 0, Math.sqrt(6), { cls: 'ax' }),
        h.rightAngle(0, 0, 'right', { size: 0.24 }),
        h.dot(0, Math.sqrt(6), { label: 'C', dx: 0.22, dy: 0.3 }),
        h.dot(0, 0, { label: 'D', dx: -0.3, dy: -0.35 }),
        h.dot(0, 0, { solid: true }),
        h.text(-2.25, 0.32, 'A', 'lbl'),
        h.text(3.2, 0.32, 'B', 'lbl'),
        h.text(0.32, 0.38, 'O', 'lbl'),
        h.text(1.35, 0.42, '\\(b\\)', 'lbl--sm'),
        h.text(1.15, -0.55, '\\(b=3\\)', 'lbl--sm'),
        h.text(-1.3, 0.42, '\\(a\\)', 'lbl--sm'),
        h.text(-1.35, -0.55, '\\(a=2\\)', 'lbl--sm'),
        h.text(0.28, 1.5, '\\(CD=\\sqrt{ab}\\)', 'lbl--sm', 'start'),
        h.text(1.25, 2.4, '\\(OC=\\frac{a+b}{2}\\)', 'lbl--sm', 'start'),
        h.seg(0, 0, 1.25, 2.165, { cls: 'hl' }),
        h.text(-0.5, -1.35, '\\(OC\\ge CD\\ \\Rightarrow\\ \\frac{a+b}{2}\\ge\\sqrt{ab}\\)', 'lbl--sm')
      );
    }
  });

  /* ---------- 2. 和定积最大、积定和最小 ---------- */
  add('c3-sum-product', {
    title: '和定积最大、积定和最小',
    caption: '周长相同（即 \\(a+b\\) 固定）的矩形中，正方形的面积最大：\\(a+b=10\\) 时矩形面积 \\(ab\\le\\left(\\frac{a+b}{2}\\right)^{2}=25\\)，只有 \\(a=b=5\\) 时面积才达到 25。反过来，面积固定时，正方形的周长最小。',
    viewBox: '-0.6 -6.4 11.2 7.6',
    draw: function (h) {
      return [
        /* 矩形 6×4，面积 24 */
        n('rect', { class: 'shape', x: '0.2', y: '-4.2', width: '6', height: '4', rx: '0.05' }),
        h.text('3.2', '-0.55', '\\(a=6\\)', 'lbl--sm'),
        h.text('-0.35', '-2.1', '\\(b=4\\)', 'lbl--sm', 'end'),
        h.text('3.2', '-2.1', '面积 \\(ab=24\\)', 'lbl--sm'),
        h.text('3.2', '-4.9', '周长 20（\\(a+b=10\\)）', 'lbl--sm'),
        /* 正方形 5×5，面积 25 */
        n('rect', { class: 'shape--dark', x: '6.6', y: '-5.2', width: '5', height: '5', rx: '0.05' }),
        h.text('9.1', '-5.75', '\\(a=b=5\\)', 'lbl--sm'),
        h.text('9.1', '-2.6', '面积 \\(25\\)', 'lbl--sm'),
        h.text('9.1', '-6.05', '', 'lbl--sm'),
        /* 结论 */
        h.text('5.6', '-0.15', '和定积最大：\\(ab\\le\\left(\\frac{a+b}{2}\\right)^{2}\\)', 'lbl')
      ];
    }
  });

  /* ---------- 3. “1”的代换 ---------- */
  add('c3-one-substitution', {
    title: '“1”的代换：把条件乘进去',
    caption: '已知 \\(x&gt;0,y&gt;0\\) 且 \\(x+y=1\\)，求 \\(\\frac{2}{x}+\\frac{1}{y}\\) 的最小值。把“1”替换成 \\(x+y\\) 后展开，就能用基本不等式；等号成立的条件是 \\(\\frac{2y}{x}=\\frac{x}{y}\\)，即 \\(x=\\sqrt{2}y\\)，与 \\(x+y=1\\) 联立解得 \\(x=2-\\sqrt{2},\\ y=\\sqrt{2}-1\\)。',
    viewBox: '-3.6 -3.3 7.2 6.6',
    draw: function (h) {
      return [
        h.text('-2.9', '2.7', '① 条件：\\(x&gt;0,\\ y&gt;0,\\ x+y=1\\)', 'lbl--sm', 'start'),
        h.text('-2.9', '1.6', '② 代换：\\(\\frac{2}{x}+\\frac{1}{y}=(x+y)\\left(\\frac{2}{x}+\\frac{1}{y}\\right)\\)', 'lbl--sm', 'start'),
        h.text('-2.9', '0.5', '③ 展开：\\(=3+\\frac{2y}{x}+\\frac{x}{y}\\ge3+2\\sqrt{2}\\)', 'lbl--sm', 'start'),
        h.text('-2.9', '-0.6', '④ 取等：\\(\\frac{2y}{x}=\\frac{x}{y}\\iff x=\\sqrt{2}y\\)', 'lbl--sm', 'start'),
        h.text('-2.9', '-1.7', '⑤ 联立：\\(x=2-\\sqrt{2},\\ y=\\sqrt{2}-1\\)', 'lbl--sm', 'start'),
        h.text('-2.9', '-2.8', '⑥ 结论：最小值 \\(3+2\\sqrt{2}\\approx5.83\\)', 'lbl--sm', 'start'),
        h.seg('-3.0', '2.25', '3.1', '2.25', { cls: 'hl' })
      ];
    }
  });

  /* ---------- 4. 两个高频错误 ---------- */
  add('c3-mistake-equal', {
    title: '两类高频错误：取等条件落空与非正值',
    caption: '左：\\(x+\\frac{1}{x}\\ge2\\) 的等号要求 \\(x=1\\)，在 \\(x\\ge2\\) 上取不到，故“最小值 2”是错的，正确最小值为 \\(f(2)=2.5\\)。右：\\(y=-2x+\\frac{1}{x}\\) 中两项一正一负，\\(\\sqrt{xy}\\) 无意义，不能直接用基本不等式，应先换元 \\(t=-x&gt;0\\) 转化为正数情形。',
    viewBox: '-7.6 -3.4 15.2 6.8',
    draw: function (h) {
      return [
        /* 左图：x≥2 上的取等失败 */
        n('line', { class: 'ax', x1: '-6.6', y1: '0.3', x2: '-0.5', y2: '0.3' }),
        n('path', { class: 'ax', d: 'M-0.5 0.3 L-0.95 0.48 M-0.5 0.3 L-0.95 0.12', fill: 'none' }),
        n('line', { class: 'ax', x1: '-5.6', y1: '2.2', x2: '-5.6', y2: '-2.4' }),
        n('path', { class: 'ax', d: 'M-5.6 -2.4 L-5.42 -1.95 M-5.6 -2.4 L-5.78 -1.95', fill: 'none' }),
        h.text('-5.35', '0.62', '\\(1\\)', 'lbl--sm'),
        h.text('-4.05', '0.62', '\\(2\\)', 'lbl--sm'),
        n('circle', { class: 'pt', cx: '-5.6', cy: '0.3', r: '0.1' }),
        n('circle', { class: 'pt--solid', cx: '-4.05', cy: '0.3', r: '0.1' }),
        n('path', { class: 'shape', d: 'M-4.05 0.3 L-0.7 0.3 L-0.7 -0.5 L-4.05 -0.5 Z' }),
        h.text('-3.9', '1.15', '研究范围 \\(x\\ge2\\)（图中阴影）', 'lbl--sm', 'start'),
        h.text('-3.9', '1.75', '\\(x+\\frac{1}{x}\\ge2\\) 但等号取不到', 'lbl--sm', 'start'),
        h.text('-3.9', '-1.1', '正确：\\(f(x)=x+\\frac{1}{x}\\) 在 \\([2,+\\infty)\\) 上递增，', 'lbl--sm', 'start'),
        h.text('-3.9', '-1.7', '故最小值 \\(f(2)=2+\\frac{1}{2}=\\frac{5}{2}\\)', 'lbl--sm', 'start'),
        h.text('-3.6', '-2.9', '错误：直接写“最小值 2”', 'lbl--sm'),
        /* 分隔线 */
        n('line', { class: 'hl', x1: '0.2', y1: '2.6', x2: '0.2', y2: '-2.8' }),
        /* 右图：非正值不能直接用 */
        n('path', { class: 'shape', d: 'M0.7 2.5 L3.5 2.5 L3.5 1.2 L0.7 1.2 Z' }),
        h.text('2.1', '1.95', '\\(x&gt;0\\) 时 \\(-2x&lt;0\\)', 'lbl--sm'),
        h.text('2.1', '1.5', '“一正”失效', 'lbl--sm'),
        h.text('0.9', '0.7', '\\(y=-2x+\\frac{1}{x}\\ (x&gt;0)\\)', 'lbl', 'start'),
        h.text('0.9', '0.1', '错误：\\(-2x+\\frac{1}{x}\\ge-2\\sqrt{2}\\)', 'lbl--sm', 'start'),
        h.text('0.9', '-0.4', '正确：设 \\(t=-x\\)，则 \\(t&lt;0\\)；', 'lbl--sm', 'start'),
        h.text('0.9', '-1.0', '把式子写成 \\(y=-\\left(2x-\\frac{1}{x}\\right)\\)，', 'lbl--sm', 'start'),
        h.text('0.9', '-1.6', '对 \\(2x+\\frac{1}{-x}\\) 用基本不等式得', 'lbl--sm', 'start'),
        h.text('0.9', '-2.2', '\\(y\\le-2\\sqrt{2}\\)，即最大值 \\(-2\\sqrt{2}\\)', 'lbl--sm', 'start'),
        n('path', { class: 'shape', d: 'M0.7 2.5 L3.5 2.5 L3.5 0.0 L0.7 0.0 Z' }),
        h.text('2.1', '1.75', '\\(x&gt;0\\) 时 \\(-2x&lt;0\\)', 'lbl--sm'),
        h.text('2.1', '0.9', '两项不能直接相乘开方', 'lbl--sm'),
        h.text('2.1', '0.3', '（图中阴影即“一正”失效）', 'lbl--sm')
      ];
    }
  });
})();
