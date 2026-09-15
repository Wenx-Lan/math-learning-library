/*!
 * fig-5.js —— 第 5 章「幂函数」简图
 * 图 id：c5-power-family、c5-alpha-compare、c5-domain-range
 * 说明：幂函数在 x&lt;0 处的形态由定义域决定，作图时一律按定义域分段绘制，
 *       避免程序把不存在的点连成竖直线。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------------------------------------------------------------
     图 1：五个常见幂函数的图像
       y=x、y=x^2、y=x^3 定义域为 R；
       y=x^{1/2} 定义域为 [0,+∞)，只画右支；
       y=x^{-1} 定义域为 {x|x≠0}，左右两支分两段画。
     坐标范围 x:[-3.2,3.2]  y:[-4.4,5.4]
     --------------------------------------------------------------- */
  add('c5-power-family', {
    title: '五个常见幂函数的图像',
    caption: '五条曲线都过点 \\((1,1)\\)；除 \\(y=x^{-1}\\) 外都过原点。\\(y=x^{-1}\\) 的两支分别单调递减，图像关于原点对称。',
    coord: { x: [-3.2, 3.2], y: [-4.4, 5.4], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return x; }, { cls: 'ax' }),
        h.fn(function (x) { return x * x; }, { cls: 'curve' }),
        h.fn(function (x) { return x * x * x; }, { cls: 'curve--soft' }),
        h.fn(function (x) { return Math.sqrt(x); }, { from: 0, to: 3.2 }),
        h.fn(function (x) { return 1 / x; }, { from: 0.28, to: 3.2 }),
        h.fn(function (x) { return 1 / x; }, { from: -3.2, to: -0.28 }),
        h.dot(1, 1, { label: '(1,1)', dx: 0.36, dy: 0.34 }),
        h.text(-1.75, 3.35, 'y=x^{2}', 'lbl--sm', 'start'),
        h.text(-2.9, -2.7, 'y=x^{3}', 'lbl--sm', 'start'),
        h.text(2.35, 4.75, 'y=x', 'lbl--sm', 'start'),
        h.text(1.65, 1.55, 'y=x^{1/2}', 'lbl--sm', 'start'),
        h.text(2.05, 0.75, 'y=x^{-1}', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------------------------------------------------------------
     图 2：指数 α 对图像的影响
       在 (1,+∞) 上 α 越大图像越靠上；在 (0,1) 上恰好相反。
       为了看清 (0,1) 内的“反超”，纵向坐标做了压缩显示。
     --------------------------------------------------------------- */
  add('c5-alpha-compare', {
    title: '指数 α 决定图像的相对位置',
    caption: '过定点 \\((1,1)\\) 后：\\(\\alpha\\) 越大，图像在 \\(x&gt;1\\) 时越靠上，在 \\(0&lt;x&lt;1\\) 时越靠下。',
    coord: { x: [-0.2, 2.6], y: [-0.6, 8.4], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.vline(1, { from: 0, to: 8 }),
        h.hline(1, { from: 0, to: 2.6 }),
        h.fn(function (x) { return x; }, { from: 0, to: 2.4, cls: 'curve--soft' }),
        h.fn(function (x) { return x * x; }, { from: 0, to: 2.4, cls: 'curve' }),
        h.fn(function (x) { return x * x * x; }, { from: 0, to: 2.05, cls: 'curve--soft' }),
        h.fn(function (x) { return Math.sqrt(x); }, { from: 0, to: 2.4 }),
        h.dot(1, 1, { label: '(1,1)', dx: 0.3, dy: -0.5 }),
        h.dot(0, 0, { solid: true, r: 0.07 }),
        h.text(1.62, 3.15, 'y=x^{3}', 'lbl--sm', 'start'),
        h.text(1.62, 2.35, 'y=x^{2}', 'lbl--sm', 'start'),
        h.text(1.7, 1.18, 'y=x', 'lbl--sm', 'start'),
        h.text(1.7, 0.28, 'y=x^{1/2}', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------------------------------------------------------------
     图 3：定义域决定图像的位置
       y=x^{1/2}：定义域 [0,+∞)，图像只在 y 轴右侧（含原点）；
       y=x^{-1}：定义域 {x|x≠0}，x=0 处无定义，图像被 y 轴分成两支。
     --------------------------------------------------------------- */
  add('c5-domain-range', {
    title: '定义域决定图像画在哪',
    caption: '\\(y=x^{1/2}\\) 只在 \\(y\\) 轴右侧；\\(y=x^{-1}\\) 在 \\(x=0\\) 处无定义，图像被 \\(y\\) 轴分成两支，\\(y\\) 轴是它的渐近线。',
    coord: { x: [-2.9, 3.1], y: [-1.6, 3.6], grid: 1, pad: 0.3 },
    draw: function (h) {
      var i, kids = [];
      kids.push(h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }));
      /* 无定义区域：x<0 用点状虚线标出，提示此处没有图像 */
      for (i = -2; i <= -0.4; i += 0.4) {
        kids.push(h.vline(i, { from: 0, to: 0.34, cls: 'hl' }));
      }
      kids.push(h.fn(function (x) { return Math.sqrt(x); }, { from: 0, to: 3 }));
      kids.push(h.fn(function (x) { return 1 / x; }, { from: 0.3, to: 3, cls: 'curve--soft' }));
      kids.push(h.fn(function (x) { return 1 / x; }, { from: -3, to: -0.3, cls: 'curve--soft' }));
      kids.push(h.dot(0, 0, { solid: true, r: 0.07 }));
      kids.push(h.dot(1, 1, { label: '(1,1)', dx: 0.34, dy: 0.32 }));
      kids.push(h.text(-2.1, 1.45, 'x&lt;0 无图像', 'lbl--sm'));
      kids.push(h.text(2.15, 2.75, 'y=x^{1/2}', 'lbl--sm', 'start'));
      kids.push(h.text(1.5, 0.42, 'y=x^{-1}', 'lbl--sm', 'start'));
      return kids;
    }
  });
})();
