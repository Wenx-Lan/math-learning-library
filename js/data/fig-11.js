/*!
 * fig-11.js —— 第 11 章「空间向量」简图
 * 简图 id：c11-space-coord、c11-normal-vector、c11-line-plane-angle、c11-dihedral
 * 说明：四张图都用「自由绘图」——viewBox 与 SVG 坐标一致（y 轴向下），
 *       因此用负的 y 表示“往上”。可见的面用 class 'shape' / 'shape--dark'，
 *       被遮挡的棱用 class 'hl'（虚线），向量用 class 'vec' 并带 marker 箭头。
 * 注意：自由绘图下 h.dot 返回的是「节点数组」，不能直接放进 draw 返回的数组里，
 *       否则渲染时会因 appendChild(Array) 报错，故本文件统一用下面的 dot() 生成节点。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 自由绘图的小工具 ---------- */
  function r(v) { return Math.round(v * 1000) / 1000; }
  function seg(ax, ay, bx, by, cls) {
    return n('line', { class: cls || 'shape', x1: r(ax), y1: r(ay), x2: r(bx), y2: r(by) });
  }
  function poly(pts, cls) {
    var d = 'M' + r(pts[0][0]) + ' ' + r(pts[0][1]), i;
    for (i = 1; i < pts.length; i++) { d += ' L' + r(pts[i][0]) + ' ' + r(pts[i][1]); }
    return n('path', { class: cls, d: d + ' Z' });
  }
  function path2(a, b, c, cls) {
    return n('path', {
      class: cls || 'ax', fill: 'none',
      d: 'M' + r(a[0]) + ' ' + r(a[1]) + ' L' + r(b[0]) + ' ' + r(b[1]) + ' L' + r(c[0]) + ' ' + r(c[1])
    });
  }
  function dot(x, y, solid) {
    return n('circle', { class: solid ? 'pt pt--solid' : 'pt', cx: r(x), cy: r(y), r: 0.1 });
  }
  function arrowHead(x, y, ux, uy) {
    var L = 0.38, W = 0.16;
    var bx = x - L * ux, by = y - L * uy;
    return n('path', {
      class: 'ax', fill: 'none',
      d: 'M' + r(bx - W * uy) + ' ' + r(by + W * ux) + ' L' + r(x) + ' ' + r(y) + ' L' + r(bx + W * uy) + ' ' + r(by - W * ux)
    });
  }

  /* ---------- 一、空间直角坐标系与点的坐标（长方体作载体） ---------- */
  add('c11-space-coord', {
    title: '空间直角坐标系与点的坐标',
    caption: '三条坐标轴两两垂直，点 \\(P\\) 的坐标就是 \\(\\vec{OP}\\) 在三条轴上的有向投影：过 \\(P\\) 作 \\(xOy\\) 平面的垂线，垂足为 \\(D\\)，再由 \\(D\\) 分别向 \\(x\\) 轴、\\(y\\) 轴作垂线得 \\(A,B\\)，于是 \\(P(x_{0},y_{0},z_{0})\\)，图中 \\(P(2,2,2)\\)。被长方体遮挡的棱用虚线画出。',
    viewBox: '-1.0 -4.4 6.4 6.7',
    draw: function (h) {
      var ex = [0.95, 0.32], ey = [0.58, -0.70], ez = [0, -1.0];
      function V(a, b, c) { return [a * ex[0] + b * ey[0], a * ex[1] + b * ey[1] + c * ez[1]]; }
      var O = V(0, 0, 0), A = V(2, 0, 0), B = V(0, 2, 0), C = V(0, 0, 2),
          D = V(2, 2, 0), E = V(2, 0, 2), F = V(0, 2, 2), G = V(2, 2, 2);
      var TX = V(4.2, 0, 0), TY = V(0, 4.8, 0), TZ = V(0, 0, 3.9);
      return [
        /* 三条坐标轴与箭头 */
        seg(O[0], O[1], TX[0], TX[1], 'ax'),
        arrowHead(TX[0], TX[1], 0.948, 0.319),
        seg(O[0], O[1], TY[0], TY[1], 'ax'),
        arrowHead(TY[0], TY[1], 0.638, -0.770),
        seg(O[0], O[1], TZ[0], TZ[1], 'ax'),
        arrowHead(TZ[0], TZ[1], 0, -1),
        /* 长方体的三个可见面：前面 xOy 内、右侧面、顶面 */
        poly([O, A, E, C], 'shape'),
        poly([A, D, G, E], 'shape--dark'),
        poly([C, E, G, F], 'shape'),
        /* 被遮挡的两条棱 BD、BF（B 是 y 轴上的那个顶点） */
        seg(B[0], B[1], D[0], D[1], 'hl'),
        seg(B[0], B[1], F[0], F[1], 'hl'),
        /* 顶点与点 P */
        dot(O[0], O[1]),
        dot(A[0], A[1]),
        dot(B[0], B[1]),
        dot(C[0], C[1]),
        dot(D[0], D[1]),
        dot(G[0], G[1], true),
        /* 文字 */
        h.text(-0.34, 0.34, 'O', 'lbl'),
        h.text(4.32, 1.62, 'x', 'lbl'),
        h.text(3.06, -3.62, 'y', 'lbl'),
        h.text(0.32, -4.12, 'z', 'lbl'),
        h.text(2.04, 1.02, 'A', 'lbl--sm'),
        h.text(0.82, -1.64, 'B', 'lbl--sm'),
        h.text(-0.44, -2.1, 'C', 'lbl--sm'),
        h.text(3.3, -0.6, 'D', 'lbl--sm'),
        h.text(3.3, -3.0, 'P', 'lbl')
      ];
    }
  });

  /* ---------- 二、平面的法向量（垂直于平面内两条相交直线） ---------- */
  add('c11-normal-vector', {
    title: '平面的法向量',
    caption: '平面 \\(\\alpha\\) 内的两条相交直线 \\(l_{1},l_{2}\\) 交于点 \\(A\\)。向量 \\(\\vec n\\) 与 \\(l_{1},l_{2}\\) 都垂直（图中用直角符号标出），由线面垂直的判定定理，\\(\\vec n\\) 与平面 \\(\\alpha\\) 内的任意向量都垂直，所以 \\(\\vec n\\) 是 \\(\\alpha\\) 的一个法向量。',
    viewBox: '-3.3 -2.7 7.1 5.0',
    draw: function (h) {
      var A = [0.1, 0.55];
      var d1 = [0.9647, 0.2631], d2 = [0.7297, -0.6841], up = [0, -1];
      function W(t, d) { return [A[0] + t * d[0], A[1] + t * d[1]]; }
      var l1a = W(-2.2, d1), l1b = W(2.2, d1);
      var l2a = W(-1.0, d2), l2b = W(1.0, d2);
      var nTip = W(2.65, up);
      var s1 = 0.45, s2 = 0.4;
      var m1 = W(s1, up), m2 = W(s1, d1), m3 = W(s2, up), m4 = W(-s2, d2);
      m2 = [m1[0] + s1 * d1[0], m1[1] + s1 * d1[1]];
      var m5 = [m3[0] - s2 * d2[0], m3[1] - s2 * d2[1]];
      return [
        poly([[-2.9, 0.7], [1.5, 1.9], [3.1, 0.4], [-1.3, -0.8]], 'shape'),
        /* 平面内两条相交直线 */
        seg(l1a[0], l1a[1], l1b[0], l1b[1], 'shape'),
        seg(l2a[0], l2a[1], l2b[0], l2b[1], 'shape'),
        /* 两处直角符号 */
        path2(m1, m2, W(s1, d1), 'ax'),
        path2(m3, m5, m4, 'ax'),
        /* 法向量 */
        n('line', { class: 'vec', x1: r(A[0]), y1: r(A[1]), x2: r(nTip[0]), y2: r(nTip[1]), 'marker-end': 'url(#arrowhead)' }),
        dot(A[0], A[1], true),
        h.text(0.42, -2.12, 'n', 'lbl'),
        h.text(0.16, 0.98, 'A', 'lbl--sm'),
        h.text(2.4, 1.1, 'l₁', 'lbl--sm'),
        h.text(-0.98, 1.5, 'l₂', 'lbl--sm'),
        h.text(-2.15, 0.2, 'α', 'lbl')
      ];
    }
  });

  /* ---------- 三、直线与平面所成的角（斜线、垂线、射影） ---------- */
  add('c11-line-plane-angle', {
    title: '直线与平面所成的角',
    caption: '斜线 \\(PA\\) 与平面 \\(\\alpha\\) 交于点 \\(A\\)，从 \\(P\\) 向 \\(\\alpha\\) 作垂线 \\(PH\\)，垂足为 \\(H\\)，则虚线 \\(AH\\) 是 \\(PA\\) 在平面内的射影，\\(\\angle PAH=\\theta\\) 就是 \\(PA\\) 与 \\(\\alpha\\) 所成的角，\\(\\angle PHA\\) 为直角。于是 \\(\\sin\\theta=\\dfrac{|\\vec a\\cdot\\vec n|}{|\\vec a|\\,|\\vec n|}\\)，其中 \\(\\vec a\\) 是直线的方向向量、\\(\\vec n\\) 是平面 \\(\\alpha\\) 的法向量。',
    viewBox: '-3.0 -2.9 6.9 5.1',
    draw: function (h) {
      var A = [-0.6, 0.9], H = [1.4, 0.15], P = [1.4, -2.4];
      var dh = [(A[0] - H[0]) / 2.1359, (A[1] - H[1]) / 2.1359];   /* H→A 的单位方向 */
      var s = 0.34;
      var c1 = [H[0], H[1] - s];
      var c2 = [c1[0] + s * dh[0], c1[1] + s * dh[1]];
      var c3 = [H[0] + s * dh[0], H[1] + s * dh[1]];
      return [
        poly([[-2.6, 0.6], [1.8, 1.8], [3.2, 0.5], [-1.2, -0.7]], 'shape'),
        /* 垂线段 PH（实线） */
        seg(P[0], P[1], H[0], H[1], 'shape'),
        /* 斜线 PA（实线） */
        seg(P[0], P[1], A[0], A[1], 'shape'),
        /* 射影 AH（虚线） */
        seg(A[0], A[1], H[0], H[1], 'hl'),
        /* H 处的直角符号 */
        path2(c1, c2, c3, 'ax'),
        /* A 处的角 θ */
        h.angleArc(A[0], A[1], 1.0, -1.0267, -0.3588, { cls: 'arc' }),
        dot(A[0], A[1]),
        dot(H[0], H[1]),
        dot(P[0], P[1], true),
        h.text(1.62, -2.56, 'P', 'lbl'),
        h.text(-0.94, 1.14, 'A', 'lbl'),
        h.text(1.62, 0.42, 'H', 'lbl'),
        h.text(0.34, -0.06, 'θ', 'lbl--sm'),
        h.text(-2.35, -0.28, 'α', 'lbl')
      ];
    }
  });

  /* ---------- 四、二面角与它的平面角 ---------- */
  add('c11-dihedral', {
    title: '二面角与它的平面角',
    caption: '两个半平面 \\(\\alpha,\\beta\\) 以直线 \\(l\\) 为棱组成二面角 \\(\\alpha\\text{-}l\\text{-}\\beta\\)。在棱上取一点 \\(O\\)，分别在两个半平面内作垂直于 \\(l\\) 的射线 \\(OA,OB\\)，则 \\(\\angle AOB\\) 就是二面角的平面角，它的大小与点 \\(O\\) 在棱上的位置无关。用向量法时，二面角与两个法向量的夹角相等或互补，必须再判断锐钝。',
    viewBox: '-2.7 -2.2 5.6 4.7',
    draw: function (h) {
      var O = [0, 0.3];
      var dA = [-0.9021, -0.4314], dB = [0.8523, -0.5230];
      var A = [O[0] + 2.0 * dA[0], O[1] + 2.0 * dA[1]];
      var B = [O[0] + 1.9 * dB[0], O[1] + 1.9 * dB[1]];
      var s = 0.34, up = [0, -1];
      var p1 = [O[0], O[1] - s];
      var p2 = [p1[0] + s * dA[0], p1[1] + s * dA[1]];
      var p3 = [O[0] + s * dA[0], O[1] + s * dA[1]];
      var q1 = [O[0], O[1] - s];
      var q2 = [q1[0] + s * dB[0], q1[1] + s * dB[1]];
      var q3 = [O[0] + s * dB[0], O[1] + s * dB[1]];
      return [
        /* 两个半平面（共享棱 l 上的一段） */
        poly([[0, 1.9], [0, -0.4], [-2.3, -1.5], [-2.3, 0.8]], 'shape'),
        poly([[0, 1.9], [0, -0.4], [2.2, -1.75], [2.2, 0.55]], 'shape--dark'),
        /* 棱 l */
        seg(0, 1.9, 0, -2.6, 'shape'),
        /* 两个半平面内垂直于棱的射线 OA、OB */
        seg(O[0], O[1], A[0], A[1], 'shape'),
        seg(O[0], O[1], B[0], B[1], 'shape'),
        /* 直角符号：OA⊥l、OB⊥l */
        path2(p1, p2, p3, 'ax'),
        path2(q1, q2, q3, 'ax'),
        /* 平面角 ∠AOB */
        h.angleArc(O[0], O[1], 0.85, -0.5502, -2.6953, { cls: 'arc' }),
        dot(O[0], O[1], true),
        h.text(0.28, 1.72, 'l', 'lbl'),
        h.text(-0.3, 0.62, 'O', 'lbl--sm'),
        h.text(-2.0, -0.36, 'A', 'lbl--sm'),
        h.text(1.86, -0.5, 'B', 'lbl--sm'),
        h.text(0.24, -0.74, 'θ', 'lbl--sm'),
        h.text(-2.02, 0.5, 'α', 'lbl'),
        h.text(1.76, 0.24, 'β', 'lbl')
      ];
    }
  });
})();
