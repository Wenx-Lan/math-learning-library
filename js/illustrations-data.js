/*!
 * illustrations-data.js —— 通用简图原语（各章简图可直接引用这些 id）
 * 具体章节的简图放在 js/data/fig-<章号>.js 中。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add;
  var n = DSHFig.n;

  /* ---------- 坐标系原语：直角坐标平面 ---------- */
  add('sys-axes', {
    title: '直角坐标系',
    caption: '以 x 轴、y 轴为参照，函数图像就是满足 y=f(x) 的点集。',
    coord: { x: [-4, 4], y: [-3, 3], grid: 1, pad: 0.5 },
    draw: function (h) {
      return h.axes({ origin: true, ticks: true });
    }
  });

  /* ---------- 数轴 ---------- */
  add('num-line', {
    title: '数轴表示集合',
    caption: '实心点表示取到该端点，空心点表示取不到；箭头方向即解集方向。',
    viewBox: '-4.3 -1.5 8.6 3',
    draw: function (h) {
      return [
        n('line', { class: 'ax', x1: '-4', y1: '0', x2: '4', y2: '0' }),
        n('path', { class: 'ax', d: 'M4 0 L3.6 0.16 M4 0 L3.6 -0.16', fill: 'none' }),
        h.text(-3.6, -0.42, '-3', 'lbl--sm'),
        h.text(-2, -0.42, '-2', 'lbl--sm'),
        h.text(-1, -0.42, '-1', 'lbl--sm'),
        h.text(0, -0.42, '0', 'lbl--sm'),
        h.text(1, -0.42, '1', 'lbl--sm'),
        h.text(2, -0.42, '2', 'lbl--sm'),
        h.text(3, -0.42, '3', 'lbl--sm')
      ];
    }
  });

  /* ---------- 韦恩图 ---------- */
  add('venn-two', {
    title: '两个集合的韦恩图',
    caption: '两个圆的公共部分就是 A∩B；两圆合起来是 A∪B。',
    viewBox: '-3.4 -2.4 6.8 4.8',
    draw: function (h) {
      return [
        n('circle', { class: 'shape', cx: '-0.85', cy: '0', r: '1.7' }),
        n('circle', { class: 'shape', cx: '0.85', cy: '0', r: '1.7' }),
        h.text(-1.85, 1.95, 'A', 'lbl'),
        h.text(1.85, 1.95, 'B', 'lbl'),
        h.text(0, 0, 'A∩B', 'lbl--sm')
      ];
    }
  });

  /* ---------- 全称量词示意 ---------- */
  add('logic-implication', {
    title: '充分条件与必要条件',
    caption: 'p⇒q：p 的集合包含于 q 的集合，p 是 q 的充分条件，q 是 p 的必要条件。',
    viewBox: '-3.4 -2.2 6.8 4.2',
    draw: function (h) {
      return [
        n('circle', { class: 'shape', cx: '0', cy: '-0.15', r: '1.75' }),
        n('circle', { class: 'shape--dark', cx: '0', cy: '-0.55', r: '1.0' }),
        h.text(0, -0.6, 'p', 'lbl'),
        h.text(0, 1.55, 'q', 'lbl'),
        h.text(1.55, -1.15, 'p⇒q', 'lbl--sm')
      ];
    }
  });

  /* ---------- 直角三角形（基本不等式、解三角形通用） ---------- */
  add('right-triangle-generic', {
    title: '直角三角形',
    caption: '勾股定理 a²+b²=c² 与射影关系是许多不等式、解三角形结论的几何来源。',
    viewBox: '-0.6 -3.2 5.2 4.2',
    draw: function (h) {
      return [
        n('path', { class: 'shape', d: 'M0 0 L3 0 L3 -2.2 Z' }),
        h.rightAngle(3, 0, 'left', { size: 0.3 }),
        h.text(1.5, -0.35, 'b', 'lbl--sm'),
        h.text(3.15, -1.1, 'a', 'lbl--sm', 'start'),
        h.text(1.3, -1.35, 'c', 'lbl--sm')
      ];
    }
  });

  /* ---------- 单位圆定义（三角、向量通用） ---------- */
  add('unit-circle-def', {
    title: '单位圆与三角函数定义',
    caption: '设 P(cos α, sin α) 为单位圆上一点，则 cos α、sin α 分别是 P 的横、纵坐标。',
    coord: { x: [-1.6, 1.8], y: [-1.5, 1.6], grid: 1, pad: 0.35 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [h.circle(0, 0, 1, { cls: 'curve--soft' })],
        h.seg(0, 0, 0.82, 0.57),
        h.dot(0.82, 0.57, { label: 'P', dx: 0.18, dy: 0.3 }),
        h.vline(0.82, { from: 0, to: 0.57 }),
        h.seg(0, 0, 0.82, 0),
        h.angleArc(0, 0, 0.42, 0, Math.atan2(0.57, 0.82)),
        h.text(0.52, 0.12, 'α', 'lbl--sm'),
        h.text(0.44, 0.75, 'sin α', 'lbl--sm'),
        h.text(0.4, -0.34, 'cos α', 'lbl--sm')
      );
    }
  });

  /* ---------- 正弦曲线（三角函数、导数通用） ---------- */
  add('sin-curve', {
    title: '正弦曲线',
    caption: 'y=sin x 是最典型的周期函数：周期 2π，关于 x=π/2 对称，值域 [-1,1]。',
    coord: { x: [-0.7, 7.0], y: [-1.6, 1.8], grid: Math.PI / 2, pad: 0.3 },
    draw: function (h) {
      return [].concat(
        h.axes({ origin: true, ticks: false }),
        [h.fn(function (x) { return Math.sin(x); })],
        h.dot(Math.PI / 2, 1, { label: 'π/2', dy: 0.35 }),
        h.dot(Math.PI, 0, { label: 'π', dy: -0.3 }),
        h.dot(3 * Math.PI / 2, -1, { label: '3π/2', dy: -0.3 }),
        h.dot(2 * Math.PI, 0, { label: '2π', dy: -0.3 }),
        h.hline(1, { cls: 'hl' }),
        h.hline(-1, { cls: 'hl' })
      );
    }
  });

  /* ---------- 三棱锥（立体几何、空间向量通用） ---------- */
  add('tetrahedron', {
    title: '三棱锥',
    caption: '底面为三角形、侧面全为三角形的多面体，是体积与空间角问题中最常见的载体。',
    viewBox: '-0.4 -3.6 5.4 4.2',
    draw: function () {
      return [
        n('path', { class: 'shape--dark', d: 'M0.3 0 L4.3 0 L2.6 -1.25 Z' }),
        n('path', { class: 'shape', d: 'M0.3 0 L4.3 0 L2.3 -3.1 Z' }),
        n('path', { class: 'shape', d: 'M4.3 0 L2.3 -3.1 L2.6 -1.25 Z' }),
        n('path', { class: 'hl', d: 'M0.3 0 L2.6 -1.25', fill: 'none' }),
        n('path', { class: 'hl', d: 'M2.3 -3.1 L2.6 -1.25', fill: 'none' }),
        n('text', { x: '-0.15', y: '0.2', class: 'lbl' }, 'A'),
        n('text', { x: '4.45', y: '0.2', class: 'lbl' }, 'B'),
        n('text', { x: '2.7', y: '-0.95', class: 'lbl' }, 'C'),
        n('text', { x: '2.3', y: '-3.35', class: 'lbl' }, 'D')
      ];
    }
  });

  /* ---------- 球（立体几何通用） ---------- */
  add('sphere', {
    title: '球与截面',
    caption: '球心到截面圆圆心的连线垂直于该截面，故 R²=r²+d²。',
    viewBox: '-2.6 -2.4 5.2 4.4',
    draw: function (h) {
      return [
        n('circle', { class: 'shape', cx: '0', cy: '0', r: '2' }),
        n('ellipse', { class: 'curve--soft', cx: '0', cy: '0.55', rx: '1.8', ry: '0.62' }),
        n('line', { class: 'ax', x1: '0', y1: '0', x2: '0', y2: '0.55' }),
        n('line', { class: 'ax', x1: '0', y1: '0.55', x2: '1.35', y2: '1.25' }),
        n('line', { class: 'ax', x1: '0', y1: '0', x2: '1.35', y2: '1.25' }),
        h.text(1.55, 1.2, 'R', 'lbl--sm', 'start'),
        h.text(0.1, 0.15, 'd', 'lbl--sm', 'start'),
        h.text(0.78, 0.82, 'r', 'lbl--sm', 'start'),
        h.dot(0, 0, {})
      ];
    }
  });
})();
