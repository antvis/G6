---
title: Combo
order: 3
---

Combo inherits from Node，The functions of Node are also available for Combo.

### getChildren()
Get all sub Item(Node or Combo).

**Return**

Return collection of Node & Combo: `{ nodes: INode[], combos: ICombo[] }`


**Usage**

```javascript
const elements = combo.getChildren()
```


### getNodes()
Get nodes in Combo。

**Return**

The type of return value： `INode[]`。


### getCombos()
Get combos in Combo。

**Return**

The type of return value： `ICombo[]`。


### addChild(item: INode | ICombo)
Add the Item(Node or Combo) to the Combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| item | INode | ICombo | true | the item of node or combo |


**Return**

The type of return value： `boolean`；
Return true to indicate successful exec.


**Usage**

```javascript
const node = graph.findById('node1')

// Return true to indicate successful exec.
const result = combo.addChild(node)
```


### addNode(node: string | INode)
Add the Node to the Combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| node | string | INode | true | node id or the item of node |


**Return**

The type of return value： `boolean`；
Return true to indicate successful exec.


### addCombo(combo: ICombo)
Add the combo to the combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| combo | ICombo | true | the item of combo |


**Return**

The type of return value： `boolean`；
Return true to indicate successful exec.


### removeChild(item: ICombo | INode)
Remove the item(Node or Combo) to the Combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| item | INode | ICombo | true | the item of node or combo |


**Return**

The type of return value： `boolean`；
Return true to indicate successful exec.


### removeCombo(combo: ICombo)
Remove the combo to the Combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| combo | ICombo | true | the item of Combo |


**Return**

The type of return value： `boolean`；
Return true to indicate successful exec.


### removeNode(node: string | INode)
Remove the node to the Combo.

**Parameters**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| node | string | INode | true | node id or the item of Node |


**Return**

The type of return value： `boolean`；
Return true to indicate successful exec.
