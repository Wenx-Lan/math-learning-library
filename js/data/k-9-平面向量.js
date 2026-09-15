/*!
 * k-9-平面向量.js —— 第 9 章「平面向量」基础知识
 */
DSHData.registerKnowledge({
  id: 9,
  name: '平面向量',
  group: '必修二 · 向量',
  brief: '向量是“带方向的量”，它既有大小又有方向，因而可以自由平移；向量既能像数一样作加减与数乘运算，又能通过坐标与数量积转化为代数计算，是沟通几何与代数的桥梁。',

  sections: [
    {
      title: '一、向量的基本概念与线性运算',
      tag: '概念',
      html: '<p><b>向量</b>是既有大小又有方向的量，用带箭头的线段表示，线段长度表示大小（模），箭头方向表示方向。向量 \\(\\vec a\\) 的模记作 \\(|\\vec a|\\)。只有大小没有方向的量叫数量。</p>' +
        '<p>几个必须分清的概念：</p>' +
        '<ul>' +
        '<li><b>零向量：</b>长度为 0 的向量，记作 \\(\\vec 0\\)，它的方向是任意的，规定 \\(\\vec 0\\) 与任何向量平行。</li>' +
        '<li><b>单位向量：</b>长度等于 1 的向量。与 \\(\\vec a\\)（\\(\\vec a\\ne\\vec 0\\)）同方向的单位向量是 \\(\\frac{\\vec a}{|\\vec a|}\\)。</li>' +
        '<li><b>相等向量：</b>长度相等且方向相同的向量。向量可以自由平移，因此相等向量不一定重合。</li>' +
        '<li><b>共线向量（平行向量）：</b>方向相同或相反的向量，记作 \\(\\vec a\\parallel\\vec b\\)。规定 \\(\\vec 0\\) 与任何向量共线。</li>' +
        '</ul>' +
        '<p><b>线性运算</b>有三条：</p>' +
        '<ul>' +
        '<li><b>加法：</b>三角形法则（首尾相接）与平行四边形法则（同起点作邻边）。满足交换律 \\(\\vec a+\\vec b=\\vec b+\\vec a\\) 与结合律 \\((\\vec a+\\vec b)+\\vec c=\\vec a+(\\vec b+\\vec c)\\)。</li>' +
        '<li><b>减法：</b>\\(\\vec a-\\vec b=\\vec a+(-\\vec b)\\)，几何上 \\(\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}\\)，即“终点减起点”。</li>' +
        '<li><b>数乘：</b>\\(\\lambda\\vec a\\) 仍是一个向量。当 \\(\\lambda>0\\) 时与 \\(\\vec a\\) 同向，\\(\\lambda&lt;0\\) 时反向，\\(\\lambda=0\\) 时为零向量；且 \\(|\\lambda\\vec a|=|\\lambda||\\vec a|\\)。</li>' +
        '</ul>' +
        '<p>共线向量定理：向量 \\(\\vec b\\) 与非零向量 \\(\\vec a\\) 共线，当且仅当存在唯一实数 \\(\\lambda\\)，使 \\(\\vec b=\\lambda\\vec a\\)。这条定理是把“平行”翻译成“成比例”的关键。</p>' 
},
    {
      title: '二、平面向量基本定理与坐标表示',
      tag: '概念',
      html: '<p><b>平面向量基本定理：</b>如果 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 是同一平面内两个不共线的向量，那么对该平面内任一向量 \\(\\vec a\\)，存在唯一的一对实数 \\(\\lambda_{1}\\)、\\(\\lambda_{2}\\)，使</p>' +
        '\\[\\vec a=\\lambda_{1}\\vec e_{1}+\\lambda_{2}\\vec e_{2}.\\]' +
        '<p>这时称 \\(\\vec e_{1}\\)、\\(\\vec e_{2}\\) 为这一平面内所有向量的一个<strong>基底</strong>，\\(\\lambda_{1}\\vec e_{1}+\\lambda_{2}\\vec e_{2}\\) 叫向量的分解式。基底不唯一，但不共线是必要条件；取定基底后，任一向量的分解式是唯一的。</p>' +
        '<p><b>坐标表示：</b>在平面直角坐标系中，取与 \\(x\\) 轴、\\(y\\) 轴正方向相同的单位向量 \\(\\vec i\\)、\\(\\vec j\\) 作为基底。设点 \\(A(x,y)\\)，则</p>' +
        '\\[\\overrightarrow{OA}=x\\vec i+y\\vec j,\\]' +
        '<p>把 \\((x,y)\\) 叫做向量 \\(\\overrightarrow{OA}\\) 的坐标，记作 \\(\\overrightarrow{OA}=(x,y)\\)。可见“点的坐标”与“以原点为起点的向量的坐标”是一回事。</p>' +
        '<p>设 \\(\\vec a=(x_{1},y_{1})\\)，\\(\\vec b=(x_{2},y_{2})\\)，\\(\\lambda\\in\\text{R}\\)，\\(A(x_{1},y_{1})\\)，\\(B(x_{2},y_{2})\\)，则</p>' +
        '<ul>' +
        '<li>\\(\\vec a+\\vec b=(x_{1}+x_{2},\\ y_{1}+y_{2})\\)，\\(\\vec a-\\vec b=(x_{1}-x_{2},\\ y_{1}-y_{2})\\)；</li>' +
        '<li>\\(\\lambda\\vec a=(\\lambda x_{1},\\ \\lambda y_{1})\\)；</li>' +
        '<li>\\(\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}=(x_{2}-x_{1},\\ y_{2}-y_{1})\\)，即“终点坐标减起点坐标”。</li>' +
        '</ul>' +
        '<p>因此向量运算可以完全“代数化”：几何中的平移、共线、长度问题都能化为坐标的加减乘除。</p>' 
},
    {
      title: '三、数量积及其坐标运算',
      tag: '公式',
      html: '<p>已知两个非零向量 \\(\\vec a\\) 与 \\(\\vec b\\)，它们的夹角为 \\(\\theta\\)（\\(\\theta\\in[0,\\pi]\\)），则把数量</p>' +
        '\\[\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\]' +
        '<p>叫做 \\(\\vec a\\) 与 \\(\\vec b\\) 的<strong>数量积</strong>（内积）。注意数量积的结果是一个<strong>实数</strong>，不是向量。</p>' +
        '<p>由定义可直接得到几条常用结论：</p>' +
        '<ul>' +
        '<li>\\(\\vec a\\perp\\vec b\\iff \\vec a\\cdot\\vec b=0\\)（\\(\\vec a\\)、\\(\\vec b\\) 非零）；</li>' +
        '<li>\\(\\vec a\\cdot\\vec a=\\vec a^{2}=|\\vec a|^{2}\\)，即 \\(|\\vec a|=\\sqrt{\\vec a\\cdot\\vec a}\\)；</li>' +
        '<li>\\(\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}\\)；</li>' +
        '<li>\\(|\\vec a\\cdot\\vec b|\\le|\\vec a||\\vec b|\\)，等号成立当且仅当两向量共线。</li>' +
        '</ul>' +
        '<p><b>坐标表示：</b>设 \\(\\vec a=(x_{1},y_{1})\\)，\\(\\vec b=(x_{2},y_{2})\\)，则</p>' +
        '\\[\\vec a\\cdot\\vec b=x_{1}x_{2}+y_{1}y_{2}.\\]' +
        '<p>由此得到三条最重要的坐标判定式：</p>' +
        '<ul>' +
        '<li><b>垂直：</b>\\(\\vec a\\perp\\vec b\\iff x_{1}x_{2}+y_{1}y_{2}=0\\)；</li>' +
        '<li><b>平行：</b>\\(\\vec a\\parallel\\vec b\\iff x_{1}y_{2}-x_{2}y_{1}=0\\)（\\(\\vec a\\)、\\(\\vec b\\) 非零）；</li>' +
        '<li><b>模与夹角：</b>\\(|\\vec a|=\\sqrt{x_{1}^{2}+y_{1}^{2}}\\)，\\(\\cos\\theta=\\frac{x_{1}x_{2}+y_{1}y_{2}}{\\sqrt{x_{1}^{2}+y_{1}^{2}}\\sqrt{x_{2}^{2}+y_{2}^{2}}}\\)。</li>' +
        '</ul>' +
        '<p>数量积还满足下列运算律：\\(\\vec a\\cdot\\vec b=\\vec b\\cdot\\vec a\\)，\\((\\lambda\\vec a)\\cdot\\vec b=\\lambda(\\vec a\\cdot\\vec b)\\)，\\((\\vec a+\\vec b)\\cdot\\vec c=\\vec a\\cdot\\vec c+\\vec b\\cdot\\vec c\\)。但要注意它<strong>不满足结合律</strong>：\\((\\vec a\\cdot\\vec b)\\vec c\\) 与 \\(\\vec a(\\vec b\\cdot\\vec c)\\) 一般是不同的向量。</p>' 
},
    {
      title: '四、投影、模与夹角的几何意义',
      tag: '方法',
      html: '<p><b>投影向量：</b>把 \\(\\vec b\\) 投影到 \\(\\vec a\\) 所在直线上，得到的有向线段是<strong>投影向量</strong>。因为 \\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\)，所以</p>' +
        '\\[\\frac{\\vec a\\cdot\\vec b}{|\\vec a|}=|\\vec b|\\cos\\theta\\]' +
        '<p>恰好是 \\(\\vec b\\) 在 \\(\\vec a\\) 方向上的<strong>投影数量</strong>。当 \\(\\theta\\) 为锐角时为正，为钝角时为负，\\(\\theta=90^{\\circ}\\) 时为 0，这正是“数量积可正可负”的几何解释。</p>' +
        '<p><b>模的常用变形：</b>由 \\(|\\vec a\\pm\\vec b|^{2}=|\\vec a|^{2}\\pm2\\vec a\\cdot\\vec b+|\\vec b|^{2}\\)，可以在已知模与数量积时求 \\(|\\vec a\\pm\\vec b|\\)，反过来也可以由模求数量积：</p>' +
        '\\[\\vec a\\cdot\\vec b=\\frac{|\\vec a+\\vec b|^{2}-|\\vec a-\\vec b|^{2}}{4}.\\]' +
        '<p><b>夹角：</b>由 \\(\\cos\\theta=\\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}\\) 求出的夹角满足 \\(\\theta\\in[0,\\pi]\\)；若两向量同向则 \\(\\cos\\theta=1\\)，反向则 \\(\\cos\\theta=-1\\)，垂直则 \\(\\cos\\theta=0\\)。</p>' +
        '<p><b>与三角形、四心的联系：</b></p>' +
        '<ul>' +
        '<li>三点共线：\\(A\\)、\\(B\\)、\\(C\\) 共线 \\(\\iff\\overrightarrow{AC}=\\lambda\\overrightarrow{AB}\\)；若 \\(\\overrightarrow{OC}=x\\overrightarrow{OA}+y\\overrightarrow{OB}\\) 且 \\(x+y=1\\)，则 \\(A\\)、\\(B\\)、\\(C\\) 共线。</li>' +
        '<li>中线长公式：\\(AD\\) 为 \\(\\triangle ABC\\) 的中线时，\\(|\\overrightarrow{AD}|^{2}=\\frac{|\\overrightarrow{AB}|^{2}+|\\overrightarrow{AC}|^{2}}{2}-\\frac{|\\overrightarrow{BC}|^{2}}{4}\\)。</li>' +
        '<li>重心：\\(G\\) 为重心 \\(\\iff\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=\\vec 0\\)；垂心：\\(\\overrightarrow{HA}\\cdot\\overrightarrow{HB}=\\overrightarrow{HB}\\cdot\\overrightarrow{HC}=\\overrightarrow{HC}\\cdot\\overrightarrow{HA}\\)。</li>' +
        '</ul>' 
}
  ],

  proofs: [
    {
      title: '数量积的坐标表示与余弦定理的一致性',
      claim: '证明目标：由坐标定义得到的 \\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\) 与 \\(\\vec a\\cdot\\vec b=x_{1}x_{2}+y_{1}y_{2}\\) 相互吻合，并由此推出余弦定理。',
      steps: [
        '在平面直角坐标系中取 \\(\\vec a=\\overrightarrow{OA}=(x_{1},y_{1})\\)，\\(\\vec b=\\overrightarrow{OB}=(x_{2},y_{2})\\)，则 \\(\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}=(x_{2}-x_{1},\\ y_{2}-y_{1})\\)。',
        '由勾股定理，\\(|\\overrightarrow{AB}|^{2}=(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}=x_{1}^{2}+y_{1}^{2}+x_{2}^{2}+y_{2}^{2}-2(x_{1}x_{2}+y_{1}y_{2})\\)。',
        '记 \\(|\\vec a|^{2}=x_{1}^{2}+y_{1}^{2}\\)，\\(|\\vec b|^{2}=x_{2}^{2}+y_{2}^{2}\\)，并把 \\(x_{1}x_{2}+y_{1}y_{2}\\) 记作 \\(\\vec a\\cdot\\vec b\\)，上式即 \\(|\\overrightarrow{AB}|^{2}=|\\vec a|^{2}+|\\vec b|^{2}-2\\vec a\\cdot\\vec b\\)。',
        '另一方面，在 \\(\\triangle OAB\\) 中设 \\(\\angle AOB=\\theta\\)，由余弦定理 \\(|\\overrightarrow{AB}|^{2}=|\\vec a|^{2}+|\\vec b|^{2}-2|\\vec a||\\vec b|\\cos\\theta\\)。',
        '两式比较得 \\(\\vec a\\cdot\\vec b=|\\vec a||\\vec b|\\cos\\theta\\)，这说明坐标形式的数量积与几何定义完全一致——两种定义可以互相推导，而不是彼此独立的规定。',
        '把 \\(\\overrightarrow{AB}\\) 换成一般的边：在 \\(\\triangle ABC\\) 中，\\(\\overrightarrow{BC}=\\overrightarrow{AC}-\\overrightarrow{AB}\\)，对上式两边平方得 \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\)，这正是余弦定理。'
      ],
      note: '这一推导说明：向量数量积把“余弦定理”与“坐标运算”统一起来了。解题时若遇到难以直接处理的角度或长度关系，转化为数量积往往能简化运算。'
    },
    {
      title: '三点共线的向量判定',
      claim: '证明目标：对平面内三点 \\(A\\)、\\(B\\)、\\(C\\)，\\(A\\)、\\(B\\)、\\(C\\) 共线 \\(\\iff\\) 存在实数 \\(\\lambda\\) 使 \\(\\overrightarrow{AC}=\\lambda\\overrightarrow{AB}\\)；等价地，若 \\(\\overrightarrow{OC}=x\\overrightarrow{OA}+y\\overrightarrow{OB}\\)，则共线 \\(\\iff x+y=1\\)。',
      steps: [
        '<b>先证第一个等价：</b>若 \\(A\\)、\\(B\\)、\\(C\\) 共线，则向量 \\(\\overrightarrow{AC}\\) 与 \\(\\overrightarrow{AB}\\) 的方向相同或相反（\\(A\\ne B\\)），由共线向量定理，存在实数 \\(\\lambda\\) 使 \\(\\overrightarrow{AC}=\\lambda\\overrightarrow{AB}\\)。',
        '反过来，若 \\(\\overrightarrow{AC}=\\lambda\\overrightarrow{AB}\\)，则两个向量有公共点 \\(A\\) 且所在直线重合（共线向量所在直线平行或重合，此处共点），故 \\(A\\)、\\(B\\)、\\(C\\) 三点共线。',
        '<b>再证第二个等价：</b>设 \\(\\overrightarrow{OC}=x\\overrightarrow{OA}+y\\overrightarrow{OB}\\)，则 \\(\\overrightarrow{AC}=\\overrightarrow{OC}-\\overrightarrow{OA}=(x-1)\\overrightarrow{OA}+y\\overrightarrow{OB}\\)，\\(\\overrightarrow{AB}=\\overrightarrow{OB}-\\overrightarrow{OA}\\)。',
        '由第一个等价，共线等价于存在 \\(\\lambda\\) 使 \\((x-1)\\overrightarrow{OA}+y\\overrightarrow{OB}=\\lambda(\\overrightarrow{OB}-\\overrightarrow{OA})\\)，即 \\((x-1+\\lambda)\\overrightarrow{OA}+(y-\\lambda)\\overrightarrow{OB}=\\vec 0\\)。',
        '因为 \\(\\overrightarrow{OA}\\) 与 \\(\\overrightarrow{OB}\\) 不共线（\\(O\\)、\\(A\\)、\\(B\\) 不共线），由平面向量基本定理知表示式唯一，故 \\(x-1+\\lambda=0\\) 且 \\(y-\\lambda=0\\)。',
        '两式相加消去 \\(\\lambda\\)，得 \\(x+y-1=0\\)，即 \\(x+y=1\\)。反之 \\(x+y=1\\) 时取 \\(\\lambda=y\\) 即可验证共线成立。'
      ],
      note: '特别地，当 \\(x+y=1\\) 且 \\(x>0\\)、\\(y>0\\) 时，点 \\(C\\) 在线段 \\(AB\\) 上；若 \\(x=\\frac12\\)、\\(y=\\frac12\\)，则 \\(C\\) 是 \\(AB\\) 的中点，此时 \\(\\overrightarrow{OC}=\\frac12\\left(\\overrightarrow{OA}+\\overrightarrow{OB}\\right)\\)。'
    },
    {
      title: '极化恒等式与中线长公式',
      claim: '证明目标：证明 \\(\\vec a\\cdot\\vec b=\\frac{|\\vec a+\\vec b|^{2}-|\\vec a-\\vec b|^{2}}{4}\\)，并由此推出中线长公式 \\(|\\overrightarrow{AD}|^{2}=\\frac{|\\overrightarrow{AB}|^{2}+|\\overrightarrow{AC}|^{2}}{2}-\\frac{|\\overrightarrow{BC}|^{2}}{4}\\)。',
      steps: [
        '由模的平方公式展开：\\(|\\vec a+\\vec b|^{2}=|\\vec a|^{2}+2\\vec a\\cdot\\vec b+|\\vec b|^{2}\\)。',
        '同理 \\(|\\vec a-\\vec b|^{2}=|\\vec a|^{2}-2\\vec a\\cdot\\vec b+|\\vec b|^{2}\\)。',
        '两式相减，右边的 \\(|\\vec a|^{2}\\) 与 \\(|\\vec b|^{2}\\) 抵消，得 \\(|\\vec a+\\vec b|^{2}-|\\vec a-\\vec b|^{2}=4\\vec a\\cdot\\vec b\\)，即 \\(\\vec a\\cdot\\vec b=\\frac{|\\vec a+\\vec b|^{2}-|\\vec a-\\vec b|^{2}}{4}\\)。这就是极化恒等式，它把数量积用“和与差的模”表示出来。',
        '在 \\(\\triangle ABC\\) 中，设 \\(D\\) 为 \\(BC\\) 的中点，则 \\(\\overrightarrow{AD}=\\frac12\\left(\\overrightarrow{AB}+\\overrightarrow{AC}\\right)\\)，且 \\(\\overrightarrow{BC}=\\overrightarrow{AC}-\\overrightarrow{AB}\\)。',
        '由第一个式子两边平方：\\(|\\overrightarrow{AD}|^{2}=\\frac14|\\overrightarrow{AB}+\\overrightarrow{AC}|^{2}=\\frac14\\left(|\\overrightarrow{AB}|^{2}+2\\overrightarrow{AB}\\cdot\\overrightarrow{AC}+|\\overrightarrow{AC}|^{2}\\right)\\)。',
        '又 \\(|\\overrightarrow{BC}|^{2}=|\\overrightarrow{AC}-\\overrightarrow{AB}|^{2}=|\\overrightarrow{AB}|^{2}-2\\overrightarrow{AB}\\cdot\\overrightarrow{AC}+|\\overrightarrow{AC}|^{2}\\)，两式相加得 \\(4|\\overrightarrow{AD}|^{2}+|\\overrightarrow{BC}|^{2}=2\\left(|\\overrightarrow{AB}|^{2}+|\\overrightarrow{AC}|^{2}\\right)\\)。',
        '整理即得 \\(|\\overrightarrow{AD}|^{2}=\\frac{|\\overrightarrow{AB}|^{2}+|\\overrightarrow{AC}|^{2}}{2}-\\frac{|\\overrightarrow{BC}|^{2}}{4}\\)。'
      ],
      note: '极化恒等式还有一个常用的几何解释：\\(\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=|\\overrightarrow{PM}|^{2}-\\frac14|\\overrightarrow{AB}|^{2}\\)，其中 \\(M\\) 是 \\(AB\\) 的中点。处理“动点到两定点向量数量积”的问题时，它是把双变量化为单变量的利器。'
    }
  ],


  types: [
    '向量的线性运算与坐标运算',
    '求模、夹角与数量积',
    '平行与垂直的判定及参数求解',
    '基底表示与三点共线',
    '向量与三角形四心',
    '向量最值与范围问题'
  ]
});
