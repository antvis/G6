---
title: 一般图场景案例
order: 0
---

## 一般图场景案例

一般图是指非树嵌套结构的、可能存在环路的数据结构展示的图。一般图与树图的区别详见 [一般图与树图介绍](/zh/docs/manual/middle/layout/graph-layout#简介)

### 图表决策

这是一个带交互的图表决策图，辅助用户“按使用目的”寻找合适的可视化方式。该 demo 结合了自定义节点、自定义边、力导向布局、数据切换、交互等功能，已应用在 AntV 官网。

### 聚类的折叠/扩展

使用 Fruchterman 布局实现交互式折叠/扩展聚类。尝试点击节点以折叠/扩展一个聚类。


### 圣诞推文可视化

该案例展示了圣诞夜与圣诞节网友们在 Tweeter 上发送的推文中，出现频率 top 100 的单词。可以通过拖拽、点击等交互，查看单词的上下文。

**”彩蛋“**：别人家的彩蛋是彩蛋，而我们的"彩蛋"是个课堂作业：

实现了该 demo 后，我们发现了一个小 Bug：由于 ’christmas‘ 的上下文节点众多，展开它后，在布局即将收敛时出现了疯狂的抖动鬼畜。欢迎在 <a href='https://github.com/antvis/G6' target='_blank'>GitHub</a> 上提 PR 修复它。

<br/>



### 美国航线边绑定

使用 G6 可视化美国航线图，使用边绑定工具降低视觉混乱。在大规模图上，使用边绑定可以降低视觉混乱，更清晰地展示图的整体走势、结构，突出航线频繁的城市，它们可能是重要的交通枢纽，并展示更多的统计信息，以便观察者进行分析。图中颜色映射航班的飞行方向（出发（橙红色）与降落（青色））。节点大小表示到达与离开该城市的航班总数量，每个节点使用了饼图展示达到（橙红色）和离开（青色）航班的比例。并增加 hover 的交互，使用 tooltip 展示每个城市的经纬度。


### 大规模图下钻式探索

<a className='description' href='https://github.com/antvis/G6/blob/master/packages/site/site/pages/largegraph.zh.tsx' target='_blanck'>源代码</a>

一些科学研究表明，不超过 500 个节点的图可视化是适合终端用户阅读和交互式探索的。根据这个原则，在大规模图上，我们将元数据中的节点通过 LOUVAIN 聚类算法进行聚合。首先展示被聚合后的图，然后用户可以通过展开聚合节点进行下钻式探索。如果一次聚合后的节点数仍然庞大，可以进行多层次的聚合。为了控制渲染节点的数量，展开多个聚类后，最早被展开的聚类将会被自动收起。这一方案除了满足上述原则，还能减少前端计算和渲染的负担。

#### 定义

该 Demo 简要演示了一种针对大规模图数据的一整套展示、交互、分析方案，包括：用户交互界面，数据处理流程，交互式探索，分析过程回溯，算法分析。

#### 何时使用

在大规模数据场景中，前端浏览器的计算、渲染性能有限，很难保证流畅的实时交互，又需要基于海量的关系数据进行探索分析时。该方案可以解决该问题。

#### 图例

- 聚合节点：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50  style='min-width: 10px' />代表由 Louvain 算法计算出的一个聚类，包含多个真实节点。中间的数字代表了该聚类所包含的真实节点个数。 <br />

- 真实节点：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' />原数据中的节点。颜色代表所属聚类。 <br />

- 带有绿点标记的节点：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EdtxSYsEeeQAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' /> 相较于上一次的结果，该标记标识了本次更新的结果中新增的聚合节点或真实节点。 <br />

- 聚合边：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WG4sQaSj00QAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' />至少一个端点是聚合节点。 <br />

- 真实边：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sIHZRZSh_jAAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' /> 两个端点都是真实节点。

#### 图交互

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IgoxQ7wfjCcAAAAAAAAAAAAAARQnAQ' width=150 style='min-width: 10px' />
&nbsp; &nbsp; <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cCk4SrHVfDsAAAAAAAAAAAAAARQnAQ' width=180 style='min-width: 10px' />

<br /><br /> 每个“聚合点” <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50  style='min-width: 10px' /> 代表了一个 LOUVAIN 计算出的聚类，包含多个“真实节点” <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' />。

**「右击」** 任意节点或边，一个相对应的上下文菜单将会出现。

右击 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50 style='min-width: 10px' /> 并选择“展开聚合节点”，聚合节点将会被该聚类中的真实节点替代，这就是下钻式探索。

你也可以通过右击 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' /> 并选择“聚合该聚类”将已经展开的节点聚合；或选择 “寻找 k 度邻居”，被选中点的 k 度邻居节点将会被融合到当前图中。

#### 画布菜单

_请在[全屏模式](/zh/largegraph)下体验_ <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FKbFRIzj34EAAAAAAAAAAAAAARQnAQ' width=250 style='min-width: 10px' /> <br /> 在画布左上角，有一个画布菜单，包含一系列辅助探索的工具。从左到右，它们分别是： <br />

- 显示/隐藏边标签；
- 鱼眼放大镜；
- 拉索选择模式；
- 寻找最短路径（按 SHIFT 点选两个端点）；
- 缩小；
- 使图内容适应视窗；
- 放大；
- 搜索一个节点（输入 ID）。

#### 注意

该 demo 仅为展示大规模图可视化方案，因此使用的数据是一个较小的、模拟的数据集。除了上述内容外，还有很多其他的功能。愉快地探索吧。希望它对你有所帮助。
