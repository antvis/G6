---
title: Sub-graph Layout
order: 3
---

## Subgraph Layout

At present, the subgraph layout mechanism is independent to the graph layout. You can instantiate the layout method and load the data of subgraph onto the layout instance. This mechanism allows users to utilize G6's layout algorithms to calculate the node positions, and render the graph with another rendering engine.

### Usage

```javascript
// Instantiate the Layout
const subgraphLayout = new G6.Layout['force']({
  center: [500, 450],
});

// Initialize the layout with sugbraph data
subgraphLayout.init({
  nodes: subGraphNodes,
  edges: subGraphEdges,
});

// Execute the layout
subgraphLayout.execute();

// Update the node positions after subgraph layout
graph.positionsAnimate();
```