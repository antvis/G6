---
title: Force-directed Layout
order: 0
---

Force-directed layout is a set of algorithms which are imporved and extended by lots of researchers based on the earliest classical force-directed algorithm. They simulate the nodes and edges in the graph as the physical objects. There are attractive forces and repulsive forces between nodes to iteratively move them to reach a reasonable layout.

## Usage

The classical force-directed layout in G6 comes from d3.js. As the demo below, you can deploy it in `layout` while instantiating Graph. it can also be used for [Subgraph Layout](/en/docs/manual/middle/layout/sub-layout).

- Example 1 : Basic force-directed layout and dragging interactions.
- Example 2 : Prevent node overlappings.
- Example 3 : Adjust the link distances and forces for different nodes.
- Example 4 : Fix the dragged node.
- Example 5 : Translate the layout parameters in dynamic.
- Example 6 : The bubbles layout and interactions.
- Example 7 : Constrain the layout in a certain area.
