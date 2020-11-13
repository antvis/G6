---
title: Render/Refresh
order: 1
---

### graph.render()

```javascript
graph.render();
```

Render the graph with data onto the canvas.

### graph.refresh()

Refresh the canvas when the **existing** data items' configurations is changed in the source data.

Attention: If there are some new nodes/edges/combos to be added or some nodes/edges/combos to be removed, use [graph.addItem](./Graph#additemtype-model) / [graph.removeItem](./Graph#removeitemitem) or [graph.changeData](./Graph#changedatadata) instead.

**Usage**

```javascript
graph.refresh();
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
