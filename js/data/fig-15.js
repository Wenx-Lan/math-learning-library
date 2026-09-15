/*!
 * fig-15.js —— 第 15 章「统计」简图
 * 简图 id：c15-histogram、c15-regression、c15-chi-square
 * 说明：方式 A（coord）使用数学坐标，y 轴向上；方式 B（viewBox）与 SVG 一致，y 轴向下。
 *       图内文字标签写成纯文本或 Unicode 记号（如 x̄、χ²、ŷ），SVG 文本不支持 MathML。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 频率分布直方图（纵轴为 频率/组距） ---------- */
  add('c15-histogram', {
    title: '频率分布直方图',
    caption: '纵轴是 \\(\\dfrac{\\text{频率}}{\\text{组距}}\\)，所以每个小矩形的面积等于该组的频率，所有矩形面积之和为 1；此图的平均数估计值为 \\(\\bar x\\approx76\\)。',
    coord: { x: [-0.5, 5.5], y: [0, 5], grid: 0, pad: 0.6 },
    draw: function (h) {
      var fr = [0.05, 0.15, 0.40, 0.30, 0.10];
      var bounds = [50, 60, 70, 80, 90, 100];
      var out = [], i;
      for (i = 0; i < 5; i++) {
        var hh = fr[i] * 10; // 频率/组距 ×100（显示缩放）
        out.push(h.poly([[i, 0], [i + 1, 0], [i + 1, hh], [i, hh]], { cls: 'shape', close: true }));
        out.push(h.text(i + 0.5, hh + 0.22, String(fr[i]), 'lbl--sm'));
      }
      for (i = 0; i < 6; i++) {
        out.push(h.text(i, -0.42, String(bounds[i]), 'lbl--sm'));
      }
      out.push(h.text(2.5, 4.7, '纵轴：频率/组距（显示缩放 ×100）', 'lbl--sm'));
      return out;
    }
  });

  /* ---------- 散点图与回归直线必过样本中心 ---------- */
  add('c15-regression', {
    title: '回归直线经过样本中心',
    caption: '6 组数据的样本中心为 \\((\\bar x,\\bar y)=(3.5,6)\\)，回归直线 \\(\\hat y=1.6x+0.4\\) 一定经过该点。',
    coord: { x: [0, 7], y: [0, 12.5], grid: 1, pad: 0.5 },
    draw: function (h) {
      var pts = [[1, 2], [2, 4], [3, 5], [4, 6], [5, 8], [6, 11]];
      var out = [
        h.axes({ origin: true, ticks: true, grid: false, xlabel: 'x', ylabel: 'y' }),
        h.fn(function (x) { return 1.6 * x + 0.4; }, { from: 0.55, to: 6.8 }),
        h.vline(3.5, { from: 0, to: 6 }),
        h.hline(6, { from: 0, to: 3.5 })
      ];
      var i;
      for (i = 0; i < pts.length; i++) { out.push(h.dot(pts[i][0], pts[i][1])); }
      out.push(h.dot(3.5, 6, { solid: true, r: 0.14, label: '(3.5, 6)', dx: 0.28, dy: -0.45 }));
      out.push(h.text(0.75, 11.7, 'ŷ = 1.6x + 0.4', 'lbl--sm', 'start'));
      return out;
    }
  });

  /* ---------- 独立性检验：2×2 列联表与等高条形图 ---------- */
  add('c15-chi-square', {
    title: '独立性检验与等高条形图',
    caption: '由列联表算得 \\(\\chi^2=\\dfrac{n(ad-bc)^2}{(a+b)(c+d)(a+c)(b+d)}=\\dfrac{90\\times200^2}{40\\times50\\times58\\times32}=\\dfrac{225}{232}\\approx0.970\\)，远小于 2.706，' +
      '故不能认为学校与成绩有关联；右侧等高条形图显示两组中「优秀」所占比例分别为 70% 与 60%，差异并不悬殊，与 χ² 偏小的结论一致。',
    viewBox: '0.2 -1.05 10.4 5.7',
    draw: function (h) {
      var out = [], i;
      function cell(col, row, txt, cls) {
        return n('text', { class: cls || 'lbl--sm', x: String(col), y: String(row) }, txt);
      }
      /* 列联表外框（3 行 4 列） */
      out.push(n('rect', { class: 'shape', x: '0.6', y: '0', width: '5.8', height: '2.4', fill: 'none' }));
      out.push(n('line', { class: 'ax', x1: '0.6', y1: '0.6', x2: '6.4', y2: '0.6' }));
      out.push(n('line', { class: 'ax', x1: '0.6', y1: '1.2', x2: '6.4', y2: '1.2' }));
      out.push(n('line', { class: 'ax', x1: '0.6', y1: '1.8', x2: '6.4', y2: '1.8' }));
      out.push(n('line', { class: 'ax', x1: '1.9', y1: '0', x2: '1.9', y2: '2.4' }));
      out.push(n('line', { class: 'ax', x1: '4.2', y1: '0', x2: '4.2', y2: '2.4' }));
      out.push(n('line', { class: 'ax', x1: '5.3', y1: '0', x2: '5.3', y2: '2.4' }));
      /* 表头 */
      out.push(cell(1.25, '0.42', ''));
      out.push(cell(3.05, '0.42', '优秀'));
      out.push(cell(4.75, '0.42', '非优秀'));
      out.push(cell(5.85, '0.42', '合计'));
      /* 数据 */
      out.push(cell(1.25, '1.02', '甲校'));
      out.push(cell(3.05, '1.02', '28'));
      out.push(cell(4.75, '1.02', '12'));
      out.push(cell(5.85, '1.02', '40'));
      out.push(cell(1.25, '1.62', '乙校'));
      out.push(cell(3.05, '1.62', '30'));
      out.push(cell(4.75, '1.62', '20'));
      out.push(cell(5.85, '1.62', '50'));
      out.push(cell(1.25, '2.22', '合计'));
      out.push(cell(3.05, '2.22', '58'));
      out.push(cell(4.75, '2.22', '32'));
      out.push(cell(5.85, '2.22', '90'));
      /* 等高条形图：两个等高的条形，按"优秀"比例切分 */
      out.push(n('line', { class: 'ax', x1: '8.1', y1: '0', x2: '8.1', y2: '-3.5' }));
      out.push(n('line', { class: 'ax', x1: '8.1', y1: '0', x2: '10.4', y2: '0' }));
      /* 甲校：优秀 28 人（70%）在下，非优秀 12 人（30%）在上 */
      out.push(n('rect', { class: 'shape', x: '8.5', y: '0', width: '0.75', height: '2.45' }));
      out.push(n('rect', { class: 'shape--dark', x: '8.5', y: '-2.45', width: '0.75', height: '1.05' }));
      out.push(n('text', { class: 'lbl--sm', x: '8.875', y: '-1.95' }, '12'));
      out.push(n('text', { class: 'lbl--sm', x: '8.875', y: '-0.45' }, '28'));
      /* 乙校：优秀 30 人（60%）在下，非优秀 20 人（40%）在上 */
      out.push(n('rect', { class: 'shape', x: '9.6', y: '0', width: '0.75', height: '2.1' }));
      out.push(n('rect', { class: 'shape--dark', x: '9.6', y: '-2.1', width: '0.75', height: '1.4' }));
      out.push(n('text', { class: 'lbl--sm', x: '9.975', y: '-1.6' }, '20'));
      out.push(n('text', { class: 'lbl--sm', x: '9.975', y: '-0.45' }, '30'));
      out.push(n('text', { class: 'lbl--sm', x: '8.875', y: '0.42' }, '甲校'));
      out.push(n('text', { class: 'lbl--sm', x: '9.975', y: '0.42' }, '乙校'));
      out.push(n('text', { class: 'lbl--sm', x: '8.1', y: '-3.85' }, '0'));
      out.push(n('text', { class: 'lbl--sm', x: '9.5', y: '-3.85' }, '100%'));
      out.push(n('text', { class: 'lbl--sm', x: '8.75', y: '-4.35', 'text-anchor': 'start' }, '每根条形均表示 100%，浅色段为优秀'));
      return out;
    }
  });
})();
