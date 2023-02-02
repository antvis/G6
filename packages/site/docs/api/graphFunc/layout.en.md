---
title: Layout
order: 10
---

There are several basic layout algorithms in G6 3.1. For more information, please refer to [Graph Layout API](/en/docs/api/graphLayout/guide) or [TreeGraph Layout API](/en/docs/api/treeGraphLayout/guide).

### graph.layout()

Re-layout the graph with current layout configurations in graph.

**Usage**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  layout: {
    type: 'force',
  },
  modes: {
    default: ['drag-node'],
  },
});

graph.data({
  nodes: data.nodes,
  edges: data.edges.map((edge, i) => {
    edge.id = 'edge' + i;
    return Object.assign({}, edge);
  }),
});

graph.render();

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

graph.on('node:dragstart', (e) => {
  // Relayout when dragging the node
  graph.layout();
  refreshDragedNodePosition(e);
});

graph.on('node:drag', (e) => {
  refreshDragedNodePosition(e);
});

graph.on('node:dragend', (e) => {
  e.item.get('model').fx = null;
  e.item.get('model').fy = null;
});
```

### graph.updateLayout(cfg)

Update the layout configurations.

1. If there is `type` in `cfg`, `type` is a string and it is different from current layout method, `updateLayout(cfg)` will change the layout method and relayout;
1. If there is no `type` in `cfg`, `updateLayout(cfg)` will relayout with current layout method and new layout configurations.

**Parameters**

| Name | Type   | Required | Description                   |
| ---- | ------ | -------- | ----------------------------- |
| cfg  | Object | true     | Configurations of new layout. |

**Usage**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
    center: [500, 300],
  },
  animate: true,
});
graph.data(data);
graph.render();

// configure the layout while instantializing the graph, and update the layout in somewhere you want.
graph.updateLayout({
  radius: 200,
  startAngle: Math.PI / 4,
  endAngle: Math.PI,
  divisions: 5,
  ordering: 'degree',
});
```

### destroyLayout()

Destroy the layout algorithm. After that, the `changeData` will not place the new nodes with origin layout configurations.

**Usage**

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 1000,
  height: 600,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
    center: [500, 300],
  },
  animate: true,
});
graph.data(data);
graph.render();
graph.destroyLayout();
// If there is no position info in data2, the new nodes will be placed according to position initing problem. If the position info exists, the new node will be placed according to its position info
graph.changeData(data2);
```
