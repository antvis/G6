---
title: Graph Algorithm
order: 6
---

Graph algorithms provide one of the most effective methods for analyzing relational data. They describe how to process graphs to discover some qualitative or quantitative measures. Graph algorithms are based on graph theory and use the relationship between them to structure and change complex systems. We can use these algorithms to discover hidden information, verify business assumptions, and change behavior to make predictions.

If you are interested in data structures and algorithms, you can learn from [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms).

G6 has added graph algorithms since V3.5. In future versions, we will continue to enrich the built-in algorithms.

### depthFirstSearch

[Depth first search](https://en.wikipedia.org/wiki/Depth-first_search) (DFS) is an algorithm for traversing or searching tree or graph data structures. One starts at the root (selecting some arbitrary node as the root in the case of a graph) and explores as far as possible along each branch before backtracking.

<img src='https://camo.githubusercontent.com/aaad9e39961daf34d967c616edeb50abf3bf1235/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37662f44657074682d46697273742d5365617263682e676966' alt="img">

[Image Source](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/depth-first-search)

**Parameters**

| Name        | Type                | Required | Description                      |
| ----------- | ------------------- | -------- | -------------------------------- |
| graph       | IGraph              | true     | G6 Graph Instance                |
| startNodeId | string              | true     | The ID of the node to be started |
| callbacks   | IAlgorithmCallbacks | false    | The callback function            |

**Usage**

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
    // The callback function for the traversal's begining
  },
  leave: ({ current, previous }) => {
    // The callback function for the traversal's ending
  },
})
```

### breadthFirstSearch

[Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key') and explores the neighbor nodes first, before moving to the next level neighbors.

<img src='https://camo.githubusercontent.com/b8073f26dfdf1644e8a92312fff100341987a8f5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966'  alt="img"/>

[Image Source](https://camo.githubusercontent.com/b8073f26dfdf1644e8a92312fff100341987a8f5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f352f35642f427265616474682d46697273742d5365617263682d416c676f726974686d2e676966)

**Parameters**

| Name              | Type                | Required | Description                 |
| ----------------- | ------------------- | -------- | --------------------------- |
| graph             | IGraph              | true     | G6 Graph Instance           |
| startNodeId       | string              | true     | The ID of the starting node |
| originalCallbacks | IAlgorithmCallbacks | false    | The callback function       |

**Usage**

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
    // The callback function for the traversal's begining
  },
  leave: ({ current, previous }) => {
    // The callback function for the traversal's ending
  },
})
```

### detectDirectedCycle

In a given directed graph, check whether a ring is included. If at least one ring is included in the given graph, the first ring included is returned. Returns `null` if there is no cycle in the graph.

References:

- [detect-cycle-in-a-graph](https://www.geeksforgeeks.org/detect-cycle-in-a-graph/)

- [detect-cycle](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/detect-cycle)

**Parameters**

| Name  | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| graph | IGraph | true     | G6 Graph Instance |

**Return**

Returns the detected cycle. Returns `null` if there is no cycle.

**Usage**

```javascript
import G6, { Algorithm } from '@antv/g6';
const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
});

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
  ],
};

graph.data(data);
graph.render();

const { detectDirectedCycle } = Algorithm;

// There is no cycle in the graph, the result is null
let result = detectDirectedCycle(graph);

// There will be a cycle after adding edge F->D
data.edges.push({
  source: 'F',
  target: 'D',
});

graph.changeData(data);

// Returns:
/**
* {
    D: Node,
    F: Node,
    E: Node,
  }
*/
result = detectDirectedCycle(graph);
```
