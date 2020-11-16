---
title: Find Element
order: 5
---

### graph.getNodes()

Get all the node items in the graph.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> it returns the items but not data models.

**Return**

- Type of the return value: Array;
- Return the node items in the graph.

**Usage**

```javascript
const nodes = graph.getNodes();
```

### graph.getEdges()

Get all the edge items in the graph.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> it returns the items but not data models.

**Return**

- Type of the return value: Array;
- Return the edge items in the graph.

**Usage**

```javascript
const edges = graph.getEdges();
```

### graph.getCombos()

Get all the combo items in the graph.

**Return**

- Type of the return value: Array;
- Return the combo items in the graph.

**Usage**

```javascript
const combos = graph.getCombos();
```

### graph.getComboChildren(combo)

Get the children of the `combo`.

**Parameters**

| Name  | Type            | Required | Description                              |
| ----- | --------------- | -------- | ---------------------------------------- |
| combo | string / ICombo | true     | The ID or of the combo or the combo item |

**Return**

- Type of the return value: Object. Formated as:

```javascript
{
    nodes: INode[],
    edges: ICombo[]
}
```

- Return the children (sub nodes and combos) of the `combo`.

**Usage**

```
const elements: {
  nodes: INode[],
  combos: ICombo[]
} = graph.getComboChildren('combo1')
```

### graph.getNeighbors(node, type)

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| node | string / INode | true | node ID or the node instance |
| type | 'source' / 'target' / undefined | false | The type of the neighbors, 'source': only return the source nodes; 'target': only return the target nodes, undefined: return all of the neighbors |

**Return**

- Type of the return value: Array;
- Return a list of node items.

**Usage**

```javascript
const neighbors = graph.getNeighbors('node1', 'source');
```

### graph.find(type, fn)

Find single item according to a rule.

**Parameters**

| Name | Type     | Required | Description                                    |
| ---- | -------- | -------- | ---------------------------------------------- |
| type | string   | true     | Type of the item. Options: `'node'`, `'edge'`. |
| fn   | Function | true     | Rule for searching.                            |

**Return**

- Type of the return value: Object;
- If there are items that match the rule, return the first one. Return `undefined` otherwise.

**Usage**

```javascript
const findNode = graph.find('node', (node) => {
  return node.get('model').x === 100;
});
```

### graph.findById(id)

Find an item by id.

**Parameters**

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| id   | string | true     | 元素 ID     |

**Return**

- Type of the return value: Object;
- If there are items that match the rule, return the first one. Return `undefined` otherwise.

**Usage**

```javascript
const node = graph.findById('node');
```

### graph.findAll(type, fn)

Find all the items that match the rule.

**Parameters**

| Name | Type     | Required | Description                                        |
| ---- | -------- | -------- | -------------------------------------------------- |
| type | string   | true     | The type of the item. Options: `'node'`, `'edge'`. |
| fn   | Function | true     | Rule for searching.                                |

**Return**

- Type of the return value: Array;
- If there are items that match the rule, return all of them. Return `undefined` otherwise.

**Usage**

```javascript
const nodes = graph.findAll('node', (node) => {
  return node.get('model').x;
});
```

### graph.findAllByState(type, state)

Find all the items whose value of state is true.

**Parameters**

| Name  | Type   | Required | Description                                        |
| ----- | ------ | -------- | -------------------------------------------------- |
| type  | string | true     | The type of the item. Options: `'node'`, `'edge'`. |
| state | string | true     | State for searching.                               |

**Return**

- Type of the return value: Array;
- Return all the items that match the state.

**Usage**

```javascript
// Find all the items whose 'selected' state is true
const nodes = graph.findAllByState('node', 'selected');
```
