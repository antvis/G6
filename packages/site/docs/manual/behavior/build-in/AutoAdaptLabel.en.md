---
title: AutoAdaptLabel
---

## Overview

Auto-adapt label display is a dynamic label management strategy designed to intelligently adjust which labels should be displayed or hidden based on factors such as spatial allocation of the current visible range and node importance. By analyzing the visible area in real-time, it ensures that users receive the most relevant and clear information display in different interaction scenarios, while avoiding visual overload and information redundancy.

## Usage Scenarios

This interaction is mainly used for:

- Node size changes
- Graph scaling

## Online Experience

<embed src="@/common/api/behaviors/auto-adapt-label.md"></embed>

## Basic Usage

Add this interaction in the graph configuration

**1. Quick Configuration (Static)**

Declare directly using a string form. This method is simple but only supports default configuration and cannot be dynamically modified after configuration:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: ['auto-adapt-label'],
});
```

**2. Object Configuration (Recommended)**

Configure using an object form, supporting custom parameters, and can dynamically update the configuration at runtime:

```javascript
const graph = new Graph({
  // Other configurations...
  behaviors: [
    {
      type: 'auto-adapt-label',
      throttle: 200, // Throttle time
      padding: 10, // Extra spacing when detecting overlap
    },
  ],
});
```

## Configuration Options

| Option    | Description                                                                                                                                                                                                                                                                                      | Type                                                                                                                              | Default            | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| type      | Interaction type name                                                                                                                                                                                                                                                                            | string                                                                                                                            | `auto-adapt-label` | √        |
| enable    | Whether to enable this interaction                                                                                                                                                                                                                                                               | boolean \| ((event: [Event](/en/api/event#event-object-properties)) => boolean)                                                   | true               |          |
| throttle  | Label update throttle time (ms)                                                                                                                                                                                                                                                                  | number                                                                                                                            | 100                |          |
| padding   | Extra spacing when detecting label overlap                                                                                                                                                                                                                                                       | number \| number[]                                                                                                                | 0                  |          |
| sort      | Custom sorting function, sorting elements from high to low importance, with higher importance elements having higher label display priority. Generally, combo > node > edge                                                                                                                      | (a: ElementDatum, b: ElementDatum) => -1 \| 0 \| 1                                                                                |                    |          |
| sortNode  | Sort nodes from high to low importance, with higher importance nodes having higher label display priority. Several built-in [centrality algorithms](#nodecentralityoptions) are available, or a custom sorting function can be used. Note that if `sort` is set, `sortNode` will not take effect | [NodeCentralityOptions](#nodecentralityoptions) \| (nodeA: [NodeData](/en/manual/data#nodedata), nodeB: NodeData => -1 \| 0 \| 1) | `type: 'degree'`   |          |
| sortEdge  | Sort edges from high to low importance, with higher importance edges having higher label display priority. By default, it is sorted according to the order of data. Note that if `sort` is set, `sortEdge` will not take effect                                                                  | (edgeA: [EdgeData](/en/manual/data#edgedata), edgeB: EdgeData) => -1 \| 0 \| 1                                                    |                    |          |
| sortCombo | Sort groups from high to low importance, with higher importance groups having higher label display priority. By default, it is sorted according to the order of data. Note that if `sort` is set, `sortCombo` will not take effect                                                               | (comboA: [ComboData](/en/manual/data#combodata), comboB: ComboData) => -1 \| 0 \| 1                                               |                    |          |

### NodeCentralityOptions

Methods for measuring node centrality

- `'degree'`: Degree centrality, measured by the degree of the node (number of connected edges). Nodes with high degree centrality usually have more direct connections and may play important roles in the network
- `'betweenness'`: Betweenness centrality, measured by the number of times a node appears in all shortest paths. Nodes with high betweenness centrality usually act as bridges in the network, controlling the flow of information
- `'closeness'`: Closeness centrality, measured by the reciprocal of the sum of the shortest path lengths from the node to all other nodes. Nodes with high closeness centrality can usually reach other nodes in the network more quickly
- `'eigenvector'`: Eigenvector centrality, measured by the degree of connection of the node to other central nodes. Nodes with high eigenvector centrality are usually connected to other important nodes
- `'pagerank'`: PageRank centrality, measured by the number of times a node is referenced by other nodes, commonly used in directed graphs. Nodes with high PageRank centrality usually have high influence in the network, similar to webpage ranking algorithms

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

## Practical Example

<Playground path="behavior/auto-adapt-label/demo/basic.js" rid="default-auto-adapt-label"></Playground>
