---
title: Key Concepts
order: 0
---

## Graphics Shape
Graphics Shape（hereinafter referred to as Shape） in G6 is the shape of items (nodes/edges), it can be a circle, a rect, path, and so on. A node or an edge is made up of one or several Shapes.

In the figure(Left) below, there is a node with a circle Shape; (Center) a node with a circle Shape and a text Shape; (right) a circle with a text Shape and 5 circle Shapes including the main circle and four anchor points. Each node or edge has one keyShape. The keyShape of each nodes in the figure below is the green circle. [keyShape](#UNCAz) is the Shape that responses interactions and [State](/zh/docs/manual/middle/states/state) changing. 
<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OcaaTIIu_4cAAAAAAAAAAABkARQnAQ' width=50/>     <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r5M0Sowd1R8AAAAAAAAAAABkARQnAQ' width=50/>      <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pHoETad75CIAAAAAAAAAAABkARQnAQ' width=50/>
> (Left) A node with one circle Shape, the keyShape is the circle. (Center) A node with a text Shape and the circle Shape, the keyShape is the circle. (Right) A node with a text Shape and five circle Shapes including the main circle and four anchors, the keyShape is the green circle.


G6 designs lots of built-in nodes and edges by combing different Shapes. Built-in nodes includes 'circle', 'rect', 'ellipse', ...(Refer to [Built-in Nodes](/en/docs/manual/middle/elements/nodes/defaultNode)); Built-in edges includes 'line', 'polyline', 'cubic', ... (Refer to [Built-in Edges](/en/docs/manual/middle/elements/nodes/defaultEdge)).

Besides, G6 allows users to define their own types of item by register a custom node or an custom edge. Refer to [Custom Node](/en/docs/manual/advanced/custom-node) 和 [Custom Edge](/en/docs/manual/advanced/custom-edge).

## KeyShape
As stated, there is one keyShape for each type of item. keyShape is returned by `draw()` of each type of item. It is used for **define the Bounding Box —— bbox（x, y, width, height)**  to calculate the link points and some transformation. Different keyShape will lead to different result link points.

### Example 
There is a node with a rect Shape and a circle Shape in transparent filling and grey stroke.

- When the keyShape of the node is the circle:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*CY7cSaMs4U0AAAAAAAAAAABkARQnAQ' width=220/>

- When the keyShape of the node is the rect:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*upWTQLTvxGEAAAAAAAAAAABkARQnAQ' width=250/>


## Shape 的生命周期
> 当用户需要[自定义节点](/zh/docs/manual/advanced/custom-node)和[自定义边](/zh/docs/manual/advanced/custom-edge)时，需要了解 Shape 的生命周期。使用内置节点和边则可以跳过这一部分内容。

从整体来看，Shape 的生命周期分为：

- 初始化渲染；
- 更新；
- 操作；
- 销毁。

Shape 作为 Graph 上的核心元素，这几个阶段都需要考虑，但是销毁可以交给 Graph 来处理，所以在定义 Shape 时不需要考虑，仅需要考虑三个阶段即可：

- 绘制：从无到有的绘制 Shape 及文本；
- 更新：数据发生改变导致 Shape 及文本发生变化；
- 操作：给 Shape 添加状态，如：selected，active 等。

所以我们在设计自定义节点和边时，定义了三个方法，若需要自定义节点和边，需要有选择性地复写它们：

- `draw(cfg, group)`: 绘制，提供了绘制的配置项（数据定义时透传过来）和图形容器；
- `update(cfg, n)`: 更新，更新时的配置项（更新的字段和原始字段的合并）和节点对象；
- `setState(name, value, item)`: 设置节点状态。

关于自定义Shape更多的方法请[参考 Shape API 文档](/zh/docs/api/Shape)。

## anchorPoint

节点的连接点 anchorPoint 指的是边连入节点的相对位置，即节点与其相关边的交点位置。anchorPoints 是一个二维数组，每一项表示一个连接点的位置，在一个[图形 shape](/zh/docs/manual/middle/keyConcept) 中，连接点的位置如下图所示，x 和 y 方向上范围都是 [0, 1]：<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EJTyR4j9VN4AAAAAAAAAAABkARQnAQ' width='600' height='300' />

节点中有了 anchorPoints 之后，相关边可以分别选择连入起始点、结束点的哪一个 anchorPoint。当需要在节点之间连多条线时，这种机制能够使边的连入更美观。

边可以通过指定 `sourceAnchor` 和 `targetAnchor` 分别选择起始点、结束点的 anchorPoint。`sourceAnchor` 和 `targetAnchor` 取的值是相对应节点上 anchorPoints 数组的索引值。

下面数据演示了如何在节点上配置连接点、在边上指定连接点：
```javascript
const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
        x: 100,
        y: 200,
        // 该节点可选的连接点集合，该点有两个可选的连接点
        anchorPoints: [[0, 1], [0.5, 1]],
        shape: 'rect'
      },
      {
        id: 'node2',
        label: 'node2',
        x: 300,
        y: 400,
        // 该节点可选的连接点集合，该点有两个可选的连接点
        anchorPoints: [[0.5, 0], [1, 0.5]],
        shape: 'rect'
      }
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
        // 该边连入 source 点的第 0 个 anchorPoint，
        sourceAnchor: 0,
        // 该边连入 target 点的第 0 个 anchorPoint，
        targetAnchor: 0,
        style: {
          endArrow: true
        }
      },
      {
        source: 'node2',
        target: 'node1',
        // 该边连入 source 点的第 1 个 anchorPoint，
        sourceAnchor: 1,
        // 该边连入 source 点的第 1 个 anchorPoint，
        targetAnchor: 1,
        style: {
          endArrow: true
        }
      }
    ]
  }
```
