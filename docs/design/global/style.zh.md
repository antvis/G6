---
title: 全局样式
order: 0
redirect_from:
  - /zh/docs/design/global
---

## 图构成元素
图的构成元素包括节点（Node）、边（Edge）和组（Combo），这些基础元素是图的原子组成部分，设计者可根据特定业务场景变更节点、边、组的配色和组合形式，搭建更复杂的图可视分析应用。

### 节点（Node）

#### 定义
节点是构成图的基本单位，一般表示某个实体。如社交网络数据中，一个人就是一个实体，用一个节点来表示。

#### 常见形态
根据业务场景需要，信息可视化呈现时：

- 节点可加标签、可不加标签；
- 节点可存在不同形状；
- 节点可加简短描述；
- 节点可展开下级信息。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*alVuQb3ToGwAAAAAAAAAAAAAARQnAQ' width='100%'>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rx0oT6wgTAQAAAAAAAAAAAAAARQnAQ' width='100%'>

#### 交互样式
点交互基础样式有以下 6 种：
基础状态：Default-默认、Active-激活、Selected-选中、Disable-失效
被动状态：Highlight-强化、Inactive-弱化（在交互场景中与 Default-默认 做出区分）

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*R8m5RoGLcy8AAAAAAAAAAAAAARQnAQ' width='100%'>

> 以力导向图布局和辐射布局为例

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*85cVQrHHshkAAAAAAAAAAAAAARQnAQ' width='100%'>

### 边（Edge）
#### 定义
边（Edge）表示的是两个节点之间的关系。如社交网络数据中，我和你的关系，是朋友。

#### 常见形态
因图的类型众多，边的形态也相应有：

- 有向的（含箭头）、无向的（无箭头）；
- 加权的（含值）、无加权的（不含值）；
- 加标签、不加标签；
- 不同粗细代表节点流量。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-AluQ4fjOqIAAAAAAAAAAAAAARQnAQ' width='100%'>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PvfKRpTXkcIAAAAAAAAAAAAAARQnAQ' width='100%'>

#### 交互样式
边的交互基础样式跟节点同样有以下 6 种：Default、Active、Selected、Disable、Highlight、Inactive

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*g4VVR4ltADAAAAAAAAAAAAAAARQnAQ' width='100%'>

> 在节点的交互样式引用图例中同样可看到边的运用效果

### 组（Combo）
#### 定义
组合，又称为节点分组，用于管理一组相似的节点，如一组具有相同类型的节点，或位置上比较靠近的一组节点，可以将它们划分到同一个 Combo 中，可以有效降低视觉上的干扰。

#### 常见形态
G6 默认提供两种类型，使用带有不重叠约束的力导向图布局方法，可根据业务场景和布局需要选取合适的形状。

- Circle 圆形
- Rect 矩形

<img src='' width='100%'>

> 在 Combo 的具体运用中，会出现 Combo 未展开/已展开、一级 Combo 和二级 Combo 及更多级相结合的形式，上图仅为未展开、展开（共一级）、展开（共二级）形式

#### 交互样式
节点组合形式千变万化，按常见形态延伸相应的交互样式如下：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JACuQ4ogrWEAAAAAAAAAAAAAARQnAQ' width='100%'>

## 关系图色板
G6 在 AntV 的基础色彩体系的基础上，结合关系图表达的特点，精细化调整了颜色在数据维度上的衡量和线性感知。内置了一系列优美、和谐且满足无障碍设计原则的色板。包括：分类色板、邻近色板、发散色板、语义色板。默认情况下以蓝色为基础样式的案例色，也是 G6 的默认主色。

让颜色在图中能够达成在数据变化和人体感知上尽可能线性匹配，不同数值对应的颜色区分度要足够高，且在拥有分类色状态下依然感知均匀，一个连续数据集的所有数据点都具有同等的视觉重要性。

### 默认主题色
选择蓝色为基础样式的案例色，也是基础样式的默认色 /G6 的主色；灰色作为辅助色。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_TBXR5V3QHgAAAAAAAAAAAAAARQnAQ' width='100%'>

### 邻近色色板
#### 定义
邻近色顺序色板，一般使用两个或以上个临近色调，通过明度和饱和度的逐步渐变，常用来区分有序数据优先级的高低、连续数据的大小或梯度变化。

#### 取色指南
根据数据语义特定管理约束，选择合理色调搭配，使连续变化的色调和明度，可产生更多色彩分级，表达更多的连续数值。

#### 取色方法
1. 亮色色板选取单色顺序色板中的 1 号色作为起始色，相应临近色调 4 号色为中间色，以此类推，继中间色相应近色调 7 号色为结束色，借助色彩工具，在 CIELab 色彩空间下生成渐变色；
2. 暗色色板同理，起始色为 2 号色，中间色为相应邻近色调5号色，结束色为中间色邻近色调的8号色；
3. 保留未分段的色带，便于用户自由分段取数。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fuYUS7wn9AcAAAAAAAAAAAAAARQnAQ' width='100%'>

### 发散色色板
#### 定义
也称对比色渐变色板，一般是两种互补色（也可以是对比色）去展现数据从一个负向值到 0 点再到正向值的连续变化区间，显示相对立的两个值的大小关系。数据范围的两端同等强调中间值和极值，以表示断点(如零变化或平均值)周围与数据中特定有意义的中间值之间的差异。

#### 取色指南
关键断点应该采用中性颜色及与背景色对比度低，如浅灰色，端点应该采用和背景色对比度高的饱和颜色。一般来说是对称的，临界断点可以是平均值、中间值或零变化值。

#### 取色方法
1. 选取分类色板中的对比色或互补色，其中 7 号色起始色和结束色，4 号色为过渡色，灰阶色的 1 号色作为中间色，在 CIELab 色彩空间下生成渐变色；
2. 暗色色板同理，其中 8 号色起始色和结束色，5 号色为过渡色，灰阶色的 2 号色作为中间色；
3. 保留未分段的色带，便于用户自由分段取数。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Jlz9RopMyb4AAAAAAAAAAAAAARQnAQ' width='100%'>

### 语义色板
#### 定义
色彩在可视化中的使用，不仅是数据信息传递的可视化通道，同时也是更深一层的文化故事的载体，用于表达意义或情感。

#### 取色指南
重视用色习惯，遵循相关标准，色彩也不是都能寓意的，相当一部分图表色彩选择和感情因素无关，而是按照某种习惯来设定色彩，即所谓约定俗成，有的甚至形成来规范。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9w1lSZoX-iEAAAAAAAAAAAAAARQnAQ' width='100%'>
> 语义色板（部分）

更多色板介绍，详见 AntV 色板。

## 设计 Tips
### 节点（Node）
以圆形节点为例，根据点不同的信息展示形式，基础形状的大小有所不同，在图展示中需将图相关信息做最优展示。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ScDaRKLfuAQAAAAAAAAAAAAAARQnAQ' width='100%'>
> 圆形节点——文本置内型，节点直径大小建议为 60px，文本大小为 12px

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rJfORqHKyp0AAAAAAAAAAAAAARQnAQ' width='100%'>
> 圆形节点——文本非置内型，节点直径大小建议为 16px，文本大小为 12px

### 边（Edge）
边的粗细：边在点默认大小场景下默认为 1px，通常根据视图大小变化等比例放大缩小。为保持信息有效可视，边最小为 1px，最大值为 12px。

### 组（Combo）
Combo 的大小跟随内容，Node 与 Combo 之间的间隙最小为 Small = 8px。

### 色板使用
> 数据集：又称为资料集、数据集合或资料集合，是一种由数据所组成的集合。
> 连续数值：统计学概念,又称连续变量。指在一定区间内可以任意取值、数值是连续不断的、相邻两个数值可作无限分割(即可取无限个数值)的数据。
> 断点：文中主要指数据集的中心值或参考值，例如零变化或平均值。
> 端点：文中主要指数据集极端值，例如最大最小值。
> 语义：文中主要指色彩心理学中色彩在客观上对人们对一种刺激和象征，它在主观上又是一种反应和行为。包含从知觉、感情而到记忆、思想、意志、象征等与色彩的因果关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UDaLQIBexdAAAAAAAAAAAAAAARQnAQ' width='100%'>

当需要用颜色作为视觉通道时，数据性质可作为参考因素，选用色板的步骤大致如下图：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*R-PrQaygrgQAAAAAAAAAAAAAARQnAQ' width='100%'>
