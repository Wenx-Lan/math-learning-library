/*!
 * fig-9.js —— 第 9 章「平面向量」简图
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* 图 1：向量的加法（三角形法则与平行四边形法则） */
  add('c9-vector-add', {
    title: '向量加法的三角形法则与平行四边形法则',
    caption: '把 \\(\\vec b\\) 平移到 \\(\\vec a\\) 的终点，则从 \\(\\vec a\\) 的起点指向 \\(\\vec b\\) 的终点的向量就是 \\(\\vec a+\\vec b\\)；以两向量为邻边作平行四边形，对角线同样表示和向量。',
    viewBox: '-0.5 -2.3 5.4 4.3',
    draw: function (h) {
      return [
        n('line', { class: 'hl', x1: '0', y1: '0', x2: '3.05', y2: '-1' }),
        n('line', { class: 'hl', x1: '2.6', y1: '1.5', x2: '3.05', y2: '-1' }),
        n('line', { class: 'vec', x1: '0', y1: '0', x2: '2.45', y2: '-1', 'marker-end': 'url(#arrowhead)' }),
        n('line', { class: 'vec', x1: '0', y1: '0', x2: '2.55', y2: '1.5', 'marker-end': 'url(#arrowhead)' }),
        n('line', { class: 'vec', x1: '0', y1: '0', x2: '2.9', y2: '-1', 'marker-end': 'url(#arrowhead)' }),
        n('circle', { class: 'pt pt--solid', cx: '0', cy: '0', r: '0.07' }),
        n('circle', { class: 'pt pt--solid', cx: '2.6', cy: '-1', r: '0.07' }),
        n('circle', { class: 'pt pt--solid', cx: '2.6', cy: '1.5', r: '0.07' }),
        n('text', { class: 'lbl', x: '-0.22', y: '0.2' }, 'O'),
        n('text', { class: 'lbl--sm', x: '1.2', y: '-0.5' }, 'a'),
        n('text', { class: 'lbl--sm', x: '1.0', y: '1.0' }, 'b'),
        n('text', { class: 'lbl--sm', x: '1.75', y: '-0.72' }, 'a+b'),
        n('text', { class: 'lbl--sm', x: '1.3', y: '1.95' }, '平行四边形法则')
      ];
    }
  });

  /* 图 2：向量的坐标表示 */
  add('c9-vector-coord', {
    title: '向量的坐标表示',
    caption: '在 \\(x\\) 轴、\\(y\\) 轴正方向上分别取单位向量 \\(\\vec i\\)、\\(\\vec j\\)，则 \\(\\vec a=\\overrightarrow{OA}=x\\vec i+y\\vec j\\)，点 \\(A\\) 的坐标 \\((x,y)\\) 就是向量 \\(\\vec a\\) 的坐标。',
    coord: { x: [-0.9, 3.9], y: [-1.2, 2.6], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [
          h.arrow(0, 0, 1, 0),
          h.arrow(0, 0, 0, 1),
          h.vline(3, { from: 0, to: 2, cls: 'hl' }),
          h.hline(2, { from: 0, to: 3, cls: 'hl' }),
          h.seg(0, 0, 3, 0),
          h.seg(3, 0, 3, 2)
        ],
        h.arrow(0, 0, 2.9, 2),
        h.dot(3, 2, { label: 'A(3,2)', dx: -0.1, dy: 0.45 }),
        h.text(0.82, -0.28, 'i', 'lbl--sm'),
        h.text(-0.24, 0.85, 'j', 'lbl--sm'),
        h.text(1.35, 1.3, 'a=(3,2)', 'lbl--sm')
      );
    }
  });

  /* 图 3：数量积与投影 */
  add('c9-dot-projection', {
    title: '数量积的几何意义：投影',
    caption: '把 \\(\\vec b\\) 投影到 \\(\\vec a\\) 的方向上，投影数量为 \\(|\\vec b|\\cos\\theta\\)；于是 \\(\\vec a\\cdot\\vec b=|\\vec a|\\times(\\text{投影数量})\\)。',
    coord: { x: [-0.8, 4.4], y: [-1.5, 2.8], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [
          h.seg(0, 0, 2.25, 0),
          h.vline(1.8, { from: 0, to: 1.2, cls: 'hl' }),
          h.seg(1.8, 1.2, 2.25, 0),
          h.arrow(0, 0, 4, 0),
          h.arrow(0, 0, 3.6, 2.4),
          h.angleArc(0, 0, 0.7, 0, Math.atan2(2.4, 3.6)),
          h.rightAngle(1.8, 1.2, 'left', { size: 0.24 })
        ],
        h.dot(3.6, 2.4, { label: 'B', dx: 0.1, dy: 0.4 }),
        h.dot(4, 0, { label: 'A', dx: 0.05, dy: 0.42 }),
        h.text(0.92, 0.2, 'θ', 'lbl--sm'),
        h.text(2.75, 0.4, 'b', 'lbl--sm'),
        h.text(0.85, -0.35, '投影 |b|cosθ', 'lbl--sm'),
        h.text(-0.28, -0.28, 'O', 'lbl--sm')
      );
    }
  });

  /* 图 4：三点共线的向量判定 */
  add('c9-collinear', {
    title: '三点共线的向量判定',
    caption: '若 \\(\\overrightarrow{AC}=2\\overrightarrow{CB}\\)，则 \\(A\\)、\\(B\\)、\\(C\\) 三点共线，且 \\(C\\) 在线段 \\(AB\\) 上，满足 \\(\\overrightarrow{OC}=\\frac13\\overrightarrow{OA}+\\frac23\\overrightarrow{OB}\\)。',
    viewBox: '-0.6 -1.5 6.2 5.6',
    draw: function (h) {
      return [
        n('line', { class: 'shape', x1: '1', y1: '1.8', x2: '4.4', y2: '0.6' }),
        n('line', { class: 'hl', x1: '0.6', y1: '3.8', x2: '1', y2: '1.8' }),
        n('line', { class: 'hl', x1: '0.6', y1: '3.8', x2: '2.133', y2: '1.4' }),
        n('line', { class: 'hl', x1: '0.6', y1: '3.8', x2: '4.4', y2: '0.6' }),
        n('circle', { class: 'pt pt--solid', cx: '1', cy: '1.8', r: '0.075' }),
        n('circle', { class: 'pt pt--solid', cx: '2.133', cy: '1.4', r: '0.075' }),
        n('circle', { class: 'pt pt--solid', cx: '4.4', cy: '0.6', r: '0.075' }),
        n('circle', { class: 'pt pt--solid', cx: '0.6', cy: '3.8', r: '0.075' }),
        n('text', { class: 'lbl', x: '0.45', y: '2.15' }, 'A'),
        n('text', { class: 'lbl', x: '2.3', y: '1.15' }, 'C'),
        n('text', { class: 'lbl', x: '4.55', y: '0.8' }, 'B'),
        n('text', { class: 'lbl', x: '0.3', y: '4.05' }, 'O'),
        n('text', { class: 'lbl--sm', x: '1.25', y: '1.4' }, 'AC'),
        n('text', { class: 'lbl--sm', x: '3.4', y: '0.82' }, 'CB'),
        n('text', { class: 'lbl--sm', x: '2.25', y: '2.9' }, 'c=(1/3)a+(2/3)b')
      ];
    }
  });
})();
