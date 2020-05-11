---
title: Combo
order: 3
---

Combo inherits from Node. The functions of Node are also available for Combo.

### getChildren()
Get all children including sub nodes and sub combos.

**Return**

- Return the collection of Node and Combo: `{ nodes: INode[], combos: ICombo[] }`


**Usage**

```javascript
const elements = combo.getChildren()
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

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| item | INode / ICombo | true | The item of node or combo |


**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.


**Usage**

```javascript
const node = graph.findById('node1')

// Return true to indicate successful executed.
const result = combo.addChild(node)
```


### addNode(node: string | INode)
Add the Node to the Combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| node | string / INode | true | Node ID or the item of the node |


**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.


### addCombo(combo: ICombo)
Add a sub combo into the combo as the its child.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| combo | ICombo | true | The item of the combo |


**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.


### removeChild(item: ICombo | INode)
Remove the child item (a Node or a Combo).

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| item | INode / ICombo | true | The item of node or combo |


**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.


### removeCombo(combo: ICombo)
Remove a sub combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| combo | ICombo | true | The item of Combo |


**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.


### removeNode(node: string | INode)
Remove a child node.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| node | string / INode | true | Node ID or the item of Node |


**Return**

- The type of return value: `boolean`;
- Return `true` to indicate successful executed.
