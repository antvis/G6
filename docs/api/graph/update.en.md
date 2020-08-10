---
title: graph.update*
order: 10
---

### graph.updateItem(item, model, stack)

Update the item with new data model. If there are combos in the graph, after calling updateItem to update the position of a node, call [updateCombo(combo)](/en/docs/api/Graph#updatecombocombo) to update the sizes and positions of the related combos.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| item | string / Object | true | The ID or the instance of the item |
| cfg | Object | false | New data model, refer to [Item Model Properties](/en/docs/api/nodeEdge/itemProperties) |
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
