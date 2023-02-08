---
title: 组件设计概览
order: 0
---

> 介绍一个图分析产品会有的常用组件，以及各组件的作用及用法。白皮书中组件相关内容点和边的基础样式是是所有图可视化的基石，要组成一个完成的图分析产品，还需要有各类组件来承担不同的功能。从体验设计的角度来看，常见的组件可分为如下几种类型：

- 基础组件：图例、工具栏、右键菜单、视图控制栏、系统日志等
- 条件输入：查询、筛选、搜索、画布设置等
- 信息输出：详情面板、气泡、Tooltip、画板信息等
- 高级功能：时间轴、快照画廊、分析报表等

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dD3ORraVa9kAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

在某些特殊场景下，也需要结合业务实际情况基于基础组件去升级优化，乃至基于产品独有的能力去设计全新的组件。在优化一个基础组件或设计全新的组件时，需要结合实际的功能需求，从使用场景、构成元素、常见类型、交互说明等几个角度完整的思考清楚。以 AntV 最新设计的两个组件为例：

- [时间轴 TimeBar](/zh/design/component/timebar)
- [视图控制栏 View ToolBar](/zh/design/component/view-toolbar)

## 组件类型

### 通用组件

> 引用自白皮书内容-组件。交互组件，是指用户操作节点，操作边，操作画布，所需要的配套组件。比如 Hover 节点展示出提示框（Tooltip）；点击图例（Legend）对节点筛选；右键节点，弹出菜单（ContextMenu）；对画布进行 放大，缩小，全屏等一套操作工具栏（Toolbar），以及动态改变时间范围，影响画布展示（Timebar）

Legend 图例是一种常见的图分析配套组件，通常将节点 和 边 分类后进行染色，交互分析。其中点击图例，有两种逻辑，一种为 高亮逻辑，即高亮选中的图例所对应的节点，一种是过滤逻辑，即将未选中的节点从画布中过滤。

> @antv/graphin-components 提供了 Legend 组件，如下图所示：<br/>

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vrO6T4ltePwAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

### 提示框 tooltip

Tooltip 提示框是一种快速浏览信息的交互组件，常用于图的节点上，通过鼠标 Hover 产生一个提示框，鼠标移出节点则取消提示框，一般在快速查询信息的时候非常有帮助。

> @antv/g6 提供了 tooltip 组件，如下图所示：

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9aHuRY7D0xkAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

### 右键菜单 ContextMenu

ContextMenu 是右键菜单，通常是对节点进行进一步操作的组件。例如：通过右键菜单实现节点的复制，删除，反选等等。同时，我们也可以对选择的节点发起新画布分析，或者进行打标，发起关系扩散，数据请求之类的高级自定义行为。图分析产品中的 右键菜单往往是和 浏览器网页 的右键菜单 交互与展示形式保持一致，但是也有特殊的形状类型，比如右键仪表盘菜单。

> @antv/graphin-components 提供了 ContextMenu 组件，如下图所示： <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UNLeRKBrXgsAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 工具栏 Toolbar

Toolbar 是提供 常见分析操作 的工具栏。内置了撤销重做（操作历史），鱼眼放大镜，画布缩放，全屏，节点聚焦，画布快照下载等等功能。

> @antv/graphin-components 提供了 Toolbar 组件，如下图所示：

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Asv6Q7GgQHIAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 时间轴 Timebar

时间轴是一种针对时间序列的分析组件，根据时间日期的改变，画布的图也相应动态改变，一个功能完备的时间轴，可以配合播放、快进、后退等控制按钮组使用，为用户带来意想不到的分析效果

> @antv/g6 提供了 Timebar 组件，如下图所示：

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sqssS5EfXnYAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

### 数据交互组件

#### 查询面板 QueryPanel

用户查询图数据的组件，一般由特定的 DSL 语言编辑器组成，例如 SQL、Gremlin、Cypher 等，在某些场景下，通过这个查询面板，可以让用户自主加载数据。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r-XwSL-YK-MAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 筛选面板 FilterPanel

筛选面板是对图元素：节点与边的筛选，从而达到减少视觉干扰的效果。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*xCZ7QZmz0ZgAAAAAAAAAAAAAARQnAQ' width='250' alt=‘img’>

#### 搜索面板 SearchPanel

在关系分析过程中，搜索面板可以辅助用户快速定位其需要关心节点、关联关系。减少用户读图时间。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4RBZSJq2Ku4AAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 属性面板 PropertiesPanel

在关系分析中，节点、边的属性信息量较大，很难把所有信息都在画布中呈现。除了关键属性信息，其他属性信息可以通过属性面板的交互方式呈现给用户

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dbwdSZrVT6cAAAAAAAAAAAAAARQnAQ' width=350 alt=‘img’>

### 后分析组件

> 后分析组件：顾名思义是 画布分析后的分析组件。通常来讲，我们的图分析默认都是在画布区域分析，当一个图已经分析完毕，我们需要对分析结果进行增强，或者保存分享给其他人进行二次分析，这部分能力往往也是图分析产品所应该具备的系统能力。我们梳理出来 3 个后分析组件：注解组件，快照画廊，分析报表。

#### 注解组件 AnnotationPanel

能够对画布的分析结果进行标注：可以使用圈选，拉索 对分析结果的图片进行区域内容选择，使用文本标注，标注内容可以按照时间轴存储。

> 技术上，社区有开源的 d3-annotation，可以轻松实现注解功能。下图是一个分组备注案例

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*U6ltRbuGDlwAAAAAAAAAAAAAARQnAQ' width=600 alt=‘img’>

#### 快照画廊 Snapshot Gallery

快照画廊：是由一系列分析结果快照保存组成的事件长廊，我们形象称之为快照画廊：与传统单一的快照功能相比，快照画廊能够将片断的分析快照保存在系统上，以供分析师能够回看和二次分析。相比 Toolbar 工具栏里的“撤销回退”功能，快照画廊更佳可视化，与分析系统集成度更佳。

> 技术上，@antv/g6 提供 save image 功能，配合 gallery 功能特性。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AMayR4Hi97QAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 分析报表 AnalysisReport

一个中心明确，内容清晰的分析报表能够节省决策者读懂报表内容的时间。图分析报表除了能使用静态图片加内容注解方式的方式呈现给决策者之外，可以使用 IFrame 的方式内嵌的三方报表系统中，是分析结果具有一定的可交互性，从而帮助决策者更好的理解报表内容。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PWQrSbfvOTEAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

### 系统组件

> 系统组件是指可视化分析系统中需要的一些组件，比如分析过程产生的日志（SystemLog），原始数据表格的展示（TableMode），以及画布的实时状态信息（CanvasInfo）和画布的用户设置项（CanvasSetting）

#### 系统日志 SystemLog

关系分析的分析过程是一个反复与后端系统进行交互的过程，一个设计完善、内容清晰的系统日志组件能够帮助用户迅速定位问题。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*17B_SItSHMgAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 表格模式 TableMode

表格模式虽然不能直观展示图中关联关系，但是对于罗列点、边属性信息有较大优势，可以作为分析能力的一个补充。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ASUoR6frrAYAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 画布设置 CanvasSetting

画布设置，可以设置画布元素的颜色，大小，类型，从而达到最佳的展示效果。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*cLK_SqRfBHwAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>

#### 画布信息 CanvasInfo

统计画布的实时信息，比如统计当前画布的节点数量，边数量，在一些持续性布局中，比如力导，还可以提供布局时间与进度。在一些大图场景下，还需要监控浏览器的内存，网络等系统监控信息。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wW0xSKNHjzUAAAAAAAAAAAAAARQnAQ' width='90%' alt=‘img’>
