/*!
 * fig-16.js —— 第 16 章「直线与圆」简图
 * 简图 id：c16-line-circle、c16-slope、c16-distance、c16-chord
 * 说明：本文件所有坐标均为“数学坐标”，即 y 轴向上为正。
 *       字符串中的 LaTeX 定界符必须写作 \\( ... \\)（反斜杠双写）。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 直线与圆的位置关系：比较圆心到直线的距离 d 与半径 r ---------- */
  add('c16-line-circle', {
    title: '直线与圆的位置关系',
    caption: '圆心 \\(C(a,b)\\) 到直线 \\(l\\) 的距离 \\(d\\) 与半径 \\(r\\) 作比较：\\(d<r\\) 时相交、\\(d=r\\) 时相切、\\(d>r\\) 时相离。',
    coord: { x: [-3.4, 3.4], y: [-2.6, 2.6], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.circle(0, 0, 2, { cls: 'curve' }),
        h.dot(0, 0, { label: 'C', dx: -0.35, dy: -0.32 }),
        h.seg(-3, 1, 3, -1, { cls: 'ax' }),
        h.text(2.6, -1.5, 'l', 'lbl--sm'),
        h.dot(0, 0, { r: 0.06, solid: true }),
        h.seg(0, 0, 0.8944, -0.4472, { cls: 'hl' }),
        h.dot(0.8944, -0.4472, { label: '垂足', dx: 1.0, dy: 0.26, labelCls: 'lbl--sm' }),
        h.rightAngle(0.8944, -0.4472, 'left', { size: 0.24 }),
        h.text(0.3, -0.55, 'd', 'lbl--sm'),
        h.text(-2.75, 2.1, 'r=2', 'lbl--sm')
      ];
    }
  });

  /* ---------- 斜率 k = tanα = (y2-y1)/(x2-x1) ---------- */
  add('c16-slope', {
    title: '斜率的几何意义',
    caption: '倾斜角 \\(\\alpha\\) 的正切就是斜率：\\(k=\\tan\\alpha=\\frac{y_2-y_1}{x_2-x_1}\\)，也就是“纵增量比横增量”。',
    coord: { x: [-1.6, 3.4], y: [-1.8, 3.4], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.seg(-0.8, -1.6, 3, 2.8, { cls: 'ax' }),
        h.angleArc(0, 0, 0.85, 0, Math.atan(2), { cls: 'arc' }),
        h.text(1.15, 0.3, 'α', 'lbl--sm'),
        h.dot(1, 0.5, { label: 'A(1,0.5)', dx: 0.1, dy: -0.35, labelCls: 'lbl--sm' }),
        h.dot(2.5, 2.5, { label: 'B(2.5,2.5)', dx: 1.0, dy: 0.35, labelCls: 'lbl--sm' }),
        h.seg(1, 0.5, 2.5, 0.5, { cls: 'hl' }),
        h.seg(2.5, 0.5, 2.5, 2.5, { cls: 'hl' }),
        h.text(1.75, 0.18, 'Δx', 'lbl--sm'),
        h.text(2.75, 1.5, 'Δy', 'lbl--sm')
      ];
    }
  });

  /* ---------- 点到直线的距离公式 ---------- */
  add('c16-distance', {
    title: '点到直线的距离',
    caption: '点 \\(P(x_0,y_0)\\) 到直线 \\(Ax+By+C=0\\) 的距离为 \\(d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}\\)，也就是图中垂线段 \\(PQ\\) 的长。',
    coord: { x: [-0.6, 4.2], y: [-1.4, 3.4], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.seg(-0.5, -0.5, 4, 3, { cls: 'ax' }),
        h.text(3.55, 2.9, 'l: x-y-1=0', 'lbl--sm'),
        h.dot(3, 2.6, { label: 'P(3,2)', dx: 0.15, dy: -0.42, labelCls: 'lbl--sm' }),
        h.vline(3, { from: 2.6, to: 1, cls: 'hl' }),
        h.dot(3, 1, { label: 'Q(3,1)', dx: 0.72, dy: 0.35, labelCls: 'lbl--sm' }),
        h.rightAngle(3, 1, 'left', { size: 0.26 }),
        h.text(3.38, 1.8, 'd', 'lbl--sm')
      ];
    }
  });

  /* ---------- 弦长公式：|AB| = 2√(r^2-d^2) ---------- */
  add('c16-chord', {
    title: '弦长与弦心距',
    caption: '圆心 \\(C\\) 到弦 \\(AB\\) 的距离为 \\(d\\)，垂足 \\(H\\) 平分弦。在 \\(Rt\\triangle CAH\\) 中由勾股定理得 \\(\\left(\\frac{|AB|}{2}\\right)^2+d^2=r^2\\)，故 \\(|AB|=2\\sqrt{r^2-d^2}\\)。',
    coord: { x: [-3.4, 3.4], y: [-3.0, 3.0], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.circle(0, 0, 2.5, { cls: 'curve' }),
        h.dot(0, 0, { label: 'C', dx: -0.35, dy: -0.3 }),
        h.seg(-2, 1.5, 2, 1.5, { cls: 'ax' }),
        h.dot(-2, 1.5, { label: 'A', dx: -0.3, dy: -0.35, labelCls: 'lbl--sm' }),
        h.dot(2, 1.5, { label: 'B', dx: 0.3, dy: -0.35, labelCls: 'lbl--sm' }),
        h.dot(0, 1.5, { label: 'H', dx: 0.28, dy: 0.3, labelCls: 'lbl--sm' }),
        h.seg(0, 0, 2, 1.5, { cls: 'ax' }),
        h.seg(0, 0, 0, 1.5, { cls: 'hl' }),
        h.rightAngle(0, 1.5, 'right', { size: 0.28 }),
        h.text(0.32, 0.75, 'd', 'lbl--sm'),
        h.text(1.22, 0.55, 'r', 'lbl--sm'),
        h.text(-1.0, 1.85, '弦', 'lbl--sm')
      ];
    }
  });
})();
