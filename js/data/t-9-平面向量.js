/*!
 * t-9-平面向量.js —— 第 9 章「平面向量」题型与例题
 */
DSHData.registerTypes({
  id: 9,
  name: '平面向量',
  brief: '本章题目的通用策略是“几何问题代数化”：先选好基底或建立坐标系，把向量关系写成坐标或基底的关系式，再用加减、数乘、数量积的运算法则求解。判定平行用 \\(x_{1}y_{2}-x_{2}y_{1}=0\\)，判定垂直用 \\(x_{1}x_{2}+y_{1}y_{2}=0\\)。',

  types: [
    {
      id: '9-1',
      name: '向量的线性运算与坐标运算',
      desc: '考查向量加减、数乘的坐标法则以及“终点减起点”求向量。基本公式：\\(\\vec a\\pm\\vec b=(x_{1}\\pm x_{2},\\ y_{1}\\pm y_{2})\\)，\\(\\lambda\\vec a=(\\lambda x_{1},\\lambda y_{1})\\)，\\(\\overrightarrow{AB}=(x_{B}-x_{A},\\ y_{B}-y_{A})\\)。',
      points: [
        '\\(\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}\\)，即“终点坐标减起点坐标”，顺序不能颠倒。',
        '向量加法的三角形法则：首尾相接，起点指向终点。',
        '数乘只改变长度与方向，不改变共线状态：\\(\\lambda\\vec a\\) 与 \\(\\vec a\\) 一定共线。',
        '用一组对边平行且相等判定平行四边形，是向量线性运算的典型应用。',
        '计算时先化简表达式，再代入坐标，能减少出错。'
      ],
      questions: [
        {
          id: '9-1-1',
          kind: 'choice',
          stem: '已知 \\(\\vec a=(1,2)\\)，\\(\\vec b=(-2,3)\\)，则 \\(\\vec a+2\\vec b=\\)（　　）。',
          options: [
            '\\((-3,8)\\)',
            '\\((-3,5)\\)',
            '\\((-1,8)\\)',
            '\\((3,8)\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>先算数乘：\\(2\\vec b=2\\times(-2,3)=(-4,6)\\)。</p><p>再算加法，对应坐标分别相加：</p><p>\\(\\vec a+2\\vec b=(1-4,\\ 2+6)=(-3,8)\\)。</p><p>故选 A。选项 B 是把 \\(2\\vec b\\) 的纵坐标误算成 3 的结果。</p>'
        },
        {
          id: '9-1-2',
          kind: 'blank',
          stem: '已知点 \\(A(1,-2)\\)，\\(B(3,2)\\)，则 \\(\\overrightarrow{AB}=\\) ',
          blanks: [
            { before: '\\(\\overrightarrow{AB}=\\) ', answer: ['(2,4)'], after: '。' }
          ],
          answer: '(2,4)',
          answerText: '\\((2,4)\\)',
          solution: '<p>由“终点坐标减起点坐标”：</p><p>\\(\\overrightarrow{AB}=(3-1,\\ 2-(-2))=(2,\\ 4)\\)。</p><p>若误算为 \\(\\overrightarrow{BA}\\)，则会得到 \\((-2,-4)\\)，二者方向相反。</p>'
        },
        {
          id: '9-1-3',
          kind: 'short',
          stem: '在四边形 \\(ABCD\\) 中，已知 \\(\\overrightarrow{AB}=\\overrightarrow{DC}\\)，判断四边形 \\(ABCD\\) 的形状并说明理由。',
          answer: '平行四边形',
          answerText: '四边形 \\(ABCD\\) 是平行四边形',
          solution: '<p>由 \\(\\overrightarrow{AB}=\\overrightarrow{DC}\\) 可知，这两条有向线段长度相等且方向相同。</p><p>长度相等且方向相同意味着 \\(AB\\parallel DC\\) 且 \\(|AB|=|DC|\\)，即四边形 \\(ABCD\\) 的一组对边平行且相等。</p><p>由平行四边形的判定定理，一组对边平行且相等的四边形是平行四边形。</p><p>所以四边形 \\(ABCD\\) 是平行四边形。</p>',
          note: '注意条件写的是 \\(\\overrightarrow{AB}=\\overrightarrow{DC}\\) 而不是 \\(\\overrightarrow{AB}=\\overrightarrow{CD}\\)：前者表示 \\(A\\to B\\) 与 \\(D\\to C\\) 同向，故 \\(AD\\parallel BC\\) 才是另一组对边。'
        }
      ],
      examples: [
        {
          id: '9-1-ex-1',
          title: '向量的线性运算',
          problem: '已知 \\(\\vec a=(3,-1)\\)，\\(\\vec b=(-1,2)\\)，求 \\(3\\vec a-2\\vec b\\) 的坐标。',
          solution: '<p>先分别算出两个数乘结果：</p><p>\\(3\\vec a=3\\times(3,-1)=(9,-3)\\)；\\(2\\vec b=2\\times(-1,2)=(-2,4)\\)。</p><p>再作减法（对应坐标相减）：</p><p>\\(3\\vec a-2\\vec b=(9-(-2),\\ -3-4)=(11,\\ -7)\\)。</p>',
          note: '做 \\(\\vec a-\\vec b\\) 时要把 \\(\\vec b\\) 的每个坐标都减去，容易漏掉负号，建议先写出 \\(-2\\vec b=(2,-4)\\) 再相加。'
        }
      ]
    },

    {
      id: '9-2',
      name: '求模、夹角与数量积',
      desc: '考查 \\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta=x_{1}x_{2}+y_{1}y_{2}\\)、\\(|\\vec a|=\\sqrt{x_{1}^{2}+y_{1}^{2}}\\) 与 \\(\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}\\)。求模常先求模的平方，再用 \\(|\\vec a\\pm\\vec b|^{2}=|\\vec a|^{2}\\pm2\\vec a\\cdot\\vec b+|\\vec b|^{2}\\)。',
      points: [
        '求模先平方：\\(|\\vec a+\\vec b|^{2}=|\\vec a|^{2}+2\\vec a\\cdot\\vec b+|\\vec b|^{2}\\)，避免直接对根式运算。',
        '夹角公式中 \\(\\theta\\in[0,\\pi]\\)，余弦为负说明夹角为钝角。',
        '“夹角为钝角”等价于 \\(\\vec a\\cdot\\vec b&lt;0\\) 且两向量不反向；“夹角为锐角”等价于 \\(\\vec a\\cdot\\vec b>0\\) 且不共线。',
        '已知模与数量积求 \\(\\vec a\\cdot\\vec b\\) 时可用极化恒等式 \\(\\vec a\\cdot\\vec b=\\frac{|\\vec a+\\vec b|^{2}-|\\vec a-\\vec b|^{2}}{4}\\)。',
        '算完夹角要检验是否在 \\([0,\\pi]\\) 内，并注意约分。'
      ],
      questions: [
        {
          id: '9-2-1',
          kind: 'choice',
          stem: '已知 \\(|\\vec a|=2\\)，\\(|\\vec b|=3\\)，\\(\\vec a\\cdot\\vec b=-3\\)，则 \\(|\\vec a+\\vec b|=\\)（　　）。',
          options: [
            '\\(\\sqrt7\\)',
            '\\(7\\)',
            '\\(\\sqrt{19}\\)',
            '\\(5\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>先求模的平方：</p><p>\\(|\\vec a+\\vec b|^{2}=|\\vec a|^{2}+2\\vec a\\cdot\\vec b+|\\vec b|^{2}=4+2\\times(-3)+9=4-6+9=7\\)。</p><p>所以 \\(|\\vec a+\\vec b|=\\sqrt7\\)。</p><p>故选 A。选项 C 是把 \\(2\\vec a\\cdot\\vec b\\) 误算成 \\(+6\\) 的结果；选项 D 则误把数量积当成模来相加。</p>'
        },
        {
          id: '9-2-2',
          kind: 'blank',
          stem: '已知 \\(\\vec a=(1,0)\\)，\\(\\vec b=(1,1)\\)，则 \\(\\vec a\\) 与 \\(\\vec b\\) 的夹角的余弦值为 ',
          blanks: [
            { before: '余弦值为 ', answer: ['√2/2'], after: '。' }
          ],
          answer: '√2/2',
          answerText: '\\(\\frac{\\sqrt2}{2}\\)',
          solution: '<p>先算数量积与两个模：</p><p>\\(\\vec a\\cdot\\vec b=1\\times1+0\\times1=1\\)。</p><p>\\(|\\vec a|=\\sqrt{1^{2}+0^{2}}=1\\)，\\(|\\vec b|=\\sqrt{1^{2}+1^{2}}=\\sqrt2\\)。</p><p>所以 \\(\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}=\\frac{1}{1\\times\\sqrt2}=\\frac{\\sqrt2}{2}\\)。</p><p>由此可知夹角为 \\(\\frac{\\pi}{4}\\)。</p>'
        },
        {
          id: '9-2-3',
          kind: 'short',
          stem: '已知 \\(\\vec a=(1,2)\\)，\\(\\vec b=(-2,\\lambda)\\)，若 \\(\\vec a\\) 与 \\(\\vec b\\) 的夹角是钝角，求实数 \\(\\lambda\\) 的取值范围。',
          answer: 'λ<1 且 λ≠-4',
          answerText: '\\(\\lambda&lt;1\\) 且 \\(\\lambda\\ne-4\\)',
          solution: '<p>夹角为钝角的充要条件是 \\(\\vec a\\cdot\\vec b&lt;0\\) 且两向量不反向。</p><p>先解 \\(\\vec a\\cdot\\vec b&lt;0\\)：\\(\\vec a\\cdot\\vec b=1\\times(-2)+2\\lambda=2\\lambda-2&lt;0\\)，得 \\(\\lambda&lt;1\\)。</p><p>再排除反向的情形。若 \\(\\vec a\\) 与 \\(\\vec b\\) 反向，则存在 \\(k&lt;0\\) 使 \\(\\vec b=k\\vec a\\)，即 \\((-2,\\lambda)=k(1,2)\\)，得 \\(k=-2\\)，\\(\\lambda=2k=-4\\)。此时 \\(\\vec a\\cdot\\vec b=2\\times(-4)-2=-10&lt;0\\)，确实是反向而非钝角，必须排除。</p><p>所以 \\(\\lambda\\) 的取值范围是 \\(\\lambda&lt;1\\) 且 \\(\\lambda\\ne-4\\)。</p>',
          note: '“夹角为钝角”与“数量积小于零”并不完全等价：反向时数量积也小于零，但夹角是 \\(\\pi\\) 而不是钝角，必须单独排除。'
        },
        {
          id: '9-2-4',
          kind: 'short',
          stem: '已知 \\(|\\vec a|=2\\)，\\(|\\vec b|=1\\)，\\(\\vec a\\) 与 \\(\\vec b\\) 的夹角为 \\(60^{\\circ}\\)，求 \\(|\\vec a-2\\vec b|\\) 的值。',
          answer: '2',
          answerText: '\\(|\\vec a-2\\vec b|=2\\)',
          solution: '<p>先算数量积：\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos 60^{\\circ}=2\\times1\\times\\frac12=1\\)。</p><p>再求模的平方：</p><p>\\(|\\vec a-2\\vec b|^{2}=|\\vec a|^{2}-4\\vec a\\cdot\\vec b+4|\\vec b|^{2}=4-4\\times1+4\\times1=4\\)。</p><p>所以 \\(|\\vec a-2\\vec b|=\\sqrt4=2\\)。</p>'
        }
      ],
      examples: [
        {
          id: '9-2-ex-1',
          title: '先算数量积，再求模与夹角',
          problem: '已知 \\(|\\vec a|=2\\)，\\(|\\vec b|=1\\)，\\(\\vec a\\) 与 \\(\\vec b\\) 的夹角为 \\(60^{\\circ}\\)，求 \\(\\vec a\\cdot\\vec b\\) 与 \\(|\\vec a+\\vec b|\\)。',
          solution: '<p>先求数量积：</p><p>\\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos 60^{\\circ}=2\\times1\\times\\frac12=1\\)。</p><p>再求模的平方，避免直接处理根式：</p><p>\\(|\\vec a+\\vec b|^{2}=|\\vec a|^{2}+2\\vec a\\cdot\\vec b+|\\vec b|^{2}=4+2\\times1+1=7\\)。</p><p>所以 \\(|\\vec a+\\vec b|=\\sqrt7\\)。</p>',
          note: '处理“已知模与夹角求另一个模”的题目，标准流程是：先求数量积 → 再平方展开 → 最后开方。'
        }
      ]
    },

    {
      id: '9-3',
      name: '平行与垂直的判定及参数求解',
      desc: '考查两条判定式：平行 \\(\\iff x_{1}y_{2}-x_{2}y_{1}=0\\)，垂直 \\(\\iff x_{1}x_{2}+y_{1}y_{2}=0\\)。含参数问题就是把条件代入判定式解方程，但要注意“非零向量”的前提，以及平行时还要区分同向与反向。',
      points: [
        '垂直判定：\\(\\vec a\\perp\\vec b\\iff \\vec a\\cdot\\vec b=0\\iff x_{1}x_{2}+y_{1}y_{2}=0\\)。',
        '平行判定：\\(\\vec a\\parallel\\vec b\\iff x_{1}y_{2}-x_{2}y_{1}=0\\)（交叉相乘之差为零）。',
        '用坐标判定平行时不必求模，比“成比例”更可靠（避免分母为零）。',
        '\\(\\vec a\\parallel\\vec b\\) 时若对应坐标之比为正则同向，为负则反向。',
        '含参数问题解出的值要代回检验，排除使某向量为零向量的情况。'
      ],
      questions: [
        {
          id: '9-3-1',
          kind: 'choice',
          stem: '已知 \\(\\vec a=(1,2)\\)，\\(\\vec b=(x,-4)\\)，若 \\(\\vec a\\parallel\\vec b\\)，则 \\(x=\\)（　　）。',
          options: [
            '\\(-2\\)',
            '\\(2\\)',
            '\\(-8\\)',
            '\\(8\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>由平行条件 \\(x_{1}y_{2}-x_{2}y_{1}=0\\)：</p><p>\\(1\\times(-4)-x\\times2=0\\)，即 \\(-4-2x=0\\)。</p><p>解得 \\(x=-2\\)。</p><p>检验：此时 \\(\\vec b=(-2,-4)=-2(1,2)=-2\\vec a\\)，两向量反向且均非零，确实平行。故选 A。</p><p>选项 B 是把交叉相乘写成 \\(1\\times(-4)+2x=0\\) 的结果，符号出错。</p>'
        },
        {
          id: '9-3-2',
          kind: 'blank',
          stem: '已知 \\(\\vec a=(2,-1)\\)，\\(\\vec b=(k,2)\\)，且 \\(\\vec a\\perp\\vec b\\)，则 \\(k=\\) ',
          blanks: [
            { before: '\\(k=\\) ', answer: ['1'], after: '。' }
          ],
          answer: '1',
          answerText: '\\(k=1\\)',
          solution: '<p>由垂直条件 \\(\\vec a\\cdot\\vec b=0\\)：</p><p>\\(2\\times k+(-1)\\times2=0\\)，即 \\(2k-2=0\\)。</p><p>解得 \\(k=1\\)。</p><p>检验：\\(\\vec a\\cdot\\vec b=(2,-1)\\cdot(1,2)=2-2=0\\)，垂直成立。</p>'
        },
        {
          id: '9-3-3',
          kind: 'choice',
          stem: '已知 \\(\\vec a=(2,1)\\)，\\(\\vec b=(-1,3)\\)，若 \\(\\lambda\\vec a+\\vec b\\) 与 \\(\\vec a\\) 垂直，则 \\(\\lambda=\\)（　　）。',
          options: [
            '\\(-\\frac15\\)',
            '\\(\\frac15\\)',
            '\\(-5\\)',
            '\\(5\\)'
          ],
          answer: 'A',
          answerText: 'A',
          solution: '<p>先算出组合向量的坐标：</p><p>\\(\\lambda\\vec a+\\vec b=\\lambda(2,1)+(-1,3)=(2\\lambda-1,\\ \\lambda+3)\\)。</p><p>由它与 \\(\\vec a=(2,1)\\) 垂直，得数量积为零：</p><p>\\(2(2\\lambda-1)+1\\cdot(\\lambda+3)=0\\)。</p><p>展开：\\(4\\lambda-2+\\lambda+3=0\\)，即 \\(5\\lambda+1=0\\)，解得 \\(\\lambda=-\\frac15\\)。</p><p>故选 A。选项 B 是漏掉常数项符号的结果，选项 C、D 则把“数量积为零”误当成“坐标为相反数”。</p>'
        },
        {
          id: '9-3-4',
          kind: 'short',
          stem: '已知 \\(\\vec a=(3,2)\\)，\\(\\vec b=(-1,\\lambda)\\)，若 \\(\\vec a\\parallel\\vec b\\)，求 \\(\\lambda\\) 的值，并判断两向量是同向还是反向。',
          answer: 'λ=-2/3，反向',
          answerText: '\\(\\lambda=-\\frac23\\)，两向量反向',
          solution: '<p>由平行条件 \\(x_{1}y_{2}-x_{2}y_{1}=0\\)：</p><p>\\(3\\lambda-2\\times(-1)=0\\)，即 \\(3\\lambda+2=0\\)，解得 \\(\\lambda=-\\frac23\\)。</p><p>此时 \\(\\vec b=\\left(-1,-\\frac23\\right)=-\\frac13(3,2)=-\\frac13\\vec a\\)。</p><p>因为比例系数 \\(-\\frac13&lt;0\\)，所以 \\(\\vec a\\) 与 \\(\\vec b\\) 方向相反，即两向量反向。</p>'
        }
      ],
      examples: [
        {
          id: '9-3-ex-1',
          title: '平行与垂直的综合判定',
          problem: '已知向量 \\(\\vec a=(1,2)\\)，\\(\\vec b=(2,1)\\)。（1）判断 \\(\\vec a+\\vec b\\) 与 \\(\\vec a-\\vec b\\) 是否垂直；（2）若 \\(\\vec a+k\\vec b\\) 与 \\(\\vec b\\) 平行，求 \\(k\\)。',
          solution: '<p>（1）先求坐标：\\(\\vec a+\\vec b=(3,3)\\)，\\(\\vec a-\\vec b=(-1,1)\\)。</p><p>算数量积：\\((\\vec a+\\vec b)\\cdot(\\vec a-\\vec b)=3\\times(-1)+3\\times1=-3+3=0\\)。</p><p>所以 \\(\\vec a+\\vec b\\) 与 \\(\\vec a-\\vec b\\) 垂直。</p><p>（也可以直接用公式：\\((\\vec a+\\vec b)\\cdot(\\vec a-\\vec b)=|\\vec a|^{2}-|\\vec b|^{2}=5-5=0\\)，这与 \\(|\\vec a|=|\\vec b|\\) 一致。）</p><p>（2）\\(\\vec a+k\\vec b=(1,2)+k(2,1)=(1+2k,\\ 2+k)\\)。</p><p>由它与 \\(\\vec b=(2,1)\\) 平行，得</p><p>\\((1+2k)\\times1-(2+k)\\times2=0\\)，即 \\(1+2k-4-2k=0\\)。</p><p>整理得 \\(-3=0\\)，矛盾，说明不存在实数 \\(k\\) 使它们平行。</p><p>原因：\\(\\vec a+k\\vec b\\) 的横纵坐标之差恒为 \\((1+2k)-(2+k)=k-1\\)，而要与 \\((2,1)\\) 平行需坐标比为 2，即 \\(1+2k=2(2+k)\\)，得 \\(1+2k=4+2k\\)，无论 \\(k\\) 取何值都不成立。</p>',
          note: '当两个向量本身不平行时，\\(\\vec a+k\\vec b\\) 有可能与其中之一平行，这取决于 \\(\\vec a\\)、\\(\\vec b\\) 的坐标关系；本题中由于 \\(\\vec a\\) 的两个分量之比为 \\(\\frac12\\) 而 \\(\\vec b\\) 为 2，恰好使得方程无解。'
        }
      ]
    },

    {
      id: '9-4',
      name: '基底表示与三点共线',
      desc: '考查平面向量基本定理与共线向量定理。基底必须不共线；三点共线的代数标志是 \\(\\overrightarrow{AC}=\\lambda\\overrightarrow{AB}\\)，或 \\(\\overrightarrow{OC}=x\\overrightarrow{OA}+y\\overrightarrow{OB}\\) 中 \\(x+y=1\\)。基底表示的关键是利用三角形法则把目标向量“拆”成已知向量的和差。',
      points: [
        '平面向量基本定理：任一向量都可用一组不共线基底唯一地线性表示。',
        '三点共线：\\(\\overrightarrow{AC}=\\lambda\\overrightarrow{AB}\\)，或 \\(x+y=1\\)（\\(\\overrightarrow{OC}=x\\overrightarrow{OA}+y\\overrightarrow{OB}\\)）。',
        '表示向量时反复使用 \\(\\overrightarrow{MN}=\\overrightarrow{ON}-\\overrightarrow{OM}\\) 与三角形法则。',
        '把向量用基底表示后，同一个向量的表示式唯一，可据此列出方程组。',
        '中点对应的表达：\\(M\\) 为 \\(AB\\) 中点 \\(\\iff\\overrightarrow{OM}=\\frac12\\left(\\overrightarrow{OA}+\\overrightarrow{OB}\\right)\\)。'
      ],
      questions: [
        {
          id: '9-4-1',
          kind: 'choice',
          stem: '已知 \\(\\overrightarrow{OA}=\\vec a\\)，\\(\\overrightarrow{OB}=\\vec b\\)，\\(\\overrightarrow{OC}=2\\vec a-\\vec b\\)，则 \\(A\\)、\\(B\\)、\\(C\\) 三点的位置关系是（　　）。',
          options: [
            '三点不共线',
            '三点共线',
            '无法确定',
            '三点重合'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>用共线向量定理判断。先求两条以 \\(A\\) 为起点的向量：</p><p>\\(\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}=\\vec b-\\vec a\\)。</p><p>\\(\\overrightarrow{AC}=\\overrightarrow{OC}-\\overrightarrow{OA}=(2\\vec a-\\vec b)-\\vec a=\\vec a-\\vec b=-\\left(\\vec b-\\vec a\\right)\\)。</p><p>所以 \\(\\overrightarrow{AC}=-\\overrightarrow{AB}\\)，两向量共线且有公共起点 \\(A\\)。</p><p>故 \\(A\\)、\\(B\\)、\\(C\\) 三点共线，且 \\(A\\) 是 \\(BC\\) 的中点。选 B。</p>'
        },
        {
          id: '9-4-2',
          kind: 'blank',
          stem: '已知 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 不共线，\\(\\vec a=2\\vec e_{1}+3\\vec e_{2}\\)，\\(\\vec b=\\vec e_{1}-2\\vec e_{2}\\)，则 \\(3\\vec a-2\\vec b=\\) ',
          blanks: [
            { before: '\\(3\\vec a-2\\vec b=\\) ', answer: ['4e1+13e2'], after: '（用 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 表示）。' }
          ],
          answer: '4e1+13e2',
          answerText: '\\(4\\vec e_{1}+13\\vec e_{2}\\)',
          solution: '<p>先分别算数乘：</p><p>\\(3\\vec a=3\\left(2\\vec e_{1}+3\\vec e_{2}\\right)=6\\vec e_{1}+9\\vec e_{2}\\)。</p><p>\\(2\\vec b=2\\left(\\vec e_{1}-2\\vec e_{2}\\right)=2\\vec e_{1}-4\\vec e_{2}\\)。</p><p>再相减：\\(3\\vec a-2\\vec b=\\left(6\\vec e_{1}+9\\vec e_{2}\\right)-\\left(2\\vec e_{1}-4\\vec e_{2}\\right)=4\\vec e_{1}+13\\vec e_{2}\\)。</p><p>注意 \\(-(-4\\vec e_{2})=+4\\vec e_{2}\\)，与 \\(9\\vec e_{2}\\) 合并得 \\(13\\vec e_{2}\\)。</p>'
        },
        {
          id: '9-4-3',
          kind: 'short',
          stem: '已知 \\(\\overrightarrow{OA}=\\vec a\\)，\\(\\overrightarrow{OB}=\\vec b\\)，点 \\(P\\) 在直线 \\(AB\\) 上，且 \\(\\overrightarrow{OP}=m\\vec a+n\\vec b\\)，证明 \\(m+n=1\\)。',
          answer: 'm+n=1',
          answerText: '\\(m+n=1\\)',
          solution: '<p>因为 \\(P\\) 在直线 \\(AB\\) 上，所以 \\(\\overrightarrow{AP}\\) 与 \\(\\overrightarrow{AB}\\) 共线。</p><p>由共线向量定理，存在实数 \\(t\\) 使 \\(\\overrightarrow{AP}=t\\overrightarrow{AB}\\)。</p><p>把两边都用 \\(\\vec a\\)、\\(\\vec b\\) 表示：</p><p>\\(\\overrightarrow{AP}=\\overrightarrow{OP}-\\overrightarrow{OA}=m\\vec a+n\\vec b-\\vec a=(m-1)\\vec a+n\\vec b\\)。</p><p>\\(t\\overrightarrow{AB}=t\\left(\\overrightarrow{OB}-\\overrightarrow{OA}\\right)=t\\left(\\vec b-\\vec a\\right)=-t\\vec a+t\\vec b\\)。</p><p>两式相等，得 \\((m-1)\\vec a+n\\vec b=-t\\vec a+t\\vec b\\)。</p><p>因为 \\(\\vec a\\)、\\(\\vec b\\) 不共线（否则 \\(O\\)、\\(A\\)、\\(B\\) 共线），由平面向量基本定理，同一向量的基底表示唯一，故</p><p>\\(m-1=-t\\) 且 \\(n=t\\)。两式相加消去 \\(t\\)，得 \\(m+n-1=0\\)，即 \\(m+n=1\\)。</p>',
          note: '反过来也成立：只要 \\(m+n=1\\)，就有 \\(P\\) 在直线 \\(AB\\) 上。这是判断三点共线最常用的代数形式。'
        }
      ],
      examples: [
        {
          id: '9-4-ex-1',
          title: '用基底表示向量',
          problem: '在梯形 \\(ABCD\\) 中，\\(AB\\parallel CD\\)，且 \\(AB=2CD\\)，\\(\\overrightarrow{AB}=\\vec e_{1}\\)，\\(\\overrightarrow{AD}=\\vec e_{2}\\)。（1）用 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 表示 \\(\\overrightarrow{CD}\\)；（2）若 \\(M\\) 为 \\(BC\\) 的中点，用 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 表示 \\(\\overrightarrow{AM}\\)。',
          solution: '<p>（1）因为 \\(AB\\parallel CD\\) 且 \\(AB=2CD\\)，所以 \\(\\overrightarrow{CD}\\) 与 \\(\\overrightarrow{AB}\\) 方向相反、长度为其一半：</p><p>\\(\\overrightarrow{CD}=-\\frac12\\overrightarrow{AB}=-\\frac12\\vec e_{1}\\)。</p><p>（2）由三角形法则，\\(\\overrightarrow{AC}=\\overrightarrow{AD}+\\overrightarrow{DC}\\)。而 \\(\\overrightarrow{DC}=-\\overrightarrow{CD}=\\frac12\\vec e_{1}\\)，所以</p><p>\\(\\overrightarrow{AC}=\\vec e_{2}+\\frac12\\vec e_{1}\\)。</p><p>又 \\(\\overrightarrow{AB}=\\vec e_{1}\\)，\\(M\\) 为 \\(BC\\) 中点，故</p><p>\\(\\overrightarrow{AM}=\\frac12\\left(\\overrightarrow{AB}+\\overrightarrow{AC}\\right)=\\frac12\\left(\\vec e_{1}+\\vec e_{2}+\\frac12\\vec e_{1}\\right)=\\frac34\\vec e_{1}+\\frac12\\vec e_{2}\\)。</p>',
          note: '用基底表示向量的两条常用路径：一是沿图形用三角形法则“走”过去；二是利用中点、重心等特殊点的向量表达式中点公式。'
        }
      ]
    },

    {
      id: '9-5',
      name: '向量与三角形四心',
      desc: '考查三角形的重心、垂心、外心、内心的向量刻画。重心对应“三条中线交于一点”，向量条件是 \\(\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=\\vec 0\\)；垂心对应高线，用数量积为零刻画；外心用“到三顶点距离相等”刻画；内心用角平分线刻画。',
      points: [
        '重心 \\(G\\)：\\(\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=\\vec 0\\)，且对任意点 \\(O\\) 有 \\(\\overrightarrow{OG}=\\frac13\\left(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}\\right)\\)。',
        '垂心 \\(H\\)：\\(\\overrightarrow{HA}\\cdot\\overrightarrow{HB}=\\overrightarrow{HB}\\cdot\\overrightarrow{HC}=\\overrightarrow{HC}\\cdot\\overrightarrow{HA}\\)。',
        '外心 \\(O\\)：\\(|\\overrightarrow{OA}|=|\\overrightarrow{OB}|=|\\overrightarrow{OC}|\\)，即外心到三顶点等距。',
        '内心 \\(I\\)：到三边距离相等，是三条角平分线的交点。',
        '重心分中线为 \\(2:1\\)：若 \\(D\\) 为 \\(BC\\) 中点，则 \\(\\overrightarrow{AG}=\\frac23\\overrightarrow{AD}\\)。'
      ],
      questions: [
        {
          id: '9-5-1',
          kind: 'choice',
          stem: '已知 \\(O\\) 是 \\(\\triangle ABC\\) 所在平面内一点，且满足 \\(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}=\\vec 0\\)，则 \\(O\\) 是 \\(\\triangle ABC\\) 的（　　）。',
          options: [
            '外心',
            '重心',
            '垂心',
            '内心'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>设 \\(D\\) 为 \\(BC\\) 的中点，则 \\(\\overrightarrow{OB}+\\overrightarrow{OC}=2\\overrightarrow{OD}\\)。</p><p>由已知条件得 \\(\\overrightarrow{OA}=-\\left(\\overrightarrow{OB}+\\overrightarrow{OC}\\right)=-2\\overrightarrow{OD}\\)。</p><p>所以 \\(\\overrightarrow{OA}\\) 与 \\(\\overrightarrow{OD}\\) 共线且方向相反，即 \\(O\\)、\\(A\\)、\\(D\\) 三点共线，且 \\(|\\overrightarrow{OA}|=2|\\overrightarrow{OD}|\\)。</p><p>这说明 \\(O\\) 在中线 \\(AD\\) 上，且把中线分成 \\(AO:OD=2:1\\)，这正是重心的性质。</p><p>故选 B。</p>'
        },
        {
          id: '9-5-2',
          kind: 'blank',
          stem: '在 \\(\\triangle ABC\\) 中，\\(O\\) 为重心，若 \\(\\overrightarrow{AB}=\\vec a\\)，\\(\\overrightarrow{AC}=\\vec b\\)，则 \\(\\overrightarrow{AO}=\\) ',
          blanks: [
            { before: '\\(\\overrightarrow{AO}=\\) ', answer: ['(1/3)a+(1/3)b','1/3a+1/3b'], after: '（用 \\(\\vec a\\)、\\(\\vec b\\) 表示）。' }
          ],
          answer: '(a+b)/3',
          answerText: '\\(\\frac13\\vec a+\\frac13\\vec b\\)',
          solution: '<p>重心是三条中线的交点，且重心把中线分成 \\(2:1\\)（顶点到重心占两段中的较长者）。</p><p>设 \\(D\\) 为 \\(BC\\) 的中点，则</p><p>\\(\\overrightarrow{AD}=\\frac12\\left(\\overrightarrow{AB}+\\overrightarrow{AC}\\right)=\\frac12\\vec a+\\frac12\\vec b\\)。</p><p>由重心的性质 \\(\\overrightarrow{AO}=\\frac23\\overrightarrow{AD}\\)，得</p><p>\\(\\overrightarrow{AO}=\\frac23\\left(\\frac12\\vec a+\\frac12\\vec b\\right)=\\frac13\\vec a+\\frac13\\vec b\\)。</p><p>这也与公式 \\(\\overrightarrow{OG}=\\frac13\\left(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}\\right)\\)（取 \\(A\\) 为参考点时 \\(\\overrightarrow{AO}=\\frac13\\left(\\overrightarrow{AB}+\\overrightarrow{AC}\\right)\\)）一致。</p>'
        },
        {
          id: '9-5-3',
          kind: 'short',
          stem: '已知 \\(O\\) 为 \\(\\triangle ABC\\) 的外心，\\(\\overrightarrow{OA}=\\vec a\\)，\\(\\overrightarrow{OB}=\\vec b\\)，\\(\\overrightarrow{OC}=\\vec c\\)。（1）写出 \\(\\vec a\\)、\\(\\vec b\\)、\\(\\vec c\\) 满足的关系式；（2）若 \\(\\overrightarrow{OH}=\\vec a+\\vec b+\\vec c\\)，判断 \\(H\\) 是否为 \\(\\triangle ABC\\) 的垂心并说明理由。',
          answer: '|a|=|b|=|c|；H 是垂心',
          answerText: '\\(|\\vec a|=|\\vec b|=|\\vec c|\\)；\\(H\\) 是垂心',
          solution: '<p>（1）外心到三个顶点的距离相等，即 \\(|\\overrightarrow{OA}|=|\\overrightarrow{OB}|=|\\overrightarrow{OC}|\\)，所以</p><p>\\(|\\vec a|=|\\vec b|=|\\vec c|=R\\)（\\(R\\) 为外接圆半径）。</p><p>（2）由 \\(\\overrightarrow{OH}=\\vec a+\\vec b+\\vec c\\) 得 \\(\\overrightarrow{AH}=\\overrightarrow{OH}-\\overrightarrow{OA}=(\\vec a+\\vec b+\\vec c)-\\vec a=\\vec b+\\vec c\\)。</p><p>又 \\(\\overrightarrow{BC}=\\vec c-\\vec b\\)。计算数量积：</p><p>\\(\\overrightarrow{AH}\\cdot\\overrightarrow{BC}=(\\vec b+\\vec c)\\cdot(\\vec c-\\vec b)=\\vec b\\cdot\\vec c-\\vec b^{2}+\\vec c^{2}-\\vec c\\cdot\\vec b=|\\vec c|^{2}-|\\vec b|^{2}\\)。</p><p>由（1）知 \\(|\\vec b|=|\\vec c|\\)，所以 \\(\\overrightarrow{AH}\\cdot\\overrightarrow{BC}=0\\)，即 \\(AH\\perp BC\\)。</p><p>同理可证 \\(BH\\perp CA\\)、\\(CH\\perp AB\\)。所以 \\(H\\) 是三条高线的交点，即 \\(\\triangle ABC\\) 的垂心。</p>',
          note: '结论 \\(\\overrightarrow{OH}=\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}\\)（\\(O\\) 为外心、\\(H\\) 为垂心）配合 \\(\\overrightarrow{OG}=\\frac13(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC})\\) 立即得到 \\(O\\)、\\(G\\)、\\(H\\) 三点共线且 \\(OG:GH=1:2\\)，即欧拉线。'
        }
      ],
      examples: [
        {
          id: '9-5-ex-1',
          title: '由向量关系判断“心”并求值',
          problem: '已知 \\(\\triangle ABC\\) 所在平面内一点 \\(O\\) 满足 \\(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}=\\vec 0\\)，且 \\(\\overrightarrow{OA}=(1,2)\\)，\\(\\overrightarrow{OB}=(3,-1)\\)。（1）判断 \\(O\\) 是 \\(\\triangle ABC\\) 的什么心；（2）求 \\(\\overrightarrow{OC}\\) 的坐标；（3）求 \\(\\overrightarrow{OG}\\cdot\\overrightarrow{OA}\\)（\\(G\\) 为 \\(\\triangle ABC\\) 的重心）。',
          solution: '<p>（1）设 \\(D\\) 为 \\(BC\\) 的中点，则 \\(\\overrightarrow{OB}+\\overrightarrow{OC}=2\\overrightarrow{OD}\\)，由已知得 \\(\\overrightarrow{OA}=-2\\overrightarrow{OD}\\)。</p><p>所以 \\(O\\)、\\(A\\)、\\(D\\) 三点共线，且 \\(|\\overrightarrow{OA}|=2|\\overrightarrow{OD}|\\)，即 \\(O\\) 在中线 \\(AD\\) 上且 \\(AO:OD=2:1\\)。</p><p>因为重心是三条中线的交点且分中线为 \\(2:1\\)，所以 \\(O\\) 是 \\(\\triangle ABC\\) 的重心。</p><p>（2）由 \\(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}=\\vec 0\\) 得</p><p>\\(\\overrightarrow{OC}=-\\overrightarrow{OA}-\\overrightarrow{OB}=-(1,2)-(3,-1)=(-4,-1)\\)。</p><p>（3）重心 \\(G\\) 满足 \\(\\overrightarrow{OG}=\\frac13\\left(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}\\right)=\\frac13\\vec 0=\\vec 0\\)。</p><p>所以 \\(G\\) 与 \\(O\\) 重合，\\(\\overrightarrow{OG}=\\vec 0\\)，从而 \\(\\overrightarrow{OG}\\cdot\\overrightarrow{OA}=0\\)。</p><p>这与（1）的结论一致：\\(O\\) 本身就是重心，重心到自身当然是零向量。</p>',
          note: '条件 \\(\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}=\\vec 0\\) 的几何含义就是“\\(O\\) 是 \\(\\triangle ABC\\) 的重心”，此时 \\(\\overrightarrow{OG}=\\vec 0\\) 自然成立。'
        }
      ]
    },

    {
      id: '9-6',
      name: '向量最值与范围问题',
      desc: '考查含参数的模、数量积的最值与取值范围。基本手段有三种：一是把模平方化为关于参数的二次函数；二是用 \\(\\cos\\theta\\in[-1,1]\\) 或 \\(|\\vec a\\cdot\\vec b|\\le|\\vec a||\\vec b|\\) 放缩；三是把向量问题几何化，用“点到直线距离最短”等几何直观求最值。',
      points: [
        '把含参向量的模平方，转化为二次函数求最值，注意参数的允许范围。',
        '基本不等式：\\(|\\vec a\\cdot\\vec b|\\le|\\vec a||\\vec b|\\)，等号当且仅当两向量共线时成立。',
        '三角不等式：\\(||\\vec a|-|\\vec b||\\le|\\vec a\\pm\\vec b|\\le|\\vec a|+|\\vec b|\\)。',
        '夹角范围 \\(\\theta\\in[0,\\pi]\\) 可转化为 \\(\\cos\\theta\\) 的范围，再由数量积列出不等式。',
        '几何化处理：\\(|\\vec a-t\\vec b|\\) 的最小值就是点（\\(\\vec a\\) 的终点）到直线（\\(\\vec b\\) 所在直线）的距离。'
      ],
      questions: [
        {
          id: '9-6-1',
          kind: 'choice',
          stem: '已知 \\(|\\vec a|=1\\)，\\(|\\vec b|=1\\)，\\(\\vec a\\) 与 \\(\\vec b\\) 的夹角为 \\(60^{\\circ}\\)，则 \\(|\\vec a+t\\vec b|\\)（\\(t\\in\\text{R}\\)）的最小值是（　　）。',
          options: [
            '\\(\\frac12\\)',
            '\\(\\frac{\\sqrt3}{2}\\)',
            '\\(\\frac{\\sqrt2}{2}\\)',
            '\\(1\\)'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>先算数量积：\\(\\vec a\\cdot\\vec b=1\\times1\\times\\cos 60^{\\circ}=\\frac12\\)。</p><p>把模平方：</p><p>\\(|\\vec a+t\\vec b|^{2}=|\\vec a|^{2}+2t\\vec a\\cdot\\vec b+t^{2}|\\vec b|^{2}=1+t+t^{2}\\)。</p><p>这是关于 \\(t\\) 的二次函数，开口向上，对称轴为 \\(t=-\\frac12\\)。</p><p>最小值为 \\(\\left(-\\frac12\\right)^{2}+\\left(-\\frac12\\right)+1=\\frac14-\\frac12+1=\\frac34\\)。</p><p>所以 \\(|\\vec a+t\\vec b|\\) 的最小值为 \\(\\sqrt{\\frac34}=\\frac{\\sqrt3}{2}\\)。</p><p>几何解释：\\(\\frac{\\sqrt3}{2}\\) 正是 \\(\\vec a\\) 的终点到 \\(\\vec b\\) 所在直线的距离。故选 B。</p>'
        },
        {
          id: '9-6-2',
          kind: 'blank',
          stem: '已知 \\(|\\vec a|=1\\)，\\(|\\vec b|=1\\)，且 \\(\\vec a\\cdot\\vec b=\\frac12\\)，则 \\(|\\vec a-\\vec b|=\\) ',
          blanks: [
            { before: '\\(|\\vec a-\\vec b|=\\) ', answer: ['1'], after: '。' }
          ],
          answer: '1',
          answerText: '\\(1\\)',
          solution: '<p>先把模平方：</p><p>\\(|\\vec a-\\vec b|^{2}=|\\vec a|^{2}-2\\vec a\\cdot\\vec b+|\\vec b|^{2}=1-2\\times\\frac12+1=1\\)。</p><p>所以 \\(|\\vec a-\\vec b|=\\sqrt1=1\\)。</p><p>这也说明两个单位向量在数量积为 \\(\\frac12\\)（即夹角 \\(60^{\\circ}\\)）时，它们的差仍构成边长均为 1 的等边三角形的一条边。</p>'
        },
        {
          id: '9-6-3',
          kind: 'short',
          stem: '已知 \\(|\\vec a|=2\\)，\\(|\\vec b|=1\\)，\\(\\vec a\\) 与 \\(\\vec b\\) 的夹角为 \\(60^{\\circ}\\)，求 \\(|\\vec a-\\vec b|\\) 的最大值。',
          answer: '3',
          answerText: '最大值为 \\(3\\)',
          solution: '<p>先用三角不等式放缩，再验证等号可以取到。</p><p>因为 \\(|\\vec a|=2\\)，\\(|\\vec b|=1\\)，所以</p><p>\\(|\\vec a-\\vec b|\\le|\\vec a|+|\\vec b|=2+1=3\\)。</p><p>等号成立当且仅当 \\(\\vec a\\) 与 \\(-\\vec b\\) 同向，即 \\(\\vec a\\) 与 \\(\\vec b\\) 反向，此时夹角为 \\(180^{\\circ}\\)。</p><p>但题目限定夹角为 \\(60^{\\circ}\\)，故等号取不到，需要用具体计算确定最大值。</p><p>计算：\\(|\\vec a-\\vec b|^{2}=|\\vec a|^{2}-2\\vec a\\cdot\\vec b+|\\vec b|^{2}=4-2\\times\\left(2\\times1\\times\\frac12\\right)+1=4-2+1=3\\)。</p><p>所以在夹角为 \\(60^{\\circ}\\) 的条件下 \\(|\\vec a-\\vec b|=\\sqrt3\\) 是一个定值，不存在更大的值。</p>',
          note: '本题说明：一旦两个向量的模与夹角都确定，它们的和、差的模也随之确定，不是变量。只有模或夹角不确定时，才需要求最值。'
        },
        {
          id: '9-6-4',
          kind: 'choice',
          stem: '已知 \\(\\vec a=(1,0)\\)，\\(\\vec b=(0,1)\\)，若 \\(\\vec c=x\\vec a+y\\vec b\\) 且 \\(|\\vec c|=2\\)，则 \\(xy\\) 的最大值是（　　）。',
          options: [
            '\\(1\\)',
            '\\(2\\)',
            '\\(4\\)',
            '\\(\\frac12\\)'
          ],
          answer: 'B',
          answerText: 'B',
          solution: '<p>由 \\(\\vec a=(1,0)\\)，\\(\\vec b=(0,1)\\) 得 \\(\\vec c=x\\vec a+y\\vec b=(x,y)\\)。</p><p>条件 \\(|\\vec c|=2\\) 即 \\(x^{2}+y^{2}=4\\)。</p><p>由基本不等式 \\(x^{2}+y^{2}\\ge2|xy|\\)，得 \\(2|xy|\\le4\\)，即 \\(|xy|\\le2\\)。</p><p>当 \\(x=y=\\sqrt2\\) 时 \\(x^{2}+y^{2}=4\\) 成立，且此时 \\(xy=2\\)，等号取到。</p><p>所以 \\(xy\\) 的最大值为 2，选 B。（若 \\(x=y=-\\sqrt2\\)，则 \\(xy=2\\) 同样取到最大值。）</p>'
        }
      ],
      examples: [
        {
          id: '9-6-ex-1',
          title: '用极化恒等式求数量积',
          problem: '已知 \\(|\\vec a+\\vec b|=3\\)，\\(|\\vec a-\\vec b|=1\\)，求 \\(\\vec a\\cdot\\vec b\\) 以及 \\(|\\vec a|\\cdot|\\vec b|\\) 的最小值。',
          solution: '<p>（1）由极化恒等式</p><p>\\(\\vec a\\cdot\\vec b=\\frac{|\\vec a+\\vec b|^{2}-|\\vec a-\\vec b|^{2}}{4}=\\frac{9-1}{4}=2\\)。</p><p>（2）由 \\(|\\vec a\\cdot\\vec b|\\le|\\vec a||\\vec b|\\) 得</p><p>\\(|\\vec a||\\vec b|\\ge|\\vec a\\cdot\\vec b|=2\\)。</p><p>再看等号能否取到：等号成立当且仅当 \\(\\vec a\\) 与 \\(\\vec b\\) 共线。</p><p>若 \\(\\vec a\\)、\\(\\vec b\\) 同向，设 \\(|\\vec a|=m\\)，\\(|\\vec b|=n\\)（\\(m,n>0\\)），则 \\(|\\vec a+\\vec b|=m+n=3\\)，\\(|\\vec a-\\vec b|=|m-n|=1\\)，解得 \\(m=2\\)，\\(n=1\\)，此时 \\(|\\vec a||\\vec b|=2\\)。</p><p>若 \\(\\vec a\\)、\\(\\vec b\\) 反向，同理可得 \\(|\\vec a||\\vec b|=2\\)。</p><p>所以 \\(|\\vec a||\\vec b|\\) 的最小值为 2，两种情形都能取到。</p>',
          note: '极化恒等式把两个已知的“和、差的模”直接转化为数量积，比展开平方后再联立方程简洁得多；求最值时别忘了验证等号能否取到。'
        }
      ]
    }
  ]
});
