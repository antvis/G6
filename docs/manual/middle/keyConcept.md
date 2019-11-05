---
title: G6 中的关键概念
order: 0
---

<a name="FVpps"></a>
## 图形 Shape
Shape 指 G6 中的图形、形状，它可以是圆形、矩形、路径等。它一般与 G6 中的节点、边相关。G6 中的每一种节点或边由一个或多个 Shape 组成。

例如下图（左）的节点包含了一个圆形图形；下图（中）的节点含有有一个圆形和一个文本图形；下图（右）的节点中含有 5 个圆形（蓝绿色的圆和上下左右四个锚点）、一个文本图形。但每种节点和边都会有自己的唯一关键图形 keyShape，下图中三个节点的 keyShape 都是蓝绿色的圆，keyShape 主要用于交互检测、样式随[状态](https://www.yuque.com/antv/g6/fqnn9w)自动更新等，见 [keyShape](#UNCAz)。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570860282365-a580467a-9843-4aa5-a016-d73dff38fc0a.png#align=left&display=inline&height=68&name=image.png&originHeight=136&originWidth=138&search=&size=14236&status=done&width=69)      ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570860291602-5729dfa6-4c25-4547-82f8-2d388422df67.png#align=left&display=inline&height=85&name=image.png&originHeight=170&originWidth=150&search=&size=16796&status=done&width=75)      ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1570859851766-0358416c-65d1-4637-93d1-e5cf12017bc8.png#align=left&display=inline&height=94&name=image.png&originHeight=188&originWidth=196&search=&size=24941&status=done&width=98)
> （左）只含有一个圆形图形的节点，keyShape 是该圆形。（中）含有圆形和文本图形的节点，keyShape 是圆形。（右）含有主要圆形、文本、上下左右四个小圆形的节点，keyShape 是圆形。


G6 使用不同的 shape 及组合，设计了多种内置的节点和边。G6 内置节点的有 'circle'， 'rect'，'ellipse'，...（详见 [内置节点](https://www.yuque.com/antv/g6/internal-node)）；内置边的有 'line'，'polyline'，'cubic'，...（详见 [内置边](https://www.yuque.com/antv/g6/internal-edge)）。

除了使用内置的节点和边外，G6 还允许用户通过自己搭配和组合 Shape 进行节点和边的自定义，详见 [自定义节点](https://www.yuque.com/antv/g6/self-node) 和 [自定义边](https://www.yuque.com/antv/g6/self-edge)。

<a name="UNCAz"></a>
## KeyShape
如上所述，每一种节点和边都有一个唯一的关键图形 keyShape。keyShape 是在节点的 draw 方法中返回的图形对象，用于**确定节点的包围盒（Bounding Box） —— bbox（x, y, width, height)** ，从而计算相关边的连入点（与相关边的交点）。若 keyShape 不同，节点与边的交点计算结果不同。 

<a name="IXt42"></a>
### 示例 
本例中的一个节点由一个 rect 图形和一个带灰色描边、填充透明的 circle 图形构成。

- 当节点的 keyShape 为 circle 时：

![2019-06-13.07.png](https://cdn.nlark.com/yuque/0/2019/png/244306/1561033286841-e52f2489-4c31-4235-9d3c-0dfcc95ff4c6.png#align=left&display=inline&height=145&name=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-06-13%20%E4%B8%8A%E5%8D%8811.31.07.png&originHeight=166&originWidth=392&search=&size=8734&status=done&width=342)

- 当节点的 keyShape 为 rect 时：

![2019-06-13.png](https://cdn.nlark.com/yuque/0/2019/png/244306/1561033286856-823a0f11-a768-456f-b510-d823799d1bfe.png#align=left&display=inline&height=150&name=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-06-13%20%E4%B8%8A%E5%8D%8811.31.56.png&originHeight=180&originWidth=432&search=&size=8968&status=done&width=359)


<a name="69UmU"></a>
## Shape 的生命周期
> 当用户需要[自定义节点](https://www.yuque.com/antv/g6/self-node)和[自定义边](https://www.yuque.com/antv/g6/self-edge)时，需要了解 Shape 的生命周期。使用内置节点和边则可以跳过这一部分内容。

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

关于自定义Shape更多的方法请[参考 Shape API 文档](https://www.yuque.com/antv/g6/shape-api)。

## anchorPoint

节点的连接点 anchorPoint 指的是边连入节点的相对位置，即节点与其相关边的交点位置。anchorPoints 是一个二维数组，每一项表示一个连接点的位置，在一个[图形 shape](https://www.yuque.com/antv/g6/shape-crycle) 中，连接点的位置如下图所示，x 和 y 方向上范围都是 [0, 1]：<br />
<img src='https://cdn.nlark.com/yuque/0/2019/png/156681/1571036680989-45a97f57-c247-4408-8b38-37c1e0d6c8c7.png#align=left&display=inline&height=190&name=image.png&originHeight=654&originWidth=1364&search=&size=204253&status=done&width=396' width='600' height='300' />

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
