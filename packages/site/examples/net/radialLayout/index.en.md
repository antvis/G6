---
title: Radial Layout
order: 3
---

Radial Layout will place the nodes to the concentric circles around the `focusNode` according to the shortest path length to `focusNode`.

## Usage

As the demo below, you can deploy it in `layout` while instantiating Graph. it can also be used for [Subgraph Layout](/en/docs/manual/middle/layout/sub-layout). By tuning the parameters, you can adjust the iteration number, compact degree, layout buy cluster, and so on. By tuning the parameters, you can adjust the radial radius, preven node overlappings, relaxed radial, and so on.

- Example 1 : Basic Radial Layout.
- Example 2 : Prevent node overlappings according each node's size.
- Example 3 : Relaxed radial layout allows offsets between nodes on the same level to prevent node overlappings.
- Example 4 : By using the subgraph layout mechanism, we extend nodes by interaction. Try to click node 2.
- Example 5 : Translate the parameters of Radial Layout.
- Example 6 : Cluster the nodes in the same level according to some attribute.
