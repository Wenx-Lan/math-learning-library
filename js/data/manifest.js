/*!
 * manifest.js —— 章节目录与数据文件清单
 * 本文件必须在 app.js 之前加载，因此在这里先建立全局注册中心 DSHData。
 * key 为章节序号；slug 用于拼装文件名。
 */
(function (root) {
  'use strict';
  var DSHData = root.DSHData || (root.DSHData = {
    knowledge: {},
    types: {},
    order: [],
    index: {},
    files: {},
    registered: { knowledge: {}, types: {} },
    registerKnowledge: function (d) {
      if (!d || d.id == null) { return false; }
      if (this.registered.knowledge[d.id]) {
        if (root.console) { console.warn('[DSHData] 基础知识第 ' + d.id + ' 章重复注册，已忽略'); }
        return false;
      }
      this.registered.knowledge[d.id] = true;
      this.knowledge[d.id] = d;
      if (this.order.indexOf(d.id) < 0) { this.order.push(d.id); }
      return true;
    },
    registerTypes: function (d) {
      if (!d || d.id == null) { return false; }
      if (this.registered.types[d.id]) {
        if (root.console) { console.warn('[DSHData] 题型第 ' + d.id + ' 章重复注册，已忽略'); }
        return false;
      }
      this.registered.types[d.id] = true;
      this.types[d.id] = d;
      if (this.order.indexOf(d.id) < 0) { this.order.push(d.id); }
      return true;
    },
    setManifest: function (m) { this.files = m || {}; }
  });

  DSHData.setManifest({
  '1': { slug: '集合' },
  '2': { slug: '一元二次不等式' },
  '3': { slug: '基本不等式' },
  '4': { slug: '函数性质' },
  '5': { slug: '幂函数' },
  '6': { slug: '指数及指数函数' },
  '7': { slug: '对数及对数函数' },
  '8': { slug: '三角函数' },
  '9': { slug: '平面向量' },
  '10': { slug: '解三角形' },
  '11': { slug: '空间向量' },
  '12': { slug: '立体几何' },
  '13': { slug: '概率' },
  '14': { slug: '排列组合' },
  '15': { slug: '统计' },
  '16': { slug: '直线与圆' },
  '17': { slug: '解析几何' },
  '18': { slug: '导数' },
  '19': { slug: '数列' }
});

DSHData.index = {
  '1': { name: '集合', group: '必修一 · 集合与逻辑', slug: '集合', brief: '集合语言是高中数学的通用语言，理清元素、关系与运算，才能读懂后面所有内容。' },
  '2': { name: '一元二次不等式', group: '必修一 · 不等式', slug: '一元二次不等式', brief: '把不等式解集“翻译”成二次函数图像上满足条件的那一段 x。' },
  '3': { name: '基本不等式', group: '必修一 · 不等式', slug: '基本不等式', brief: '和与积的互为约束：一正、二定、三相等，缺一不可。' },
  '4': { name: '函数性质', group: '必修一 · 函数', slug: '函数性质', brief: '定义域、值域、单调性、奇偶性、周期性、对称性构成函数研究的六大抓手。' },
  '5': { name: '幂函数', group: '必修一 · 函数', slug: '幂函数', brief: '指数 α 决定幂函数图像形态，抓住公共点 (1,1) 与单调性即可辨识。' },
  '6': { name: '指数及指数函数', group: '必修一 · 函数', slug: '指数及指数函数', brief: '指数函数刻画“按倍数增长”，底数 a 以 1 为界分增减。' },
  '7': { name: '对数及对数函数', group: '必修一 · 函数', slug: '对数及对数函数', brief: '对数是指数的逆运算，把乘法结构转为加法结构。' },
  '8': { name: '三角函数', group: '必修二 · 三角', slug: '三角函数', brief: '单位圆是三角函数的“根”，诱导公式与和差角公式都由它生长出来。' },
  '9': { name: '平面向量', group: '必修二 · 向量', slug: '平面向量', brief: '向量兼具几何与代数双重身份，数量积沟通长度与夹角。' },
  '10': { name: '解三角形', group: '必修二 · 三角', slug: '解三角形', brief: '正弦定理管“边角对应”，余弦定理管“三边一角”。' },
  '11': { name: '空间向量', group: '选择性必修 · 立体几何', slug: '空间向量', brief: '把立体几何的角与距离问题统一为坐标与法向量的计算。' },
  '12': { name: '立体几何', group: '必修二 · 立体几何', slug: '立体几何', brief: '从“看图形”到“证关系”，平行与垂直的判定与性质是主线。' },
  '13': { name: '概率', group: '选择性必修 · 概率统计', slug: '概率', brief: '样本空间是分母，事件是分子的集合，条件概率是缩小样本空间。' },
  '14': { name: '排列组合', group: '选择性必修 · 概率统计', slug: '排列组合', brief: '计数两原理：分类用加法，分步用乘法；有序排列、无序组合。' },
  '15': { name: '统计', group: '选择性必修 · 概率统计', slug: '统计', brief: '用样本估计总体：图、数字特征、回归与独立性检验。' },
  '16': { name: '直线与圆', group: '选择性必修 · 解析几何', slug: '直线与圆', brief: '用方程研究图形：距离公式是判定位置关系的统一工具。' },
  '17': { name: '解析几何', group: '选择性必修 · 解析几何', slug: '解析几何', brief: '圆锥曲线的定义、方程、几何性质，与直线联立后用韦达定理处理。' },
  '18': { name: '导数', group: '选择性必修 · 导数', slug: '导数', brief: '导数是瞬时变化率，也是切线斜率，更是研究单调性的工具。' },
  '19': { name: '数列', group: '选择性必修 · 数列', slug: '数列', brief: '数列是一种特殊的函数：等差、等比两类基本数列提供通项与前 n 项和的整套公式，递推求通项、求和、数学归纳法是本章三大方法。' }
  };

  DSHData.order = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

  DSHData.stats = { types: 100, questions: 365, examples: 159 };

})(typeof window !== 'undefined' ? window : globalThis);
