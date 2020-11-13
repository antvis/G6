---
title: Graph Algorithm
order: 9
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

### detectAllCycles(graph, directed, nodeIds, include)

Find all simple cycles (elementary circuits) of a directed graph, and for undirected graph, find a list of cycles which form a [basis for cycles](https://en.wikipedia.org/wiki/Cycle_basis) of graph.

References:

- [Detect all of the cycles in an undirected graph.](https://www.geeksforgeeks.org/print-all-the-cycles-in-an-undirected-graph/)

- Detect all of the cycles in a directed graph: [Johnson's algorithm ](https://www.cs.tufts.edu/comp/150GA/homeworks/hw1/Johnson%2075.PDF).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph Instance |
| directed | boolean | false | Whether the graph is directed, use the value of `graph.get('directed')` by default. ｜ |
| nodeIds | string[] | false | The nodes that should be included in or excluded from the cycles. If not configured, return all of the cycles.｜ |
| include | boolean | false | If it is `true`, the returned cycles shuld include one of the nodes in `nodeIds`, otherwise the cycles should not have any nodes in `nodeIds`. `true` by default.｜ |

**Return**

- Type of return value: [{[key: string]: Node}]
- Return a list of cyles. Each cycle is an object, whose key is a node ID and whose value is its next node in the cycle.

**Usage**

```javascript
const { detectAllCycles } = Algorithm;

const allCycles = detectAllCycles(graph, true);

// Find all cycles that includes node B
const allCycleIncludeB = detectAllCycles(graph, true, ['B']);

// Find all cycles that does not includes node B
const allCycleExcludeB = detectAllCycles(graph, false, ['B'], false);
```

### findShortestPath(graph, start, end, directed, weightPropertyName)

Compute the shortest path between two nodes in the graph.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph Instance |
| start | INode / string | true | G6 Node Instance or node ID, indicating the start of the path ｜ |
| end | INode / string | true | G6 Node Instance or node ID, indicating the end of the path ｜ |
| directed | boolean | false | Whether the graph is directed, use the value of `graph.get('directed')` by default. ｜ |
| weightPropertyName | string | false | Configure the edge property as the edge weight. If not configured, every edge has weight 1.｜ |

**Return**

- Type of return value: Object，

```
 {
  length: number, // the length of the path
  path: string[] // the node IDs that form the path
}
```

**Usage**

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
// Find the shortest path between node A and node C in this undirected graph
const { length, path } = findShortestPath(graph, 'A', 'C');
console.log(length, path);
// Expected output: 2, ['A', 'B', 'C']
```

### findAllPath(graph, start, end, directed)

Find all paths between two nodes in the graph.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph Instance |
| start | INode / string | true | G6 Node Instance or node ID, indicating the start of the path ｜ |
| end | INode / string | true | G6 Node Instance or node ID, indicating the end of the path ｜ |
| directed | boolean | false | Whether the graph is directed, use the value of `graph.get('directed')` by default. ｜ |

**Return**

- Type of return value: string[][]
- Return a list of paths, in which each path is an array of node IDs.

**Usage**

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
// Expected output: [['A', 'D', 'F', 'E'], ['A', 'D', 'E'], ['A', 'E']]
```

### getConnectedComponents

Find the connect component of the graph. In the case of a directed graph, the strongly connected components are returned.

Translated with www.DeepL.com/Translator (free version)

Reference:

- Detect the strongly connected components in a directed graph: [Tarjan's Algorithm](http://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm)

  **Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph Instance |
| directed | boolean | false | Whether the graph is directed, use the value of `graph.get('directed')` by default. ｜ |

**Return**

- Type of return value: INode[][]
- Return a list of connected components or strongly-connect components. Each component is a list of node instances.

**Usage**

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

// Connected components
const components = getConnectedComponents(graph, false);
components.forEach((component) => {
  console.log(component.map((node) => node.get('id')));
});
// Expected output: ['A', 'B', 'C', 'D', 'E', 'F'], ['G', 'H']

// Strongly-connected components
const components2 = getConnectedComponents(graph, true);
components2.forEach((component) => {
  console.log(component.map((node) => node.get('id')));
});
// Expected output: ['A'], ['B'], ['C'], ['D', 'E', 'F'], ['G', 'H']
```

### pageRank

The PageRank algorithm assumes that the importance of the current node is determined by the importance of other nodes pointing to it, and that the more inbound links a node receives from other nodes, the more important it is. PageRank is determined by counting the number and quality of links to a node.

Reference:

- [PageRank](https://en.wikipedia.org/wiki/PageRank)

  **Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| graph | IGraph | true | G6 Graph Instance |
| epsilon | number | false | The precision level used to identify whether the calculation is converged. ｜ |
| linkProb | number | false | The the probability that the outgoing links will be visited next, 0.85 by default.｜ |

**Return**

- Type of return value: Object, {[key: string]: number}
- The PageRank value for each node.
