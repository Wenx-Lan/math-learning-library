/*!
 * fig-17.js —— 第 17 章「解析几何」简图
 * 简图 id：c17-ellipse、c17-hyperbola、c17-parabola、c17-focal-chord
 * 说明：本文件所有坐标均为“数学坐标”，即 y 轴向上为正。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 椭圆：定义与焦点性质 ---------- */
  add('c17-ellipse', {
    title: '椭圆的定义与焦点性质',
    caption: '椭圆 \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\)（\\(a&gt;b&gt;0\\)）上任意一点到两个焦点的距离之和恒等于 \\(2a=10\\)。图中点 \\(P(4,3)\\) 满足 \\(|PF_1|+|PF_2|=3\\sqrt2+5\\sqrt2=8\\sqrt2\\)。',
    coord: { x: [-6.4, 6.4], y: [-5.2, 5.2], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.circle(0, 0, 5, { cls: 'curve--soft' }),
        h.fn(function (x) { return 4 * Math.sqrt(Math.max(0, 1 - x * x / 25)); }, { cls: 'curve' }),
        h.fn(function (x) { return -4 * Math.sqrt(Math.max(0, 1 - x * x / 25)); }, { cls: 'curve' }),
        h.seg(-5, 0, 5, 0, { cls: 'hl' }),
        h.dot(-3, 0, { label: 'F1', dx: -0.5, dy: 0.34, labelCls: 'lbl--sm' }),
        h.dot(3, 0, { label: 'F2', dx: 0.5, dy: 0.34, labelCls: 'lbl--sm' }),
        h.dot(4, 3, { label: 'P(4,3)', dx: 1.15, dy: 0.3, labelCls: 'lbl--sm' }),
        h.dot(0, 4, { label: 'B', dx: 0.42, dy: 0.24, labelCls: 'lbl--sm' }),
        h.dot(-5, 0, { label: 'A1', dx: -0.75, dy: -0.45, labelCls: 'lbl--sm' }),
        h.dot(5, 0, { label: 'A2', dx: 0.75, dy: -0.45, labelCls: 'lbl--sm' }),
        h.seg(-3, 0, 4, 3, { cls: 'ax' }),
        h.seg(3, 0, 4, 3, { cls: 'ax' }),
        h.seg(0, 0, 0, 4, { cls: 'hl' }),
        h.seg(3, 0, 0, 4, { cls: 'hl' }),
        h.text(-4.4, 4.3, 'a=5, b=4, c=3, e=0.6', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 双曲线：渐近线与实轴虚轴 ---------- */
  add('c17-hyperbola', {
    title: '双曲线与渐近线',
    caption: '双曲线 \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\) 中 \\(c^2=a^2+b^2\\)，渐近线为 \\(y=\\pm\\frac ba x\\)。图中 \\(a=3\\)、\\(b=2\\)、\\(c=\\sqrt{13}\\)，渐近线斜率为 \\(\\pm\\frac23\\)。',
    coord: { x: [-6.4, 6.4], y: [-4.4, 4.4], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.seg(-6.2, -4.1333, 6.2, 4.1333, { cls: 'curve--soft' }),
        h.seg(-6.2, 4.1333, 6.2, -4.1333, { cls: 'curve--soft' }),
        h.fn(function (x) { return 2 * Math.sqrt(Math.max(0, x * x / 9 - 1)); }, { from: 3, to: 6.2, cls: 'curve' }),
        h.fn(function (x) { return -2 * Math.sqrt(Math.max(0, x * x / 9 - 1)); }, { from: 3, to: 6.2, cls: 'curve' }),
        h.fn(function (x) { return 2 * Math.sqrt(Math.max(0, x * x / 9 - 1)); }, { from: -6.2, to: -3, cls: 'curve' }),
        h.fn(function (x) { return -2 * Math.sqrt(Math.max(0, x * x / 9 - 1)); }, { from: -6.2, to: -3, cls: 'curve' }),
        h.seg(-3, 0, 3, 0, { cls: 'ax' }),
        h.seg(0, -2, 0, 2, { cls: 'ax' }),
        h.dot(-3, 0, { label: 'A1', dx: -0.75, dy: -0.5, labelCls: 'lbl--sm' }),
        h.dot(3, 0, { label: 'A2', dx: 0.75, dy: -0.5, labelCls: 'lbl--sm' }),
        h.dot(0, 2, { label: 'B1', dx: 0.55, dy: 0.24, labelCls: 'lbl--sm' }),
        h.dot(0, -2, { label: 'B2', dx: 0.55, dy: -0.3, labelCls: 'lbl--sm' }),
        h.dot(3.6056, 0, { label: 'F2', dx: 0.6, dy: 0.34, labelCls: 'lbl--sm' }),
        h.seg(0, 0, 3, 2, { cls: 'hl' }),
        h.text(3.7, 3.4, 'y=(2/3)x', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 抛物线：焦点与准线 ---------- */
  add('c17-parabola', {
    title: '抛物线的焦点与准线',
    caption: '抛物线 \\(y^2=2px\\) 的焦点为 \\(F\\left(\\frac p2,0\\right)\\)，准线为 \\(x=-\\frac p2\\)。图中 \\(p=2\\)，故 \\(F(1,0)\\)、准线为 \\(x=-1\\)，且 \\(|PF|=|PH|\\)。',
    coord: { x: [-2.2, 4.4], y: [-4.4, 4.4], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return 2 * Math.sqrt(Math.max(0, x)); }, { from: 0, to: 4.3, cls: 'curve' }),
        h.fn(function (x) { return -2 * Math.sqrt(Math.max(0, x)); }, { from: 0, to: 4.3, cls: 'curve' }),
        h.vline(-1, { from: -4.2, to: 4.2, cls: 'hl' }),
        h.text(-1, 4.35, '准线 x=-1', 'lbl--sm'),
        h.dot(1, 0, { label: 'F(1,0)', dx: -1.25, dy: -0.4, labelCls: 'lbl--sm' }),
        h.dot(1, 2, { label: 'P', dx: 0.42, dy: 0.14, labelCls: 'lbl--sm' }),
        h.dot(-1, 2, { label: 'H', dx: -0.45, dy: 0.14, labelCls: 'lbl--sm' }),
        h.seg(1, 0, 1, 2, { cls: 'ax' }),
        h.seg(1, 2, -1, 2, { cls: 'ax' }),
        h.rightAngle(-1, 2, 'right', { size: 0.26 }),
        h.text(1.45, 1.0, 'FP', 'lbl--sm'),
        h.text(-0.05, 2.4, 'PH', 'lbl--sm')
      ];
    }
  });

  /* ---------- 焦点弦与焦半径 ---------- */
  add('c17-focal-chord', {
    title: '抛物线的焦点弦',
    caption: '过焦点 \\(F(1,0)\\) 的弦 \\(AB\\) 称为焦点弦。由抛物线的定义，\\(|AF|=x_1+\\frac p2\\)、\\(|BF|=x_2+\\frac p2\\)，故 \\(|AB|=x_1+x_2+p\\)。',
    coord: { x: [-2.2, 6.4], y: [-4.4, 4.4], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return 2 * Math.sqrt(Math.max(0, x)); }, { from: 0, to: 6.3, cls: 'curve' }),
        h.fn(function (x) { return -2 * Math.sqrt(Math.max(0, x)); }, { from: 0, to: 6.3, cls: 'curve' }),
        h.vline(-1, { from: -4.2, to: 4.2, cls: 'hl' }),
        h.seg(-0.5, -3.8, 4.6, 3.44, { cls: 'ax' }),
        h.dot(1, 0, { label: 'F', dx: 0.35, dy: -0.42, labelCls: 'lbl--sm' }),
        h.dot(0.25, -2, { label: 'A', dx: -0.5, dy: -0.28, labelCls: 'lbl--sm' }),
        h.dot(4, 4, { label: 'B', dx: 0.5, dy: 0.3, labelCls: 'lbl--sm' }),
        h.dot(0.25, -2, { r: 0.06, solid: true }),
        h.text(2.6, 1.1, '|AB|=x1+x2+p', 'lbl--sm', 'start'),
        h.text(-1, 4.35, '准线', 'lbl--sm')
      ];
    }
  });
})();
