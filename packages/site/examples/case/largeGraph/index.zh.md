---
title: 大规模图下钻式探索
order: 1
---

## 大规模图下钻式探索

<a className='description' href='https://github.com/antvis/G6/blob/master/site/pages/largegraph.zh.tsx' target='_blanck'>源代码</a>

一些科学研究表明，不超过 500 个节点的图可视化是适合终端用户阅读和交互式探索的。根据这个原则，在大规模图上，我们将元数据中的节点通过 LOUVAIN 聚类算法进行聚合。首先展示被聚合后的图，然后用户可以通过展开聚合节点进行下钻式探索。如果一次聚合后的节点数仍然庞大，可以进行多层次的聚合。为了控制渲染节点的数量，展开多个聚类后，最早被展开的聚类将会被自动收起。这一方案除了满足上述原则，还能减少前端计算和渲染的负担。

### 定义

该 Demo 简要演示了一种针对大规模图数据的一整套展示、交互、分析方案，包括：用户交互界面，数据处理流程，交互式探索，分析过程回溯，算法分析。

### 何时使用

在大规模数据场景中，前端浏览器的计算、渲染性能有限，很难保证流畅的实时交互，又需要基于海量的关系数据进行探索分析时。该方案可以解决该问题。

### 图例

- 聚合节点：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50  style='min-width: 10px' />代表由 Louvain 算法计算出的一个聚类，包含多个真实节点。中间的数字代表了该聚类所包含的真实节点个数。 <br />

- 真实节点：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' />原数据中的节点。颜色代表所属聚类。 <br />

- 带有绿点标记的节点：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EdtxSYsEeeQAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' /> 相较于上一次的结果，该标记标识了本次更新的结果中新增的聚合节点或真实节点。 <br />

- 聚合边：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WG4sQaSj00QAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' />至少一个端点是聚合节点。 <br />

- 真实边：<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sIHZRZSh_jAAAAAAAAAAAAAAARQnAQ' width=80 style='min-width: 10px' /> 两个端点都是真实节点。

### 图交互

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IgoxQ7wfjCcAAAAAAAAAAAAAARQnAQ' width=150 style='min-width: 10px' />
&nbsp; &nbsp; <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cCk4SrHVfDsAAAAAAAAAAAAAARQnAQ' width=180 style='min-width: 10px' />

<br /><br /> 每个“聚合点” <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50  style='min-width: 10px' /> 代表了一个 LOUVAIN 计算出的聚类，包含多个“真实节点” <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' />。

**「右击」** 任意节点或边，一个相对应的上下文菜单将会出现。

右击 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1y4AS7ucVXMAAAAAAAAAAAAAARQnAQ' width=50 style='min-width: 10px' /> 并选择“展开聚合节点”，聚合节点将会被该聚类中的真实节点替代，这就是下钻式探索。

你也可以通过右击 <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IOgvSLWF1IQAAAAAAAAAAAAAARQnAQ' width=20 style='min-width: 10px' /> 并选择“聚合该聚类”将已经展开的节点聚合；或选择 “寻找 k 度邻居”，被选中点的 k 度邻居节点将会被融合到当前图中。

### 画布菜单

_请在[全屏模式](/zh/largegraph)下体验_ <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FKbFRIzj34EAAAAAAAAAAAAAARQnAQ' width=250 style='min-width: 10px' /> <br /> 在画布左上角，有一个画布菜单，包含一系列辅助探索的工具。从左到右，它们分别是： <br />

- 显示/隐藏边标签；
- 鱼眼放大镜；
- 拉索选择模式；
- 寻找最短路径（按 SHIFT 点选两个端点）；
- 缩小；
- 使图内容适应视窗；
- 放大；
- 搜索一个节点（输入 ID）。

### 注意

该 demo 仅为展示大规模图可视化方案，因此使用的数据是一个较小的、模拟的数据集。除了上述内容外，还有很多其他的功能。愉快地探索吧。希望它对你有所帮助。
