---
title: Update Label
order: 0
---

There are three ways to modify the styles for labels in G6.

#### Configure When Instantiating Graph
When instantiating a Graph, assign `labelCfg` in `defaultNode` or `defaultEdge` to configure the styles for labels of global nodes and global edges respectively.


```javascript
const graph = new G6.Graph({
    container: "mountNode",
    width: 1000,
    height: 800,
    defaultNode: {
      shape: "node",
      labelCfg: {
        style: {
          fill: "#fff",
          fontSize: 14
        }
      }
    },
    defaultEdge: {
      shape: "line-with-arrow",
      labelCfg: {
        style: {
          fill: "#fff",
          fontSize: 14
        }
      }
    }
  });
```

#### Configure Style in Data

```javascript
const data = {
	nodes: [
    {
    	id: 'node1',
      label: 'node1',
      labelCfg: {
      	style: {
        	fill: '#fff',
          fontSize: 12
        }
      }
    }
  ]
}
```

#### update/updateItem

When using `update/updateItem` to update a node or edge, the label can be updated as well.

```javascript
graph.updateItem(node, {
  // The style of the node
  style: {
  	stroke: 'blue'
  },
  // The configurations of the label on the node
	labelCfg: {
  	style: {
    	fill: '#fff',
      fontSize: 12
    }
  }
})
```

For more information about the label styles, refer to [Label on Node](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg) and [Label on Edge](/en/docs/manual/middle/elements/edges/defaultEdge/#label-and-labelcfg).
