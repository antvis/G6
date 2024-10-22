---
title: 从卡掉渣到满帧需要几步
order: 13
---

## 简介

在面对复杂数据的图可视分析，你的 G6 应用是否出现了卡顿、掉帧、不流畅现象？跟着本文的 tips 排查和优化，提升你的图可视化应用的性能。G6 的性能瓶颈主要在两个方面：渲染、计算。本小节介绍性能瓶颈的一些原理，对理论不感兴趣只想直接优化代码的小伙伴可以直接跳到[解决方案](#解决方案)章节

### 性能瓶颈 — 渲染

在渲染方面，性能主要取决于当前画布上形状元素的个数，e.g. 一个节点上有矩形、文本、图片三个图形，一条边上有路径、文本两个图形，那么一份 100 个节点、50 条边的图数据，将渲染出 100 _ 3 + 50 _ 2 = 400 个图形。然而，开发者常常自定义非常复杂的节点，一个节点上可能有 10 ～ 20 个图形，那么画布上的图形数量将陡增。因此，尽可能地减少不必要的图形绘制，是提升渲染性能的主要手段。

### 性能瓶颈 — 计算

计算方面，主要包括节点布局计算、折线自动寻径算法等。

## 解决方案

G6 内部代码，我们在持续迭代其性能。而基于 G6 的图应用，则需要应用的开发者关注实现方式，不合理的实现方式很可能导致性能的额外开销。

### 定义合理的画布大小

一般来说，我们应当根据浏览器中容器的大小设置图画布的大小，即在图实例上配置的 `width` 与 `height`。目前主流显示器的分辨率来看，浏览器中放置图的容器长一般都不会超过 2500，高一般不会超过 2000。之前曾经遇到过开发者将图的 `width` 和 `height` 设置到几万，这造成了 `<canvas />` 标签的宽高非常大。这完全没有必要，因为大部分超出了浏览器视口。实际上，我们绘制的节点即使坐标达到了上万，我们仍然可以通过 `drag-canvas`、`zoom-canvas` 等交互滚动查看，没有必要设置巨大的图宽高。

### 尽可能选择 Canvas 渲染

相比于 Canvas，可能部分开发者更熟悉 DOM/SVG 的定义，毕竟 SVG 渲染出来之后可以审查元素，更符合我们的日常调试习惯。比如当你在自定义节点中使用 `group.addShape('dom', {...})` 这种 'dom' 图形时，就必须要使用 SVG 渲染，即在图实例上配置 `renderer: 'svg'`。**但 SVG 的性能比 Canvas 差得多。** 在数据较大、节点比较复杂的情况下，我们强烈推荐你使用 Canvas 进行渲染。Canvas 定义图形的方式也非常灵活，完全可以覆盖 SVG 的能力，或任何看起来像 DOM 定义的卡片样式的节点。比如下面这两个例子，都是使用 Canvas 渲染和定义。 <img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3cRGRb5nB_UAAAAAAAAAAABkARQnAQ" width=300 style="display: inline-flex" alt='' /><img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*b-g0RoOpI3sAAAAAAAAAAABkARQnAQ" width=300 style="display: inline-flex" alt='' />

- https://g6-v4.antv.vision/examples/item/customNode/#card
- https://g6-v4.antv.vision/examples/item/customNode/#cardNode

回到 SVG 容易审查这个优势，虽然 Canvas 上没有办法审查每一个图形，但我们可以通过下面方式打印图形的属性，进行调试：

```javascript
// 整个图
const graphGroup = graph.getGroup(); // 整个图的根图形分组
const graphGroups = graphGroup.get('children'); // 一般会有 -node -edge -delegate 几个分组

// 单个节点（单个边/ combo 也类似）
const node = graph.findById('node1'); // 找到某个节点对象
const nodeShapeGroup = node.getContainer(); // 获取该节点的图形分组
const nodeShapes = nodeShapeGroup.get('children'); // 获取改节点中的所有图形
const keyShape = node.getKeyShape(); // 获取该节点的关键图形，keyShape 在 nodeShapes 中
const labelShape = nodeShapeGroup.find((ele) => ele.get('name') === 'label-shape'); // 获取 name 为 'label-shape' 的图形（name 在 addShape 时指定）。labelShape 在 nodeShapes 中
console.log(nodeShapes[0].attr(), keyShape.attr(), labelShape.attr()); // 获取并打印图形的属性
```

除了使用 Canvas 渲染，在定义如此复杂的节点时，同时建议尽可能控制图形的数量，见下文 [减少自定义元素的图形数量](#减少自定义元素的图形数量) 一节。

### 减少自定义元素的图形数量

图的渲染性能很大程度取决于画布上图形的数量。有时虽然数据层面只有 100 个节点，但由于自定义节点非常复杂，每个节点达到数十个图形，再加上复杂的自定义边，可能图上图形也能够达到上万。比如下面这个节点上有二十七个图形（因为节点带滚动，部分文字、锚点被隐藏）： <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WUI9Sr9E5a0AAAAAAAAAAAAADmJ7AQ/original" width=300 alt='' />

- 减少不必要的图形。例如，给矩形增加边框，不需要新增图形，只需要给矩形设置描边粗细 `lineWidth` 和描边色 `stroke` 即可。
- 默认看不见的图形，设置 `visible: false`（而不是 `opacity: 0`）进行隐藏。在自定义节点的 `update` 方法或 `draw` 方法中，根据情况再通过 `shape.show()` 将其显示出来或 `shape.hide()` 再次隐藏，e.g.

```javascript
const circleShape = group.addShape('circle', {
  attrs: {}, // 在 attrs 中设置 opacity: 0 也能达到看不见的目的，但实际上还是渲染了，更推荐使用 visible 控制
  name: 'custom-circle', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
  visible: false, // 默认隐藏。注意 visible 字段的位置。visible 为 false 时，图形不会被渲染
});
circleShape.show(); // 显示
circleShape.hide(); // 隐藏
```

- 根据缩放等级，调整显示的图形。在小规模的图上，每个节点都有详细信息性能问题不大，且用户也许需要在每个节点上看到如此详细的信息。但在较大规模的图上，概览时用户更关心的是图的关系结构，此时我们应当考虑，根据情况调整自定义节点上图形的数量，隐藏不必要的信息。这样做一方面可以减小渲染的压力，另一方面可以让用户更高效地获得更清晰的信息。在官网案例[决策树](https://g6-v4.antv.vision/examples/case/treeDemos/#decisionTree)中，进行画布的缩放，可以看到详情（左）和缩略节点（右）的优雅切换。每个节点上图形显示的图形数量从 9 个（详细）降低到 2 个（缩略）。

<img src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*HS5gQ6yCiL4AAAAAAAAAAAAAARQnAQ" width=500 alt='' />
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*b03ARph0fyUAAAAAAAAAAAAADmJ7AQ/original" width=500 alt='' />

### 为自定义元素实现 update 方法

初学者为了方便自定义节点/边/ combo，往往只定义 `draw` 或 `drawShape` 方法，我们也鼓励在小规模图上这样做，可以减少一些开发成本和学习成本。但这将带来额外的性能开销。以自定义节点为例，可能有以下几种情况：

1. `G6.registerNode` 第三个参数没有传入被继承的节点类型名，且没有定义 `update` 方法（或 `update: undefined`），如下：

```javascript
G6.registerNode('custom-node', {
  draw: (cfg, group) => {},
  update: undefined, // 或没有实现 update
}); // 没有第三个参数
```

那么，这个自定义节点将不继承任何内置节点，也没有自己的 `update` 方法。包括初次绘制，所有的更新，例如通过外部或外部调用的 `graph.updateItem`、`node.refresh` 等方法，都将擦除该节点上的所有图形，并重新走一遍 `draw` 方法。这也意味着这个节点上的所有图形将被销毁和重新实例化。这就带来了大量消耗。

2. `G6.registerNode` 第三个参数指定了被继承的节点类型名，没有复写 `update`，如下：

```javascript
G6.registerNode(
  'custom-node',
  {
    draw: (cfg, group) => {},
  },
  'circle',
); // 继承内置 circle 类型节点
```

此时，`custom-node` 将继承内置 `circle` 类型节点的 `update`、`setState` 等方法。有时，可能发现节点更新时，似乎有不符合预期的图形出现，这是由于 `custom-node` 的 `draw` 方法和 `circle` 类型节点的 `draw` 方法差异太大，以至于 `circle` 类型节点按照自己在 `draw` 方法中定义的图形进行更新，与 `custom-node` 逻辑不匹配。解决这一问题最简单的方法就是将 `update` 复写为 `undefined`。此时，就带来了和第一种情况类似的、不实现 `update` 方法的性能开销。

3. `G6.registerNode` 第三个参数指定了被继承的节点类型名，复写 `update: undefined`，如下：

```javascript
G6.registerNode(
  'custom-node',
  {
    draw: (cfg, group) => {},
    update: undefined, // 被复写
  },
  'circle',
); // 继承内置 circle 类型节点
```

上面第二种情况所述的，更新时出现不符合预期的图形或样式问题在复写 `update: undefined` 后应当不复存在。但带来了不实现 `update` 方法的性能开销。即所有的更新，例如通过外部或外部调用的 `graph.updateItem`、`node.refresh` 等方法，都将擦除该节点上的所有图形，并重新走一遍 `draw` 方法。这也意味着这个节点上的所有图形将被销毁和重新实例化。

因此，为了更好的渲染性能，最合理的实现是充分利用节点的生命周期，在不同生命周期给出不同的增量逻辑。如下：

```javascript
G6.registerNode('custom-node', {
  draw: (cfg, group) => {
    group.addShape('circle', {
      attrs: {...}, // styles,
      name: 'xxx' // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
    })
    // ...
  },
  update: (cfg, group, item) => { // 根据 cfg，产生增量的响应
    const someShape = group.find(ele => ele.get('name') === 'xxx'); // 拿到需要更新的图形
    someShape.attr({ lineWidth: 2 }); // 修改图形样式
    someShape.show(); // 控制显示和隐藏
  },
}, 'circle'); // 继承内置 circle 类型节点
```

当然，这要求开发者能够对节点上图形的更新有足够清晰管理逻辑。就像 React 的 `componentDidMount`、`componentDidUpdate` 等生命周期函数一样，不同的 props 变更做出不同的响应。相信只要理解了这一原理，你也能轻松做到。

### 合理使用折线边 polyline

与其他类型的边不同，折线类型边(polyline)在未指定 `controlPoints`（拐折点）时，将使用 A* 自动寻径算法，根据起点和终点的位置，自动计算折线弯折的位置。这一计算的复杂度较高，特别是在拖拽节点的过程中，相关的边需要实时根据最新的端点位置，频繁地计算 A* 算法。因此，当图上的 polyline 边比较多时，可能出现卡顿现象。根据你的实际情况，可以选择如下方法进行避免：

- 参考官网案例[自定义折线](https://g6-v4.antv.vision/zh/examples/item/customEdge/#customPolyline)。大部分情况下，折线两个弯折位置分别在两端点（下面例子的`startPoint`、`endPoint`）连线的 1/3 和 2/3 处，其实我们可以轻易计算出简单的折线路径。

```javascript
[
  ['M', startPoint.x, startPoint.y],
  ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
  ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
  ['L', endPoint.x, endPoint.y],
];
```

- 若你使用的布局算法是 `dagre`，那么可以打开它的 `controlPoints` 配置。`dagre` 算法将为 polyline 边计算控制点，有了控制点，polyline 将不再使用 A\* 自动寻径算法，配置方法如下：

```javascript
const graph = new Graph({
  // ... 其他配置
  layout: {
    type: 'dagre',
    controlPoints: true,
    // ... 其他配置
  },
});
```

### 打开交互的优化配置项

设置节点/边的状态样式、拖拽节点等，基本都是局部更新，即渲染器只会擦除更新前的“脏矩形”，绘制上更新后的图形。但平移画布、缩放画布，在 Canvas 层面上，实际上是整个画布的擦除和重绘，并且在平移/缩放的过程中，这一重绘是极其频繁地被执行的。因此在较大规模的图上，用户可能会明显感觉到平移、缩放画布时非常卡顿。内置的缩放画布 `zoom-canvas` 和拖拽平移画布 `drag-canvas` 交互支持配置项 `enableOptimize`，设置为 `true` 时，在拖拽/缩放过程中，非关键图形（即 `G6.registerNode`、`G6.registerEdge`、`G6.registerCombo` 的 `draw` 返回的图形）将会被隐藏。拖拽/缩放结束后，哪些临时被隐藏的图形将恢复显示。这样能够大大提升拖拽/缩放过程中的帧率。

默认情况下 `enableOptimize` 是 `false`，可以通过下面方式配置：

```javascript
const graoh = new Graph({
  // ...其他配置项
  modes: {
    default: [
      {
        type: 'drag-canvas',
        enableOptimize: true,
        // ... 其他配置
      },
      {
        type: 'zoom-canvas',
        enableOptimize: true,
        // ... 其他配置
      },
    ],
  },
});
```

### 选择合适的布局算法

G6 提供了多种布局算法，其中力导向布局还是受到大多数开发者的青睐。G6 的以下几种布局均是力导家族成员，但性能却有差异，我们更推荐使用近期新增的 `force2` 算法：

- force2：新增的力导算法，性能优秀，在经典力导向模型基础上，增加了更多关于向心力、聚类力的配置，可配置带动画或不带动画的布局 (`animate`)；
- force：引用自 d3 的力导向算法，暂不支持不带动画的布局；
- forceAtlas2：区别于经典的力导向模型，效果更紧凑，性能一般，实现自论文 [ForceAtlas2, a Continuous Graph Layout Algorithm forHandy Network Visualization Designed for the GephiSoftware](https://www.researchgate.net/publication/262977655_ForceAtlas2_a_Continuous_Graph_Layout_Algorithm_for_Handy_Network_Visualization_Designed_for_the_Gephi_Software)；
- fruchterman：另一种力导向模型，倾向于六边形的分布，性能较差，实现自论文 [Fruchterman–Reingold Hexagon Empowered NodeDeployment in Wireless Sensor Network Application](https://www.researchgate.net/publication/361955786_Fruchterman-Reingold_Hexagon_Empowered_Node_Deployment_in_Wireless_Sensor_Network_Application?_sg=HVkgQIDKgLcvASw6B488WEdzJxN2m_X1T2MZ4zoa12KVnE-w8f6v_CawQ98tU2Bh7DN5qlRbmWNUDEA)。

只有力导向家族的布局可以通过布局的 `animate` 配置控制是否在计算过程中不断渲染，从而展现出类似“粒子碰撞”、“力相互作用”的动画效果。其他布局只能在完全计算完成之后进行绘制，在图实例上配置 `animate: true` 可以为这一类静态的布局，或力导向家族配置 `animate: false` 的情况下，布局完成之后进行节点位置的插值动画，移动到对应的位置上。

在数据量较小时，力导向家族无论是否开启布局的 `animate`，效果均不错。在较大数据集上，若关闭 `animate`，则可能需要较长时间等待布局完成后，画布才会更新。若打开 `animate`，在动画中等待布局的完成，一般来说更容易为终端用户所接受。当然，也有可能出现布局的尾声，节点有“震荡”情况。建议在监听节点或画布的点击事件，在用户点击时，停止布局。

### 数据增量 V.S. changeData

- 若干个元素的更新，更推荐使用 `graph.updateItem` 分别更新；
- 新增若干个元素，更推荐使用 `graph.addItem`。v4.6.6 起支持了 `graph.addItems` 批量新增元素；
- 移除若干个元素，更推荐使用 `graph.removeItem`；
- 大部分的数据变更，使用 `graph.changeData`。该方法将做当前图数据和 changeData 传入的新数据的 diff，若发现 id 相同的元素，将进行新旧数据的融合。

### 优化 Minimap 配置

Minimap 是 G6 的小地图插件，用作图的导览。它有三种类型：`'default'`、`'keyShape'`、`'delegate'`。`'default'` 模式下，主图上的所有内容将被完全拷贝一份到 Minimap 的画布上，在主图元素发生更新的时候，Minimap 的响应内容也需要重新拷贝，相当于两份图的开销，因此这种类型的 Minimap 性能最差。`'keyShape'` 模式下，Minimap 仅显示节点和边的主要图形、`'delegate'` 模式下，Minimap 仅显示代理图形（可通过 `delegateStyle` 配置），这两种模式的 Minimap 画布内容较为简化，因此有更好的性能。在较大规模的图上，我们更推荐后面两种模式的 Minimap。

此外，考虑到 Minimap 一般比较小，元素比较多时，边比较细，在 Minimap 上也看不清。 v4.7.16 起，Minimap 支持了 `hideEdge` 配置（默认为 `false`），可设置为 `true` 以隐藏 Minimap 上的边，从而更大程度地提升 Minimap 的性能。

### 合理地使用动画

动画的性能开销一般比较大，更建议动画使用在局部的状态响应时。例如 hover 节点时的呼吸效果、相关上下游的边流动效果等。并及时地停止动画。
