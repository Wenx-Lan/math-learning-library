/*!
 * t-10-解三角形.js —— 第 10 章「解三角形」题型数据
 * 由 js/app.js 按需动态加载，浏览器直接运行，无构建步骤。
 */
DSHData.registerTypes({
  id: 10,
  name: '解三角形',
  brief: '本章题型围着“边角互化”展开：能用正弦定理的优先去正弦，结构对称的优先用余弦定理；遇到最值就回到余弦定理配合基本不等式，遇到测量就先画出三角形再套定理。',
  types: [
    {
      id: '10-1',
      name: '已知边角求边、角与面积',
      desc: '考查正弦定理、余弦定理与面积公式的直接运用。先判断条件属于 SSS、SAS、AAS/ASA 还是 SSA：SSS 与 SAS 用余弦定理（结果唯一），AAS/ASA 用正弦定理；SSA 求出正弦值后必须检验解的个数。',
      points: [
        '两边及夹角：直接用 \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\)，再用 \\(S=\\dfrac{1}{2}bc\\sin A\\) 求面积。',
        '两角及一边：先用 \\(A+B+C=\\pi\\) 求第三个角，再用正弦定理求边，最后用面积公式。',
        '已知面积反求边或角时，面积公式与余弦定理要配套使用，注意 \\(\\sin\\) 值与角的对应要检验。'
      ],
      questions: [
        {
          id: '10-1-1',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(a=2\\sqrt{3}\\)，\\(A=\\dfrac{\\pi}{3}\\)，则 \\(\\triangle ABC\\) 外接圆的半径 \\(R\\) 等于（　　）</p>',
          options: [
            '\\(1\\)',
            '\\(\\sqrt{3}\\)',
            '\\(2\\)',
            '\\(2\\sqrt{3}\\)'
          ],
          answer: 'C',
          answerText: '\\(R=2\\)',
          solution: '<p>由正弦定理 \\(\\dfrac{a}{\\sin A}=2R\\)，得</p>\\[2R=\\frac{2\\sqrt{3}}{\\sin\\frac{\\pi}{3}}=\\frac{2\\sqrt{3}}{\\frac{\\sqrt{3}}{2}}=4\\]' +
            '<p>所以 \\(R=2\\)，选 C。</p>' +
            '<p class="small muted">易错：把 \\(2R\\) 当成 \\(R\\)，或把 \\(\\sin\\dfrac{\\pi}{3}\\) 记成 \\(\\dfrac{1}{2}\\)。</p>'
        },
        {
          id: '10-1-2',
          kind: 'blank',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(b=2\\)，\\(c=1\\)，\\(A=\\dfrac{\\pi}{3}\\)，则 \\(a=\\) ____。</p>',
          blanks: [
            { before: '\\(a=\\)', answer: ['\\sqrt{3}', 'sqrt3'], after: '。' }
          ],
          answer: '\\sqrt{3}',
          answerText: '\\(a=\\sqrt{3}\\)',
          solution: '<p>已知两边及其夹角，用余弦定理：</p>' +
            '\\[a^{2}=b^{2}+c^{2}-2bc\\cos A=2^{2}+1^{2}-2\\times2\\times1\\times\\frac{1}{2}=4+1-2=3\\]' +
            '<p>所以 \\(a=\\sqrt{3}\\)。</p>' +
            '<p class="small muted">检查合理性：\\(b\\) 是最大边，\\(B\\) 应为最大角。由余弦定理 \\(\\cos B=\\dfrac{a^{2}+c^{2}-b^{2}}{2ac}=\\dfrac{3+1-4}{2\\sqrt{3}}=\\dfrac{0}{2\\sqrt{3}}=0\\)，得 \\(B=\\dfrac{\\pi}{2}\\)，\\(A+C=\\dfrac{\\pi}{2}\\) 与 \\(A=\\dfrac{\\pi}{3}\\)、\\(C=\\dfrac{\\pi}{6}\\) 一致。</p>'
        },
        {
          id: '10-1-3',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(A=\\dfrac{\\pi}{3}\\)，\\(a=2\\)，求 \\(\\triangle ABC\\) 面积的最大值，并指出此时三角形的形状。</p>',
          answerText: '最大值为 \\(\\sqrt{3}\\)，此时 \\(b=c=2\\)，三角形为等边三角形',
          answer: 'Smax=\\sqrt{3}',
          solution: '<p>由余弦定理 \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\)，把 \\(a=2\\)、\\(A=\\dfrac{\\pi}{3}\\) 代入：</p>' +
            '\\[4=b^{2}+c^{2}-bc\\]' +
            '<p>由基本不等式 \\(b^{2}+c^{2}\\ge2bc\\)，得</p>' +
            '\\[4\\ge2bc-bc=bc\\]' +
            '<p>即 \\(bc\\le4\\)，当且仅当 \\(b=c\\) 时取等号。此时由 \\(4=2b^{2}-b^{2}=b^{2}\\) 得 \\(b=c=2\\)，三角形为等边三角形。</p>' +
            '<p>于是</p>' +
            '\\[S=\\frac{1}{2}bc\\sin A\\le\\frac{1}{2}\\times4\\times\\frac{\\sqrt{3}}{2}=\\sqrt{3}\\]' +
            '<p>所以面积的最大值为 \\(\\sqrt{3}\\)，取到最大值时 \\(\\triangle ABC\\) 为等边三角形。</p>'
        },
        {
          id: '10-1-4',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(a=2\\)，\\(b=2\\sqrt{3}\\)，\\(A=\\dfrac{\\pi}{6}\\)，求 \\(B\\) 与 \\(\\triangle ABC\\) 的面积。</p>',
          answerText: '\\(B=\\dfrac{\\pi}{3}\\) 且面积为 \\(2\\sqrt{3}\\)，或 \\(B=\\dfrac{2\\pi}{3}\\) 且面积为 \\(\\sqrt{3}\\)',
          answer: 'B=\\pi/3, S=2\\sqrt{3} 或 B=2\\pi/3, S=\\sqrt{3}',
          solution: '<p>这是“已知两边及其中一边的对角”（SSA）的情形，先用正弦定理：</p>' +
            '\\[\\frac{a}{\\sin A}=\\frac{b}{\\sin B}\\quad\\Longrightarrow\\quad\\sin B=\\frac{b\\sin A}{a}=\\frac{2\\sqrt{3}\\times\\frac{1}{2}}{2}=\\frac{\\sqrt{3}}{2}\\]' +
            '<p>由 \\(B\\in(0,\\pi)\\) 得 \\(B=\\dfrac{\\pi}{3}\\) 或 \\(B=\\dfrac{2\\pi}{3}\\)，两个都要检验。</p>' +
            '<p>因为 \\(b=2\\sqrt{3}&gt;a=2\\)，由“大边对大角”知必有 \\(B&gt;A=\\dfrac{\\pi}{6}\\)，两个候选角都满足这一条，所以再比较内角和：</p>' +
            '<ul>' +
            '<li>若 \\(B=\\dfrac{\\pi}{3}\\)，则 \\(C=\\pi-\\dfrac{\\pi}{6}-\\dfrac{\\pi}{3}=\\dfrac{\\pi}{2}\\)，可以构成三角形，此时</li>' +
            '</ul>' +
            '\\[S=\\frac{1}{2}ab\\sin C=\\frac{1}{2}\\times2\\times2\\sqrt{3}\\times1=2\\sqrt{3}\\]' +
            '<ul>' +
            '<li>若 \\(B=\\dfrac{2\\pi}{3}\\)，则 \\(C=\\pi-\\dfrac{\\pi}{6}-\\dfrac{2\\pi}{3}=\\dfrac{\\pi}{6}\\)，也可以构成三角形，此时</li>' +
            '</ul>' +
            '\\[S=\\frac{1}{2}ab\\sin C=\\frac{1}{2}\\times2\\times2\\sqrt{3}\\times\\frac{1}{2}=\\sqrt{3}\\]' +
            '<p>所以本题有两解：\\(B=\\dfrac{\\pi}{3}\\) 时面积为 \\(2\\sqrt{3}\\)；\\(B=\\dfrac{2\\pi}{3}\\) 时面积为 \\(\\sqrt{3}\\)。</p>' +
            '<p class="small muted">判断两解的简便方法：\\(A\\) 为锐角时比较 \\(a\\) 与 \\(b\\sin A\\)。这里 \\(b\\sin A=2\\sqrt{3}\\times\\dfrac{1}{2}=\\sqrt{3}&lt;a=2&lt;b=2\\sqrt{3}\\)，所以有两解。</p>'
        }
      ],
      examples: [
        {
          id: '10-1-ex-1',
          title: '由两边及夹角求第三边与面积',
          problem: '<p>在 \\(\\triangle ABC\\) 中，\\(b=3\\)，\\(c=5\\)，\\(A=\\dfrac{2\\pi}{3}\\)，求 \\(a\\) 与 \\(\\triangle ABC\\) 的面积。</p>',
          solution: '<p>由余弦定理</p>' +
            '\\[a^{2}=b^{2}+c^{2}-2bc\\cos A=9+25-2\\times3\\times5\\times\\left(-\\frac{1}{2}\\right)=34+15=49\\]' +
            '<p>故 \\(a=7\\)。</p>' +
            '<p>面积</p>' +
            '\\[S=\\frac{1}{2}bc\\sin A=\\frac{1}{2}\\times3\\times5\\times\\frac{\\sqrt{3}}{2}=\\frac{15\\sqrt{3}}{4}\\]' +
            '<p class="small muted">注意 \\(A\\) 为钝角时 \\(\\cos A&lt;0\\)，余弦定理中的 \\(-2bc\\cos A\\) 变成加项，所得边长大于勾股定理给出的 \\(\\sqrt{34}\\)，这正符合“钝角对大边”。</p>',
          note: '方法总结：已知两边及夹角（SAS）时，第一步交给余弦定理求第三边，第二步用 \\(S=\\frac{1}{2}ab\\sin C\\) 求面积，不必先去求其它角。'
        }
      ]
    },
    {
      id: '10-2',
      name: '判断三角形的形状',
      desc: '考查把已知的边角混合条件化简为“三边关系”或“两角相等”。常用手段：正弦定理把正弦换成边、余弦定理把余弦换成边，或者用内角和把两角并为一角。',
      points: [
        '两边平方关系：设 \\(a\\) 为最大边，\\(a^{2}&lt;b^{2}+c^{2}\\) 为锐角三角形，\\(a^{2}=b^{2}+c^{2}\\) 为直角三角形，\\(a^{2}&gt;b^{2}+c^{2}\\) 为钝角三角形。',
        '出现 \\(a\\cos A=b\\cos B\\) 这类对称式，用正弦定理化为 \\(\\sin A\\cos A=\\sin B\\cos B\\)，再用二倍角与内角和判断。',
        '结论要写完整：可能是“等腰三角形”“直角三角形”“等腰直角三角形”或“等腰或直角三角形”，由 \\(\\sin2A=\\sin2B\\) 只能推出后者。'
      ],
      questions: [
        {
          id: '10-2-1',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(b^{2}+c^{2}=a^{2}+bc\\)，则 \\(A\\) 等于（　　）</p>',
          options: [
            '\\(\\dfrac{\\pi}{6}\\)',
            '\\(\\dfrac{\\pi}{4}\\)',
            '\\(\\dfrac{\\pi}{3}\\)',
            '\\(\\dfrac{2\\pi}{3}\\)'
          ],
          answer: 'C',
          answerText: '\\(A=\\dfrac{\\pi}{3}\\)',
          solution: '<p>由余弦定理 \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\) 移项得</p>' +
            '\\[b^{2}+c^{2}-a^{2}=2bc\\cos A\\]' +
            '<p>把已知条件 \\(b^{2}+c^{2}-a^{2}=bc\\) 代入，得 \\(2bc\\cos A=bc\\)。</p>' +
            '<p>因为 \\(bc&gt;0\\)，两边约去 \\(bc\\) 得 \\(\\cos A=\\dfrac{1}{2}\\)，故 \\(A=\\dfrac{\\pi}{3}\\)，选 C。</p>' +
            '<p class="small muted">典型错误：把 \\(2bc\\cos A=bc\\) 中的 \\(2\\) 漏掉，得 \\(\\cos A=1\\)，无解。</p>'
        },
        {
          id: '10-2-2',
          kind: 'blank',
          stem: '<p>在 \\(\\triangle ABC\\) 中，若 \\(a\\cos B=b\\cos A\\)，则 \\(\\triangle ABC\\) 是 ____ 三角形。</p>',
          blanks: [
            { before: '由 \\(a\\cos B=b\\cos A\\) 可得 \\(a=b\\)，所以 \\(\\triangle ABC\\) 是', answer: ['等腰', '等腰三角形', '等腰三角'], after: '三角形。' }
          ],
          answer: ['等腰三角形', '等腰'],
          answerText: '等腰三角形（且 \\(a=b\\)）',
          solution: '<p>由正弦定理把边化为角：</p>' +
            '\\[\\sin A\\cos B=\\sin B\\cos A\\]' +
            '<p>移项得 \\(\\sin A\\cos B-\\cos A\\sin B=0\\)，由两角差的正弦公式得</p>' +
            '\\[\\sin(A-B)=0\\]' +
            '<p>因为 \\(A,B\\) 都是三角形的内角，所以 \\(A-B\\in(-\\pi,\\pi)\\)，从而 \\(A-B=0\\)，即 \\(A=B\\)。</p>' +
            '<p>由“等角对等边”得 \\(a=b\\)，故 \\(\\triangle ABC\\) 是等腰三角形。</p>' +
            '<p class="small muted">对照记忆：射影定理 \\(a\\cos B+b\\cos A=c\\) 对任意三角形都成立；而本题是 \\(a\\cos B=b\\cos A\\)，多了一个“对称”条件，才限制出等腰。</p>'
        },
        {
          id: '10-2-3',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(a\\cos A=b\\cos B\\)，判断 \\(\\triangle ABC\\) 的形状。</p>',
          answerText: '等腰三角形或直角三角形',
          answer: '等腰三角形或直角三角形',
          solution: '<p>由正弦定理把边化为角：\\(2R\\sin A\\cos A=2R\\sin B\\cos B\\)，即</p>' +
            '\\[\\sin2A=\\sin2B\\]' +
            '<p>因为 \\(A,B\\in(0,\\pi)\\)，所以 \\(2A,2B\\in(0,2\\pi)\\)，且 \\(2A+2B=2\\pi-2C&lt;2\\pi\\)。由 \\(\\sin2A=\\sin2B\\) 得</p>' +
            '\\[2A=2B\\quad\\text{或}\\quad2A+2B=\\pi\\]' +
            '<p>前者给出 \\(A=B\\)，即 \\(a=b\\)，三角形为等腰三角形；后者给出 \\(A+B=\\dfrac{\\pi}{2}\\)，即 \\(C=\\dfrac{\\pi}{2}\\)，三角形为直角三角形。</p>' +
            '<p>所以 \\(\\triangle ABC\\) 是等腰三角形或直角三角形（当 \\(A=B=\\dfrac{\\pi}{4}\\) 时两者同时成立，即等腰直角三角形）。</p>' +
            '<p class="small muted">易错：由 \\(\\sin2A=\\sin2B\\) 只写 \\(A=B\\) 而丢掉 \\(A+B=\\dfrac{\\pi}{2}\\)，导致漏解。</p>'
        },
        {
          id: '10-2-4',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，若 \\(\\dfrac{\\cos A}{\\cos B}=\\dfrac{b}{a}\\)，则 \\(\\triangle ABC\\) 一定满足（　　）</p>',
          options: [
            '\\(a=b\\)',
            '\\(a^{2}+b^{2}=c^{2}\\)',
            '\\(a=b\\) 或 \\(a^{2}+b^{2}=c^{2}\\)',
            '\\(a=b=c\\)'
          ],
          answer: 'C',
          answerText: '\\(a=b\\) 或 \\(a^{2}+b^{2}=c^{2}\\)',
          solution: '<p>由正弦定理 \\(a=2R\\sin A\\)，\\(b=2R\\sin B\\)，代入条件得</p>' +
            '\\[\\frac{\\cos A}{\\cos B}=\\frac{\\sin B}{\\sin A}\\]' +
            '<p>交叉相乘：\\(\\sin A\\cos A=\\sin B\\cos B\\)，即 \\(\\sin2A=\\sin2B\\)。</p>' +
            '<p>由 \\(2A,2B\\in(0,2\\pi)\\) 且 \\(2A+2B&lt;2\\pi\\)，得 \\(2A=2B\\) 或 \\(2A+2B=\\pi\\)。</p>' +
            '<p>前一种情形 \\(A=B\\)，即 \\(a=b\\)；后一种情形 \\(A+B=\\dfrac{\\pi}{2}\\)，即 \\(C=\\dfrac{\\pi}{2}\\)，由勾股定理得 \\(a^{2}+b^{2}=c^{2}\\)。</p>' +
            '<p>两种情形都满足条件，所以只能是 C。</p>' +
            '<p class="small muted">A、B 两项各只涵盖一种情形，不是“一定”成立的完整结论。</p>'
        }
      ],
      examples: [
        {
          id: '10-2-ex-1',
          title: '用余弦定理把条件化为三边关系',
          problem: '<p>在 \\(\\triangle ABC\\) 中，\\((a+b+c)(a+b-c)=3ab\\)，求角 \\(C\\)。</p>',
          solution: '<p>把左边按平方差公式展开：</p>' +
            '\\[(a+b)^{2}-c^{2}=3ab\\]' +
            '<p>即 \\(a^{2}+2ab+b^{2}-c^{2}=3ab\\)，整理得</p>' +
            '\\[a^{2}+b^{2}-c^{2}=ab\\]' +
            '<p>由余弦定理 \\(c^{2}=a^{2}+b^{2}-2ab\\cos C\\)，即 \\(a^{2}+b^{2}-c^{2}=2ab\\cos C\\)，代入上式得</p>' +
            '\\[2ab\\cos C=ab\\]' +
            '<p>因为 \\(ab&gt;0\\)，故 \\(\\cos C=\\dfrac{1}{2}\\)，\\(C=\\dfrac{\\pi}{3}\\)。</p>' +
            '<p>所以 \\(\\triangle ABC\\) 中 \\(C=\\dfrac{\\pi}{3}\\)（不能进一步确定为等边三角形，例如 \\(a=1,b=1,c=1\\) 与 \\(a=1,b=2,c=\\sqrt{3}\\) 都满足）。</p>',
          note: '方法总结：“展开、整理、对照余弦定理”是处理对称三边条件的通用套路。注意 \\((a+b+c)(a+b-c)\\) 中两项的公共部分是 \\((a+b)\\)，展开时不要错写成 \\((a+c)\\)。'
        },
        {
          id: '10-2-ex-2',
          title: '含正弦的条件判断形状',
          problem: '<p>在 \\(\\triangle ABC\\) 中，\\(\\sin C=\\dfrac{\\sin A+\\sin B}{\\cos A+\\cos B}\\)，判断 \\(\\triangle ABC\\) 的形状。</p>',
          solution: '<p>把右边用和差化积化简。由 \\(A+B=\\pi-C\\)，设 \\(\\dfrac{A+B}{2}=\\dfrac{\\pi}{2}-\\dfrac{C}{2}\\)，则</p>' +
            '\\[\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2},\\qquad \\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}\\]' +
            '<p>因为 \\(\\left|\\dfrac{A-B}{2}\\right|&lt;\\dfrac{\\pi}{2}\\)，所以 \\(\\cos\\dfrac{A-B}{2}\\ne0\\)（若 \\(\\cos\\dfrac{A-B}{2}=0\\) 则 \\(|A-B|=\\pi\\)，与内角和矛盾），可约去，得</p>' +
            '\\[\\frac{\\sin A+\\sin B}{\\cos A+\\cos B}=\\tan\\frac{A+B}{2}=\\tan\\left(\\frac{\\pi}{2}-\\frac{C}{2}\\right)=\\cot\\frac{C}{2}\\]' +
            '<p>于是原式化为 \\(\\sin C=\\cot\\dfrac{C}{2}\\)。由 \\(\\sin C=2\\sin\\dfrac{C}{2}\\cos\\dfrac{C}{2}\\) 得</p>' +
            '\\[2\\sin\\frac{C}{2}\\cos\\frac{C}{2}=\\frac{\\cos\\frac{C}{2}}{\\sin\\frac{C}{2}}\\]' +
            '<p>因为 \\(0&lt;\\dfrac{C}{2}&lt;\\dfrac{\\pi}{2}\\)，\\(\\cos\\dfrac{C}{2}&gt;0\\)、\\(\\sin\\dfrac{C}{2}&gt;0\\)，两边同乘 \\(\\sin\\dfrac{C}{2}\\) 并约去 \\(\\cos\\dfrac{C}{2}\\)，得</p>' +
            '\\[2\\sin^{2}\\frac{C}{2}=1,\\qquad \\sin^{2}\\frac{C}{2}=\\frac{1}{2}\\]' +
            '<p>故 \\(\\sin\\dfrac{C}{2}=\\dfrac{\\sqrt{2}}{2}\\)，\\(\\dfrac{C}{2}=\\dfrac{\\pi}{4}\\)，\\(C=\\dfrac{\\pi}{2}\\)。</p>' +
            '<p>所以 \\(\\triangle ABC\\) 是以 \\(C\\) 为直角的直角三角形。</p>',
          note: '方法总结：含正弦、余弦的和式条件，优先尝试和差化积与半角关系，把含两个角的式子并成只含一个角的方程。'
        }
      ]
    },
    {
      id: '10-3',
      name: '边角互化证明恒等式',
      desc: '考查在三角形中证明含边与角的恒等式。核心是“统一”：把边全换成 \\(2R\\sin\\) 型，或把角全换成边的分式，再用内角和与三角恒等变形化简。',
      points: [
        '优先去正弦：见到 \\(a,b,c\\) 的一次齐次式，用 \\(a=2R\\sin A\\) 换角，约去公因子 \\(2R\\)。',
        '优先去边：见到角的正弦、余弦的齐次式，用 \\(\\sin A=\\dfrac{a}{2R}\\)、\\(\\cos A=\\dfrac{b^{2}+c^{2}-a^{2}}{2bc}\\) 换边。',
        '用 \\(A+B=\\pi-C\\) 把两个角并成一个角，尤其是 \\(\\sin(A+B)=\\sin C\\)、\\(\\cos(A+B)=-\\cos C\\)。'
      ],
      questions: [
        {
          id: '10-3-1',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，下列等式一定成立的是（　　）</p>',
          options: [
            '\\(a\\sin A=b\\sin B\\)',
            '\\(\\dfrac{a}{\\sin B}=\\dfrac{b}{\\sin A}\\)',
            '\\(a\\cos B+b\\cos A=c\\)',
            '\\(a^{2}+b^{2}=c^{2}\\)'
          ],
          answer: 'C',
          answerText: '\\(a\\cos B+b\\cos A=c\\)（射影定理）',
          solution: '<p>由正弦定理 \\(a=2R\\sin A\\)，\\(b=2R\\sin B\\)，\\(c=2R\\sin C\\)。</p>' +
            '<p>看 C 项：</p>' +
            '\\[a\\cos B+b\\cos A=2R\\left(\\sin A\\cos B+\\cos A\\sin B\\right)=2R\\sin(A+B)=2R\\sin C=c\\]' +
            '<p>对任意三角形都成立，故 C 正确。</p>' +
            '<p>再看其它项：A 项 \\(a\\sin A=b\\sin B\\) 等价于 \\(\\sin^{2}A=\\sin^{2}B\\)，即 \\(a=b\\)，只对等腰三角形成立；B 项 \\(\\dfrac{a}{\\sin B}=\\dfrac{b}{\\sin A}\\) 等价于 \\(\\dfrac{\\sin A}{\\sin B}=\\dfrac{\\sin B}{\\sin A}\\)，即 \\(\\sin A=\\sin B\\)，也只对 \\(a=b\\) 成立；D 项是勾股定理，只对直角三角形成立。</p>' +
            '<p>所以选 C。</p>'
        },
        {
          id: '10-3-2',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，求证：\\(\\dfrac{a-b}{c}=\\dfrac{\\sin A-\\sin B}{\\sin C}\\)，并由此说明“\\(a&gt;b\\) 当且仅当 \\(A&gt;B\\)”。</p>',
          answerText: '证明见解析；关键是用 \\(a=2R\\sin A\\) 等化为角，再用 \\(\\sin A-\\sin B=2\\sin\\dfrac{C}{2}\\sin\\dfrac{A-B}{2}\\) 判断符号。',
          answer: '恒等式成立，且 a>b 与 A>B 同号',
          solution: '<p><b>第一步（证明恒等式）：</b>由正弦定理 \\(a=2R\\sin A\\)，\\(b=2R\\sin B\\)，\\(c=2R\\sin C\\)，得</p>' +
            '\\[\\frac{a-b}{c}=\\frac{2R\\sin A-2R\\sin B}{2R\\sin C}=\\frac{\\sin A-\\sin B}{\\sin C}\\]' +
            '<p>恒等式成立。</p>' +
            '<p><b>第二步（说明大小关系）：</b>由和差化积</p>' +
            '\\[\\sin A-\\sin B=2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}\\]' +
            '<p>又 \\(\\dfrac{A+B}{2}=\\dfrac{\\pi}{2}-\\dfrac{C}{2}\\)，故 \\(\\cos\\dfrac{A+B}{2}=\\sin\\dfrac{C}{2}&gt;0\\)。于是</p>' +
            '\\[a-b=2R\\cdot2\\sin\\frac{C}{2}\\sin\\frac{A-B}{2}=4R\\sin\\frac{C}{2}\\sin\\frac{A-B}{2}\\]' +
            '<p>因为 \\(4R\\sin\\dfrac{C}{2}&gt;0\\)，所以 \\(a-b\\) 与 \\(\\sin\\dfrac{A-B}{2}\\) 同号；又 \\(-\\dfrac{\\pi}{2}&lt;\\dfrac{A-B}{2}&lt;\\dfrac{\\pi}{2}\\)，\\(\\sin\\dfrac{A-B}{2}\\) 与 \\(\\dfrac{A-B}{2}\\) 同号，因此 \\(a-b\\) 与 \\(A-B\\) 同号。</p>' +
            '<p>故 \\(a&gt;b\\iff A&gt;B\\)，即“大边对大角、大角对大边”。</p>'
        },
        {
          id: '10-3-3',
          kind: 'blank',
          stem: '<p>在 \\(\\triangle ABC\\) 中，若 \\(\\dfrac{a}{\\cos A}=\\dfrac{b}{\\cos B}=\\dfrac{c}{\\cos C}\\)，则 \\(\\triangle ABC\\) 是 ____ 三角形。</p>',
          blanks: [
            { before: '该三角形是', answer: ['等边', '等边三角形', '正'], after: '三角形。' }
          ],
          answer: ['等边三角形', '等边'],
          answerText: '等边三角形',
          solution: '<p>由正弦定理把边化为角：\\(\\dfrac{2R\\sin A}{\\cos A}=\\dfrac{2R\\sin B}{\\cos B}=\\dfrac{2R\\sin C}{\\cos C}\\)，约去 \\(2R\\) 得</p>' +
            '\\[\\tan A=\\tan B=\\tan C\\]' +
            '<p>由 \\(\\tan A=\\tan B\\) 得 \\(A-B=k\\pi\\)；又 \\(A,B\\in(0,\\pi)\\)，所以 \\(A-B\\in(-\\pi,\\pi)\\)，只能 \\(k=0\\)，即 \\(A=B\\)。同理 \\(B=C\\)。</p>' +
            '<p>于是 \\(A=B=C=\\dfrac{\\pi}{3}\\)，\\(\\triangle ABC\\) 为等边三角形。</p>' +
            '<p class="small muted">注意约去 \\(2R\\) 的前提是 \\(R&gt;0\\)；同时 \\(\\cos A,\\cos B,\\cos C\\) 都不为零（否则原式无意义），这排除了直角三角形的可能。</p>'
        },
        {
          id: '10-3-4',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，求证：\\(a^{2}\\sin2B+b^{2}\\sin2A=2ab\\sin C\\)。</p>',
          answerText: '证明见解析：两边分别用正弦定理化为角，左边提出 \\(8R^{2}\\sin A\\sin B\\) 后用 \\(\\sin(A+B)=\\sin C\\) 即可与右边相等。',
          answer: '恒等式成立',
          solution: '<p><b>证明：</b>由正弦定理设 \\(a=2R\\sin A\\)，\\(b=2R\\sin B\\)。</p>' +
            '<p>左边</p>' +
            '\\[a^{2}\\sin2B+b^{2}\\sin2A=4R^{2}\\sin^{2}A\\cdot2\\sin B\\cos B+4R^{2}\\sin^{2}B\\cdot2\\sin A\\cos A\\]' +
            '<p>提取公因式 \\(8R^{2}\\sin A\\sin B\\)：</p>' +
            '\\[=8R^{2}\\sin A\\sin B\\left(\\sin A\\cos B+\\cos A\\sin B\\right)=8R^{2}\\sin A\\sin B\\sin(A+B)\\]' +
            '<p>因为 \\(A+B=\\pi-C\\)，所以 \\(\\sin(A+B)=\\sin C\\)，于是</p>' +
            '\\[\\text{左边}=8R^{2}\\sin A\\sin B\\sin C\\]' +
            '<p>右边</p>' +
            '\\[2ab\\sin C=2\\cdot(2R\\sin A)(2R\\sin B)\\sin C=8R^{2}\\sin A\\sin B\\sin C\\]' +
            '<p>左边等于右边，恒等式成立。</p>'
        },
      ],
      examples: [
        {
          id: '10-3-ex-1',
          title: '边化角证明含正弦的恒等式',
          problem: '<p>在 \\(\\triangle ABC\\) 中，求证：\\(\\dfrac{a^{2}-b^{2}}{c^{2}}=\\dfrac{\\sin(A-B)}{\\sin C}\\)。</p>',
          solution: '<p><b>证明：</b>由正弦定理 \\(a=2R\\sin A\\)，\\(b=2R\\sin B\\)，\\(c=2R\\sin C\\)，把左边化为角：</p>' +
            '\\[\\frac{a^{2}-b^{2}}{c^{2}}=\\frac{4R^{2}\\left(\\sin^{2}A-\\sin^{2}B\\right)}{4R^{2}\\sin^{2}C}=\\frac{\\sin^{2}A-\\sin^{2}B}{\\sin^{2}C}\\]' +
            '<p>又由平方差与和差化积：</p>' +
            '\\[\\sin^{2}A-\\sin^{2}B=(\\sin A+\\sin B)(\\sin A-\\sin B)\\]' +
            '<p>其中</p>' +
            '\\[\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2},\\qquad \\sin A-\\sin B=2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}\\]' +
            '<p>相乘得</p>' +
            '\\[\\sin^{2}A-\\sin^{2}B=4\\sin\\frac{A+B}{2}\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}\\cos\\frac{A-B}{2}=\\sin(A+B)\\sin(A-B)\\]' +
            '<p>而 \\(\\sin(A+B)=\\sin C\\)，所以</p>' +
            '\\[\\frac{\\sin^{2}A-\\sin^{2}B}{\\sin^{2}C}=\\frac{\\sin C\\sin(A-B)}{\\sin^{2}C}=\\frac{\\sin(A-B)}{\\sin C}\\]' +
            '<p>故原式成立。</p>',
          note: '关键变形：\\(\\sin^{2}A-\\sin^{2}B=\\sin(A+B)\\sin(A-B)\\)。它把平方差结构转成两角差的正弦，再配合 \\(\\sin(A+B)=\\sin C\\) 约分。'
        }
      ]
    },
    {
      id: '10-4',
      name: '解三角形中的最值与范围',
      desc: '考查在给定边或角的条件下求周长、面积、某表达式的最大值或取值范围。主线是“余弦定理建立等式，再用基本不等式或三角函数有界性”，注意等号成立条件与角的实际范围。',
      points: [
        '已知一角与对边：由余弦定理得 \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\)，结合 \\(b^{2}+c^{2}\\ge2bc\\) 求 \\(bc\\) 的最大值。',
        '面积最值：\\(S=\\dfrac{1}{2}bc\\sin A\\)，\\(\\sin A\\) 固定时只需最大化 \\(bc\\)。',
        '转化为角：用正弦定理把边写成 \\(2R\\sin\\) 的形式，把目标式化成 \\(A\\sin x+B\\cos x\\) 型，再用辅助角公式与角的范围求值域。',
        '注意“锐角三角形”等附加条件会缩小角的取值范围，必须把范围写准；还要检查最值点能否取到。'
      ],
      questions: [
        {
          id: '10-4-1',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(A=\\dfrac{\\pi}{3}\\)，\\(a=2\\)，则 \\(\\triangle ABC\\) 面积的最大值为（　　）</p>',
          options: [
            '\\(\\sqrt{3}\\)',
            '\\(2\\sqrt{3}\\)',
            '\\(4\\sqrt{3}\\)',
            '\\(\\dfrac{\\sqrt{3}}{2}\\)'
          ],
          answer: 'A',
          answerText: '最大值为 \\(\\sqrt{3}\\)',
          solution: '<p>由余弦定理 \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\) 得</p>' +
            '\\[4=b^{2}+c^{2}-bc\\]' +
            '<p>由 \\(b^{2}+c^{2}\\ge2bc\\) 得 \\(4\\ge2bc-bc=bc\\)，即 \\(bc\\le4\\)，当且仅当 \\(b=c=2\\) 时取等号。</p>' +
            '<p>于是</p>' +
            '\\[S=\\frac{1}{2}bc\\sin A\\le\\frac{1}{2}\\times4\\times\\frac{\\sqrt{3}}{2}=\\sqrt{3}\\]' +
            '<p>当 \\(b=c=2\\)（此时为等边三角形）时面积取到最大值 \\(\\sqrt{3}\\)，选 A。</p>'
        },
        {
          id: '10-4-2',
          kind: 'blank',
          stem: '<p>在锐角 \\(\\triangle ABC\\) 中，\\(A=\\dfrac{\\pi}{3}\\)，\\(a=2\\)，则 \\(b+c\\) 的取值范围是 ____。</p>',
          blanks: [
            { before: '\\(b+c\\in\\)', answer: ['(2\\sqrt{3},4]', '(2sqrt3,4]'], after: '。' }
          ],
          answer: '(2\\sqrt{3},4]',
          answerText: '\\((2\\sqrt{3},4]\\)',
          solution: '<p>由正弦定理 \\(\\dfrac{a}{\\sin A}=2R\\)，得 \\(2R=\\dfrac{2}{\\frac{\\sqrt{3}}{2}}=\\dfrac{4\\sqrt{3}}{3}\\)。</p>' +
            '<p>于是 \\(b+c=2R(\\sin B+\\sin C)=\\dfrac{4\\sqrt{3}}{3}(\\sin B+\\sin C)\\)。</p>' +
            '<p>因为 \\(B+C=\\dfrac{2\\pi}{3}\\)，令 \\(B=\\dfrac{\\pi}{3}+t\\)，则 \\(C=\\dfrac{\\pi}{3}-t\\)。三角形为锐角三角形要求 \\(B,C\\in\\left(0,\\dfrac{\\pi}{2}\\right)\\)，故 \\(-\\dfrac{\\pi}{6}&lt;t&lt;\\dfrac{\\pi}{6}\\)。</p>' +
            '<p>用和差化积：\\(\\sin B+\\sin C=2\\sin\\dfrac{B+C}{2}\\cos\\dfrac{B-C}{2}=2\\sin\\dfrac{\\pi}{3}\\cos t=\\sqrt{3}\\cos t\\)。</p>' +
            '<p>所以 \\(b+c=\\dfrac{4\\sqrt{3}}{3}\\cdot\\sqrt{3}\\cos t=4\\cos t\\)。由 \\(t\\in\\left(-\\dfrac{\\pi}{6},\\dfrac{\\pi}{6}\\right)\\) 得 \\(\\cos t\\in\\left(\\dfrac{\\sqrt{3}}{2},1\\right]\\)，</p>' +
            '\\[b+c\\in\\left(2\\sqrt{3},4\\right]\\]' +
            '<p class="small muted">等号在 \\(t=0\\)（即 \\(B=C=\\dfrac{\\pi}{3}\\)，三角形为等边三角形）时取到。</p>'
        },
        {
          id: '10-4-3',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，已知 \\(a=2\\)，\\(A=\\dfrac{\\pi}{3}\\)，则 \\(b+c\\) 的取值范围是（　　）</p>',
          options: [
            '\\((2,4)\\)',
            '\\((2,4]\\)',
            '\\((2\\sqrt{3},4]\\)',
            '\\([2,4]\\)'
          ],
          answer: 'B',
          answerText: '\\((2,4]\\)',
          solution: '<p>由正弦定理 \\(2R=\\dfrac{a}{\\sin A}=\\dfrac{4\\sqrt{3}}{3}\\)，故 \\(b+c=\\dfrac{4\\sqrt{3}}{3}(\\sin B+\\sin C)\\)。</p>' +
            '<p>由 \\(B+C=\\dfrac{2\\pi}{3}\\) 且 \\(B,C&gt;0\\)，令 \\(B=\\dfrac{\\pi}{3}+t\\)，则 \\(C=\\dfrac{\\pi}{3}-t\\)，其中 \\(-\\dfrac{\\pi}{3}&lt;t&lt;\\dfrac{\\pi}{3}\\)。</p>' +
            '<p>于是 \\(\\sin B+\\sin C=\\sqrt{3}\\cos t\\)，\\(b+c=4\\cos t\\)。由 \\(\\cos t\\in\\left(\\dfrac{1}{2},1\\right]\\) 得 \\(b+c\\in(2,4]\\)。</p>' +
            '<p>选 B。</p>' +
            '<p class="small muted">与上一题对比：条件由“锐角三角形”放宽为“三角形”，\\(t\\) 的范围扩大，最小值由 \\(2\\sqrt{3}\\) 变成取不到的 \\(2\\)。</p>'
        },
        {
          id: '10-4-4',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，\\(A=\\dfrac{\\pi}{3}\\)，\\(b=1\\)，求 \\(\\triangle ABC\\) 面积 \\(S\\) 的取值范围。</p>',
          answerText: '\\(S\\in(0,+\\infty)\\)：由 \\(S=\\dfrac{\\sqrt{3}}{4}c\\)，而 \\(c\\) 可取任意正数。',
          answer: 'S>0',
          solution: '<p>设 \\(AC=b=1\\)，\\(AB=c\\)（\\(c&gt;0\\)）。由余弦定理</p>' +
            '\\[a^{2}=b^{2}+c^{2}-2bc\\cos A=1+c^{2}-c=\\left(c-\\frac{1}{2}\\right)^{2}+\\frac{3}{4}&gt;0\\]' +
            '<p>该式对任意 \\(c&gt;0\\) 都为正，所以每个 \\(c&gt;0\\) 都能构成唯一的三角形。</p>' +
            '<p>面积</p>' +
            '\\[S=\\frac{1}{2}bc\\sin A=\\frac{1}{2}\\times1\\times c\\times\\frac{\\sqrt{3}}{2}=\\frac{\\sqrt{3}}{4}c\\]' +
            '<p>当 \\(c\\to0^{+}\\) 时 \\(S\\to0\\)（取不到，否则三角形退化）；当 \\(c\\to+\\infty\\) 时 \\(S\\to+\\infty\\)。</p>' +
            '<p>所以 \\(S\\) 的取值范围是 \\((0,+\\infty)\\)。</p>' +
            '<p class="small muted">易错：把“\\(A\\) 与 \\(b\\) 固定”误当成“\\(b\\) 与 \\(c\\) 都固定”而去套基本不等式，从而错答成 \\(S\\le\\) 某个值。本题只固定了一边一角，\\(c\\) 完全自由，因此没有上界。</p>'
        }
      ],
      examples: [
        {
          id: '10-4-ex-1',
          title: '固定一角一对边求面积最大值',
          problem: '<p>在 \\(\\triangle ABC\\) 中，\\(C=\\dfrac{\\pi}{3}\\)，\\(c=2\\)，求 \\(\\triangle ABC\\) 面积的最大值，并指出此时三角形的形状。</p>',
          solution: '<p>由余弦定理 \\(c^{2}=a^{2}+b^{2}-2ab\\cos C\\) 得</p>' +
            '\\[4=a^{2}+b^{2}-ab\\]' +
            '<p>由 \\(a^{2}+b^{2}\\ge2ab\\) 得 \\(4\\ge2ab-ab=ab\\)，即 \\(ab\\le4\\)，当且仅当 \\(a=b=2\\) 时取等号。</p>' +
            '<p>所以</p>' +
            '\\[S=\\frac{1}{2}ab\\sin C\\le\\frac{1}{2}\\times4\\times\\frac{\\sqrt{3}}{2}=\\sqrt{3}\\]' +
            '<p>当 \\(a=b=2=c\\) 时 \\(S\\) 取到最大值 \\(\\sqrt{3}\\)，此时 \\(\\triangle ABC\\) 为边长为 \\(2\\) 的等边三角形。</p>',
          note: '方法总结：\\(S=\\frac{1}{2}ab\\sin C\\) 中 \\(\\sin C\\) 已知，问题化为求 \\(ab\\) 的最大值；由余弦定理得到 \\(a^{2}+b^{2}-ab=c^{2}\\)，再用 \\(a^{2}+b^{2}\\ge2ab\\) 夹出 \\(ab\\) 的上界。'
        },
        {
          id: '10-4-ex-2',
          title: '化为三角函数求最大值',
          problem: '<p>在 \\(\\triangle ABC\\) 中，\\(a=1\\)，\\(A=\\dfrac{\\pi}{3}\\)，求 \\(b+2c\\) 的最大值。</p>',
          solution: '<p>由正弦定理 \\(\\dfrac{a}{\\sin A}=2R\\)，得 \\(2R=\\dfrac{1}{\\frac{\\sqrt{3}}{2}}=\\dfrac{2\\sqrt{3}}{3}\\)。</p>' +
            '<p>于是 \\(b=2R\\sin B\\)，\\(c=2R\\sin C\\)，且 \\(B+C=\\dfrac{2\\pi}{3}\\)，即 \\(C=\\dfrac{2\\pi}{3}-B\\)，其中 \\(0&lt;B&lt;\\dfrac{2\\pi}{3}\\)。</p>' +
            '\\[b+2c=2R\\left(\\sin B+2\\sin C\\right)=2R\\left[\\sin B+2\\sin\\left(\\frac{2\\pi}{3}-B\\right)\\right]\\]' +
            '<p>展开 \\(\\sin\\left(\\dfrac{2\\pi}{3}-B\\right)=\\sin\\dfrac{2\\pi}{3}\\cos B-\\cos\\dfrac{2\\pi}{3}\\sin B=\\dfrac{\\sqrt{3}}{2}\\cos B+\\dfrac{1}{2}\\sin B\\)，得</p>' +
            '\\[\\sin B+2\\sin C=\\sin B+\\sqrt{3}\\cos B+\\sin B=2\\sin B+\\sqrt{3}\\cos B=\\sqrt{7}\\sin(B+\\varphi)\\]' +
            '<p>其中 \\(\\varphi\\) 为锐角且 \\(\\tan\\varphi=\\dfrac{\\sqrt{3}}{2}\\)（即 \\(\\varphi=\\arctan\\dfrac{\\sqrt{3}}{2}\\approx0.714\\)）。</p>' +
            '<p>当 \\(B+\\varphi=\\dfrac{\\pi}{2}\\)，即 \\(B=\\dfrac{\\pi}{2}-\\varphi\\) 时取到最大值 \\(1\\)。因为 \\(\\tan\\varphi=\\dfrac{\\sqrt{3}}{2}&lt;\\sqrt{3}=\\tan\\dfrac{\\pi}{3}\\)，所以 \\(\\varphi&lt;\\dfrac{\\pi}{3}\\)，从而</p>' +
            '\\[B=\\frac{\\pi}{2}-\\varphi&gt;\\frac{\\pi}{2}-\\frac{\\pi}{3}=\\frac{\\pi}{6}&gt;0,\\qquad B=\\frac{\\pi}{2}-\\varphi&lt;\\frac{\\pi}{2}&lt;\\frac{2\\pi}{3}\\]' +
            '<p>即这个 \\(B\\) 确实在允许范围 \\(\\left(0,\\dfrac{2\\pi}{3}\\right)\\) 内，最大值可以取到。</p>' +
            '<p>所以</p>' +
            '\\[(b+2c)_{\\max}=\\frac{2\\sqrt{3}}{3}\\times\\sqrt{7}=\\frac{2\\sqrt{21}}{3}\\]',
          note: '方法总结：\\(A\\sin x+B\\cos x\\) 型用辅助角公式合并为 \\(\\sqrt{A^{2}+B^{2}}\\sin(x+\\varphi)\\)；求出取最值时的角后，务必验证它是否落在变量的允许范围内。'
        }
      ]
    },
    {
      id: '10-5',
      name: '实际测量中的距离、高度与角度',
      desc: '考查把测量情境抽象为三角形并用正、余弦定理求解。关键是画准示意图：分清仰角、俯角与水平线的关系，方位角与正北方向的关系，以及哪些量在同一条基线、同一个铅垂面内。',
      points: [
        '仰角、俯角都是视线与<b>水平线</b>的夹角；同一铅垂面内两次观测可构造含两个直角三角形的方程组。',
        '已知两角一边用正弦定理；已知两边及夹角用余弦定理。',
        '方位角从正北顺时针度量；若两次观测在不同位置，要先把方向关系化为三角形的内角。'
      ],
      questions: [
        {
          id: '10-5-1',
          kind: 'choice',
          stem: '<p>在地面 \\(A\\) 处测得塔顶的仰角为 \\(30^\\circ\\)，沿水平直线前进 \\(100\\) 米到 \\(B\\) 处，测得塔顶的仰角为 \\(45^\\circ\\)，则塔高为（　　）</p>',
          options: [
            '\\(50\\sqrt{3}\\) 米',
            '\\(50(\\sqrt{3}+1)\\) 米',
            '\\(100(\\sqrt{3}-1)\\) 米',
            '\\(100\\) 米'
          ],
          answer: 'B',
          answerText: '\\(50(\\sqrt{3}+1)\\) 米',
          solution: '<p>设塔高 \\(PQ=h\\)（\\(Q\\) 为塔底），则 \\(PQ\\perp\\) 水平面，\\(\\angle PQA=90^\\circ\\)。</p>' +
            '<p>在 \\(Rt\\triangle PQB\\) 中，\\(\\angle PBQ=45^\\circ\\)，所以 \\(BQ=h\\)。</p>' +
            '<p>在 \\(Rt\\triangle PQA\\) 中，\\(\\angle PAQ=30^\\circ\\)，所以 \\(AQ=\\dfrac{h}{\\tan30^\\circ}=\\sqrt{3}h\\)。</p>' +
            '<p>又 \\(A,B,Q\\) 在一条水平直线上且 \\(AB=100\\)，故 \\(AQ-BQ=AB\\)，即</p>' +
            '\\[\\sqrt{3}h-h=100\\]' +
            '<p>解得 \\(h=\\dfrac{100}{\\sqrt{3}-1}=\\dfrac{100(\\sqrt{3}+1)}{2}=50(\\sqrt{3}+1)\\)（米），选 B。</p>' +
            '<p class="small muted">也可用正弦定理：在 \\(\\triangle PAB\\) 中 \\(\\angle PAB=30^\\circ\\)，\\(\\angle APB=45^\\circ-30^\\circ=15^\\circ\\)，\\(AB=100\\)，故 \\(PB=\\dfrac{100\\sin30^\\circ}{\\sin15^\\circ}\\)，再由 \\(h=PB\\sin45^\\circ\\) 得到同一结果（利用 \\(\\sin15^\\circ=\\dfrac{\\sqrt{6}-\\sqrt{2}}{4}\\)）。</p>'
        },
        {
          id: '10-5-2',
          kind: 'blank',
          stem: '<p>为测量两座建筑 \\(A,B\\) 之间的距离，在一点 \\(C\\) 处测得 \\(CA=60\\) 米，\\(CB=80\\) 米，\\(\\angle ACB=60^\\circ\\)，则 \\(AB=\\) ____ 米。</p>',
          blanks: [
            { before: '\\(AB=\\)', answer: ['20\\sqrt{13}', '20sqrt13'], after: ' 米。' }
          ],
          answer: '20\\sqrt{13}',
          answerText: '\\(20\\sqrt{13}\\) 米（约 \\(72.1\\) 米）',
          solution: '<p>在 \\(\\triangle ABC\\) 中已知两边及夹角，用余弦定理：</p>' +
            '\\[AB^{2}=CA^{2}+CB^{2}-2\\cdot CA\\cdot CB\\cos\\angle ACB=3600+6400-2\\times60\\times80\\times\\frac{1}{2}\\]' +
            '<p>即 \\(AB^{2}=3600+6400-4800=5200\\)，所以 \\(AB=\\sqrt{5200}=20\\sqrt{13}\\)（米）。</p>'
        },
        {
          id: '10-5-3',
          kind: 'short',
          stem: '<p>在山脚 \\(A\\) 处测得山顶 \\(P\\) 的仰角为 \\(45^\\circ\\)，沿与水平面成 \\(30^\\circ\\) 的斜坡向上走 \\(100\\) 米到达 \\(B\\) 处，在 \\(B\\) 处测得山顶 \\(P\\) 的仰角为 \\(60^\\circ\\)。求山高（点 \\(P\\) 到水平面的距离）。</p>',
          answerText: '\\(50(\\sqrt{3}+1)\\) 米，约 \\(136.6\\) 米',
          answer: '50(\\sqrt{3}+1) 米',
          solution: '<p>设山高 \\(PQ=h\\)（\\(Q\\) 为 \\(P\\) 在水平面上的投影）。</p>' +
            '<p>在 \\(Rt\\triangle PQA\\) 中，\\(\\angle PAQ=45^\\circ\\)，所以 \\(AQ=h\\)。</p>' +
            '<p>\\(B\\) 在斜坡上且 \\(AB=100\\)，斜坡与水平面成 \\(30^\\circ\\)，故 \\(B\\) 比 \\(A\\) 高</p>' +
            '\\[100\\sin30^\\circ=50\\text{ 米}\\]' +
            '<p>且 \\(B\\) 与 \\(A\\) 的水平距离为 \\(100\\cos30^\\circ=50\\sqrt{3}\\) 米。</p>' +
            '<p>于是 \\(P\\) 比 \\(B\\) 高 \\((h-50)\\) 米，\\(P\\) 与 \\(B\\) 的水平距离为 \\((h-50\\sqrt{3})\\) 米。由 \\(B\\) 处仰角为 \\(60^\\circ\\)：</p>' +
            '\\[\\frac{h-50}{h-50\\sqrt{3}}=\\tan60^\\circ=\\sqrt{3}\\]' +
            '<p>去分母得 \\(h-50=\\sqrt{3}h-150\\)，即 \\(\\left(\\sqrt{3}-1\\right)h=100\\)，所以</p>' +
            '\\[h=\\frac{100}{\\sqrt{3}-1}=50\\left(\\sqrt{3}+1\\right)\\approx136.6\\text{（米）}\\]' +
            '<p class="small muted">核对：\\(h-50\\approx86.6\\)，\\(h-50\\sqrt{3}\\approx136.6-86.6=50\\)，而 \\(86.6\\div50\\approx1.732=\\sqrt{3}\\)，与 \\(\\tan60^\\circ\\) 一致。</p>'
        },
        {
          id: '10-5-4',
          kind: 'short',
          stem: '<p>某船在 \\(A\\) 处测得灯塔 \\(S\\) 在北偏东 \\(30^\\circ\\) 方向，且 \\(AS=10\\) 海里；该船沿正东方向航行到达 \\(B\\) 处，此时测得灯塔 \\(S\\) 在正北方向。求 \\(B\\) 到灯塔 \\(S\\) 的距离以及 \\(AB\\) 的长。</p>',
          solution: '<p>以 \\(A\\) 为原点，正东为 \\(x\\) 轴正方向、正北为 \\(y\\) 轴正方向建系。由 \\(AS=10\\) 且 \\(S\\) 在 \\(A\\) 的北偏东 \\(30^\\circ\\) 方向（即该方向与正东方向成 \\(90^\\circ-30^\\circ=60^\\circ\\)）：</p>' +
            '\\[S\\left(10\\cos60^\\circ,\\ 10\\sin60^\\circ\\right)=\\left(5,\\ 5\\sqrt{3}\\right)\\]' +
            '<p>因为 \\(B\\) 在 \\(A\\) 的正东方向，可设 \\(B(b,0)\\)。又 \\(S\\) 在 \\(B\\) 的正北方向，说明 \\(S\\) 与 \\(B\\) 的横坐标相同，故 \\(b=5\\)，即 \\(AB=5\\) 海里。</p>' +
            '<p>于是</p>' +
            '\\[BS=5\\sqrt{3}\\approx8.66\\text{（海里）}\\]' +
            '<p>也可用解三角形的方法：在 \\(\\triangle ABS\\) 中，\\(AB\\) 沿正东、\\(BS\\) 沿正北，所以 \\(\\angle ABS=90^\\circ\\)；又 \\(\\angle SAB=90^\\circ-30^\\circ=60^\\circ\\)，\\(AS=10\\) 是斜边。于是</p>' +
            '\\[BS=AS\\sin60^\\circ=10\\times\\frac{\\sqrt{3}}{2}=5\\sqrt{3},\\qquad AB=AS\\cos60^\\circ=10\\times\\frac{1}{2}=5\\]' +
            '<p>所以 \\(B\\) 到灯塔 \\(S\\) 的距离为 \\(5\\sqrt{3}\\) 海里，\\(AB\\) 的长为 \\(5\\) 海里。</p>' +
            '<p class="small muted">方法总结：方位角问题先建系（正东为 \\(x\\) 轴、正北为 \\(y\\) 轴），把“北偏东 \\(\\theta\\)”翻译成“与正东方向成 \\(90^\\circ-\\theta\\)”，再核对坐标关系；本例中“\\(S\\) 在 \\(B\\) 的正北方向”直接给出横坐标相等，比套公式更快。</p>',
          answer: '5\\sqrt{3} 海里',
          answerText: '\\(BS=5\\sqrt{3}\\) 海里，\\(AB=5\\) 海里'
        }
      ],
      examples: [
        {
          id: '10-5-ex-1',
          title: '底部不可达时测高',
          problem: '<p>为测量河对岸一座塔的高度，在河这一侧的同一条水平基线上取 \\(C,D\\) 两点，\\(CD=20\\) 米。在 \\(C\\) 处测得塔顶的仰角为 \\(30^\\circ\\)，在 \\(D\\) 处测得塔顶的仰角为 \\(45^\\circ\\)（\\(C,D\\) 与塔底在同一铅垂面内）。求塔高（精确到 \\(0.1\\) 米，取 \\(\\sqrt{3}\\approx1.732\\)）。</p>',
          solution: '<p>设塔高 \\(PQ=h\\)，塔底为 \\(Q\\)。由仰角的定义，\\(PQ\\perp\\) 水平面，故 \\(\\angle PQC=\\angle PQD=90^\\circ\\)。</p>' +
            '<p>在 \\(Rt\\triangle PQC\\) 与 \\(Rt\\triangle PQD\\) 中分别有</p>' +
            '\\[CQ=\\frac{h}{\\tan30^\\circ}=\\sqrt{3}h,\\qquad DQ=\\frac{h}{\\tan45^\\circ}=h\\]' +
            '<p>因为在 \\(D\\) 处仰角更大，说明 \\(D\\) 离塔更近，故 \\(CQ-DQ=CD=20\\)：</p>' +
            '\\[\\sqrt{3}h-h=20\\]' +
            '<p>所以</p>' +
            '\\[h=\\frac{20}{\\sqrt{3}-1}=10\\left(\\sqrt{3}+1\\right)\\approx10\\times2.732=27.3\\text{（米）}\\]' +
            '<p>即塔高约为 \\(27.3\\) 米。</p>',
          note: '方法总结：同一铅垂面内两次测仰角，用两个直角三角形写出“底边之差等于基线长”的方程即可，不必使用正弦定理。方向不能写反：仰角大的点离物体更近。'
        }
      ]
    },
    {
      id: '10-6',
      name: '与三角函数、平面向量的综合',
      desc: '考查解三角形与三角恒等变换、平面向量数量积的交汇。常见形式：给出向量垂直或数量积条件求角，或给出含三角函数的边角关系求面积与最值。',
      points: [
        '向量条件先化为三角方程：\\(\\vec m\\cdot\\vec n=0\\) 表示 \\(\\vec m\\perp\\vec n\\)，\\(\\vec m\\cdot\\vec n=\\sin C\\) 则是关于 \\(A,B\\) 的三角方程。',
        '出现 \\(\\sin2A\\)、\\(\\cos2A\\) 时用二倍角公式降次，再用和差化积或辅助角公式合并。',
        '求最值时要回到余弦定理或正弦定理把目标式写成单变量函数，并明确角的取值范围。'
      ],
      questions: [
        {
          id: '10-6-1',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，设 \\(\\vec m=(\\sin A,\\sin B)\\)，\\(\\vec n=(\\cos A,\\cos B)\\)，若 \\(\\vec m\\cdot\\vec n=\\sin C\\)，则 \\(\\triangle ABC\\) 是（　　）</p>',
          options: [
            '等腰三角形',
            '直角三角形',
            '等边三角形',
            '等腰直角三角形'
          ],
          answer: 'A',
          answerText: '等腰三角形（\\(A=B\\)）',
          solution: '<p>由数量积的定义：</p>' +
            '\\[\\vec m\\cdot\\vec n=\\sin A\\cos A+\\sin B\\cos B=\\sin C\\]' +
            '<p>用二倍角公式与和差化积：</p>' +
            '\\[\\sin A\\cos A+\\sin B\\cos B=\\frac{1}{2}\\left(\\sin2A+\\sin2B\\right)=\\sin(A+B)\\cos(A-B)\\]' +
            '<p>又 \\(A+B=\\pi-C\\)，故 \\(\\sin(A+B)=\\sin C\\)，原式化为</p>' +
            '\\[\\sin C\\cos(A-B)=\\sin C\\]' +
            '<p>因为 \\(0&lt;C&lt;\\pi\\)，\\(\\sin C&gt;0\\)，两边约去 \\(\\sin C\\) 得 \\(\\cos(A-B)=1\\)。</p>' +
            '<p>又 \\(A-B\\in(-\\pi,\\pi)\\)，故 \\(A-B=0\\)，即 \\(A=B\\)。</p>' +
            '<p>所以 \\(\\triangle ABC\\) 是等腰三角形，选 A。</p>' +
            '<p class="small muted">易错：\\(\\sin2A+\\sin2B=2\\sin(A+B)\\cos(A-B)\\)，是“加”对应“\\(\\cos(A-B)\\)”，不要与 \\(\\sin A+\\sin B\\) 的公式混用。</p>'
        },
        {
          id: '10-6-2',
          kind: 'blank',
          stem: '<p>在 \\(\\triangle ABC\\) 中，设 \\(\\vec p=(a+c,b)\\)，\\(\\vec q=(b-a,c-a)\\)。若 \\(\\vec p\\parallel\\vec q\\)，则 \\(C=\\) ____。</p>',
          blanks: [
            { before: '\\(C=\\)', answer: ['\\frac{\\pi}{3}', 'pi/3', '\\pi/3', '60^{\\circ}'], after: '。' }
          ],
          answer: '\\frac{\\pi}{3}',
          answerText: '\\(C=\\dfrac{\\pi}{3}\\)',
          solution: '<p>由 \\(\\vec p\\parallel\\vec q\\) 得 \\((a+c)(c-a)-b(b-a)=0\\)，即</p>' +
            '\\[c^{2}-a^{2}-b^{2}+ab=0\\]' +
            '<p>整理得 \\(a^{2}+b^{2}-c^{2}=ab\\)。</p>' +
            '<p>由余弦定理 \\(c^{2}=a^{2}+b^{2}-2ab\\cos C\\)，即 \\(a^{2}+b^{2}-c^{2}=2ab\\cos C\\)，代入得</p>' +
            '\\[2ab\\cos C=ab\\]' +
            '<p>因为 \\(ab&gt;0\\)，所以 \\(\\cos C=\\dfrac{1}{2}\\)，故 \\(C=\\dfrac{\\pi}{3}\\)。</p>'
        },
        {
          id: '10-6-3',
          kind: 'choice',
          stem: '<p>在 \\(\\triangle ABC\\) 中，设 \\(\\vec u=(\\cos A,\\sin A)\\)，\\(\\vec v=(1,\\sqrt{3})\\)，则 \\(\\vec u\\cdot\\vec v\\) 的取值范围是（　　）</p>',
          options: [
            '\\((-1,2]\\)',
            '\\((-2,1]\\)',
            '\\([-1,2)\\)',
            '\\((-1,2)\\)'
          ],
          answer: 'A',
          answerText: '\\((-1,2]\\)',
          solution: '<p>由数量积：</p>' +
            '\\[\\vec u\\cdot\\vec v=\\cos A+\\sqrt{3}\\sin A=2\\left(\\frac{1}{2}\\cos A+\\frac{\\sqrt{3}}{2}\\sin A\\right)=2\\sin\\left(A+\\frac{\\pi}{6}\\right)\\]' +
            '<p>因为 \\(A\\) 是三角形的内角，\\(0&lt;A&lt;\\pi\\)，所以 \\(A+\\dfrac{\\pi}{6}\\in\\left(\\dfrac{\\pi}{6},\\dfrac{7\\pi}{6}\\right)\\)。</p>' +
            '<p>在 \\(\\left(\\dfrac{\\pi}{6},\\dfrac{7\\pi}{6}\\right)\\) 上，\\(\\sin\\) 先增后减：\\(\\sin\\dfrac{\\pi}{2}=1\\) 且 \\(\\dfrac{\\pi}{2}\\) 在区间内，故最大值为 \\(1\\)；两个端点处 \\(\\sin\\dfrac{\\pi}{6}=\\dfrac{1}{2}\\)、\\(\\sin\\dfrac{7\\pi}{6}=-\\dfrac{1}{2}\\) 都取不到，而区间内函数值恒大于 \\(-\\dfrac{1}{2}\\)（因为 \\(\\sin\\) 在 \\(\\left(\\dfrac{\\pi}{6},\\dfrac{\\pi}{2}\\right)\\) 上递增、在 \\(\\left(\\dfrac{\\pi}{2},\\dfrac{7\\pi}{6}\\right)\\) 上递减至 \\(-\\dfrac{1}{2}\\)），所以 \\(\\sin\\left(A+\\dfrac{\\pi}{6}\\right)\\in\\left(-\\dfrac{1}{2},1\\right]\\)。</p>' +
            '<p>故 \\(\\vec u\\cdot\\vec v\\in(-1,2]\\)，选 A。</p>'
        },
        {
          id: '10-6-4',
          kind: 'short',
          stem: '<p>在 \\(\\triangle ABC\\) 中，角 \\(A,B,C\\) 的对边分别为 \\(a,b,c\\)，且 \\(a\\cos C+\\dfrac{\\sqrt{3}}{3}c\\sin A=b\\)。若 \\(a=1\\)，求 \\(\\triangle ABC\\) 面积的最大值。</p>',
          answerText: '最大值为 \\(\\dfrac{\\sqrt{3}}{4}\\)',
          answer: '\\sqrt{3}/4',
          solution: '<p>由射影定理 \\(b=a\\cos C+c\\cos A\\)，与已知条件 \\(b=a\\cos C+\\dfrac{\\sqrt{3}}{3}c\\sin A\\) 比较得</p>' +
            '\\[c\\cos A=\\frac{\\sqrt{3}}{3}c\\sin A\\]' +
            '<p>因为 \\(c&gt;0\\)，两边约去 \\(c\\) 得 \\(\\cos A=\\dfrac{\\sqrt{3}}{3}\\sin A\\)，即 \\(\\tan A=\\sqrt{3}\\)。</p>' +
            '<p>由 \\(0&lt;A&lt;\\pi\\) 得 \\(A=\\dfrac{\\pi}{3}\\)。</p>' +
            '<p>又 \\(a=1\\)，由余弦定理 \\(1=b^{2}+c^{2}-bc\\)，结合 \\(b^{2}+c^{2}\\ge2bc\\) 得 \\(1\\ge bc\\)，即 \\(bc\\le1\\)，当且仅当 \\(b=c=1\\) 时取等号。</p>' +
            '<p>于是</p>' +
            '\\[S=\\frac{1}{2}bc\\sin A\\le\\frac{1}{2}\\times1\\times\\frac{\\sqrt{3}}{2}=\\frac{\\sqrt{3}}{4}\\]' +
            '<p>所以面积的最大值为 \\(\\dfrac{\\sqrt{3}}{4}\\)，此时三角形为边长 \\(1\\) 的等边三角形。</p>'
        }
      ],
      examples: [
        {
          id: '10-6-ex-1',
          title: '向量数量积与余弦定理的综合',
          problem: '<p>在 \\(\\triangle ABC\\) 中，\\(A=\\dfrac{\\pi}{3}\\)，且 \\(\\vec{AB}\\cdot\\vec{AC}=4\\)。求 \\(\\triangle ABC\\) 的面积，并求 \\(|\\vec{BC}|\\) 的最小值。</p>',
          solution: '<p><b>第一步：用数量积的定义求出两边之积。</b>由数量积的几何意义，</p>' +
            '\\[\\vec{AB}\\cdot\\vec{AC}=|\\vec{AB}|\\,|\\vec{AC}|\\cos A=bc\\cos A\\]' +
            '<p>把 \\(A=\\dfrac{\\pi}{3}\\)，\\(\\cos A=\\dfrac{1}{2}\\) 与 \\(\\vec{AB}\\cdot\\vec{AC}=4\\) 代入：</p>' +
            '\\[\\frac{1}{2}bc=4\\quad\\Longrightarrow\\quad bc=8\\]' +
            '<p><b>第二步：求面积。</b></p>' +
            '\\[S=\\frac{1}{2}bc\\sin A=\\frac{1}{2}\\times8\\times\\frac{\\sqrt{3}}{2}=2\\sqrt{3}\\]' +
            '<p><b>第三步：用余弦定理求 \\(|\\vec{BC}|\\)。</b>因为 \\(\\vec{BC}=\\vec{AC}-\\vec{AB}\\)，所以</p>' +
            '\\[|\\vec{BC}|^{2}=|\\vec{AC}|^{2}+|\\vec{AB}|^{2}-2\\vec{AC}\\cdot\\vec{AB}=b^{2}+c^{2}-2\\times4=b^{2}+c^{2}-8\\]' +
            '<p>由 \\(bc=8\\) 及基本不等式 \\(b^{2}+c^{2}\\ge2bc=16\\)，得</p>' +
            '\\[|\\vec{BC}|^{2}\\ge16-8=8\\]' +
            '<p>所以 \\(|\\vec{BC}|\\ge2\\sqrt{2}\\)，当且仅当 \\(b=c=2\\sqrt{2}\\) 时取到最小值 \\(2\\sqrt{2}\\)。</p>' +
            '<p><b>结论：</b>\\(\\triangle ABC\\) 的面积为 \\(2\\sqrt{3}\\)；\\(|\\vec{BC}|\\) 的最小值为 \\(2\\sqrt{2}\\)。</p>' +
            '<p class="small muted">检验：当 \\(b=c=2\\sqrt{2}\\) 时 \\(A=\\dfrac{\\pi}{3}\\) 且 \\(bc=8\\)，此时三角形为等腰三角形，\\(|\\vec{BC}|^{2}=8+8-8=8\\)，与结论一致。</p>',
          note: '方法总结：向量数量积 \\(\\vec{AB}\\cdot\\vec{AC}=bc\\cos A\\) 是“边与角”的桥梁，它与面积公式 \\(S=\\frac{1}{2}bc\\sin A\\) 共用同一个 \\(bc\\)，因此由数量积求出 \\(bc\\) 后，面积与余弦定理都能立刻算出；求最值时把 \\(\\vec{BC}=\\vec{AC}-\\vec{AB}\\) 两边平方，再交给基本不等式。'
        }
      ]
    }
  ]
});
