/*!
 * fig-14.js —— 第 14 章「排列组合」简图
 * 简图 id：c14-count-tree、c14-pascal、c14-stars-bars
 * 说明：方式 B（viewBox）与 SVG 一致，y 轴向下；矩形用负 y 与正 height 表示向上生长。
 *       图内文字标签写成纯文本或 Unicode 记号（SVG 文本不支持 MathML）。
 */
(function () {
  'use strict';
  if (!window.DSHFig) { return; }
  var add = DSHFig.add, n = DSHFig.n;

  /* ---------- 分步乘法计数原理的树状图：上衣 3 × 长裤 2 × 运动鞋 2 ---------- */
  add('c14-count-tree', {
    title: '分步乘法计数原理的树状图',
    caption: '搭配一套衣服需依次完成 3 步：选上衣 3 种、选长裤 2 种、选运动鞋 2 种，故共有 \\(3\\times2\\times2=12\\) 种不同的搭配。',
    viewBox: '0.3 -0.7 8.9 5.3',
    draw: function (h) {
      var topY = [0, 1.8, 3.6];
      var pantY = [0, 0.66, 1.44, 2.1, 2.88, 3.54];
      var shoeY = [0, 0.36, 0.72, 1.08, 1.44, 1.8, 2.16, 2.52, 2.88, 3.24, 3.6, 3.96];
      var xt = 1.2, xp = 4.4, xs = 7.6, out = [], i, j, k, m = 0;
      /* 上衣 → 长裤 */
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 2; j++) {
          out.push(n('line', { class: 'ax', x1: String(xt), y1: String(topY[i]), x2: String(xp), y2: String(pantY[i * 2 + j]) }));
        }
      }
      /* 长裤 → 运动鞋 */
      for (j = 0; j < 6; j++) {
        for (k = 0; k < 2; k++) {
          out.push(n('line', { class: 'ax', x1: String(xp), y1: String(pantY[j]), x2: String(xs), y2: String(shoeY[m]) }));
          m++;
        }
      }
      /* 节点 */
      for (i = 0; i < 3; i++) { out.push(n('circle', { class: 'pt--solid', cx: String(xt), cy: String(topY[i]), r: '0.10' })); }
      for (j = 0; j < 6; j++) { out.push(n('circle', { class: 'pt--solid', cx: String(xp), cy: String(pantY[j]), r: '0.10' })); }
      for (k = 0; k < 12; k++) { out.push(n('circle', { class: 'pt--solid', cx: String(xs), cy: String(shoeY[k]), r: '0.10' })); }
      /* 文字标注 */
      out.push(n('text', { class: 'lbl', x: '0.85', y: '-0.35' }, '3'));
      out.push(n('text', { class: 'lbl', x: '3.7', y: '-0.35' }, '2'));
      out.push(n('text', { class: 'lbl', x: '7.05', y: '-0.35' }, '2'));
      out.push(n('text', { class: 'lbl--sm', x: '0.85', y: '0.4' }, 'A₁'));
      out.push(n('text', { class: 'lbl--sm', x: '0.85', y: '2.2' }, 'A₂'));
      out.push(n('text', { class: 'lbl--sm', x: '0.85', y: '4.0' }, 'A₃'));
      out.push(n('text', { class: 'lbl--sm', x: '3.4', y: '-0.02' }, 'B₁'));
      out.push(n('text', { class: 'lbl--sm', x: '3.4', y: '0.7' }, 'B₂'));
      out.push(n('text', { class: 'lbl--sm', x: '4.75', y: '0.42' }, 'C₁'));
      out.push(n('text', { class: 'lbl--sm', x: '4.75', y: '0.78' }, 'C₂'));
      out.push(n('text', { class: 'lbl--sm', x: '6.62', y: '-0.02' }, '第1种'));
      out.push(n('text', { class: 'lbl--sm', x: '6.62', y: '4.02' }, '第12种'));
      out.push(n('text', { class: 'lbl--sm', x: '3.1', y: '4.5' }, '上衣 → 长裤 → 运动鞋，每一步都完成才算一种搭配'));
      return out;
    }
  });

  /* ---------- 杨辉三角 —— 组合数性质 C(n,k)=C(n-1,k-1)+C(n-1,k) ---------- */
  add('c14-pascal', {
    title: '杨辉三角与组合数性质',
    caption: '三角中除两腰外的每个数都等于它肩上两数之和，即 \\(C_n^k=C_{n-1}^{k-1}+C_{n-1}^{k}\\)；两腰均为 1 体现了 \\(C_n^0=C_n^n=1\\)，每行左右对称体现了 \\(C_n^k=C_n^{n-k}\\)。',
    viewBox: '-3.9 -0.75 7.8 7.45',
    draw: function (h) {
      var rows = [
        ['1'],
        ['1', '1'],
        ['1', '2', '1'],
        ['1', '3', '3', '1'],
        ['1', '4', '6', '4', '1'],
        ['1', '5', '10', '10', '5', '1']
      ];
      var out = [], r, c, dx;
      for (r = 0; r < rows.length; r++) {
        for (c = 0; c < rows[r].length; c++) {
          dx = r * 0.62;
          /* 高亮肩上两数 3 与 3，说明它们之和为下一行的 6 */
          var hot = (r === 3 && (c === 1 || c === 2));
          out.push(n('text', {
            class: hot ? 'lbl' : 'lbl--sm',
            x: String(dx + (c - (rows[r].length - 1) / 2) * 1.3),
            y: String(r * 1.15)
          }, rows[r][c]));
        }
      }
      out.push(n('text', { class: 'lbl--sm', x: '-3.6', y: '6.2', 'text-anchor': 'start' }, 'n=0'));
      out.push(n('text', { class: 'lbl--sm', x: '-3.6', y: '5.05', 'text-anchor': 'start' }, 'n=1'));
      out.push(n('text', { class: 'lbl--sm', x: '-3.6', y: '3.9', 'text-anchor': 'start' }, 'n=2'));
      out.push(n('text', { class: 'lbl--sm', x: '-3.6', y: '2.75', 'text-anchor': 'start' }, 'n=3'));
      out.push(n('text', { class: 'lbl--sm', x: '-3.6', y: '1.6', 'text-anchor': 'start' }, 'n=4'));
      out.push(n('text', { class: 'lbl--sm', x: '-3.6', y: '0.45', 'text-anchor': 'start' }, 'n=5'));
      out.push(n('text', { class: 'lbl--sm', x: '0', y: '7.1' }, '每行从左到右依次是 C(n,0), C(n,1), …, C(n,n)'));
      return out;
    }
  });

  /* ---------- 隔板法：7 个相同小球分给 3 个不同盒子，每盒至少 1 个 ---------- */
  add('c14-stars-bars', {
    title: '隔板法（相同元素的分组）',
    caption: '把 7 个相同小球排成一行，用 2 块隔板把它们分成 3 份，每份对应一个盒子中的球数；在两两小球之间的 6 个空隙中选 2 个放隔板，故共有 \\(C_6^2=\\dfrac{6\\times5}{2}=15\\) 种分法。',
    viewBox: '0.2 -1.3 8.6 4.1',
    draw: function (h) {
      var out = [], i, cx = 0.7;
      for (i = 0; i < 7; i++) {
        out.push(n('circle', { class: 'shape', cx: String(cx), cy: '0', r: '0.16' }));
        cx += 0.66;
      }
      out.push(n('line', { class: 'shape--dark', x1: '1.69', y1: '0.52', x2: '1.69', y2: '-0.52' }));
      out.push(n('line', { class: 'shape--dark', x1: '3.67', y1: '0.52', x2: '3.67', y2: '-0.52' }));
      out.push(n('text', { class: 'lbl', x: '0.7', y: '1.05' }, '∗₁'));
      out.push(n('text', { class: 'lbl', x: '2.02', y: '1.05' }, '∗₂'));
      out.push(n('text', { class: 'lbl', x: '3.9', y: '1.05' }, '∗₆'));
      out.push(n('text', { class: 'lbl', x: '5.6', y: '1.05' }, '⋯'));
      out.push(n('text', { class: 'lbl--sm', x: '2.62', y: '-0.95' }, '第 1 个盒子'));
      out.push(n('text', { class: 'lbl--sm', x: '4.62', y: '-0.35' }, '第 2 个盒子'));
      out.push(n('text', { class: 'lbl--sm', x: '6.05', y: '-0.35' }, '第 3 个盒子'));
      out.push(n('text', { class: 'lbl--sm', x: '1.69', y: '-1.05' }, '隔板'));
      out.push(n('text', { class: 'lbl--sm', x: '3.67', y: '-1.05' }, '隔板'));
      return out;
    }
  });
})();
