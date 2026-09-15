/*!
 * illustrations.js —— 内联 SVG 简图工具库 + 简图注册表
 *
 * 设计约定（数据文件作者须知）：
 *   1) 每个简图登记为一个 scene：DSHFig.add(id, { title, caption, viewBox, draw });
 *   2) draw(h) 返回节点数组，使用 h 提供的数学坐标绘图函数；
 *   3) 数据文件里只需写 DSHFig.use(id)（或 DSHFig.row([id1, id2])）即可插入简图。
 */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var registry = {};

  /* ---------------- 基础节点 ---------------- */
  function n(tag, attrs, kids) {
    var e = document.createElementNS(NS, tag), k, i;
    if (attrs) {
      for (k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k) && attrs[k] != null) { e.setAttribute(k, attrs[k]); }
      }
    }
    if (kids) {
      if (!(kids instanceof Array)) { kids = [kids]; }
      for (i = 0; i < kids.length; i++) {
        if (kids[i] == null) { continue; }
        var c = kids[i];
        // SVG <text> 里不能放 <math>，所以文本标签中的 \( \) 需转成 Unicode 纯文本
        if (typeof c === 'string' && (tag === 'text' || tag === 'tspan')) { c = toU(c); }
        e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      }
    }
    return e;
  }

  /** HTML 实体 → 字符。数据文件用 &lt; &gt; &amp; 表示 < > &，SVG 文本里需还原。 */
  function decodeEntities(s) {
    var t = String(s);
    var named = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&nbsp;': ' ' };
    t = t.replace(/&(lt|gt|amp|quot|apos|#39|nbsp);/g, function (m, k) {
      return Object.prototype.hasOwnProperty.call(named, m) ? named[m] : m;
    });
    t = t.replace(/&#(\d+);/g, function (m, d) { var c = parseInt(d, 10); return isNaN(c) ? m : String.fromCharCode(c); });
    t = t.replace(/&#x([0-9a-fA-F]+);/g, function (m, d) { var c = parseInt(d, 16); return isNaN(c) ? m : String.fromCharCode(c); });
    return t;
  }

  /** LaTeX 片段 → Unicode 纯文本（供 SVG 标签使用） */
  function toU(s) {
    var M = global.DSHMath;
    var r;
    if (!M) { r = String(s); }
    else {
      try {
        r = M.labelToUnicode ? M.labelToUnicode(s) : (M.mathToUnicode ? M.mathToUnicode(s) : String(s));
      } catch (e) { r = String(s); }
    }
    return decodeEntities(r);
  }

  function num(v) {
    var x = Number(v);
    if (!isFinite(x)) { return '0'; }
    return (Math.round(x * 1000) / 1000).toString();
  }

  function pathFrom(pts) {
    if (!pts.length) { return ''; }
    var d = 'M ' + num(pts[0][0]) + ' ' + num(pts[0][1]);
    for (var i = 1; i < pts.length; i++) { d += ' L ' + num(pts[i][0]) + ' ' + num(pts[i][1]); }
    return d;
  }

  /* ---------------- 坐标系工厂 ---------------- */
  /**
   * h = coord({ x: [x0, x1], y: [y0, y1], grid: 1 })
   * 之后所有绘图都用数学坐标，y 轴向上为正。
   */
  function coord(opt) {
    opt = opt || {};
    var xr = opt.x || [-6, 6];
    var yr = opt.y || [-4, 4];
    var g = opt.grid == null ? 1 : opt.grid;
    var pad = opt.pad == null ? 0.5 : opt.pad;
    var x0 = xr[0], x1 = xr[1], y0 = yr[0], y1 = yr[1];
    var vb = [x0 - pad, -y1 - pad, (x1 - x0) + 2 * pad, (y1 - y0) + 2 * pad];

    function F(x, y) { return [x, -y]; }
    function P(x, y) { return num(x) + ' ' + num(-y); }

    function apply(node, cls) {
      if (cls && node.setAttribute) { node.setAttribute('class', cls); }
      return node;
    }

    var h = {
      viewBox: vb,
      x0: x0, x1: x1, y0: y0, y1: y1,
      F: F,
      map: P,

      /** 坐标轴（含刻度与可选标注） */
      axes: function (o) {
        o = o || {};
        var kids = [];
        kids.push(n('line', { class: 'ax', x1: num(x0 - pad * 0.6), y1: 0, x2: num(x1 + pad * 0.6), y2: 0 }));
        kids.push(n('line', { class: 'ax', x1: 0, y1: num(-(y0 - pad * 0.6)), x2: 0, y2: num(-(y1 + pad * 0.6)) }));
        var i;
        if (o.ticks !== false && g > 0) {
          for (i = Math.ceil(x0 / g) * g; i <= x1 + 1e-9; i += g) {
            if (Math.abs(i) < 1e-9) { continue; }
            kids.push(n('line', { class: 'ax', x1: num(i), y1: -0.09, x2: num(i), y2: 0.09 }));
          }
          for (i = Math.ceil(y0 / g) * g; i <= y1 + 1e-9; i += g) {
            if (Math.abs(i) < 1e-9) { continue; }
            kids.push(n('line', { class: 'ax', x1: -0.09, y1: num(-i), x2: 0.09, y2: num(-i) }));
          }
        }
        if (o.grid) {
          for (i = Math.ceil(x0 / g) * g; i <= x1 + 1e-9; i += g) {
            kids.push(n('line', { class: 'grid', x1: num(i), y1: num(-y0), x2: num(i), y2: num(-y1) }));
          }
          for (i = Math.ceil(y0 / g) * g; i <= y1 + 1e-9; i += g) {
            kids.push(n('line', { class: 'grid', x1: num(x0), y1: num(-i), x2: num(x1), y2: num(-i) }));
          }
        }
        var xl = o.xlabel === undefined ? 'x' : o.xlabel;
        var yl = o.ylabel === undefined ? 'y' : o.ylabel;
        if (xl) { kids.push(h.text(x1 + pad * 0.35, -0.35, xl, 'lbl')); }
        if (yl) { kids.push(h.text(0.35, y1 + pad * 0.4, yl, 'lbl')); }
        if (o.origin) { kids.push(h.text(-0.3, -0.35, 'O', 'lbl')); }
        return kids;
      },

      /** 函数曲线：samples 个点折线；支持分段（返回 null 跳过） */
      fn: function (f, o) {
        o = o || {};
        var a = o.from == null ? x0 : o.from;
        var b = o.to == null ? x1 : o.to;
        var steps = o.steps || 240;
        var pts = [], prevOk = false, i, x, y;
        for (i = 0; i <= steps; i++) {
          x = a + (b - a) * i / steps;
          y = f(x);
          if (typeof y !== 'number' || !isFinite(y)) { prevOk = false; continue; }
          var cy = Math.max(Math.min(y, (y1 - y0) * 30), -((y1 - y0) * 30));
          if (!prevOk && pts.length) { pts.push([null, null]); }
          pts.push([x, cy]);
          prevOk = true;
        }
        var d = '', started = false;
        for (i = 0; i < pts.length; i++) {
          if (pts[i][0] === null) { started = false; continue; }
          d += (started ? ' L ' : ' M ') + num(pts[i][0]) + ' ' + num(-pts[i][1]);
          started = true;
        }
        return n('path', { class: o.cls || 'curve', d: d });
      },

      /** 折线 */
      poly: function (pts, o) {
        o = o || {};
        var kids = [n('path', { class: o.cls || 'curve', d: pathFrom(pts.map(function (p) { return [p[0], -p[1]]; })) })];
        if (o.close) {
          var m = pts.map(function (p) { return [p[0], -p[1]]; });
          kids[0].setAttribute('d', pathFrom(m) + ' Z');
        }
        if (o.fill) { kids[0].setAttribute('fill', o.fill); }
        return kids;
      },

      /** 线段（数学坐标） */
      seg: function (ax, ay, bx, by, o) {
        o = o || {};
        return n('line', {
          class: o.cls || 'ax',
          x1: num(ax), y1: num(-ay), x2: num(bx), y2: num(-by)
        });
      },

      /** 圆的折线路径（数学坐标） */
      circle: function (cx, cy, r, o) {
        o = o || {};
        var pts = [], i, t, steps = o.steps || 96;
        for (i = 0; i <= steps; i++) {
          t = Math.PI * 2 * i / steps;
          pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
        }
        var d = 'M ' + pts.map(function (p) { return num(p[0]) + ' ' + num(-p[1]); }).join(' L ');
        return n('path', { class: o.cls || 'shape', d: d });
      },

      /** 由点列构成的圆滑闭合区域（简单的多边形填充） */
      region: function (pts, o) {
        o = o || {};
        var m = pts.map(function (p) { return [p[0], -p[1]]; });
        return n('path', { class: o.cls || 'fill-soft', d: pathFrom(m) + ' Z' });
      },

      /** 点 */
      dot: function (x, y, o) {
        o = o || {};
        var kids = [n('circle', { class: o.solid ? 'pt pt--solid' : 'pt', cx: num(x), cy: num(-y), r: o.r || 0.09 })];
        if (o.label) {
          kids.push(h.text(x + (o.dx == null ? 0.18 : o.dx), y + (o.dy == null ? 0.3 : o.dy), o.label, o.labelCls || 'lbl'));
        }
        return kids;
      },

      /** 文本（数学坐标，y 已翻转为 SVG 坐标，文字保持正向、不镜像） */
      text: function (x, y, str, cls, anchor) {
        var t = n('text', {
          x: num(x), y: num(-y),
          class: cls || 'lbl',
          'text-anchor': anchor || 'middle'
        }, str);
        return t;
      },

      /** 虚线辅助线 */
      vline: function (x, o) {
        o = o || {};
        return n('line', { class: o.cls || 'hl', x1: num(x), y1: num(-(o.from == null ? y0 : o.from)), x2: num(x), y2: num(-(o.to == null ? y1 : o.to)) });
      },
      hline: function (y, o) {
        o = o || {};
        return n('line', { class: o.cls || 'hl', x1: num(o.from == null ? x0 : o.from), y1: num(-y), x2: num(o.to == null ? x1 : o.to), y2: num(-y) });
      },

      /** 直角符号 */
      rightAngle: function (x, y, dir, o) {
        o = o || {};
        var s = o.size || 0.28;
        var dx = dir === 'left' ? -s : s, dy = dir === 'down' ? -s : s;
        var d = 'M ' + num(x + dx) + ' ' + num(-y) + ' L ' + num(x + dx) + ' ' + num(-(y + dy)) + ' L ' + num(x) + ' ' + num(-(y + dy));
        return n('path', { class: o.cls || 'ax', d: d, fill: 'none' });
      },

      /** 角标（直角外的弧线） */
      angleArc: function (x, y, r, a0, a1, o) {
        o = o || {};
        var pts = [], i, t;
        for (i = 0; i <= 24; i++) {
          t = a0 + (a1 - a0) * i / 24;
          pts.push([x + r * Math.cos(t), -(y + r * Math.sin(t))]);
        }
        return n('path', { class: o.cls || 'arc', d: pathFrom(pts) });
      },

      /** 箭头（向量） */
      arrow: function (ax, ay, bx, by, o) {
        o = o || {};
        return n('line', {
          class: o.cls || 'vec',
          x1: num(ax), y1: num(-ay), x2: num(bx), y2: num(-by),
          'marker-end': 'url(#arrowhead)'
        });
      }
    };
    return h;
  }

  /* ---------------- 常用场景（无需坐标系） ---------------- */
  function freeScene(viewBox, draw, defs) {
    return { viewBox: viewBox, draw: function () { return draw(n); }, defs: defs };
  }

  var ARROW_DEFS = function () {
    return n('defs', null, [
      n('marker', {
        id: 'arrowhead', markerWidth: '8', markerHeight: '8',
        refX: '6', refY: '3', orient: 'auto', markerUnits: 'strokeWidth'
      }, [n('path', { d: 'M0,0 L6,3 L0,6 z', fill: '#3a3a38' })])
    ]);
  };

  /* ---------------- 注册与渲染 ---------------- */
  function add(id, def) {
    if (!id) { return; }
    def = def || {};
    registry[id] = {
      id: id,
      title: def.title || '',
      caption: def.caption || '',
      viewBox: def.viewBox || '-6 -4 12 8',
      draw: def.draw || function () { return []; },
      defs: def.defs === undefined ? true : def.defs,
      coord: def.coord || null,
      maxWidth: def.maxWidth || 520
    };
  }

  function has(id) { return Object.prototype.hasOwnProperty.call(registry, id); }
  function get(id) { return registry[id] || null; }
  function ids() { return Object.keys(registry); }

  /** 测量已绘制内容的包围盒，把 viewBox 自适应到恰好包住全部图形与文字，避免裁切 */
  function fitViewBox(svg) {
    try {
      var holder = document.createElement('div');
      holder.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none;';
      document.body.appendChild(holder);
      holder.appendChild(svg);
      var g = document.createElementNS(NS, 'g');
      var kids = Array.prototype.slice.call(svg.childNodes);
      for (var i = 0; i < kids.length; i++) {
        var c = kids[i];
        if (c.nodeType === 1 && c.tagName && c.tagName.toLowerCase() === 'defs') { continue; }
        g.appendChild(c);
      }
      svg.appendChild(g);
      var box = g.getBBox();
      var m = 0.18;
      if (box && isFinite(box.width) && isFinite(box.height) && box.width > 0 && box.height > 0) {
        svg.setAttribute('viewBox', [num(box.x - m), num(box.y - m), num(box.width + 2 * m), num(box.height + 2 * m)].join(' '));
      }
      holder.removeChild(svg);
      document.body.removeChild(holder);
    } catch (e) { /* 保底：保留原 viewBox */ }
  }

  /** 按 viewBox 宽度等比设置字号，使不同尺寸的图文字渲染大小一致、不重叠 */
  function applyFontScale(nodes, vbW) {
    if (!vbW || vbW <= 0) { return; }
    var fsLbl = vbW * 0.039;
    var fsSm = vbW * 0.034;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el && el.nodeType === 1 && el.tagName && el.tagName.toLowerCase() === 'text') {
        var cls = el.getAttribute('class') || '';
        el.style.fontSize = (cls.indexOf('lbl--sm') >= 0 ? fsSm : fsLbl) + 'px';
      }
    }
  }

  /** 生成 <figure class="fig">…</figure>，找不到图时返回 null */
  function build(id, opt) {
    opt = opt || {};
    var def = registry[id];
    if (!def) { return null; }
    var h = null, nodes;
    var vb = def.viewBox;
    if (def.coord) {
      h = coord(def.coord);
      vb = h.viewBox;
    } else {
      // 自由绘图（纯 SVG 坐标）：同样提供一套绘图函数，内部直接换算成 SVG 属性，
      // 这样作者可以用统一的 h.xxx 写法，无需手动拼 n('line', ...)。
      h = {
        viewBox: vb,
        raw: true,
        n: n,
        axes: function () { return null; },
        text: function (x, y, str, cls, anchor) {
          return n('text', {
            x: num(x), y: num(y), class: cls || 'lbl', 'text-anchor': anchor || 'middle'
          }, str);
        },
        dot: function (x, y, o) {
          o = o || {};
          var kids = [n('circle', { class: o.solid ? 'pt pt--solid' : 'pt', cx: num(x), cy: num(y), r: o.r || 0.09 })];
          if (o.label) { kids.push(n('text', { class: o.labelCls || 'lbl--sm', x: num(x + (o.dx == null ? 0.2 : o.dx)), y: num(y + (o.dy == null ? 0.3 : o.dy)) }, o.label)); }
          return kids;
        },
        seg: function (ax, ay, bx, by, o) {
          o = o || {};
          return n('line', { class: o.cls || 'ax', x1: num(ax), y1: num(ay), x2: num(bx), y2: num(by) });
        },
        arrow: function (ax, ay, bx, by, o) {
          o = o || {};
          return n('line', { class: o.cls || 'vec', x1: num(ax), y1: num(ay), x2: num(bx), y2: num(by), 'marker-end': 'url(#arrowhead)' });
        },
        circle: function (cx, cy, r, o) {
          o = o || {};
          return n('circle', { class: o.cls || 'shape', cx: num(cx), cy: num(cy), r: num(r) });
        },
        rect: function (x, y, w, hh, o) {
          o = o || {};
          return n('rect', { class: o.cls || 'shape', x: num(x), y: num(y), width: num(w), height: num(hh), rx: o.rx });
        },
        poly: function (pts, o) {
          o = o || {};
          var d = pathFrom(pts) + (o.close ? ' Z' : '');
          var node = n('path', { class: o.cls || 'axis', d: d });
          if (o.fill) { node.setAttribute('fill', o.fill); }
          return node;
        },
        vline: function (x, o) {
          o = o || {};
          return n('line', { class: o.cls || 'hl', x1: num(x), y1: num(o.from), x2: num(x), y2: num(o.to) });
        },
        hline: function (y, o) {
          o = o || {};
          return n('line', { class: o.cls || 'hl', x1: num(o.from), y1: num(y), x2: num(o.to), y2: num(y) });
        },
        rightAngle: function (x, y, dir, o) {
          o = o || {};
          var s = o.size || 0.3;
          var dx = dir === 'left' ? -s : s, dy = dir === 'down' ? s : -s;
          return n('path', { class: o.cls || 'ax', d: 'M ' + num(x + dx) + ' ' + num(y) + ' L ' + num(x + dx) + ' ' + num(y + dy) + ' L ' + num(x) + ' ' + num(y + dy), fill: 'none' });
        },
        angleArc: function (x, y, r, a0, a1, o) {
          o = o || {};
          var pts = [], i, t;
          for (i = 0; i <= 24; i++) {
            t = a0 + (a1 - a0) * i / 24;
            pts.push([x + r * Math.cos(t), y + r * Math.sin(t)]);
          }
          return n('path', { class: o.cls || 'arc', d: pathFrom(pts) });
        },
        region: function (pts, o) {
          o = o || {};
          return n('path', { class: o.cls || 'fill-soft', d: pathFrom(pts) + ' Z' });
        }
      };
    }
    try {
      nodes = def.draw(h, n) || [];
    } catch (e) {
      if (global.console && console.warn) { console.warn('[illustrations] 绘制失败: ' + id, e); }
      nodes = [];
    }
    // h.dot / h.axes / h.poly 返回的是「节点数组」，作者常把它直接写进 draw 返回的数组里。
    // 这里统一把嵌套的数组按层展开，避免 appendChild(Array) 抛错导致整张简图渲染失败。
    nodes = (function flatten(list) {
      var out = [], i, c;
      for (i = 0; i < list.length; i++) {
        c = list[i];
        if (c == null) { continue; }
        if (c instanceof Array) { out = out.concat(flatten(c)); } else { out.push(c); }
      }
      return out;
    })(nodes);
    // 依据初始 viewBox 宽度等比缩放字号，避免小图文字过大重叠
    var vbWidth = (vb instanceof Array) ? vb[2] : (String(vb).split(/\s+/).map(Number)[2] || 0);
    applyFontScale(nodes, vbWidth);
    var svg = n('svg', {
      viewBox: (vb instanceof Array) ? vb.join(' ') : String(vb),
      xmlns: NS,
      role: 'img',
      'aria-label': def.title || id
    }, def.defs ? [ARROW_DEFS()].concat(nodes) : nodes);

    fitViewBox(svg);

    var fig = document.createElement('figure');
    fig.className = 'fig';
    fig.setAttribute('data-fig', id);
    fig.appendChild(svg);
    var cap = opt.caption === undefined ? def.caption : opt.caption;
    if (cap || def.title) {
      var fc = document.createElement('figcaption');
      // 图注可能含 \(...\) 公式，这里保留为纯文本，公式交给 DSHMath.render 处理；
      // 但要去掉可能存在的 HTML 标签，避免在图注里出现裸标签，再还原 &lt; 等实体。
      var capText = cap == null ? '' : decodeEntities(String(cap).replace(/<[^>]*>/g, ''));
      if (def.title) {
        var b = document.createElement('b');
        b.textContent = decodeEntities(String(def.title).replace(/<[^>]*>/g, ''));
        fc.appendChild(b);
        if (capText) { fc.appendChild(document.createTextNode('——' + capText)); }
      } else {
        fc.textContent = capText;
      }
      fig.appendChild(fc);
    }
    return fig;
  }

  /** 返回 HTML 字符串（供数据文件内联使用） */
  function use(id, caption) {
    var fig = build(id, { caption: caption });
    if (!fig) {
      return '<div class="notice notice--err">未找到简图：' + id + '</div>';
    }
    var box = document.createElement('div');
    box.appendChild(fig);
    return box.innerHTML;
  }

  /** 一行并排显示多张简图 */
  function row(list, caption) {
    var inner = '';
    for (var i = 0; i < list.length; i++) {
      var id = typeof list[i] === 'string' ? list[i] : list[i].id;
      var cap = typeof list[i] === 'string' ? undefined : list[i].caption;
      inner += use(id, cap);
    }
    var capHtml = caption ? '<figcaption style="grid-column:1/-1">' + caption + '</figcaption>' : '';
    return '<div class="fig-grid">' + inner + '</div>' + (capHtml ? '<div class="small muted" style="text-align:center;margin-top:6px">' + caption + '</div>' : '');
  }

  global.DSHFig = {
    version: '1.0.0',
    add: add,
    has: has,
    get: get,
    ids: ids,
    build: build,
    use: use,
    row: row,
    coord: coord,
    n: n,
    free: freeScene,
    ARROW_DEFS: ARROW_DEFS,
    registry: registry
  };
})(typeof window !== 'undefined' ? window : globalThis);
