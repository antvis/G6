---
title: 总则
order: 0
redirect_from:
  - /zh/docs/design
---

## 引言
在「科学与复杂性」一文中，科学家 Warren Weaver 按学界面临问题的复杂性，将现代科学史划分为「简单问题、无序复杂问题、有序复杂问题」3 个阶段。20 世纪中叶之后，学界开始面临更多不稳定性、非线性和多元性的有序复杂问题，业界急需一种基于网络模型的分析探索工具，和思考方式。后来，以 柯尼斯堡七桥问题 基于图的拓扑结构被解决为起始点，图可视分析在越来越多的领域发挥作用，在互联网行业，随着大数据与 AI 技术发展，越来越多的业务场景用上了图可视分析，如社区结构分析、聚类、消息传播、节点分类、链接预测、图表示学习、图神经网络、网络演化等。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*W7bRT7fewBkAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

> 《Science of Complexity》 - Warren Weaver  1948


这些形形色色的图可视分析产品，对设计的需求越来越旺盛。设计在这一领域又能做什么？该如何设计一个复杂的图可视分析产品？图可视化的视觉和交互设计又有哪些值得注意和思考的点？AntV 设计小组把我们在这一领域的思考和沉淀总结成「G6 图可视化设计体系」，希望能给更多设计师在这一陌生的设计领域带来更多思考和帮助。

## 简介
### 常见应用场景
在阿里、蚂蚁集团，图可视分析广泛应用于云安全、知识图谱、企业风控、图数据库等不同的业务场景。抽象来看基本上有两种类型：

- 对现状的记录、阐明、揭示：如对机房安全，流量监控等现状的监控；
- 对现状的扩展、抽象（对未来的预测）：如基于人工智能的各类技术，对于图的预测和实时防控。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NkEwRYehsh4AAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

### 图的种类
关系图种类划分，无论业界还是学界目前都没有一个统一的定论。基于 AntV 自身的业务，我们总结归纳出几种常见图的类型：关系图、流程图、DAG 图、血缘图、ER 图、树状图。每种图都有其自身的使用场景以及设计时需要考量的点。我们从图的基本介绍、特点、适用业务场景、设计指引几个方面提供了详细的介绍。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8_PvSI5pMKgAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

[查看图的种类详细介绍和设计指引  >](/zh/docs/design/global/style)

## 设计对象
设计师在面对一个关系图设计需求时，不仅需要设计一张图「看上去」如何，更需要考虑体验设计五要素的每一层。从了解业务和产品目标出发，洞察用户需求，同产品经理一起定义图分析产品的功能边界，再基于用户场景去构建产品的任务流程，信息框架和界面布局，最终再去打磨产品界面以及最重要的图本身的视觉和微交互设计。

| 名称 | 描述 |
|  ----  | ----  |
| 表现层 | 视觉感知层：产品基础界面和图本身节点和边的视觉设计 |
| 框架层 | 界面布局：如画布、各类组件的布局关系和使用逻辑 |
| 结构层 | 流程、信息架构：确定产品中多个图分析模式如何整合为一体，各种功能的模块组合，信息框架的构建 |
| 范围层 | 功能/内容需求：定义产品图分析功能和呈现内容的边界 |
| 战略层 | 用户需求，业务目标，产品目标 |

### 通用流程
从图分析的角度来看一个图分析产品通常会历经如下几个阶段，以将数据源转化为对用户有价值的信息。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pu-0QIeE2rYAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

> 引用自《图分析与可视化》

### 常见图分析模式
> 对应「五要素」中的范围层


按图产品探索分析场景的特性，我们将图分析产品的分析模式为**有明确目的**、**无明确目的**和**特殊场景**三种。不同的分析模式界面会有所不同，用户的使用流程也会有所差异。诚然，一个功能完备的图分析产品，3 种分析模式可能会同时具备，从而导致界面复杂度成倍的提升。需要设计师能够抽丝剥茧，知其所以然，理清楚每一种模式各自特点之后，再结合实际的用户场景，全盘考虑产品设计方案。

#### 有明确目的
这类分析模式是有明确的分析或查询条件，这个条件的呈现形式可能是一个规则表达式，一段 Gremlin 或 GQL 的查询语句，或明确的起点和终点，甚至是直接查看某个节点或某条边的具体信息。常见的模式有：规则查询、Gremlin 查询、关联分析、筛选/搜索画布、查看详情等。这类模式下，通常需要通过搜索或在各种类型的输入面板中，输入查询语句、规则等明确的条件信息，来进行探查和分析。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Pnt6R6i3SeQAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

#### 无明确目的
无明确目的地探索是指基于已有数据内容，进行关系的 N 度扩展、下钻分析、子图探索、撤销回退等操作，来挖掘数据中的特性，发现价值或机会点的分析过程。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cnNpSJmXD7sAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

#### 特殊场景

**内置了 AI 算法能力的分析场景**

这类分析场景通常需要借助内置的算法或规则推理能力来实现，从海量数据中快捷的挖掘出符合特定规则的目标节点和关系，常见的有：担保圈、实控人、最短路径等。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cnNpSJmXD7sAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

**结合时间或地理信息的场景**

在源数据中含有时间和地理维度的内容时，会出现结合时间或地理信息的分析场景。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WCYRT4rG8IYAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

### 常见组件
> 对应「五要素」中的框架层

点和边的基础样式是所有图可视化的基石，要组成一个完整的图分析产品，还需要有各类组件来承担不同的功能。从体验设计的角度来看，常见的组件可分为如下几种类型：

- 基础组件：图例、工具栏、右键菜单、视图控制栏、系统日志等；
- 条件输入：查询、筛选、搜索、画布设置等；
- 信息输出：详情面板、气泡、Tooltip、画板信息等；
- 高级功能：时间轴、快照画廊、分析报表等。

[查看 AntV 内置的各类组件 >](/zh/docs/design/component/componentOverview)

<a href=''></a>


在某些特殊场景下，也需要结合业务实际情况基于基础组件去升级优化，乃至基于产品独有的能力去设计全新的组件。在优化一个基础组件或设计全新的组件时，需要结合实际的功能需求，从使用场景、构成元素、常见类型、交互说明等几个角度完整的思考清楚。以 AntV 最新设计的两个组件为例：

- [时间轴 TimeBar](/zh/docs/design/component/timebar)
- [视图控制栏 View ToolBar](/zh/docs/design/component/viewToolbar)

### 交互设计
一个完整的交互设计行为通常由触发器、规则和反馈组成。在图分析产品常见交互行为中，触发器通常是常见的鼠标、键盘、触控板；规则通常有节点双击时展开，单击时高亮等常见通用规则；而反馈则是各个交互的操作对象根据不同的「规则」所呈现出来的行为或样式表达，通常以各类视觉属性变化的形式出现。

[查看图交互设计指引 >](/zh/docs/design/global/interactive)

#### 通用交互 & 扩展交互
按照交互事件是否全局或跨产品通用，将 G6 以及 Graphin 中的交互分为「通用」和「扩展」两类：

- 通用交互，剥离业务属性，是一套适应大部分关系图交互探索的基础工具箱，并将范围圈定在了基础键鼠操作内，令普通电脑用户也能迅速地利用其对数据进行探索；
- 扩展交互，不一定适应所有的应用场景与业务属性，但承载了 G6 强大的扩展性与能力，其范围不受限制，既可以是普通的交互行为触发，也能被其他事件触发，亦或由实时的业务数据触发等，用户能通过这些交互对数据进行更深度更定制化的探索。

#### 操作对象
「交互」能使用户从被动的「看客」成为主动的「探索分析者」，更好地参与对数据的理解和分析的过程。可视分析产品的目的也不仅是向用户传递定制好的知识，而是提供一个工具来帮助用户在海量数据中进行探索分析，并最终得到想要的结论。 一个完整地图分析产品必定是由诸多的基础交互事件按照不同的目的和使用场景组合在一起的，为了将各类复杂的交互事件抽丝剥茧，交互事件的操作对象通常有：画布、节点、Combo、边和其他。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sgEhQJZK1VsAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

### 视觉设计
> 对应「五要素」中的表现层

抛开图分析产品本身产品界面，**关系图的视觉设计本质上是把视觉属性和数据特性建立映射关系，形成特定的语义关联的过程**。好的视觉设计，能极大的提高关系图的信息传达效率，降低用户的认知成本。图最核心的元素就是点、边、以及点边上的文字标签，在考虑图的视觉设计时，需要将这些元素的组成元素拆解来看，单独设计，并全局考虑不同交互事件，数据属性和业务场景下的视觉展示需要和视觉属性的映射关系，以及不同元素的视觉属性整合到一起时的视觉表达。在可视化设计中常见的视觉属性有：形状、颜色、大小、方向、材质、明度，位置等。以最基础的形状和颜色的设计为引入进行详细介绍。

[查看视觉设计指引 >](/zh/docs/design/global/style)

#### 形状
关系图的节点可根据业务实际场景需要，为表达特定的某类信息，可将节点定制为特殊样式，或将节点与常见的二维图表（如：环形图，玫瑰图等）结合，以展示更多信息，甚至在需要突出强调表达某种业务独有的属性和特点时，可尝试用 3D 图形来表达。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6qBAS7RGhqYAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

无论节点还是边，在设计时，都需要考虑在不同鼠标事件的情况下的视觉表现：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*QyikQKVGtTgAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fIYATIKMK24AAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

#### 颜色
G6 在 AntV 的基础色彩体系的基础上，结合关系图表达的特点，精细化调整了颜色在数据维度上的衡量和线性感知。内置了一系列优美、和谐且满足无障碍设计原则的色板。包括：分类色板、邻近色板、发散色板、语义色板。默认情况下以蓝色为基础样式的案例色，也是 G6 的默认主色。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kcDySZJrRiEAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SMVEQIxHhLAAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

同时，我们还提供深、浅色两套主题样式，以满足不同的应用场景：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*epAwRJqUBf0AAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

#### 其他
完整的关系图可视化视觉设计，不是单纯的将不同的视觉属性机械地叠加在一起。通常情况下，一个图分析产品中的视觉设计需要考虑的信息维度有：鼠标事件、数据特性、业务语义。最复杂的情况下，3 个维度的信息都需要综合考虑，比如：下图案例中的「类型 B」在「满足条件 A」的情况下，也需要考虑各种鼠标事件情况下的视觉展示情况。诚然不是所有业务都会遇到如此复杂的情况，在具体的业务场景中可结合用户场景以及交互事件的三要素「触发器+规则+反馈」，来综合判断和决策最适当的视觉表达形式。

| 信息维度 | 释义 | 样式示例 |
|  ----  | ----  | ---- |
| 鼠标事件 | 常见的鼠标事件： Default、Active、Selected、Disable 等 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GDOeTabF9aIAAAAAAAAAAAAAARQnAQ' width='100' /> |
| 数据特性 | 图数据本身固有的特性，如节点或边的数据类型 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AbSmSIgAvogAAAAAAAAAAAAAARQnAQ' width='100' /> |
| 业务语义 | 符合某些规则的节点需要特殊样式强调高亮 | <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IbJaRqRNCVQAAAAAAAAAAAAAARQnAQ' width='100' /> |

## 设计指引
### 始于发问
每一个图产品项目都应该从要解决的问题出发，逐步导向深入的探索，设计一个完整的图分析产品其实就是不断解答探索图过程中遇到的问题的过程。换句话说，一个好的图分析场景的第一步就是「问对问题」。

### 切换视角
在不同的视角和布局下，关系图会表现出不一样的模式和行为，呈现出的内容重点也不尽相同。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hCnlSaLPlZUAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NsmQRppMa9MAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

### 管理细节
人一次性能接受到的信息量有限，考虑人对信息认知极限，克制地表达关系图中的细节信息，在合适的场景下表达适度的内容。建议遵循「渐进呈现」的原则，先概览，再放大过滤，最后看细节。常见的管理细节的方法有：

- 缩放：参考地图软件的缩放的效果，在不同的比例下呈现不同核心内容；
- 全局+细节：常见的形式有缩略图，在画布中查看细节内容时，同时能在缩略图中获取全局的信息；
- 焦点+背景：常见的形式有鱼眼、焦点聚焦等突出中心内容弱化周边节点的形式。

### 考虑时间
数据很少是静态的，某件事在某个时间点爆发或者持续间发生，关联的因子有多个，时间轴工具可以有效展示动态时序数据、分析图数据关联因子。G6 图可视化中已经提供了完整的「时间轴」组件。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PZ__RZQfaicAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

### 操作可逆
图分析产品往往是非常重交互的场景，通常用户会在画布执行连续分析的动作或通过一连串的分析行为才拿到有效的结果信息，为了确保用户不错过有效的信息以及防止错误的操作，如误删了某些节点或边或扩展了太多节点，产品中需要提供操作可逆的机制，能够允许用户回退或重复上一步操作。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9QsvSZM9M8AAAAAAAAAAAAAAARQnAQ' width='90%' alt='img' />

### 终于行动
图分析产品的最终目的是让用户得到想要的「答案」，获取到有价值的信息，并以这些信息为基础去执行下一步动作，常见的有：下载/分享分析结果、将分析规则发布为在线服务或沉淀为探索分析模板、或直接将分析结果作为完整生产链路中的一环输入给下游环节。一言以蔽之，一个体验良好的图分析产品，必定能从「发问」到「行动」形成完整的产品体验闭环。

## 参考
- [The Aesthetics of Graph Visualization - Chris Bennett, Jody Ryall, Leo Spalteholz and Amy Gooch1](https://www.researchgate.net/publication/220795329_The_Aesthetics_of_Graph_Visualization)
- [图分析与可视化_在关联数据中发现商业机会 - Richard Brath/David Jonker](https://book.douban.com/subject/26756024/)
- [Visual Complexity_Mapping Patterns of Information - Manuel Lima](https://book.douban.com/subject/25665238/)
- [AntV 图可视分析解决方案]()
- [数据可视化 - 陈为 / 沈则潜](https://book.douban.com/subject/25760272/)
