---
title: Combo Operation
order: 6
---

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

### graph.collapseCombo(combo)

Collapse a Combo.

**Parameters**

| Name  | Type            | Required | Description                                           |
| ----- | --------------- | -------- | ----------------------------------------------------- |
| combo | string / ICombo | true     | The ID of the combo or the combo item to be collapsed |

**Usage**

```javascript
graph.collapseCombo('combo1')
```

### graph.expandCombo(combo)

Expand a Combo.

**Parameters**

| Name  | Type            | Required | Description                                          |
| ----- | --------------- | -------- | ---------------------------------------------------- |
| combo | string / ICombo | true     | The ID of the combo or the combo item to be expanded |

**Usage**

```javascript
graph.expandCombo('combo1')
```

### graph.collapseExpandCombo(combo)

Expand the `combo` if it is collapsed. Collapse the `combo` if it is expanded.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| combo | string / ICombo | true | The ID of the combo or the combo item to be collapsed or expanded |

**Usage**

```javascript
graph.collapseExpandCombo('combo1')
```

### graph.createCombo(combo, elements, stack)

Create a new combo with existing nodes or combos to be its children.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| combo | string / ICombo | true | The ID or the configuration of the combo to be created |
| elements | string[] | The IDs of the existing nodes or combos to be the children of the newly created combo |
| stack | boolean | false | **Supported by v4.7.17 and later versions** Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |


**Usage**

```javascript
// The first parameter is the id of the combo to be created
graph.createCombo('combo1', ['node1', 'node2', 'combo2'])

// The first parameter is the configuration of the combo to be created
graph.createCombo({
  id: 'combo1',
  style: {
    fill: '#f00'
  }
}, ['node1', 'node2', 'combo2'])
```

### graph.uncombo(combo, stack)

Ungroup the combo, which deletes the combo itself, and appends the children of the combo to its parent(if it exists).

**Parameters**

| Name  | Type            | Required | Description                                        |
| ----- | --------------- | -------- | -------------------------------------------------- |
| combo | string / ICombo | true     | The ID of the item or the combo item to be updated |
| stack | boolean | false | **Supported by v4.7.17 and later versions** Whether to push the operator into the undo & redo stack. If the `enableStack` is `true`, this operation will be automatically pushed into the stack by default. Set `stack` to be `false` if you do not want it. |

**Usage**

```javascript
graph.uncombo('combo1')
```

### graph..updateCombos()

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

```javascript
// move combo1 out of its parent combo. combo1 will be in the same hierarchy level as its old parent.
graph.updateComboTree('combo1')

// move combo1 into combo2. combo1 will be the child of combo2.
graph.updateComboTree('combo1', 'combo2')
```


### Comparison for Combo and Hull

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mD9LQamLud8AAAAAAAAAAAAAARQnAQ' alt='combo-hull' width='750'/>