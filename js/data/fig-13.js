/*!
 * fig-13.js —— 第 13 章「概率」简图
 * 简图 id：c13-sample-tree、c13-conditional、c13-normal-curve、c13-binomial
 * 说明：方式 A（coord）使用数学坐标，y 轴向上；方式 B（viewBox）与 SVG 一致，y 轴向下，
 *       矩形用负 y 与正 height 表示向上生长。
 *       图内文字标签用 n('text') / h.text() 直接给出，SVG 文本不支持 MathML，
 *       因此标签统一写成纯文本或 Unicode 记号（如 μ、σ、P(B|A)=1/5）。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 样本空间树状图：连掷三次硬币 ---------- */
  add('c13-sample-tree', {
    title: '样本空间的树状图表示',
    caption: '每一条从根到叶的路径对应一个样本点，共 \\(2\\times2\\times2=8\\) 个等可能样本点，其中「恰好两次正面」含 3 个，故概率为 \\(\\dfrac{3}{8}\\)。',
    viewBox: '-0.5 -4.2 11 8.4',
    draw: function (h) {
      var nodes = [], i;
      var lv1 = [-1.75, 1.75];
      var lv2 = [-2.625, -0.875, 0.875, 2.625];
      var leaves = [-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5];
      var outcomes = ['正正正', '正正反', '正反正', '正反反', '反正正', '反正反', '反反正', '反反反'];
      function L(x1, y1, x2, y2) { return n('line', { class: 'ax', x1: String(x1), y1: String(y1), x2: String(x2), y2: String(y2) }); }

      nodes.push(L(0.2, 0, 2.5, lv1[0]), L(0.2, 0, 2.5, lv1[1]));
      nodes.push(L(2.5, lv1[0], 5, lv2[0]), L(2.5, lv1[0], 5, lv2[1]));
      nodes.push(L(2.5, lv1[1], 5, lv2[2]), L(2.5, lv1[1], 5, lv2[3]));
      for (i = 0; i < 4; i++) {
        nodes.push(L(5, lv2[i], 7.5, leaves[2 * i]), L(5, lv2[i], 7.5, leaves[2 * i + 1]));
      }

      nodes.push(h.text('0.2', '0.38', '开始', 'lbl'));
      nodes.push(h.text('1.35', '-1.0', '正', 'lbl--sm'));
      nodes.push(h.text('1.35', '1.05', '反', 'lbl--sm'));
      nodes.push(h.text('3.75', '-1.85', '正', 'lbl--sm'));
      nodes.push(h.text('3.75', '-0.35', '反', 'lbl--sm'));
      nodes.push(h.text('3.75', '0.5', '正', 'lbl--sm'));
      nodes.push(h.text('3.75', '1.9', '反', 'lbl--sm'));

      for (i = 0; i < 8; i++) {
        nodes.push(n('circle', { class: 'pt--solid', cx: '7.5', cy: String(leaves[i]), r: '0.08' }));
        nodes.push(h.text('7.75', String(leaves[i] + 0.28), outcomes[i] + '（1/8）', 'lbl--sm', 'start'));
      }
      return nodes;
    }
  });

  /* ---------- 条件概率：缩小样本空间 / 缩小基本事件数 ---------- */
  add('c13-conditional', {
    title: '条件概率：缩小基本事件数',
    caption: '同时掷两枚骰子，两枚骰子出现的点数分别记作 \\(x\\) 与 \\(y\\)；\\(A=\\{(x,y)\\mid x+y=6\\}\\) 含 5 个基本事件，\\(B=\\{(x,y)\\mid x=3\\}\\)。由 \\(n(AB)=1\\)、\\(n(A)=5\\) 得 \\(P(B\\mid A)=\\dfrac{1}{5}\\)。',
    viewBox: '0.7 -0.8 6.9 4.6',
    draw: function (h) {
      var out = [], i, j;
      var rx = 1.9, ry = 3.4, step = 0.75;
      /* 两事件划分出的四块矩形（外框） */
      out.push(n('rect', { class: 'shape', x: '1.9', y: '0', width: '2.25', height: '3.4', fill: 'none' }));
      out.push(n('rect', { class: 'fill-soft', x: '4.15', y: '0', width: '1.5', height: '3.4' }));
      out.push(n('rect', { class: 'shape', x: '1.9', y: '3.4', width: '2.25', height: '0.75', fill: 'none' }));
      out.push(n('rect', { class: 'shape', x: '4.15', y: '3.4', width: '1.5', height: '0.75', fill: 'none' }));
      /* 16 个基本事件 */
      for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
          var cx = (rx + (j + 0.5) * step).toFixed(3);
          var cy = (ry - (i + 0.5) * step).toFixed(3);
          if (i === 1 && j === 2) {
            out.push(n('circle', { class: 'pt--solid', cx: cx, cy: cy, r: '0.16' }));
          } else {
            out.push(n('circle', { class: 'pt', cx: cx, cy: cy, r: '0.085' }));
          }
        }
      }
      /* 骰子点数刻度 */
      for (i = 0; i < 4; i++) {
        out.push(n('text', { class: 'lbl--sm', x: (rx + (i + 0.5) * step).toFixed(3), y: '3.95' }, String(i + 1)));
        out.push(n('text', { class: 'lbl--sm', x: '1.72', y: (ry - (i + 0.5) * step + 0.12).toFixed(3) }, String(i + 1)));
      }
      out.push(n('text', { class: 'lbl', x: '2.4', y: '4.45' }, 'D₁'));
      out.push(n('text', { class: 'lbl', x: '0.93', y: '2.2' }, 'D₂'));
      out.push(n('text', { class: 'lbl', x: '5.65', y: '0.35' }, 'A'));
      out.push(n('text', { class: 'lbl', x: '5.65', y: '4.1' }, 'Ā'));
      out.push(n('text', { class: 'lbl', x: '3.0', y: '4.45' }, 'A'));
      out.push(n('text', { class: 'lbl', x: '5.0', y: '4.45' }, 'Ā'));
      out.push(n('text', { class: 'lbl--sm', x: '5.05', y: '1.6' }, 'n(AB)=1'));
      out.push(n('text', { class: 'lbl--sm', x: '3.0', y: '1.72' }, 'n(A)=5'));
      return out;
    }
  });

  /* ---------- 正态分布曲线与 3σ 原则 ---------- */
  add('c13-normal-curve', {
    title: '正态曲线与 3σ 原则',
    caption: '正态密度曲线关于 \\(x=\\mu\\) 对称：\\(P(\\mu-\\sigma<X\\le\\mu+\\sigma)\\approx0.6827\\)，\\(P(\\mu-2\\sigma<X\\le\\mu+2\\sigma)\\approx0.9545\\)，\\(P(\\mu-3\\sigma<X\\le\\mu+3\\sigma)\\approx0.9973\\)。',
    coord: { x: [-3.6, 3.6], y: [0, 0.46], grid: 1, pad: 0.3 },
    draw: function (h) {
      return [
        h.axes({ origin: false, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return 0.4 * Math.exp(-x * x / 2); }),
        h.vline(-1, { from: 0, to: 0.4 * Math.exp(-0.5) }),
        h.vline(1, { from: 0, to: 0.4 * Math.exp(-0.5) }),
        h.vline(-2, { from: 0, to: 0.4 * Math.exp(-2) }),
        h.vline(2, { from: 0, to: 0.4 * Math.exp(-2) }),
        h.vline(-3, { from: 0, to: 0.4 * Math.exp(-4.5) }),
        h.vline(3, { from: 0, to: 0.4 * Math.exp(-4.5) }),
        h.text(0, 0.52, 'μ', 'lbl'),
        h.text(-1.05, 0.30, 'μ−σ', 'lbl--sm'),
        h.text(1.08, 0.30, 'μ+σ', 'lbl--sm'),
        h.text(-2.3, 0.115, 'μ−2σ', 'lbl--sm'),
        h.text(2.34, 0.115, 'μ+2σ', 'lbl--sm'),
        h.text(0, 0.09, '68.27%', 'lbl--sm')
      ];
    }
  });

  /* ---------- 二项分布 X~B(4,0.5) 的分布列条形图 ---------- */
  add('c13-binomial', {
    title: '二项分布 X~B(4,0.5) 的分布列',
    caption: '以 \\(X=k\\) 为横坐标、\\(P(X=k)=C_4^k(0.5)^4\\) 为纵坐标作条形图，各条形高度之和为 1，最高条形所对的 \\(k\\) 即为最可能取值。',
    coord: { x: [-0.6, 4.6], y: [0, 0.45], grid: 0, pad: 0.15 },
    draw: function (h) {
      var i, p = [0.0625, 0.25, 0.375, 0.25, 0.0625], out = [];
      for (i = 0; i < 5; i++) {
        out.push(h.poly([[i - 0.35, 0], [i + 0.35, 0], [i + 0.35, p[i]], [i - 0.35, p[i]]], { cls: 'shape', close: true }));
        out.push(h.text(i, p[i] + 0.05, String(p[i]), 'lbl--sm'));
        out.push(h.text(i, -0.16, String(i), 'lbl'));
      }
      return out;
    }
  });
})();
