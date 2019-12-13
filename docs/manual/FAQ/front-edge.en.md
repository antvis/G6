---
title: Render the Edge on the Top
order: 6
---

## Problem
How to render the edges on the top of nodes in G6 3.x?

## Solution
In G6 3.x, nodes are rendered on the top of edges by default. All the nodes are grouped by a [Graphics Group](/en/docs/manual/advanced/keyconcept/graphics-group) named `nodeGroup`, and all the edges are grouped by another [Graphics Group](/en/docs/manual/advanced/keyconcept/graphics-group) named `edgeGroup`. You can modify the visual levels of the groups to change the visual levels of all nodes and all edges. After changing the visual levels, do remember to call `graph.paint()` to repaint the graph.

```javascript
 document.getElementById('changeView').addEventListener('click', (evt) => {
      const edgeGroup = graph.get('edgeGroup'); // Get the defuall group of edges
      edgeGroup.toFront(); // Move up the edge group
      graph.paint(); // Must be called to repaint the graph
    })
```

If you want to move up a single edge, please follow the steps:
1. Configure `groupByTypes: false` when instantiating a Graph to turnoff grouping by items' type. The visual levels of the items will correnspond to the generation order of them.
2. Call `toFront()` and `toBack()` to adjust the visual level of single item.
3. Call `graph.paint()` to repaint the graph after level adjustment.

```javascript
const graph = new G6.Graph({
  // ... Other configurations for graph
  groupByTypes: false // Turnoff grouping by items' type
});
document.getElementById('changeView').addEventListener('click', (evt) => {
      const edge = graph.findById('edge1'); // Find an edge according to the id
      const node = graph.findById('node1'); // Find a node according to the id
      edge.toFront(); // Move up the edge
      node.toBack(); // Move back the node
      graph.paint(); // Must be called to repaint the graph
    })
```

Refer to <a href='https://github.com/antvis/G6/issues/817' target='_blank'>#issues 817</a> for detail.
