---
title: Sublayout Pipeline
order: 4
---

## Sublayout Pipeline

**Supports by v4.3.0 and latter versions**. Sublayout pipeline supports several sublayouts on different subgraphs by configuring `Graph.layout`.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*TaymQYKOJkgAAAAAAAAAAAAAARQnAQ' alt="img" width='400px'>

### Usage

You can configure `layout.pipes` array when initializing the graph instance. Each item in the array is a sublayout pipe, and it contains the infomation about the layout type(`type`), configurations for this layout type, and node filtering function (`nodesFilter`). NOTICE that, if some nodes belong to several sublayouts in the same time, the result positions of these nodes will follow the last sublayout.

The format of the `layout.pipes`:

```javascript
type Pipes =
  {
    // the name of the layout method for this subgraph
    type: 'random' | 'radial' | 'mds' | 'circular' | 'fruchterman' | 'force' | 'gForce' | 'dagre' | 'concentric' | 'grid' | 'forceAtlas2',
    // node filtering function, the parameter is the node data, and it returns a boolean to indicate if the node belongs to this subgraph
    nodesFilter: (node: NodeData) => boolean;
    ... // the configurations for this layout method, refer to the docs for different layout method pls
  }[];
```

Usage demo:

```javascript
// configure the layout.pipes when initializing the graph instance
const graph = new G6.Graph({
  // ...       // other graph configurations
  layout: {
    pipes: [
      {
        // the name of the layout method for this subgraph
        type: 'circular',
        // indicate if the node belongs to the subgraph
        nodesFilter: (node) => node.subGraphId === '1',
        // ... other configurations for this layout method
      },
      {
        type: 'grid',
        nodesFilter: (node) => node.subGraphId === '2',
        // other configurations for this layout method
        begin: [100, 0],
      }
    ]
  },
});
```
