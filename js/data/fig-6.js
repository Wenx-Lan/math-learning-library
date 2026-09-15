/*!
 * fig-6.js —— 第 6 章「指数及指数函数」简图
 * 图 id：c6-exp-graph、c6-exp-rules、c6-growth-model
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------------------------------------------------------------
     图 1：指数函数 y=a^x（a>1 与 0<a<1）的图像
       a>1 时递增，0<a<1 时递减；两者都过定点 (0,1)，都以 x 轴为渐近线，
       且图像都在 x 轴上方（值域 (0,+∞)）。
     --------------------------------------------------------------- */
  add('c6-exp-graph', {
    title: '指数函数的图像与性质',
    caption: '两条曲线都过定点 \\((0,1)\\)，都在 \\(x\\) 轴上方并以 \\(x\\) 轴为渐近线；底数 \\(a&gt;1\\) 时单调递增，\\(0&lt;a&lt;1\\) 时单调递减。',
    coord: { x: [-3.1, 3.1], y: [-1, 8.6], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.hline(1, { from: -3.1, to: 3.1 }),
        h.fn(function (x) { return Math.pow(2, x); }, { from: -3.1, to: 3.1 }),
        h.fn(function (x) { return Math.pow(0.5, x); }, { from: -3.1, to: 3.1, cls: 'curve--soft' }),
        h.dot(0, 1, { label: '(0,1)', dx: 0.4, dy: 0.34, solid: true }),
        h.text(2.4, 7.1, 'y=2^{x}', 'lbl--sm', 'start'),
        h.text(-2.95, 6.4, 'y=(\\frac{1}{2})^{x}', 'lbl--sm', 'start'),
        h.text(2.55, 0.42, 'y=1', 'lbl--sm', 'start'),
        h.text(-2.1, -0.5, 'x 轴是渐近线', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------------------------------------------------------------
     图 2：a^m·a^n=a^{m+n} 的可视化（取 a=2，m=1，n=2）
       三个条形等宽（底相同），高度分别为 2、4、8，
       故面积（条形个数）满足 2×4=8，即 2^1·2^2=2^{1+2}=2^3。
     --------------------------------------------------------------- */
  add('c6-exp-rules', {
    title: '同底数幂相乘：指数相加',
    caption: '取 \\(a=2\\)，条形宽度都是 1 个单位，面积分别为 \\(2\\)、\\(4\\)、\\(2\\times4=8\\)，可见 \\(a^{m}\\cdot a^{n}=a^{m+n}\\)。',
    coord: { x: [-0.1, 3.3], y: [-1.5, 8.8], grid: 0, pad: 0.3 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: false, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.poly([[0, 0], [0, 2], [1, 2], [1, 0]], { close: true, cls: 'shape' }),
        h.poly([[1, 0], [1, 4], [2, 4], [2, 0]], { close: true, cls: 'shape--dark' }),
        h.poly([[2, 0], [2, 8], [3, 8], [3, 0]], { close: true, cls: 'shape' }),
        h.text(0.5, 1, 'a^{m}', 'lbl'),
        h.text(1.5, 2, 'a^{n}', 'lbl'),
        h.text(2.5, 4, 'a^{m+n}', 'lbl'),
        h.text(0.5, -0.62, '2^{1}=2', 'lbl--sm'),
        h.text(1.5, -0.62, '2^{2}=4', 'lbl--sm'),
        h.text(2.5, -0.62, '2^{3}=8', 'lbl--sm'),
        h.poly([[0.5, 2], [1.5, 4], [2.5, 8]], { cls: 'curve--soft' }),
        h.text(1.5, 8.55, '2\\times4=8', 'lbl--sm')
      ];
    }
  });

  /* ---------------------------------------------------------------
     图 3：指数增长模型 —— 某种细菌每小时数量变为原来的 2 倍
       N(t)=2^t：1 小时后 2 个，2 小时后 4 个，5 小时后 32 个。
     --------------------------------------------------------------- */
  add('c6-growth-model', {
    title: '指数增长模型 N(t)=2^{t}',
    caption: '“每小时变为原来的 2 倍”即 \\(N(t)=2^{t}\\)：自变量每增加 1，函数值就乘 2，图形越来越陡，这正是指数增长的特征。',
    coord: { x: [-0.6, 5.6], y: [-2.5, 35], grid: 5, pad: 0.3 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 't', ylabel: 'N' }),
        h.hline(32, { from: 0, to: 5 }),
        h.vline(5, { from: 0, to: 32 }),
        h.fn(function (t) { return Math.pow(2, t); }, { from: 0, to: 5.2 }),
        h.dot(0, 1, { label: '1', dx: -0.3, dy: -0.4 }),
        h.dot(1, 2, { label: '2', dx: 0.06, dy: -1.6 }),
        h.dot(2, 4, { label: '4', dx: 0.06, dy: -1.8 }),
        h.dot(3, 8, { label: '8', dx: 0.06, dy: -2.1 }),
        h.dot(4, 16, { label: '16', dx: 0.08, dy: -2.4 }),
        h.dot(5, 32, { label: '(5,32)', dx: -0.5, dy: -2.6 }),
        h.text(2.4, 22, '每小时翻一倍', 'lbl--sm', 'start')
      ];
    }
  });
})();
