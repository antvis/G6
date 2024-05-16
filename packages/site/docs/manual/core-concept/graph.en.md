---
title: Graph
order: 0
---

## Overview

### Definition of Graph

In Chinese, the character "图" (Graph) can often be used to represent many different concepts, such as image,shape,and chart or diagram,etc.

In Graph Theory, a graph is a mathematical structure used to model pairwise relationships between objects, which we typically represent with nodes (or Vertex) and edges (or Link) to denote the objects and the relationships between them.

The "graph" in G6:

- Conceptually, it is the "graph" from Graph Theory, a data structure composed of nodes and edges.
- Visually, a "graph" is a figure composed of a set of graphical elements representing nodes and edges.
- In terms of code implementation, a "graph" is a class capable of transforming data into a graphical display.

### Types of Graph

Graph Theory categorizes graphs into many different types based on their structure and properties, such as:

- Directed Graph and Undirected Graph
- Weighted Graph and Unweighted Graph
- Simple Graph and Multigraph
- Cyclic Graph and Acyclic Graph
- Connected Graph and Disconnected Graph
- Complete Graph and Non-Complete Graph
- Sparse Graph and Dense Graph
- ...

In G6, we provide a universal graph representation capable of depicting the various types of graphs mentioned above, for example:

- Directed Graph and Undirected Graph: Defined by the start and end points of the edges.
- Weighted Graph and Unweighted Graph: Defined by the `weight` data on the edges.
- Simple Graph and Multigraph: Defined by the uniqueness of the edges.
- ...

### Use Scenarios

Graphs are a very versatile data structure that can be used to represent a variety of scenarios, such as:

- Social Networks
- Knowledge Graphs
- Traffic Networks
- Power Grids

In G6, we provide a rich expression capability for graphs that can meet the needs of different scenarios. We also offer a wealth of interactive and animated effects to make the graphs more vivid and intuitive.

## Use G6 Graph

To create a Graph with G6, you first need to import the `@antv/g6` library, and then instantiate the Graph class.

> For installation instructions, refer to: [Getting Started - Installation](/en/manual/getting-started/installation)

The Graph class accepts an instantiation argument object, known as **options** (Options, in visualization theory it is referred to as: `Specification`), which is used to configure the graph's data, element styles, layout, interactions, etc.

```typescript
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  // ... other other options
});
```

:::warning{title=note}
The instantiation process only configures the basic information of the graph. To render the graph onto the page, you still need to call the `render` method.
:::

- To learn how to quickly create a graph, please refer to [Quick Start](/en/manual/getting-started/quick-start).
- For more detailed information about the configuration options, please refer to [Method](/en/api/graph/method).
- To gain an in-depth understanding of the concepts within the configuration options, please read the rest of the content in this section.
