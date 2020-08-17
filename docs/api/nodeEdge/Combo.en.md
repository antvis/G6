---
title: Combo
order: 3
---

Combo inherits from Node. The functions of Node are also available for Combo. This document will only introduce the common functions for Combo Class. All the built-in combos can be found in [Built-in Combos Doc](/en/docs/manual/middle/elements/combos/defaultCombo) and [demo](/en/examples/item/defaultCombos), Custom Combo can be found in [Custom Combo Doc](/en/docs/manual/advanced/custom-combo) and [demo](/en/examples/item/customCombo).

### getChildren()

Get all children including sub nodes and sub combos.

**Return**

- Return the collection of Node and Combo: `{ nodes: INode[], combos: ICombo[] }`

**Usage**

```javascript
const elements = combo.getChildren();
```

### getNodes()

Get sub nodes of the combo。

**Return**

- The type of return value： `INode[]`.

### getCombos()

Get sub combos of the combo。

**Return**

- The type of return value： `ICombo[]`.

### addChild(item: INode | ICombo)

Add the `item` (Node or Combo) into the Combo as its child.

**Parameters**

| Name | Type           | Required | Description               |
| ---- | -------------- | -------- | ------------------------- |
| item | INode / ICombo | true     | The item of node or combo |

**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.

**Usage**

```javascript
const node = graph.findById('node1');

// Return true to indicate successful executed.
const result = combo.addChild(node);
```

### addNode(node: string | INode)

Add the Node to the Combo.

**Parameters**

| Name | Type           | Required | Description                     |
| ---- | -------------- | -------- | ------------------------------- |
| node | string / INode | true     | Node ID or the item of the node |

**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.

### addCombo(combo: ICombo)

Add a sub combo into the combo as the its child.

**Parameters**

| Name  | Type   | Required | Description           |
| ----- | ------ | -------- | --------------------- |
| combo | ICombo | true     | The item of the combo |

**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.

### removeChild(item: ICombo | INode)

Remove the child item (a Node or a Combo).

**Parameters**

| Name | Type           | Required | Description               |
| ---- | -------------- | -------- | ------------------------- |
| item | INode / ICombo | true     | The item of node or combo |

**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.

### removeCombo(combo: ICombo)

Remove a sub combo from the parent. The `combo` will still exist on the graph but it is not belong to the parent combo any more. If you want to delete the combo from the graph, call [graph.removeItem](/en/docs/api/Graph#removeitemitem) instead

**Parameters**

| Name  | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| combo | ICombo | true     | The item of Combo |

**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.

### removeNode(node: INode)

Remove a child node from the combo. The node will still exist on the graph but it is not belong to the combo any more. If you want to delete the node from the graph, call [graph.removeItem](/en/docs/api/Graph#removeitemitem) instead

**Parameters**

| Name | Type  | Required | Description                 |
| ---- | ----- | -------- | --------------------------- |
| node | INode | true     | Node ID or the item of Node |

**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.
