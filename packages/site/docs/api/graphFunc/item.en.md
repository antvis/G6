---
title: Item Operation
order: 4
---

## Add/Remove

### graph.addItem(type, model, stack)

Add item(node, edge) to the graph.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> G6 will use the `model` object as the model of the newly added item, and the `model` might be modified. If you do not want it to be modified, use the deep cloned `model` instead.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| type | string | true | The type of the item. Options: `'node'`, `'edge'`. |
| model | Object | true | The data model of the item, refer to [Item Model Properties](/en/docs/api/items/itemProperties). |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

graph.addItem('node', model);
```

### graph.removeItem(item, stack)

Remove the item. When the item is the id of a group, this operation will delete the corresponding group.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('node');
graph.removeItem(item);
```

## Update

### graph.updateItem(item, model, stack)

Update the item with new data model. If there are combos in the graph, after calling updateItem to update the position of a node, call [updateCombo(combo)](/en/docs/api/Graph#updatecombocombo) to update the sizes and positions of the related combos.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The ID or the instance of the item |
| model | Object | true | New data model, refer to [Item Model Properties](/en/docs/api/items/itemProperties) |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
const model = {
  id: 'node',
  label: 'node',
  address: 'cq',
  x: 200,
  y: 150,
  style: {
    fill: 'blue',
  },
};

// Find the item instance by id
const item = graph.findById('node');
graph.updateItem(item, model);
```

### graph.update(item, model, stack)

The same as updateItem(item, model).

### graph.updateCombos()

Update the sizes and positions of all the combos according to the bboxes of its children.

**Usage**

```javascript
// Update all the combos
graph.updateCombos();
```

### graph.updateCombo(combo)

Update the positions and sizes of the combo and all of its ancestors.

**Parameters**

| Name  | Type            | Required | Description                         |
| ----- | --------------- | -------- | ----------------------------------- |
| combo | string / ICombo | true     | The ID or the instance of the combo |

**Usage**

```javascript
// Update a node's position
const node1 = graph.findById('node1');
graph.updateItem(node1, {
  x: 100,
  y: 100,
});

// the combo who contains the node
const comboId = node1.getModel().comboId;

// Update the combo and all its ancestors who contains node1
graph.updateCombo(comboId);
```

### graph.updateComboTree(item, parentId)

Update the hierarchy structure of the combo, such as move a combo into another one.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / INode / ICombo | The ID or the item of the node/combo to be updated |
| parentId | string | undefined | The ID of the new parent combo, undefined means updating the item with no parent |

**Usage**

```
// move combo1 out of its parent combo. combo1 will be in the same hierarchy level as its old parent.
graph.updateComboTree('combo1')

// move combo1 into combo2. combo1 will be the child of combo2.
graph.updateComboTree('combo1', 'combo2')
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

## Configure

### graph.node(nodeFn)

Set the style and other configurations for each node.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------------------------------- |
| nodeFn | Function | true     | Return the configurations for each node. |

**Usage**

```javascript
graph.node((node) => {
  return {
    id: node.id,
    type: 'rect',
    style: {
      fill: 'blue',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.edge(edgeFn)

Set the style and other configurations for each edge.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name   | Type     | Required | Description                              |
| ------ | -------- | -------- | ---------------------------------------- |
| edgeFn | Function | true     | Return the configurations for each edge. |

**Usage**

```javascript
graph.edge((edge) => {
  return {
    id: edge.id,
    type: 'cubic-horizontal',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

### graph.combo(comboFn)

Set the style and other configurations for each combo.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> this funcion must **be called before graph.render()**. It does not take effect otherwise.

**Parameters**

| Name    | Type     | Required | Description                               |
| ------- | -------- | -------- | ----------------------------------------- |
| comboFn | Function | true     | Return the configurations for each combo. |

**Usage**

```javascript
graph.combo((combo) => {
  return {
    id: combo.id,
    type: 'rect',
    style: {
      stroke: 'green',
    },
  };
});

graph.data(data);
graph.render();
```

## Show/Hide

### graph.showItem(item, stack)

Show the item. If the item is a node, the related edges will be shown in the same time. Different from that, [item.show()](/en/docs/api/items/itemMethods#itemshow) only show the node item itself.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('nodeId');
graph.showItem(item);

// equal to
graph.showItem('nodeId');
```

### graph.hideItem(item, stack)

Hide the item. If the item is a node, the related edges will be hidden in the same time. Different from that, [item.hide()](/en/docs/api/items/itemMethods#itemhide) only hide the node item itself.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The id or the instance of the item. |
| stack | boolean | false | Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
// Find the item instance by id
const item = graph.findById('nodeId');
graph.hideItem(item);

// Equal to
graph.hideItem('nodeId');
```
