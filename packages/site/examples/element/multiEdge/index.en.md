---
title: Multiple Edges Between 2 Nodes
order: 9
---

Process the parellel edges whose end nodes are the same by the built-in Util method `G6.Util.processParallelEdges(data.edges)`. If the edges are loop, they will be asigned `type: 'loop'` with different position and loop height to avoid edge overlappings. If the edges are not loop, they will be assigned `type: quadratic` with different control points to avoid edge overlappings. To achieve better rendering result, we recommended configure the `linkCenter` to be `true` while instantiating the Graph.
