---
title: G6.TreeGraph(cfg)
order: 3
---

Initialize a tree graph.

```ts
// highlight-start
new G6.TreeGraph(cfg: GraphOptions) => TreeGraph
// highlight-end

const treeGraph = new G6.TreeGraph({
  container: 'mountNode',
  width: 800,
  height: 600,
  modes: {
    default: [
      {
        type: 'collapse-expand',
        onChange(item, collapsed) {
          const icon = item.get('group').findByClassName('collapse-icon');
          if (collapsed) {
            icon.attr('symbol', EXPAND_ICON);
          } else {
            icon.attr('symbol', COLLAPSE_ICON);
          }
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  layout: {
    type: 'dendrogram',
    direction: 'LR', // H / V / LR / RL / TB / BT
    nodeSep: 50,
    rankSep: 100,
    radial: true,
  },
});
```

If you are going to visualize a tree, TreeGraph of G6 is more appropriate than Graph. The main differences between `G6.TreeGraph` and `G6.Graph` are data structure and built-in layout algorithms:

- Data structure: In G6, the tree data has nested structure. Edges are implicit in it. Each node data has `id` and `children` properties at least:

```javascript
const data = {
  id: 'root',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};
```

- Tree layout algorithms:
  - Tree layout algorithms do not modify the source data. it generates a new data instead. And the source data will be a property of the new data. This mechanism will reduce the complexity of transformation from nested data to nodes and edges in graph.
  - The layout will be re-calculated after adding / deleting / expanding / collapsing nodes on the tree.

TreeGraph is inherited from Graph, please refer to [G6.Graph(GraphOptions)](/en/docs/api/Graph) for its configurations. One difference is the `layout` option. There are four layout algorithms for tree in G6: dendrogram, compactBox, mindmap, and indented, whose detailed configurations are listed in [TreeGraph Layout](/en/docs/api/tree-graph-layout/guide).
