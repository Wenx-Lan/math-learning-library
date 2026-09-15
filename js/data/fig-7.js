/*!
 * fig-7.js —— 第 7 章「对数及对数函数」简图
 * 图形定义：DSHFig.add(id, { title, caption, coord | viewBox, draw })
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* 图 1：对数函数 y=log_a x 的图像（以 a=2 为例） */
  add('c7-log-graph', {
    title: '对数函数 y=log_a x 的图像',
    caption: '图像恒过定点 (1,0)；以 y 轴为渐近线，定义域为 (0,+∞)。',
    coord: { x: [-0.8, 7.6], y: [-1.9, 2.5], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [h.vline(0, { from: -1.9, to: 2.5, cls: 'hl' })],
        [h.fn(function (x) { return Math.log(x) / Math.LN2; }, { from: 0.06, to: 7.6 })],
        h.hline(1, { from: 0, to: 2.2, cls: 'hl' }),
        h.dot(1, 0, { label: '(1,0)', dy: -0.35 }),
        h.dot(2, 1, { label: '(2,1)', dy: 0.45 }),
        h.dot(4, 2, { label: '(4,2)', dy: 0.45 }),
        h.text(5.0, 2.0, 'y=log_2 x', 'lbl--sm'),
        h.text(0.28, 2.15, 'x=0', 'lbl--sm')
      );
    }
  });

  /* 图 2：指数函数与对数函数关于直线 y=x 对称 */
  add('c7-inverse-symmetry', {
    title: 'y=a^x 与 y=log_a x 关于 y=x 对称',
    caption: '点 P(m,n) 在指数函数图像上，则 P′(n,m) 必在对数函数图像上，两图像关于直线 y=x 对称。',
    coord: { x: [-2.2, 4.2], y: [-2.2, 4.2], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [
          h.fn(function (x) { return x; }, { cls: 'hl' }),
          h.fn(function (x) { return Math.pow(2, x); }, { from: -2.2, to: 2.05 }),
          h.fn(function (x) { return Math.log(x) / Math.LN2; }, { from: 0.12, to: 4.2 })
        ],
        h.vline(1, { from: 0, to: 2, cls: 'hl' }),
        h.hline(2, { from: 0, to: 1, cls: 'hl' }),
        h.vline(2, { from: 0, to: 1, cls: 'hl' }),
        h.hline(1, { from: 0, to: 2, cls: 'hl' }),
        h.dot(1, 2, { label: 'P(1,2)', dx: 0.15, dy: 0.35 }),
        h.dot(2, 1, { label: "P'(2,1)", dx: 0.2, dy: -0.35 }),
        h.dot(0, 1, { dx: -0.25, dy: 0.22 }),
        h.dot(1, 0, { dx: 0, dy: -0.32 }),
        h.text(2.75, 3.35, 'y=2^x', 'lbl--sm'),
        h.text(2.7, 1.7, 'y=log_2 x', 'lbl--sm'),
        h.text(3.45, 2.9, 'y=x', 'lbl--sm')
      );
    }
  });

  /* 图 3：不同底数的对数函数比较（a>1 时底大图低） */
  add('c7-log-compare', {
    title: '底数对对数函数图像的影响',
    caption: '当 a>1 时，在 x>1 范围内“底数越大，图像越低”：取定同一高度 y=0.5，对应的横坐标依次为 1.414、1.732、3.162。',
    coord: { x: [-0.6, 6.2], y: [-1.2, 2.2], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [
          h.fn(function (x) { return Math.log(x) / Math.LN2; }, { from: 0.09, to: 6.2 }),
          h.fn(function (x) { return Math.log(x) / Math.log(3); }, { from: 0.09, to: 6.2 }),
          h.fn(function (x) { return Math.log(x) / Math.log(10); }, { from: 0.09, to: 6.2 })
        ],
        h.hline(0.5, { from: 0, to: 5.6, cls: 'hl' }),
        h.vline(1, { from: -1.2, to: 2.2, cls: 'hl' }),
        h.dot(2, 1, { dy: 0.4 }),
        h.dot(1.414, 0.5, { dx: 0.1, dy: 0.32 }),
        h.dot(1.732, 0.5, { dx: 0.05, dy: 0.32 }),
        h.dot(3.162, 0.5, { dx: 0.1, dy: 0.32 }),
        h.dot(1, 0, { dy: -0.35 }),
        h.text(5.0, 1.6, 'y=log_2 x', 'lbl--sm'),
        h.text(5.75, 0.95, 'y=log_3 x', 'lbl--sm'),
        h.text(5.35, 0.32, 'y=log_{10} x', 'lbl--sm')
      );
    }
  });
})();
