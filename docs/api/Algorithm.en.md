---
title: Graph Algorithm
order: 5
---

图算法提供了一种最有效的分析关联数据的方法，它们描述了如何处理图以发现一些定性或者定量的结论。图算法基于图论，利用节点之间的关系来推断复杂系统的结构和变化。我们可以使用这些算法来发现隐藏的信息，验证业务假设，并对行为进行预测。

如果你对数据结构及算法感兴趣，可以通过 [javascript-algorithms] (https://github.com/trekhleb/javascript-algorithms) 来进一步学习。

G6 从 V3.5 版本开始加入了图算法，在以后版本更新中，我们会不断丰富内置的算法。

### depthFirstSearch

[Depth first search](https://pro.jiqizhixin.com/database/wiki_knowledge/2c1561ab-94b2-4da4-890a-7ffe704a55e0) (DFS) is an algorithm for traversing or searching tree or graph data structures. One starts at the root (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking.


<img src='https://camo.githubusercontent.com/aaad9e39961daf34d967c616edeb50abf3bf1235/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966'>

图片来源：https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/depth-first-search

**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| graph | IGraph | true     | G6 Graph 实例 |
| startVertexId | string | true     | 开始访问的节点的ID |
| callbacks | IAlgorithmCallbacks | false     | 遍历的回调函数 |


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
[Breadth-first search](https://pro.jiqizhixin.com/database/wiki_knowledge/0ba7404d-f83c-4b8c-8925-f728393abeea)(BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key') and explores the neighbor nodes first, before moving to the next level neighbors.


<img src='https://camo.githubusercontent.com/b8073f26dfdf1644e8a92312fff100341987a8f5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966' />

图片来源：https://camo.githubusercontent.com/b8073f26dfdf1644e8a92312fff100341987a8f5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966


**参数**

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
| graph | IGraph | true     | G6 Graph 实例 |
| startVertexId | string | true     | 开始访问的节点的ID |
| originalCallbacks | IAlgorithmCallbacks | false     | 遍历的回调函数 |


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

| 名称    | 类型   | 是否必选 | 描述    |
| ------- | ------ | -------- | ------- |
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
