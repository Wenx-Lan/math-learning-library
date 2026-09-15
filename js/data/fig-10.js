/*!
 * fig-10.js —— 第 10 章「解三角形」简图
 * 简图 id：c10-cosine-proof、c10-circumcircle、c10-measure-height、c10-area
 * 说明：本文件所有坐标均为“数学坐标”，即 y 轴向上；draw(h, n) 中 n 用于直接写 SVG 节点。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 余弦定理的向量证明：把 a 放到 x 轴上 ---------- */
  add('c10-cosine-proof', {
    title: '余弦定理的向量证明',
    caption: '把 \\(A\\) 放在原点、\\(AB\\) 放在 \\(x\\) 轴上，用 \\(\\vec{BC}=\\vec{AC}-\\vec{AB}\\) 两边平方即得 \\(a^2=b^2+c^2-2bc\\cos A\\)。',
    viewBox: '-1.1 -3.5 6.4 4.6',
    draw: function (h) {
      return [
        n('path', { class: 'shape', d: 'M0 0 L4 0 L1.7 -2.9 Z' }),
        n('line', { class: 'ax', x1: '-0.55', y1: '0', x2: '5', y2: '0' }),
        n('path', { class: 'ax', d: 'M5 0 L4.7 0.15 M5 0 L4.7 -0.15', fill: 'none' }),
        n('line', { class: 'ax', x1: '0', y1: '0.35', x2: '0', y2: '-3.3' }),
        h.angleArc(0, 0, 0.75, 0, Math.atan2(2.9, 1.7), { cls: 'arc' }),
        h.text(0.95, -0.3, 'A', 'lbl--sm'),
        h.text(4.2, 0.25, 'B', 'lbl--sm'),
        h.text(1.45, -3.1, 'C', 'lbl--sm'),
        h.text(2.1, 0.26, 'c', 'lbl--sm'),
        h.text(0.62, -1.75, 'b', 'lbl--sm'),
        h.text(3.05, -1.3, 'a', 'lbl--sm')
      ];
    }
  });

  /* ---------- 正弦定理与外接圆半径 ---------- */
  add('c10-circumcircle', {
    title: '正弦定理与外接圆',
    caption: '过 \\(B\\) 作直径 \\(BD\\)，则 \\(\\angle BCD=90^\\circ\\)，于是 \\(a=2R\\sin D=2R\\sin A\\)，即 \\(a/\\sin A=b/\\sin B=c/\\sin C=2R\\)。',
    viewBox: '-2.5 -2.9 5.2 5.2',
    draw: function (h) {
      return [
        n('circle', { class: 'shape', cx: '0', cy: '0', r: '2.4' }),
        n('path', { class: 'shape--dark', d: 'M-0.8 2.26 L1.6 1.79 L2.14 -1.10 Z' }),
        n('line', { class: 'ax', x1: '-0.8', y1: '2.26', x2: '2.092', y2: '-1.179', fill: 'none' }),
        n('line', { class: 'hl', x1: '-0.8', y1: '2.26', x2: '2.28', y2: '-0.756', fill: 'none' }),
        n('circle', { class: 'pt', cx: '0', cy: '0', r: '0.09' }),
        h.text(0.22, -0.03, 'O', 'lbl--sm', 'start'),
        h.text(2.6, 1.5, 'A', 'lbl--sm'),
        h.text(-1.15, 2.45, 'B', 'lbl--sm'),
        h.text(2.75, -1.35, 'C', 'lbl--sm'),
        h.text(-2.35, -1.1, 'D', 'lbl--sm'),
        h.text(2.05, -1.6, 'a', 'lbl--sm'),
        h.text(0.75, 0.75, 'b', 'lbl--sm'),
        h.text(-1.45, 0.4, 'c', 'lbl--sm'),
        h.text(0.45, 0.12, 'R', 'lbl--sm')
      ];
    }
  });

  /* ---------- 底部可达、顶部不可达时的测量方案 ---------- */
  add('c10-measure-height', {
    title: '测底部不可达物体的高度',
    caption: '同一铅垂面内取基线 \\(CD=d\\)，测得仰角 \\(\\alpha,\\beta\\)，则 \\(PQ=\\dfrac{d\\sin\\alpha\\sin\\beta}{\\sin(\\alpha-\\beta)}\\)。',
    viewBox: '-1 -7.4 7.4 8.5',
    draw: function (h) {
      return [
        n('line', { class: 'ax', x1: '0', y1: '0', x2: '6.05', y2: '0' }),
        n('path', { class: 'ax', d: 'M6.05 0 L5.75 0.16 M6.05 0 L5.75 -0.16', fill: 'none' }),
        n('path', { class: 'shape', d: 'M0 0 L-0.75 0 L-0.75 -5.9 L0 -5.9 Z' }),
        n('path', { class: 'shape--dark', d: 'M0 0 L1.7 0 L1.7 -1.75 L0 -3.05 Z' }),
        n('line', { class: 'hl', x1: '1.7', y1: '-1.75', x2: '0', y2: '-3.05' }),
        n('line', { class: 'hl', x1: '2.55', y1: '0', x2: '0', y2: '-5.9' }),
        n('line', { class: 'hl', x1: '4.85', y1: '0', x2: '0', y2: '-5.9' }),
        h.angleArc(2.55, 0, 0.7, Math.PI - Math.atan2(5.9, 2.55), Math.PI, { cls: 'arc' }),
        h.angleArc(4.85, 0, 0.95, Math.PI - Math.atan2(5.9, 4.85), Math.PI, { cls: 'arc' }),
        h.text(2.75, 0.55, 'α', 'lbl--sm'),
        h.text(5.05, 0.62, 'β', 'lbl--sm'),
        h.text(3.7, -0.42, 'd', 'lbl--sm'),
        h.text(1.92, -3.4, 'β', 'lbl--sm'),
        h.text(-0.62, -6.1, 'P', 'lbl--sm'),
        h.text(0.3, -6.1, 'Q', 'lbl--sm'),
        h.text(0.2, 0.3, 'O', 'lbl--sm'),
        h.text(1.9, 0.28, 'C', 'lbl--sm'),
        h.text(5.05, 0.28, 'D', 'lbl--sm'),
        h.text(0.3, -3.0, 'h', 'lbl--sm')
      ];
    }
  });

  /* ---------- 面积公式 S = 1/2 ab sin C ---------- */
  add('c10-area', {
    title: '三角形的面积公式',
    caption: '以 \\(BC\\) 为底时高为 \\(b\\sin C\\)，故 \\(S=\\dfrac12 ab\\sin C=\\dfrac12 bc\\sin A=\\dfrac12 ca\\sin B\\)。',
    viewBox: '-1.1 -3.6 6.6 4.7',
    draw: function (h) {
      return [
        n('path', { class: 'fill-soft', d: 'M0.3 0 L4.55 0 L1.4 -2.83 Z' }),
        n('line', { class: 'hl', x1: '1.4', y1: '-2.83', x2: '1.4', y2: '0' }),
        n('path', { class: 'ax', d: 'M1.4 0 L1.12 -0.16 M1.4 0 L1.4 -0.28', fill: 'none' }),
        h.angleArc(0.3, 0, 0.68, 0, Math.PI - Math.atan2(2.83, 1.1), { cls: 'arc' }),
        h.angleArc(4.55, 0, 0.7, Math.atan2(2.83, 3.15), Math.PI, { cls: 'arc' }),
        h.text(-0.1, 0.25, 'A', 'lbl--sm'),
        h.text(4.85, 0.25, 'B', 'lbl--sm'),
        h.text(1.15, -3.1, 'C', 'lbl--sm'),
        h.text(0.35, -1.35, '∠A', 'lbl--sm'),
        h.text(4.2, -0.4, '∠B', 'lbl--sm'),
        h.text(2.5, 0.28, 'c', 'lbl--sm'),
        h.text(0.35, -1.7, 'b', 'lbl--sm'),
        h.text(3.15, -1.6, 'a', 'lbl--sm'),
        h.text(1.28, -1.55, 'h', 'lbl--sm')
      ];
    }
  });
})();
