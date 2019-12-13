---
title: Update Item's Style
order: 1
---

There are three ways to modify the styles for items in G6.

#### Configure When Instantiating Graph

When instantiating a Graph, assign `style` in `defaultNode` or `defaultEdge` to configure the styles for global nodes and global edges respectively.

```javascript
const graph = new G6.Graph({
    container: "mountNode",
    width: 1000,
    height: 800,
    defaultNode: {
      shape: "circle",
      style: {
        fill: "#fff",
        fontSize: 14
      }
    },
    defaultEdge: {
      shape: "line-with-arrow",
      style: {
        fill: "#fff",
        fontSize: 14
      }
    }
  });
```

#### Configure style in Data
```javascript
const data = {
	nodes: [
    {
    	id: 'node1',
      label: 'node1',
      style: {
        fill: '#fff',
        fontSize: 12
      }
    }
  ]
}
```

#### update / updateItem

```javascript
graph.updateItem(node, {
  // The node style
  style: {
  	stroke: 'blue'
  }
})
```

For more information about the styles, refer to [Node Style Properties](/en/docs/manual/middle/elements/nodes/defaultNode/#style).
