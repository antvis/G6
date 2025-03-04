---
title: MapNodeSize
---

In graph visualization, the size of a node is usually used to convey the importance or influence of the node. By adjusting the size of the node based on the centrality of the node, we can more intuitively show the importance of each node in the network, helping users better understand and analyze complex network structures.

## Options

### centrality

> [NodeCentralityOptions](#nodecentralityoptions) _\| ((graphData:_ [GraphData](/manual/core-concept/data#图数据graphdata)_) =>_ _Map**&lt;**string, number>)_ **Default:** `type: 'eigenvector'`

The method of measuring the node centrality

- `'degree'`: Degree centrality, measures centrality by the degree (number of connected edges) of a node. Nodes with high degree centrality usually have more direct connections and may play important roles in the network
- `'betweenness'`: Betweenness centrality, measures centrality by the number of times a node appears in all shortest paths. Nodes with high betweenness centrality usually act as bridges in the network, controlling the flow of information
- `'closeness'`: Closeness centrality, measures centrality by the reciprocal of the average shortest path length from a node to all other nodes. Nodes with high closeness centrality usually can reach other nodes in the network more quickly
- `'eigenvector'`: Eigenvector centrality, measures centrality by the degree of connection between a node and other central nodes. Nodes with high eigenvector centrality usually connect to other important nodes
- `'pagerank'`: PageRank centrality, measures centrality by the number of times a node is referenced by other nodes, commonly used in directed graphs. Nodes with high PageRank centrality usually have high influence in the network, similar to the page ranking algorithm
- Custom centrality calculation method: `(graphData: GraphData) => Map<ID, number>`, where `graphData` is the graph data, and `Map<ID, number>` is the mapping from node ID to centrality value

#### NodeCentralityOptions

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

### mapLabelSize

> _boolean \| [number, number]_ **Default:** `false`

Whether to map label size synchronously

### maxSize

> _number \| [number, number] \| Float32Array \| [number, number, number]_ **Default:** `80`

The maximum size of the node

### minSize

> _number \| [number, number] \| Float32Array \| [number, number, number]_ **Default:** `20`

The minimum size of the node

### scale

> _'linear' \| 'log' \| 'pow' \| 'sqrt' \| ((value: number, domain: [number, number], range: [number, number]) => number)_ **Default:** `'log'`

Scale type

- `'linear'`: Linear scale, maps a value from one range to another range linearly, commonly used for cases where the difference in centrality values is small

- `'log'`: Logarithmic scale, maps a value from one range to another range logarithmically, commonly used for cases where the difference in centrality values is large

- `'pow'`: Power-law scale, maps a value from one range to another range using power law, commonly used for cases where the difference in centrality values is large

- `'sqrt'`: Square root scale, maps a value from one range to another range using square root, commonly used for cases where the difference in centrality values is large

- Custom scale: `(value: number, domain: [number, number], range: [number, number]) => number`，where `value` is the value to be mapped, `domain` is the input range, and `range` is the output range
