---
title: Update Item Style
order: 1
---

There are three ways to modify the styles for items in G6.

#### Configure When Instantiating Graph

When instantiating a Graph, assign `style` in `defaultNode` or `defaultEdge` to configure the styles for global nodes and global edges respectively.

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 800,
  defaultNode: {
    type: 'circle',
    style: {
      fill: '#fff',
      fontSize: 14,
    },
  },
  defaultEdge: {
    type: 'line-with-arrow',
    style: {
      fill: '#fff',
      fontSize: 14,
    },
  },
});
```

#### Configure style in Data

By this way, you can configure the different nodes and edges in different styles.

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      style: {
        fill: '#fff',
        fontSize: 12,
      },
    },
  ],
};
```

#### update / updateItem

This is a way for updating the [keyShape](/en/docs/manual/middle/elements/shape/shape-keyshape) of a node or an edge.

```javascript
graph.updateItem(node, {
  // The node style
  style: {
    stroke: 'blue',
  },
});
```

For more information about the styles, refer to [Node Style Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#style).
