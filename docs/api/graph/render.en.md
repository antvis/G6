---
title: render/refresh/pain
order: 10
---

### graph.render()

Render the graph with data onto the canvas.

**Usage**

```javascript
graph.render();
```

### graph.renderCustomGroup(data, groupType)

Render a node group according to the data.

**Parameters**

| Name      | Type   | Required | Description                                         |
| --------- | ------ | -------- | --------------------------------------------------- |
| data      | Object | true     | The data to be rendered                             |
| groupType | string | true     | Type of node group. Options: `'circle'` or `'rect'` |

**Usage**

```javascript
const data = {
  nodes: [
    {
      id: 'node1',
      groupId: 'group1',
      label: 'node1',
    },
    {
      id: 'node2',
      groupId: 'group1',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
  groups: [
    {
      id: 'group1',
      title: {
        text: 'My Group 1',
        stroke: '#444',
        offsetX: -20,
        offsetY: 30,
      },
    },
  ],
};

// graph is an instance of Graph
graph.renderCustomGroup(data, 'circle');
```

### graph.refresh()

Refresh the canvas when the **existing** data items' configurations is changed in the source data.

Attention: If there are some new nodes/edges/combos to be added or some nodes/edges/combos to be removed, use [graph.addItem](./Graph#additemtype-model) / [graph.removeItem](./Graph#removeitemitem) or [graph.changeData](./Graph#changedatadata) instead.

**Usage**

```javascript
graph.refresh();
```

### graph.refreshItem(item)

Refresh the item.

**Parameters**

| Name | Type            | Required | Description                         |
| ---- | --------------- | -------- | ----------------------------------- |
| item | string / Object | true     | The id or the instance of the item. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('node');
graph.refreshItem(item);
```

### graph.refreshPositions()

When the positions of nodes in their data models are changed, refresh the canvas to paint the nodes with new positions. It will update the edges in the same time.

**Usage**

```javascript
graph.refreshPositions();
```

### graph.paint()

Repaint the canvas. Use it after changing the item's style or state.

**Usage**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```

### graph.setAutoPaint(auto)

Whether to repaint the canvas automatically after updating or deleting items.

**Parameters**

| Name | Type    | Required | Description                                  |
| ---- | ------- | -------- | -------------------------------------------- |
| auto | Boolean | true     | Whether to repaint the canvas automatically. |

**Usage**

```javascript
const item = e.item;
const graph = this.graph;

const autoPaint = graph.get('autoPaint');
graph.setAutoPaint(false);

graph.setItemState(item, 'selected', true);

graph.paint();
graph.setAutoPaint(autoPaint);
```
