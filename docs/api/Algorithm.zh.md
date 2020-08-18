---
title: 图算法
order: 6
---

图算法提供了一种最有效的分析关联数据的方法，它们描述了如何处理图以发现一些定性或者定量的结论。图算法基于图论，利用节点之间的关系来推断复杂系统的结构和变化。我们可以使用这些算法来发现隐藏的信息，验证业务假设，并对行为进行预测。

如果你对数据结构及算法感兴趣，可以通过 [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms) 来进一步学习。

G6 从 V3.5 版本开始加入了图算法，在以后版本更新中，我们会不断丰富内置的算法。

### depthFirstSearch

[深度优先搜索](https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2)（Depth First Search，简称 DFS）算法是一种用于遍历或搜索树或图的算法。沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点 v 的所在边都己被探寻过，搜索将回溯到发现节点 v 的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。

<img src='https://camo.githubusercontent.com/aaad9e39961daf34d967c616edeb50abf3bf1235/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966' alt="img">

[图片来源](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/depth-first-search)

**参数**

| 名称        | 类型                | 是否必选 | 描述                |
| ----------- | ------------------- | -------- | ------------------- |
| graph       | IGraph              | true     | G6 Graph 实例       |
| startNodeId | string              | true     | 开始访问的节点的 ID |
| callbacks   | IAlgorithmCallbacks | false    | 遍历的回调函数      |

**用法**

```
import G6, { Algorithm } from '@antv/g6'
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500
})

const data = {
  nodes: [
    {
      id: 'A'
    },
    {
      id: 'B'
    },
    {
      id: 'C'
    },
    {
      id: 'D'
    },
    {
      id: 'E'
    },
    {
      id: 'F'
    },
    {
      id: 'G'
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B'
    },
    {
      source: 'B',
      target: 'C'
    },
    {
      source: 'C',
      target: 'G'
    },
    {
      source: 'A',
      target: 'D'
    },
    {
      source: 'A',
      target: 'E'
    },
    {
      source: 'E',
      target: 'F'
    },
    {
      source: 'F',
      target: 'D'
    },
    {
      source: 'D',
      target: 'G'
    },
  ]
}

graph.data(data)
graph.render()

const { depthFirstSearch } = Algorithm
depthFirstSearch(graph, 'A', {
  enter: ({ current, previous }) => {
    // 开始遍历点的回调
  },
  leave: ({ current, previous }) => {
    // 遍历完节点的回调
  },
})
```

### breadthFirstSearch

[广度优先搜索](https://zh.wikipedia.org/zh/%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2)算法（Breadth First Search，简称 BFS），又译作宽度优先搜索，或横向优先搜索，是一种图搜索算法。简单的说，BFS 是从根节点开始，沿着树的宽度遍历树的节点。如果所有节点均被访问，则算法中止。广度优先搜索的实现一般采用 open-closed 表。

<img src='https://camo.githubusercontent.com/b8073f26dfdf1644e8a92312fff100341987a8f5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966'  alt="img"/>

[图片来源](https://camo.githubusercontent.com/b8073f26dfdf1644e8a92312fff100341987a8f5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966)

**参数**

| 名称              | 类型                | 是否必选 | 描述                |
| ----------------- | ------------------- | -------- | ------------------- |
| graph             | IGraph              | true     | G6 Graph 实例       |
| startNodeId       | string              | true     | 开始访问的节点的 ID |
| originalCallbacks | IAlgorithmCallbacks | false    | 遍历的回调函数      |

**用法**

```
import G6, { Algorithm } from '@antv/g6'
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500
})

const data = {
  nodes: [
    {
      id: 'A'
    },
    {
      id: 'B'
    },
    {
      id: 'C'
    },
    {
      id: 'D'
    },
    {
      id: 'E'
    },
    {
      id: 'F'
    },
    {
      id: 'G'
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B'
    },
    {
      source: 'B',
      target: 'C'
    },
    {
      source: 'C',
      target: 'G'
    },
    {
      source: 'A',
      target: 'D'
    },
    {
      source: 'A',
      target: 'E'
    },
    {
      source: 'E',
      target: 'F'
    },
    {
      source: 'F',
      target: 'D'
    },
    {
      source: 'D',
      target: 'G'
    },
  ]
}

graph.data(data)
graph.render()

const { breadthFirstSearch } = Algorithm
breadthFirstSearch(graph, 'A', {
  enter: ({ current, previous }) => {
    // 开始遍历点的回调
  },
  leave: ({ current, previous }) => {
    // 遍历完节点的回调
  },
})
```

### detectDirectedCycle

在给定的有向图中，检查是否包括圈。如果给定的图中至少包括一个圈，则返回包括的第一个圈，否则返回 null。

参考资料：

- [detect-cycle-in-a-graph](https://www.geeksforgeeks.org/detect-cycle-in-a-graph/)

- [detect-cycle](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/detect-cycle)

**参数**

| 名称  | 类型   | 是否必选 | 描述          |
| ----- | ------ | -------- | ------------- |
| graph | IGraph | true     | G6 Graph 实例 |

**返回值**

返回检测到的圈，否则返回 null。

**用法**

```
import G6, { Algorithm } from '@antv/g6'
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500
})

const data = {
  nodes: [
    {
      id: 'A'
    },
    {
      id: 'B'
    },
    {
      id: 'C'
    },
    {
      id: 'D'
    },
    {
      id: 'E'
    },
    {
      id: 'F'
    },
    {
      id: 'G'
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B'
    },
    {
      source: 'B',
      target: 'C'
    },
    {
      source: 'A',
      target: 'C'
    },
    {
      source: 'D',
      target: 'A'
    },
    {
      source: 'D',
      target: 'E'
    },
    {
      source: 'E',
      target: 'F'
    },
  ]
}

graph.data(data)
graph.render()

const { detectDirectedCycle } = Algorithm

// 此时图中没有环，result 为 null
let result = detectDirectedCycle(graph)

// 当数据中加入 F->D 这条边后，图中有一个环
data.edges.push(
  {
    source: 'F',
    target: 'D'
  }
)

graph.changeData(data)

// 返回数据
/**
* {
    D: Node,
    F: Node,
    E: Node,
  }
*/
result = detectDirectedCycle(graph)

```
