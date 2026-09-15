/*!
 * fig-2.js —— 第 2 章「一元二次不等式」简图定义
 * 图 id：c2-parabola-delta、c2-three-cases、c2-solution-read、c2-rational-sign
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 1. 抛物线与判别式 ---------- */
  add('c2-parabola-delta', {
    title: '抛物线 \\(y=x^{2}-x-6\\) 与判别式',
    caption: '\\(\\Delta=25&gt;0\\)，抛物线与 \\(x\\) 轴交于 \\((-2,0)\\)、\\((3,0)\\) 两点；在 \\(x\\) 轴下方的部分对应 \\(y&lt;0\\)，即 \\(x^{2}-x-6&lt;0\\) 的解集 \\((-2,3)\\)。',
    coord: { x: [-4, 5.2], y: [-8, 8], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: true }),
        [h.fn(function (x) { return x * x - x - 6; })],
        h.seg(-2, 0, 3, 0, { cls: 'ax' }),
        h.dot(-2, 0, { label: '(-2,0)', dy: -0.8 }),
        h.dot(3, 0, { label: '(3,0)', dy: -0.8 }),
        h.dot(0.5, -6.25, { label: '顶点(0.5,-6.25)', dy: -0.9 }),
        h.vline(0.5, { from: -6.25, to: 0 }),
        h.text(3.8, 6.4, '\\(y=x^{2}-x-6\\)', 'lbl--sm'),
        h.text(-3.3, -4.2, '\\(\\Delta&gt;0\\)：两交点', 'lbl--sm')
      );
    }
  });

  /* ---------- 2. 判别式的三种情形 ---------- */
  add('c2-three-cases', {
    title: '\\(\\Delta&gt;0\\)、\\(\\Delta=0\\)、\\(\\Delta&lt;0\\) 三种情形',
    caption: '自左至右：两交点、一个交点（顶点落在 \\(x\\) 轴上）、无交点。这三张图就是 \\(a&gt;0\\) 时“大于取两边、小于取中间、\\(\\Delta&lt;0\\) 时恒正”的全部依据。',
    coord: { x: [-3.3, 3.3], y: [-2.7, 4.3], grid: 1, pad: 0.25 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        /* Δ>0：y=x²-2.5 */
        [h.fn(function (x) { return x * x - 2.5; }, { cls: 'curve--soft' })],
        h.dot(-Math.sqrt(2.5), 0, { solid: true }),
        h.dot(Math.sqrt(2.5), 0, { solid: true }),
        h.text('0', '4.0', '\\(\\Delta&gt;0\\)', 'lbl'),
        /* Δ=0：y=x² */
        [h.fn(function (x) { return x * x; })],
        h.dot(0, 0, { solid: true }),
        h.text('0', '-2.0', '\\(\\Delta=0\\)', 'lbl'),
        h.text('2.1', '3.4', '\\(y=x^{2}\\)', 'lbl--sm'),
        h.text('-2.7', '3.4', '\\(y=x^{2}-2.5\\)', 'lbl--sm')
      );
    }
  });

  /* ---------- 3. 如何“读”出解集 ---------- */
  add('c2-solution-read', {
    title: '在图像上读解集（“大于取两边、小于取中间”）',
    caption: '抛物线 \\(y=x^{2}-x-2\\) 与 \\(x\\) 轴交于 \\((-1,0)\\)、\\((2,0)\\)。图像在 \\(x\\) 轴上方的部分：\\(x&lt;-1\\) 或 \\(x&gt;2\\)，对应 \\(x^{2}-x-2&gt;0\\) 的解集；图像在 \\(x\\) 轴下方的部分：\\(-1&lt;x&lt;2\\)，对应 \\(x^{2}-x-2&lt;0\\) 的解集。',
    coord: { x: [-3, 4], y: [-3.5, 5], grid: 1, pad: 0.35 },
    draw: function (h) {
      return [].concat(
        h.region([[-1, 0], [2, 0], [2, 2], [0.5, -2.25], [-1, 2]]),
        h.axes({ origin: true, ticks: true }),
        [h.fn(function (x) { return x * x - x - 2; })],
        h.dot(-1, 0, { label: '-1', dy: -0.7 }),
        h.dot(2, 0, { label: '2', dy: -0.7 }),
        h.text(-2.3, 3.4, '\\(y&gt;0\\)：取两边', 'lbl--sm'),
        h.text(0.5, -1.1, '\\(y&lt;0\\)', 'lbl--sm')
      );
    }
  });

  /* ---------- 4. 分式不等式的符号分析 ---------- */
  add('c2-rational-sign', {
    title: '分式不等式的符号表与穿根法',
    caption: '解 \\(\\frac{x-3}{x+1}\\le0\\)：分子 \\(x-3\\) 在 \\(3\\) 处变号，分母 \\(x+1\\) 在 \\(-1\\) 处变号（且 \\(x\\ne-1\\)）。两处都是一次因式，符号各变一次，故从左到右依次为 \\(+\,-\,-\\)，满足“\\(\\le0\\)”的是 \\((-1,3]\\)。',
    viewBox: '-4.6 -3.0 9.2 6.0',
    draw: function (h) {
      return [
        n('line', { class: 'ax', x1: '-4', y1: '0', x2: '4', y2: '0' }),
        n('path', { class: 'ax', d: 'M4 0 L3.6 0.16 M4 0 L3.6 -0.16', fill: 'none' }),
        n('circle', { class: 'pt', cx: '-1', cy: '0', r: '0.11' }),
        n('circle', { class: 'pt--solid', cx: '3', cy: '0', r: '0.11' }),
        h.text('-1', '-0.42', '-1', 'lbl--sm'),
        h.text('3', '-0.42', '3', 'lbl--sm'),
        n('path', { class: 'ax', d: 'M-1 0.55 C -0.4 -0.5, 0.4 -2.3, 2.2 -2.3' }),
        n('path', { class: 'ax', d: 'M3 -2.3 C 3.3 -0.6, 3.5 0.3, 3.7 0.55' }),
        h.text('-3.1', '0.95', '\\(+\\)', 'lbl--sm'),
        h.text('0.6', '1.1', '\\(-\\)', 'lbl--sm'),
        h.text('3.9', '0.95', '\\(+\\)', 'lbl--sm'),
        h.text('-2.4', '-1.5', '\\(x+1&lt;0\\)', 'lbl--sm'),
        h.text('1.0', '-1.5', '\\(x+1&gt;0,\\ x-3&lt;0\\)', 'lbl--sm'),
        h.text('3.3', '-1.5', '\\(x-3&gt;0\\)', 'lbl--sm'),
        h.text('0', '-2.6', '解集：\\((-1,3]\\)（\\(-1\\) 处空心，\\(3\\) 处实心）', 'lbl--sm')
      ];
    }
  });
})();
