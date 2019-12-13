---
title: 节点的连接点 anchorPoint
order: 1
---

节点的连接点 anchorPoint 指的是边连入节点的相对位置，即节点与其相关边的交点位置。anchorPoints 是一个二维数组，每一项表示一个连接点的位置，在一个[图形 Shape](/zh/docs/manual/middle/keyconcept/shape-keyshape) 中，连接点的位置如下图所示，x 和 y 方向上范围都是 [0, 1]：<br />
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
