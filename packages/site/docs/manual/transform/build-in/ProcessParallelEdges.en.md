---
title: ProcessParallelEdges
---

Parallel Edges refer to multiple edges existing between two nodes in a graph structure. These edges share the same source and target nodes but may represent different relationships or attributes. To avoid edge overlap and confusion, two methods are provided for handling parallel edges: (1) Bundle Mode: Bundles parallel edges together and separates them from other edges by altering their curvature; (2) Merge Mode: Merges parallel edges into a single aggregated edge.

## Options

### distance

> _number_

The distance between edges, only valid for bundling mode

### edges

> _string[]_

The edges to be handled, all edges by default

### <Badge type="success">Required</Badge> mode

> _'bundle' \| 'merge'_ **Default:** `'bundle'`

Processing mode

- '`merge`': Merge parallel edges into one edge which is suitable for cases where parallel edges do not need to be distinguished

- '`bundle`': Each edge will be bundled with all other parallel edges and separated from them by varying the curvature. If the number of parallel edges in a group is odd, the central edge will be drawn as a straight line, and the others will be drawn as curves

### style

> _PathStyleProps_ _\| ((prev:_ [EdgeData](/api/graph/option#edgedata)_[]) =>_ _PathStyleProps)_

The style of the merged edge, only valid for merging mode
