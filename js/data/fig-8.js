/*!
 * fig-8.js —— 第 8 章「三角函数」简图
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* 图 1：单位圆与四个象限的符号规律 */
  add('c8-unit-circle-signs', {
    title: '单位圆与三角函数值的符号',
    caption: '把角的终边所在象限与三种函数值的正负对应起来：Ⅰ 全正、Ⅱ 只有 sin 正、Ⅲ 只有 tan 正、Ⅳ 只有 cos 正，口诀是“一全正、二正弦、三正切、四余弦”。',
    viewBox: '-2.05 -2.2 6.4 4.4',
    draw: function (h) {
      return [
        n('circle', { class: 'shape', cx: '0', cy: '0', r: '1.45' }),
        n('path', { class: 'ax', d: 'M-1.72 0 L1.78 0', fill: 'none' }),
        n('path', { class: 'ax', d: 'M0 1.72 L0 -1.72', fill: 'none' }),
        n('path', { class: 'ax', d: 'M1.78 0 L1.56 0.16 M1.78 0 L1.56 -0.16', fill: 'none' }),
        n('path', { class: 'ax', d: 'M0 -1.72 L0.16 -1.5 M0 -1.72 L-0.16 -1.5', fill: 'none' }),
        n('line', { class: 'hl', x1: '0', y1: '0', x2: '1.025', y2: '-0.735' }),
        n('line', { class: 'hl', x1: '1.025', y1: '-0.735', x2: '1.025', y2: '0' }),
        n('line', { class: 'hl', x1: '1.025', y1: '-0.735', x2: '0', y2: '-0.735' }),
        n('circle', { class: 'pt pt--solid', cx: '1.025', cy: '-0.735', r: '0.075' }),
        h.text(-0.2, -0.24, 'O', 'lbl--sm'),
        h.text(1.15, 1.15, 'Ⅰ', 'lbl'),
        h.text(-1.15, 1.15, 'Ⅱ', 'lbl'),
        h.text(-1.15, -1.15, 'Ⅲ', 'lbl'),
        h.text(1.15, -1.15, 'Ⅳ', 'lbl'),
        h.text(0.36, 0.16, 'α', 'lbl--sm'),
        h.text(-1.65, 1.9, 'P(cos α, sin α)', 'lbl--sm', 'start'),
        h.text(1.42, 2.02, 'sin', 'lbl--sm', 'end'),
        h.text(1.42, 1.72, 'cos', 'lbl--sm', 'end'),
        h.text(1.42, 1.42, 'tan', 'lbl--sm', 'end'),
        n('line', { class: 'grid', x1: '1.5', y1: '2.06', x2: '1.5', y2: '-1.5' }),
        n('line', { class: 'grid', x1: '2.45', y1: '2.06', x2: '2.45', y2: '-1.5' }),
        n('line', { class: 'grid', x1: '3.4', y1: '2.06', x2: '3.4', y2: '-1.5' }),
        n('line', { class: 'grid', x1: '1.5', y1: '2.06', x2: '4.35', y2: '2.06' }),
        n('line', { class: 'grid', x1: '1.5', y1: '1.86', x2: '4.35', y2: '1.86' }),
        n('line', { class: 'grid', x1: '1.5', y1: '1.16', x2: '4.35', y2: '1.16' }),
        n('line', { class: 'grid', x1: '1.5', y1: '0.46', x2: '4.35', y2: '0.46' }),
        n('line', { class: 'grid', x1: '1.5', y1: '-0.24', x2: '4.35', y2: '-0.24' }),
        n('line', { class: 'grid', x1: '1.5', y1: '-0.94', x2: '4.35', y2: '-0.94' }),
        n('line', { class: 'grid', x1: '1.5', y1: '-1.5', x2: '4.35', y2: '-1.5' }),
        h.text(1.975, 1.51, '+', 'lbl'),
        h.text(2.925, 1.51, '+', 'lbl'),
        h.text(3.875, 1.51, '−', 'lbl'),
        h.text(1.975, 0.11, '−', 'lbl'),
        h.text(2.925, 0.11, '−', 'lbl'),
        h.text(3.875, 0.11, '+', 'lbl'),
        h.text(1.975, -1.22, '+', 'lbl'),
        h.text(2.925, -1.22, '−', 'lbl'),
        h.text(3.875, -1.22, '+', 'lbl'),
        h.text(1.975, 1.96, 'Ⅰ', 'lbl--sm'),
        h.text(2.925, 1.96, 'Ⅱ', 'lbl--sm'),
        h.text(3.875, 1.96, 'Ⅲ', 'lbl--sm'),
        h.text(4.35, 1.96, 'Ⅳ', 'lbl--sm')
      ];
    }
  });

  /* 图 2：正弦曲线与余弦曲线（一个周期） */
  add('c8-sin-cos-graph', {
    title: '正弦曲线与余弦曲线',
    caption: '两曲线形状完全相同，只是相位相差 \\(\\frac{\\pi}{2}\\)：把正弦曲线向左平移 \\(\\frac{\\pi}{2}\\) 就得到余弦曲线。',
    coord: { x: [-0.7, 7.0], y: [-1.75, 2.5], grid: Math.PI / 2, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [
          h.fn(function (x) { return Math.sin(x); }),
          h.fn(function (x) { return Math.cos(x); }, {})
        ],
        h.hline(1, { cls: 'hl' }),
        h.hline(-1, { cls: 'hl' }),
        h.dot(Math.PI / 2, 1, { label: 'π/2', dy: 0.4 }),
        h.dot(Math.PI, -1, { label: 'π', dy: -0.4 }),
        h.dot(3 * Math.PI / 2, 0, { label: '3π/2', dy: -0.35 }),
        h.dot(2 * Math.PI, 1, { label: '2π', dy: 0.4, dx: -0.1 }),
        h.text(4.25, 1.75, 'y=sin x', 'lbl--sm'),
        h.text(5.95, -1.45, 'y=cos x', 'lbl--sm'),
        h.text(0.32, 2.3, 'y=1', 'lbl--sm')
      );
    }
  });

  /* 图 3：正切曲线与渐近线 */
  add('c8-tan-graph', {
    title: 'y=tan x 的图像与渐近线',
    caption: '正切曲线被直线 \\(x=\\frac{\\pi}{2}+k\\pi\\) 隔成一支一支，周期为 \\(\\pi\\)；每个分支都单调递增，值域为 R。',
    coord: { x: [-1.9, 4.8], y: [-3.4, 3.4], grid: Math.PI / 2, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [
          h.vline(-Math.PI / 2, { cls: 'hl' }),
          h.vline(Math.PI / 2, { cls: 'hl' }),
          h.vline(3 * Math.PI / 2, { cls: 'hl' }),
          h.fn(function (x) { return Math.tan(x); }, { from: -1.4, to: 1.4 }),
          h.fn(function (x) { return Math.tan(x); }, { from: 1.75, to: 4.75 })
        ],
        h.dot(0, 0, {}),
        h.dot(Math.PI / 4, 1, { label: 'π/4', dy: 0.4 }),
        h.dot(Math.PI, 0, { label: 'π', dy: -0.35 }),
        h.text(-1.57, 2.95, 'x=-π/2', 'lbl--sm'),
        h.text(1.57, 2.95, 'x=π/2', 'lbl--sm'),
        h.text(4.55, 2.95, 'x=3π/2', 'lbl--sm', 'end')
      );
    }
  });

  /* 图 4：y=A sin(ωx+φ)（以 y=2sin(2x+π/3) 为例） */
  add('c8-y-asin', {
    title: 'y=A sin(ωx+φ) 的振幅、周期与相位',
    caption: '以 \\(y=2\\sin\\left(2x+\\frac{\\pi}{3}\\right)\\) 为例：振幅 \\(A=2\\)（波峰到平衡位置的高度），周期 \\(T=\\frac{2\\pi}{\\omega}=\\pi\\)（相邻两个波峰的距离），初相为 \\(\\frac{\\pi}{3}\\)。',
    coord: { x: [-1.2, 4.8], y: [-2.7, 3.0], grid: Math.PI / 2, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [h.fn(function (x) { return 2 * Math.sin(2 * x + Math.PI / 3); }, { from: -1.1, to: 4.7 })],
        h.hline(2, { cls: 'hl' }),
        h.hline(-2, { cls: 'hl' }),
        h.vline(-Math.PI / 6, { cls: 'hl' }),
        h.dot(7 * Math.PI / 12, 2, { label: '7π/12', dy: 0.4 }),
        h.dot(Math.PI / 12, 0, { label: 'π/12', dy: -0.35 }),
        h.dot(-Math.PI / 6, 0, { label: '-π/6', dy: -0.35 }),
        h.dot(Math.PI / 2, 0, { label: 'π/2', dy: 0.4 }),
        h.seg(-Math.PI / 6, 0, -Math.PI / 6, 2),
        h.text(-0.5, 1.1, 'A=2', 'lbl--sm'),
        h.text(2.6, 2.3, 'y=2sin(2x+π/3)', 'lbl--sm')
      );
    }
  });

  /* 图 5：诱导公式的对称性（单位圆上关于坐标轴与原点对称的点） */
  add('c8-induction', {
    title: '诱导公式的对称来源',
    caption: '终边关于 \\(y\\) 轴对称、关于原点对称、关于 \\(x\\) 轴对称，就分别得到 \\(\\pi-\\alpha\\)、\\(\\pi+\\alpha\\)、\\(-\\alpha\\) 的三角函数值，这就是“奇变偶不变，符号看象限”的几何依据。',
    coord: { x: [-1.6, 1.7], y: [-1.6, 1.7], grid: 1, pad: 0.35 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [h.fn(function (x) { return Math.sqrt(Math.max(0, 1 - x * x)); }, { from: -1, to: 1, cls: 'curve--soft' })],
        [
          h.seg(0, 0, 0.866, 0.5),
          h.seg(0, 0, -0.866, 0.5),
          h.seg(0, 0, -0.866, -0.5),
          h.dot(0.866, 0.5, { dx: 0.1, dy: -0.28 }),
          h.dot(-0.866, 0.5, { dx: -0.1, dy: -0.28 }),
          h.dot(-0.866, -0.5, { dx: -0.1, dy: -0.28 }),
          h.text(0.866, 0.5, 'P', 'lbl--sm'),
          h.text(-0.9, 0.22, 'P₁', 'lbl--sm'),
          h.text(-0.9, -0.72, 'P₂', 'lbl--sm'),
          h.text(0.3, 0.08, 'α', 'lbl--sm'),
          h.text(-0.3, 0.1, 'π-α', 'lbl--sm'),
          h.text(-0.42, -0.16, 'π+α', 'lbl--sm')
        ]
      );
    }
  });
})();
