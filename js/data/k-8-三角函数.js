/*!
 * k-8-三角函数.js —— 第 8 章「三角函数」基础知识
 */
DSHData.registerKnowledge({
  id: 8,
  name: '三角函数',
  group: '必修二 · 三角',
  brief: '单位圆是三角函数的“根”：任意角的三角函数值由终边与单位圆的交点坐标定义，同角关系、诱导公式、和差角公式都可以由单位圆的对称性与旋转变换推出来。',

  sections: [
    {
      title: '一、弧度制与角的推广',
      tag: '概念',
      html: '<p><b>角的推广：</b>把一条射线绕端点旋转，按逆时针方向旋转形成的角叫正角，按顺时针方向旋转形成的角叫负角，不作旋转时为零角。这样角就不再局限于 \\(0^{\\circ}\\) 到 \\(360^{\\circ}\\)，而可以是任意大小的角。</p>' +
        '<p>所有与角 \\(\\alpha\\) 终边相同的角，连同 \\(\\alpha\\) 在内，构成集合</p>' +
        '\\[S=\\{\\beta\\mid \\beta=\\alpha+k\\cdot360^{\\circ},\\ k\\in Z\\}.\\]' +
        '<p><b>弧度制：</b>长度等于半径长的圆弧所对的圆心角叫 1 弧度的角，记作 1 rad。若圆心角 \\(\\alpha\\) 所对的弧长为 \\(l\\)，半径为 \\(r\\)，则</p>' +
        '\\[|\\alpha|=\\frac lr\\quad(\\text{弧度}),\\qquad l=|\\alpha|r,\\qquad S=\\frac12 lr=\\frac12|\\alpha|r^{2}.\\]' +
        '<p>由弧长公式可以说明角度与弧度的换算关系：整个圆周长为 \\(2\\pi r\\)，对应的圆心角是 \\(360^{\\circ}\\)，故</p>' +
        '\\[2\\pi\\ \\text{rad}=360^{\\circ},\\qquad \\pi\\ \\text{rad}=180^{\\circ}.\\]' +
        '<p>由此得到 \\(1^{\\circ}=\\frac{\\pi}{180}\\) rad，\\(1\\ \\text{rad}=\\left(\\frac{180}{\\pi}\\right)^{\\circ}\\approx57.3^{\\circ}\\)。常用换算：\\(30^{\\circ}=\\frac{\\pi}{6}\\)，\\(45^{\\circ}=\\frac{\\pi}{4}\\)，\\(60^{\\circ}=\\frac{\\pi}{3}\\)，\\(90^{\\circ}=\\frac{\\pi}{2}\\)，\\(180^{\\circ}=\\pi\\)。</p>' +
        '<p>采用弧度制后，角的集合与实数集之间建立了一一对应，三角函数才真正成为以实数为自变量的函数；同时 \\(\\lim_{x\\to0}\\frac{\\sin x}{x}=1\\) 等分析结论也只有在弧度制下才成立。</p>' 
},
    {
      title: '二、任意角三角函数的定义与符号',
      tag: '概念',
      html: '<p>设 \\(\\alpha\\) 是任意角，它的终边与单位圆（半径为 1、圆心在原点）交于点 \\(P(x,y)\\)，则规定</p>' +
        '\\[\\sin\\alpha=y,\\qquad \\cos\\alpha=x,\\qquad \\tan\\alpha=\\frac yx\\ (x\\ne0).\\]' +
        '<p>也就是说：<b>余弦是交点的横坐标，正弦是交点的纵坐标，正切是纵坐标与横坐标之比</b>。因为交点总在单位圆上，所以 \\(|x|\\le1\\)，\\(|y|\\le1\\)，从而 \\(-1\\le\\sin\\alpha\\le1\\)，\\(-1\\le\\cos\\alpha\\le1\\)。</p>' +
        '<p>由定义可直接得到函数值的符号规律：\\(\\sin\\alpha\\) 的符号与 \\(y\\) 一致，\\(\\cos\\alpha\\) 的符号与 \\(x\\) 一致，\\(\\tan\\alpha\\) 的符号由 \\(x\\)、\\(y\\) 是否同号决定。于是有“一全正、二正弦、三正切、四余弦”的口诀。</p>' +
        '<p>正切的定义域要特别留意：当终边落在 \\(y\\) 轴上时 \\(x=0\\)，\\(\\tan\\alpha\\) 无意义，故正切函数的定义域是 \\(\\left\\{\\alpha\\ \\middle|\\ \\alpha\\ne\\frac{\\pi}{2}+k\\pi,\\ k\\in Z\\right\\}\\)。</p>' +
        '<p>若改用终边上任意一点 \\(Q(x,y)\\)（\\(r=\\sqrt{x^{2}+y^{2}}>0\\)）来定义，则有 \\(\\sin\\alpha=\\frac yr\\)，\\(\\cos\\alpha=\\frac xr\\)，\\(\\tan\\alpha=\\frac yx\\)。这与单位圆定义是一致的：把 \\(Q\\) 按比例压到单位圆上，坐标变为 \\(\\left(\\frac xr,\\frac yr\\right)\\)。</p>' 
},
    {
      title: '三、同角三角函数的基本关系',
      tag: '公式',
      html: '<p>在单位圆中，点 \\(P(\\cos\\alpha,\\sin\\alpha)\\) 到原点的距离恒为 1，由两点间距离公式得</p>' +
        '\\[\\sin^{2}\\alpha+\\cos^{2}\\alpha=1.\\]' +
        '<p>当 \\(\\cos\\alpha\\ne0\\) 时，由正切的定义得</p>' +
        '\\[\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}.\\]' +
        '<p>这两个关系叫<strong>同角三角函数的基本关系</strong>。“同角”二字很重要：\\(\\sin^{2}\\alpha+\\cos^{2}\\beta=1\\) 一般不成立。</p>' +
        '<p>它们有三种典型用法：</p>' +
        '<ul>' +
        '<li><b>知一求二：</b>已知 \\(\\sin\\alpha\\) 求 \\(\\cos\\alpha\\)，用平方关系；已知 \\(\\tan\\alpha\\) 求 \\(\\sin\\alpha\\) 或 \\(\\cos\\alpha\\)，把 \\(\\sin\\alpha=\\tan\\alpha\\cdot\\cos\\alpha\\) 代入平方关系解出 \\(\\cos^{2}\\alpha\\)。开方时<strong>必须由角所在象限确定符号</strong>。</li>' +
        '<li><b>齐次式求值：</b>求 \\(\\frac{a\\sin\\alpha+b\\cos\\alpha}{c\\sin\\alpha+d\\cos\\alpha}\\) 时，分子分母同除以 \\(\\cos\\alpha\\)，化为只含 \\(\\tan\\alpha\\) 的式子。</li>' +
        '<li><b>化简与证明：</b>把“切”化为“弦”，或利用 \\(1=\\sin^{2}\\alpha+\\cos^{2}\\alpha\\) 作整体代换。</li>' +
        '</ul>' +
        '<p>由平方关系还可以推出一个常用变形：\\((\\sin\\alpha+\\cos\\alpha)^{2}=1+2\\sin\\alpha\\cos\\alpha\\)，\\((\\sin\\alpha-\\cos\\alpha)^{2}=1-2\\sin\\alpha\\cos\\alpha\\)。因此只要知道 \\(\\sin\\alpha+\\cos\\alpha\\)、\\(\\sin\\alpha-\\cos\\alpha\\)、\\(\\sin\\alpha\\cos\\alpha\\) 三者中的一个，就能求出另外两个。</p>' 
},
    {
      title: '四、诱导公式与和差角公式',
      tag: '公式',
      html: '<p><b>（1）诱导公式。</b>终边关于 \\(x\\) 轴、\\(y\\) 轴、原点对称，就得到 \\(-\\alpha\\)、\\(\\pi-\\alpha\\)、\\(\\pi+\\alpha\\) 的三角函数值：</p>' +
        '\\[\\sin(-\\alpha)=-\\sin\\alpha,\\quad \\cos(-\\alpha)=\\cos\\alpha,\\quad \\tan(-\\alpha)=-\\tan\\alpha,\\]' +
        '\\[\\sin(\\pi-\\alpha)=\\sin\\alpha,\\quad \\cos(\\pi-\\alpha)=-\\cos\\alpha,\\]' +
        '\\[\\sin(\\pi+\\alpha)=-\\sin\\alpha,\\quad \\cos(\\pi+\\alpha)=-\\cos\\alpha.\\]' +
        '<p>把角写成 \\(\\frac{k\\pi}{2}\\pm\\alpha\\) 的形式后，可用口诀<b>“奇变偶不变，符号看象限”</b>统一处理：\\(k\\) 为奇数时函数名改变（正弦与余弦互换、正切与余切互换），\\(k\\) 为偶数时函数名不变；符号则由把 \\(\\alpha\\) 看作锐角时原函数值所在象限的符号决定。</p>' +
        '<p><b>（2）和差角公式。</b></p>' +
        '\\[\\sin(\\alpha\\pm\\beta)=\\sin\\alpha\\cos\\beta\\pm\\cos\\alpha\\sin\\beta,\\]' +
        '\\[\\cos(\\alpha\\pm\\beta)=\\cos\\alpha\\cos\\beta\\mp\\sin\\alpha\\sin\\beta,\\]' +
        '\\[\\tan(\\alpha\\pm\\beta)=\\frac{\\tan\\alpha\\pm\\tan\\beta}{1\\mp\\tan\\alpha\\tan\\beta}.\\]' +
        '<p>记忆要点：正弦“异名相乘、符号相同”，余弦“同名相乘、符号相反”，正切公式的分子符号与左边一致、分母相反。</p>' +
        '<p><b>（3）二倍角公式。</b>在和角公式中令 \\(\\beta=\\alpha\\) 即得</p>' +
        '\\[\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha,\\quad \\cos 2\\alpha=\\cos^{2}\\alpha-\\sin^{2}\\alpha=1-2\\sin^{2}\\alpha=2\\cos^{2}\\alpha-1,\\]' +
        '\\[\\tan 2\\alpha=\\frac{2\\tan\\alpha}{1-\\tan^{2}\\alpha}.\\]' +
        '<p>其中 \\(\\cos 2\\alpha\\) 的三种形式（升幂与降幂）在化简中极为常用，例如 \\(1+\\cos 2\\alpha=2\\cos^{2}\\alpha\\)，\\(1-\\cos 2\\alpha=2\\sin^{2}\\alpha\\)。</p>' +
        '<p><b>（4）辅助角公式。</b>对 \\(a\\sin x+b\\cos x\\)（\\(a,b\\) 不同时为 0），</p>' +
        '\\[a\\sin x+b\\cos x=\\sqrt{a^{2}+b^{2}}\\,\\sin(x+\\varphi),\\qquad \\tan\\varphi=\\frac ba.\\]' +
        '<p>它把“同名不同系数的两项”合并成一个正弦型函数，是求最值与周期的关键工具。例如 \\(\\sin x+\\sqrt3\\cos x=2\\sin\\left(x+\\frac{\\pi}{3}\\right)\\)。</p>' 
},
    {
      title: '五、三角函数的图像与性质',
      tag: '图像',
      html: '<p>正弦、余弦、正切函数的性质可归纳为下表（\\(k\\in Z\\)）：</p>' +
        '<table class="tbl"><thead><tr><th>项目</th><th>\\(y=\\sin x\\)</th><th>\\(y=\\cos x\\)</th><th>\\(y=\\tan x\\)</th></tr></thead>' +
        '<tbody>' +
        '<tr><td>定义域</td><td>\\(R\\)</td><td>\\(R\\)</td><td>\\(x\\ne\\frac{\\pi}{2}+k\\pi\\)</td></tr>' +
        '<tr><td>值域</td><td>\\([-1,1]\\)</td><td>\\([-1,1]\\)</td><td>\\(R\\)</td></tr>' +
        '<tr><td>最小正周期</td><td>\\(2\\pi\\)</td><td>\\(2\\pi\\)</td><td>\\(\\pi\\)</td></tr>' +
        '<tr><td>奇偶性</td><td>奇函数</td><td>偶函数</td><td>奇函数</td></tr>' +
        '<tr><td>对称轴</td><td>\\(x=\\frac{\\pi}{2}+k\\pi\\)</td><td>\\(x=k\\pi\\)</td><td>无</td></tr>' +
        '<tr><td>对称中心</td><td>\\((k\\pi,0)\\)</td><td>\\(\\left(\\frac{\\pi}{2}+k\\pi,0\\right)\\)</td><td>\\(\\left(\\frac{k\\pi}{2},0\\right)\\)</td></tr>' +
        '<tr><td>单调增区间</td><td>\\(\\left[-\\frac{\\pi}{2}+2k\\pi,\\frac{\\pi}{2}+2k\\pi\\right]\\)</td><td>\\([-\\pi+2k\\pi,2k\\pi]\\)</td><td>\\(\\left(-\\frac{\\pi}{2}+k\\pi,\\frac{\\pi}{2}+k\\pi\\right)\\)</td></tr>' +
        '</tbody></table>' +
        '<p><b>读图要点：</b>正弦、余弦曲线都被夹在两条水平直线 \\(y=1\\) 与 \\(y=-1\\) 之间，波形相同、相位相差 \\(\\frac{\\pi}{2}\\)；正切曲线被 \\(x=\\frac{\\pi}{2}+k\\pi\\) 这些渐近线隔成一支一支，每一支都单调递增，且整体不是连续函数。</p>' +
        '<p>对一般形式 \\(y=A\\sin(\\omega x+\\varphi)+B\\)（\\(A>0\\)，\\(\\omega>0\\)）有：振幅为 \\(A\\)，最小正周期 \\(T=\\frac{2\\pi}{\\omega}\\)，值域为 \\([B-A,B+A]\\)，初相为 \\(\\varphi\\)。“五点法”作图时，令 \\(\\omega x+\\varphi\\) 依次取 \\(0,\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2},2\\pi\\)，求出相应的五个关键点即可。</p>' 
}
  ],

  proofs: [
    {
      title: '同角关系 sin²α+cos²α=1 的单位圆证明',
      claim: '证明目标：对任意角 \\(\\alpha\\)，都有 \\(\\sin^{2}\\alpha+\\cos^{2}\\alpha=1\\)；当 \\(\\cos\\alpha\\ne0\\) 时还有 \\(\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}\\)。',
      steps: [
        '设角 \\(\\alpha\\) 的终边与单位圆交于点 \\(P(x,y)\\)。由单位圆定义，\\(x=\\cos\\alpha\\)，\\(y=\\sin\\alpha\\)，且点 \\(P\\) 满足 \\(x^{2}+y^{2}=1\\)。',
        '把 \\(x=\\cos\\alpha\\)，\\(y=\\sin\\alpha\\) 代入单位圆方程 \\(x^{2}+y^{2}=1\\)，得 \\(\\cos^{2}\\alpha+\\sin^{2}\\alpha=1\\)，即 \\(\\sin^{2}\\alpha+\\cos^{2}\\alpha=1\\)。',
        '当 \\(\\cos\\alpha\\ne0\\) 即 \\(x\\ne0\\) 时，由定义 \\(\\tan\\alpha=\\frac yx\\)，把 \\(y=\\sin\\alpha\\)、\\(x=\\cos\\alpha\\) 代入得 \\(\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}\\)。',
        '由此还可推出 \\(1+\\tan^{2}\\alpha=\\frac{\\cos^{2}\\alpha+\\sin^{2}\\alpha}{\\cos^{2}\\alpha}=\\frac{1}{\\cos^{2}\\alpha}\\)（\\(\\cos\\alpha\\ne0\\)），这是“知切求弦”常用的桥梁。'
      ],
      note: '证明只用了一件事：点 \\(P\\) 在单位圆上。因此平方关系对一切角 \\(\\alpha\\) 都成立，不受象限影响；但开方求 \\(\\sin\\alpha\\) 或 \\(\\cos\\alpha\\) 时必须结合象限确定符号。'
    },
    {
      title: '用向量数量积推导两角差的余弦公式',
      claim: '证明目标：对任意角 \\(\\alpha\\)、\\(\\beta\\)，有 \\(\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta\\)。',
      steps: [
        '在单位圆上取两点：\\(A(\\cos\\alpha,\\sin\\alpha)\\)，\\(B(\\cos\\beta,\\sin\\beta)\\)。它们的坐标正是两个角的三角函数值。',
        '设 \\(\\overrightarrow{OA}\\) 与 \\(\\overrightarrow{OB}\\) 的夹角为 \\(\\theta\\)。由数量积的坐标表示与几何表示，分别计算 \\(\\overrightarrow{OA}\\cdot\\overrightarrow{OB}\\)。',
        '坐标表示：\\(\\overrightarrow{OA}\\cdot\\overrightarrow{OB}=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta\\)。',
        '几何表示：因为 \\(|\\overrightarrow{OA}|=|\\overrightarrow{OB}|=1\\)，所以 \\(\\overrightarrow{OA}\\cdot\\overrightarrow{OB}=|\\overrightarrow{OA}||\\overrightarrow{OB}|\\cos\\theta=\\cos\\theta\\)。',
        '两式相等得 \\(\\cos\\theta=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta\\)。由于 \\(\\overrightarrow{OA}\\) 与 \\(\\overrightarrow{OB}\\) 的夹角 \\(\\theta\\) 与 \\(\\alpha-\\beta\\) 的终边夹角相等或互补（相差 \\(2k\\pi\\)），而余弦值相同，故 \\(\\cos(\\alpha-\\beta)=\\cos\\theta\\)。',
        '于是 \\(\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta\\)。'
      ],
      note: '把 \\(\\beta\\) 换成 \\(-\\beta\\) 并用诱导公式 \\(\\cos(-\\beta)=\\cos\\beta\\)、\\(\\sin(-\\beta)=-\\sin\\beta\\)，即得 \\(\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta\\)；再由 \\(\\sin(\\alpha\\pm\\beta)=\\cos\\left[\\left(\\frac{\\pi}{2}-\\alpha\\right)\\mp\\beta\\right]\\) 可推出正弦的和差角公式。'
    },
    {
      title: '由和角公式推出二倍角公式与辅助角公式',
      claim: '证明目标：由和角公式推出 \\(\\sin 2\\alpha=2\\sin\\alpha\\cos\\alpha\\) 与 \\(a\\sin x+b\\cos x=\\sqrt{a^{2}+b^{2}}\\sin(x+\\varphi)\\)。',
      steps: [
        '在 \\(\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta\\) 中令 \\(\\beta=\\alpha\\)，得 \\(\\sin 2\\alpha=\\sin\\alpha\\cos\\alpha+\\cos\\alpha\\sin\\alpha=2\\sin\\alpha\\cos\\alpha\\)。',
        '同法在 \\(\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta\\) 中令 \\(\\beta=\\alpha\\)，得 \\(\\cos 2\\alpha=\\cos^{2}\\alpha-\\sin^{2}\\alpha\\)；再用 \\(\\sin^{2}\\alpha=1-\\cos^{2}\\alpha\\) 或 \\(\\cos^{2}\\alpha=1-\\sin^{2}\\alpha\\) 代换，得 \\(\\cos 2\\alpha=2\\cos^{2}\\alpha-1=1-2\\sin^{2}\\alpha\\)。',
        '设 \\(a\\sin x+b\\cos x\\)，其中 \\(a\\)、\\(b\\) 不同时为 0，则 \\(r=\\sqrt{a^{2}+b^{2}}>0\\)。把式子写成 \\(r\\left(\\frac ar\\sin x+\\frac br\\cos x\\right)\\)。',
        '因为 \\(\\left(\\frac ar\\right)^{2}+\\left(\\frac br\\right)^{2}=\\frac{a^{2}+b^{2}}{r^{2}}=1\\)，所以可以令 \\(\\cos\\varphi=\\frac ar\\)，\\(\\sin\\varphi=\\frac br\\)，这样的 \\(\\varphi\\) 一定存在，且 \\(\\tan\\varphi=\\frac ba\\)。',
        '由和角公式，\\(r(\\sin x\\cos\\varphi+\\cos x\\sin\\varphi)=r\\sin(x+\\varphi)\\)，即 \\(a\\sin x+b\\cos x=\\sqrt{a^{2}+b^{2}}\\,\\sin(x+\\varphi)\\)。',
        '于是 \\(a\\sin x+b\\cos x\\) 的最大值为 \\(\\sqrt{a^{2}+b^{2}}\\)，最小值为 \\(-\\sqrt{a^{2}+b^{2}}\\)，最小正周期仍为 \\(2\\pi\\)。'
      ],
      note: '辅助角的本质是“把两个系数看作同一个单位圆上一点的横纵坐标”，这也解释了为什么必须先提取 \\(\\sqrt{a^{2}+b^{2}}\\)。'
    }
  ],


  types: [
    '三角函数化简、求值与恒等式证明',
    '给值求值与给值求角',
    '图像变换与五点法作图、求解析式',
    '三角函数的单调性、最值与周期',
    '解三角不等式与三角方程',
    '与向量、解三角形、导数的综合'
  ]
});
