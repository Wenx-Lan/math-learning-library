/*!
 * fig-4.js —— 第 4 章「函数性质」简图
 * 图 id：c4-monotonic、c4-parity、c4-symmetry、c4-ivt-zero
 * 说明：凡取点处均标出横、纵坐标的对应关系，便于课堂读图。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------------------------------------------------------------
     图 1：单调性的定义（自变量变大，函数值随之变大）
     坐标范围 x:[-2.6,3.2]  y:[-1.2,4.4]，u(t)=t^3/3+t 在图上单调递增
     --------------------------------------------------------------- */
  add('c4-monotonic', {
    title: '单调性的定义',
    caption: '在区间上取 \\(x_{1}&lt;x_{2}\\)，只要恒有 \\(f(x_{1})&lt;f(x_{2})\\)，就说 \\(f(x)\\) 在该区间上单调递增。',
    coord: { x: [-2.6, 3.2], y: [-1.2, 4.4], grid: 1, pad: 0.35 },
    draw: function (h) {
      function u(t) { return t * t * t / 3 + t; }
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.vline(-1, { from: 0, to: u(-1) }),
        h.vline(2, { from: 0, to: u(2) }),
        h.fn(u, {}),
        h.dot(-1, u(-1), { label: 'A', dx: 0.24, dy: 0.32 }),
        h.dot(2, u(2), { label: 'B', dx: -0.26, dy: -0.42 }),
        h.text(-1, -0.42, 'x_{1}', 'lbl'),
        h.text(2, -0.42, 'x_{2}', 'lbl'),
        h.text(-1, u(-1) + 0.32, 'f(x_{1})', 'lbl--sm', 'end'),
        h.text(2, u(2) - 0.38, 'f(x_{2})', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------------------------------------------------------------
     图 2：奇偶性 —— 左：偶函数关于 y 轴对称；右：奇函数关于原点对称
     u(t)=t^2-1（偶），v(t)=t^3/2（奇）
     --------------------------------------------------------------- */
  add('c4-parity', {
    title: '奇偶性的图像特征',
    caption: '偶函数图像关于 \\(y\\) 轴对称：自变量取相反数，函数值不变；奇函数图像关于原点对称：自变量取相反数，函数值也取相反数。',
    coord: { x: [-3.5, 3.5], y: [-1.4, 2.6], grid: 1, pad: 0.3 },
    draw: function (h) {
      function u(t) { return t * t - 1; }
      function v(t) { return t * t * t / 2; }
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.fn(u, { cls: 'curve' }),
        h.fn(v, { cls: 'curve--soft' }),
        h.dot(1, u(1), { label: '(1,0)', dx: 0.05, dy: -0.42 }),
        h.dot(-1, u(-1), { label: '(-1,0)', dx: -0.05, dy: -0.42 }),
        h.dot(1, v(1), { label: '(1,0.5)', dx: 0.22, dy: 0.42 }),
        h.dot(-1, v(-1), { label: '(-1,-0.5)', dx: -0.22, dy: -0.42 }),
        h.text(-2.45, 1.95, '偶函数 y=f(x)', 'lbl--sm', 'start'),
        h.text(1.75, 1.75, '奇函数 y=g(x)', 'lbl--sm', 'start')
      ];
    }
  });

  /* ---------------------------------------------------------------
     图 3：对称性 —— 左：关于直线 x=1 轴对称；右：关于点 A(1,1) 中心对称
     --------------------------------------------------------------- */
  add('c4-symmetry', {
    title: '两种对称的坐标语言',
    caption: '轴对称把 \\(x\\) 换成 \\(2a-x\\) 函数值不变；中心对称把 \\(x\\) 换成 \\(2a-x\\) 的同时，函数值也换成 \\(2b-f(x)\\)。',
    coord: { x: [-1.4, 3.8], y: [-0.8, 3.2], grid: 1, pad: 0.3 },
    draw: function (h) {
      function u(t) { return (t - 1) * (t - 1); }
      function v(t) { return t; }
      var i, kids = [];
      kids.push(h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }));
      /* 左侧：关于直线 x=1 轴对称 */
      kids.push(h.vline(1, { from: 0, to: 2.4 }));
      kids.push(h.fn(u, { cls: 'curve' }));
      kids.push(h.dot(0, 1, { label: 'P', dx: -0.22, dy: 0.3 }));
      kids.push(h.dot(2, 1, { label: 'P′', dx: 0.2, dy: 0.3 }));
      /* 右侧：关于点 A(1,1) 中心对称 */
      kids.push(h.fn(v, { from: -0.8, to: 3, cls: 'curve--soft' }));
      kids.push(h.dot(0.5, 0.5, { label: 'Q', dx: -0.16, dy: -0.36 }));
      kids.push(h.dot(1.5, 1.5, { label: 'Q′', dx: 0.18, dy: 0.36 }));
      kids.push(h.dot(1, 1, { label: 'A(1,1)', dx: 0.32, dy: 0.3, solid: true }));
      return kids;
    }
  });

  /* ---------------------------------------------------------------
     图 4：零点存在定理 —— 图象连续不断且端点异号，则曲线必穿过 x 轴
     p(t)=t^3/4-t，取 [a,b]=[-3,-1]：
       p(-3)=-27/4+3=-15/4=-3.75，
       p(-1)=-1/4+1=3/4=0.75，
     两者异号，且 p(-2)=-2+2=0，曲线在 (-3,-1) 内穿过 x 轴于点 (-2,0)。
     --------------------------------------------------------------- */
  add('c4-ivt-zero', {
    title: '零点存在定理',
    caption: '若 \\(f(x)\\) 在 \\([a,b]\\) 上的图象连续不断，且 \\(f(a)\\cdot f(b)&lt;0\\)，则曲线必从 \\(x\\) 轴一侧穿到另一侧，区间 \\((a,b)\\) 内至少存在一个零点。',
    coord: { x: [-3.6, 1.6], y: [-4.4, 1.9], grid: 1, pad: 0.25 },
    draw: function (h) {
      function p(t) { return t * t * t / 4 - t; }
      return [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.vline(-3, { from: 0, to: p(-3) }),
        h.vline(-1, { from: 0, to: p(-1) }),
        h.fn(p, { from: -3.2, to: 1.4 }),
        h.dot(-3, p(-3), { label: 'A(-3,-3.75)', dx: 0.55, dy: 0.42 }),
        h.dot(-1, p(-1), { label: 'B(-1,0.75)', dx: 0.5, dy: 0.42 }),
        h.dot(-2, 0, { label: '(-2,0)', dx: 0.05, dy: -0.42 }),
        h.dot(-3, 0, { label: 'a', dx: -0.18, dy: -0.38 }),
        h.dot(-1, 0, { label: 'b', dx: 0.18, dy: -0.38 })
      ];
    }
  });
})();
