/*!
 * t-8-三角函数.js —— 第 8 章「三角函数」题型与例题
 */
DSHData.registerTypes({
  id: 8,
  name: '三角函数',
  brief: '本章题目的通用思路是“三看”：一看角（是否需要化到同一个角），二看名（是否需要化同名，切化弦或弦化切），三看结构（能否配方、能否用辅助角公式合并）。求值问题必须由象限定符号，图像问题要紧扣周期与五点。',

  types: [
    {
      id: '8-1',
      name: '三角函数化简、求值与恒等式证明',
      desc: '考查诱导公式、同角关系与和差角公式的综合运用。化简的次序是：先用诱导公式把角统一到锐角或同一角，再用同角关系统一函数名，最后约分、合并。证明恒等式通常从较复杂的一边出发向另一边变形。',
      points: [
        '诱导公式口诀“奇变偶不变，符号看象限”，使用时先确定 \\(\\frac{k\\pi}{2}\\pm\\alpha\\) 中 \\(k\\) 的奇偶。',
        '“切化弦”是把正切化为 \\(\\frac{\\sin\\alpha}{\\cos\\alpha}\\)，这是通分、约分的前提。',
        '“弦化切”适用于齐次式：分子分母同除以 \\(\\cos\\alpha\\) 的最高次幂。',
        '化简结果应尽量化为最简形式，并注意 \\(\\cos\\alpha\\ne0\\) 等隐含条件。',
        '证明恒等式可用“左边推右边”或“作差比较”，不要对等式两边同时变形。'
      ],
      questions: [
        {
          id: '8-1-1',
          kind: 'choice',
          stem: '计算 \\(\\sin 150^{\\circ}+\\cos 120^{\\circ}\\) 的值为（　　）。',
          options: [
            '\\(0\\)',
            '\\(1\\)',
            '\\(-1\\)',
            '\\(\\frac12\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>用诱导公式把角化到锐角。</p><p>\\(\\sin 150^{\\circ}=\\sin\\left(180^{\\circ}-30^{\\circ}\\right)=\\sin 30^{\\circ}=\\frac12\\)。</p><p>\\(\\cos 120^{\\circ}=\\cos\\left(180^{\\circ}-60^{\\circ}\\right)=-\\cos 60^{\\circ}=-\\frac12\\)。</p><p>所以原式 \\(=\\frac12-\\frac12=0\\)，选 A。</p><p>注意 \\(\\cos\\) 在第二象限取负号，这正是“符号看象限”的体现。</p>'
        },
        {
          id: '8-1-2',
          kind: 'short',
          stem: '已知 \\(\\alpha\\) 是第二象限角，且 \\(\\sin\\alpha=\\frac35\\)，求 \\(\\cos\\alpha\\)、\\(\\tan\\alpha\\) 的值。',
          answer: 'cosα=-4/5, tanα=-3/4',
          answerText: '\\(\\cos\\alpha=-\\frac45\\)，\\(\\tan\\alpha=-\\frac34\\)',
          solution: '<p>由平方关系 \\(\\sin^{2}\\alpha+\\cos^{2}\\alpha=1\\) 得</p><p>\\(\\cos^{2}\\alpha=1-\\left(\\frac35\\right)^{2}=1-\\frac{9}{25}=\\frac{16}{25}\\)，故 \\(\\cos\\alpha=\\pm\\frac45\\)。</p><p>因为 \\(\\alpha\\) 是第二象限角，该象限内余弦为负，所以 \\(\\cos\\alpha=-\\frac45\\)。</p><p>再由商数关系 \\(\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}=\\frac{\\frac35}{-\\frac45}=-\\frac34\\)。</p>'
        },
        {
          id: '8-1-3',
          kind: 'short',
          stem: '化简 \\(\\frac{\\sin^{2}\\alpha}{\\cos\\alpha}+\\cos\\alpha\\)（\\(\\cos\\alpha\\ne0\\)），并说明化简结果的取值范围。',
          answer: '1/cosα',
          answerText: '\\(\\frac{1}{\\cos\\alpha}\\)，取值范围为 \\((-\\infty,-1]\\cup[1,+\\infty)\\)',
          solution: '<p>通分：\\(\\frac{\\sin^{2}\\alpha}{\\cos\\alpha}+\\cos\\alpha=\\frac{\\sin^{2}\\alpha+\\cos^{2}\\alpha}{\\cos\\alpha}=\\frac{1}{\\cos\\alpha}\\)。</p><p>这一步用到了平方关系 \\(\\sin^{2}\\alpha+\\cos^{2}\\alpha=1\\)。</p><p>因为 \\(\\cos\\alpha\\in[-1,1]\\) 且 \\(\\cos\\alpha\\ne0\\)，所以 \\(\\frac{1}{\\cos\\alpha}\\in(-\\infty,-1]\\cup[1,+\\infty)\\)。</p>'
        },
        {
          id: '8-1-4',
          kind: 'choice',
          stem: '若 \\(\\alpha\\) 是第三象限角，则下列各式一定为正值的是（　　）。',
          options: [
            '\\(\\sin\\alpha-\\cos\\alpha\\)',
            '\\(\\sin\\alpha+\\cos\\alpha\\)',
            '\\(\\frac{\\cos\\alpha}{\\tan\\alpha}\\)',
            '\\(\\sin\\alpha\\cos\\alpha\\)'
          ],
          answer: 'D',
          answerText: 'D',
          solution: '<p>第三象限内 \\(\\sin\\alpha&lt;0\\)，\\(\\cos\\alpha&lt;0\\)。</p><p>D：\\(\\sin\\alpha\\cos\\alpha\\) 是两个负数之积，恒为正，符合题意。</p><p>B：\\(\\sin\\alpha+\\cos\\alpha\\) 是两个负数之和，恒为负，不符合。</p><p>C：\\(\\frac{\\cos\\alpha}{\\tan\\alpha}=\\frac{\\cos\\alpha}{\\frac{\\sin\\alpha}{\\cos\\alpha}}=\\frac{\\cos^{2}\\alpha}{\\sin\\alpha}\\)。分子 \\(\\cos^{2}\\alpha>0\\)，分母 \\(\\sin\\alpha&lt;0\\)，故该式恒为负，不符合。</p><p>A：\\(\\sin\\alpha-\\cos\\alpha\\) 的符号不确定。例如 \\(\\alpha=225^{\\circ}\\) 时 \\(\\sin\\alpha=\\cos\\alpha\\)，差为 0；\\(\\alpha=200^{\\circ}\\) 时差约为 0.598；\\(\\alpha=250^{\\circ}\\) 时 \\(\\sin\\alpha\\approx-0.940\\)，\\(\\cos\\alpha\\approx-0.342\\)，差约为 \\(-0.598\\)。</p><p>所以只有 D 一定为正值，选 D。</p>',
          note: '第三象限 \\(\\sin\\alpha&lt;0\\)、\\(\\cos\\alpha&lt;0\\)、\\(\\tan\\alpha>0\\)。判断符号时把式子化为只含 \\(\\sin\\alpha\\)、\\(\\cos\\alpha\\) 的形式，再逐个定号最稳妥。'
        }
      ],
      examples: [
        {
          id: '8-1-ex-1',
          title: '切化弦与齐次式求值',
          problem: '已知 \\(\\tan\\alpha=2\\)，求 \\(\\frac{\\sin\\alpha+2\\cos\\alpha}{2\\sin\\alpha-\\cos\\alpha}\\) 的值。',
          solution: '<p>分子、分母都是关于 \\(\\sin\\alpha\\)、\\(\\cos\\alpha\\) 的一次齐次式。因为 \\(\\tan\\alpha=2\\) 有意义，所以 \\(\\cos\\alpha\\ne0\\)。</p><p>分子分母同除以 \\(\\cos\\alpha\\)：</p><p>\\(\\frac{\\sin\\alpha+2\\cos\\alpha}{2\\sin\\alpha-\\cos\\alpha}=\\frac{\\tan\\alpha+2}{2\\tan\\alpha-1}\\)。</p><p>代入 \\(\\tan\\alpha=2\\) 得 \\(\\frac{2+2}{4-1}=\\frac43\\)。</p>',
          note: '凡是分子分母同为 \\(\\sin\\alpha\\)、\\(\\cos\\alpha\\) 的同次齐次式，都可以用“弦化切”整体代入，无需先求出 \\(\\sin\\alpha\\)、\\(\\cos\\alpha\\) 的具体值。'
        },
        {
          id: '8-1-ex-2',
          title: '用诱导公式化简',
          problem: '化简 \\(\\frac{\\sin(\\pi-\\alpha)\\cos(2\\pi-\\alpha)\\tan(-\\alpha+\\pi)}{\\cos\\left(-\\alpha-\\pi\\right)\\sin(-\\pi-\\alpha)}\\)。',
          solution: '<p>逐项用诱导公式：</p><p>\\(\\sin(\\pi-\\alpha)=\\sin\\alpha\\)；\\(\\cos(2\\pi-\\alpha)=\\cos(-\\alpha)=\\cos\\alpha\\)。</p><p>\\(\\tan(-\\alpha+\\pi)=\\tan(\\pi-\\alpha)=-\\tan\\alpha\\)。</p><p>\\(\\cos(-\\alpha-\\pi)=\\cos(\\pi+\\alpha)=-\\cos\\alpha\\)；\\(\\sin(-\\pi-\\alpha)=-\\sin(\\pi+\\alpha)=-(-\\sin\\alpha)=\\sin\\alpha\\)。</p><p>代入原式：</p><p>原式 \\(=\\frac{\\sin\\alpha\\cdot\\cos\\alpha\\cdot(-\\tan\\alpha)}{(-\\cos\\alpha)\\cdot\\sin\\alpha}=\\frac{-\\sin\\alpha\\cos\\alpha\\tan\\alpha}{-\\cos\\alpha\\sin\\alpha}=\\tan\\alpha\\)。</p><p>所以化简结果为 \\(\\tan\\alpha\\)（要求 \\(\\sin\\alpha\\cos\\alpha\\ne0\\)）。</p>',
          note: '化简时先把每一项单独化到最简，再整体约分，比边约分边化更不易出错。'
        }
      ]
    },

    {
      id: '8-2',
      name: '给值求值与给值求角',
      desc: '“给值求值”是把已知角与目标角用和差倍半关系联系起来，再用公式展开；“给值求角”则先求出该角的某个三角函数值，再由范围确定角的唯一取值，最后回代检验。关键是由象限确定开方后的符号。',
      points: [
        '先看已知角与所求角的关系：是同一个角、互余互补，还是相差 \\(\\frac{\\pi}{2}\\) 的整数倍。',
        '用平方关系开方时，必须由角的范围确定正负号。',
        '给值求角的步骤：求三角函数值 → 缩小角的范围 → 确定角 → 检验。',
        '求角时常选用余弦或正切（在 \\(\\left(0,\\pi\\right)\\) 内单调），以减少多解。',
        '整体代换：把 \\(\\alpha+\\beta\\)、\\(\\alpha-\\beta\\) 视为新角，避免把 \\(\\alpha\\)、\\(\\beta\\) 分别求出。'
      ],
      questions: [
        {
          id: '8-2-1',
          kind: 'choice',
          stem: '已知 \\(\\sin\\alpha=\\frac13\\)，且 \\(\\alpha\\in\\left(\\frac{\\pi}{2},\\pi\\right)\\)，则 \\(\\cos\\alpha=\\)（　　）。',
          options: [
            '\\(\\frac{2\\sqrt2}{3}\\)',
            '\\(-\\frac{2\\sqrt2}{3}\\)',
            '\\(\\pm\\frac{2\\sqrt2}{3}\\)',
            '\\(-\\frac13\\)'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>由平方关系得 \\(\\cos^{2}\\alpha=1-\\sin^{2}\\alpha=1-\\frac19=\\frac89\\)，所以 \\(\\cos\\alpha=\\pm\\frac{2\\sqrt2}{3}\\)。</p><p>因为 \\(\\alpha\\in\\left(\\frac{\\pi}{2},\\pi\\right)\\)，终边在第二象限，该象限内余弦为负，故 \\(\\cos\\alpha=-\\frac{2\\sqrt2}{3}\\)。</p><p>故选 B。选项 C 忽略了象限对符号的限制，选项 D 误把 \\(\\sin\\) 与 \\(\\cos\\) 混淆。</p>'
        },
        {
          id: '8-2-2',
          kind: 'blank',
          stem: '已知 \\(\\alpha\\)、\\(\\beta\\) 都是锐角，且 \\(\\cos\\alpha=\\frac45\\)，\\(\\cos\\beta=\\frac{5}{13}\\)，则 \\(\\cos(\\alpha+\\beta)=\\) ',
          blanks: [
            { before: '\\(\\cos(\\alpha+\\beta)=\\) ', answer: ['-16/65'], after: '。' }
          ],
          answer: '-16/65',
          answerText: '\\(-\\frac{16}{65}\\)',
          solution: '<p>因为 \\(\\alpha\\)、\\(\\beta\\) 都是锐角，所以它们的正弦都为正。</p><p>由平方关系得 \\(\\sin\\alpha=\\sqrt{1-\\left(\\frac45\\right)^{2}}=\\frac35\\)，\\(\\sin\\beta=\\sqrt{1-\\left(\\frac{5}{13}\\right)^{2}}=\\frac{12}{13}\\)。</p><p>再用两角和的余弦公式：</p><p>\\(\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta=\\frac45\\times\\frac{5}{13}-\\frac35\\times\\frac{12}{13}=\\frac{20}{65}-\\frac{36}{65}=-\\frac{16}{65}\\)。</p><p>结果为负，说明 \\(\\alpha+\\beta\\) 是钝角，这与 \\(\\frac45\\cdot\\frac{5}{13}&lt;\\frac35\\cdot\\frac{12}{13}\\) 也是吻合的。</p>'
        },
        {
          id: '8-2-3',
          kind: 'short',
          stem: '已知 \\(\\alpha\\) 为钝角、\\(\\beta\\) 为锐角，且 \\(\\tan\\alpha=-\\frac34\\)，\\(\\tan\\beta=\\frac13\\)，求 \\(\\tan(\\alpha+\\beta)\\) 的值。',
          answer: '-5/9',
          answerText: '\\(-\\frac59\\)',
          solution: '<p>直接用两角和的正切公式：</p><p>\\(\\tan(\\alpha+\\beta)=\\frac{\\tan\\alpha+\\tan\\beta}{1-\\tan\\alpha\\tan\\beta}\\)。</p><p>先算分子：\\(\\tan\\alpha+\\tan\\beta=-\\frac34+\\frac13=-\\frac{9}{12}+\\frac{4}{12}=-\\frac{5}{12}\\)。</p><p>再算分母：\\(\\tan\\alpha\\tan\\beta=-\\frac34\\times\\frac13=-\\frac14\\)，故 \\(1-\\tan\\alpha\\tan\\beta=1-\\left(-\\frac14\\right)=\\frac54\\)。</p><p>所以 \\(\\tan(\\alpha+\\beta)=\\frac{-\\frac{5}{12}}{\\frac54}=-\\frac{5}{12}\\times\\frac45=-\\frac13\\)。</p><p>结果 \\(-\\frac13\\) 介于 \\(-1\\) 与 0 之间，与“\\(\\alpha\\) 为钝角、\\(\\beta\\) 为锐角”相符。</p>',
          note: '代入前先分别算清“分子”与“分母”，可以有效避免符号错误；答案 \\(-\\frac13\\) 介于 \\(-1\\) 与 0 之间，与 \\(\\alpha+\\beta\\) 为钝角相符。'
        },
        {
          id: '8-2-4',
          kind: 'short',
          stem: '已知 \\(\\alpha\\)、\\(\\beta\\) 均为锐角，且 \\(\\sin\\alpha=\\frac{\\sqrt5}{5}\\)，\\(\\sin\\beta=\\frac{\\sqrt{10}}{10}\\)，求 \\(\\alpha+\\beta\\) 的值。',
          answer: 'π/4',
          answerText: '\\(\\alpha+\\beta=\\frac{\\pi}{4}\\)',
          solution: '<p>先求出 \\(\\alpha+\\beta\\) 的余弦值。因为 \\(\\alpha\\)、\\(\\beta\\) 为锐角，正弦为正，所以</p><p>\\(\\cos\\alpha=\\sqrt{1-\\left(\\frac{\\sqrt5}{5}\\right)^{2}}=\\sqrt{1-\\frac15}=\\frac{2\\sqrt5}{5}\\)。</p><p>\\(\\cos\\beta=\\sqrt{1-\\left(\\frac{\\sqrt{10}}{10}\\right)^{2}}=\\sqrt{1-\\frac{1}{10}}=\\frac{3\\sqrt{10}}{10}\\)。</p><p>由两角和的余弦公式：</p><p>\\(\\cos(\\alpha+\\beta)=\\frac{2\\sqrt5}{5}\\cdot\\frac{3\\sqrt{10}}{10}-\\frac{\\sqrt5}{5}\\cdot\\frac{\\sqrt{10}}{10}=\\frac{6\\sqrt{50}}{50}-\\frac{\\sqrt{50}}{50}=\\frac{5\\sqrt{50}}{50}=\\frac{\\sqrt{50}}{10}=\\frac{5\\sqrt2}{10}=\\frac{\\sqrt2}{2}\\)。</p><p>又 \\(\\alpha+\\beta\\in(0,\\pi)\\)，而在 \\((0,\\pi)\\) 上余弦单调递减，故满足 \\(\\cos(\\alpha+\\beta)=\\frac{\\sqrt2}{2}\\) 的角唯一，即 \\(\\alpha+\\beta=\\frac{\\pi}{4}\\)。</p>',
          note: '求角时优先求余弦值：余弦在 \\((0,\\pi)\\) 上单调，可以避免“两解”的讨论；若求正弦则还要借助正负号进一步排除。'
        }
      ],
      examples: [
        {
          id: '8-2-ex-1',
          title: '给值求角（整体代换）',
          problem: '已知 \\(\\alpha\\in\\left(0,\\frac{\\pi}{2}\\right)\\)，\\(\\beta\\in\\left(\\frac{\\pi}{2},\\pi\\right)\\)，且 \\(\\sin\\alpha=\\frac{4}{5}\\)，\\(\\cos\\beta=-\\frac{12}{13}\\)，求 \\(\\sin(\\alpha-\\beta)\\) 的值。',
          solution: '<p>分别求出所需的正弦、余弦值。</p><p>因为 \\(\\alpha\\) 是第一象限角，\\(\\cos\\alpha=\\sqrt{1-\\left(\\frac45\\right)^{2}}=\\frac35\\)。</p><p>因为 \\(\\beta\\) 是第二象限角，\\(\\sin\\beta=\\sqrt{1-\\left(-\\frac{12}{13}\\right)^{2}}=\\frac{5}{13}\\)。</p><p>由两角差的正弦公式：</p><p>\\(\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta\\)。</p><p>代入得 \\(\\sin(\\alpha-\\beta)=\\frac45\\times\\left(-\\frac{12}{13}\\right)-\\frac35\\times\\frac{5}{13}=-\\frac{48}{65}-\\frac{15}{65}=-\\frac{63}{65}\\)。</p><p>其中 \\(\\frac{48}{65}\\approx0.738\\)，\\(\\frac{15}{65}\\approx0.231\\)，和为 \\(\\frac{63}{65}\\approx0.969\\)，与 \\(|\\sin(\\alpha-\\beta)|\\le1\\) 相符。</p>',
          note: '两个角分别位于不同象限时，务必逐个判断开方的符号，再代入公式。'
        }
      ]
    },

    {
      id: '8-3',
      name: '图像变换与五点法作图、求解析式',
      desc: '考查 \\(y=A\\sin(\\omega x+\\varphi)\\) 中各参数的几何意义与求法，以及平移、伸缩变换的顺序。求解析式的一般流程是：由最值定 \\(A\\) 与 \\(B\\)，由周期定 \\(\\omega\\)，再把特殊点代入求 \\(\\varphi\\)。',
      points: [
        '振幅 \\(A=\\frac{y_{\\max}-y_{\\min}}{2}\\)，平衡位置 \\(B=\\frac{y_{\\max}+y_{\\min}}{2}\\)。',
        '周期 \\(T=\\frac{2\\pi}{\\omega}\\)（\\(\\omega>0\\)），故 \\(\\omega=\\frac{2\\pi}{T}\\)。',
        '求 \\(\\varphi\\) 时优先代入最高点或最低点，且注意 \\(|\\varphi|&lt;\\pi\\) 的通常约定。',
        '先平移后伸缩：\\(y=\\sin x\\to y=\\sin(x+\\varphi)\\to y=\\sin(\\omega x+\\varphi)\\)。',
        '五点法：令 \\(\\omega x+\\varphi\\) 依次取 \\(0,\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2},2\\pi\\)，解出对应的 \\(x\\)。'
      ],
      questions: [
        {
          id: '8-3-1',
          kind: 'choice',
          stem: '要得到函数 \\(y=2\\sin\\left(2x+\\frac{\\pi}{3}\\right)\\) 的图像，只需把 \\(y=2\\sin 2x\\) 的图像（　　）。',
          options: [
            '向左平移 \\(\\frac{\\pi}{3}\\) 个单位长度',
            '向右平移 \\(\\frac{\\pi}{3}\\) 个单位长度',
            '向左平移 \\(\\frac{\\pi}{6}\\) 个单位长度',
            '向右平移 \\(\\frac{\\pi}{6}\\) 个单位长度'
          ],
          answer: 'C',
          answerText: 'C',
          solution: '<p>关键是把目标函数中的 \\(x\\) 的系数提出来：</p><p>\\(y=2\\sin\\left(2x+\\frac{\\pi}{3}\\right)=2\\sin\\left[2\\left(x+\\frac{\\pi}{6}\\right)\\right]\\)。</p><p>与 \\(y=2\\sin 2x=2\\sin\\left[2(x+0)\\right]\\) 比较，自变量由 \\(x\\) 变为 \\(x+\\frac{\\pi}{6}\\)，即图像向左平移 \\(\\frac{\\pi}{6}\\) 个单位长度。</p><p>故选 C。若不加分析直接看 \\(\\frac{\\pi}{3}\\) 就会误选 A——平移量要看括号内 \\(x\\) 的增量，而不是常数项。</p>'
        },
        {
          id: '8-3-2',
          kind: 'blank',
          stem: '函数 \\(y=3\\sin\\left(\\frac12 x-\\frac{\\pi}{4}\\right)\\) 的最小正周期是 ',
          blanks: [
            { before: '最小正周期 \\(T=\\) ', answer: ['4π'], after: '。' }
          ],
          answer: '4π',
          answerText: '\\(T=4\\pi\\)',
          solution: '<p>对 \\(y=A\\sin(\\omega x+\\varphi)\\)（\\(\\omega>0\\)），最小正周期为 \\(T=\\frac{2\\pi}{\\omega}\\)。</p><p>本题中 \\(\\omega=\\frac12\\)，故 \\(T=\\frac{2\\pi}{\\frac12}=4\\pi\\)。</p><p>振幅 \\(A=3\\) 与初相 \\(-\\frac{\\pi}{4}\\) 都不影响周期。</p>'
        },
        {
          id: '8-3-3',
          kind: 'short',
          stem: '已知函数 \\(f(x)=A\\sin(\\omega x+\\varphi)\\)（\\(A>0\\)，\\(\\omega>0\\)，\\(|\\varphi|&lt;\\pi\\)）的最大值为 2，最小正周期为 \\(\\pi\\)，且图像经过点 \\(\\left(\\frac{\\pi}{6},2\\right)\\)，求 \\(f(x)\\) 的解析式。',
          answer: 'f(x)=2sin(2x+π/6)',
          answerText: '\\(f(x)=2\\sin\\left(2x+\\frac{\\pi}{6}\\right)\\)',
          solution: '<p><b>由最大值定 \\(A\\)：</b>因为 \\(|\\sin(\\omega x+\\varphi)|\\le1\\)，最大值等于 \\(A\\)，所以 \\(A=2\\)。</p><p><b>由周期定 \\(\\omega\\)：</b>由 \\(T=\\frac{2\\pi}{\\omega}=\\pi\\) 得 \\(\\omega=2\\)。</p><p><b>由特殊点定 \\(\\varphi\\)：</b>把 \\(\\left(\\frac{\\pi}{6},2\\right)\\) 代入 \\(f(x)=2\\sin(2x+\\varphi)\\)，得</p><p>\\(2\\sin\\left(2\\times\\frac{\\pi}{6}+\\varphi\\right)=2\\)，即 \\(\\sin\\left(\\frac{\\pi}{3}+\\varphi\\right)=1\\)。</p><p>所以 \\(\\frac{\\pi}{3}+\\varphi=\\frac{\\pi}{2}+2k\\pi\\)，得 \\(\\varphi=\\frac{\\pi}{6}+2k\\pi\\)（\\(k\\in Z\\)）。</p><p>取 \\(k=0\\) 得 \\(\\varphi=\\frac{\\pi}{6}\\)，满足 \\(|\\varphi|&lt;\\pi\\)。</p><p>所以 \\(f(x)=2\\sin\\left(2x+\\frac{\\pi}{6}\\right)\\)。</p>',
          note: '已知最高（低）点时直接令括号内等于 \\(\\frac{\\pi}{2}+2k\\pi\\)（或 \\(-\\frac{\\pi}{2}+2k\\pi\\)），比代入一般点列方程组更简捷。'
        },
        {
          id: '8-3-4',
          kind: 'choice',
          stem: '把函数 \\(y=\\sin x\\) 的图像上所有点的横坐标缩短到原来的 \\(\\frac12\\)（纵坐标不变），再向左平移 \\(\\frac{\\pi}{6}\\) 个单位长度，所得函数的解析式是（　　）。',
          options: [
            '\\(y=\\sin\\left(2x+\\frac{\\pi}{6}\\right)\\)',
            '\\(y=\\sin\\left(2x+\\frac{\\pi}{3}\\right)\\)',
            '\\(y=\\sin\\left(\\frac12x+\\frac{\\pi}{6}\\right)\\)',
            '\\(y=\\sin\\left(2x-\\frac{\\pi}{3}\\right)\\)'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>第一步：横坐标缩短到原来的 \\(\\frac12\\)，相当于把 \\(x\\) 换成 \\(2x\\)，得 \\(y=\\sin 2x\\)。</p><p>第二步：再向左平移 \\(\\frac{\\pi}{6}\\)，按“左加右减”把 \\(x\\) 换成 \\(x+\\frac{\\pi}{6}\\)，得</p><p>\\(y=\\sin\\left[2\\left(x+\\frac{\\pi}{6}\\right)\\right]=\\sin\\left(2x+\\frac{\\pi}{3}\\right)\\)。</p><p>故选 B。若先平移再伸缩，则需要平移 \\(\\frac{\\pi}{3}\\)，这两种顺序的平移量不同，审题时必须看清单。</p>'
        }
      ],
      examples: [
        {
          id: '8-3-ex-1',
          title: '由图像特征求解析式',
          problem: '已知函数 \\(f(x)=A\\sin(\\omega x+\\varphi)\\)（\\(A>0\\)，\\(\\omega>0\\)，\\(|\\varphi|&lt;\\frac{\\pi}{2}\\)）的图像相邻两条对称轴之间的距离为 \\(\\frac{\\pi}{2}\\)，且当 \\(x=\\frac{\\pi}{3}\\) 时取得最大值 2，求 \\(f(x)\\) 的解析式。',
          solution: '<p>由“最大值 2”得 \\(A=2\\)。</p><p>相邻两条对称轴之间的距离等于半个周期，故 \\(\\frac T2=\\frac{\\pi}{2}\\)，\\(T=\\pi\\)，于是 \\(\\omega=\\frac{2\\pi}{T}=2\\)。</p><p>由 \\(x=\\frac{\\pi}{3}\\) 时取到最大值，得 \\(\\sin\\left(2\\times\\frac{\\pi}{3}+\\varphi\\right)=1\\)，即</p><p>\\(\\frac{2\\pi}{3}+\\varphi=\\frac{\\pi}{2}+2k\\pi\\)，解得 \\(\\varphi=-\\frac{\\pi}{6}+2k\\pi\\)（\\(k\\in Z\\)）。</p><p>因为 \\(|\\varphi|&lt;\\frac{\\pi}{2}\\)，取 \\(k=0\\) 得 \\(\\varphi=-\\frac{\\pi}{6}\\)。</p><p>所以 \\(f(x)=2\\sin\\left(2x-\\frac{\\pi}{6}\\right)\\)。</p>',
          note: '对称轴与周期的关系是常考点：两条相邻对称轴（或两个相邻零点）之间的距离为 \\(\\frac T2\\)，相邻的对称轴与对称中心之间的距离为 \\(\\frac T4\\)。'
        }
      ]
    },

    {
      id: '8-4',
      name: '三角函数的单调性、最值与周期',
      desc: '考查正弦型函数的单调区间、对称轴、对称中心与最值。基本策略是“整体代换”：把 \\(\\omega x+\\varphi\\) 看成一个整体 \\(t\\)，借助 \\(y=\\sin t\\)（或 \\(\\cos t\\)）的单调性与最值列不等式。求区间上的最值时应先求出整体的取值范围。',
      points: [
        '求单调区间：令 \\(-\\frac{\\pi}{2}+2k\\pi\\le\\omega x+\\varphi\\le\\frac{\\pi}{2}+2k\\pi\\) 解出 \\(x\\)（\\(\\omega>0\\)）。',
        '求对称轴：令 \\(\\omega x+\\varphi=\\frac{\\pi}{2}+k\\pi\\)；求对称中心：令 \\(\\omega x+\\varphi=k\\pi\\)。',
        '求区间最值要分两步：先由 \\(x\\) 的范围求出整体的范围，再转化为基本函数的值域。',
        '含 \\(\\sin x+\\cos x\\)、\\(\\sin x\\cos x\\) 的式子可用换元化为二次函数，注意新元的范围。',
        '\\(a\\sin x+b\\cos x\\) 型用辅助角公式合并后求最值，最大值为 \\(\\sqrt{a^{2}+b^{2}}\\)。'
      ],
      questions: [
        {
          id: '8-4-1',
          kind: 'choice',
          stem: '函数 \\(y=\\sin\\left(2x+\\frac{\\pi}{6}\\right)\\) 的图像的一条对称轴方程是（　　）。',
          options: [
            '\\(x=\\frac{\\pi}{6}\\)',
            '\\(x=\\frac{\\pi}{3}\\)',
            '\\(x=\\frac{\\pi}{12}\\)',
            '\\(x=-\\frac{\\pi}{6}\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>正弦型函数的对称轴出现在函数取到最值处，即 \\(2x+\\frac{\\pi}{6}=\\frac{\\pi}{2}+k\\pi\\)（\\(k\\in Z\\)）。</p><p>解得 \\(2x=\\frac{\\pi}{3}+k\\pi\\)，即 \\(x=\\frac{\\pi}{6}+\\frac{k\\pi}{2}\\)。</p><p>取 \\(k=0\\) 得 \\(x=\\frac{\\pi}{6}\\)；取 \\(k=-1\\) 得 \\(x=-\\frac{\\pi}{3}\\)。</p><p>对照选项，只有 \\(x=\\frac{\\pi}{6}\\) 符合（此时 \\(y=\\sin\\frac{\\pi}{2}=1\\) 取到最大值）。故选 A。</p>'
        },
        {
          id: '8-4-2',
          kind: 'blank',
          stem: '函数 \\(y=\\sin x+\\sqrt3\\cos x\\) 在 \\(\\left[0,\\frac{\\pi}{2}\\right]\\) 上的最大值是 ',
          blanks: [
            { before: '最大值是 ', answer: ['2'], after: '。' }
          ],
          answer: '2',
          answerText: '\\(2\\)',
          solution: '<p>用辅助角公式合并：\\(a=1\\)，\\(b=\\sqrt3\\)，\\(\\sqrt{a^{2}+b^{2}}=\\sqrt{1+3}=2\\)。</p><p>\\(y=\\sin x+\\sqrt3\\cos x=2\\left(\\frac12\\sin x+\\frac{\\sqrt3}{2}\\cos x\\right)=2\\sin\\left(x+\\frac{\\pi}{3}\\right)\\)。</p><p>当 \\(x\\in\\left[0,\\frac{\\pi}{2}\\right]\\) 时，\\(x+\\frac{\\pi}{3}\\in\\left[\\frac{\\pi}{3},\\frac{5\\pi}{6}\\right]\\)，该区间包含 \\(\\frac{\\pi}{2}\\)，故 \\(\\sin\\left(x+\\frac{\\pi}{3}\\right)\\) 能取到最大值 1。</p><p>所以 \\(y\\) 的最大值为 \\(2\\times1=2\\)，此时 \\(x=\\frac{\\pi}{6}\\)。</p>'
        },
        {
          id: '8-4-3',
          kind: 'short',
          stem: '求函数 \\(y=2\\sin\\left(\\frac{\\pi}{3}-x\\right)\\) 在 \\(\\left[0,\\frac{\\pi}{2}\\right]\\) 上的最小值。',
          answer: '-1',
          answerText: '最小值为 \\(-1\\)',
          solution: '<p>先把 \\(x\\) 的系数化为正，便于判断单调性：</p><p>\\(y=2\\sin\\left(\\frac{\\pi}{3}-x\\right)=-2\\sin\\left(x-\\frac{\\pi}{3}\\right)\\)。</p><p>当 \\(x\\in\\left[0,\\frac{\\pi}{2}\\right]\\) 时，\\(x-\\frac{\\pi}{3}\\in\\left[-\\frac{\\pi}{3},\\frac{\\pi}{6}\\right]\\)。</p><p>在这个区间上 \\(\\sin\\left(x-\\frac{\\pi}{3}\\right)\\) 单调递增，取值范围为 \\(\\left[-\\frac{\\sqrt3}{2},\\frac12\\right]\\)。</p><p>所以 \\(-2\\sin\\left(x-\\frac{\\pi}{3}\\right)\\) 的取值范围为 \\(\\left[-1,\\sqrt3\\right]\\)，最小值为 \\(-1\\)，在 \\(x=0\\) 处取得。</p>'
        },
        {
          id: '8-4-4',
          kind: 'choice',
          stem: '函数 \\(y=2\\cos\\left(2x+\\frac{\\pi}{3}\\right)\\) 的单调递减区间是（　　）。',
          options: [
            '\\(\\left[-\\frac{\\pi}{6}+k\\pi,\\frac{\\pi}{3}+k\\pi\\right]\\)，\\(k\\in Z\\)',
            '\\(\\left[-\\frac{2\\pi}{3}+2k\\pi,\\frac{\\pi}{3}+2k\\pi\\right]\\)，\\(k\\in Z\\)',
            '\\(\\left[-\\frac{\\pi}{3}+k\\pi,\\frac{\\pi}{6}+k\\pi\\right]\\)，\\(k\\in Z\\)',
            '\\(\\left[\\frac{\\pi}{3}+k\\pi,\\frac{5\\pi}{6}+k\\pi\\right]\\)，\\(k\\in Z\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>\\(y=\\cos t\\) 的单调递减区间是 \\([2k\\pi,\\pi+2k\\pi]\\)。令 \\(t=2x+\\frac{\\pi}{3}\\)，则需</p><p>\\(2k\\pi\\le 2x+\\frac{\\pi}{3}\\le\\pi+2k\\pi\\)。</p><p>两边减 \\(\\frac{\\pi}{3}\\)：\\(-\\frac{\\pi}{3}+2k\\pi\\le 2x\\le\\frac{2\\pi}{3}+2k\\pi\\)。</p><p>再除以 2：\\(-\\frac{\\pi}{6}+k\\pi\\le x\\le\\frac{\\pi}{3}+k\\pi\\)。</p><p>所以单调递减区间为 \\(\\left[-\\frac{\\pi}{6}+k\\pi,\\frac{\\pi}{3}+k\\pi\\right]\\)（\\(k\\in Z\\)），选 A。</p>'
        }
      ],
      examples: [
        {
          id: '8-4-ex-1',
          title: '换元法求含 sin x 与 cos x 的最值',
          problem: '求函数 \\(y=\\sin x+\\cos x+\\sin x\\cos x\\) 的最大值。',
          solution: '<p>令 \\(t=\\sin x+\\cos x\\)。由辅助角公式 \\(t=\\sqrt2\\sin\\left(x+\\frac{\\pi}{4}\\right)\\)，所以 \\(t\\in[-\\sqrt2,\\sqrt2]\\)。</p><p>又 \\(t^{2}=\\sin^{2}x+\\cos^{2}x+2\\sin x\\cos x=1+2\\sin x\\cos x\\)，故 \\(\\sin x\\cos x=\\frac{t^{2}-1}{2}\\)。</p><p>代入原式得 \\(y=t+\\frac{t^{2}-1}{2}=\\frac12t^{2}+t-\\frac12=\\frac12(t+1)^{2}-1\\)。</p><p>这是关于 \\(t\\) 的二次函数，开口向上，对称轴为 \\(t=-1\\)。</p><p>因为 \\(-1\\in[-\\sqrt2,\\sqrt2]\\)，所以 \\(y\\) 在 \\(t=-1\\) 处取到最小值 \\(-1\\)；最大值在区间端点取得：</p><p>\\(t=\\sqrt2\\) 时 \\(y=\\frac12\\times2+\\sqrt2-\\frac12=\\frac12+\\sqrt2\\)；\\(t=-\\sqrt2\\) 时 \\(y=\\frac12-\\sqrt2\\)。</p><p>比较可知最大值为 \\(\\frac12+\\sqrt2\\)。</p>',
          note: '换元后必须求出新元 \\(t\\) 的取值范围，否则二次函数的最值可能取在区间之外。本题中 \\(t=\\sin x+\\cos x\\in[-\\sqrt2,\\sqrt2]\\)。'
        },
        {
          id: '8-4-ex-2',
          title: '由最值点确定解析式',
          problem: '已知函数 \\(f(x)=A\\sin(\\omega x+\\varphi)\\)（\\(A>0\\)，\\(\\omega>0\\)，\\(|\\varphi|&lt;\\pi\\)）在 \\(x=\\pi\\) 处取得最小值 \\(-2\\)，且它的最小正周期为 \\(2\\pi\\)，求 \\(f(x)\\) 的解析式。',
          solution: '<p>由最小值 \\(-2\\) 且 \\(A>0\\)，得 \\(A=2\\)。</p><p>由 \\(T=\\frac{2\\pi}{\\omega}=2\\pi\\) 得 \\(\\omega=1\\)。</p><p>于是 \\(f(x)=2\\sin(x+\\varphi)\\)。由 \\(x=\\pi\\) 时取得最小值，得</p><p>\\(\\sin(\\pi+\\varphi)=-1\\)，所以 \\(\\pi+\\varphi=-\\frac{\\pi}{2}+2k\\pi\\)，即 \\(\\varphi=-\\frac{3\\pi}{2}+2k\\pi\\)（\\(k\\in Z\\)）。</p><p>取 \\(k=1\\) 得 \\(\\varphi=\\frac{\\pi}{2}\\)，满足 \\(|\\varphi|&lt;\\pi\\)。</p><p>所以 \\(f(x)=2\\sin\\left(x+\\frac{\\pi}{2}\\right)=2\\cos x\\)。</p><p>检验：\\(f(\\pi)=2\\cos\\pi=-2\\)，取得最小值；周期为 \\(2\\pi\\)。符合题意。</p>',
          note: '由 \\(|\\varphi|&lt;\\pi\\) 这个约束从通解里挑出唯一值时，要逐个试 \\(k\\)，并回代检验。'
        }
      ]
    },

    {
      id: '8-5',
      name: '解三角不等式与三角方程',
      desc: '解三角不等式的基本方法是“看图找区间”：先在单位圆或一个周期内确定满足条件的角，再加上周期写出通解。解三角方程则先化为同名同角的方程，必要时用换元法化为代数方程，最后按角的范围取舍。',
      points: [
        '解 \\(\\sin x\\ge a\\)、\\(\\cos x\\le a\\) 一类问题，可借助单位圆中正弦线、余弦线的位置直观确定区间。',
        '通解不要遗漏 \\(2k\\pi\\)（正弦、余弦）或 \\(k\\pi\\)（正切）。',
        '给定区间求角时，先写出通解，再对 \\(k\\) 取值筛选出落在该区间内的角。',
        '\\(a\\sin^{2}x+b\\sin x+c=0\\) 型方程用换元法，注意 \\(|\\sin x|\\le1\\) 会淘汰部分根。',
        '解方程后要检验是否满足原式中的定义域限制（如正切要求 \\(\\cos x\\ne0\\)）。'
      ],
      questions: [
        {
          id: '8-5-1',
          kind: 'choice',
          stem: '不等式 \\(\\sin x\\ge\\frac12\\) 在 \\([0,2\\pi]\\) 内的解集是（　　）。',
          options: [
            '\\(\\left[\\frac{\\pi}{6},\\frac{5\\pi}{6}\\right]\\)',
            '\\(\\left[\\frac{\\pi}{3},\\frac{2\\pi}{3}\\right]\\)',
            '\\(\\left[0,\\frac{\\pi}{6}\\right]\\cup\\left[\\frac{5\\pi}{6},2\\pi\\right]\\)',
            '\\(\\left[\\frac{\\pi}{6},\\frac{\\pi}{2}\\right]\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>在单位圆上，\\(\\sin x\\ge\\frac12\\) 表示终边与单位圆的交点的纵坐标不小于 \\(\\frac12\\)，即交点落在圆周上部的一段弧上。</p><p>分界角由 \\(\\sin x=\\frac12\\) 确定：在 \\([0,2\\pi]\\) 内解得 \\(x=\\frac{\\pi}{6}\\) 或 \\(x=\\frac{5\\pi}{6}\\)。</p><p>在这两角之间（圆周的上半部分），纵坐标不小于 \\(\\frac12\\)，所以解集为 \\(\\left[\\frac{\\pi}{6},\\frac{5\\pi}{6}\\right]\\)。</p><p>故选 A。若写成 \\(\\sin x\\le\\frac12\\)，则解集是它的补集 \\(\\left[0,\\frac{\\pi}{6}\\right]\\cup\\left[\\frac{5\\pi}{6},2\\pi\\right]\\)，即选项 C。</p>'
        },
        {
          id: '8-5-2',
          kind: 'blank',
          stem: '方程 \\(\\tan 2x=-1\\) 在 \\([0,\\pi)\\) 内的解为 ',
          blanks: [
            { before: '解为 ', answer: ['3π/8, 7π/8'], after: '。' }
          ],
          answer: '3π/8, 7π/8',
          answerText: '\\(x=\\frac{3\\pi}{8}\\) 或 \\(x=\\frac{7\\pi}{8}\\)',
          solution: '<p>由 \\(\\tan 2x=-1\\) 得 \\(2x=-\\frac{\\pi}{4}+k\\pi\\)（\\(k\\in Z\\)），即 \\(x=-\\frac{\\pi}{8}+\\frac{k\\pi}{2}\\)。</p><p>依次代入 \\(k\\) 并筛选 \\(x\\in[0,\\pi)\\)：</p><p>\\(k=0\\)：\\(x=-\\frac{\\pi}{8}\\)，不合；\\(k=1\\)：\\(x=\\frac{3\\pi}{8}\\)，符合；</p><p>\\(k=2\\)：\\(x=\\frac{7\\pi}{8}\\)，符合；\\(k=3\\)：\\(x=\\frac{11\\pi}{8}>\\pi\\)，不合。</p><p>所以解为 \\(x=\\frac{3\\pi}{8}\\) 或 \\(x=\\frac{7\\pi}{8}\\)。</p>'
        },
        {
          id: '8-5-3',
          kind: 'short',
          stem: '解方程 \\(2\\cos^{2}x-3\\cos x+1=0\\)（\\(x\\in[0,2\\pi]\\)）。',
          answer: 'x=0, π/3, 5π/3, 2π',
          answerText: '\\(x=0\\)，\\(\\frac{\\pi}{3}\\)，\\(\\frac{5\\pi}{3}\\) 或 \\(2\\pi\\)',
          solution: '<p>把 \\(\\cos x\\) 看作整体，因式分解：</p><p>\\(2\\cos^{2}x-3\\cos x+1=(2\\cos x-1)(\\cos x-1)=0\\)。</p><p>所以 \\(\\cos x=\\frac12\\) 或 \\(\\cos x=1\\)。</p><p>当 \\(\\cos x=\\frac12\\) 时，在 \\([0,2\\pi]\\) 内 \\(x=\\frac{\\pi}{3}\\) 或 \\(x=\\frac{5\\pi}{3}\\)。</p><p>当 \\(\\cos x=1\\) 时，在 \\([0,2\\pi]\\) 内 \\(x=0\\) 或 \\(x=2\\pi\\)。</p><p>所以原方程的解为 \\(x=0\\)，\\(\\frac{\\pi}{3}\\)，\\(\\frac{5\\pi}{3}\\)，\\(2\\pi\\)。</p>'
        },
        {
          id: '8-5-4',
          kind: 'choice',
          stem: '不等式 \\(2\\sin x-1>0\\) 在 \\([0,2\\pi]\\) 内的解集是（　　）。',
          options: [
            '\\(\\left(\\frac{\\pi}{6},\\frac{5\\pi}{6}\\right)\\)',
            '\\(\\left[\\frac{\\pi}{6},\\frac{5\\pi}{6}\\right]\\)',
            '\\(\\left(0,\\frac{\\pi}{6}\\right)\\cup\\left(\\frac{5\\pi}{6},2\\pi\\right)\\)',
            '\\(\\left(\\frac{\\pi}{3},\\frac{2\\pi}{3}\\right)\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>原不等式即 \\(\\sin x>\\frac12\\)。</p><p>先解 \\(\\sin x=\\frac12\\)，在 \\([0,2\\pi]\\) 内得 \\(x=\\frac{\\pi}{6}\\) 或 \\(x=\\frac{5\\pi}{6}\\)。</p><p>在这两个角之间，终边位于上半圆周，纵坐标大于 \\(\\frac12\\)，所以 \\(\\sin x>\\frac12\\) 的解集为 \\(\\left(\\frac{\\pi}{6},\\frac{5\\pi}{6}\\right)\\)。</p><p>因为是不等式“大于”，两端点取不到，故用开区间，选 A。</p>'
        }
      ],
      examples: [
        {
          id: '8-5-ex-1',
          title: '换元法解三角方程',
          problem: '解方程 \\(2\\sin^{2}x-\\sin x-1=0\\)（\\(x\\in[0,2\\pi]\\)）。',
          solution: '<p>令 \\(t=\\sin x\\)，则 \\(t\\in[-1,1]\\)，原方程化为</p><p>\\(2t^{2}-t-1=0\\)，即 \\((2t+1)(t-1)=0\\)，解得 \\(t=-\\frac12\\) 或 \\(t=1\\)。</p><p>两个根都在 \\([-1,1]\\) 内，都保留。</p><p>当 \\(\\sin x=-\\frac12\\) 时，在 \\([0,2\\pi]\\) 内 \\(x=\\frac{7\\pi}{6}\\) 或 \\(x=\\frac{11\\pi}{6}\\)。</p><p>当 \\(\\sin x=1\\) 时，在 \\([0,2\\pi]\\) 内 \\(x=\\frac{\\pi}{2}\\)。</p><p>所以原方程的解为 \\(x=\\frac{\\pi}{2}\\)，\\(\\frac{7\\pi}{6}\\)，\\(\\frac{11\\pi}{6}\\)。</p>',
          note: '换元后一定要用 \\(|t|\\le1\\) 检查根是否有效。若解出 \\(t=2\\)，必须舍去，因为 \\(\\sin x\\) 不可能等于 2。'
        },
        {
          id: '8-5-ex-2',
          title: '由三角不等式求参数范围',
          problem: '若不等式 \\(\\sin x>a\\) 在 \\(x\\in\\left(\\frac{\\pi}{6},\\frac{\\pi}{2}\\right)\\) 上恒成立，求实数 \\(a\\) 的取值范围。',
          solution: '<p>“\\(\\sin x>a\\) 在区间上恒成立”等价于 \\(a&lt;\\sin x\\) 对区间内一切 \\(x\\) 成立，即 \\(a\\) 小于 \\(\\sin x\\) 在该区间上的最小值。</p><p>当 \\(x\\in\\left(\\frac{\\pi}{6},\\frac{\\pi}{2}\\right)\\) 时，\\(\\sin x\\) 单调递增，取值范围为 \\(\\left(\\frac12,1\\right)\\)。</p><p>该区间内 \\(\\sin x>\\frac12\\) 恒成立，且 \\(\\frac12\\) 是下确界（取不到，但可以是 \\(a\\) 的临界值）。</p><p>所以只要 \\(a\\le\\frac12\\)，就有 \\(\\sin x>\\frac12\\ge a\\) 对区间内一切 \\(x\\) 成立。</p><p>因此 \\(a\\) 的取值范围是 \\(\\left(-\\infty,\\frac12\\right]\\)。</p>',
          note: '恒成立问题转化为最值问题：\\(f(x)>a\\) 恒成立等价于 \\(a\\le f(x)_{\\min}\\)（在本例中最小值取不到，故临界值 \\(\\frac12\\) 可以包含）。'
        }
      ]
    },

    {
      id: '8-6',
      name: '与向量、解三角形、导数的综合',
      desc: '考查三角函数与向量数量积、正余弦定理、导数工具的交汇。常见形式：用数量积给出角的关系式再求角；在三角形中用内角和为 \\(\\pi\\) 把多角化为单角求最值；用导数求三角函数的极值点。',
      points: [
        '向量数量积 \\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\) 是把几何条件翻译为三角函数关系的桥梁。',
        '三角形中 \\(A+B+C=\\pi\\)，可把 \\(B\\) 换成 \\(\\pi-A-C\\)，把多角化为单角。',
        '涉及边角关系时优先考虑正弦定理 \\(\\frac a{\\sin A}=\\frac b{\\sin B}=\\frac c{\\sin C}\\) 与余弦定理。',
        '求 \\(\\sin A+\\sin C\\) 一类的最值，可用内角和消去一个角，再用辅助角公式合并。',
        '用导数求三角函数极值时，注意结合单调性与定义域端点比较。'
      ],
      questions: [
        {
          id: '8-6-1',
          kind: 'choice',
          stem: '已知单位向量 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 的夹角为 \\(60^{\\circ}\\)，则 \\(|\\vec e_{1}+2\\vec e_{2}|=\\)（　　）。',
          options: [
            '\\(\\sqrt3\\)',
            '\\(\\sqrt5\\)',
            '\\(\\sqrt7\\)',
            '\\(3\\)'
          ],
          answer: 'C',
          answerText: 'C',
          solution: '<p>先计算模的平方：\\(|\\vec e_{1}+2\\vec e_{2}|^{2}=|\\vec e_{1}|^{2}+4\\vec e_{1}\\cdot\\vec e_{2}+4|\\vec e_{2}|^{2}\\)。</p><p>因为 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 是单位向量，\\(|\\vec e_{1}|=|\\vec e_{2}|=1\\)，所以</p><p>\\(\\vec e_{1}\\cdot\\vec e_{2}=1\\times1\\times\\cos 60^{\\circ}=\\frac12\\)。</p><p>代入得 \\(|\\vec e_{1}+2\\vec e_{2}|^{2}=1+4\\times\\frac12+4\\times1=1+2+4=7\\)。</p><p>所以 \\(|\\vec e_{1}+2\\vec e_{2}|=\\sqrt7\\)，选 C。</p>'
        },
        {
          id: '8-6-2',
          kind: 'blank',
          stem: '在 \\(\\triangle ABC\\) 中，角 \\(A\\)、\\(B\\)、\\(C\\) 的对边分别为 \\(a\\)、\\(b\\)、\\(c\\)。若 \\(a=3\\)，\\(b=4\\)，\\(C=60^{\\circ}\\)，则 \\(c=\\) ',
          blanks: [
            { before: '\\(c=\\) ', answer: ['√13','sqrt13'], after: '。' }
          ],
          answer: '√13',
          answerText: '\\(c=\\sqrt{13}\\)',
          solution: '<p>已知两边及其夹角，用余弦定理：</p><p>\\(c^{2}=a^{2}+b^{2}-2ab\\cos C=3^{2}+4^{2}-2\\times3\\times4\\times\\cos 60^{\\circ}\\)。</p><p>代入 \\(\\cos 60^{\\circ}=\\frac12\\)：\\(c^{2}=9+16-24\\times\\frac12=25-12=13\\)。</p><p>因为 \\(c>0\\)，所以 \\(c=\\sqrt{13}\\)。</p>'
        },
        {
          id: '8-6-3',
          kind: 'short',
          stem: '在 \\(\\triangle ABC\\) 中，角 \\(A\\)、\\(B\\)、\\(C\\) 的对边分别为 \\(a\\)、\\(b\\)、\\(c\\)，且满足 \\(a\\cos B+b\\cos A=2c\\cos C\\)，求角 \\(C\\) 的大小。',
          answer: 'C=π/3',
          answerText: '\\(C=\\frac{\\pi}{3}\\)',
          solution: '<p>把边化为角。由正弦定理 \\(a=2R\\sin A\\)，\\(b=2R\\sin B\\)，\\(c=2R\\sin C\\)，代入已知等式并约去 \\(2R\\)：</p><p>\\(\\sin A\\cos B+\\cos A\\sin B=2\\sin C\\cos C\\)。</p><p>左边正是两角和的正弦：\\(\\sin A\\cos B+\\cos A\\sin B=\\sin(A+B)\\)。</p><p>又 \\(A+B=\\pi-C\\)，所以 \\(\\sin(A+B)=\\sin(\\pi-C)=\\sin C\\)。</p><p>于是 \\(\\sin C=2\\sin C\\cos C\\)。因为 \\(C\\in(0,\\pi)\\)，\\(\\sin C\\ne0\\)，两边约去 \\(\\sin C\\) 得</p><p>\\(\\cos C=\\frac12\\)，所以 \\(C=\\frac{\\pi}{3}\\)。</p>',
          note: '“边化角”是处理含 \\(a\\cos B\\)、\\(b\\cos A\\) 这类结构的通用策略：用正弦定理把边换成角的正弦后，往往能凑出两角和的正弦公式。'
        },
        {
          id: '8-6-4',
          kind: 'choice',
          stem: '函数 \\(f(x)=x-2\\sin x\\) 在 \\((0,\\pi)\\) 内的极值情况是（　　）。',
          options: [
            '有极大值，无极小值',
            '有极小值，无极大值',
            '既有极大值又有极小值',
            '既无极值也无单调性变化'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>求导得 \\(f^{\\prime}(x)=1-2\\cos x\\)。</p><p>令 \\(f^{\\prime}(x)=0\\)，得 \\(\\cos x=\\frac12\\)。因为 \\(x\\in(0,\\pi)\\)，所以 \\(x=\\frac{\\pi}{3}\\) 是唯一的驻点。</p><p>当 \\(x\\in\\left(0,\\frac{\\pi}{3}\\right)\\) 时，\\(\\cos x>\\frac12\\)，故 \\(f^{\\prime}(x)&lt;0\\)，函数递减；</p><p>当 \\(x\\in\\left(\\frac{\\pi}{3},\\pi\\right)\\) 时，\\(\\cos x&lt;\\frac12\\)，故 \\(f^{\\prime}(x)>0\\)，函数递增。</p><p>所以 \\(f(x)\\) 在 \\(x=\\frac{\\pi}{3}\\) 处由减转增，取得极小值，无极大值。</p><p>故选 B。该极小值为 \\(f\\left(\\frac{\\pi}{3}\\right)=\\frac{\\pi}{3}-2\\times\\frac{\\sqrt3}{2}=\\frac{\\pi}{3}-\\sqrt3\\)。</p>'
        }
      ],
      examples: [
        {
          id: '8-6-ex-1',
          title: '三角形中的三角最值',
          problem: '在 \\(\\triangle ABC\\) 中，\\(C=90^{\\circ}\\)，\\(A\\in\\left[\\frac{\\pi}{6},\\frac{\\pi}{3}\\right]\\)，求 \\(\\sin A+\\sin B\\) 的最大值与最小值。',
          solution: '<p>因为 \\(C=\\frac{\\pi}{2}\\)，所以 \\(B=\\pi-A-C=\\frac{\\pi}{2}-A\\)，于是 \\(\\sin B=\\cos A\\)。</p><p>因此 \\(\\sin A+\\sin B=\\sin A+\\cos A=\\sqrt2\\sin\\left(A+\\frac{\\pi}{4}\\right)\\)。</p><p>当 \\(A\\in\\left[\\frac{\\pi}{6},\\frac{\\pi}{3}\\right]\\) 时，\\(A+\\frac{\\pi}{4}\\in\\left[\\frac{5\\pi}{12},\\frac{7\\pi}{12}\\right]\\)。</p><p>该区间关于 \\(\\frac{\\pi}{2}\\) 对称，且包含 \\(\\frac{\\pi}{2}\\)，故 \\(\\sin\\left(A+\\frac{\\pi}{4}\\right)\\) 的最大值为 1，在 \\(A=\\frac{\\pi}{4}\\) 处取得。</p><p>最小值在区间端点取得，两端函数值相等：\\(\\sin\\frac{5\\pi}{12}=\\sin\\frac{7\\pi}{12}=\\frac{\\sqrt6+\\sqrt2}{4}\\approx0.966\\)。</p><p>所以最大值为 \\(\\sqrt2\\)，最小值为 \\(\\sqrt2\\times\\frac{\\sqrt6+\\sqrt2}{4}=\\frac{\\sqrt{12}+2}{4}=\\frac{2\\sqrt3+2}{4}=\\frac{\\sqrt3+1}{2}\\)。</p>',
          note: '三角形中把 \\(B\\) 用 \\(A\\) 表示，是多角化单角的关键一步；随后用辅助角公式把和式合并，就能用整体范围求最值。'
        }
      ]
    }
  ]
});
