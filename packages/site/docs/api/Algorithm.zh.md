---
title: 图算法
order: 15
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

### labelPropagation

_G6 4.0 起支持_ 标签传播算法，自动为数据聚类。优势：速度较 LOUVAIN 快。

参考资料：https://en.wikipedia.org/wiki/Label_propagation_algorithm

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| data | GraphData | true | 图数据 |
| directed | Boolean | false | 是否是有向图，默认为 false |
| weightPropertyName | String | false | 边权重的属名称，默认为 `'weight'，若数据中没有权重，则默认每条边权重为 1 |
| maxIteration | Number | false | 最大迭代次数，默认为 1000 |

**返回值**

返回聚合数据，并为输入的 `data` 中的每个节点数据加上 `clusterId` 字段。聚合数据 `ClusterData` 类型如下：

```typescript
interface ClusterData {
  clusters: {
    // 聚类数组
    id: string; // 聚类 Id
    nodes: NodeConfig[]; // 该聚类包含的节点
  }[];
  clusterEdges: {
    // 聚类与聚类之间的边数组
    source: string; // 起点聚类 id
    target: string; // 终点聚类 id
    count: number; // 该边所包含的真实边个数
  }[];
}
```

返回值示例：

```javascript
{
  clusters: [
    {id: 'cluster1', nodes: [ {id: 'node1', clusterId: 'cluster1'}, {id: 'node2', clusterId: 'cluster1'} ]},
    {id: 'cluster2', nodes: [ {id: 'node3', clusterId: 'cluster2'} ]},
  ],
  clusterEdges: [
    {source: 'cluster1', target: 'cluster2', count: 10},
    {source: 'cluster1', target: 'cluster1', count: 3},
  ]
}
```

**用法**

```javascript
import G6, { Algorithm } from '@antv/g6';
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
});

const data = {
  nodes: [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
    { id: 'E' },
    { id: 'F' },
    { id: 'G' },
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'A', target: 'C' },
    { source: 'D', arget: 'A' },
    { source: 'D', target: 'E' },
    { source: 'E', target: 'F' },
  ],
};

graph.data(data);
graph.render();

const { labelPropagation } = Algorithm;

// result 中包含 clusters 与 clusterEdges 数组。data 中的每个节点数据将带有 clusterId 字段
let result = labelPropagation(data);
```

### louvain

_G6 4.0 起支持_ LOUVAIN 自动聚类算法。优势：根据节点间的紧密程度计算，较之于 Label Propagation 更准确。

参考资料：https://en.wikipedia.org/wiki/Louvain_method

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| data | GraphData | true | 图数据 |
| directed | Boolean | false | 是否是有向图，默认为 false |
| weightPropertyName | String | false | 边权重的属名称，默认为 `'weight'，若数据中没有权重，则默认每条边权重为 1 |
| threshold | Number | false | 停止迭代的阈值，默认为 0.0001 |

**返回值**

返回聚合数据，并为输入的 `data` 中的每个节点数据加上 `clusterId` 字段。聚合数据 `ClusterData` 类型如下：

```typescript
interface ClusterData {
  clusters: {
    // 聚类数组
    id: string; // 聚类 Id
    nodes: NodeConfig[]; // 该聚类包含的节点
    sumTot?: number; // 该聚类内部边总数
  }[];
  clusterEdges: {
    // 聚类与聚类之间的边数组
    source: string; // 起点聚类 id
    target: string; // 终点聚类 id
    count: number; // 该边所包含的真实边个数
  }[];
}
```

返回值示例：

```javascript
{
  clusters: [
    {id: 'cluster1', sumTot: 8, nodes: [ {id: 'node1', clusterId: 'cluster1'}, {id: 'node2', clusterId: 'cluster1'} ]},
    {id: 'cluster2', sumTot: 15, nodes: [ {id: 'node3', clusterId: 'cluster2'} ]},
  ],
  clusterEdges: [
    {source: 'cluster1', target: 'cluster2', count: 10},
    {source: 'cluster1', target: 'cluster1', count: 3},
  ]
}
```

**用法**

```javascript
import G6, { Algorithm } from '@antv/g6';
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
});

const data = {
  nodes: [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
    { id: 'E' },
    { id: 'F' },
    { id: 'G' },
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'A', target: 'C' },
    { source: 'D', arget: 'A' },
    { source: 'D', target: 'E' },
    { source: 'E', target: 'F' },
  ],
};

graph.data(data);
graph.render();

const { louvain } = Algorithm;

// result 中包含 clusters 与 clusterEdges 数组。data 中的每个节点数据将带有 clusterId 字段
let result = louvain(data);
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

```javascript
import G6, { Algorithm } from '@antv/g6';
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
});

const data = {
  nodes: [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
    { id: 'E' },
    { id: 'F' },
    { id: 'G' },
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'C' },
    { source: 'A', target: 'C' },
    { source: 'D', arget: 'A' },
    { source: 'D', target: 'E' },
    { source: 'E', target: 'F' },
  ],
};

graph.data(data);
graph.render();

const { detectDirectedCycle } = Algorithm;

// 此时图中没有环，result 为 null
let result = detectDirectedCycle(graph);

// 当数据中加入 F->D 这条边后，图中有一个环
data.edges.push({
  source: 'F',
  target: 'D',
});

graph.changeData(data);

// 返回数据
/**
* {
    D: Node,
    F: Node,
    E: Node,
  }
*/
result = detectDirectedCycle(graph);
```

### detectAllCycles(graph, directed, nodeIds, include)

提供支持寻找图中所有环路的函数。对有向图来说返回所有简单环，简单环是指路径上的节点都只出现一次的闭合路径；对于无向图来说，返回一组完备的[基本环](https://en.wikipedia.org/wiki/Cycle_basis)。

参考资料：

- [检测无向图中的所有环](https://www.geeksforgeeks.org/print-all-the-cycles-in-an-undirected-graph/)

- 检测所有有向图中的简单环: [Johnson's algorithm ](https://www.cs.tufts.edu/comp/150GA/homeworks/hw1/Johnson%2075.PDF)

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph 实例 |
| directed | boolean | false | 是否考虑边的方向性，若不指定，则取图的 `directed` 属性 ｜ |
| nodeIds | string[] | false | 需包含或排除的节点 ID 的数组，若不指定，则返回图中所有的圈 ｜ |
| include | boolean | false | 若为 `true`, 则返回包含参数 `nodeIds` 中指定的节点的圈，否则，返回所有不包含 `nodeIds` 中指定的节点的圈。默认为 `true` ｜ |

**返回值**

- 返回值类型：[{[key: string]: Node}]
- 返回一个数组表示检测到的所有符合条件的圈，每个环用一个 Object 表示，其中 key 为节点 id，value 为该节点在环中指向的下一个节点。

**用法**

```javascript
const { detectAllCycles } = Algorithm;

// 检测有向图中的所有简单环
const allCycles = detectAllCycles(graph, true);

// 检测有向图中包含节点 B 的所有简单环
const allCycleIncludeB = detectAllCycles(graph, true, ['B']);

// 检测无向图中所有不包含节点 B 的所有基本环
const allCycleExcludeB = detectAllCycles(graph, false, ['B'], false);
```

### findShortestPath(graph, start, end, directed, weightPropertyName)

查找两点之间的最短路径。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph 实例 |
| start | INode / string | true | G6 Node 实例或 ID，路径起始点 ｜ |
| end | INode / string | true | G6 Node 实例或 ID，路径终点 ｜ |
| directed | boolean | false | 是否考虑边的方向性，若不指定，则取图的 `directed` 属性 ｜ |
| weightPropertyName | string | false | 边的权重属性字段名，若不指定，则认为所有边权重相同 ｜ |

**返回值**

- 返回值类型：Object，

```
 {
  length: number, // 最短路径长度
  path: string[],
  allPath: string[][] // start 到 end 的所有的最短路径
}
```

- 返回的对象中，length 属性代表最短路径的长度，path 属性为构成一条最短路径的节点数组。

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'A',
      label: 'A',
    },
    {
      id: 'B',
      label: 'B',
    },
    {
      id: 'C',
      label: 'C',
    },
    {
      id: 'D',
      label: 'D',
    },
    {
      id: 'E',
      label: 'E',
    },
    {
      id: 'F',
      label: 'F',
    },
    {
      id: 'G',
      label: 'G',
    },
    {
      id: 'H',
      label: 'H',
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'C',
      target: 'G',
    },
    {
      source: 'A',
      target: 'D',
    },
    {
      source: 'A',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'F',
      target: 'D',
    },
    {
      source: 'D',
      target: 'E',
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
});
graph.data(data);
graph.render();

const { findShortestPath } = Algorithm;
// 不考虑边的方向性，查找节点 A 和 节点 C 之间的最短路径
const { length, path, allPath } = findShortestPath(graph, 'A', 'C');
console.log(length, path);
// 期望输出：2, ['A', 'B', 'C']
```

### findAllPath(graph, start, end, directed)

查找两点之间的所有路径。

**参数**

| 名称     | 类型           | 是否必选 | 描述                                                      |
| -------- | -------------- | -------- | --------------------------------------------------------- |
| graph    | IGraph         | true     | G6 Graph 实例                                             |
| start    | INode / string | true     | G6 Node 实例或 ID，路径起始点 ｜                          |
| end      | INode / string | true     | G6 Node 实例或 ID，路径终点 ｜                            |
| directed | boolean        | false    | 是否考虑边的方向性，若不指定，则取图的 `directed` 属性 ｜ |

**返回值**

- 返回值类型：string[][]
- 返回包含两个节点之间所有路径的数组，每条路径由节点 ID 数组表示

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'A',
      label: 'A',
    },
    {
      id: 'B',
      label: 'B',
    },
    {
      id: 'C',
      label: 'C',
    },
    {
      id: 'D',
      label: 'D',
    },
    {
      id: 'E',
      label: 'E',
    },
    {
      id: 'F',
      label: 'F',
    },
    {
      id: 'G',
      label: 'G',
    },
    {
      id: 'H',
      label: 'H',
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'C',
      target: 'G',
    },
    {
      source: 'A',
      target: 'D',
    },
    {
      source: 'A',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'F',
      target: 'D',
    },
    {
      source: 'D',
      target: 'E',
    },
  ],
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
});
graph.data(data);
graph.render();

const { findAllPath } = Algorithm;
const allPaths = findAllPath(graph, 'A', 'E');
console.log(allPaths);
// 期望输出值：[['A', 'D', 'F', 'E'], ['A', 'D', 'E'], ['A', 'E']]
```

### getConnectedComponents

返回图中的连通分量。若为无向图，连通分量指图中的极大连通子图，连通子图中任何两个顶点之间通过路径相互连接；若为有向图，则返回所有强连通分量，强连通分量指有向图中的极大强连通子图，强连通子图中任何两个节点之间都存在一条可达到彼此的有向路径。

参考资料：

- 检测有向图中的强连通分量：[Tarjan's Algorithm](http://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm)

  **参数**

| 名称     | 类型    | 是否必选 | 描述                                                      |
| -------- | ------- | -------- | --------------------------------------------------------- |
| graph    | IGraph  | true     | G6 Graph 实例                                             |
| directed | boolean | false    | 是否考虑边的方向性，若不指定，则取图的 `directed` 属性 ｜ |

**返回值**

- 返回值类型：INode[][]
- 返回一个数组表示检测到的所有连通分量，每个连通分量为节点数组。

**用法**

```javascript
const data = {
  nodes: [
    {
      id: 'A',
    },
    {
      id: 'B',
    },
    {
      id: 'C',
    },
    {
      id: 'D',
    },
    {
      id: 'E',
    },
    {
      id: 'F',
    },
    {
      id: 'G',
    },
    {
      id: 'H',
    },
  ],
  edges: [
    {
      source: 'A',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'A',
      target: 'C',
    },
    {
      source: 'D',
      target: 'A',
    },
    {
      source: 'D',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'F',
      target: 'D',
    },
    {
      source: 'G',
      target: 'H',
    },
    {
      source: 'H',
      target: 'G',
    },
  ],
};
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 400,
});
graph.data(data);
graph.render();

// 图中的连通分量
const components = getConnectedComponents(graph, false);
components.forEach((component) => {
  console.log(component.map((node) => node.get('id')));
});
// 期望输出结果：['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H']

// 有向图中的强连通分量
const components2 = getConnectedComponents(graph, true);
components2.forEach((component) => {
  console.log(component.map((node) => node.get('id')));
});
// 期望输出结果：['A'], ['B'], ['C'], ['D', 'E', 'F'], ['G', 'H']
```

### pageRank

PageRank 可以用来度量网络中节点的重要性，最初用于标识网页的重要性，对网页进行排序。PageRank 算法假设当前节点的重要性是由指向它的其他节点的重要性决定的，一个节点接收到的来自其他节点的入链 (inbound) 越多，则越重要，每个入链的权重由提供入链的节点的重要性决定。 因此 PageRank 除了考虑到入链数量，还参考了入链“质量”。PageRank 通过迭代递归计算来更新每个节点的得分，直到得分稳定为止。

参考资料：

- [PageRank](https://en.wikipedia.org/wiki/PageRank)

  **参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph 实例 |
| epsilon | number | false | 判断 PageRank 得分是否稳定的精度值，默认 0.000001 ｜ |
| linkProb | number | false | 阻尼系数（dumping factor），指任意时刻，用户访问到某节点后继续访问该节点指向的节点的概率，默认 0.85。 ｜ |

**返回值**

- 返回值类型：Object, {[key: string]: number}
- 返回一个对象，表示节点 ID 对应的该节点的 PageRank 值。
