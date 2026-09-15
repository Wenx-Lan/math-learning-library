/*!
 * fig-18.js —— 第 18 章「导数」简图
 * 简图 id：c18-tangent-slope、c18-monotonic、c18-extrema、c18-tangent-lines
 * 说明：本文件所有坐标均为“数学坐标”，即 y 轴向上为正。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 割线斜率的极限就是切线斜率 ---------- */
  add('c18-tangent-slope', {
    title: '导数的几何意义：割线斜率的极限',
    caption: '曲线上一点 \\(P\\) 与邻近点 \\(Q\\) 连成割线 \\(PQ\\)，割线斜率为 \\(\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}\\)。当 \\(Q\\) 沿曲线趋近于 \\(P\\)（即 \\(\\Delta x\\to0\\)）时，割线的极限位置就是切线，其斜率即 \\(f\'(x_0)\\)。',
    coord: { x: [-0.5, 3.5], y: [-0.5, 3.6], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return x * x; }, { cls: 'curve' }),
        h.seg(0.2, -0.45, 3.4, 2.75, { cls: 'curve--soft' }),
        h.dot(1, 1, { label: 'P(1,1)', dx: 0.95, dy: 0.35, labelCls: 'lbl--sm' }),
        h.dot(2, 4, { label: 'Q(2,4)', dx: -0.95, dy: 0.3, labelCls: 'lbl--sm' }),
        h.vline(1, { from: 1, to: 0, cls: 'hl' }),
        h.vline(2, { from: 4, to: 0, cls: 'hl' }),
        h.seg(1, 1, 2, 1, { cls: 'hl' }),
        h.seg(2, 1, 2, 4, { cls: 'hl' }),
        h.text(1.5, 0.78, 'Δx', 'lbl--sm'),
        h.text(2.2, 2.4, 'Δy', 'lbl--sm'),
        h.text(0.95, 3.25, "切线斜率 f'(1)=2", 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 导数与单调性 ---------- */
  add('c18-monotonic', {
    title: '导数符号与函数的单调性',
    caption: '函数 \\(f(x)=x^3-3x\\) 的导数为 \\(f\'(x)=3x^2-3=3(x-1)(x+1)\\)。在 \\((-\\infty,-1)\\) 与 \\((1,+\\infty)\\) 上 \\(f\'(x)&gt;0\\)，函数单调递增；在 \\((-1,1)\\) 上 \\(f\'(x)&lt;0\\)，函数单调递减。',
    coord: { x: [-3.2, 3.2], y: [-3.2, 3.2], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return x * x * x - 3 * x; }, { cls: 'curve' }),
        h.hline(2, { from: -3.0, to: -0.1, cls: 'hl' }),
        h.hline(-2, { from: 0.1, to: 3.0, cls: 'hl' }),
        h.dot(-1, 2, { label: '(-1,2)', dx: -0.9, dy: 0.35, labelCls: 'lbl--sm' }),
        h.dot(1, -2, { label: '(1,-2)', dx: 0.9, dy: -0.35, labelCls: 'lbl--sm' }),
        h.text(-2.75, -1.5, "f'(x)&gt;0 增", 'lbl--sm', 'start'),
        h.text(0.15, 2.4, "f'(x)&lt;0 减", 'lbl--sm', 'start'),
        h.text(1.6, 2.6, "f'(x)&gt;0 增", 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 极值的判定：导数变号 ---------- */
  add('c18-extrema', {
    title: '极值点处导数为零且左右变号',
    caption: '在 \\(x=-1\\) 处 \\(f\'(x)\\) 由正变负，函数先增后减，取得极大值；在 \\(x=1\\) 处 \\(f\'(x)\\) 由负变正，函数先减后增，取得极小值。\\(f\'(x_0)=0\\) 只是必要条件，还必须左右变号。',
    coord: { x: [-3.2, 3.2], y: [-3.4, 3.4], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return x * x * x - 3 * x; }, { cls: 'curve' }),
        h.hline(2, { from: -1.7, to: -0.3, cls: 'curve--soft' }),
        h.hline(-2, { from: 0.3, to: 1.7, cls: 'curve--soft' }),
        h.dot(-1, 2, { solid: true, r: 0.1 }),
        h.dot(1, -2, { solid: true, r: 0.1 }),
        h.dot(-1, 2, { label: '极大值 2', dx: 0.15, dy: 0.5, labelCls: 'lbl--sm' }),
        h.dot(1, -2, { label: '极小值 -2', dx: -0.15, dy: -0.5, labelCls: 'lbl--sm' }),
        h.text(-2.85, -2.6, "f'(-1)=f'(1)=0", 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------- 在一点处的切线方程 ---------- */
  add('c18-tangent-lines', {
    title: '用导数求切线方程',
    caption: '函数 \\(f(x)=x^3-3x\\) 在 \\(x=0\\) 处的导数 \\(f\'(0)=-3\\)，故该点处切线为 \\(y=-3x\\)；在 \\(x=2\\) 处 \\(f\'(2)=9\\)，切线为 \\(y=9x-16\\)。',
    coord: { x: [-3.2, 3.2], y: [-5.6, 5.6], grid: 1, pad: 0.4 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return x * x * x - 3 * x; }, { cls: 'curve' }),
        h.seg(-1.7, 5.1, 1.6, -4.8, { cls: 'curve--soft' }),
        h.seg(1.55, -2.05, 2.35, 5.15, { cls: 'curve--soft' }),
        h.dot(0, 0, { label: 'O', dx: -0.35, dy: -0.4, labelCls: 'lbl--sm' }),
        h.dot(2, 2, { label: 'P(2,2)', dx: 0.9, dy: 0.35, labelCls: 'lbl--sm' }),
        h.text(-3.05, 4.5, "y=-3x", 'lbl--sm', 'start'),
        h.text(0.2, 5.0, "y=9x-16", 'lbl--sm', 'start')
      ];
    }
  });
})();
