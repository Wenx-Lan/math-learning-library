/*!
 * math.js —— 极简离线数学公式渲染器
 * 把 \( ... \) / \[ ... \] 形式的 LaTeX 子集渲染成 MathML（现代浏览器原生排版）。
 * 不依赖网络、不依赖任何第三方库。
 */
(function (global) {
  'use strict';

  var MMLNS = 'http://www.w3.org/1998/Math/MathML';
  var XHTML = 'http://www.w3.org/1999/xhtml';

  /* ---------------- 符号表 ---------------- */
  var SYM = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε',
    zeta: 'ζ', eta: 'η', theta: 'θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ',
    lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ',
    tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω',
    Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π',
    Sigma: 'Σ', Upsilon: 'Υ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
    infty: '∞', partial: '∂', nabla: '∇', ell: 'ℓ', hbar: 'ℏ',
    emptyset: '∅', varnothing: '∅', angle: '∠', triangle: '△', degree: '°',
    circ: '∘', bullet: '∙', cdots: '⋯', ldots: '…', dots: '…', vdots: '⋮', ddots: '⋱',
    prime: '′', ast: '∗', star: '⋆', square: '□',
    cup: '∪', cap: '∩', bigcup: '⋃', bigcap: '⋂', setminus: '∖', complement: '∁',
    forall: '∀', exists: '∃', nexists: '∄', neg: '¬', lnot: '¬', land: '∧', wedge: '∧',
    lor: '∨', vee: '∨', models: '⊨', vdash: '⊢', top: '⊤', bot: '⊥',
    aleph: 'ℵ', wp: '℘', real: 'ℜ', imag: 'ℑ', prime2: '″',
    sum: '∑', prod: '∏', int: '∫', oint: '∮', lim: 'lim'
  };

  var REL = {
    le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', equiv: '≡',
    approx: '≈', sim: '∼', simeq: '≃', cong: '≅', propto: '∝', perp: '⊥',
    parallel: '∥', mid: '∣', subset: '⊂', supset: '⊃',
    subseteq: '⊆', supseteq: '⊇', subsetneq: '⊊', supsetneq: '⊋',
    in: '∈', notin: '∉', ni: '∋', ll: '≪', gg: '≫', pm: '±', mp: '∓',
    times: '×', div: '÷', cdot: '⋅', to: '→', mapsto: '↦', rightarrow: '→',
    longrightarrow: '⟶', Rightarrow: '⇒', Longrightarrow: '⟹', implies: '⟹',
    leftarrow: '←', Leftarrow: '⇐', leftrightarrow: '↔', Leftrightarrow: '⇔',
    iff: '⟺', gets: '←', because: '∵', therefore: '∴',
    nRightarrow: '⇏', nLeftrightarrow: '⇎', nrightarrow: '↛', leadsto: '⇝',
    longleftarrow: '⟵', longleftrightarrow: '⟷', Longleftrightarrow: '⟺',
    uparrow: '↑', downarrow: '↓', asymp: '≍', doteq: '≐', triangleq: '≜',
    nsubseteq: '⊈', nsupseteq: '⊉', owns: '∋', varnothing2: '∅'
  };

  var BIG = {
    sum: '∑', prod: '∏', coprod: '∐', int: '∫', iint: '∬', iiint: '∭',
    oint: '∮', lim: 'lim', bigcup: '⋃', bigcap: '⋂',
    limsup: 'lim sup', liminf: 'lim inf'
  };

  var ACCENT = {
    vec: '\u20D7', bar: '\u0304', hat: '\u0302', tilde: '\u0303',
    dot: '\u0307', ddot: '\u0308', overrightarrow: '\u20D7'
  };

  /* ---------------- MathML 构造 ---------------- */
  function el(name, attrs, kids) {
    var n = document.createElementNS(MMLNS, name), k, i;
    if (attrs) {
      for (k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k) && attrs[k] != null) { n.setAttribute(k, attrs[k]); }
      }
    }
    if (kids != null) {
      if (!(kids instanceof Array)) { kids = [kids]; }
      for (i = 0; i < kids.length; i++) {
        var c = kids[i];
        if (c == null) { continue; }
        n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      }
    }
    return n;
  }
  function mi(t, a) { return el('mi', a, t); }
  function mn(t) { return el('mn', null, t); }
  function mo(t) { return el('mo', null, t); }
  function mtext(t) { return el('mtext', null, t); }
  function row(kids) { return el('mrow', null, kids); }
  function emptyRow() { return el('mrow', null, null); }

  /* ---------------- 词法分析 ---------------- */
  function tokenize(src) {
    var out = [], i = 0, n = src.length;
    while (i < n) {
      var ch = src.charAt(i);
      if (ch === '\\') {
        var m = /^\\([A-Za-z]+|.)/.exec(src.slice(i));
        if (!m) { i++; continue; }
        var body = m[1];
        if (body === '\\') { out.push({ t: 'rowbreak' }); } else { out.push({ t: 'cmd', v: body }); }
        i += m[0].length;
      } else if (/\s/.test(ch)) {
        i++;
      } else if (ch === '{') { out.push({ t: 'open' }); i++; }
      else if (ch === '}') { out.push({ t: 'close' }); i++; }
      else if (ch === '[') { out.push({ t: 'openb' }); i++; }
      else if (ch === ']') { out.push({ t: 'closeb' }); i++; }
      else if (ch === '^') { out.push({ t: 'sup' }); i++; }
      else if (ch === '_') { out.push({ t: 'sub' }); i++; }
      else if (ch === '&') { out.push({ t: 'amp' }); i++; }
      else if (ch === '~') { out.push({ t: 'nbsp' }); i++; }
      else if (/[0-9]/.test(ch)) {
        var j = i;
        while (j < n && /[0-9.]/.test(src.charAt(j))) { j++; }
        out.push({ t: 'num', v: src.slice(i, j) });
        i = j;
      } else if (/[A-Za-z]/.test(ch)) {
        out.push({ t: 'id', v: ch });
        i++;
      } else {
        out.push({ t: 'punct', v: ch });
        i++;
      }
    }
    return out;
  }

  /* ---------------- 语法分析 ---------------- */
  var OPERATORS = '+−-=<>|/,;:!?*';
  var FENCE = '()[]{}|‖⟨⟩';

  function Parser(tokens, env) {
    this.tk = tokens;
    this.i = 0;
    this.env = env || {};
  }
  Parser.prototype.peek = function (k) { return this.tk[this.i + (k || 0)]; };
  Parser.prototype.next = function () { return this.tk[this.i++]; };

  Parser.prototype.parseSeq = function (stop) {
    var kids = [], guard = 0;
    while (this.i < this.tk.length) {
      var t = this.peek();
      if (stop === 'close' && t.t === 'close') { break; }
      if (stop === 'closeb' && t.t === 'closeb') { break; }
      var node = this.parseAtom();
      if (node == null) { break; }
      var sub = null, sup = null;
      while (this.peek() && (this.peek().t === 'sub' || this.peek().t === 'sup')) {
        var kind = this.next().t;
        var arg = this.parseArg();
        if (kind === 'sub') { sub = arg; } else { sup = arg; }
      }
      if (sub || sup) {
        node = el('msubsup', null, [row([node]), sub || emptyRow(), sup || emptyRow()]);
      }
      kids.push(node);
      if (++guard > 5000) { break; }
    }
    return kids;
  };

  Parser.prototype.parseArg = function () {
    var t = this.peek();
    if (!t) { return emptyRow(); }
    if (t.t === 'open') {
      this.next();
      var k = this.parseSeq('close');
      if (this.peek() && this.peek().t === 'close') { this.next(); }
      return row(k);
    }
    var node = this.parseAtom();
    return node == null ? emptyRow() : node;
  };

  Parser.prototype.parseRawGroup = function () {
    var t = this.peek();
    var res = '', depth = 0;
    if (t && t.t === 'open') {
      this.next();
      depth = 1;
      while (this.i < this.tk.length && depth > 0) {
        var x = this.next();
        if (x.t === 'open') {
          depth++;
          res += '{';
        } else if (x.t === 'close') {
          depth--;
          if (depth > 0) { res += '}'; }
        } else if (x.t === 'cmd') {
          res += x.v;
        } else if (x.t === 'id' || x.t === 'num' || x.t === 'punct') {
          res += x.v;
        } else if (x.t === 'sup') {
          res += '^';
        } else if (x.t === 'sub') {
          res += '_';
        } else if (x.t === 'openb') {
          res += '[';
        } else if (x.t === 'closeb') {
          res += ']';
        } else if (x.t === 'amp') {
          res += '&';
        } else if (x.t === 'rowbreak') {
          res += '\\\\';
        } else {
          res += ' ';
        }
      }
    } else {
      var a = this.parseAtom();
      res = a ? (a.textContent || '') : '';
    }
    return res;
  };

  Parser.prototype.parseAtom = function () {
    var t = this.next();
    if (!t) { return null; }
    switch (t.t) {
      case 'num': return mn(t.v);
      case 'id': return mi(t.v);
      case 'open': {
        var k = this.parseSeq('close');
        if (this.peek() && this.peek().t === 'close') { this.next(); }
        return row(k);
      }
      case 'openb': {
        var k2 = this.parseSeq('closeb');
        if (this.peek() && this.peek().t === 'closeb') { this.next(); }
        return row([mo('['), row(k2), mo(']')]);
      }
      case 'close':
      case 'closeb':
        return null;
      case 'nbsp': return mtext('\u00A0');
      case 'amp': return mo('&');
      case 'rowbreak': return mo('\\\\');
      case 'sup':
      case 'sub': {
        var arg = this.parseArg();
        return el('msubsup', null, [emptyRow(), t.t === 'sub' ? arg : emptyRow(), t.t === 'sup' ? arg : emptyRow()]);
      }
      case 'cmd': return this.parseCmd(t.v);
      case 'bigop': {
        var label = t.name === 'limsup' ? 'lim sup' : (t.name === 'liminf' ? 'lim inf' : BIG[t.name]);
        var opKid = mi(label, { mathvariant: 'normal' });
        if (t.under && t.over) { return el('munderover', null, [opKid, row(t.under), row(t.over)]); }
        if (t.under) { return el('munder', null, [opKid, row(t.under)]); }
        if (t.over) { return el('mover', null, [opKid, row(t.over)]); }
        return opKid;
      }
      case 'punct': return this.parsePunct(t.v);
      default: return null;
    }
  };

  Parser.prototype.parseCmd = function (name) {
    var i;
    if (Object.prototype.hasOwnProperty.call(SYM, name)) {
      var s = SYM[name];
      return /^[A-Za-z]$/.test(s) ? mi(s, { mathvariant: 'normal' }) : mo(s);
    }
    if (Object.prototype.hasOwnProperty.call(REL, name)) {
      return mo(REL[name]);
    }
    if (Object.prototype.hasOwnProperty.call(ACCENT, name)) {
      var base = this.parseArg();
      return el('mover', { accent: 'true' }, [base, mo(ACCENT[name])]);
    }
    switch (name) {
      case 'frac':
      case 'dfrac':
      case 'tfrac': {
        var a = this.parseArg(), b = this.parseArg();
        return el('mfrac', { linethickness: name === 'tfrac' ? '0' : null }, [a, b]);
      }
      case 'sqrt': {
        var idx = null;
        if (this.peek() && this.peek().t === 'openb') {
          this.next();
          idx = row(this.parseSeq('closeb'));
          if (this.peek() && this.peek().t === 'closeb') { this.next(); }
        }
        var rad = this.parseArg();
        return idx ? el('mroot', null, [rad, idx]) : el('msqrt', null, rad);
      }
      case 'binom':
      case 'dbinom': {
        var n1 = this.parseArg(), k1 = this.parseArg();
        var mf = el('mfrac', { linethickness: '0' }, [n1, k1]);
        return row([mo('('), mf, mo(')')]);
      }
      case 'mathbf':
      case 'boldsymbol':
      case 'bm': {
        return el('mstyle', { mathvariant: 'bold' }, this.parseArg());
      }
      case 'mathbb': {
        return el('mstyle', { mathvariant: 'double-struck' }, this.parseArg());
      }
      case 'mathcal': {
        return el('mstyle', { mathvariant: 'script' }, this.parseArg());
      }
      case 'overrightarrow': {
        return el('mover', { accent: 'true' }, [this.parseArg(), mo('→')]);
      }
      case 'overline': {
        return el('mover', { accent: 'true' }, [this.parseArg(), mo('¯')]);
      }
      case 'choose': {
        var cn1 = this.parseArg(), ck1 = this.parseArg();
        return row([mo('('), el('mfrac', { linethickness: '0' }, [cn1, ck1]), mo(')')]);
      }
      case 'pmod': {
        return row([mo('('), mi('mod', { mathvariant: 'normal' }), mtext(' '), this.parseArg(), mo(')')]);
      }
      case 'text':
      case 'textit':
      case 'textrm':
      case 'mathrm':
      case 'mbox': {
        return mtext(this.parseRawGroup());
      }
      case 'operatorname': {
        return mi(this.parseRawGroup(), { mathvariant: 'normal' });
      }
      case 'left':
      case 'right':
      case 'middle': {
        var d = this.peek();
        var delim = '';
        if (d) {
          if (d.t === 'punct') { delim = d.v; this.next(); }
          else if (d.t === 'open') { delim = '{'; this.next(); }
          else if (d.t === 'close') { delim = '}'; this.next(); }
          else if (d.t === 'openb') { delim = '['; this.next(); }
          else if (d.t === 'closeb') { delim = ']'; this.next(); }
          else if (d.t === 'cmd') {
            this.next();
            delim = SYM[d.v] || REL[d.v] || '';
            if (d.v === 'lbrace') { delim = '{'; }
            if (d.v === 'rbrace') { delim = '}'; }
            if (d.v === 'langle') { delim = '⟨'; }
            if (d.v === 'rangle') { delim = '⟩'; }
            if (d.v === 'vert' || d.v === 'mid') { delim = '|'; }
            if (d.v === 'Vert') { delim = '‖'; }
            if (d.v === 'lceil') { delim = '⌈'; }
            if (d.v === 'rceil') { delim = '⌉'; }
            if (d.v === 'lfloor') { delim = '⌊'; }
            if (d.v === 'rfloor') { delim = '⌋'; }
            if (d.v === 'emptyset' || d.v === 'varnothing') { delim = '∅'; }
          }
        }
        if (delim === '.' || delim === '') { return null; }
        return mo(delim);
      }
      case 'lbrace': return mo('{');
      case 'rbrace': return mo('}');
      case 'langle': return mo('⟨');
      case 'rangle': return mo('⟩');
      case 'vert':
      case 'mid': return mo('|');
      case 'Vert': return mo('‖');
      case 'lceil': return mo('⌈');
      case 'rceil': return mo('⌉');
      case 'lfloor': return mo('⌊');
      case 'rfloor': return mo('⌋');
      case 'backslash': return mo('\\');
      case 'colon': return mo(':');
      case 'quad': return mtext('\u2003');
      case 'qquad': return mtext('\u2003\u2003');
      case ',':
      case ';':
      case ' ':
        return mtext('\u2009');
      case '!':
        return null;
      case 'begin': {
        var envName = this.parseRawGroup();
        var body = [];
        var depth = 1;
        while (this.i < this.tk.length) {
          var tk = this.peek();
          if (tk.t === 'cmd' && tk.v === 'begin') { depth++; body.push(this.next()); continue; }
          if (tk.t === 'cmd' && tk.v === 'end') {
            depth--;
            if (depth === 0) {
              this.next();
              this.parseRawGroup();
              break;
            }
            body.push(this.next());
            continue;
          }
          body.push(this.next());
        }
        var rows = splitRows(body);
        var isTable = envName === 'cases' || envName === 'array' || envName === 'aligned' ||
          envName === 'align' || envName === 'matrix' || envName === 'pmatrix' ||
          envName === 'bmatrix' || envName === 'vmatrix';
        if (isTable) {
          var mtable = el('mtable', {
            columnalign: envName === 'cases' ? 'left left' : 'center',
            rowspacing: '0.3em',
            columnspacing: '0.9em'
          });
          for (i = 0; i < rows.length; i++) {
            var tr = el('mtr');
            var cells = rows[i];
            for (var c = 0; c < cells.length; c++) {
              var sub = new Parser(cells[c], this.env);
              tr.appendChild(el('mtd', null, sub.parseSeq(null)));
            }
            mtable.appendChild(tr);
          }
          if (envName === 'cases') { return row([mo('{'), mtable]); }
          if (envName === 'pmatrix') { return row([mo('('), mtable, mo(')')]); }
          if (envName === 'bmatrix') { return row([mo('['), mtable, mo(']')]); }
          if (envName === 'vmatrix') { return row([mo('|'), mtable, mo('|')]); }
          return mtable;
        }
        var flat = [];
        for (i = 0; i < rows.length; i++) { flat = flat.concat(rows[i]); }
        return row(new Parser(flat, this.env).parseSeq(null));
      }
      case 'end': {
        this.parseRawGroup();
        return null;
      }
      case 'limits':
      case 'nolimits':
      case 'displaystyle':
      case 'textstyle':
        return null;
      case 'phantom': {
        this.parseArg();
        return null;
      }
      case 'hspace': {
        this.parseRawGroup();
        return mtext('\u2003');
      }
      default:
        return mtext(name);
    }
  };

  Parser.prototype.parsePunct = function (ch) {
    if (OPERATORS.indexOf(ch) >= 0 || FENCE.indexOf(ch) >= 0) { return mo(ch); }
    if (ch === "'") { return mo('′'); }
    if (ch === '"') { return mo('″'); }
    return mo(ch);
  };

  function splitRows(bodyTokens) {
    var rows = [[]];
    var r = 0;
    for (var i = 0; i < bodyTokens.length; i++) {
      var t = bodyTokens[i];
      if (t.t === 'rowbreak') { rows.push([]); r++; continue; }
      rows[r].push(t);
    }
    return rows.map(function (rowTk) {
      var cells = [[]];
      for (var j = 0; j < rowTk.length; j++) {
        if (rowTk[j].t === 'amp') { cells.push([]); } else { cells[cells.length - 1].push(rowTk[j]); }
      }
      return cells;
    });
  }

  /* ---------------- 大运算符：∑ ∏ ∫ lim 的上下限 ---------------- */
  function buildBigOps(tokens, env) {
    var out = [], i = 0;
    while (i < tokens.length) {
      var t = tokens[i];
      if (t.t === 'cmd' && BIG[t.v]) {
        var under = null, over = null;
        var j = i + 1;
        while (j < tokens.length && (tokens[j].t === 'sub' || tokens[j].t === 'sup')) {
          var kind = tokens[j].t;
          j++;
          var argTokens;
          if (tokens[j] && tokens[j].t === 'open') {
            var depth = 0, k = j;
            for (; k < tokens.length; k++) {
              if (tokens[k].t === 'open') { depth++; }
              else if (tokens[k].t === 'close') { depth--; if (depth === 0) { break; } }
            }
            argTokens = tokens.slice(j + 1, k);
            j = k + 1;
          } else {
            argTokens = tokens[j] ? [tokens[j]] : [];
            j = j + 1;
          }
          var parsed = new Parser(argTokens, env).parseSeq(null);
          if (kind === 'sub') { under = parsed; } else { over = parsed; }
        }
        out.push({ t: 'bigop', name: t.v, under: under, over: over });
        i = j;
        continue;
      }
      out.push(t);
      i++;
    }
    return out;
  }

  /* ---------------- 对外 API ---------------- */
  function toMathML(tex, display) {
    var src = String(tex == null ? '' : tex).trim();
    var tokens = buildBigOps(tokenize(src), {});
    var parser = new Parser(tokens, {});
    var kids = parser.parseSeq(null);
    return el('math', {
      display: display ? 'block' : 'inline',
      class: display ? 'math-block' : 'math-inline',
      xmlns: MMLNS
    }, [el('mstyle', { mathsize: '1em' }, kids)]);
  }

  function toHTML(tex, display) {
    var m = toMathML(tex, display);
    var host = document.createElementNS(XHTML, 'div');
    host.appendChild(m);
    return host.innerHTML;
  }

  /** 扫描元素内的 \( \) 、\[ \] 与 $$ $$，替换为渲染结果，返回替换个数 */
  function render(el) {
    if (!el) { return 0; }
    var text = el.textContent || '';
    if (text.indexOf('\\(') < 0 && text.indexOf('\\[') < 0 && text.indexOf('$$') < 0) { return 0; }
    var count = 0;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var targets = [], node;
    while ((node = walker.nextNode())) {
      var v = node.nodeValue;
      if (v && (v.indexOf('\\(') >= 0 || v.indexOf('\\[') >= 0 || v.indexOf('$$') >= 0)) { targets.push(node); }
    }
    for (var i = 0; i < targets.length; i++) {
      var tn = targets[i];
      var s = tn.nodeValue;
      var frag = document.createDocumentFragment();
      var re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g;
      var last = 0, m;
      while ((m = re.exec(s)) !== null) {
        if (m.index > last) { frag.appendChild(document.createTextNode(s.slice(last, m.index))); }
        var isDisplay = m[2] != null || m[3] != null;
        var body = m[1] != null ? m[1] : (m[2] != null ? m[2] : m[3]);
        try {
          frag.appendChild(toMathML(body, isDisplay));
        } catch (e) {
          frag.appendChild(document.createTextNode((isDisplay ? '\\[' : '\\(') + body + (isDisplay ? '\\]' : '\\)')));
        }
        count++;
        last = re.lastIndex;
      }
      if (last < s.length) { frag.appendChild(document.createTextNode(s.slice(last))); }
      if (tn.parentNode) { tn.parentNode.replaceChild(frag, tn); }
    }
    return count;
  }

  /* ---------------- SVG 标签用：LaTeX → Unicode 纯文本 ---------------- */
  var UCMD = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ',
    eta: 'η', theta: 'θ', iota: 'ι', kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ',
    pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', upsilon: 'υ', phi: 'φ', varphi: 'φ', chi: 'χ',
    psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π',
    Sigma: 'Σ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
    infty: '∞', partial: '∂', nabla: '∇', ell: 'ℓ', emptyset: '∅', varnothing: '∅',
    angle: '∠', triangle: '△', degree: '°', circ: '∘', cdots: '⋯', ldots: '…', dots: '…',
    vdots: '⋮', ddots: '⋱', prime: '′', ast: '∗', star: '⋆', square: '□',
    le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', equiv: '≡', approx: '≈',
    sim: '∼', simeq: '≃', cong: '≅', propto: '∝', perp: '⊥', parallel: '∥', mid: '∣',
    subset: '⊂', supset: '⊃', subseteq: '⊆', supseteq: '⊇', subsetneq: '⊊', supsetneq: '⊋',
    in: '∈', notin: '∉', ni: '∋', ll: '≪', gg: '≫', pm: '±', mp: '∓', times: '×', div: '÷',
    cdot: '·', cup: '∪', cap: '∩', complement: '∁',
    mathbb: '', mathbf: '', boldsymbol: '',
    overrightarrow: '⃗', overline: '‾', binom: '', choose: '',
    to: '→', mapsto: '↦', rightarrow: '→', longrightarrow: '⟶', Rightarrow: '⇒',
    Longrightarrow: '⟹', implies: '⟹', leftarrow: '←', Leftarrow: '⇐', leftrightarrow: '↔',
    Leftrightarrow: '⇔', iff: '⟺', because: '∵', therefore: '∴',
    sum: 'Σ', prod: 'Π', int: '∫', oint: '∮', lim: 'lim', bigcup: '⋃', bigcap: '⋂',
    lbrace: '{', rbrace: '}', langle: '⟨', rangle: '⟩', vert: '|', Vert: '‖',
    lceil: '⌈', rceil: '⌉', lfloor: '⌊', rfloor: '⌋', backslash: '\\', quad: ' ', qquad: '  ',
    sin: 'sin', cos: 'cos', tan: 'tan', cot: 'cot', sec: 'sec', csc: 'csc',
    log: 'log', lg: 'lg', ln: 'ln', arcsin: 'arcsin', arccos: 'arccos', arctan: 'arctan',
    max: 'max', min: 'min', lg2: 'lg'
  };
  var SUPMAP = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷',
    '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '−': '⁻', n: 'ⁿ', i: 'ⁱ', '(': '⁽', ')': '⁾'
  };
  var SUBMAP = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇',
    '8': '₈', '9': '₉', '+': '₊', '-': '₋', '−': '₋', n: 'ₙ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ',
    m: 'ₘ', a: 'ₐ', e: 'ₑ', o: 'ₒ', x: 'ₓ', U: 'ᵤ', p: 'ₚ', s: 'ₛ', t: 'ₜ'
  };

  function mapScript(s, table) {
    var out = '', i, ch;
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      if (Object.prototype.hasOwnProperty.call(table, ch)) { out += table[ch]; } else { return null; }
    }
    return out;
  }

  /**
   * mathToUnicode(tex) —— 把 LaTeX 片段转成可放进 SVG <text> 的 Unicode 文本。
   * 例：'\\complement_{U}A' → '∁ᵤA'，'x^{2}' → 'x²'，'\\frac{a}{b}' → '(a)/(b)'
   */
  /**
   * mathToUnicode(tex) —— 把 LaTeX 片段转成可放进 SVG <text> 的 Unicode 纯文本。
   * 单遍扫描解析，规则明确：结构命令 → 上下标 → 符号表 → 未知命令退化为命令名。
   */
  function mathToUnicode(tex) {
    var s = String(tex == null ? '' : tex);
    if (s.indexOf(String.fromCharCode(92)) < 0 && s.indexOf('^') < 0 && s.indexOf('_') < 0) { return s; }
    var CMD_RE = /^([A-Za-z]+)/;
    var STRUCT = ['left', 'right', 'middle', 'limits', 'nolimits', 'displaystyle', 'textstyle', 'quad', 'qquad'];
    var TEXTCMD = ['text', 'textit', 'textrm', 'mathrm', 'mbox', 'operatorname',
      'mathbb', 'mathbf', 'boldsymbol', 'mathsf', 'mathtt', 'mathcal'];
    var ACCENT = ['vec', 'bar', 'hat', 'tilde', 'dot', 'ddot', 'overrightarrow'];

    function readGroup(src, from) {
      if (src.charAt(from) !== '{') { return null; }
      var d = 0, i, ch;
      for (i = from; i < src.length; i++) {
        ch = src.charAt(i);
        if (ch === '{') { d++; }
        else if (ch === '}') { d--; if (d === 0) { return { body: src.slice(from + 1, i), next: i + 1 }; } }
      }
      return null;
    }
    function readScript(src, from) {
      if (src.charAt(from) === '{') {
        var g = readGroup(src, from);
        return g ? { text: g.body, next: g.next } : { text: '', next: from + 1 };
      }
      return { text: src.charAt(from), next: from + 1 };
    }
    function mapAll(str, table) {
      var out = '', i, ch;
      for (i = 0; i < str.length; i++) {
        ch = str.charAt(i);
        if (!Object.prototype.hasOwnProperty.call(table, ch)) { return null; }
        out += table[ch];
      }
      return out;
    }

    var out = '', i = 0, ch, m, name, j, g, arg, argNext, a, mapped, g2, k, close, idx;
    while (i < s.length) {
      ch = s.charAt(i);
      if (ch === String.fromCharCode(92)) {
        m = CMD_RE.exec(s.slice(i + 1));
        if (!m) { out += (s.charAt(i + 1) || ''); i += 2; continue; }
        name = m[1];
        j = i + 1 + name.length;
        g = readGroup(s, j);
        arg = g ? g.body : null;
        argNext = g ? g.next : j;
        if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
          g2 = readGroup(s, argNext);
          out += '(' + (arg == null ? '' : mathToUnicode(arg)) + ')/(' + (g2 ? mathToUnicode(g2.body) : '') + ')';
          i = g2 ? g2.next : argNext;
          continue;
        }
        if (name === 'sqrt') {
          k = argNext;
          if (s.charAt(k) === '[') {
            close = s.indexOf(']', k);
            idx = close > 0 ? s.slice(k + 1, close) : '';
            g2 = readGroup(s, close + 1);
            out += '(' + (g2 ? mathToUnicode(g2.body) : '') + ')^(1/' + idx + ')';
            i = g2 ? g2.next : close + 1;
            continue;
          }
          out += String.fromCharCode(0x221A) + '(' + (arg == null ? '' : mathToUnicode(arg)) + ')';
          i = argNext;
          continue;
        }
        if (name === 'overline') {
          out += (arg == null ? '' : mathToUnicode(arg)) + String.fromCharCode(0x203E);
          i = argNext;
          continue;
        }
        if (ACCENT.indexOf(name) >= 0) {
          out += (arg == null ? '' : mathToUnicode(arg));
          i = argNext;
          continue;
        }
        if (TEXTCMD.indexOf(name) >= 0) {
          out += (arg == null ? '' : arg);
          i = argNext;
          continue;
        }
        if (STRUCT.indexOf(name) >= 0) { i = argNext; continue; }
        if (name === ',' || name === ';' || name === '!' || name === ' ') { i = argNext; continue; }
        if (Object.prototype.hasOwnProperty.call(UCMD, name)) { out += UCMD[name]; i = argNext; continue; }
        out += name;
        i = argNext;
        continue;
      }
      if (ch === '^' || ch === '_') {
        a = readScript(s, i + 1);
        mapped = mapAll(a.text, ch === '^' ? SUPMAP : SUBMAP);
        if (mapped == null) {
          // 下标/上标内容含命令时先递归转换，再退化为普通写法
          var inner = mathToUnicode(a.text);
          out += (ch === '^' ? '^' : '_') + inner;
        } else {
          out += mapped;
        }
        i = a.next;
        continue;
      }
      if (ch === '{' || ch === '}') { i++; continue; }
      out += ch;
      i++;
    }
    return out.replace(/ {2,}/g, ' ').trim();
  }

  /** 去掉 \( \) \[ \] 包装并转 Unicode（供 SVG 标签使用） */
  function labelToUnicode(s) {
    var t = String(s == null ? '' : s);
    t = t.replace(/\\\(([\s\S]*?)\\\)/g, function (m, a) { return mathToUnicode(a); });
    t = t.replace(/\\\[([\s\S]*?)\\\]/g, function (m, a) { return mathToUnicode(a); });
    return t;
  }

  var DSHMath = {
    version: '1.0.0',
    toMathML: toMathML,
    toHTML: toHTML,
    render: render,
    mathToUnicode: mathToUnicode,
    labelToUnicode: labelToUnicode,
    SYM: SYM,
    REL: REL,
    BIG: BIG
  };

  if (typeof module === 'object' && module.exports) { module.exports = DSHMath; }
  global.DSHMath = DSHMath;
})(typeof window !== 'undefined' ? window : globalThis);
