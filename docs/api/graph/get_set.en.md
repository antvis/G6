---
title: graph.get*/set*
order: 10
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

### graph.get(key)

Get an property of graph by key.

**Parameters**

| Name | Type   | Required | Description          |
| ---- | ------ | -------- | -------------------- |
| key  | string | true     | Key of the property. |

**Usage**

```javascript
// get the group
const group = graph.get('group');

// get the canvas instance
const canvas = graph.get('canvas');

// get the value of autoPaint
const autoPaint = graph.get('autoPaint');
```

### graph.set(key, val)

Set the value to an property.

**Parameters**

| Name | Type                    | Required | Description                |
| ---- | ----------------------- | -------- | -------------------------- |
| key  | string                  | true     | The key of the property.   |
| val  | string / Object / Array | true     | The value of the property. |

**Usage**

```javascript
// Set capture to false
graph.set('capture', false);

// Set customGroup to group
graph.set('customGroup', group);

// Set nodeIdList to [1, 3, 5]
graph.set('nodeIdList', [1, 3, 5]);
```

### graph.getContainer()

Get the DOM container of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getContainer();
```

### graph.getGroup()

Get the root [graphics group](/en/docs/manual/advanced/keyconcept/graphics-group) of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getGroup();
```

### graph.getMinZoom()

Get the `minZoom` for the graph, which is the lower limit of the zoom ratio.

**Parameter**

No parameter

**Usage**

```javascript
graph.getMinZoom();
```

### graph.setMinZoom(ratio)

Set the `minZoom` for the graph, which is the lower limit of the zoom ratio.

**Parameter**

| Name  | Type   | Required | Description                  |
| ----- | ------ | -------- | ---------------------------- |
| ratio | number | true     | The minimum zoom ratio value |

**Usage**

```javascript
graph.setMinZoom(0.001);
```

### graph.getMaxZoom()

Get the `maxZoom` for the graph, which is the upper limit of the zoom ratio.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getMaxZoom();
```

### graph.setMaxZoom(ratio)

Set the `maxZoom` for the graph, which is the upper limit of the zoom ratio.

**Parameter**

| Name  | Type   | Required | Description                  |
| ----- | ------ | -------- | ---------------------------- |
| ratio | number | true     | The maximum zoom ratio value |

**Usage**

```javascript
graph.setMaxZoom(1000);
```

### graph.getWidth()

Get the current width of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getWidth();
```

### graph.getHeight()

Get the current height of the graph.

**Parameter**

No parameter.

**Usage**

```javascript
graph.getHeight();
```

</div>
