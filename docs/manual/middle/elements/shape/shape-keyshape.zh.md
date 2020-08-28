---
title: 图形 Shape 与 keyShape
order: 0
---

## 图形 Shape

Shape 指 G6 中的图形、形状，它可以是圆形、矩形、路径等。它一般与 G6 中的节点、边、Combo 相关。**G6 中的每一种节点/边/ Combo 由一个或多个 Shape 组成。节点、边、Combo、标签文本的配置都会被体现到对应的图形上。**

例如下图（左）的节点包含了一个圆形图形；下图（中）的节点含有有一个圆形和一个文本图形；下图（右）的节点中含有 5 个圆形（蓝绿色的圆和上下左右四个锚点）、一个文本图形。但每种节点/边/ Combo 都会有自己的唯一关键图形 keyShape，下图中三个节点的 keyShape 都是蓝绿色的圆，keyShape 主要用于交互检测、样式随[状态](/zh/docs/manual/middle/states/state)自动更新等，见  [keyShape](#keyshape)。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OcaaTIIu_4cAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r5M0Sowd1R8AAAAAAAAAAABkARQnAQ' width=50 alt='img'/>      <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pHoETad75CIAAAAAAAAAAABkARQnAQ' width=50 alt='img'/>

> （左）只含有一个圆形图形的节点，keyShape 是该圆形。（中）含有圆形和文本图形的节点，keyShape 是圆形。（右）含有主要圆形、文本、上下左右四个小圆形的节点，keyShape 是圆形。

G6 使用不同的 shape 组合，设计了多种内置的节点/边/ Combo 。G6 内置节点的有 'circle'， 'rect'，'ellipse'，...（详见 [内置节点](/zh/docs/manual/middle/elements/nodes/defaultNode)）；内置边的有 'line'，'polyline'，'cubic'，...（详见 [内置边](/zh/docs/manual/middle/elements/edges/defaultEdge)）；内置 Combo 有 'circle'，'rect'，()详见 [内置 Combo](/zh/docs/manual/middle/elements/combos/defaultCombo)）。

除了使用内置的节点/边/ Combo 外，G6 还允许用户通过自己搭配和组合 shape 进行节点/边/ Combo 的自定义，详见 [自定义节点](/zh/docs/manual/advanced/custom-node)，[自定义边](/zh/docs/manual/advanced/custom-edge)，[自定义 Combo](/zh/docs/manual/advanced/custom-combo)。

## KeyShape

如上所述，每一种节点/边/ Combo 都有一个唯一的关键图形 keyShape。keyShape 是在节点/边/ Combo 的 `draw()` 方法或 `drawShape()` 方法中返回的图形对象。它有两个主要特点：

### 响应样式

内置节点/边/ Combo 配置项中的 `style` 只体现在它的 keyShape 上。而内置节点/边/ Combo 的状态样式 （图实例的 `nodeStateStyles` / `edgeStateStyles` / `comboStateStyles` 或元素自身的 `stateStyles`) 中需要体现在 keyShape 或其他图形上的写法有所不同，详见 [配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式)。

想要更自由地响应样式（绘制或状态变化时），可以 [自定义节点](/zh/docs/manual/advanced/custom-node) / [自定义边](/zh/docs/manual/advanced/custom-edge) / [自定义 Combo](/zh/docs/manual/advanced/custom-combo)。

#### 示例

该示例使用了内置 rect 节点，节点的 keyShape 是中间的 rect，其他 Shape 包括上下左右四个 circle 以及一个 text。代码设置了节点的样式 `style`，仅在 rect 上生效，其他 Shape 都以默认样式渲染。该节点上的其他图形需要使用其他配置项进行配置。例如，上下左右四个 circle 的样式需要在 `linkPoints` 中配置，文本样式需要在 `labelCfg` 中配置。

代码中还监听了鼠标的进入节点和离开节点事件，触发了 hover 状态后 `nodeStateStyles` 里 hover 的样式仅在 keyShape 上生效。若需要节点中其他图形响应状态发生样式变化，参考 [配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式)。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wWckTbi910IAAAAAAAAAAABkARQnAQ' alt='keyshape-demo' with='50'/>

```javascript
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      label: 'rect',
      type: 'rect',
      style: {
        // 仅在 keyShape 上生效
        fill: 'lightblue',
        stroke: '#888',
        lineWidth: 1,
        radius: 7,
      },
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        // ... 四个圆的样式可以在这里指定
      },
      // labelCfg: {...} // 标签的样式可以在这里指定
    },
  ],
};
const graph = new G6.Graph({
  container: 'mountNode',
  width: 500,
  height: 300,
  nodeStateStyles: {
    // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
    hover: {
      fillOpacity: 0.1,
      lineWidth: 10,
    },
  },
});
graph.data(data);
graph.render();
// 监听鼠标进入节点事件
graph.on('node:mouseenter', (evt) => {
  const node = evt.item;
  // 激活该节点的 hover 状态
  graph.setItemState(node, 'hover', true);
});
// 监听鼠标离开节点事件
graph.on('node:mouseleave', (evt) => {
  const node = evt.item;
  // 关闭该节点的 hover 状态
  graph.setItemState(node, 'hover', false);
});
```

### 包围盒确定

**确定节点 / Combo 的包围盒（Bounding Box） —— bbox（x, y, width, height)** ，从而计算相关边的连入点（与相关边的交点）。若 keyShape 不同，节点与边的交点计算结果不同。

#### 示例  

本例中的一个节点由一个 rect 图形和一个带灰色描边、填充透明的 circle 图形构成。

- 当节点的 keyShape 为 circle 时：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CY7cSaMs4U0AAAAAAAAAAABkARQnAQ' width=220 alt='img'/>

- 当节点的 keyShape 为 rect 时：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*upWTQLTvxGEAAAAAAAAAAABkARQnAQ' width=250 alt='img'/>

## Shape 的生命周期

> 当用户需要[自定义节点](/zh/docs/manual/advanced/custom-node)、[自定义边](/zh/docs/manual/advanced/custom-edge)、[自定义 Combo](/zh/docs/manual/advanced/custom-combo) 时，需要了解 Shape 的生命周期。使用内置节点/边/ Combo 则可以跳过这一部分内容。

从整体来看，Shape 的生命周期分为：

- 初始化渲染；
- 更新；
- 操作；
- 销毁。

Shape 作为 Graph 上的核心元素，这几个阶段都需要考虑，但是销毁可以交给 Graph 来处理，所以在定义 Shape 时不需要考虑，仅需要考虑三个阶段即可：

- 绘制：从无到有的绘制 Shape 及文本；
- 更新：数据发生改变导致 Shape 及文本发生变化；
- 操作：给 Shape 添加状态，如：selected，active 等。

所以我们在设计自定义节点/边/ Combo 时，定义了三个方法，若需要自定义节点/边/ Combo ，需要有选择性地复写它们：

- `draw(cfg, group)`: 绘制，提供了绘制的配置项（数据定义时透传过来）和图形容器，**必须**返回合理的图形作为 keyShape；
- `update(cfg, n)`: 更新，更新时的配置项（更新的字段和原始字段的合并）和元素对象；
- `setState(name, value, item)`: 响应节点/边/ Combo 状态的变化。

关于自定义节点和边的更多方法请参考 [自定义节点与边 API](/zh/docs/api/CustomItem)。
